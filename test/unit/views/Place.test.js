import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { expect } from 'chai';
import { spy } from 'sinon';
import Place from '@/views/Place.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Place.vue', () => {
  const mockPlaceGetter = spy();
  const mockGetAction = spy();
  const store = new Vuex.Store({
    modules: {
      places: {
        namespaced: true,
        state: {
          places: [],
          loading: false,
        },
        getters: {
          place: mockPlaceGetter,
        },
        actions: {
          get: mockGetAction,
        },
      },
    },
  });

  beforeEach(() => {
    mockPlaceGetter.resetHistory();
    mockGetAction.resetHistory();
  });

  it('Should load place from store on create', () => {
    const $route = {
      params: { id: '1022' },
    };
    const $t = () => '';

    shallowMount(Place, {
      store,
      localVue,
      mocks: { $route, $t },
      stubs: ['router-link'],
    });

    expect(mockGetAction.firstCall.args[1]).to.eql({ id: $route.params.id });
  });
});
