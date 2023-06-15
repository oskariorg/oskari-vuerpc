<template>
  <div>
    <p>
      Info boxes support much more than just text content. Links and action buttons are an example
      of other appendable stuff.
    </p>
    <RunExampleButton @click="showInfoBoxRequest(this.$root.channel)">
      InfoBox.ShowInfoBoxRequest
    </RunExampleButton>
    <DocumentationLink type="request" :apiDoc="apiDocPage">
      To the documentation
    </DocumentationLink>
    <CodeSnippet>{{ request }}</CodeSnippet>
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus.js';

const listeners = [];

const showInfoBoxRequest = (channel) => {
  //get map center and then show an infobox at that location
  channel.getMapPosition(function (data) {
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

    channel.postRequest('InfoBox.ShowInfoBoxRequest', data);
    channel.log('InfoBox.ShowInfoBoxRequest posted with data', data);
  });
};

export default {
  name: 'ShowInfoBox',
  label: 'Info box continued',
  data() {
    return {
      desc: 'Info box continued',
      apiDocPage: 'ui/infobox/request/infobox.showinfoboxrequest.md',
      request
    };
  },
  methods: {
    showInfoBoxRequest,
    handleEvent(data) {
      this.$root.channel.log('info box clicked with data:', data);
    }
  },
  mounted() {
    EVENTBUS.on('InfoboxActionEvent', (data) => {
      this.handleEvent(data);
    });
  },
  beforeUnmount() {
    this.$root.channel.postRequest('InfoBox.HideInfoBoxRequest');
    while (listeners.length) {
      EVENTBUS.off('InfoboxActionEvent', listeners.pop());
    }
  }
};

const request = `\
//get map center and then show an infobox at that location
channel.getMapPosition(function (data) {
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

  channel.postRequest('InfoBox.ShowInfoBoxRequest', data);
  channel.log('InfoBox.ShowInfoBoxRequest posted with data', data);
});
`;
</script>
