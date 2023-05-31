<template>
  <input type="text" v-model="search" placeholder="Search..." @input="search" />
</template>
<script>
export default {
  data() {
    return {
      search: ''
    };
  },
  methods: {
    search(event) {}
  }
};
</script>
