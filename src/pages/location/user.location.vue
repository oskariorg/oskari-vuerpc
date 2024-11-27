<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Allows app to fetch user's geolocation. Additional configurations needed in application for
      geolocation to work.
    </p>
    <DocumentationLink type="request" apiDoc="GetUserLocationRequest">
      Documentation for GetUserLocationRequest
    </DocumentationLink>
    <CodeSnippet :runnable="true" buttonText="Get user location">
      channel.postRequest('MyLocationPlugin.GetUserLocationRequest', [true]);
    </CodeSnippet>
  </div>
</template>
<script>
const title = 'Get users location';
export default {
  name: 'GetUserLocationRequest',
  label: title,
  data() {
    return {
      title
    };
  }
};
</script>
