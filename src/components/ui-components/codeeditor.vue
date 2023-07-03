<template>
  <div class="editor-wrapper">
    <div :id="id" class="editor"></div>
    <!-- never rendered, used only for capturing content-->
    <slot v-if="false"></slot>
    <button
      v-if="runnable"
      @click="evaluateContent"
      class="run-code-button"
      :id="`run-code-button-${id}`"
    >
      Run code
    </button>
    <button v-if="expandable" class="expand-button" :id="`expand-button-${id}`">
      <span class="expand-content"></span>
    </button>
  </div>
</template>
<script>
import ace from 'ace-builds';
import 'ace-builds/esm-resolver';
import { useSlots } from 'vue';

export default {
  name: 'codeEditor',
  data() {
    return {
      id: `${this.$.uid}`,
      editor: null,
      expandable: true,
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
    },
    runnable: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // create editor and set its properties
    const editor = ace.edit(this.id, {
      maxLines: this.defaultSize,
      minLines: 5,
      fontSize: 14,
      theme: 'ace/theme/monokai',
      tabSize: 2
    });
    const session = ace.createEditSession(this.codeSnippet);
    const mode =
      this.modeSelector[this.mode] === undefined
        ? 'ace/mode/typescript'
        : this.modeSelector[this.mode];
    session.setMode(mode);
    editor.setSession(session);
    this.editor = editor;

    const snippetLineCount = this.editor.session.getLength();
    if (snippetLineCount < this.defaultSize) {
      this.expandable = false;
      // render at least 5 lines
      this.editor.setOption('maxLines', Math.max(snippetLineCount, 5));
    }

    // add rounded corners to bottom element
    if (this.expandable) {
      const elem = document.getElementById(`expand-button-${this.id}`);
      elem.classList.add('bottom-element');
      // add event listener so that button is styled and functions as intended
      elem.addEventListener('click', () => {
        elem.classList.toggle('toggled');
        this.expandCollapseEditor();
      });
    } else if (this.runnable) {
      const elem = document.getElementById(`run-code-button-${this.id}`);
      elem.classList.add('bottom-element');
    } else {
      const elem = document.getElementById(this.id);
      elem.classList.add('bottom-element');
    }
  },
  computed: {
    codeSnippet() {
      // try to use props
      let snippet = this.code;
      if (!snippet) {
        // no props, use slots intead
        try {
          const slots = useSlots();
          const slotEl = slots.default()[0];
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

<style scoped>
.editor-wrapper {
  display: grid;
  padding: 1em;
}
.editor {
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}
.run-code-button {
  background-color: #23241f;
  color: #f92672;
}
.bottom-element {
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}
/** 
This style creates an upside down triangle inside the button and flips it by 180 degrees
when clicked.
*/
.expand-button {
  width: 100%;
  height: 20px;
  background-color: #23241f;
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
