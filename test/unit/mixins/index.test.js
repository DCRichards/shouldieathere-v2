import { shallowMount } from '@vue/test-utils';
import { address } from '@/mixins';
import { expect } from 'chai';

describe('mixins', () => {
  describe('formatAddress', () => {
    const component = shallowMount({
      render() {},
      mixins: [address],
    });

    it('Should format address correctly', () => {
      const place = {
        AddressLine1: 'Test Place',
        AddressLine3: 'Brighton',
        PostCode: 'BN1 0AA',
      };

      expect(component.vm.formatAddress(place))
        .to.equal(`${place.AddressLine1} ${place.AddressLine3} ${place.PostCode}`);
    });

    it('Should handle no place', () => {
      expect(component.vm.formatAddress()).to.equal('');
    });
  });
});
