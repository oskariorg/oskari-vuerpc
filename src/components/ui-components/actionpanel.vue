<template>
<div class="col-md-6 col-sm-12 col-lg-4 full-height-panel">
  <div class="panel panel-default form-panel">
    <div class="panel-body">
      <div id="select-panel">
        <example></example>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import example from './example.vue';

export default {
  components: {
    'example': example
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
#select-panel a {
  color: #8aa5d1;
}
.form-panel {
  border:0.5px solid #D9D9D9;
  height:770px;
}
#select-panel{
  margin: 0 auto;
}
h3 {
  font-family: 'Open Sans';
  font-size: 1.25rem !important;
}

</style>
