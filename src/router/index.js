import Vue from 'vue'
import Router from 'vue-router'
import template from '@/views/serviceTemplate'
import templateUser from '@/views/serviceTemplate/templateUser'
import templateAdmin from '@/views/serviceTemplate/templateAdmin'
import contractGeneration from '@/views/contractGeneration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/template/users',
      name: 'index'
    },
    {
      path: '/template',
      component: template,
      sideName: '服务模板',
      icon: 'iconfont el-icon-tickets',
      children:[
        {
          path: '/template/users',
          name: 'users',
          sideName: '模板生成',
          component: templateUser
        },
        {
          path: '/template/admin',
          name: 'admin',
          sideName: '模板管理',
          component: templateAdmin
        },
      ]
    },
    {
      path: '/contractGeneration',
      name: 'contractGeneration',
      sideName: '契约生成',
      icon: 'iconfont el-icon-document',
      component: contractGeneration
    },
  ]
})
