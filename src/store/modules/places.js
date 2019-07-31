import FHRS from '@/api/FHRS';

const fhrs = new FHRS();

export default {
  namespaced: true,

  state: {
    places: [],
    error: undefined,
  },

  actions: {
    async search({ commit }, { name, address }) {
      try {
        const { data } = await fhrs.establishments.search(name, address);

        if (!data.establishments.length) {
          throw new Error(404);
        }

        commit('RECIEVE', data.establishments);
      } catch (error) {
        commit('ERROR', error);
      }
    },

    async get({ commit }, { id }) {
      try {
        const { data } = await fhrs.establishments.get(id);

        if (!data.establishments.length) {
          throw new Error(404);
        }

        commit('RECIEVE', data.establishments);
      } catch (error) {
        commit('ERROR', error);
      }
    },
  },

  mutations: {
    RECIEVE(state, places) {
      Object.assign(state, { places });
    },

    ERROR(state, error) {
      Object.assign(state, { error });
    },
  },
};
