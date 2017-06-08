<template>
  <div>
    <div class="navigationLinkParent">
      <div class="navigationLinkLeft"><a class="navigationLink"  :id="neighbourLeft"  @click="changeComponent">Previous: {{neighbourLeftDesc}}</a></div>
      <div class="navigationLinkRight"><a class="navigationLink" :id="neighbourRight" @click="changeComponent">Next: {{neighbourRightDesc}}</a></div>
    </div>
  </br>
  <transition name="fade">
    <!-- <router-view></router-view> -->
    <component :id="selected.func" :is="currentView" transition="fade" transition-mode="out-in"></component>
  </transition>
</div>
</template>

<script>
import routes from '../routes.js';
import { mapGetters } from 'vuex';

export default {
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
      currentView: ''
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
          this.currentView = this.components[i];
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
  white-space:nowrap;
}
.navigationLinkLeft {
  display:inline-block;
  left:0;
  width:50%;
}
.navigationLinkRight {
  display:inline-block;
  right: 0;
}
</style>
