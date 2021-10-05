export interface IdentifiedObject {
  id: string;
  name: string;
  icon?: string;
  perm?: PermObject[];
}

export interface PermObject {
  taskId: string;
  userId: string;
  perm: string;
  title?: string;
}

export interface PermissionsObjectInterface {
  tasks: IdentifiedObject[];
  users: IdentifiedObject[];
  perms: PermObject[];
  permTypes: IdentifiedObject[];
}

export interface PermissionsStateInterface {
  permissions: PermissionsObjectInterface | null;
}

export default function () {
  return {
    permissions: null
  }
}
