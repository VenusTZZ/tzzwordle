<script setup lang="ts">
import L from 'leaflet'
import { onMounted } from "vue"

const mapDom = $ref<HTMLElement | null>(null)
let instance: L.Map
const addMark = (center: [number, number]) => {
  if (instance) {
    const marker = L.marker(center).addTo(instance)
    instance.flyTo(center)
  }
}
onMounted(() => {

  if (!mapDom) {
    return
  }

  instance = L.map(mapDom, {
    center: [37, 110],
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    layers: [
      // L.tileLayer('https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'),
      // L.tileLayer('https://basemaps.arcgis.com/arcgis/rest/services/ChinaOnlineCommunity/VectorTileServer/tile/{z}/{y}/{x}.pbf'),
      // L.tileLayer('https://webrd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=8<ype=11'),
      L.tileLayer('https://wprd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=8&scl=2'),
      L.marker([39.9, 116.4]),
    ]
  })

})
defineExpose({
  addMark,
})

</script>

<template>
  <div ref="mapDom" w-180 h-120 bg="#242424">

  </div>
</template>

<style scoped>

</style>
