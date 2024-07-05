<template>
  <div v-if="loadedData">
    <total-summary :operations="operations"/>
    <div>
      <purchase-x-current-position :operations="operations"/>
    </div>
    <br>
    <stock-list/>
  </div>
</template>

<script setup>
import StockList from 'components/StockList.vue'
import TotalSummary from 'components/TotalSummary.vue'
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { getCurrentPosition } from 'src/services-http/requests'
import PurchaseXCurrentPosition from 'components/PurchaseXCurrentPosition.vue'

defineOptions({
  name: 'IndexPage'
})

const operations = ref([])
const loadedData = ref(false)
const $q = useQuasar()
const callRequest = () => {
  $q.loading.show()
  getCurrentPosition()
    .then(function (response) {
      loadedData.value = true
      operations.value = response.data
      $q.loading.hide()
    })
    .finally(function () {
      loadedData.value = true
      $q.loading.hide()
    })
}
onMounted(() => {
  callRequest()
})
</script>
