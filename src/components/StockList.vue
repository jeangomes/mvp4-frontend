<script setup>
import { onMounted, ref } from 'vue'
import { myRequest } from 'src/services-http/requests'
import { dateFormat, currencyFormat } from 'src/util'

const codeSearch = ref('')
const operations = ref([])
const loadingData = ref(false)
const callRequest = () => {
  loadingData.value = true
  myRequest(codeSearch.value)
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
</script>

<template>
  <Transition name="fade">
    <div id="loading_container" v-if="loadingData">
      <div id="loading"></div>
    </div>
  </Transition>
  <q-card id="search_area">
    <q-card-section>
      <q-input outlined stack-label v-model="codeSearch" label="Filtrar por código" style="max-width: 200px;">
        <template v-slot:append>
          <q-icon v-if="codeSearch !== ''" name="close" @click="codeSearch = ''" class="cursor-pointer" />
        </template>

        <template v-slot:after>
          <q-btn round dense icon="search" @click="callRequest()" />
        </template>
      </q-input>

      <p style="color: #453731; margin-top: 15px;">Registros encontrados: {{operations.length}}</p>
    </q-card-section>
  </q-card>
  <br>
  <q-markup-table separator="cell" bordered dense>
    <thead>
    <tr>
      <th>Operação</th>
      <th>Código</th>
      <th>Quantidade</th>
      <th>Cotação</th>
      <th>Data Operação</th>
      <th>Valor Negociado</th>
      <th>Taxas</th>
      <th>Total Negociado</th>
      <th>Quantidade Total</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="operation  in operations" :key="operation.id">
      <td>{{ operation.operation_type }}</td>
      <td>{{ operation.code }}</td>
      <td>{{ operation.quantity }}</td>
      <td>{{ currencyFormat(operation.price) }}</td>
      <td>{{ dateFormat(operation.negotiation_note.data_pregao) }}</td>
      <td>{{ currencyFormat(operation.operation_amount) }}</td>
      <td>{{ currencyFormat(operation.taxas) }}</td>
      <td>{{ currencyFormat(operation.total_negociado) }}</td>
      <td>{{operation.qtd_total}}</td>
    </tr>
    </tbody>
  </q-markup-table>
</template>

<style scoped>

</style>
