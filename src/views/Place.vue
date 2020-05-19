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

      <h4 class="rating__text">
        {{ slogan }}
      </h4>

      <h4>Rating Details</h4>

      <div class="rating__details">
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
</template>

<script>
import moment from 'moment';
import { mapGetters, mapState } from 'vuex';
import { address as addressMixin } from '@/mixins';
import CButton from '@/components/core/Button.vue';
import CLoading from '@/components/core/Loading.vue';
import CStamp from '@/components/Stamp.vue';

import PubIcon from '@/assets/images/icons/pub.svg';
import CafeIcon from '@/assets/images/icons/cafe.svg';
import TakeawayIcon from '@/assets/images/icons/takeaway.svg';

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
      const rated = moment(this.place.RatingDate);
      return rated.format('Do MMM YYYY');
    },

    timeSinceRating() {
      const now = moment();
      const rated = moment(this.place.RatingDate);
      return moment.duration(now.diff(rated)).humanize();
    },

    typeIcon() {
      switch (this.place.BusinessTypeID) {
        case 1:
          return CafeIcon;
        case 7843:
          return PubIcon;
        default:
          return TakeawayIcon;
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
      const rating = Number.parseInt(this.place.RatingValue, 10);

      if (Number.isNaN(rating)) {
        return `This place is ${this.rating}`;
      }

      const base = `This place has a rating of ${rating}`;
      switch (rating) {
        case 0:
          return `${base}. This place is dirtier than the back of your builder's transit van.`;
        case 1:
          return `${base}. Big dirty stinkin' plates.`;
        case 2:
          return `${base}. There's more grime here than a Skepta record.`;
        case 3:
          return `${base}. Not great. Not terrible.`;
        case 4:
          return `${base}. You'll be okay.`;
        case 5:
          return `${base}. What a time to be alive! `;
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
  margin: 1rem auto;
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

.place-detail__rating {
  margin: 2rem auto;
}

.rating__text {
  margin: 2rem;
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
</style>
