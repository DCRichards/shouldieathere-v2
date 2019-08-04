<template>
  <div class="places">
    <content-box>
      <h1>Places</h1>
      <div
        v-if="places"
        class="places-list">
        <div
          v-for="place in places"
          :key="place.FHRSID"
          class="places-list__item">
          <router-link :to="`/places/${place.FHRSID}`">
            <h2>{{ place.BusinessName }}</h2>
            <p>{{ address(place) }}</p>
          </router-link>
        </div>
      </div>
    </content-box>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { address as addressMixin } from '@/mixins';
import ContentBox from '@/components/core/ContentBox.vue';

export default {
  mixins: [addressMixin],

  components: {
    ContentBox,
  },

  computed: {
    ...mapState('places', ['places', 'loading']),
  },

  created() {
    const { name, address } = this.$route.query;
    this.$store.dispatch('places/search', { name, address });
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';
@import '~@/scss/responsive';

.places {
  height: 100vh;
}

.places-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
  overflow: scroll;
}

.places-list__item {
  background: $basalt;
  margin: 2px;
  max-width: 400px;
  padding: 1rem;

  &:hover {
    background: $charcoal;
  }

  a {
    color: $white;
  }
}
</style>
