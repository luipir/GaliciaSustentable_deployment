import React, { Component } from 'react';

import { PanelProps, DataSourceApi } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { Options } from './types';

import Sunburst, { Node } from 'sunburst-chart';

type Props = PanelProps<Options>;

export class SunburstPanel extends Component<Props> {
  colors = {
    'Mui alto': 'green',
    'Alto': 'blue',
    'Medio': 'yellow',
    'Bajo': 'red',
    'NODATA': 'grey'
  };

  myChart: Sunburst;
  lastZoomedNode: Node | null = null;
  values: Object;

  constructor(props: Props) {
    super(props);

    this.myChart = Sunburst();
    this.lastZoomedNode = null;
    this.values = null;
  }

  getCurrentFrameIndex() {
    const { data, options } = this.props;
    const count = data.series?.length;
    return options.frameIndex > 0 && options.frameIndex < count ? options.frameIndex : 0;
  }

  updateValues() {
    // console.log(this.props);

    // position of the fields inside the variable
    const name = 0
    const value = 2

    const dataSource:DataSourceApi = getDataSourceSrv() as unknown as DataSourceApi;
    // console.log('-----------', dataSource.templateSrv.getVariables());
    const _03_AUTOCONTENCION_LABORAL = _.find(dataSource.templateSrv.getVariables(), {'name':'03_AUTOCONTENCION_LABORAL'});
    const _04_SALDO_MIGRATORIO = _.find(dataSource.templateSrv.getVariables(), {'name':'04_SALDO_MIGRATORIO'});

    console.log("-------------------------------------------------")
    console.log(_03_AUTOCONTENCION_LABORAL.options[0]);
    console.log(_04_SALDO_MIGRATORIO.options[0]);
    

    if (!this.values) {
      // setup values
      this.values = {
        name: 'Vida inteligente',
        color: this.colors['Mui alto'],
        value: 'Mui alto',
        children: [
          {
            name: 'Atractivo de ciudad',
            value: 'Mui alto',
            color: this.colors['Mui alto'],
            children: [
              {
                name: 'Atractivo laboral/residencial',
                value: 'Mui alto',
                color: this.colors['Mui alto'],
                // size: 0.6,
                children: [
                  {
                    name: _03_AUTOCONTENCION_LABORAL.options[name].value ,
                    value: _03_AUTOCONTENCION_LABORAL.options[value].value,
                    color: this.colors[_03_AUTOCONTENCION_LABORAL.options[value].value],
                    size: 0.36, // 60% of options.6
                  },
                  {
                    name: _04_SALDO_MIGRATORIO.options[name].value,
                    value: _04_SALDO_MIGRATORIO.options[value].value,
                    color: this.colors[_04_SALDO_MIGRATORIO.options[value].value],
                    size: 0.24, // 40% of 0.6
                  },
                ],
              },
              {
                name: 'Atractivo turístico',
                value: 'Mui alto',
                color: this.colors['Mui alto'],
                // size: 0.4,
                children: [
                  {
                    name: 'Visitantes en la ciudad',
                    value: 'Mui alto',
                    color: this.colors['Mui alto'],
                    size: 0.16, // 40% of 0.4
                  },
                  {
                    name: 'Visitantes que repiten',
                    value: 'Alto',
                    color: this.colors['Alto'],
                    size: 0.24, // 60% of 0.4
                  },
                ],
              },
            ],
          },
          {
            name: 'Salud',
            color: this.colors['Mui alto'],
            value: 'Mui alto',
            children: [
              {
                name: 'Accesibilidad a recursos sanitarios',
                value: 'Alto',
                color: this.colors['Alto'],
                // size: 0.2,
                children: [
                  {
                    name: 'Proximidad ciudadana a un centro de atención primaria',
                    value: 'Alto',
                    color: this.colors['Alto'],
                    size: 0.2, // 100% of 0.2
                  },
                ],
              },
              {
                name: 'Recursos sanitarios',
                value: 'Mui alto',
                color: this.colors['Mui alto'],
                // size: 0.3,
                children: [
                  {
                    name: 'Capacidad sanitaria municipal de atención primaria',
                    value: 'Mui alto',
                    color: this.colors['Mui alto'],
                    size: 0.3, // 100% of 0.3
                  },
                ],
              },
              {
                name: 'Vida saludable',
                value: 'Mui alto',
                color: this.colors['Mui alto'],
                // size: 0.5,
                children: [
                  {
                    name: 'Esperanza de vida al nacer',
                    value: 'Mui alto',
                    color: this.colors['Mui alto'],
                    size: 0.5, // 100% of 0.5
                  },
                ],
              },
            ],
          },
        ],
      };
    }
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
    if (chart && this.values) {
      chart.innerHTML = '';

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
