<template>
  <div>
    <p>
      Info boxes support much more than just text content. For example, info boxes can be styled
      with colour schemes, and action buttons and links can be appended to info boxes.
    </p>
    <h3>Reacting to events</h3>
    <p>
      Clicking an action in the infobox triggers an <InlineCode>InfoboxActionEvent</InlineCode>,
      making programmatically reacting to events possible.
    </p>
    <DocumentationLink type="event" :apiDoc="apiDocPage"> To the documentation </DocumentationLink>
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
    <p>
      In this example, an event listener is initialized to listen to
      <InlineCode>InfoboxActionEvents</InlineCode>. The event that is sent when an action is
      registered is captured by the event listener, and the event listener reacts in a defined way.
      In this case, clicking the 'Add marker here' button sends an
      <InlineCode>AddMarkerRequest</InlineCode> with the current map center coordinates as a
      parameter, while the 'Remove markers' button sends a
      <InlineCode>RemoveMarkersRequest</InlineCode>.
    </p>
    You can add an info box and try out the actions triggered by the underlying code with this
    button:
    <CodeSnippet :runnable="true" buttonText="Show info box">{{ request }}</CodeSnippet>
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
      apiDocPage: 'ui/infobox/event/infoboxactionevent.md',
      request
    };
  },
  methods: {
    handleInfoboxEvent(data) {
      if (data.action === 'Add marker here') {
        const coords = {
          x: data.actionParams.centerX,
          y: data.actionParams.centerY
        };

        this.$root.channel.postRequest('MapModulePlugin.AddMarkerRequest', [coords]);
        this.$root.channel.log('Marker added with data:', coords);
        return;
      }
      if (data.action === 'Remove markers') {
        this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest');
        return;
      }
    }
  },
  mounted() {
    if (this.$root.channel.isReady()) {
      this.$root.channel.sendUIEvent(['mapmodule.crosshair'], () => {});
    } else {
      EVENTBUS.once('channel.available', () => {
        this.$root.channel.sendUIEvent(['mapmodule.crosshair'], () => {});
      });
    }
    listeners.push(
      EVENTBUS.on('InfoboxActionEvent', (data) => {
        this.handleInfoboxEvent(data);
      })
    );
  },
  beforeUnmount() {
    this.$root.channel.postRequest('InfoBox.HideInfoBoxRequest');
    this.$root.channel.postRequest('MapModulePlugin.RemoveMarkersRequest');
    this.$root.channel.sendUIEvent(['mapmodule.crosshair'], () => {});
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
            centerX: parseInt(data.centerX),
            centerY: parseInt(data.centerY),
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
      hidePrevious: true,
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
