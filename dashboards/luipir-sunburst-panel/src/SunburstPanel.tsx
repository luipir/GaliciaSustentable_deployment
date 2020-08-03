import React, { Component } from 'react';

import { PanelProps, DataSourceApi } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { Options } from './types';

import Sunburst, { Node } from 'sunburst-chart';

type Props = PanelProps<Options>;

const INDEXES_SUNBURST: string = 'INDEXES_SUNBURST' // <<-- change if rename the var

export class SunburstPanel extends Component<Props> {

  myChart: typeof Sunburst;
  lastZoomedNode: Node | null = null;
  values: JSON | null = null;

  constructor(props: Props) {
    super(props);

    this.myChart = Sunburst();
    this.lastZoomedNode = null;
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
  }

  onClickCallback(node: Node | null) {
    if (node) {
      console.log(node)
      this.myChart.focusOnNode(node);
      this.lastZoomedNode = node;
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

        if (this.lastZoomedNode) {
          this.myChart.focusOnNode(this.lastZoomedNode);
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
