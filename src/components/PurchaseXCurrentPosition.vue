<script setup>

import { currencyFormat } from 'src/util'
defineProps({
  operations: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <q-markup-table separator="cell" bordered dense>
        <thead>
        <tr>
          <th colspan="5" class="bg-grey-2">
            <div class="text-subtitle1 text-center q-mb-sm">Posição Atual</div>
          </th>
          <th class="bg-grey-2"></th>
          <th colspan="7" class="bg-grey-2">
            <div class="text-subtitle1 text-center q-mb-sm">Compra x Posição Atual</div>
          </th>
        </tr>
        <tr>
          <th>Empresa</th>
          <th>Código</th>
          <th>Cotação <br> Atual</th>
          <th>Quantidade</th>
          <th>Valor <br> Total</th>
          <th class="bg-grey-2"></th>
          <th>Preço Médio</th>
          <th>Custo Médio</th>
          <th>Valor Negociado</th>
          <th>Total Negociado</th>
          <th>Posição Atual</th>
          <th>Diferença (R$)</th>
          <th>Diferença (%)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="operation  in operations" :key="operation.id">
          <td>{{operation.name}}</td>
          <td>{{operation.code}}</td>
          <td>{{currencyFormat(operation.price)}}</td>
          <td>{{operation.total_quantity}}</td>
          <td>{{currencyFormat(operation.amount)}}</td>
          <td class="bg-grey-2"></td>
          <td>{{currencyFormat(parseFloat(operation.weighted_average_price))}}</td>
          <td>{{currencyFormat(parseFloat(operation.weighted_average_cost))}}</td>
          <td>{{currencyFormat(parseFloat(operation.valor_negociado))}}</td>
          <td>{{currencyFormat(parseFloat(operation.total_negociado))}}</td>
          <td>{{currencyFormat(operation.amount)}}</td>
          <td :class="{ 'text-negative': operation.diferenca < 0 }">{{currencyFormat(operation.diferenca)}}</td>
          <td :class="{ 'text-negative': operation.diferenca_percentual < 0 }">{{operation.diferenca_percentual.toFixed(2)}} %</td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
