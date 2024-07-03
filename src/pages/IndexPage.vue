<template>
  <div>
    <current-position/>
    <br>
    <stock-list/>
  </div>
</template>

<script setup>
import StockList from 'components/StockList.vue'
import CurrentPosition from 'components/CurrentPosition.vue'

defineOptions({
  name: 'IndexPage'
})
</script>
