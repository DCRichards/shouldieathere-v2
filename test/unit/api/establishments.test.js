import { expect } from 'chai';
import { spy } from 'sinon';
import Establishments from '@/api/Establishments';

describe('api', () => {
  describe('Establishments', () => {
    const client = {
      get: spy(() => Promise.resolve({ data: {} })),
    };

    const establishments = new Establishments(client);

    beforeEach(() => {
      client.get.resetHistory();
    });

    it('Should get establishments by ID', async () => {
      const res = await establishments.get('10');
      expect(res).to.eql({ data: {} });
      expect(client.get.calledWith('Establishments/10')).to.equal(true);
    });

    it('Should search establishments', async () => {
      const tests = [
        {
          params: { name: 'Burgers', address: 'Hove' },
          url: 'Establishments?name=Burgers&address=Hove&pageNumber=1&pageSize=20&sortOptionKey=alpha',
        },
        {
          params: { name: 'Burgers', page: 2, perPage: 10 },
          url: 'Establishments?name=Burgers&pageNumber=2&pageSize=10&sortOptionKey=alpha',
        },
        {
          params: { name: 'Burgers', address: 'Hove', perPage: 4 },
          url: 'Establishments?name=Burgers&address=Hove&pageNumber=1&pageSize=4&sortOptionKey=alpha',
        },
      ];

      let i = 0;
      await Promise.all(tests.map(async ({ params, url }) => {
        const res = await establishments.search(params.name, params.address, params.page, params.perPage);
        expect(res).to.eql({ data: {} });
        expect(client.get.getCall(i).firstArg).to.equal(url);
        i += 1;
      }));
    });
  });
});
