import Vue from 'vue'
import Router from 'vue-router'
import servicePackagingIndex from '@/views/servicePackaging/index'
import servicePackaging from '@/views/servicePackaging/package'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/servicePackagingIndex',
      name: 'index'
    },
    {
      path: '/servicePackagingIndex',
      name: 'servicePackagingIndex',
      sideName: '服务打包',
      icon: 'iconfont el-icon-sold-out',
      component: servicePackagingIndex,
    },
    {
      path: '/servicePackaging',
      name: 'servicePackaging',
      sideName: '服务打包ing',
      hide: true,
      component: servicePackaging,
      meta: { sideActive: '/servicePackagingIndex' }
    },
  ]
})
