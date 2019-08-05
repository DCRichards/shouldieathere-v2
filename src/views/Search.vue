<template>
  <div class="search">
    <div class="search__container">
      <div class="search__hero" />
      <div class="search__action">
        <h1>Where do you want to eat?</h1>
        <form
          class="search__form"
          @submit.prevent="search">
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
            type="submit"
            variant="dark">
            Should I eat there?
          </c-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from '@/components/core/Button.vue';
import InputText from '@/components/core/InputText.vue';

export default {
  components: {
    CButton,
    InputText,
  },

  data() {
    return {
      name: '',
      address: '',
    };
  },

  methods: {
    search() {
      const { address, name } = this;

      if (!name || name === '') {
        return;
      }

      this.$router.push({
        path: 'places/search',
        query: { name, address },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/colors';
@import '~@/scss/responsive';

.search {
  background-color: $white;
  color: $basalt;
  height: 100vh;
  overflow: scroll;
}

.search__container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.search__hero, .search__action {
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.search__hero {
  display: none;

  @include screen-size('lg') {
    background-image: url('../assets/images/search-bg.jpg');
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    width: 30%;
  }
}

.search__action {
  display: flex;
  padding: 0 1rem;
  text-align: center;
  width: 100%;

  @include screen-size('lg') {
    width: 70%;
  }
}

.search__form {
  display: flex;
  flex-direction: column;
}
</style>
