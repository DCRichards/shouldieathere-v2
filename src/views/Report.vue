<template>
  <div class="report">
    <c-loading v-if="loading" />
    <div
      class="report-detail"
      v-if="!loading && place">
      <h2>{{ $t('report.header', [place.BusinessName]) }}</h2>
      <p>{{ $t('report.subtitle') }}</p>

      <h5>{{ $t('report.reportFsa') }}</h5>
      <p>{{ $t('report.fsaSubtitle') }}</p>
      <a href="https://www.food.gov.uk/contact/consumers/report-problem?navref=quicklink/">
        <c-button>
          {{ $t('report.button') }}
        </c-button>
      </a>

      <h5>{{ $t('report.reportLocal') }}</h5>
      <div class="report__links">
        <c-stamp icon="mail">
          <a :href="mailTo">
            {{ place.LocalAuthorityEmailAddress }}
          </a>
        </c-stamp>
      </div>
      <c-button @click="$router.go(-1)">
        {{ $t('global.back') }}
      </c-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import CStamp from '@/components/Stamp.vue';
import CButton from '@/components/core/Button.vue';
import CLoading from '@/components/core/Loading.vue';

export default {
  components: {
    CLoading,
    CStamp,
    CButton,
  },

  computed: {
    ...mapGetters('places', ['place']),
    ...mapState('places', ['loading']),

    mailTo() {
      if (!this.place) {
        return '';
      }

      const {
        FHRSID,
        LocalAuthorityEmailAddress,
        BusinessName,
        AddressLine1,
        PostCode,
      } = this.place;

      return `mailto:${LocalAuthorityEmailAddress}?subject=${FHRSID}: ${BusinessName}, ${AddressLine1} ${PostCode}`;
    },
  },

  created() {
    if (!this.place) {
      const { id } = this.$route.params;
      this.$store.dispatch('places/get', { id });
    }
  },
};
</script>

<style lang="scss" scoped>
.report {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 2rem;
  text-align: center;

  h5 {
    margin: 2rem 1rem 1rem;
  }
}

.report__links {
  display: flex;
  justify-content: center;
  margin: 1rem;

  a {
    font-weight: bold;
  }
}
</style>
