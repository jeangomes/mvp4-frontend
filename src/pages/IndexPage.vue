<template>
  <div>
    <stock-form/>
    <stock-list/>
  </div>
</template>

<script setup>
import StockForm from 'components/StockForm.vue'
import StockList from 'components/StockList.vue'

defineOptions({
  name: 'IndexPage'
})
</script>
