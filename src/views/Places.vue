<template>
  <div class="places">
    <form
      class="search-form"
      @submit.prevent="update">
      <input-text
        v-model="newName"
        icon="home"
        :placeholder="$t('search.namePlaceholder')"
        required />
      <input-text
        v-model="newAddress"
        icon="map-pin"
        :placeholder="$t('search.addressPlaceholder')" />
      <c-button
        :disabled="loading"
        type="submit"
        variant="dark">
        {{ $t('global.title') }}
      </c-button>
    </form>

    <c-loading
      class="loading"
      v-if="loading" />

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

    <div
      v-if="!loading && pagination.totalPages > 1"
      class="page-control">
      <button
        class="arrow"
        @click="previousPage"
        v-show="pagination.page >= 2"
        v-html="icons['arrow-left'].toSvg()" />
      <h4>{{ $t('places.pages', [pagination.page, pagination.totalPages]) }}</h4>
      <button
        class="arrow"
        @click="nextPage"
        v-show="pagination.totalPages > pagination.page"
        v-html="icons['arrow-right'].toSvg()" />
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';
import { mapState } from 'vuex';
import { address as addressMixin } from '@/mixins';
import CLoading from '@/components/core/Loading.vue';
import CButton from '@/components/core/Button.vue';
import InputText from '@/components/core/InputText.vue';

export default {
  props: {
    address: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    page: {
      type: Number,
      default: 1,
    },
  },

  mixins: [addressMixin],

  components: {
    CButton,
    CLoading,
    InputText,
  },

  data() {
    return {
      newAddress: this.address,
      newName: this.name,
      newPage: this.page,
      icons: feather.icons,
    };
  },

  computed: {
    ...mapState('places', [
      'places', 'loading', 'error', 'pagination',
    ]),
  },

  methods: {
    update() {
      this.$router.replace({
        path: '/places/search',
        query: {
          name: this.newName,
          address: this.newAddress,
          page: this.newPage,
        },
      });
    },

    previousPage() {
      if (this.page === 1) {
        return;
      }

      this.newPage -= 1;
      this.update();
    },

    nextPage() {
      this.newPage += 1;
      this.update();
    },

    search() {
      const { name, address, page } = this;
      this.$store.dispatch('places/search', { name, address, page });
    },
  },

  created() {
    this.search();
  },

  watch: {
    name(o, n) {
      if (o !== n) {
        this.search();
      }
    },

    address(o, n) {
      if (o !== n) {
        this.search();
      }
    },

    page(o, n) {
      if (o !== n) {
        this.search();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';
@import '~@/scss/responsive';

.places {
  flex-grow: 1;
  margin: 1rem auto;
}

.search-form {
  margin-bottom: 1rem;
  text-align: center;
}

.page-control {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 1rem;

  .arrow {
    background: none;
    border: none;
    cursor: pointer;
    margin: .5rem;
  }
}

.places-list {
  margin: 0 auto;
  overflow: scroll;
}

.places-list__item {
  border-radius: 3px;
  margin: 2px;
  padding: 1rem;
  text-align: left;

  &:hover {
    background: $britain;
  }

  a {
    color: $basalt;
  }
}

.loading {
  height: 100%;
}
</style>
