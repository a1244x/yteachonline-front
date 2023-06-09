import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '隐元后台首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/edu/teacher',
    component: Layout,
    redirect: '/edu/teacher/list',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'perples' },
    hidden:false,
    children: [
      {
        path: 'list',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '讲师列表',icon: 'table' }
      },
      {
        path: 'save',
        name: '添加讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '添加讲师',icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '编辑讲师',noCache:true },
        hidden: true
      }
    ]
  },
  {
    path: '/edu/subject',
    component: Layout,
    redirect: '/edu/subject/list',
    name: 'Subject',
    meta: { title: '课程分类管理', icon: 'nested' },
    hidden:false,
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '课程分类列表' }
      },
      {
        path: 'save',
        name: '添加课程分类',
        component: () => import('@/views/edu/subject/save'),
        meta: { title: '添加课程分类' }
      }
    ]
  },
  {
    path: '/edu/course',
    component: Layout,
    redirect: '/edu/course/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/edu/course/list'),
        meta: { title: '课程列表' }
      },
      {
        path: 'info',
        name: '发布课程',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '发布课程' }
      },
      {
        path: 'info/:id',
        name: '编辑课程基本信息',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: '编辑课程大纲',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/add',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      }

    ]
  },
  {
    path: '/exam/question',
    component: Layout,
    redirect: '/exam/question/list',
    name: '题目管理',
    meta: { title: '题目管理', icon: 'perples' },
    hidden:false,
    children: [
      {
        path: 'list',
        name: '题目列表',
        component: () => import('@/views/exam/question/list'),
        meta: { title: '题目列表',icon: 'table' }
      },
      {
        path: 'save',
        name: '添加题目',
        component: () => import('@/views/exam/question/save'),
        meta: { title: '添加题目',icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑题目',
        component: () => import('@/views/exam/question/save'),
        meta: { title: '编辑题目',noCache:true },
        hidden: true
      }
    ]
  },
  {
    path: '/exam/exam',
    component: Layout,
    redirect: '/exam/exam/list',
    name: '考试管理',
    meta: { title: '考试管理', icon: 'perples' },
    hidden:false,
    children: [
      {
        path: 'list',
        name: '考试列表',
        component: () => import('@/views/exam/exam/list'),
        meta: { title: '考试列表',icon: 'table' }
      },
      {
        path: 'save/:id',
        name: '添加考试',
        component: () => import('@/views/exam/exam/save'),
        meta: { title: '添加考试',icon: 'tree' },
        hidden:true
      },
    ]
  },
  {
    path: '/exam/paper',
    component: Layout,
    redirect: '/exam/paper/list',
    name: '试卷管理',
    meta: { title: '试卷管理', icon: 'perples' },
    hidden:false,
    children: [
      {
        path: 'list',
        name: '试卷列表',
        component: () => import('@/views/exam/paper/list'),
        meta: { title: '试卷列表',icon: 'table' }
      },
      {
        path: 'save/:id',
        name: '添加试题',
        component: () => import('@/views/exam/paper/save'),
        meta: { title: '添加试题',icon: 'tree' },
        hidden:true
      },
    ]
  },



  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export default router