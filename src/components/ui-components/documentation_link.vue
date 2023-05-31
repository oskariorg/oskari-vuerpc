<template>
  <a :href="documentationLink" target="_blank">
    <slot>Link to documentation</slot>
  </a>
</template>

<script>
// TODO: maybe try showing this on the site here.
// Might need some cors-headers etc(?):
// https://oskari.org/apidoc/2.1.0/mapping/mapmodule/event/AfterMapMoveEvent.md
export default {
  props: {
    apiDoc: String,
    href: String,
    type: String
  },
  computed: {
    documentationLink() {
      if (this.href) {
        return this.href;
      }
      const linkConfig = this.$root.documentationLinks;
      let baseUrl = linkConfig.base;
      if (!this.type || !this.apiDoc) {
        // fallback to api doc root
        return baseUrl;
      }
      const typePath = linkConfig[this.type];
      if (typePath) {
        // link to events/requests/bundles
        return baseUrl + typePath + this.apiDoc;
      }
      // fallback to api doc root
      return baseUrl;
    }
  }
};
</script>
