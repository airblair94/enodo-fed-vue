<template>
  <GmapMarker
    ref="markerRef"
   :position="this.position"
   :title="this.label"
   :icon="this.icon"
  />
</template>

<script>
import { getColoredIconUrl } from '../utils/icon-url-generator';

export default {
  name: 'PropertyMapMarker',
  props: {
    id: String,
    position: Object,
    label: String,
    iconColor: String,
  },
  data() {
    return {
      // Code to generate dynamic icons was found below
      // https://medium.com/better-programming/dynamic-svg-markers-for-google-maps-in-vue-js-7541fa1a54a
      icon: {
        url: getColoredIconUrl(`#${this.iconColor}`),
      },
    };
  },
};
</script>
