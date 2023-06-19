<template>
  <div>
    <p>
      Info boxes support much more than just text content. Links and action buttons are an example
      of other appendable stuff.
    </p>
    <RunExampleButton @click="showInfoBoxRequest"> InfoBox.ShowInfoBoxRequest </RunExampleButton>
    <DocumentationLink type="request" :apiDoc="apiDocPage">
      To the documentation
    </DocumentationLink>
    <CodeSnippet>{{ request }}</CodeSnippet>
    <p>
      Clicking an action in the infobox triggers an <InlineCode>InfoboxActionEvent</InlineCode>.
      palceholder placeholder
    </p>
    <CodeSnippet>
{
  "id": "myInfoBox",
  "action": "My link 1",
  "actionParams": {
    "info": "this can include any info",
    "info2": "action-object can have any number of params"
  }
}
    </CodeSnippet>
  </div>
</template>

<script>
import EVENTBUS from '../../util/eventbus.js';

const listeners = [];

export default {
  name: 'ShowInfoBox',
  label: 'Info box continued',
  data() {
    return {
      desc: 'Info box continued',
      apiDocPage: 'ui/infobox/request/infobox.showinfoboxrequest.md',
      center: {},
      request
    };
  },
  methods: {
    showInfoBoxRequest() {
      //get map center and then show an infobox at that location
      this.$root.channel.getMapPosition((data) => {
        this.center = {
          x: data.centerX,
          y: data.centerY,
          shape: 2
        };
        const content = [
          {
            html: '<div>Map position info:</div>'
          },
          {
            html: `<div>Center: ${parseInt(data.centerX)}, ${parseInt(
              data.centerY
            )}<br />Zoom level: ${data.zoom}</div>`
          },
          {
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
            actions: [
              {
                name: 'Add marker here',
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
                name: 'Remove markers',
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
            lon: this.center.x,
            lat: this.center.y
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
    },
    handleInfoboxEvent(data) {
      if (data.action === 'Add marker here') {
        this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [this.center]);
        this.$root.channel.log('Marker added with data:', this.center);
        return;
      }
      if (data.action === 'Remove markers') {
        this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest');
        return;
      }
    }
  },
  mounted() {
    listeners.push(
      EVENTBUS.on('InfoboxActionEvent', (data) => {
        this.handleInfoboxEvent(data);
      })
    );
  },
  beforeUnmount() {
    this.$root.channel.postRequest('InfoBox.HideInfoBoxRequest');
    this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest');
    while (listeners.length) {
      EVENTBUS.off('InfoboxActionEvent', listeners.pop());
    }
  }
};

const request = `\
//get map center and then show an infobox at that location
channel.getMapPosition((data) => {
  const content = [
    {
      html: '<div>Map position info:</div>'
    },
    {
      html: '<div>Center: '
        + parseInt(data.centerX)
        + ', '
        + parseInt(data.centerY)
        + '<br />Zoom level: '
        + data.zoom
        + '</div>'
    },
    {
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
      actions: [
        {
          name: 'Add marker here',
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
          name: 'Remove markers',
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
