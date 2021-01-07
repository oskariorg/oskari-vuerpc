<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Change map layer style by sending an external SLD (requires WMS-layer and the service accepting external SLD).</p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">Documentation for {{requestName}}</DocumentationLink>

      <CodeSnippet>
var layerId = {{ layerId }};
var params = {{ JSON.stringify(params, null, 2) }};
channel.postRequest('{{requestName}}', [layerId, true, params]);
      </CodeSnippet>
    <p>
      Click the button to run the code above:
      <RunExampleButton @click="updateMapLayer">Change map layer style</RunExampleButton>
    </p>

    <h3>Reset external SLD</h3>
    <p>
      You can reset the style by sending a null SLD_BODY:
    </p>
    <CodeSnippet>
var layerId = {{ layerId }};
var params = {{ JSON.stringify(resetParams, null, 2) }};
channel.postRequest('{{requestName}}', [layerId, true, params]);
    </CodeSnippet>
    <RunExampleButton @click="resetMapLayer">Reset map layer style</RunExampleButton>
  </div>
</template>

<script>
const title = 'Change map layer style';

const requestName = 'MapModulePlugin.MapLayerUpdateRequest';
const apiDocPageRequest = 'mapping/mapmodule/request/changemaplayerstylerequest.md';

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

const resetParams = {
  SLD_BODY: null
};

export default {
  name: 'MapLayerUpdateRequest',
  label: title,
  data () {
    return {
      title,
      requestName,
      apiDocPageRequest,
      layerId,
      params,
      resetParams
    }
  },
  methods: {
    updateMapLayer () {
      this.$root.channel.postRequest('MapModulePlugin.MapLayerUpdateRequest', [layerId, true, params]);
      this.$root.channel.log('MapModulePlugin.MapLayerUpdateRequest', params);
    },
    resetMapLayer () {
      this.$root.channel.postRequest('MapModulePlugin.MapLayerUpdateRequest', [layerId, true, resetParams]);
      this.$root.channel.log('MapModulePlugin.MapLayerUpdateRequest', params);
    }
  }
}
</script>
