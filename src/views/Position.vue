<template lang="pug">
van-row
  l-map(
    style="height: calc(50vh - 50px); width: 100%",
    :zoom="zoom",
    :bounds="bounds",
    :options="options",
    ref="map"
  )
    map-tile
    l-geo-json(v-if="geohashToDraw", :geojson="geohashToDraw")
    l-marker(
      v-if="myCoords.latitude",
      :lat-lng="[myCoords.latitude, myCoords.longitude]"
    )
  .block-title Geohash to display
  van-dropdown-menu
    van-dropdown-item(v-model="precision", :options="precisions")
  .block-title Your position encoded as geohashes
  van-loading.pl(v-if="location.loading && location.available") Getting coordinates
  van-empty(
    v-if="!location.available",
    image="error",
    description="Geolocation not supported"
  )
  van-cell-group(v-if="geohashes.length > 0")
    van-cell(
      v-for="item of geohashes",
      :key="item.precision",
      :title="'Precision ' + item.precision",
      :label="sizes[item.precision]",
      :value="item.geohash",
      v-clipboard:copy="item.geohash",
      v-clipboard:success="notifyClipSuccess",
      v-clipboard:error="notifyClipError"
    )
</template>

<script>
import {LMap, LMarker, LGeoJson} from 'vue2-leaflet';
import {encode} from 'ngeohash';
import {getBoundsFromHash} from '@/helpers/geohash';
import bboxPolygon from '@turf/bbox-polygon';
import sizes from '../helpers/sizes';
import copy from '../mixins/copy';
import MapTile from '@/components/MapTile';

export default {
  components: {
    LMap,
    LMarker,
    LGeoJson,
    MapTile,
  },
  mixins: [copy],
  data() {
    return {
      myCoords: {
        latitude: null,
        longitude: null,
      },
      location: {
        available: true,
        loading: true,
      },
      zoom: 1,
      bounds: [
        [-45, -45],
        [45, 45],
      ],
      url:
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: {
        zoomControl: true,
      },
      sizes,
      precision: 8,
      precisions: (function() {
        const options = [];
        for (let i = 1; i <= 12; i++) {
          options.push({
            text: `Precision ${i}`,
            value: i,
          });
        }
        return options;
      }()),
    };
  },
  computed: {
    geohashes() {
      if (this.myCoords.latitude !== null) {
        const {latitude, longitude} = this.myCoords;
        const list = [];
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
        return list.reverse();
      } else {
        return [];
      }
    },
    selectedGeohash() {
      if (this.geohashes.length > 0) {
        return this.geohashes.find((d) => d.precision === this.precision);
      } else {
        return null;
      }
    },
    geohashToDraw() {
      return this.selectedGeohash ? this.selectedGeohash.polygon : null;
    },
  },
  watch: {
    selectedGeohash(geohash) {
      if (geohash) {
        const {bbox} = geohash;
        const [minLon, minLat, maxLon, maxLat] = bbox;
        this.bounds = [
          [minLat, minLon],
          [maxLat, maxLon],
        ];
      }
    },
  },
  mounted() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location.loading = false;
          this.myCoords.latitude = position.coords.latitude;
          this.myCoords.longitude = position.coords.longitude;
        },
        (err) => {
          console.error(err);
          this.location.available = false;
        }
      );
    } else {
      this.location.available = false;
    }
  },
};
</script>

<style scoped>
.pl {
  padding-left: 10px;
}
</style>
