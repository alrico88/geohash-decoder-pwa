<template lang="pug">
van-row
  van-col(:span="24")
    .block-title Style options
    van-field(
      readonly,
      clickable,
      label="Map style",
      :value="selectedStyle",
      placeholder="Choose a map style",
      @click="showMapStylePicker = true"
    )
    van-popup(v-model="showMapStylePicker", round, position="bottom")
      van-picker(
        title="Map style",
        :columns="styles",
        v-model="selectedStyle",
        @cancel="showMapStylePicker = false",
        @confirm="confirmMapStyle",
        show-toolbar
      )
        template(#confirm) Save
        template(#cancel) Cancel
</template>

<script>
import {mapState, mapMutations} from 'vuex';

const styleMappings = {
  Colourful: 'color',
  Light: 'light',
  Dark: 'dark',
};

export default {
  data() {
    return {
      styles: ['Colourful', 'Light', 'Dark'],
      showMapStylePicker: false,
    };
  },
  computed: {
    ...mapState(['mapStyle']),
    selectedStyle: {
      get() {
        return this.getFullName(this.mapStyle);
      },
      set(value) {
        this.changeMapStyle(styleMappings[value]);
      },
    },
  },
  methods: {
    ...mapMutations(['changeMapStyle']),
    confirmMapStyle(value) {
      this.selectedStyle = value;
      this.showMapStylePicker = false;
    },
    getFullName(key) {
      const asArray = Object.entries(styleMappings).map(([name, value]) => ({
        name,
        value,
      }));
      return asArray.find((d) => d.value === key).name;
    },
  },
};
</script>

<style>
</style>
