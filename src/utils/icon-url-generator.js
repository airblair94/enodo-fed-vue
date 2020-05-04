import Vue from 'vue';
import MarkerSvg from '../components/MarkerSvg.vue';

// create a constructor from a Vue component
const LocationIconConstructor = Vue.extend(MarkerSvg);

// eslint-disable-next-line
export const getColoredIconUrl = (fillColor) => {
  // create a Vue element with required props
  const iconComponent = new LocationIconConstructor({ propsData: { fillColor } });
  // mount the component shadow DOM
  iconComponent.$mount();
  // generate an html string from an element
  const iconString = new XMLSerializer().serializeToString(iconComponent.$el);
  // finally, generate a data url from a string
  // eslint-disable-next-line
  return 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(iconString);
};
