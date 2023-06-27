<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Change map layer style by sending an external SLD. This requires a WMS-layer from a service
      that supports/accepts external SLD.
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocPageRequest">
      Documentation for {{ requestName }}
    </DocumentationLink>
    <CodeSnippet>
const layerId = {{ layerId }};
const params = {{ JSON.stringify(params, null, 2) }};
channel.postRequest('{{requestName}}', [layerId, true, params]);
    </CodeSnippet>
    Click the button to run the code above:
    <RunExampleButton @click="updateMapLayer">Change map layer style</RunExampleButton>
    <h3>Reset external SLD</h3>
    <p>You can reset the style by sending a null <InlineCode>SLD_BODY</InlineCode>:</p>
    <CodeSnippet>
const layerId = {{ layerId }};
const params = {{ JSON.stringify(resetParams, null, 2) }};
channel.postRequest('{{requestName}}', [layerId, true, params]);
    </CodeSnippet>
    <RunExampleButton @click="resetMapLayer">Reset map layer style</RunExampleButton>
  </div>
</template>

<script>
const title = 'Change map layer style';

const requestName = 'MapModulePlugin.MapLayerUpdateRequest';
const apiDocPageRequest = 'mapping/mapmodule/request/MapModulePlugin.MapLayerUpdateRequest.md';

const layerId = 1632;
const params = {
  SLD_BODY: `<?xml version="1.0" ?><StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>tieliikenne:tieliikenne_2015</Name><UserStyle><Title>Heatmap</Title><FeatureTypeStyle><Transformation><ogc:Function name="gs:Heatmap"><ogc:Function name="parameter"><ogc:Literal>data</ogc:Literal></ogc:Function><ogc:Function name="parameter"><ogc:Literal>radiusPixels</ogc:Literal><ogc:Function name="env"><ogc:Literal>radius</ogc:Literal><ogc:Literal>30</ogc:Literal></ogc:Function></ogc:Function><ogc:Function name="parameter"><ogc:Literal>pixelsPerCell</ogc:Literal><ogc:Literal>10</ogc:Literal></ogc:Function><ogc:Function name="parameter"><ogc:Literal>outputBBOX</ogc:Literal><ogc:Function name="env"><ogc:Literal>wms_bbox</ogc:Literal></ogc:Function></ogc:Function><ogc:Function name="parameter"><ogc:Literal>outputWidth</ogc:Literal><ogc:Function name="env"><ogc:Literal>wms_width</ogc:Literal></ogc:Function></ogc:Function><ogc:Function name="parameter"><ogc:Literal>outputHeight</ogc:Literal><ogc:Function name="env"><ogc:Literal>wms_height</ogc:Literal></ogc:Function></ogc:Function></ogc:Function></Transformation><Rule><RasterSymbolizer><Geometry><ogc:PropertyName>the_geom</ogc:PropertyName></Geometry><Opacity>1</Opacity><ColorMap type="ramp" ><ColorMapEntry color="#FFFFFF" quantity="0.02" opacity="0" /><ColorMapEntry color="#4444FF" quantity="0.1" opacity="1" /><ColorMapEntry color="#FF0000" quantity="0.5" opacity="1" /><ColorMapEntry color="#FFFF00" quantity="1" opacity="1" /></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>`
};

const resetParams = {
  SLD_BODY: null
};

export default {
  name: 'MapLayerUpdateRequest',
  label: title,
  data() {
    return {
      title,
      requestName,
      apiDocPageRequest,
      layerId,
      params,
      resetParams
    };
  },
  methods: {
    updateMapLayer() {
      this.$root.channel.postRequest(requestName, [
        layerId,
        true,
        params
      ]);
      this.$root.channel.log(requestName, params);
    },
    resetMapLayer() {
      this.$root.channel.postRequest(requestName, [
        layerId,
        true,
        resetParams
      ]);
      this.$root.channel.log(requestName, resetParams);
    }
  },
  mounted() {
    this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [
      this.layerId,
      true
    ]);
  },
  beforeUnmount() {
    this.resetMapLayer();
    this.$root.channel.postRequest('MapModulePlugin.MapLayerVisibilityRequest', [
      this.layerId,
      false
    ]);
  }
};
</script>
