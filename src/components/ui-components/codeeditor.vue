<!---
This component is a PoC live code editor, which allows editing and running example code in the browser.

Props:
snippet: String value, contains the output code
mode: String, defines the language mode, possible values are 'javascript' and 'xml', defaults to 'javascript'
runnable: Boolean, if 'true', renders a button which runs the in-editor code when pressed
readOnly: sets the editor in read-only mode

Can be used without passing props like this:
<CodeEditor>code here</CodeEditor>

Or with props:
<CodeEditor
  :code="`console.log('Hello World!')`"
  :lang="'javascript'"
  :runnable="true"
  :readOnly="false"
/>
-->
<template>
  <div class="editor-wrapper">
    <div ref="editorRef" class="editor"></div>
    <!-- never rendered, used only for capturing content-->
    <slot v-if="false"></slot>
    <button v-if="runnable" @click="evaluateContent" ref="runnableRef" class="run-code-button">
      {{ buttonText }}
    </button>
    <button v-if="expandable" ref="expandRef" class="expand-button">
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
      editor: null,
      expandable: true,
      isCollapsed: true,
      defaultSize: 20,
      modeSelector: {
        javascript: 'ace/mode/typescript',
        xml: 'ace/mode/html_ruby'
      }
    };
  },
  props: {
    snippet: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: 'javascript'
    },
    buttonText: {
      type: String,
      default: 'Run code'
    },
    runnable: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // create editor and set its properties
    const editor = ace.edit(this.$refs.editorRef, {
      maxLines: this.defaultSize,
      minLines: this.defaultSize,
      fontSize: 14,
      theme: 'ace/theme/monokai',
      tabSize: 2,
      readOnly: this.readOnly,
      showPrintMargin: false
    });
    const session = ace.createEditSession(this.codeSnippet);
    const mode =
      this.modeSelector[this.lang] === undefined
        ? 'ace/mode/typescript'
        : this.modeSelector[this.lang];
    session.setMode(mode);
    editor.setSession(session);

    const snippetLineCount = editor.session.getLength();
    if (snippetLineCount <= this.defaultSize) {
      this.expandable = false;
      editor.setOptions({
        minLines: snippetLineCount + 1,
        maxLines: snippetLineCount + 1
      });
    }

    // expose to template and options API
    this.editor = editor;

    // add rounded corners to bottom element
    if (this.expandable) {
      const elem = this.$refs.expandRef;
      elem.classList.add('bottom-element');
      // add event listener that toggles the element class style and invokes method
      elem.addEventListener('click', () => {
        elem.classList.toggle('toggled');
        this.expandCollapseEditor();
      });
    } else if (this.runnable) {
      this.$refs.runnableRef.classList.add('bottom-element');
    } else {
      this.$refs.editorRef.classList.add('bottom-element');
    }
  },
  computed: {
    codeSnippet() {
      // try to use props
      let snippet = this.snippet;
      if (!snippet) {
        // no props, use slots intead
        try {
          const slotEl = this.$slots.default()[0];
          snippet = slotEl.text.trim();
        } catch (err) {
          snippet = 'Code snippet missing/unable to parse';
          err;
        }
      }
      // expose to template and other options API hooks
      return snippet;
    }
  },
  watch: {
    codeSnippet() {
      // update editor content when props value changes
      this.editor.setValue(this.codeSnippet);
      // render at most 20 lines
      const lineCount = Math.min(this.editor.session.getLength() + 1, 20);
      this.editor.setOptions({
        minLines: lineCount,
        maxLines: lineCount
      });
    }
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
    },
    evaluateContent() {
      if (!this.runnable) return;
      const content = this.editor.session.getValue();
      try {
        const expression = Function(content);
        expression();
      } catch (e) {
        this.$root.channel.log(`Error '${e}' while parsing statement: '${content}'`);
      }
    }
  }
};
</script>

<style>
.editor-wrapper {
  display: grid;
  padding-top: 1em;
  background-color: #272822;
  border-radius: 5px;
  margin: 1em;
}
.run-code-button {
  background-color: #272822;
  color: #f92672;
}
.bottom-element {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
/** 
* This style creates an upside down triangle inside the button and flips it by 180 degrees
* when clicked.
*/
.expand-button {
  width: 100%;
  height: 20px;
  background-color: #272822;
  position: relative;
}
.expand-content {
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 14px solid #75715e;
  top: 1px;
}
.expand-content,
.expand-content::before,
.expand-content::after {
  position: absolute;
  transition: all 0.3s linear;
}
.toggled .expand-content,
.toggled .expand-content::after {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
}
/**
* Set editor scrollbar style
*/
.ace_scrollbar::-webkit-scrollbar {
  height: 7px;
  width: 7px;
}
.ace_scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(39, 40, 34, 0.2);
  border-radius: 10px;
}
.ace_scrollbar::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  background-color: rgba(169, 169, 169, 0.2);
  outline: 1px solid slategrey;
  border-radius: 10px;
}
</style>
