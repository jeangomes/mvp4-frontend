<template>
  <div>
    <div class="text-h4 doc-h2">Ativos Financeiros</div>
    <div class="row q-gutter-sm">
      <div class="col-5" v-for="(row, number) in rows" :key="number">
        <q-card class="my-card q-mb-sm" flat bordered>
          <q-card-section>
            <q-table
              dense
              :title="number"
              ref="tableRef"
              separator="cell"
              hide-pagination
              :rows="row"
              :columns="columns"
              row-key="id"/>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getFinancialAssetsWithoutPagination } from 'src/services-http/requests'
import { ref, onMounted } from 'vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: 'name'
  },
  {
    name: 'code',
    required: true,
    label: 'Código',
    align: 'left',
    field: 'code'
  },
  {
    name: 'asset_type',
    field: 'asset_type',
    required: true,
    label: 'Tipo',
    align: 'left'
  },
  {
    name: 'is_foreigner',
    field: 'is_foreigner',
    required: true,
    label: 'Exterior',
    align: 'left',
    format: (val, row) => val === 1 ? 'S' : ''
  },
  {
    name: 'cnpj',
    required: true,
    label: 'CNPJ',
    align: 'cnpj',
    field: 'cnpj'
  }
]

const tableRef = ref()
const rows = ref([])
const loading = ref(false)

function onRequest () {
  getFinancialAssetsWithoutPagination()
    .then(({ data }) => {
      // pagination.value.rowsNumber = data.meta.total
      rows.value = data
      // pagination.value.page = page
      // pagination.value.rowsPerPage = data.meta.per_page
      loading.value = false
    })
}

onMounted(() => {
  // get initial data from server (1st page)
  // tableRef.value.requestServerInteraction()
  onRequest()
})
</script>

<style>
</style>
