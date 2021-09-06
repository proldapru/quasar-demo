const routes = [
  {
    path: '/',
    name: 'index',
    redirect: (to) => ({ name: 'about' }),
    component: () => import('layouts/MainLayout.vue'),
    props: true,
    children: [
      {
        path: '/tasks',
        name: 'tasks',
        component: () => import('pages/PagePermissions.vue'),
        meta: {permObjectType: 'task', mainHeader: 'Права по задачам'},
        props: true,
        children: [
          {
            path: '/tasks/:permObjectId',
            name: 'taskPermissions',
            component: () => import('components/ModPermForm.vue'),
            meta: {permObjectType: 'task', subHeader: 'Права для задачи', gridCaption: 'Пользователь'},
            props: true,
          },
        ],
      },

      {
        path: '/users',
        name: 'users',
        component: () => import('pages/PagePermissions.vue'),
        meta: {permObjectType: 'user', mainHeader: 'Права по пользователям'},
        props: true,
        children: [
          {
            path: '/users/:permObjectId',
            name: 'userPermissions',
            component: () => import('components/ModPermForm.vue'),
            meta: {permObjectType: 'user', subHeader: 'Права для пользователя', gridCaption: 'Задача'},
            props: true,
          },
        ],
      },

      {
        path: '/about',
        name: 'about',
        component: () => import('pages/PageAbout.vue'),
        meta: {mainHeader: 'О программе'}
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
