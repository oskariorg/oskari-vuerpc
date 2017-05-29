<template>
    <div class="mirror" ref="codemirror">
      <button @click="excecuteCode">Run!</button>
      <div ref="output"></div>
    </div>
</template>

<script>
import CodeMirror from 'codemirror';
// import js from 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/addon/fold/foldgutter.css';

export default {
  data () {
    return {
      codeMirror: '',
      editorOptions: {
        mode: 'javascript',
        theme: 'monokai',
        // lineNumbers: true,
        line: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        styleSelectedText: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
      }
    }
  },
  methods: {
    initCodeMirror () {
      this.codeMirror = CodeMirror(this.$refs.codemirror, this.editorOptions);
    },
    excecuteCode (e) {
      let code = e.target.parentElement.getElementsByClassName('CodeMirror-code')[0].textContent;
      code = code.replace(/channel/g, 'this.$root.channel');
      eval(code);
    }
  },
  mounted () {
    this.initCodeMirror();
  }
}
</script>

<style>
.mirror {
  /*background-color: red;*/
  width: 32.3%;
}
.CodeMirror {
  height: 75px !important;
}
</style>
