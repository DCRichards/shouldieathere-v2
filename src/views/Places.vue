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
  overflow: scroll;
  text-align: left;
}

.places-list__item {
  border-left: 3px solid $basalt;
  max-width: 400px;
  padding-left: 1rem;

  &:hover {
    border-left: 3px solid $dust;
    cursor: pointer;
  }

  a {
    color: $basalt;
    text-decoration: none;
  }

  a:hover {
    color: $dust;
  }
}
</style>
