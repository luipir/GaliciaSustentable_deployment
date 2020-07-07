import React, { Component } from 'react';

import { PanelProps, DataSourceApi } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { Options } from './types';

import Sunburst, { Node } from 'sunburst-chart';

type Props = PanelProps<Options>;

const JSON_GRAFANA_VAR: string = 'INDEXES_SUNBURST' // <<-- cheange if you rename var

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

    variable = _.find(dataSource.templateSrv.getVariables(), {'name':JSON_GRAFANA_VAR});
    variable.options[0].text == "None"? 
      this.values = null :
      this.values = JSON.parse(variable.options[0].text)
    
    console.log(this.values)
  }

  onClickCallback(node: Node | null) {
    if (node) {
      this.myChart.focusOnNode(node);
      this.lastZoomedNode = node;
    }
  }

  onToolthipContent(d: any, node: Node) {
    // console.log(node)
    const content = '<i><b>Valoración: ' + node.data.value + '</b></i>'
    return (
      content
    )
  }

  renderSunburst() {
    // console.log(this.props)
    const { height, width } = this.props;

    // remove previous chart
    const chart = document.getElementById('sunburst-chart-container');
    if (chart) {
      chart.innerHTML = '';

      if (this.values) {
        this.myChart
        .data(this.values)
        .size('size')
        .color('color')
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
