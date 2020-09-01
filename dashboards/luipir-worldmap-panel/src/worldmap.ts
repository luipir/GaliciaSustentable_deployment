import * as _ from 'lodash';
import * as L from './libs/leaflet';
import WorldmapCtrl from './worldmap_ctrl';

const tileServers = {
  'CartoDB Positron': {
    url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
  },
  'CartoDB Dark': {
    url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
  },
  'OSM Dark': {
    url: 'https://a.tile.openstreetmap.org/${z}/${x}/${y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
  },
};

export default class WorldMap {
  ctrl: WorldmapCtrl;
  mapContainer: any;
  circles: any[];
  map: any;
  legend: any;
  circlesLayer: any;
  WMSLayer: any;

  constructor(ctrl, mapContainer) {
    this.ctrl = ctrl;
    this.mapContainer = mapContainer;
    this.circles = [];
  }

  createMap() {
    var zoom, lat, lon: number | null = null;
    if (this.ctrl.panel.qgis_project_options == null)
    {
      lat = parseFloat(this.ctrl.panel.mapCenterLatitude);
      lon = parseFloat(this.ctrl.panel.mapCenterLongitude);
      zoom = parseInt('13', 10) || 1
    }
    else
    {
      lat = parseFloat(this.ctrl.panel.qgis_project_options.center.lat);
      lon = parseFloat(this.ctrl.panel.qgis_project_options.center.lon);
      zoom = parseInt(this.ctrl.panel.qgis_project_options.zoomLevel, 10) || 1
    }

    const mapCenter = (<any>window).L.latLng(lat,lon);

    this.map = L.map(this.mapContainer, {
      worldCopyJump: true,
      preferCanvas: true,
      center: mapCenter,
      zoom: zoom,
    });
    this.setMouseWheelZoom();

    const selectedTileServer = tileServers[this.ctrl.tileServer];
    (<any>window).L.tileLayer(selectedTileServer.url, {
      maxZoom: 18,
      subdomains: selectedTileServer.subdomains,
      reuseTiles: true,
      detectRetina: true,
      attribution: selectedTileServer.attribution,
    }).addTo(this.map);

    this.WMSLayer = L.tileLayer.wms(this.ctrl.panel.qgis_project_options.url, {
      layers: this.ctrl.panel.qgis_project_options.layers,
      format: 'image/png',
      transparent: true,
      opacity: this.ctrl.panel.qgis_project_options.opacity
    }).addTo(this.map);
    // console.log(th is.WMSLayer)
    // this.map.fitBounds(this.WMSLayer.getBounds())
  }

  createLegend() {
    if (this.ctrl.panel.qgis_project_options == null || 
        this.ctrl.panel.qgis_project_options.legend == null ||
        this.ctrl.panel.qgis_project_options.legend.display == null ||
        this.ctrl.panel.qgis_project_options.legend.display == false) {
      return;
    }
    var position:string = this.ctrl.panel.qgis_project_options.legend.position?
        this.ctrl.panel.qgis_project_options.legend.position :
        this.ctrl.panel.legend.position;
    
    var width:number = this.ctrl.panel.qgis_project_options.legend.width?
      this.ctrl.panel.qgis_project_options.legend.width :
      this.ctrl.panel.legend.width;

    var height:number = this.ctrl.panel.qgis_project_options.legend.height?
      this.ctrl.panel.qgis_project_options.legend.height :
      this.ctrl.panel.legend.height;

    var font:string = this.ctrl.panel.qgis_project_options.legend.font?
      this.ctrl.panel.qgis_project_options.legend.font :
      this.ctrl.panel.legend.font;

    var transparent:string = this.ctrl.panel.qgis_project_options.legend.transparent?
      this.ctrl.panel.qgis_project_options.legend.transparent :
      this.ctrl.panel.legend.transparent;

    this.legend = (<any>window).L.control({ position: position });
    this.legend.onAdd = () => {
      this.legend._div = (<any>window).L.DomUtil.create('div', 'info legend');

      var getLegendGraphicUrl = this.ctrl.panel.qgis_project_options.url;
      getLegendGraphicUrl += '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image/png'
      getLegendGraphicUrl += '&TRANSPARENT=' + transparent
      getLegendGraphicUrl += '&LAYERFONTFAMILY=' + font + '&ITEMFONTFAMILY=' + font
      getLegendGraphicUrl += '&LAYERS=' + this.ctrl.panel.qgis_project_options.layers 

      this.legend._div.innerHTML +=
      '<img alt="legend" src="' + getLegendGraphicUrl + '" width="' + width + '" height="' + height + '" />';
      return this.legend._div;
    };
    this.legend.addTo(this.map);
  }

  needToRedrawCircles(data) {
    if (this.circles.length === 0 && data.length > 0) {
      return true;
    }

    if (this.circles.length !== data.length) {
      return true;
    }

    const locations = _.map(_.map(this.circles, 'options'), 'location').sort();
    const dataPoints = _.map(data, 'key').sort();
    return !_.isEqual(locations, dataPoints);
  }

  filterEmptyAndZeroValues(data) {
    return _.filter(data, o => {
      return !(this.ctrl.panel.hideEmpty && _.isNil(o.value)) && !(this.ctrl.panel.hideZero && o.value === 0);
    });
  }

  clearCircles() {
    if (this.circlesLayer) {
      this.circlesLayer.clearLayers();
      this.removeCircles();
      this.circles = [];
    }
  }

  drawCircles() {
    const data = this.filterEmptyAndZeroValues(this.ctrl.data);
    if (this.needToRedrawCircles(data)) {
      this.clearCircles();
      this.createCircles(data);
    } else {
      this.updateCircles(data);
    }
  }

  createCircles(data) {
    const circles: any[] = [];
    data.forEach(dataPoint => {
      if (!dataPoint.locationName) {
        return;
      }
      circles.push(this.createCircle(dataPoint));
    });
    this.circlesLayer = this.addCircles(circles);
    this.circles = circles;
  }

  updateCircles(data) {
    data.forEach(dataPoint => {
      if (!dataPoint.locationName) {
        return;
      }

      const circle = _.find(this.circles, cir => {
        return cir.options.location === dataPoint.key;
      });

      if (circle) {
        circle.setRadius(this.calcCircleSize(dataPoint.value || 0));
        circle.setStyle({
          color: this.getColor(dataPoint.value),
          fillColor: this.getColor(dataPoint.value),
          fillOpacity: 0.5,
          location: dataPoint.key,
        });
        circle.unbindPopup();
        this.createPopup(circle, dataPoint.locationName, dataPoint.valueRounded);
      }
    });
  }

  createCircle(dataPoint) {
    const circle = (<any>window).L.circleMarker([dataPoint.locationLatitude, dataPoint.locationLongitude], {
      radius: this.calcCircleSize(dataPoint.value || 0),
      color: this.getColor(dataPoint.value),
      fillColor: this.getColor(dataPoint.value),
      fillOpacity: 0.5,
      location: dataPoint.key,
    });

    this.createPopup(circle, dataPoint.locationName, dataPoint.valueRounded);
    return circle;
  }

  calcCircleSize(dataPointValue) {
    const circleMinSize = parseInt(this.ctrl.panel.circleMinSize, 10) || 2;
    const circleMaxSize = parseInt(this.ctrl.panel.circleMaxSize, 10) || 30;

    if (this.ctrl.data.valueRange === 0) {
      return circleMaxSize;
    }

    const dataFactor = (dataPointValue - this.ctrl.data.lowestValue) / this.ctrl.data.valueRange;
    const circleSizeRange = circleMaxSize - circleMinSize;

    return circleSizeRange * dataFactor + circleMinSize;
  }

  createPopup(circle, locationName, value) {
    const unit = value && value === 1 ? this.ctrl.panel.unitSingular : this.ctrl.panel.unitPlural;
    const label = (locationName + ': ' + value + ' ' + (unit || '')).trim();
    circle.bindPopup(label, {
      offset: (<any>window).L.point(0, -2),
      className: 'worldmap-popup',
      closeButton: this.ctrl.panel.stickyLabels,
    });

    circle.on('mouseover', function onMouseOver(evt) {
      const layer = evt.target;
      layer.bringToFront();
      this.openPopup();
    });

    if (!this.ctrl.panel.stickyLabels) {
      circle.on('mouseout', function onMouseOut() {
        circle.closePopup();
      });
    }
  }

  getColor(value) {
    for (let index = this.ctrl.data.thresholds.length; index > 0; index -= 1) {
      if (value >= this.ctrl.data.thresholds[index - 1]) {
        return this.ctrl.panel.colors[index];
      }
    }
    return _.first(this.ctrl.panel.colors);
  }

  resize() {
    this.map.invalidateSize();
  }

  panToMapCenter() {
    this.map.panTo([parseFloat(this.ctrl.panel.mapCenterLatitude), parseFloat(this.ctrl.panel.mapCenterLongitude)]);
    this.ctrl.mapCenterMoved = false;
  }

  removeLegend() {
    this.legend.remove(this.map);
    this.legend = null;
  }

  setMouseWheelZoom() {
    if (!this.ctrl.panel.mouseWheelZoom) {
      this.map.scrollWheelZoom.disable();
    } else {
      this.map.scrollWheelZoom.enable();
    }
  }

  addCircles(circles) {
    return (<any>window).L.layerGroup(circles).addTo(this.map);
  }

  removeCircles() {
    this.map.removeLayer(this.circlesLayer);
  }

  setZoom(zoomFactor) {
    this.map.setZoom(parseInt(zoomFactor, 10));
  }

  remove() {
    this.circles = [];
    if (this.circlesLayer) {
      this.removeCircles();
    }
    if (this.legend) {
      this.removeLegend();
    }
    this.map.remove();
  }
}
