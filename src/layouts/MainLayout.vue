<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          MVP - 4 | Frontend App - Gestão de compra de ativos financeiros
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding style="background-color:#f0f0f0">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Posição e Operações',
    caption: 'Ações, FIIs...',
    icon: 'list',
    link: { name: 'home' }
  },
  {
    title: 'Cadastrar operações',
    caption: 'Compras de Ações, FIIs...',
    icon: 'list',
    link: { name: 'newNoteAndOperations' }
  },
  {
    title: 'Listagem de Ativos',
    caption: 'Ações, FIIs...',
    icon: 'list',
    link: { name: 'listAssets' }
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
