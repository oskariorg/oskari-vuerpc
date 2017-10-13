<template>
  <div>
    <div class="selectExamples">
    <h2>Select Action
      <dropdown :update="updateDropdown"></dropdown>
    </h2>
    <div class="navigationLinkParent">
      <span class="navigationLinkLeft"><a class="navigationLink"  :id="neighbourLeft"  @click="changeComponent">Previous: {{neighbourLeftDesc}}</a></span>
      <span class="navigationLinkRight"><a class="navigationLink" :id="neighbourRight" @click="changeComponent">Next: {{neighbourRightDesc}}</a></span>
    </div>
  </div>
  </br>
  <transition name="fade">
    <component :id="selected.func" :is="currentExample" transition="fade" transition-mode="out-in"></component>
  </transition>
</div>
</template>

<script>
import dropdown from './dropdown.vue';
import routes from '../../routes.js';
import { mapGetters } from 'vuex';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  components: {
    'dropdown': dropdown
  },
  computed: {
    // mapgetters is a helper to return your getter functions from the store
    ...mapGetters({
      selected: 'selectedComponent',
      viewed: 'totalViewed'
    })
  },
  data () {
    return {
      components: [],
      neighbourLeft: '',
      neighbourRight: '',
      neighbourLeftDesc: '',
      neighbourRightDesc: '',
      currentExample: '',
      updateDropdown: ''
    }
  },
  methods: {
    getAllComponents () {
      for (let component of routes) {
        this.components.push(component.component);
      }
    },
    updateView () {
      for (let i = 0; i < this.components.length; i++) {
        if (this.components[i].name === this.selected) {
          this.currentExample = this.components[i];
        }
      }
    },
    calcNeighbors () {
      for (let i = 0; i < this.components.length; i++) {
        if (this.components[i].name === this.selected) {
          if (i === 0) {
            this.neighbourLeft = '';
          } else {
            this.neighbourLeft = this.components[i - 1].name;
            this.neighbourLeftDesc = this.components[i - 1].data().desc;
          }
          if (i === this.components.length - 1) {
            this.neighbourRight = '';
          } else {
            this.neighbourRight = this.components[i + 1].name;
            this.neighbourRightDesc = this.components[i + 1].data().desc;
          }
        }
      }
    },
    changeComponent (e) {
      this.updateDropdown = e.target.id;
      this.$store.state.rpcExample = e.target.id;
      this.updateView();
    }
  },
  updated () {
    this.updateView();
    this.calcNeighbors();
  },
  mounted () {
    this.getAllComponents();
    this.updateView();
    this.calcNeighbors();
  }
}
</script>
<style>
.selectExamples {
  box-shadow: 2px 2px 1px #888888;
}
.selectExamples h2 {
  background-color: #E9E9E9 !important;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}

.fade-enter-active {
  transition-delay: .15s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
.navigationLink {
  word-break:normal;
  white-space:nowrap;
  font-size: calc(0.34rem + 1.0vh);
}
.navigationLinkParent {
  height:1.5em;
  max-width:33.75em;
}
.navigationLinkLeft {
  float:left;
  display:block;
  margin-inline-end: auto;
}
.navigationLinkRight {
  float: right;
  display:block;
}
</style>
