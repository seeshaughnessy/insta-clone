import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api_url: 'http://localhost:3000/',
    isAuthenticated: false,
    feed: [
      {
        id: 0,
        user_id: 0,
        display_name: 'Fred Flinstone',
        desc: 'Look at my car...',
        image:
          'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fep.yimg.com%2Fay%2Frnrdist%2Fflintstones-fred-s-car-please-call-2.jpg&f=1&nofb=1',
        timestamp: 1591834285000,
      },
      {
        id: 1,
        user_id: 1,
        display_name: 'Scooby Doo',
        desc: 'Look at my pizza...',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffyeahscoobydoomi.files.wordpress.com%2F2014%2F03%2Fvlcsnap-00126.jpg&f=1&nofb=1',
        timestamp: 1593130418000,
      },
      {
        id: 2,
        user_id: 2,
        display_name: 'Goku Son',
        desc: 'Look at my hair...',
        image:
          'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-A_UMrTq72M8%2FT-pxuHFLiuI%2FAAAAAAAAJaw%2FUeGRNyee50Y%2Fs1600%2FSon_Goku.jpg&f=1&nofb=1',
        timestamp: 1595722418000,
      },
    ],
  },
  mutations: {
    isAuthenticated(state) {
      if (localStorage.getItem('jwt') != null) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    login(state, token) {
      state.isAuthenticated = true;
      localStorage.setItem('jwt', token);
      router.push('/');
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('jwt');
      router.push('/login');
    },
  },
  actions: {},
  modules: {},
});
