import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import {
  Row,
  Button,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Col,
  Input,
} from 'element-ui';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Row);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Col);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBtz6S_Y7JYjhKzhaQKrwkDDIISIdMHoQk',
    libaries: 'drawing',
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
