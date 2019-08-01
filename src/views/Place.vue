<template>
  <div class="place">
    <content-box>
      <div
        v-if="place"
        class="place-detail">
        <h2>{{ place.BusinessName }}</h2>
        <p>{{ address(place) }}</p>
      </div>
    </content-box>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { address as addressMixin } from '@/mixins';
import ContentBox from '@/components/core/ContentBox.vue';

export default {
  mixins: [addressMixin],

  components: {
    ContentBox,
  },

  computed: {
    ...mapGetters('places', ['place']),
  },

  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('places/get', { id });
  },
};
</script>

<style scoped lang="scss">
.place {
  height: 100vh;
}
</style>
