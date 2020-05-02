import {decode_bbox} from 'ngeohash';

export function getBoundsFromHash(geohash) {
  return decode_bbox(geohash);
}
