import Vue from 'vue'
import Router from 'vue-router'
import template from '@/pages/serviceTemplate'
import templateAdmin from '@/pages/serviceTemplate/templateAdmin'
import servicePackagingIndex from '@/pages/servicePackaging/index'
import servicePackaging from '@/pages/servicePackaging/package'
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
      path: '/servicePackagingIndex',
      name: 'servicePackagingIndex',
      component: servicePackagingIndex
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
