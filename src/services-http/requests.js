import { api } from 'boot/axios'

export const myRequest = (codeFilter) => {
  let url = 'http://localhost:5000/operations'
  if (codeFilter !== '') {
    url = 'http://localhost:5000/operations?code=' + codeFilter
  }
  return fetch(url)
    .then(data => {
      return data.json()
    })
    .then(myData => {
      return myData.operations
    })
    .catch(function (error) {
      console.log(error.message)
    })
}

export const myRequestOneRecord = (id) => {
  return fetch('http://localhost:5000/operation?operation_id=' + id)
    .then(data => {
      return data.json()
    })
    .then(myData => {
      // console.log(myData)
      return myData
    })
    .catch(function (error) {
      console.log(error.message)
    })
}

export const postMyData = (myState) => {
  const formData = new FormData()
  for (const key in myState) {
    formData.append(key, myState[key])
  }
  const options = {
    method: 'POST',
    body: formData
  }
  return fetch('http://localhost:5000/operation', options)
    .then(data => {
      return data.json()
    })
    .then(update => {
      // console.log(update);
      return true
    })
    .catch(e => {
      console.log(e)
    })
}

export const updateMyData = (myState) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(myState),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch('http://localhost:5000/operation/' + myState.id, options)
    .then(data => {
      return data.json()
    })
    .then(update => {
      return true
    })
    .catch(e => {
      console.log(e)
    })
}

export const deleteRecord = (id) => {
  return fetch('http://localhost:5000/operation?operation_id=' + id, { method: 'DELETE' })
    .then(data => {
      return data.json()
    })
    .then(myData => {
      console.log(myData)
    })
    .catch(function (error) {
      console.log(error.message)
    })
}

export const getFinancialAssets = (pagination) => {
  return api.get(`/financial-assets?page=${pagination.page}&sort=${pagination.descending ? '-' : ''}${pagination.sortBy}`)
}

export const getFinancialAssetsWithoutPagination = () => {
  return api.get('/financial-assets')
}
