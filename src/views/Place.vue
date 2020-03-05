<template>
  <div class="place">
    <content-box>
      <div
        v-if="place"
        class="place-detail">
        <div class="header__title">
          <h1>{{ place.BusinessName }}</h1>
          <h4>{{ formatAddress(place) }}</h4>
        </div>

        <rating-card
          class="place-detail__rating"
          :rating="place.RatingValue" />

        <div class="header__tags">
          <h3>Rating Details</h3>
          <c-stamp icon="user-check">
            <a
              target="_blank"
              :href="place.LocalAuthorityWebSite">{{ place.LocalAuthorityName }}
            </a>
          </c-stamp>
          <c-stamp icon="calendar">
            {{ ratingDate }}
          </c-stamp>
        </div>
      </div>

      <router-link to="/">
        <c-button variant="dark">
          Search Again
        </c-button>
      </router-link>
    </content-box>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { address as addressMixin } from '@/mixins';
import CButton from '@/components/core/Button.vue';
import ContentBox from '@/components/core/ContentBox.vue';
import CStamp from '@/components/Stamp.vue';
import RatingCard from '@/components/RatingCard.vue';

function parseFlt(str) {
  try {
    return parseFloat(str, 10);
  } catch (e) {
    return undefined;
  }
}

export default {
  mixins: [addressMixin],

  components: {
    CButton,
    ContentBox,
    CStamp,
    RatingCard,
  },

  computed: {
    ...mapGetters('places', ['place']),

    ratingDate() {
      const rated = moment(this.place.RatingDate);
      return rated.format('Do MMMM YYYY');
    },

    lat() {
      const { latitude } = this.place.geocode;
      return parseFlt(latitude);
    },

    lon() {
      const { longitude } = this.place.geocode;
      return parseFlt(longitude);
    },
  },

  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('places/get', { id });
  },
};
</script>

<style scoped lang="scss">
.place {
  height: 100%;
}

.place-detail {
  margin-bottom: 2rem;
  width: 60%;
}

.header__title {
  margin-bottom: 1rem;

   h1 {
     margin-bottom: 0;
   }
}

.place-detail__rating {
  margin: 3rem auto;
  width: 60%;
}
</style>
