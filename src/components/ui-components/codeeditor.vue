<template>
  <div :id="id" class="editor"></div>
</template>
<script>
import ace from 'ace-builds';
import 'ace-builds/esm-resolver';

export default {
  name: 'codeEditor',
  data() {
    return {
      id: `${this.$.uid}`
    };
  },
  mounted() {
    const editor = ace.edit(this.id, {
      maxLines: 20,
      minLines: 10,
      fontSize: 14,
      theme: 'ace/theme/one_dark',
      tabSize: 4
    });
    editor.session.setMode('ace/mode/typescript');
  }
};
</script>

<style>
.editor {
  width: 100%;
  height: 400px;
}
</style>
