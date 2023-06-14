<template>
  <div>
    <h3>Show infobox</h3>
    <p>
      <InlineCode>{{ request.show }}</InlineCode> allows appending content to a specific location on
      the map as a pop-up. A simple example of adding a pop-up with only text content is located
      below.
    </p>
    <RunExampleButton @click="addInfoBox">Add info box</RunExampleButton>
    <CodeSnippet>
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
  }           // position
];
channel.postRequest('{{ request.show }}', data);
    </CodeSnippet>
    <p>
      A more in-depth example showcasing the various functionalities of
      <InlineCode>{{ request.show }}</InlineCode> can be found on the next page.
    </p>
    <h3>Hide infobox</h3>
    Info boxes can be removed from the map with <InlineCode>{{ request.hide }}</InlineCode
    >. Remove a specific info box by passing the info box's id as a parameter, or remove all info
    boxes by passing no paramaters.
    <CodeSnippet>
const infoboxId = 'my infobox';
channel.postRequest('{{ this.request.hide }}', infoboxId);
    </CodeSnippet>
    <RunExampleButton @click="hideInfobox(infoboxId)">Hide infobox</RunExampleButton>
    <p>An <InlineCode>Infobox.InfoBoxEvent</InlineCode> occurs when an info box is closed.</p>
    <CodeSnippet>
{
  "id": "my infobox",
  "isOpen": false
}
    </CodeSnippet>
    <br />
    <DocumentationLink type="request" :apiDoc="apiDocPage.show">
      Documentation for {{ request.show }}
    </DocumentationLink>
    <br />
    <DocumentationLink type="request" :apiDoc="apiDocPage.hide">
      Documentation for {{ request.hide }}
    </DocumentationLink>
  </div>
</template>
<script>
export default {
  name: 'infoBoxSimple',
  label: 'Simple infobox example',
  data() {
    return {
      request: {
        show: 'InfoBox.ShowInfoBoxRequest',
        hide: 'InfoBox.HideInfoBoxRequest'
      },
      apiDocPage: {
        show: 'ui/infobox/request/infobox.showinfoboxrequest.md',
        hide: 'ui/infobox/request/infobox.hideinfoboxrequest.md'
      },
      infoboxId: 'my infobox'
    };
  },
  methods: {
    addInfoBox() {
      const x = 385954,
        y = 6671804;
      const content = [
        {
          html: '<div>The capital of Finland</div>'
        }
      ];
      const data = [
        this.infoboxId,
        'Helsinki',
        content,
        { lon: x, lat: y },
        { hidePrevious: true }
      ];
      this.$root.channel.postRequest('MapMoveRequest', [x, y, 3]);
      this.$root.channel.postRequest(this.request.show, data);
      this.$root.channel.log(`${this.request.show} posted with data: `, data);
    },
    hideInfobox(id = null) {
      this.$root.channel.postRequest(this.request.hide, [id]);
      this.$root.channel.log(`${this.request.hide} posted with data: `, id);
    }
  },
  beforeUnmount() {
    this.hideInfobox();
  }
};
</script>
