<template>
  <div class="report">
    <c-loading v-if="loading" />
    <div
      class="report-detail"
      v-if="!loading && place">
      <h2>Had an issue with {{ place.BusinessName }}?</h2>
      <p>If you have had an issue with poor service or a non-hygiene related issue, please contact the restaurant instead.</p>
      <p>
        Email
        <a :href="`mailto:${place.LocalAuthorityEmailAddress}`">
          {{ place.LocalAuthorityEmailAddress }}
        </a>
      </p>
      <p>
        Visit
        <a :href="place.LocalAuthorityWebSite">
          {{ place.LocalAuthorityWebSite }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import CLoading from '@/components/core/Loading.vue';

export default {
  components: {
    CLoading,
  },

  computed: {
    ...mapGetters('places', ['place']),
    ...mapState('places', ['loading']),
  },

  created() {
    if (!this.place) {
      const { id } = this.$route.params;
      this.$store.dispatch('places/get', { id });
    }
  },
};
</script>

<style lang="scss">
.report {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 2rem;
  text-align: center;
}
</style>
