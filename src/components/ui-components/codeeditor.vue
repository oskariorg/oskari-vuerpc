<template>
  <div class="editor-wrapper">
    <div :id="id" class="editor"></div>
    <button class="expand-button" style="height: 20px; width: 100%">
      <!--TODO: add image to button <img src="..." />-->
      <span class="expand-content"></span>
    </button>
  </div>
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
      theme: 'ace/theme/monokai',
      tabSize: 2
    });
    const session = ace.createEditSession(this.code);
    const mode =
      this.modeSelector[this.mode] === undefined ? 'ace/mode/typescript' : this.modeSelector[this.mode];
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

.editor-wrapper {
  display: grid;
}
/** 
This style creates an upside down triangle inside the button and flips it by 180 degrees when clicked.
*/
.expand-button {
  background-color: #23241f;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}

.expand-content {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 14px solid #fff;
}

.expand-content,
.expand-content::before,
.expand-content::after {
  position: absolute;
  transform: translate(-50%, -50%);
}
.toggled .expand-content {
  transform: rotate(180deg) translate(50%, 50%);
  -webkit-transform: rotate(180deg) translate(50%, 50%);
  -moz-transform: rotate(180deg) translate(50%, -50%);
  -o-transform: rotate(180deg) translate(50%, -50%);
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