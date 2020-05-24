<template>
  <div class="place">
    <c-loading v-if="loading" />
    <div
      v-if="place && !loading"
      class="place-detail">
      <div class="header__title">
        <h1>{{ place.BusinessName }}</h1>
        <h4>{{ formatAddress(place) }}</h4>
      </div>

      <div class="place__type">
        <div class="info__stamps">
          <div class="type-stamp">
            <component
              class="stamp__icon"
              :is="typeIcon" />
            <p>{{ place.BusinessType }}</p>
          </div>
        </div>
      </div>

      <div class="place__rating">
        <component
          class="rating__img"
          :is="ratingImage" />

        <h2 class="rating__text">
          {{ slogan }}
        </h2>
      </div>

      <div
        class="rating__details"
        v-if="place.RatingKey !== 'fhrs_awaitinginspection_en-gb'">
        <h4>Rating Details</h4>
        <div class="info__stamps">
          <c-stamp icon="calendar">
            {{ ratingDate }} ({{ timeSinceRating }} ago)
          </c-stamp>
          <c-stamp
            class="authority-name"
            icon="clipboard">
            Rated by
            <a
              target="_blank"
              :href="place.LocalAuthorityWebSite">{{ place.LocalAuthorityName }}
            </a>
          </c-stamp>
        </div>
      </div>
    </div>

    <div class="ratings__buttons">
      <router-link to="/">
        <c-button variant="dark">
          Search Again
        </c-button>
      </router-link>

      <router-link
        to="report"
        append>
        <c-button variant="dark">
          Report
        </c-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapState } from 'vuex';
import { address as addressMixin } from '@/mixins';
import CButton from '@/components/core/Button.vue';
import CLoading from '@/components/core/Loading.vue';
import CStamp from '@/components/Stamp.vue';

import CafeIcon from '@/assets/images/icons/cafe.svg';
import MobileIcon from '@/assets/images/icons/mobile.svg';
import PubIcon from '@/assets/images/icons/pub.svg';
import RestaurantIcon from '@/assets/images/icons/restaurant.svg';
import TakeawayIcon from '@/assets/images/icons/takeaway.svg';

import RatingZero from '@/assets/images/ratings/0.svg';
import RatingOne from '@/assets/images/ratings/1.svg';
import RatingTwo from '@/assets/images/ratings/2.svg';
import RatingThree from '@/assets/images/ratings/3.svg';
import RatingFour from '@/assets/images/ratings/4.svg';
import RatingFive from '@/assets/images/ratings/5.svg';

function parseFlt(str) {
  const f = Number.parseFloat(str, 10);
  if (Number.isNaN(f)) {
    return undefined;
  }

  return f;
}

export default {
  mixins: [addressMixin],

  components: {
    CButton,
    CLoading,
    CStamp,
  },

  computed: {
    ...mapGetters('places', ['place']),
    ...mapState('places', ['loading']),

    ratingDate() {
      return moment(this.place.RatingDate).format('Do MMM YYYY');
    },

    timeSinceRating() {
      const rated = moment(this.place.RatingDate);
      return moment.duration(moment().diff(rated)).humanize();
    },

    typeIcon() {
      const isCafe = ['caffe', 'cafe', 'coffee']
        .some((w) => this.place.BusinessName.toLowerCase().includes(w));

      switch (this.place.BusinessTypeID) {
        case 1:
          return isCafe ? CafeIcon : RestaurantIcon;
        case 7843:
          return PubIcon;
        case 7844:
          return TakeawayIcon;
        case 7:
        case 14:
        case 7846:
          return MobileIcon;
        default:
          return TakeawayIcon;
      }
    },

    ratingImage() {
      switch (this.place.RatingKey) {
        case 'fhrs_0_en-gb':
          return RatingZero;
        case 'fhrs_1_en-gb':
          return RatingOne;
        case 'fhrs_2_en-gb':
          return RatingTwo;
        case 'fhrs_3_en-gb':
          return RatingThree;
        case 'fhrs_4_en-gb':
          return RatingFour;
        case 'fhrs_5_en-gb':
          return RatingFive;
        case 'fhrs_awaitinginspection_en-gb':
        default:
          return RatingZero;
      }
    },

    lat() {
      const { latitude } = this.place.geocode;
      return parseFlt(latitude);
    },

    lon() {
      const { longitude } = this.place.geocode;
      return parseFlt(longitude);
    },

    slogan() {
      const base = `This place has a rating of ${this.place.RatingValue}`;

      switch (this.place.RatingKey) {
        case 'fhrs_0_en-gb':
          return 'Those dutty, dutty pigs!';
        case 'fhrs_1_en-gb':
          return 'There\'s more grime here than a Skepta record.';
        case 'fhrs_2_en-gb':
          return 'Big dirty stinkin\' plates, dirty stinkin\' plates.';
        case 'fhrs_3_en-gb':
          return 'Not great, not terrible.';
        case 'fhrs_4_en-gb':
          return 'Well, it\'s cleaner than a Kitchen Nightmares script.';
        case 'fhrs_5_en-gb':
          return 'Clean plate club!';
        case 'fhrs_awaitinginspection_en-gb':
          return 'We don\'t have a rating for here yet. Take your chances!';
        default:
          return base;
      }
    },
  },

  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('places/get', { id });
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';

.place {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 2rem;
  text-align: center;
}

.place-detail {
  margin-bottom: 2rem;
  width: 100%;
}

.header__title {
  margin-bottom: 1rem;

  h1 {
    margin-bottom: 0;
  }
}

.place__rating {
  margin: 2rem 0;
}

.rating__img {
  margin: 1rem;
  max-width: 768px;
}

.rating__text {
  margin: 0 1rem;
}

.authority-name a {
  text-decoration: underline;
}

.info__stamps {
  display: inline-block;
}

.place__type {
  text-align: center;
}

.stamp__icon {
  color: $basalt;
  height: 24px;
  margin-right: 10px;
  width: 24px;
}

.type-stamp {
  align-items: center;
  display: flex;
  padding: 0.25rem;
  width: auto;
}

.ratings__buttons {
  display: flex;
  justify-content: center;
}
</style>
