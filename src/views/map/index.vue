<template>
  <baidu-map class="map" :center="{lng: 121.406897, lat: 30.9345085}" :zoom="zoom" @ready="mapReady">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
    <bm-marker :position="ct" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="污泥暂存区" :label-style="{color: 'blue', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
    </bm-marker>
    <bm-marker :position="tm" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="危废暂存区" :label-style="{color: 'green', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
    </bm-marker>
    <bm-marker :position="ym" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="飞灰暂存区" :label-style="{color: 'green', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
    </bm-marker>
  </baidu-map>
</template>

<script>
// import myMapIcon from './myMapIcon'
const imgUrl = require('../../assets/map_images/wh_blue.png')

export default {
  filters: {
  },
  components: {
  },
  data() {
    return {
      urlIcon: { url: imgUrl, size: { width: 32, height: 32 }},
      ydw: {},
      ct: { lng: 121.38202349832615, lat: 31.059580099298559 },
      tm: { lng: 121.45228274832229, lat: 30.818968957933213 },
      ym: { lng: 121.45393166232523, lat: 30.817365231512484 },
      zoom: 12
    }
  },
  created() {
  },
  methods: {
    mapReady({ BMap, map }) {
      this.zoom = 12
    }
  }
}
</script>

<style>
  .map {
    width: 100%;
    height: 800px;
  }
</style>
