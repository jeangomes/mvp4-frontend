<script setup>
import { ref, provide, watch } from 'vue'
import { useQuasar } from 'quasar'
import { getNoteAndOperations, postNewNegotiationNote, updateNegotiationNote } from 'src/services-http/requests'
// import QCurrencyInput from 'components/QCurrencyInput.vue'
import LcrCurrencyInput from 'components/LcrCurrencyInput.vue'
import { currencyFormat } from 'src/util'
import StockForm from 'components/StockForm.vue'
import MyInputDate from 'components/MyInputDate.vue'

const props = defineProps(['assets', 'editEnable', 'noteId'])
const $q = useQuasar()
const emit = defineEmits(['reloadData', 'cancelEdit'])
const myForm = ref(null)
const initialFormState = {
  data_pregao: '',
  valor_liquido: 0,
  taxa_liquidacao: 0,
  emolumentos: 0,
  total_taxa: 0,
  corretagem: 0,
  liquido: 0,
  total: 0,
  corretora: '',
  operations: [
    {
      operation_type: '',
      code: '',
      quantity: '',
      price: 0,
      asset_type: ''
    }
  ]
}

const form = ref({ ...initialFormState })

const addOperation = () => {
  form.value.operations.push({
    operation_type: '',
    code: '',
    quantity: '',
    price: 0
  })
}

const submitForm = async () => {
  try {
    const response = !props.editEnable ? await postNewNegotiationNote(form.value) : await updateNegotiationNote(props.noteId, form.value)
    console.log(response)
    emit('reloadData')
    $q.notify({
      type: 'positive',
      message: 'Ativo cadastrado com sucesso!'
    })
    myForm.value.reset()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Falha na criação do registro.'
    })
  }
}

const resetForm = () => {
  Object.assign(form.value, initialFormState)
  form.value.operations = [
    {
      operation_type: '',
      code: '',
      quantity: '',
      price: 0,
      asset_type: ''
    }
  ]
}

const getDataForEdit = () => {
  if (props.editEnable) {
    getNoteAndOperations(props.noteId).then((response) => {
      Object.assign(form.value, response.data)
    })
  }
}
watch(
  () => props.noteId,
  () => {
    if (props.noteId) {
      getDataForEdit()
    }
  }
)
const cancelEdit = () => {
  myForm.value.reset()
  emit('cancelEdit')
}
provide('form', {
  form
})
</script>

<template>
  <q-card class="q-pa-md">
    <div class="text-h6 q-pb-sm">Dados da nota de corretagem</div>
    <q-form ref="myForm" @submit="submitForm" @reset="resetForm">
      <div class="row q-col-gutter-sm">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-input stack-label outlined v-model="form.corretora" label="Corretora" :rules="[ val => val && val.length > 0 || 'Campo requerido']"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <my-input-date stack-label outlined v-model="form.data_pregao" label="Data Pregão" :rules="[ val => val && val.length > 0 || 'Campo requerido']"/>
        </div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-xs-12 col-sm-6 col-md-2">
          <LcrCurrencyInput label="Valor Líquido" hint="das Operações" v-model.number="form.valor_liquido" :rules="[ val => val && val.length > 0 || 'Campo requerido']" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2">
          <LcrCurrencyInput label="Taxa liquidação" v-model.number="form.taxa_liquidacao" :rules="[val => !!val || 'Campo requerido']" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2">
          <LcrCurrencyInput label="Emolumentos" v-model.number="form.emolumentos" :rules="[val => !!val || 'Campo requerido']" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-1">
          Total Taxa <br>
          {{currencyFormat(form.taxa_liquidacao+form.emolumentos)}}
        </div>
        <div class="col-xs-12 col-sm-6 col-md-1">
          Liquido <br>
          {{currencyFormat((form.taxa_liquidacao+form.emolumentos)+form.valor_liquido)}}
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2">
          <LcrCurrencyInput label="Corretagem" v-model.number="form.corretagem" :rules="[val => !!val || 'Campo requerido']" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2">
          <p class="bg-grey-2 q-pa-sm">
            Total <br>
            {{currencyFormat((form.taxa_liquidacao+form.emolumentos)+form.valor_liquido+form.corretagem)}}
          </p>
        </div>
      </div>
      <pre v-if="false">{{form}}</pre>
      <div class="row q-mt-sm">
        <div class="col" style="border-bottom: 1px solid #f0f5;">
          <span class="text-h6">Inclusão das operações</span>
          <span class="q-mb-xs float-right">
            <q-btn @click="addOperation" color="primary" icon="add_circle"/>
          </span>
        </div>
      </div>
      <stock-form class="q-mt-sm" :assets="assets" />
      <div class="text-center q-gutter-xs">
        <q-btn type="submit" label="Salvar" color="primary" no-caps class="q-mt-md"/>
        <q-btn v-if="editEnable" label="Cancelar edição" @click="cancelEdit" color="primary" no-caps class="q-mt-md"/>
      </div>
    </q-form>
  </q-card>
</template>

<style scoped>

</style>
