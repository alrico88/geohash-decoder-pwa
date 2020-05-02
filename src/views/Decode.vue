<template lang="pug">
  van-row
    van-col(:span="24")
      van-row
        van-col(:span="24")
          l-map(style="height: 180px; width: 100%", :zoom="zoom", :bounds="bounds", :options="options")
            l-tile-layer(:url="url")
            l-marker(v-if="validInput", :lat-lng="[decoded.latitude, decoded.longitude]")
            l-geo-json(v-if="validInput", :geojson="decodedPoly")
      van-row
        van-col(:span="24")
          .block-title Geohash to Decode
      van-row
        van-col(:span="24")
          van-form
            van-field(v-model="geohash", name="Geohash", label="Geohash", placeholder="Ex. ezy")
      van-row
        van-col(:span="24")
          .block-title Decoded coordinates
      van-row
        van-col(:span="24")
          van-cell(title="Latitude" :value="decoded.latitude")
          van-cell(title="Longitude" :value="decoded.longitude")
          van-button.mt(block, v-if="validInput", v-clipboard:copy="JSON.stringify(decoded)", v-clipboard:success="notifyClipSuccess", v-clipboard:error="notifyClipError") Copy center to clipboard
          van-button.mt(block, v-if="validInput", v-clipboard:copy="JSON.stringify(decodedPoly)", v-clipboard:success="notifyClipSuccess", v-clipboard:error="notifyClipError") Copy GeoJSON to clipboard
</template>

<script>
import ghash from 'ngeohash';
import {LMap, LMarker, LTileLayer, LGeoJson} from 'vue2-leaflet';
import bboxPolygon from '@turf/bbox-polygon';
import copy from '../mixins/copy';

export default {
  name: 'Decode',
  components: {
    LMap,
    LMarker,
    LTileLayer,
    LGeoJson,
  },
  mixins: [copy],
  data() {
    return {
      geohash: '',
      zoom: 1,
      bounds: [
        [-45, -45],
        [45, 45],
      ],
      options: {
        zoomControl: false,
        attribution: false,
      },
      url:
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    };
  },
  computed: {
    validInput() {
      return this.geohash !== '';
    },
    decoded() {
      return ghash.decode(this.geohash);
    },
    decodedBBox() {
      return ghash.decode_bbox(this.geohash);
    },
    decodedPoly() {
      const [minLat, minLon, maxLat, maxLon] = this.decodedBBox;
      return bboxPolygon([minLon, minLat, maxLon, maxLat]);
    },
  },
  watch: {
    decodedBBox(bounds) {
      this.bounds = [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.mt {
  margin-top: 10px;
}
</style>
