<template>
  <div class="editor-wrapper">
    <div :id="id" class="editor"></div>
    <button class="expand-button" :id="`expand-button-${id}`">
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
      editor: null,
      isCollapsed: true,
      defaultSize: 20,
      modeSelector: {
        javascript: 'ace/mode/typescript',
        html: 'ace/mode/html_ruby'
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
      maxLines: this.defaultSize,
      minLines: 10,
      fontSize: 14,
      theme: 'ace/theme/monokai',
      tabSize: 2
    });
    const session = ace.createEditSession(this.code);
    const mode =
      this.modeSelector[this.mode] === undefined
        ? 'ace/mode/typescript'
        : this.modeSelector[this.mode];
    session.setMode(mode);
    editor.setSession(session);
    this.editor = editor;

    // add button on click event so that button styling works
    const button = document.getElementById(`expand-button-${this.id}`);
    button.addEventListener('click', () => {
      button.classList.toggle('toggled');
      this.expandCollapseEditor();
    });
  },
  methods: {
    expandCollapseEditor() {
      if (this.isCollapsed) {
        const length = this.editor.session.getLength();
        this.editor.setOption('maxLines', length);
      } else {
        this.editor.setOption('maxLines', this.defaultSize);
      }
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>

<style scoped>
.editor-wrapper {
  display: grid;
}
.editor {
  width: 100%;
  height: 400px;
}
/** 
This style creates an upside down triangle inside the button and flips it by 180 degrees
when clicked.
*/
.expand-button {
  width: 100%;
  height: 20px;
  background-color: #23241f;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: relative;
}
.expand-content {
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 14px solid #75715e;
  top: 1px
}
.expand-content,
.expand-content::before,
.expand-content::after {
  position: absolute;
}
.toggled .expand-content {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
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
