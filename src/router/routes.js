const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/list-ativos', name: 'listAssets', component: () => import('pages/ListAssetsPage.vue') },
      { path: '/new-operations', name: 'newNoteAndOperations', component: () => import('pages/NewNoteAndOperationsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
