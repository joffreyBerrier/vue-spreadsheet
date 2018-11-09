import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.filter('truncate', (val) => {
  if (!val || typeof (val) !== 'string') return '';
  return val.slice(0, 10);
});

new Vue({
  render: h => h(App),
}).$mount('#app');
