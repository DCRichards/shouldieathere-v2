<template>
  <div class="about">
    <h2>{{ $t('global.title') }}</h2>
    <h3>Credits</h3>
    <ul class="about__credits">
      <li>
        Iconography: <a
          href="https://feathericons.com"
          target="_blank">Feather by Cole Bemis</a>, extended with some custom icons.
      </li>
      <li>
        Typography: <a
          href="https://www.colophon-foundry.org/typefaces/basis-grotesque"
          target="_blank">Basis Grotesque by The Entente</a>.
      </li>
      <li>
        Hygiene data provided by the <a
          href="https://www.food.gov.uk/"
          target="_blank">Food Standards Agency</a>.
      </li>
      <li>
        Chefs, cooks, FOH, restauranteurs and all of those helping to feed us.
      </li>
    </ul>
    <c-button>Back</c-button>
  </div>
</template>

<script>
import CButton from '@/components/core/Button.vue';

export default {
  components: {
    CButton,
  },
};
</script>

<style lang="scss" scoped>
.about {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 2rem;
  text-align: center;
}

.about__credits {
  text-align: left;

  a {
    text-decoration: underline;
  }
}
</style>
