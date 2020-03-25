<template>
  <div class="places">
    <content-box>
      <form
        class="search-form"
        @submit.prevent="update">
        <input-text
          v-model="newName"
          icon="home"
          placeholder="Restaurant"
          required />
        <input-text
          v-model="newAddress"
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

      <div class="page-control">
        <c-button
          @click="previousPage"
          :disabled="pagination.page < 2"
          v-html="icons['skip-back'].toSvg()"
          variant="dark" />
        <h3>{{ pagination.page }}</h3>
        <c-button
          @click="nextPage"
          :disabled="pagination.totalPages <= pagination.page"
          v-html="icons['skip-forward'].toSvg()"
          variant="dark" />
      </div>
    </content-box>
  </div>
</template>

<script>
import feather from 'feather-icons';
import { mapState } from 'vuex';
import { address as addressMixin } from '@/mixins';
import ContentBox from '@/components/core/ContentBox.vue';
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
    ContentBox,
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
  height: 100%;
}

.search-form {
  margin-bottom: 1rem;
}

.page-control {
  align-items: center;
  display: flex;
  margin: 1rem;
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
