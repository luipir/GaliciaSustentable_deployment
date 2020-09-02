import React, { Component } from 'react';

import { PanelProps } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { Options } from './types';

import Sunburst, { Node } from 'sunburst-chart';

type Props = PanelProps<Options>;

const INDEX: string = 'INDEX' // <<-- change if rename the var
// const INDEXES_SUNBURST: string = 'INDEXES_SUNBURST' // <<-- change if rename the var

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
    const templateSrv = getTemplateSrv();

    // variable = _.find(templateSrv.getVariables(), {'name':INDEXES_SUNBURST});
    // variable.options[0].text == "None"? 
    //   this.values = null :
    //   this.values = JSON.parse(variable.options[0].text)
    this.props.data.series[0].fields[0].values.buffer == "None"?
      this.values = null :
      this.values = JSON.parse(this.props.data.series[0].fields[0].values.buffer[0])

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
    variable = _.find(templateSrv.getVariables(), {'name':INDEX});
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
    if (obj && key in obj) {
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

  private selectIndex(indexName: string) {
    var variable: any;
    const templateSrv = getTemplateSrv();

    // manage to focus on node related to selected index
    // this is a really hacky way due the fact that there is no API
    // to trigger variable update. So the procedure is:
    // 1) update the variable option selected in the dropdownmenu
    // 2) trigger in a hacky way the dashboard update simulating click on the refresh button :(

    // step 1) set the variabl index as selected and set it as current in the valiable
    variable = _.find(templateSrv.getVariables(), {'name':INDEX});
    variable.options.forEach((option: object) => {
      if (option.text == indexName) {
        option.selected = true
        variable.current = option
      } else {
        option.selected = false
      }
    })

    // step 2) look for the refresh buitton and programmatically do click()
    const refresh_button_container = document.getElementsByClassName('refresh-picker-buttons');
    refresh_button_container.forEach((element: any) => {
      element.firstChild.firstChild.click()
    })
  }

  onClickCallback(node: Node | null) {
    if (node) {
      this.selectIndex(node.name)

      // this.myChart.focusOnNode(node);
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
    const { height, width } = this.props;

    // SystemJS.load('app/core/app_events').then((appEvents:any) => {
    //   appEvents.on('graph-hover', (e:any) => console.log(e))
    // })

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
