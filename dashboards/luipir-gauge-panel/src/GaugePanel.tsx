import React, { PureComponent } from 'react';

import { config, GrafanaBootConfig, getDataSourceSrv } from '@grafana/runtime';
import { getColorFromHexRgbOrName,
        FieldDisplay,
        getFieldDisplayValues,
        PanelProps,
        VizOrientation,
        DataSourceApi } from '@grafana/data';
import { DataLinksContextMenu,
        Gauge,
        VizRepeater,
        VizRepeaterRenderValueProps } from '@grafana/ui';
import { DataLinksContextMenuApi } from '@grafana/ui/components/DataLinks/DataLinksContextMenu';

import { GaugeOptions } from './types';

const INDEX: string = 'INDEX' // <<-- change if rename the var
// const METRIC_VALUE: string = 'METRIC_VALUE' // <<-- change if rename the var
// const INDEX_CLASSES: string = 'INDEX_CLASSES' // <<-- change if rename the var

export class GaugePanel extends PureComponent<PanelProps<GaugeOptions>> {

  currentMetricValue: number | string | undefined = undefined;
  currentMetricColor: string | undefined = undefined;

  renderComponent = (
    valueProps: VizRepeaterRenderValueProps<FieldDisplay>,
    menuProps: DataLinksContextMenuApi
  ): JSX.Element => {
    const { fieldConfig, options } = this.props;
    const { value, width, height } = valueProps;
    const { field, display } = value;

    // get min/max range from propagated default min/max classes
    field.min = fieldConfig.defaults.min
    field.max = fieldConfig.defaults.max

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

    // In case metric is string and not value, set correctly what to display as value
    // and color.
    if (isNaN(this.currentMetricValue)) {
      // setting value.display.numeric allow use of gauge scale usign the corresponding 
      // numeric value of the category value of the metric
      value.display.numeric = this.props.data.series[0].fields[0].values.buffer[0];

      // set color and text to display for a non numeric value
      value.display.text = String(this.currentMetricValue);
      value.display.color = this.currentMetricColor;
    }

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
    var index: String | null;
    var classes: JSON | null;
    var variable: any;
    const dataSource:DataSourceApi = getDataSourceSrv() as unknown as DataSourceApi;

    variable = _.find(dataSource.templateSrv.getVariables(), {'name':INDEX});
    variable = _.find(variable.options, {'selected': true})
    variable.text == "None"? 
      index = null :
      index = variable.text;
    
    if (index == null) {
      return
    }

    // variable = _.find(dataSource.templateSrv.getVariables(), {'name':METRIC_VALUE});
    // variable.options[0].text == "None"? 
    //   this.currentMetricValue = undefined :
    //   this.currentMetricValue = variable.options[0].text
    this.currentMetricValue = this.props.data.series[0].fields[0].values.buffer[0]
    
    // variable = _.find(dataSource.templateSrv.getVariables(), {'name':INDEX_CLASSES});
    // variable.options[0].text == "None"?
    //   classes = null:
    //   classes = JSON.parse(variable.options[0].text)
    this.props.data.series[0].fields == "None"?
      classes = null :
      classes = JSON.parse(this.props.data.series[1].fields[0].values.buffer[0])

    // setup min max of the gauge
    this.props.fieldConfig.defaults.min = classes[0].low
    this.props.fieldConfig.defaults.max = classes[classes.length -1].high

    // setup thresholds steps of the gauge.
    var steps: object[] = [];
    // categories are numeric => get threshold from low values
    for (var i = 0; i < classes.length; i++) {
      steps[i] = {
        "color": classes[i].color,
        "value": classes[i].low
      }
    }

    this.props.fieldConfig.defaults.thresholds.steps = steps
    this.props.fieldConfig.defaults.thresholds.mode = 'absolute'

    // manage returned value in case of categorised values
    // if (this.props.data.series[0].fields[0].type == "string") {
    if (isNaN(this.currentMetricValue)) {
      
      // in case of categorised value (e.g. strings) setup value mapping to represent
      // empiric value to the string
      var mapping: object[] = []
      for (var i = 0; i < classes.length; i++) {
        mapping[i] = {
          "id": i,
          "type": 2,
          "from": String(i),
          "to": String(i+1),
          "text": classes[i].value,
          // "value": i + 0.5
        }
      }
      this.props.fieldConfig.defaults.mappings = mapping
      this.props.data.series[0].fields[0].config.mappings = mapping

      // give to the category value (e.g metric) the index class + 0.5 to have the Gauge pointer
      // pointing in the middle of the category
      // const category_value = this.props.data.series[0].fields[0].values.buffer[0]
      var numeric_value: number | undefined = undefined
      for (var i = 0; i < classes.length; i++) {
        if (this.currentMetricValue == classes[i].value) {
          numeric_value = i + 0.5;

          // set the color of the text basing on value
          this.currentMetricColor = getColorFromHexRgbOrName(classes[i].color);

          break;
        }
      }

      // based on this value the gauge will represent the scale
      // it is not the showned value that is set later before rendering
      this.props.data.series[0].fields[0].values.buffer[0] = String(numeric_value)

    } else {
      // remove mapping otherwise field value is displayed with it's category
      this.props.fieldConfig.defaults.mappings = []
      this.props.data.series[0].fields[0].config.mappings = []
    }
  }

  render() {
    const { height, width, data, renderCounter } = this.props;

    this.forcePanelProps();

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
