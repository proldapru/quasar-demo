export function permissionsLoaded (state) {
	return !!state.permissions?.tasks?.length
}

export function permTypes (state) {
  return state.permissions.permTypes
}

export function permissionsByTasks (state) {
  const localTasks = state.permissions.tasks.map(x => Object.assign({}, x))
  for(let t of localTasks) {
    t.perm = state.permissions.perms
      .filter(p => p.taskId === t.id)
      .map(x => Object.assign({}, x))
      .map(x => {x.title = state.permissions.users.find(y => y.id === x.userId).name; return x})
  }

	return localTasks
}

export function taskPermissions(state){
	return  taskId => {
    const localTask = Object.assign({}, state.permissions.tasks.find(x => x.id === taskId))
    localTask.perm = state.permissions.perms
      .filter(p => p.taskId === taskId)
      .map(x => Object.assign({}, x))
      .map(x => {x.title = state.permissions.users.find(y => y.id === x.userId).name; return x})

    return localTask
  }
}

export function permissionsByUsers (state) {
  const localUsers = state.permissions.users.map(x => Object.assign({}, x))
  for(let u of localUsers) {
    u.perm = state.permissions.perms
      .filter(p => p.userId === u.id)
      .map(x => Object.assign({}, x))
      .map(x => {x.title = state.permissions.tasks.find(y => y.id === x.taskId).name; return x})
  }

  return localUsers
}

export function userPermissions(state){
	return  userId => {
    const localUser = Object.assign({}, state.permissions.users.find(x => x.id === userId))
    localUser.perm = state.permissions.perms
      .filter(p => p.userId === userId)
      .map(x => Object.assign({}, x))
      .map(x => {x.title = state.permissions.tasks.find(y => y.id === x.taskId).name; return x})

    return localUser
  }
}