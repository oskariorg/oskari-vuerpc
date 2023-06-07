<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      The <InlineCode>{{ requestName }}</InlineCode> can be used to move the map programmatically in
      an animated way along route points for visualization purposes.
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocPage">
      Documentation for {{ requestName }}
    </DocumentationLink>

    <CodeSnippet>
var routeSteps = {{ JSON.stringify(routeSteps, null, 2) }};
var stepDefaults = {{ JSON.stringify(stepDefaults, null, 2) }};
channel.postRequest('{{ requestName }}', [routeSteps, stepDefaults]);
    </CodeSnippet>
    <p>
      You can run the code above by clicking the button:
      <RunExampleButton @click="mapTourRequest">{{ requestName }}</RunExampleButton>
    </p>
    <p>
      Note! That both <InlineCode>AfterMapMoveEvent</InlineCode> and
      <InlineCode>MapTourEvent</InlineCode> are triggered by the request. The tour events can be
      used during the progress of the tour and move events are triggered normally since the map
      moves when it's going through the tour.
    </p>
  </div>
</template>

<script>
const apiDocPage = 'mapping/mapmodule/request/MapMoveRequest.md';
const title = 'Move map along route';
const requestName = 'MapTourRequest';

export default {
  name: requestName,
  label: title,
  data() {
    return {
      title,
      apiDocPage,
      requestName,
      routeSteps,
      stepDefaults
    };
  },
  methods: {
    mapTourRequest() {
      const params = [routeSteps, stepDefaults];
      this.$root.channel.postRequest(requestName, params);
      this.$root.channel.log(requestName + ' posted with data', params);
    }
  }
};

const x = 488704;
const y = 6939136;

const routeSteps = [
  {
    lon: x,
    lat: y,
    duration: 2000,
    zoom: 3,
    animation: 'zoomPan'
  },
  {
    lon: x - 150000,
    lat: y - 150000,
    delay: 2500
  },
  {
    lon: x + 75000,
    lat: y,
    animation: 'zoomPan',
    zoom: 6
  }
];

const stepDefaults = {
  zoom: 8,
  animation: 'fly',
  duration: 3000,
  srsName: 'EPSG:3067'
};
</script>
