<template>
  <div class="place">
    <content-box>
      <div
        v-if="place"
        class="place-detail">
        <h2>{{ place.BusinessName }}</h2>
        <p>{{ address(place) }}</p>
        <c-stamp
          icon="tag"
          :text="place.BusinessType" />
        <c-stamp
          icon="calendar"
          :text="ratingDate" />
        <rating-card
          class="overall-rating"
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
import RatingCard from '@/components/RatingCard.vue';

export default {
  mixins: [addressMixin],

  components: {
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

.overall-rating {
  height: 300px;
}
</style>
