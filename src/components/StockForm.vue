<script setup>
import { ref } from 'vue'
import { myRequest, postMyData, updateMyData } from 'src/services-http/requests'

const loadingData = ref(false)
const myState = ref({
  id: '',
  operation_type: '',
  quantity: '',
  price: '',
  operation_date: '',
  code: ''
})
const codeSearch = ref('')
const operations = ref([])
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
const saveMyData = () => {
  loadingData.value = true
  if (!myState.value.id) {
    postMyData(myState.value).then(() => callRequest())
  } else {
    updateMyData(myState.value).then(() => callRequest())
  }
  // resetForm()
}
</script>

<template>
  <div class="text-h5" style="border-bottom: 1px solid #f0f5;">Gestão de compra de ativos financeiros</div>
  <q-card class="my-form q-my-sm" bordered>
    <q-card-section>
      <div class="text-subtitle1">Cadastrar nova operação</div>
      <q-form
        @submit="saveMyData"
      >
        <div class="row q-col-gutter-xs">
          <div class="col-xs-12 col-sm-6 col-md-2">
            <q-select v-model="myState.operation_type" :options="['Compra', 'Venda']" label="Operação" outlined stack-label />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-2">
            <q-input
              outlined stack-label
              v-model="myState.code"
              label="Código *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-2">
            <q-input
              type="number"
              outlined stack-label
              v-model="myState.quantity"
              label="Quantidade *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-2">
            <q-input type="number" v-model="myState.price" label="Cotação" step="0.01" stack-label outlined/>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-2">
            <q-input outlined stack-label type="date" v-model="myState.operation_date" label="Data Operação"/>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-2">
            <q-btn type="submit" label="Salvar" class="q-mt-sm q-ml-md" color="primary" no-caps/>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style scoped>
</style>
