<template>
  <div class="search">
    <div class="search__container">
      <div class="search__action">
        <h1>{{ $t('search.header') }}</h1>
        <form
          class="search__form"
          @submit.prevent="search">
          <input-text
            v-model="name"
            icon="home"
            :placeholder="$t('search.namePlaceholder')"
            required />
          <input-text
            v-model="address"
            icon="map-pin"
            :placeholder="$t('search.addressPlaceholder')" />
          <c-button
            type="submit"
            variant="dark">
            {{ $t('global.title') }}
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
        path: '/places/search',
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
  height: 100%;
  overflow: scroll;
}

.search__container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.search__action {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  text-align: center;
  width: 100%;
}

.search__form {
  display: flex;
  flex-direction: column;
}
</style>
