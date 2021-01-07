# Oskari Rpc-examples

> Examples demonstrating the RPC functionality of Oskari

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```
## Integrate to oskari-docs:

`npm run build`  
* copy contents from __/dist__ to __oskari-docs__ project folder: __/public/examples/rpc-api/__ (delete old files from said directory)  

## Example pages navigation

The `src/pages/index.js` defines the structure for navigation between the examples. The dropdown is created by following the `sections` array for generating the grouping and each section having a `pages` array for generating the actual example options and `name` that is shown as the label for the group on the navigation dropdown. The items in the `pages` array are expected to be Vue-components that have at least a name variable /for routing etc).

The next/previous links are generated with the same method so you only need to configure the order once and it will be reflected on both the dropdown and the next/previous links (they show the next or previous option in the dropdown).

## Tips for creating example pages

1) Create a .vue file for the new example component under `pages/[section of your choice]/[your new example].vue`
2) Import the `./[your new example].vue` component in `pages/[section of your choice]/index.js` and add it to the desired spot on the `pages` array.

The example component should have:
- name = used for url paths and linking to direct example page
- label = used for user friendly text to show on the dropdown/navigation

The example can listen to RPC events when `mounted()` BUT should also cleanup any listeners it adds on `beforeDestroy()`:

```
import EVENTBUS from '../../util/eventbus';
const listeners = []
export default {
  name: 'InternalIdentifierAndURLpath,
  label: 'User-friendly title for example',
  mounted () {
    listeners.push(EVENTBUS.on('SearchResultEvent', (data) => handleSearchResult(data, this.$root.channel)));
  },
  beforeDestroy: () => {
    // Clean up when user leaves the example
    while (listeners.length) {
      EVENTBUS.off('SearchResultEvent', listeners.pop());
    }
  }
}
```
*Note!* The example should also cleanup any state they might have changed for the map like remove any markers, features or layers added by that example if any.

The example pages can trigger a popup to be shown to the user by doing:
```
import EVENTBUS from '../../util/eventbus';
const showPopup = (msg, seconds = 5) => {
  EVENTBUS.notify('rpcAppDisplayMessage', { msg, seconds });
};
```

### Documentation links

There's a global `<DocumentationLink>` tag for linking documentation from oskari.org/api. The type is one of `event`, `request` or `bundle` depending what you want to link:

```
    <DocumentationLink type="event" apiDoc="mapping/mapmodule/event/MapClickedEvent.md" />
```

### Code examples

There's a global `<CodeSnippet>` tag for show-casing example code and `<RunExampleButton>` so we can easily change the visuals for that button. Use the code as body content for `CodeSnippet` whenever you can to improve readability. You should always try to render the code that is actually used for the example as code-snippet instead of hardcoding the parameters in the text and defining them again for the actual "runExample"

If you need the show-cased code to change during runtime you can use this approach (clickEventSnippet):

```
<template>
  <div>
    <CodeSnippet>
    var params = {{ JSON.stringify(exampleParams, null, 2) }};
    doStuff(params);
    </CodeSnippet>
    <CodeSnippet v-if="clickEvent" :snippet="clickEventSnippet" />
    <RunExampleButton @click="runExample">Run the example code</RunExampleButton>
  </div>
</template>

<script>
export default {
  ...
  data () {
    return {
      ...,
      clickEvent: null,
      exampleParams: {
        some: 'thing'
      }
    }
  },
  computed: {
    clickEventSnippet () {
      // Changing slot content won't update the code highlight at runtime
      // If we pass the whole snippet as prop it will be updated as expected
      return JSON.stringify(this.clickEvent, null, 2);
    }
  },
  methods: {
    runExample () {
        // do stuff with this.exampleParams so we show the same snippet as an example
        // AND use the same data as param for running the code
        doStuff(this.exampleParams);
    }
  },
  mounted () {
    listeners.push(EVENTBUS.on('MapClickedEvent', (data) => {
      this.clickEvent = data;
    }));
  },
  beforeDestroy: () => {
    // Clean up when user leaves the example
    while (listeners.length) {
      EVENTBUS.off('MapClickedEvent', listeners.pop());
    }
  }
}
</script>
```

### Documentation links

There's a global `<DocumentationLink>` tag for linking documentation from oskari.org/api. The type is one of `event`, `request` or `bundle` depending what you want to link:

```
    <DocumentationLink type="event" apiDoc="mapping/mapmodule/event/MapClickedEvent.md" />
```


    <RunExampleButton @click="rotateMap">Reset Rotation</RunExampleButton>