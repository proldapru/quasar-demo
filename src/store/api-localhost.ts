/**
 * Вариант с локальной mock db через json-server.
 * Работает сохранение прав пользователя (через PATCH-запрос).
 * Не забудьте запустить json-server:
 * npm run json-server
 */

import axios from 'axios';

import { PermissionsDataObject, PermObject } from './models';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  responseType: 'json',
});

type SaveDataStatus = 'Ok' | 'Er';

export async function fetchPermissionsData(): Promise<PermissionsDataObject> {
  const response = await API.get<PermissionsDataObject>('/db');
  return response.data;
}

export async function modifyPermission(
  permObject: PermObject
): Promise<SaveDataStatus> {
  const response = await API.patch(`/perms/${ permObject.id !== undefined ? permObject.id : '-1' }`, {
    perm: permObject.perm,
  });

  return response.status === 200 ? 'Ok' : 'Er';
}
