<template>
  <div>
    <div class="text-h4 doc-h2">Ativos Financeiros</div>
    <div class="q-mb-md">
      <financial-asset-form @reloadData="onRequest"/>
    </div>
    <div class="row q-gutter-sm">
      <div class="col-5" v-for="(row, number) in rows" :key="number">
        <q-card class="my-card q-mb-sm" flat bordered>
          <q-card-section>
            <q-table
              dense
              :title="number"
              ref="tableRef"
              separator="cell"
              :rows-per-page-options="[0]"
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
import FinancialAssetForm from 'components/FinancialAssetForm.vue'

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
    name: 'stock_type',
    field: 'stock_type',
    required: true,
    label: 'Tipo2',
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
      rows.value = data
      loading.value = false
    })
}

onMounted(() => {
  onRequest()
})
</script>

<style>
</style>
