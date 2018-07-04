
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/login'),
    children: [
      { path: '', component: () => import('components/login/loginform') }
    ]
  },
  {
    path: '/newtask',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('components/task/formNew') }
    ]
  },
  {
    path: '/listTask',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('components/task/list') }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
