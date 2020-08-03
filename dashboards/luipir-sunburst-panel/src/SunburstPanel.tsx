import React, { Component } from 'react';

import { PanelProps, DataSourceApi } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { Options } from './types';

import Sunburst, { Node } from 'sunburst-chart';

type Props = PanelProps<Options>;

const INDEX: string = 'INDEX' // <<-- change if rename the var
const INDEXES_SUNBURST: string = 'INDEXES_SUNBURST' // <<-- change if rename the var

export class SunburstPanel extends Component<Props> {

  myChart: typeof Sunburst;
  zoomedNode: Node | null = null;
  values: JSON | null = null;
  index: String | null = null;

  constructor(props: Props) {
    super(props);

    this.myChart = Sunburst();
    this.zoomedNode = null;
    this.values = null;
  }

  updateValues() {
    var variable: any;
    const dataSource:DataSourceApi = getDataSourceSrv() as unknown as DataSourceApi;

    variable = _.find(dataSource.templateSrv.getVariables(), {'name':INDEXES_SUNBURST});
    variable.options[0].text == "None"? 
      this.values = null :
      this.values = JSON.parse(variable.options[0].text)

    const color_map = {
      "dark-ŕed": "#C4162A",
      "dark-orange": "#FA6400",
      "dark-yellow": "#E0B400",
      "dark-green": "#37872D"
    }
    
    // update colors to map grafana-colors to RGBA notation
    function updateGrafanaColors(values: any) {

      _.each(values, function(obj: any, key: any){
        if (typeof(obj)=="object") {
          // parse inside
          updateGrafanaColors(obj)

          // end parsing, then check if having color element
          if (_.has(obj, "color")) {
            obj["rgb_color"] = color_map[obj.color];
          }
        } else {

        }
      });

    }
    var nested = {"container": this.values}
    updateGrafanaColors(nested)

    // manage to focus on node related to selected index
    variable = _.find(dataSource.templateSrv.getVariables(), {'name':INDEX});
    variable = _.find(variable.options, {'selected': true})
    variable.text == "None"?
      this.index = null :
      this.index = variable.text;

    // set zoom node of the sunburst to that with index name
    this.zoomedNode = null
    if (this.index != null) {
      this.sliceJSON(this.values, "name", this.index)
    }
  }

  //return an array of values that match on a certain key
  sliceJSON(obj, key, keyValue) {
    if (key in obj) {
      if (obj[key] == keyValue) {
        this.zoomedNode = obj
        return
      }
    }

    for (var i in obj) {
      if (this.zoomedNode != null) {
        break
      }
      if (typeof obj[i] == 'object') {
        this.sliceJSON(obj[i], key, keyValue)
      }
    }
  }

  onClickCallback(node: Node | null) {
    if (node) {
      this.myChart.focusOnNode(node);
      this.zoomedNode = node;
    }
  }

  onToolthipContent(d: any, node: Node) {
    const content = '<i><b>Valoración: ' + node.data.value + '</b></i>'
    return (
      content
    )
  }

  cleanSunburst() {
    const tooltips = document.getElementsByClassName('sunburst-tooltip');
    _.each(tooltips, (tooltip: HTMLDivElement) => {
      tooltip.remove()
    })

    const charts = document.getElementsByClassName('sunburst-viz');
    _.each(charts, (chart: HTMLDivElement) => {
      chart.remove()
    })
  }

  // addHyperlinks() {
  //   const charts = document.getElementsByClassName('sunburst-viz');
  //   const chart = charts[0]
  //   const ps = chart.getElementsByClassName('path-label');
  //   console.log('......................', ps, ps.length);
  //   for (var i = 0; i < ps.length; i++) {
  //     var pathlabel = ps.item(i)
  //     var a_element = document.createElement("a")
  //     a_element.href = "https://www.w3schools.com/"
  //     pathlabel?.append(a_element)
  //   } | null = null
  // }

  renderSunburst() {
    // console.log(this.props)
    const { height, width } = this.props;

    // remove previous chart
    const chart = document.getElementById('sunburst-chart-container');
    if (chart) {
      this.cleanSunburst()

      if (this.values) {
        this.myChart = Sunburst();

        this.myChart
          .data(this.values)
          .size('size')
          .color('rgb_color')
          .tooltipContent(this.onToolthipContent.bind(this))
          .width(width)
          .height(height)
          .onClick(
            this.onClickCallback.bind(this) // bind to allow visibility of "this" insde the callback
          )(chart);

        if (this.zoomedNode) {
          this.myChart.focusOnNode(this.zoomedNode);
        }
      }

      // setTimeout(this.addHyperlinks, 100)
    }
  }

  componentDidUpdate() {
    this.updateValues();
    this.renderSunburst();
  }

  componentDidMount() {
    this.updateValues();
    this.renderSunburst();
  }

  render() {
    return <div id="sunburst-chart-container"></div>;
  }
}
