import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

import Scanports from '../components/Scan/Scanports.vue'
import Scanfiles from '../components/Scan/Scanfiles.vue'
import Scanc from '../components/Scan/Scanc.vue'
import Scan from '../components/Scan/Scan.vue'

import Tools from '../components/Tools/Tools.vue'
import Toolsmanage from '../components/Tools/Toolsmanage.vue'
import Vulmanage from  '../components/Tools/Vulmanage.vue'
import Toolsdetails from  '../components/Tools/Toolsdetails.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { title: '首页' },
      children: [
        {
          path: '/scan',
          // redirect: 'scanports',
          name: 'scan',
          component: Scan,
          meta: { title: '扫描任务' },  
          children: [
            { path: 'scanports', component: Scanports, meta: { title: '端口扫描' }},
            { path: 'scanfiles', component: Scanfiles, meta: { title: '敏感文件/路径' }},
            { path: 'cscan', component: Scanc, meta: { title: 'C段扫描' }}
          ]
        },
        {
          path: '/tools',
          // redirect: 'toolsmanage',
          name: 'tools',
          component: Tools,
          meta: { title: '漏洞利用' },  
          children: [
            { path: 'toolsmanage', component: Toolsmanage, meta: { title: '漏洞工具' }},
            { path: 'vulmanage', component: Vulmanage, meta: { title: '漏洞情报' }},
            { path: 'toolsdetails/:id', component: Toolsdetails, meta: { title: '工具详情' }},
          ]
        },

      ]
    },

    // {
    //   path: '/home',
    //   component: Home,
    //   redirect: '/welcome',
      // children: [
      //   { path: '/users', component: Users, meta: { title: '用户列表' } },
      //   { path: '/rights', component: Rights, meta: { title: '权限管理' } },
      //   { path: '/roles', component: Roles, meta: { title: '角色列表' } },
      //   { path: '/categories', component: Cate, meta: { title: '订单管理' } },
      //   { path: '/params', component: Params, meta: { title: '数据统计' } },
      // ]
    // }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 表示将要访问的路径
  // from 表示从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login) 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router