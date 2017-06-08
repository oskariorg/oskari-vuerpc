<template>
<div class="col-md-6 col-sm-12 col-lg-4 full-height-panel">
  <div class="panel panel-default form-panel">
    <div class="panel-body">
      <div id="select-panel">
        <h2>Select Action
          <dropdown></dropdown>
        </h2>
        <example></example>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import dropdown from './dropdown.vue';
import example from './example.vue';
import style from '../../style.css';

export default {
  components: {
    'dropdown': dropdown,
    'example': example
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
a {
  color: #8aa5d1 !important;
}
.form-panel {
  border:0.5px solid #D9D9D9;
  height:770px;
}
#select-panel{
  margin: 0 auto;
}

</style>
