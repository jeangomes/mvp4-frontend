<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { postNewFinancialAssets } from 'src/services-http/requests'

const $q = useQuasar()
const emit = defineEmits(['reloadData'])
const myForm = ref(null)
const initialFormState = {
  name: '',
  code: '',
  is_foreigner: false,
  asset_type: null,
  stock_type: null,
  cnpj: '',
  fii_admin_name: '',
  fii_admin_cnpj: ''
}

const form = ref({ ...initialFormState })

const assetTypes = ref([
  { label: 'ETF', value: 'ETF' },
  { label: 'Stock', value: 'Stock' },
  { label: 'FII', value: 'FII' },
  { label: 'Crypto', value: 'Crypto' },
  { label: 'RF', value: 'RF' }
])

const stockTypes = ref([
  { label: 'ON', value: 'ON' },
  { label: 'PN', value: 'PN' },
  { label: 'UNIT', value: 'UNIT' }
])

const submitForm = async () => {
  try {
    const response = await postNewFinancialAssets(form.value)
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
      message: 'Falha na criação do ativo.'
    })
  }
}

const resetForm = () => {
  Object.assign(form.value, initialFormState)
}
</script>

<template>
  <q-card class="q-pa-md">
    <div class="text-h6 q-pb-sm">Ativo Financeiro - Cadastro</div>
    <q-form ref="myForm" @submit="submitForm" @reset="resetForm">
      <div class="row q-col-gutter-sm">
        <div class="col-xs-12 col-sm-4 col-md-3">
          <q-select
            stack-label outlined
            v-model="form.asset_type"
            label="Tipo de Ativo"
            :options="assetTypes"
            emit-value
            map-options
            :rules="[ val => val && val.length > 0 || 'Campo requerido']"
          />
        </div>
        <div v-if="form.asset_type === 'Stock'" class="col-xs-12 col-sm-6 col-md-3">
          <q-select
            stack-label outlined
            v-model="form.stock_type"
            label="Tipo de Ação"
            :options="stockTypes"
            emit-value
            map-options
            :rules="[ val => val && val.length > 0 || 'Campo requerido']"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-checkbox v-model="form.is_foreigner" label="Ativo no exterior"></q-checkbox>
        </div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-xs-12 col-sm-6 col-md-6">
          <q-input stack-label outlined v-model="form.name" label="Nome" :rules="[ val => val && val.length > 0 || 'Campo requerido']"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2">
          <q-input stack-label outlined v-model="form.code" label="Código de negociação" :rules="[ val => val && val.length > 0 || 'Campo requerido']"/>
        </div>
        <div v-if="form.asset_type === 'Stock' || form.asset_type === 'FII'" class="col-xs-12 col-sm-6 col-md-4">
          <q-input stack-label outlined v-model="form.cnpj" label="CNPJ" mask="##################" unmasked-value/>
        </div>
      </div>
      <div v-if="form.asset_type === 'FII'" class="row q-col-gutter-sm">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-input stack-label outlined v-model="form.fii_admin_name" label="Administradora" maxlength="20"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-input stack-label outlined v-model="form.fii_admin_cnpj" label="CNPJ Administradora" mask="##################" unmasked-value/>
        </div>
      </div>

      <q-btn type="submit" label="Salvar" color="primary" class="q-mt-md"/>
    </q-form>
  </q-card>
</template>

<style scoped>

</style>
