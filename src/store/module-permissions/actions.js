import axios from 'axios'

const API = axios.create({
  baseURL: 'https://my-json-server.typicode.com/proldapru/quasar-demo',
  responseType: "json"
})

export function fetchData(context) {
	return API.get('/permissions').then(({ data: permissions }) => {
      context.commit('setPermissions', permissions)
    })
}

export function modifyPermission(context, permObject) {
	/* Нужен POST, но на https://my-json-server.typicode.com работае только GET =( */
	return API.get('/mod/permission', permObject).then(({ data }) => {
		  if(data.status === 'Ok') context.commit('modPermission', permObject)
    })
}
