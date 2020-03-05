<template>
  <div class="places">
    <content-box>
      <form
        class="search-form"
        @submit.prevent="update">
        <input-text
          v-model="name"
          icon="home"
          placeholder="Restaurant"
          required />
        <input-text
          v-model="address"
          icon="map-pin"
          placeholder="Town, City, Postcode" />
        <c-button
          :disabled="loading"
          type="submit"
          variant="dark">
          Should I eat there?
        </c-button>
      </form>
      <c-loading v-if="loading" />
      <div
        v-if="!loading && places"
        class="places-list">
        <div
          v-for="place in places"
          :key="place.FHRSID"
          class="places-list__item">
          <router-link :to="`/places/${place.FHRSID}`">
            <h2>{{ place.BusinessName }}</h2>
            <p>{{ formatAddress(place) }}</p>
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
import CLoading from '@/components/core/Loading.vue';
import CButton from '@/components/core/Button.vue';
import InputText from '@/components/core/InputText.vue';

export default {
  mixins: [addressMixin],

  components: {
    CButton,
    CLoading,
    ContentBox,
    InputText,
  },

  data() {
    return {
      address: null,
      name: null,
    };
  },

  computed: {
    ...mapState('places', ['places', 'loading']),
  },

  methods: {
    update() {
      const { name, address } = this;
      const { query } = this.$route;

      if (query.name === name && query.address === address) {
        this.search(name, address);
        return;
      }

      this.$router.replace({
        path: '/places/search',
        query: { name, address },
      });
    },

    search(name, address) {
      this.$store.dispatch('places/search', { name, address });
    },
  },

  created() {
    const { name, address } = this.$route.query;
    this.name = name;
    this.address = address;
    this.search(name, address || '');
  },

  watch: {
    $route(r) {
      const { name, address } = r.query;

      this.search(name, address || '');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';
@import '~@/scss/responsive';

.places {
  height: 100%;
}

.search-form {
  margin-bottom: 1rem;
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
  border-radius: 3px;
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
