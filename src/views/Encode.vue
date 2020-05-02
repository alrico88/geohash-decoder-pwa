<template lang="pug">
  van-row
    van-col(:span="24")
      van-row
        van-col(:span="24")
          l-map(style="height: 180px; width: 100%", :zoom="zoom", :bounds="bounds", :options="options", ref="map")
            l-tile-layer(:url="url")
            l-geo-json(v-for="item of geohashes", :key="item.precision", :geojson="item.polygon", :options-style="optionsStyle")
            l-marker(v-if="coordinate.latitude", :lat-lng="[coordinate.latitude, coordinate.longitude]")
      van-row
        van-col(:span="24")
          .block-title Encoded geohashes {{ geohashes.length > 0 ? '(Tap to copy and focus)' : '' }}
      van-row(v-if="geohashes.length === 0")
        van-col(:span="24")
          van-cell(icon="warn-o", title="Tap on the map to encode a point")
      van-row(v-if="geohashes.length > 0")
        van-col(:span="24")
          van-cell(v-for="item of geohashes", :key="item.precision", :title="'Precision ' + item.precision", :label="sizes[item.precision]" :value="item.geohash", @click="drawGeohash(item.geohash)")
</template>

<script>
import {LMap, LTileLayer, LGeoJson, LMarker} from 'vue2-leaflet';
import {encode} from 'ngeohash';
import bboxPolygon from '@turf/bbox-polygon';
import {Toast} from 'vant';
import sizes from '../helpers/sizes';
import {getBoundsFromHash} from '../helpers/geohash';

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
  },
  data() {
    return {
      zoom: 1,
      bounds: [
        [-45, -45],
        [45, 45],
      ],
      options: {
        zoomControl: false,
      },
      url:
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      coordinate: {
        latitude: null,
        longitude: null,
      },
      optionsStyle: {
        fillOpacity: 0.1,
        opacity: 0.2,
      },
      sizes,
    };
  },
  computed: {
    geohashes() {
      if (this.coordinate.latitude === null) {
        return [];
      } else {
        const list = [];
        const {latitude, longitude} = this.coordinate;
        for (let i = 1; i <= 12; i++) {
          const encoded = encode(latitude, longitude, i);
          const [minLat, minLon, maxLat, maxLon] = getBoundsFromHash(encoded);
          list.push({
            precision: i,
            geohash: encoded,
            bbox: [minLon, minLat, maxLon, maxLat],
            polygon: bboxPolygon([minLon, minLat, maxLon, maxLat]),
          });
        }
        return list;
      }
    },
  },
  watch: {
    geohashes(list) {
      if (list.length > 0) {
        const [firstCoord] = list;
        const [minLon, minLat, maxLon, maxLat] = firstCoord.bbox;
        this.bounds = [
          [minLat, minLon],
          [maxLat, maxLon],
        ];
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.map.mapObject.on('click', (e) => {
        const {lat, lng} = e.latlng;
        this.coordinate.latitude = lat;
        this.coordinate.longitude = lng;
      });
    });
  },
  methods: {
    drawGeohash(geohash) {
      Toast.success('Copied');
      const [minLat, minLon, maxLat, maxLon] = getBoundsFromHash(geohash);
      this.bounds = [
        [minLat, minLon],
        [maxLat, maxLon],
      ];
    },
  },
};
</script>

<style lang="scss">
.help-text {
  margin-left: 10px;
}
</style>
