<template>
  <div class="search">
    <content-box>
      <h1>Where do you want to eat?</h1>
      <form @submit.prevent="search">
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
          variant="light">
          Should I eat there?
        </c-button>
      </form>
    </content-box>
  </div>
</template>

<script>
import CButton from '@/components/core/Button.vue';
import ContentBox from '@/components/core/ContentBox.vue';
import InputText from '@/components/core/InputText.vue';

export default {
  components: {
    CButton,
    ContentBox,
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

.search {
  background-color: $basalt;
  background-image: linear-gradient(to right, rgba($basalt, 1.0) 40%, rgba($basalt, 0.0)), url('../assets/images/search-bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: $white;
  height: 100vh;
  overflow: scroll;
}
</style>
