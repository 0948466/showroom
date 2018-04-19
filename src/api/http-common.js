import axios from 'axios'
import urlJSON from '@/url.json'

let baseUrl = (process.env.NODE_ENV !== 'development') ? '' : 'http://localhost:3004'

export const HTTP = function(urlFrom, params) {
  let url

  switch (urlFrom) {
    case 'register':
      url = urlJSON.showroom_api_register_action
      break
    case 'createTask':
      url = urlJSON.avatar_create_task_action
      break
    case 'calibration':
      url = urlJSON.avatar_calibration_action
      break
    case 'checkRequest':
      url = urlJSON.avatar_check_request_action
      break
    case 'status':
      url = urlJSON.showroom_api_status_action
      break
    case 'user':
      url = urlJSON.imigize_user_action
      break
    case 'sendFiles':
      url = urlJSON.wildberries_create
      break
    case 'userExit':
      url = urlJSON.api_user_exit
      break
  }

  return axios.create({
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params
  }).get(`${baseUrl}${url}`)
}

export const URL = {
  specialCatalogWidlberries: urlJSON.specialCatalogWildberries,
  sendFiles: `${baseUrl}${urlJSON.wildberries_create}`
}
