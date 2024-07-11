import { api } from 'boot/axios'

export const myRequest = (codeFilter) => {
  let url = '/operations'
  if (codeFilter !== '') {
    url = '/operations?code=' + codeFilter
  }
  return api.get(url)
}

export const getFinancialAssets = (pagination) => {
  return api.get(`/financial-assets?page=${pagination.page}&sort=${pagination.descending ? '-' : ''}${pagination.sortBy}`)
}

export const getFinancialAssetsWithoutPagination = () => {
  return api.get('/financial-assets')
}

export const postNewFinancialAssets = (payload) => {
  return api.post('/financial-assets', payload)
}

export const postNewNegotiationNote = (payload) => {
  return api.post('/negotiation-notes', payload)
}

export const updateNegotiationNote = (id, payload) => {
  return api.put('/negotiation-notes/' + id, payload)
}

export const getNegotiationNotes = () => {
  return api.get('/negotiation-notes')
}

export const getAssetsListForCombo = () => {
  return api.get('/assets-list')
}

export const getCurrentPosition = () => {
  return api.get('/current-position')
}

export const deleteNoteAndOperations = (noteId) => {
  return api.delete('/negotiation-notes/' + noteId)
}

export const getNoteAndOperations = (noteId) => {
  return api.get('/negotiation-notes/' + noteId)
}
