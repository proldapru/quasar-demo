/**
 * Используется mock db на основе json-server через интерфейс,
 * предоставляемый ресурсом https://my-json-server.typicode.com
 * Файл db.json берётся из github-репозиторияю (поэтому readonly).
 */

import axios from 'axios';

import { PermissionsDataObject, PermObject } from './models';

const API = axios.create({
  baseURL: 'https://my-json-server.typicode.com/proldapru/quasar-demo',
  responseType: 'json',
});

type SaveDataStatus = 'Ok' | 'Er';

interface ApiSaveDataStatus {
  status: SaveDataStatus;
}

export async function fetchPermissionsData(): Promise<PermissionsDataObject> {
  const response = await API.get<PermissionsDataObject>('/permissions');
  return response.data;
}

export async function modifyPermission(
  permObject: PermObject
): Promise<SaveDataStatus> {
  /* Нужен POST, но на https://my-json-server.typicode.com работает только GET =( */
  console.log(permObject);
  const response = await API.get<ApiSaveDataStatus>(
    '/mod/permission' /* , permObject*/
  );
  return response.data.status;
}
