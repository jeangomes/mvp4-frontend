<script setup>
import { computed } from 'vue'
import { currencyFormat } from 'src/util'
const props = defineProps({
  operations: {
    type: Array,
    required: true
  }
})
const globalAmount = computed(() => {
  return props.operations.reduce((acumulador, operation) => {
    acumulador = acumulador + operation.amount
    return acumulador
  }, 0)
})

const valorNegociado = computed(() => {
  return props.operations.reduce((acumulador, operation) => {
    acumulador = acumulador + parseFloat(operation.valor_negociado)
    return acumulador
  }, 0)
})

const totalNegociado = computed(() => {
  return props.operations.reduce((acumulador, operation) => {
    acumulador = acumulador + operation.total_negociado
    return acumulador
  }, 0)
})
</script>

<template>
  <q-card flat bordered class="my-card q-mb-md" style="max-width: 600px">
    <q-card-section>
      <div class="text-subtitle1 text-center q-mb-sm">Totalizadores</div>
      <q-markup-table separator="cell" dense>
        <thead>
        <tr>
          <th class="text-center">Valor Negociado</th>
          <th class="text-center">Total Negociado</th>
          <th class="text-center">Posição Atual</th>
          <th class="text-center">Diferença (R$)</th>
          <th class="text-center">Diferença (%)</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">{{currencyFormat(valorNegociado)}}</td>
          <td class="text-center">{{currencyFormat(totalNegociado)}}</td>
          <td class="text-center">{{currencyFormat(globalAmount)}}</td>
          <td class="text-center">{{currencyFormat(globalAmount-totalNegociado)}}</td>
          <td class="text-center">{{(((globalAmount-totalNegociado)/totalNegociado)*100).toFixed(2)}}%</td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
