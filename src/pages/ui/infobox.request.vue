<template>
  <div>
    <RunExampleButton @click="showInfoBoxRequest">InfoBox.ShowInfoBoxRequest</RunExampleButton>
    <DocumentationLink type="request" :apiDoc="apiDocPage.show">
      To the documentation
    </DocumentationLink>
    <CodeSnippet>{{ req }}</CodeSnippet>
    <RunExampleButton @click="hideInfoBoxRequest">InfoBox.HideInfoBoxRequest</RunExampleButton>
    <DocumentationLink type="request" :apiDoc="apiDocPage.hide">
      To the documentation
    </DocumentationLink>
    <CodeSnippet>
var infoboxId = 'myInfoBox';
channel.postRequest('InfoBox.HideInfoBoxRequest', [infoboxId]);
channel.log('InfoBox.HideInfoBoxRequest posted with data', infoboxId);
    </CodeSnippet>
  </div>
</template>

<script>
const showInfoBoxRequest = () => {
  //get map center and then show an infobox at that location
  this.$root.channel.getMapPosition(function (data) {
    const content = [
      {
        html: '<div>Map position info</div>'
      },
      {
        html: '<div>Center: ' + parseInt(data.centerX) + ', ' + parseInt(data.centerY) + '</div>',
        actions: [
          {
            name: 'My link 1',
            type: 'link',
            action: {
              info: 'this can include any info',
              info2: 'action-object can have any number of params'
            }
          },
          {
            name: 'My link 2',
            type: 'link',
            action: {
              info: 'this can include any info',
              info2: 'action-object can have any number of params'
            }
          }
        ]
      },
      {
        html: '<div>Zoom level: ' + data.zoom + '</div>'
      },
      {
        actions: [
          {
            name: 'My link 3',
            type: 'link',
            action: {
              info: 'this can include any info',
              info2: 'action-object can have any number of params'
            }
          },
          {
            name: 'My link 4',
            type: 'link',
            action: {
              info: 'this can include any info',
              info2: 'action-object can have any number of params'
            }
          },
          {
            name: 'My button 1',
            type: 'button',
            group: 1,
            action: {
              info: 'this can include any info',
              info2: 'action-object can have any number of params',
              buttonInfo:
                'This button has group 1 and is placed to the same row with other actions that have the same group'
            }
          },
          {
            name: 'My button 2',
            type: 'button',
            group: 1,
            action: {
              info: 'this can include any info',
              info2: 'action-object can have any number of params',
              buttonInfo:
                'This button has group 1 and is placed to the same row with other actions that have the same group'
            }
          }
        ]
      }
    ];
    data = [
      'myInfoBox',
      'Generic info box',
      content,
      {
        lon: data.centerX,
        lat: data.centerY
      },
      {
        colourScheme: {
          bgColour: '#00CCFF',
          titleColour: '#FFFFFF',
          headerColour: '#0066FF',
          iconCls: 'icon-close-white',
          buttonBgColour: '#00CCFF',
          buttonLabelColour: '#FFFFFF',
          linkColour: '#000000'
        },
        font: 'georgia',
        positioning: 'left'
      }
    ];

    this.$root.channel.postRequest('InfoBox.ShowInfoBoxRequest', data);
    this.$root.channel.log('InfoBox.ShowInfoBoxRequest posted with data', data);
  });
};

export default {
  name: 'ShowInfoBox',
  label: 'Show or hide info box',
  data() {
    return {
      desc: 'Show or hide info box',
      apiDocPage: {
        show: 'ui/infobox/request/infobox.showinfoboxrequest.md',
        hide: 'ui/infobox/request/infobox.hideinfoboxrequest.md'
      },
      req: showInfoBoxRequest.toString().replace('this.$root.', '') //follow same styling as other examples
    };
  },
  methods: {
    showInfoBoxRequest,
    hideInfoBoxRequest() {
      const infoboxId = 'myInfoBox';
      this.$root.channel.postRequest('InfoBox.HideInfoBoxRequest', [infoboxId]);
      this.$root.channel.log('InfoBox.HideInfoBoxRequest posted with data', infoboxId);
    }
  },
  beforeUnmount() {
    this.$root.channel.postRequest('InfoBox.HideInfoBoxRequest');
  }
};
</script>
