<template>
  <div id="GetScreenshot">
    <button id="btnGetScreenshotFunction"
    class="btn btn-primary" data-example="getScreenshot" @click="getScreenshot">Get screenshot</button>
    <div>
      Get a screenshot of the current map. (Experimental! Also requires suitable, CORS-enabled map layers on the published map.)
    </div>
    <code-component snippet="channel.getScreenshot(function(data) {
      //set image content to an img tag in your html
      document.getElementById('getScreenshotImgTag').src = data;
    });"></code-component>
    <div>
      Screenshot result:
      <img style="border: 1px solid black;max-width:100%;overflow: hidden;" ref="getScreenshotImgTag" src=""/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GetScreenshot',
  data () {
    return {
      desc: 'Get a screenshot of the map'
    }
  },
  methods: {
    getScreenshot () {
      this.$root.channel.getScreenshot((data) => {
        const success = data && data.length;
        const msg = 'GetScreenshot ' + (success ? 'success ' : 'failed');
        this.$root.channel.log(msg);
        this.$refs.getScreenshotImgTag.src = data;
      });
    }
  }
}
</script>
