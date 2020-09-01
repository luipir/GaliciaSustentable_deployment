/* eslint import/no-extraneous-dependencies: 0 */
import {loadPluginCss} from 'grafana/app/plugins/sdk';
import WorldmapCtrl from './worldmap_ctrl';

loadPluginCss({
  dark: 'plugins/luipir-worldmap-panel/css/worldmap.dark.css',
  light: 'plugins/luipir-worldmap-panel/css/worldmap.light.css'
});

export {
  WorldmapCtrl as PanelCtrl
};
