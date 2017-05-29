<template>
  <div ref="MapLayerUpdateRequests">
    <div>Change map layer style</div>
    <button ref="btnMapLayerUpdateRequest" class="btn btn-primary exampleready" @click="updateMapLayer">Set map layer fill style</button>
    <div>
      <a id="mapLayerUpdate" href="">To the documentation</a>
    </div>

    <code-component :snippet="fill"></code-component>

    <button id="btnMapLayerUpdateRequestReset" class="btn btn-primary exampleready" @click="resetMapLayer">Reset map layer style</button>
        <code-component snippet="var layerId = 1387;
        var params = {
          SLD_BODY: null
        };
        channel.postRequest('MapModulePlugin.MapLayerUpdateRequest', [layerId, true, params]);"></code-component>

    </div>
</template>
<script>
import { layer } from '../../util/examplecodes.js';
export default {
  name: 'MapLayerUpdateRequest',
  data () {
    return {
      fill: layer.fill
    }
  },
  methods: {
    updateMapLayer () {
      const layerId = 1387;
      const params = {
        SLD_BODY:
               '<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd">' +
               '    <NamedLayer>' +
               '    <Name>oskari:kunnat2013</Name>' +
               '    <UserStyle>' +
               '    <Title>SLD Cook Book: Simple polygon</Title>' +
               '    <FeatureTypeStyle>' +
               '    <Rule>' +
               '    <PolygonSymbolizer>' +
               '    <Fill>' +
               '    <CssParameter name="fill">#000080</CssParameter>' +
               '    <CssParameter name="fill-opacity">0.5</CssParameter>' +
               '    </Fill>' +
               '    </PolygonSymbolizer>' +
               '    </Rule>' +
               '    </FeatureTypeStyle>' +
               '    </UserStyle>' +
               '    </NamedLayer>' +
               '    </StyledLayerDescriptor>'
      };

      this.$root.channel.postRequest('MapModulePlugin.MapLayerUpdateRequest', [layerId, true, params]);
      this.$root.channel.log('MapModulePlugin.MapLayerUpdateRequest', params);
    },
    resetMapLayer () {
      const layerId = 1387;
      const params = {
        SLD_BODY: null
      };

      this.$root.channel.postRequest('MapModulePlugin.MapLayerUpdateRequest', [layerId, true, params]);
      this.$root.channel.log('MapModulePlugin.MapLayerUpdateRequest', params);
    }
  }
}
</script>
