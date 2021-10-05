// import { store } from 'quasar/wrappers'
import { createStore } from 'vuex';

export default createStore({
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: !!process.env.DEV,
});