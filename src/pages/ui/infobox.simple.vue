<template>
  <div>
    <p>
      <InlineCode>{{ request.show }}</InlineCode> allows appending content to a specific location on
      the map as a pop-up.
    </p>
    <RunExampleButton @click="addInfoBox">Add infobox</RunExampleButton>
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
      }
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
      const data = ['infobox', 'Helsinki', content, { lon: x, lat: y }, { hidePrevious: true }];
      this.$root.channel.postRequest('MapMoveRequest', [x, y, 3]);
      this.$root.channel.postRequest(this.request.show, data);
    }
  },
  beforeUnmount() {
    this.$root.channel.postRequest(this.request.hide);
  }
};
</script>
