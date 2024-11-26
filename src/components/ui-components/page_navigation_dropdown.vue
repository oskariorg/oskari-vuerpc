<template>
  <div>
    <select :value="currentPage" @change="pageSelected" id="actionSelector">
      <option :value="initialPage.value">{{ initialPage.text }}</option>
      <optgroup v-for="section in getOptGroups()" :key="section" :label="section">
        <option
          v-for="option in getPagesInGroup(section)"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script>
import pages from '../../pages';

const initialPage = {
  value: pages.main.name,
  text: pages.main.label || pages.main.name
};

export default {
  props: {
    current: String
  },
  computed: {
    currentPage() {
      return this.current || initialPage.value;
    }
  },
  data() {
    return {
      initialPage
    };
  },
  methods: {
    pageSelected(event) {
      // change current page by pushing new route
      let target = event.target.value;
      if (target === initialPage.value) {
        target = '/';
      }
      this.$router.push(target);
    },
    getOptGroups() {
      return pages.sections.map((section) => section.name);
    },
    getPagesInGroup(section) {
      const group = pages.sections.filter((s) => s.name === section);
      if (!group.length) {
        return [];
      }
      return group[0].pages.map((page) => {
        return {
          value: page.name,
          text: page.label || page.name
        };
      });
    }
  }
};
</script>

<style>
#actionSelector {
  max-width: 100%;
  font-size: 20px;
}
select {
  font-size: calc(0.8rem + 1vh) !important;
  padding: 0.3em;
}
option {
  font-size: 18px !important;
}
optgroup {
  font-size: 20px !important;
}
</style>
