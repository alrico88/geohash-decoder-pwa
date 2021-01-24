<template lang="pug">
van-row
  van-col(:span="24")
    van-row
      van-col(:span="24")
        l-map(
          style="height: calc(50vh - 50px); width: 100%",
          :zoom="zoom",
          :bounds="bounds",
          :options="options"
        )
          map-tile
          l-marker(
            v-if="validInput && !invalidGeohash",
            :lat-lng="[decoded.latitude, decoded.longitude]"
          )
          l-geo-json(
            v-if="validInput && !invalidGeohash",
            :geojson="decodedPoly"
          )
    van-row
      van-col(:span="24")
        .block-title Geohash to Decode
    van-row
      van-col(:span="24")
        van-form
          van-field(
            v-model="geohash",
            name="Geohash",
            label="Geohash",
            placeholder="Ex. ezy"
          )
          van-notice-bar(
            text="The entered geohash has invalid characters",
            left-icon="warning-o",
            color="#890000",
            background="#ffb1b1",
            v-show="invalidGeohash"
          )
    van-row
      van-col(:span="24")
        .block-title Decoded coordinates
    van-row
      van-col(:span="24")
        van-cell(title="Latitude", :value="decoded.latitude")
        van-cell(title="Longitude", :value="decoded.longitude")
        van-button.mt(
          block,
          v-if="validInput",
          v-clipboard:copy="JSON.stringify(decoded)",
          v-clipboard:success="notifyClipSuccess",
          v-clipboard:error="notifyClipError"
        ) Copy center to clipboard
        van-button.mt(
          block,
          v-if="validInput",
          v-clipboard:copy="JSON.stringify(decodedPoly)",
          v-clipboard:success="notifyClipSuccess",
          v-clipboard:error="notifyClipError"
        ) Copy GeoJSON to clipboard
</template>

<script>
import {decode, decode_bbox} from 'ngeohash';
import {LMap, LMarker, LGeoJson} from 'vue2-leaflet';
import bboxPolygon from '@turf/bbox-polygon';
import copy from '../mixins/copy';
import {mapGetters} from 'vuex';
import MapTile from '@/components/MapTile';

export default {
  name: 'Decode',
  components: {
    LMap,
    LMarker,
    LGeoJson,
    MapTile,
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
        zoomControl: true,
        attribution: true,
      },
    };
  },
  computed: {
    ...mapGetters(['tileURL']),
    validInput() {
      return this.geohash !== '';
    },
    decoded() {
      return decode(this.geohash);
    },
    decodedBBox() {
      return decode_bbox(this.geohash);
    },
    decodedPoly() {
      const [minLat, minLon, maxLat, maxLon] = this.decodedBBox;
      return bboxPolygon([minLon, minLat, maxLon, maxLat]);
    },
    invalidGeohash() {
      const possibleValues = '0123456789bcdefghjkmnpqrstuvwxyz';

      const letters = this.geohash.split('');

      return letters.some((d) => !possibleValues.includes(d));
    },
  },
  watch: {
    decodedBBox(bounds) {
      if (!this.invalidGeohash) {
        this.bounds = [
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]],
        ];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.mt {
  margin-top: 10px;
}
</style>
