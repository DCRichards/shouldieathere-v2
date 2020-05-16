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
    pagination: {
      page: 0,
      perPage: 0,
      totalPages: 0,
    },
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
    async search({ commit }, {
      name, address, page = 1, perPage = 20,
    }) {
      commit(PLACES_LOADING);

      try {
        const { data } = await fhrs.establishments.search(name, address, page, perPage);
        commit(PLACES_SET, {
          places: data.establishments,
          totalPages: data.meta.totalPages,
          page,
          perPage,
        });
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
        commit(PLACES_SET, {
          places: [data],
          page: 0,
          perPage: 0,
          totalPages: 0,
        });
      } catch (error) {
        commit(PLACES_ERROR, error);
      }
    },
  },

  mutations: {
    [PLACES_SET](state, {
      places, page, perPage, totalPages,
    }) {
      Object.assign(state, {
        places,
        pagination: {
          page,
          perPage,
          totalPages,
        },
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
