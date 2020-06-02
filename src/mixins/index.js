/* eslint-disable import/prefer-default-export */
export const address = {
  methods: {
    formatAddress(place) {
      if (!place) {
        return '';
      }

      const {
        AddressLine1,
        AddressLine2,
        AddressLine3,
        AddressLine4,
        PostCode,
      } = place;

      let s = AddressLine1;
      s += AddressLine2 ? ` ${AddressLine2}` : '';
      s += AddressLine3 ? ` ${AddressLine3}` : '';
      s += AddressLine4 ? ` ${AddressLine4}` : '';
      s += PostCode ? ` ${PostCode}` : '';

      return s;
    },
  },
};
