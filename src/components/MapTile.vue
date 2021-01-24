<template lang="pug">
  l-tile-layer(:url="tileURL", :attribution="attribution")
</template>

<script>
import {mapGetters} from 'vuex';
import {LTileLayer} from 'vue2-leaflet';

export default {
  components: {
    LTileLayer,
  },
  data() {
    return {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    };
  },
  computed: {
    ...mapGetters(['tileURL']),
  },
};
</script>

<style>

</style>
