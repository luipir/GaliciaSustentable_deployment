import React, { PureComponent } from 'react';

import { config, GrafanaBootConfig, getDataSourceSrv } from '@grafana/runtime';
import { FieldDisplay, getFieldDisplayValues, PanelProps, VizOrientation, DataSourceApi } from '@grafana/data';
import { DataLinksContextMenu, Gauge, VizRepeater, VizRepeaterRenderValueProps } from '@grafana/ui';
import { DataLinksContextMenuApi } from '@grafana/ui/components/DataLinks/DataLinksContextMenu';

import { GaugeOptions } from './types';

// const METRIC_VALUE: string = 'METRIC_VALUE' // <<-- change if rename the var
const INDEX_CLASSES: string = 'INDEX_CLASSES' // <<-- change if rename the var

export class GaugePanel extends PureComponent<PanelProps<GaugeOptions>> {

  renderComponent = (
    valueProps: VizRepeaterRenderValueProps<FieldDisplay>,
    menuProps: DataLinksContextMenuApi
  ): JSX.Element => {
    const { options } = this.props;
    const { value, width, height } = valueProps;
    const { field, display } = value;

    // get min/max range from propagated default min/max classes
    field.min = this.props.fieldConfig.defaults.min
    field.max = this.props.fieldConfig.defaults.max

    const { openMenu, targetClassName } = menuProps;
    let grafanaConfig: GrafanaBootConfig = config;

    return (
      <Gauge
        value={display}
        width={width}
        height={height}
        field={field}
        showThresholdLabels={options.showThresholdLabels}
        showThresholdMarkers={options.showThresholdMarkers}
        theme={grafanaConfig.theme}
        onClick={openMenu}
        className={targetClassName}
      />
    );
  };

  renderValue = (valueProps: VizRepeaterRenderValueProps<FieldDisplay>): JSX.Element => {
    const { value } = valueProps;
    const { getLinks, hasLinks } = value;

    if (hasLinks && getLinks) {
      return (
        <DataLinksContextMenu links={getLinks}>
          {api => {
            return this.renderComponent(valueProps, api);
          }}
        </DataLinksContextMenu>
      );
    }

    return this.renderComponent(valueProps, {});
  };

  getValues = (): FieldDisplay[] => {
    const { data, options, replaceVariables, fieldConfig, timeZone } = this.props;
    let grafanaConfig: GrafanaBootConfig = config;
    return getFieldDisplayValues({
      fieldConfig,
      reduceOptions: options.reduceOptions,
      replaceVariables,
      theme: grafanaConfig.theme,
      data: data.series,
      autoMinMax: true,
      timeZone,
    });
  };

  forcePanelProps() {
    var classes: JSON | null;
    var variable: any;
    const dataSource:DataSourceApi = getDataSourceSrv() as unknown as DataSourceApi;

    variable = _.find(dataSource.templateSrv.getVariables(), {'name':INDEX_CLASSES});
    variable.options[0].text == "None"? 
      classes = null :
      classes = JSON.parse(variable.options[0].text)
    
    if (classes == null) {
      return
    }

    // setup min max of the gauge
    this.props.fieldConfig.defaults.min = classes[0].low
    this.props.fieldConfig.defaults.max = classes[classes.length -1].high

    // setup thresholds steps of the gauge
    var steps: object[] = [];
    for (var i = 0; i < classes.length; i++) {
      steps[i] = {
        "color": classes[i].color,
        "value": classes[i].low
      }
    }
    // steps[this.classes.length] = steps[this.classes.length-1]
    // steps[this.classes.length].value = Infinity;
    // steps[this.classes.length + 1] = steps[0];
    // steps[this.classes.length + 1].value = -Infinity;
    
    this.props.fieldConfig.defaults.thresholds.steps = steps
    this.props.fieldConfig.defaults.thresholds.mode = 'absolute'
  }

  render() {
    const { height, width, data, renderCounter } = this.props;

    // get values form variable to setup correct legend scale
    this.forcePanelProps()

    return (
      <VizRepeater
        getValues={this.getValues}
        renderValue={this.renderValue}
        width={width}
        height={height}
        source={data}
        autoGrid={true}
        renderCounter={renderCounter}
        orientation={VizOrientation.Auto}
      />
    );
  }
}
