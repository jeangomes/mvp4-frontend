<script setup>
import { onMounted, ref } from 'vue'
import { myRequest, deleteRecord, myRequestOneRecord } from 'src/services-http/requests'

const codeSearch = ref('')
const operations = ref([])
const loadingData = ref(false)
const callRequest = () => {
  loadingData.value = true
  myRequest(codeSearch.value)
    .then(function (response) {
      operations.value = response
    })
    .finally(function () {
      loadingData.value = false
    })
}

const deleteMyData = (id) => {
  if (window.confirm('Você realmente deseja excluir esse registro?')) {
    loadingData.value = true
    deleteRecord(id).then(() => callRequest())
  }
}
const getRecordForEdit = (id) => {
  loadingData.value = true
  myRequestOneRecord(id)
    .then(response => {
      // myState.value = response
    })
    .finally(function () {
      loadingData.value = false
    })
}
const currencyFormat = (value) => {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
  return formatter.format(value)
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
      <th>Ações</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="operation  in operations" :key="operation.id">
      <td>{{ operation.operation_type }}</td>
      <td>{{ operation.code }}</td>
      <td>{{ operation.quantity }}</td>
      <td>{{ currencyFormat(operation.price) }}</td>
      <td>{{ operation.operation_date }}</td>
      <td>{{ currencyFormat(operation.operation_amount) }}</td>
      <td>
        <button type="button" @click="deleteMyData(operation.id)">Excluir</button>
        <button class="btn-edit" type="button" @click="getRecordForEdit(operation.id)">Editar</button>
      </td>
    </tr>
    </tbody>
  </q-markup-table>
</template>

<style scoped>

</style>
