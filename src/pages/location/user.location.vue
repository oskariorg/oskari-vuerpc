<template>
  <div>
    <RunExampleButton @click="getUserLocation">
      MyLocationPlugin.GetUserLocationRequest
    </RunExampleButton>
    <br />
    <DocumentationLink type="request" :apiDoc="apiDocpage">
      Documentation for GetUserLocationRequest
    </DocumentationLink>
    <CodeSnippet>
      channel.postRequest('MyLocationPlugin.GetUserLocationRequest', [true]);
    </CodeSnippet>
  </div>
</template>
<script>
export default {
  name: 'GetUserLocationRequest',
  label: 'Get users location',
  data() {
    return {
      desc: 'Get users location',
      apiDocpage: 'mapping/mapmodule/request/getuserlocationrequest.md'
    };
  },
  methods: {
    getUserLocation() {
      this.$root.channel.postRequest('MyLocationPlugin.GetUserLocationRequest', [true]);
      this.$root.channel.log('MyLocationPlugin.GetUserLocationRequest posted with data', true);
    }
  }
};
</script>
