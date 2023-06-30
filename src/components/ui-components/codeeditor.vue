<template>
  <div :id="id" class="editor"></div>
  <button class="expand-button" style="height: 50px; width: 100%">
    <!--TODO: add image to button <img src="..." />-->
    <span class="expand-content">expand</span>
  </button>
</template>
<script>
import ace from 'ace-builds';
import 'ace-builds/esm-resolver';

export default {
  name: 'codeEditor',
  data() {
    return {
      id: `${this.$.uid}`,
      modeSelector: {
        javascript: 'ace/mode/typescript',
        xml: 'ace/mode/html_ruby'
      }
    };
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'javascript'
    }
  },
  mounted() {
    // create editor and set its properties
    const editor = ace.edit(this.id, {
      maxLines: 20,
      minLines: 10,
      fontSize: 14,
      theme: 'ace/theme/one_dark',
      tabSize: 2
    });
    const session = ace.createEditSession(this.code);
    const mode =
      this.modeSelector[this.mode] === null ? 'ace/mode/typescript' : this.modeSelector[this.mode];
    session.setMode(mode);
    editor.setSession(session);

    // add button on click event so that button styling works
    const button = document.querySelector('.expand-button');
    button.addEventListener('click', () => {
      button.classList.toggle('toggled');
      this.expandEditor();
    });
  },
  methods: {
    expandEditor() {
      console.log('expand...');
    }
  }
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 400px;
}

/** 
This style flips the content of the button by 180 degrees when clicked
*/
.expand-button {
  background-color: #3d3d3d;
}

.expand-content,
.expand-content::before,
.expand-content::after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 200%);
}
.toggled .expand-content {
  transform: rotate(180deg) translate(50%, -200%);
  -webkit-transform: rotate(180deg) translate(50%, -200%);
  -moz-transform: rotate(180deg) translate(50%, -200%);
  -o-transform: rotate(180deg) translate(50%, -200%);
}

.toggled .expand-content::after {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
}
.expand-content,
.expand-content::after {
  transition: all 0.3s linear;
}
</style>
