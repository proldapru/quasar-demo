export interface PermObject {
  taskId: string;
  userId: string;
  perm: string;
  title?: string;
}

export interface IdentifiedObject {
  id: string;
  name: string;
  icon?: string;
  perm?: PermObject[];
}

export interface PermissionsDataObject {
  tasks: IdentifiedObject[];
  users: IdentifiedObject[];
  perms: PermObject[];
  permTypes: IdentifiedObject[];
}
