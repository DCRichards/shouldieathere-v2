<template>
  <div id="map" />
</template>

<script>
import L from 'leaflet';

export default {
  props: {
    lat: {
      type: Number,
      default: null,
    },
    lon: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      map: null,
    };
  },

  mounted() {
    this.map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    if (this.lat && this.lon) {
      L.marker([this.lat, this.lon]).addTo(this.map);
      this.map.setView([this.lat, this.lon], 14);
    }
  },
};
</script>

<style scoped lang="scss">
#map {
  height: 180px;
}
</style>

<style lang="scss">
@import url('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css');
</style>
