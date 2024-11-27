<template>
  <div>
    <h2>{{ title }}</h2>
    <h3>Request a list of services for feedback</h3>
    <CodeSnippet :runnable="true" buttonText="Get list of available services">
      channel.postRequest('GetFeedbackServiceRequest', []);
    </CodeSnippet>
    <h3>Request additional metadata for feedback service</h3>
    <p>
      <b>Note!</b> if metadata property is false in the listing the details might not be available
      as it's optional in the Open311 specification.
    </p>
    <p>
      <b>Note!</b> Our test service doesn't have any metadata, so an error will be logged when
      pressing the button.
    </p>
    <CodeSnippet :runnable="true" buttonText="Request metadata for service id">
      channel.postRequest('GetFeedbackServiceRequest', ["180"]);
    </CodeSnippet>
    <p>
      <DocumentationLink type="request" apiDoc="GetFeedbackRequest">
        To the documentation
      </DocumentationLink>
    </p>
  </div>
</template>
<script>
const title = 'Get feedback services (poc)';
export default {
  name: 'GetFeedbackServices',
  label: title,
  data() {
    return {
      title,
      apiDocPageRequest: 'GetFeedbackRequest'
    };
  }
};
</script>
