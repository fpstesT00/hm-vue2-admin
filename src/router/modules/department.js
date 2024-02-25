import layout from '@/layout'
export default {
  path: '/department',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/department'),
    name: 'department',
    meta: {
      icon: 'tree',
      title: '组织'
    }
  }]
}
