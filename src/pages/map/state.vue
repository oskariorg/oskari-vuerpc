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
var savedState = {};

channel.getCurrentState(function (data) {
  channel.log('GetCurrentState: ', data);
  savedState = data;
});
    </CodeSnippet>

    <RunExampleButton @click="saveState">Save current state</RunExampleButton>

    <h3>useState()</h3>
    <p>
      The <InlineCode>useState()</InlineCode> function takes an Object describing the state of the
      map as parameter. To see an example of this object you can click the "Save current state"
      button. After clicking the button, move/zoom the map and then click the "Load saved state"
      button below to see the map set to the state that it was in when the Save button was clicked.
    </p>
    <CodeSnippet :runnable="true" buttonText="Load saved state">
      {{ useStateSnippet }}
     </CodeSnippet>

    <h3>resetState()</h3>
    <p>
      The <InlineCode>resetState()</InlineCode> function restores the map state to the original
      state it was in when the page was loaded.
    </p>
    <CodeSnippet :runnable="true" buttonText="Reset state">
channel.resetState(function () {
  channel.log('State Reset');
});
    </CodeSnippet>
  </div>
</template>

<script>
const title = 'Handle map state';

export default {
  name: 'MapState',
  label: title,
  data() {
    return {
      title,
      savedState: {}
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
    saveState() {
      this.$root.channel.getCurrentState((data) => {
        this.savedState = data;
        this.$root.channel.log('GetCurrentState: ', data);
      });
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
