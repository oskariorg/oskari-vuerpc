<template>
  <input type="text" v-model="search" placeholder="Search..." @input="search" />
</template>
<script>
export default {
  name: 'textInput',
  data() {
    return {
      search: ''
    };
  }
};
</script>
