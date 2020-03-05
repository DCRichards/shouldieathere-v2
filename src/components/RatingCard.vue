<template>
  <div class="rating-card">
    <h3>{{ slogan }}</h3>
    <div class="rating-display">
      <rating-circle
        :show-text="normalisedRating <= 1"
        :rating="normalisedRating >= 0 ? normalisedRating : undefined" />
      <rating-circle
        :show-text="normalisedRating === 2"
        :rating="normalisedRating >= 2 ? normalisedRating : undefined" />
      <rating-circle
        :show-text="normalisedRating === 3"
        :rating="normalisedRating >= 3 ? normalisedRating : undefined" />
      <rating-circle
        :show-text="normalisedRating === 4"
        :rating="normalisedRating >= 4 ? normalisedRating : undefined" />
      <rating-circle
        :show-text="normalisedRating === 5"
        :rating="normalisedRating === 5 ? normalisedRating : undefined" />
    </div>
  </div>
</template>

<script>
import RatingCircle from '@/components/RatingCircle.vue';

export default {
  props: {
    rating: {
      type: String,
      required: true,
    },
  },

  components: {
    RatingCircle,
  },

  computed: {
    normalisedRating() {
      try {
        return Number.parseInt(this.rating, 10);
      } catch (e) {
        return this.rating;
      }
    },

    slogan() {
      if (Number.isNaN(this.rating)) {
        return `This place is ${this.rating}`;
      }

      const base = `This place has a rating of ${this.rating}`;
      switch (this.normalisedRating) {
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
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors.scss';

.rating-display {
  display: flex;
}
</style>
