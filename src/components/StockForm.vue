<script setup>
import { ref, inject, onMounted } from 'vue'
const props = defineProps(['assets'])
const { form } = inject('form')
const options = ref([])
function filterManufacturer (val, update) {
  if (val === '') {
    update(() => {
      options.value = props.assets
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    options.value = props.assets.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
  })
}
onMounted(() => {
  options.value = props.assets
})

const makeVal = (operation) => {
  const codeValue = operation.code.value
  const assetType = operation.code.asset_type
  operation.code = codeValue
  operation.asset_type = assetType
}
</script>

<template>
  <q-card class="my-form" bordered>
    <q-card-section>
      <pre v-if="false">{{form.operations}}</pre>
      <div class="row q-col-gutter-xs" v-for="(operation, index) in form.operations" :key="index">
        <div class="col-xs-12 col-sm-6 col-md-2">
          <q-select v-model="operation.operation_type" :options="['Compra', 'Venda']" label="Operação" :rules="[ val => val && val.length > 0 || 'Campo requerido']" outlined stack-label />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            v-if="false"
            outlined stack-label
            v-model="operation.code"
            label="Código *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Campo requerido']"
          />
          <q-select outlined stack-label v-model="operation.code"
                    use-input input-debounce="0" @filter="filterManufacturer" @update:model-value="makeVal(operation)"
                    :rules="[val => !!val || 'Informação obrigatória']" :options="options" label="Código *" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2">
          <q-input
            type="number"
            outlined stack-label
            v-model="operation.quantity"
            label="Quantidade *"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Campo requerido',
          val => val > 0 && val < 1000 || 'Informe uma quantidade real'
        ]"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2">
          <q-input type="number" v-model="operation.price" label="Cotação" step="0.01" stack-label outlined :rules="[ val => val && val.length > 0 || 'Campo requerido']"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2">
          <q-btn icon="remove_circle" class="q-mt-sm q-ml-md" color="warning" rounded outline/>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
</style>
