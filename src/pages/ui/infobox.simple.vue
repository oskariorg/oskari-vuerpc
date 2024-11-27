<template>
  <div>
    <h3>Show info box</h3>
    <p>
      <InlineCode>{{ request.show }}</InlineCode> allows appending content to a specific location on
      the map as a pop-up. A simple example of adding a pop-up with only text content is located
      below.
    </p>
    <CodeSnippet :runnable="true" buttonText="Add info box">
const x = 385954;
const y = 6671804;
const content = [
  {
    html: '&lt;div&gt;The capital of Finland&lt;/div&gt;'
  }
];
const data = [
  'infobox',  // infobox id
  'Helsinki', // title
  content,    // content
  {
    lon: x,
    lat: y
  },          // position
  {
    hidePrevious: true
  }
];
// move map to point first
channel.postRequest('MapMoveRequest', [x, y, 3])
channel.postRequest('{{ request.show }}', data);
    </CodeSnippet>
    <p>
      A more in-depth example showcasing the various functionalities of
      <InlineCode>{{ request.show }}</InlineCode> can be found on the next page.
    </p>
    <DocumentationLink type="request" apiDoc="InfoBox.ShowInfoBoxRequest">
      Documentation for {{ request.show }}
    </DocumentationLink>
    <h3>Hide info box</h3>
    <p>
      Info boxes can be removed from the map with <InlineCode>{{ request.hide }}</InlineCode
      >. Remove a specific info box by passing the info box's id as a parameter, or remove all info
      boxes by passing no paramaters.
    </p>
    <DocumentationLink type="request" apiDoc="InfoBox.HideInfoBoxRequest">
      Documentation for {{ request.hide }}
    </DocumentationLink>
    <CodeSnippet :runnable="true" buttonText="Hide info box">
const infoboxId = 'infobox';
channel.postRequest('{{ this.request.hide }}', [infoboxId]);
    </CodeSnippet>
    <h3>Reacting to closing info boxes</h3>
    <p>
      An <InlineCode>Infobox.InfoBoxEvent</InlineCode> occurs when an info box is closed, allowing
      programs to react in a defined way to closing info boxes.
    </p>
    <CodeSnippet>
{
  "id": "infobox",
  "isOpen": false
}
    </CodeSnippet>
    <DocumentationLink type="event" apiDoc="InfoBox.InfoBoxEvent">
      Documentation for InfoBoxEvent
    </DocumentationLink>
    
  </div>
</template>
<script>
export default {
  name: 'infoBoxSimple',
  label: 'Show or hide info box',
  data() {
    return {
      request: {
        show: 'InfoBox.ShowInfoBoxRequest',
        hide: 'InfoBox.HideInfoBoxRequest'
      },
      infoboxId: 'my infobox'
    };
  },
  beforeUnmount() {
    this.$root.channel.postRequest(this.request.hide, []);
  }
};
</script>
