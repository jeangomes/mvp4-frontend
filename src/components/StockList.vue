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
  <div id="search_area">
    <label for="code_search">Filtrar por código</label>
    <input type="text" v-model="codeSearch" name="code" id="code_search" required>
    <button type="button" class="btn-search" @click="callRequest()">Pesquisar</button>

    <p style="color: #453731; margin-top: 15px;">Registros encontrados: {{operations.length}}</p>
  </div>
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
      <th>Preço Médio</th>
      <th>Custo Médio</th>
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
      <td>?</td>
      <td>?</td>
    </tr>
    </tbody>
  </q-markup-table>
</template>

<style scoped>

</style>
