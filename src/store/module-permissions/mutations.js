export function setPermissions (state, permObject) {
	state.permissions = permObject
}

export function modPermission (state, permObject) {
	const permIndex = state.permissions.perms
		.findIndex(x => x.taskId === permObject.taskId && x.userId === permObject.userId)
	state.permissions.perms[permIndex].perm = permObject.perm
}
