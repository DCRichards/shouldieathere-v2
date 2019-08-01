import FHRS from '@/api/FHRS';
import {
  PLACES_SET,
  PLACES_LOADING,
  PLACES_SELECTED,
  PLACES_ERROR,
} from '../types';

const fhrs = new FHRS();

export default {
  namespaced: true,

  state: {
    places: [],
    id: undefined,
    loading: false,
    error: undefined,
  },

  getters: {
    place({ id, places }) {
      if (!id) {
        return undefined;
      }

      return places.find(({ FHRSID }) => `${FHRSID}` === id);
    },
  },

  actions: {
    async search({ commit }, { name, address }) {
      commit(PLACES_LOADING);

      try {
        const { data } = await fhrs.establishments.search(name, address);
        commit(PLACES_SET, data.establishments);
      } catch (error) {
        commit(PLACES_ERROR, error);
      }
    },

    async get({ commit, state }, { id }) {
      commit(PLACES_SELECTED, id);

      const place = state.places.find(({ FHRSID }) => `${FHRSID}` === id);
      if (place) {
        return;
      }

      try {
        commit(PLACES_LOADING);
        const { data } = await fhrs.establishments.get(id);
        commit(PLACES_SET, [data]);
      } catch (error) {
        commit(PLACES_ERROR, error);
      }
    },
  },

  mutations: {
    [PLACES_SET](state, places) {
      Object.assign(state, {
        places,
        loading: false,
        error: undefined,
      });
    },

    [PLACES_LOADING](state) {
      Object.assign(state, { loading: true });
    },

    [PLACES_SELECTED](state, id) {
      Object.assign(state, { id });
    },

    [PLACES_ERROR](state, error) {
      Object.assign(state, { error, loading: false });
    },
  },
};
