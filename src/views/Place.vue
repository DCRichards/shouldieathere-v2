<template>
  <div class="place">
    <content-box>
      <div
        v-if="place"
        class="place-detail">
        <place-map
          class="place-detail__map"
          :lat="lat"
          :lon="lon" />
        <div class="place-detail__header">
          <div class="header__title">
            <h1>{{ place.BusinessName }}</h1>
            <p>{{ address(place) }}</p>
          </div>
          <div class="header__tags">
            <c-stamp
              icon="tag"
              :text="place.BusinessType" />
            <c-stamp
              icon="calendar"
              :text="ratingDate" />
          </div>
        </div>
        <rating-card
          class="place-detail__rating"
          :rating="parseInt(place.RatingValue, 10)" />
      </div>
    </content-box>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { address as addressMixin } from '@/mixins';
import ContentBox from '@/components/core/ContentBox.vue';
import CStamp from '@/components/Stamp.vue';
import PlaceMap from '@/components/PlaceMap.vue';
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
    ContentBox,
    CStamp,
    PlaceMap,
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
  height: 100vh;
}

.place-detail {
  width: 60%;
}

.place-detail__map {
  height: 300px;
  width: 100%;
}

.place-detail__rating {
  height: 300px;
}
</style>
