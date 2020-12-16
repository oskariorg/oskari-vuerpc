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
        apiDoc: String
    },
    computed: {
        documentationLink() {
            return this.$root.documentPathEvent + this.apiDoc;
        }
    }
}
</script>