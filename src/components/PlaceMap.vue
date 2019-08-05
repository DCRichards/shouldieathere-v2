<template>
  <div class="place-map">
    <div id="place-map__map" />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import env from '@/lib/env';

export default {
  props: {
    lat: {
      type: Number,
      default: 0,
    },

    lon: {
      type: Number,
      default: 0,
    },
  },

  mounted() {
    mapboxgl.accessToken = env('MAPBOX_KEY');

    const map = new mapboxgl.Map({
      container: 'place-map__map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [this.lon, this.lat],
      zoom: 15,
    });

    const pin = new mapboxgl.Marker();

    pin.setLngLat([this.lon, this.lat]).addTo(map);
  },
};
</script>

<style scoped lang="scss">
#place-map__map {
  height: 100%;
  width: 100%;
}
</style>
