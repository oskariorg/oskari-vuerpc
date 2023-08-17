<template>
  <div>
    <p>
      Allows app to fetch user's geolocation. Additional configurations needed in application for
      geolocation to work.
    </p>
    <DocumentationLink type="request" :apiDoc="apiDocpage">
      Documentation for GetUserLocationRequest
    </DocumentationLink>
    <CodeSnippet :runnable="true" buttonText="Get user location">
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
  }
};
</script>
