import React, { Component } from 'react';
import _ from 'lodash'

import { Select, Table } from '@grafana/ui';
import { 
  DataFrame,
  FieldMatcherID,
  getFrameDisplayName,
  PanelProps,
  SelectableValue,
  // DataSourceApi
} from '@grafana/data';
import { Options } from './types';
import { css } from 'emotion';
import { config } from '@grafana/runtime';
import { TableSortByFieldState } from '@grafana/ui/components/Table/types';
// import { FilterItem, TableSortByFieldState } from '@grafana/ui/components/Table/types';
// import { Store } from 'redux';
// import { applyFilterFromTable } from '../../../features/variables/adhoc/actions';
// import { PanelModel } from '@grafana/data';

// const INDEX_CLASSES: string = 'INDEX_CLASSES' // <<-- change if rename the var

interface Props extends PanelProps<Options> {}

export class TablePanel extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onColumnResize = (fieldDisplayName: string, width: number) => {
    const { fieldConfig } = this.props;
    const { overrides } = fieldConfig;

    const matcherId = FieldMatcherID.byName;
    const propId = 'custom.width';

    // look for existing override
    const override = overrides.find(o => o.matcher.id === matcherId && o.matcher.options === fieldDisplayName);

    if (override) {
      // look for existing property
      const property = override.properties.find(prop => prop.id === propId);
      if (property) {
        property.value = width;
      } else {
        override.properties.push({ id: propId, value: width });
      }
    } else {
      overrides.push({
        matcher: { id: matcherId, options: fieldDisplayName },
        properties: [{ id: propId, value: width }],
      });
    }

    this.props.onFieldConfigChange({
      ...fieldConfig,
      overrides,
    });
  };

  onSortByChange = (sortBy: TableSortByFieldState[]) => {
    this.props.onOptionsChange({
      ...this.props.options,
      sortBy,
    });
  };

  onChangeTableSelection = (val: SelectableValue<number>) => {
    this.props.onOptionsChange({
      ...this.props.options,
      frameIndex: val.value || 0,
    });

    // Force a redraw -- but no need to re-query
    this.forceUpdate();
  };

  // onCellFilterAdded = (filter: FilterItem) => {
  //   const { key, value, operator } = filter;
  //   const panelModel = getDashboardSrv()
  //     .getCurrent()
  //     .getPanelById(this.props.id);
  //   const datasource = panelModel?.datasource;

  //   if (!datasource) {
  //     return;
  //   }

  //   store.dispatch(applyFilterFromTable({ datasource, key, operator, value }));
  // };

  renderTable(frame: DataFrame, width: number, height: number) {
    const { options } = this.props;

    return (
      <Table
        height={height}
        width={width}
        data={frame}
        noHeader={!options.showHeader}
        resizable={true}
        initialSortBy={options.sortBy}
        onSortByChange={this.onSortByChange}
        onColumnResize={this.onColumnResize}
        // onCellFilterAdded={this.onCellFilterAdded}
      />
    );
  }

  getCurrentFrameIndex() {
    const { data, options } = this.props;
    const count = data.series?.length;
    return options.frameIndex > 0 && options.frameIndex < count ? options.frameIndex : 0;
  }

  forcePanelProps() {
    var classes: object | null;
    // var variable: any;
    // const dataSource:DataSourceApi = getDataSourceSrv() as unknown as DataSourceApi;

    // variable = _.find(dataSource.templateSrv.getVariables(), {'name':INDEX_CLASSES});
    // variable.options[0].text == "None"?
    //   classes = null:
    //   classes = JSON.parse(variable.options[0].text)
    this.props.data.series[0].fields == "None"?
      classes = null :
      classes = this.props.data.series[0].fields

    // setup thresholds steps to show colors of the legend.
    var steps: object[] = [];
    // categories are numeric => get threshold from low values
    for (var i = 0; i < classes.length; i++) {
      steps[i] = {
        "color": classes[3].values.buffer[i],
        "value": classes[0].values.buffer[i]
      }
    }
    this.props.fieldConfig.defaults.thresholds.steps = steps
    this.props.fieldConfig.defaults.thresholds.mode = 'absolute'

    // // manage returned value in case of categorised values
    // // if (this.props.data.series[0].fields[0].type == "string") {
    // if (isNaN(this.currentMetricValue)) {
      
    //   // in case of categorised value (e.g. strings) setup value mapping to represent
    //   // empiric value to the string
    //   var mapping: object[] = []
    //   for (var i = 0; i < classes.length; i++) {
    //     mapping[i] = {
    //       "id": i,
    //       "type": 2,
    //       "from": String(i),
    //       "to": String(i+1),
    //       "text": classes[i].value,
    //       // "value": i + 0.5
    //     }
    //   }
    //   this.props.fieldConfig.defaults.mappings = mapping
    //   this.props.data.series[0].fields[0].config.mappings = mapping

    //   // give to the category value (e.g metric) the index class + 0.5 to have the Gauge pointer
    //   // pointing in the middle of the category
    //   // const category_value = this.props.data.series[0].fields[0].values.buffer[0]
    //   var numeric_value: number | undefined = undefined
    //   for (var i = 0; i < classes.length; i++) {
    //     if (this.currentMetricValue == classes[i].value) {
    //       numeric_value = i + 0.5;

    //       // set the color of the text basing on value
    //       this.currentMetricColor = getColorFromHexRgbOrName(classes[i].color);

    //       break;
    //     }
    //   }

    //   // based on this value the gauge will represent the scale
    //   // it is not the showned value that is set later before rendering
    //   this.props.data.series[0].fields[0].values.buffer[0] = String(numeric_value)

    // } else {
    //   this.props.fieldConfig.defaults.mappings = []
    //   this.props.data.series[0].fields[0].type = "number"
    // }
  }

  render() {
    const { data, height, width } = this.props;

    const count = data.series?.length;

    if (!count || count < 1) {
      return <div>No data</div>;
    }

    this.forcePanelProps()

  if (count > 1) {
      const inputHeight = config.theme.spacing.formInputHeight;
      const padding = 8 * 2;
      const currentIndex = this.getCurrentFrameIndex();
      const names = data.series.map((frame, index) => {
        return {
          label: getFrameDisplayName(frame),
          value: index,
        };
      });

      return (
        <div className={tableStyles.wrapper}>
          {this.renderTable(data.series[currentIndex], width, height - inputHeight - padding)}
          <div className={tableStyles.selectWrapper}>
            <Select options={names} value={names[currentIndex]} onChange={this.onChangeTableSelection} />
          </div>
        </div>
      );
    }

    return this.renderTable(data.series[0], width, height - 12);
  }
}

const tableStyles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  `,
  selectWrapper: css`
    padding: 8px;
  `,
};
