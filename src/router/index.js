import Vue from 'vue'
import Router from 'vue-router'
import template from '@/pages/serviceTemplate'
import templateAdmin from '@/pages/serviceTemplate/templateAdmin'
import servicePackaging from '@/pages/servicePackaging'
import contractGeneration from '@/pages/contractGeneration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/template',
      name: 'index'
    },
    {
      path: '/template',
      name: 'template',
      component: template
    },
    {
      path: '/templateAdmin',
      name: 'templateAdmin',
      component: templateAdmin
    },
    {
      path: '/servicePackaging',
      name: 'servicePackaging',
      component: servicePackaging
    },
    {
      path: '/contractGeneration',
      name: 'contractGeneration',
      component: contractGeneration
    }
  ]
})
