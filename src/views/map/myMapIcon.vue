<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, active}"
    pane="markerPane"
    @draw="draw"
  >
    <div @click="handleClick" v-text="text" />
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'active'],
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    handleClick() {
      global.alert('Well done.')
    },
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
      const myIcon = new BMap.Icon(require('../../assets/map_images/warehouse_blue.svg'), new BMap.Size(15, 25))
      this.icon = myIcon
    }
  }
}
</script>

<style>
  .sample {
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: rgba(0,0,0,0.5);
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: absolute;
  }
  .sample.active {
    background: rgba(0,0,0,0.75);
    color: #fff;
  }
</style>
