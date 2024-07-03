<script setup>
import { computed, onMounted, ref } from 'vue'
import { getCurrentPosition } from 'src/services-http/requests'
import { currencyFormat } from 'src/util'

const operations = ref([])
const loadingData = ref(false)
const callRequest = () => {
  loadingData.value = true
  getCurrentPosition()
    .then(function (response) {
      operations.value = response.data
    })
    .finally(function () {
      loadingData.value = false
    })
}
onMounted(() => {
  callRequest()
})

const globalAmount = computed(() => {
  const amount = operations.value.reduce((acumulador, operation) => {
    acumulador = acumulador + operation.amount
    return acumulador
  }, 0)
  return currencyFormat(amount)
})
</script>

<template>
  <h4>{{globalAmount}}</h4>
  <q-markup-table separator="cell" bordered dense>
    <thead>
    <tr>
      <th>Empresa</th>
      <th>Código</th>
      <th>Cotação Atual</th>
      <th>Quantidade</th>
      <th>Valor Total</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="operation  in operations" :key="operation.id">
      <td>{{operation.name}}</td>
      <td>{{operation.code}}</td>
      <td>{{currencyFormat(operation.price)}}</td>
      <td>{{operation.total_quantity}}</td>
      <td>{{currencyFormat(operation.amount)}}</td>
    </tr>
    </tbody>
  </q-markup-table>
</template>

<style scoped>

</style>
