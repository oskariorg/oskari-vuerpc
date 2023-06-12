<template>
  <div>
    <h2>{{ title }}</h2>

    <p>
      The state of the map can be queried, set or reset to the state it had when the map was first
      loaded with functions on the RPC API client.
    </p>

    <h3>getCurrentState()</h3>
    <p>
      The <InlineCode>getCurrentState()</InlineCode> function returns an Object describing the state
      of the map. This object can be saved on the app to for example provide a
      history/back-functionality.
    </p>
    <CodeSnippet>
channel.getCurrentState(function (data) {
  channel.log('GetCurrentState: ', data);
});
    </CodeSnippet>

    <RunExampleButton @click="saveState">Save current state</RunExampleButton>

    <h3>useState()</h3>
    <p>
      The <InlineCode>useState()</InlineCode> function takes an Object describing the state of the
      map as parameter. To see an example of this object you can click the "Save current state"
      button. After clicking the button, move/zoom the map and then click the "Restore state" button
      below to see the map set to the state that it was in when the Save button was clicked.
    </p>
    <CodeSnippet :snippet="useStateSnippet"></CodeSnippet>

    <RunExampleButton @click="loadState">Load saved state</RunExampleButton>

    <h3>resetState()</h3>
    <p>
      The <InlineCode>resetState()</InlineCode> function restores the map state to the original
      state it was in when the page was loaded.
    </p>
    <CodeSnippet>
channel.resetState(function () {
  channel.log('State Reset');
});
    </CodeSnippet>

    <RunExampleButton @click="resetState">Reset state</RunExampleButton>

    <h3>StateChangedEvent</h3>
    <p>
      Sent after massive application state change occurs. This allows RPC-based apps to detect things like user clicking on the "reset map to default". The state "reset" clears for example markers from the map and re-add for example markers that they need after such reset.
    </p>
    <DocumentationLink type="event" :apiDoc="eventApiDocPage">Documentation for {{eventName}}</DocumentationLink>
    <CodeSnippet>
{
    "current": {
        "mapfull": {
            "state": {
                "north": 7250000,
                "east": 520000,
                "zoom": 0,
                "srs": "EPSG:3067",
                "selectedLayers": [
                    {
                        "id": 801,
                        "opacity": 100,
                        "style": "default"
                    }
                ],
                "plugins": {
                    "MainMapModuleMarkersPlugin": {
                        "markers": []
                    },
                    "MainMapModuleFullScreenPlugin": {
                        "fullscreen": false
                    }
                }
            }
        },
        "toolbar": {
            "state": {}
        },
        "search": {
            "state": {}
        },
        "statsgrid": {
            "state": {
                "view": false
            }
        },
        "metadataflyout": {
            "state": {}
        },
        "printout": {
            "state": {}
        },
        "timeseries": {
            "state": null
        },
        "maprotator": {
            "state": {
                "degrees": 0
            }
        }
    },
    "previous": {
        "mapfull": {
            "state": {
                "north": 8009268.642888758,
                "east": 99676.35560292119,
                "zoom": 2,
                "srs": "EPSG:3067",
                "selectedLayers": [
                    {
                        "id": 801,
                        "opacity": 100,
                        "style": "default"
                    }
                ],
                "plugins": {
                    "MainMapModuleMarkersPlugin": {
                        "markers": []
                    },
                    "MainMapModuleFullScreenPlugin": {
                        "fullscreen": false
                    }
                }
            }
        },
        "toolbar": {
            "state": {
                "selected": {
                    "id": "select",
                    "group": "default-basictools"
                }
            }
        },
        "search": {
            "state": {}
        },
        "statsgrid": {
            "state": {
                "view": false
            }
        },
        "metadataflyout": {
            "state": {}
        },
        "printout": {
            "state": {}
        },
        "timeseries": {
            "state": null
        },
        "maprotator": {
            "state": {
                "degrees": 0
            }
        }
    }
}
    </CodeSnippet>

  </div>
</template>

<script>
const title = 'Handle map state';

const eventApiDocPage = 'framework/core/event/StateSavedEvent.md';
const eventName = 'StateChangedEvent';

export default {
  name: 'MapState',
  label: title,
  data() {
    return {
      title,
      savedState: {},
      eventApiDocPage,
      eventName
    };
  },
  computed: {
    useStateSnippet() {
      // Changing slot content won't update the code highlight at runtime
      // If we pass the whole snippet as prop it will be updated as expected
      const json = JSON.stringify(this.savedState, null, 2);
      // the first slash removes the line break from example code snippet
      return `\
var savedState = ${json};
channel.useState([savedState], function () {
  channel.log('UseState: ', savedState);
});`;
    }
  },

  methods: {
    resetState() {
      this.$root.channel.resetState(() => {
        this.$root.channel.log('State Reset');
      });
    },
    saveState() {
      this.$root.channel.getCurrentState((data) => {
        this.savedState = data;
        this.$root.channel.log('GetCurrentState: ', data);
      });
    },
    loadState() {
      this.$root.channel.useState([this.savedState], () => {
        this.$root.channel.log('UseState: ', this.savedState);
      });
      if (Object.keys(this.savedState).length === 0) {
        this.$root.channel.log(
          'UseState() without params or with an empty object as param doesn\'t do anything. Click "Save state", move the map and then click "Load state" to see the effect.'
        );
      }
    }
  },
  beforeUnmount() {
    // Clean up when user leaves the example
    this.$root.channel.resetState(() => {
      this.$root.channel.log('Map state reset on exiting the example: "' + title + '"');
    });
  }
};
</script>
