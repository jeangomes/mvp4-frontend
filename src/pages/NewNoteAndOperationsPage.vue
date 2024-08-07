<template>
  <div>
    <div class="text-h4 doc-h2">Cadastrar nota e operações</div>
    <div class="q-mb-md">
      <negotiation-note-form
        @reloadData="onRequest"
        :assets="assets"
        :editEnable="enableEdit"
        :note-id="noteId"
        @cancel-edit="cancelEdit"/>
    </div>
    <q-card class="my-card q-mb-sm" flat bordered>
      <q-card-section>
        <q-table
          ref="tableRef"
          separator="cell"
          :rows-per-page-options="[0]"
          :rows="rows"
          :columns="columns"
          row-key="id">
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width/>
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
              <q-th auto-width/>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                       :icon="props.expand ? 'expand_less' : 'expand_more'"/>
              </q-td>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
              </q-td>
              <q-td auto-width>
                <div class="q-gutter-xs">
                  <q-btn size="sm" color="info" round dense @click="updateNote(props.row.id)" icon="edit"/>
                  <q-btn size="sm" color="negative" round dense @click="deleteNote(props.row.id)" icon="delete"/>
                </div>
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div>
                  <q-table
                    dense
                    :rows-per-page-options="[0]"
                    hide-pagination
                    :rows="props.row.operations"
                    :columns="columns2"
                    row-key="name"
                  />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import {
  deleteNoteAndOperations,
  getAssetsListForCombo,
  getNegotiationNotes
} from 'src/services-http/requests'
import { ref, onMounted } from 'vue'
import NegotiationNoteForm from 'components/NegotiationNoteForm.vue'
import { currencyFormat, dateFormat } from 'src/util'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const columns = [
  {
    name: 'data_pregao',
    required: true,
    label: 'Data Pregão',
    align: 'left',
    field: 'data_pregao',
    format: val => dateFormat(val)
  },
  {
    name: 'valor_liquido',
    required: true,
    label: 'Valor Líquido',
    align: 'left',
    field: 'valor_liquido',
    format: val => currencyFormat(val)
  },
  {
    name: 'taxa_liquidacao',
    field: 'taxa_liquidacao',
    required: true,
    label: 'Taxa liquidação',
    align: 'left',
    format: val => currencyFormat(val)
  },
  {
    name: 'emolumentos',
    field: 'emolumentos',
    required: true,
    label: 'Emolumentos',
    align: 'left',
    format: val => currencyFormat(val)
  },
  {
    name: 'total_taxa',
    field: 'total_taxa',
    required: true,
    label: 'Total Taxa',
    align: 'left',
    format: val => currencyFormat(val)
  },
  {
    name: 'liquido',
    field: 'liquido',
    required: true,
    label: 'Liquido',
    align: 'left',
    format: val => currencyFormat(val)
  },
  {
    name: 'corretagem',
    field: 'corretagem',
    required: true,
    label: 'Corretagem',
    align: 'left',
    format: val => currencyFormat(val)
  },
  {
    name: 'total',
    field: 'total',
    required: true,
    label: 'Total',
    align: 'left',
    format: val => currencyFormat(val)
  }
]

const columns2 = [
  {
    name: 'operation_type',
    required: true,
    label: 'Operação',
    align: 'left',
    field: 'operation_type'
  },
  {
    name: 'code',
    required: true,
    label: 'Código',
    align: 'left',
    field: 'code'
  },
  {
    name: 'quantity',
    field: 'quantity',
    required: true,
    label: 'Quantidade',
    align: 'left'
  },
  {
    name: 'price',
    field: 'price',
    required: true,
    label: 'Cotação',
    align: 'left',
    format: val => currencyFormat(val)
  },
  {
    name: 'operation_amount',
    field: 'operation_amount',
    required: true,
    label: 'Valor Negociado',
    align: 'left',
    format: val => currencyFormat(val)
  },
  {
    name: 'taxas',
    field: 'taxas',
    required: true,
    label: 'Taxas',
    align: 'left',
    format: val => currencyFormat(val)
  }
]

const tableRef = ref()
const rows = ref([])
const assets = ref([])
const loading = ref(false)
const enableEdit = ref(false)
const noteId = ref(null)

function onRequest () {
  cancelEdit()
  getNegotiationNotes()
    .then(({ data }) => {
      rows.value = data
      loading.value = false
    })
}

onMounted(() => {
  onRequest()
  getAssetsListForCombo().then(function (response) {
    assets.value = response.data.map(function (elem) {
      const elem2 = {}
      elem2.label = elem.code
      elem2.value = elem.code
      elem2.asset_type = elem.asset_type
      return elem2
    })
  })
})
const updateNote = (id) => {
  enableEdit.value = true
  noteId.value = id
}
const cancelEdit = () => {
  enableEdit.value = false
  noteId.value = null
}
const deleteNote = (id) => {
  $q.dialog({
    title: 'Confirmação',
    message: 'Deseja deletar essa nota de corretagem e suas operações?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteNoteAndOperations(id).then(() => {
      $q.notify({
        type: 'positive',
        message: 'Nota e operações deletadas com sucesso!'
      })
      onRequest()
    })
  })
}
</script>

<style>
</style>
