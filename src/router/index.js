import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/* Router Modules */
import componentsRouter from "./modules/components";
import chartsRouter from "./modules/charts";
import tableRouter from "./modules/table";
import nestedRouter from "./modules/nested";

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }

  isRoleHidden: true  根据接口（admin/index）中的 role 为0则没有权限(则 isRoleHidden: true)，为1有权限
**/
export const asyncRouterMap = [
  {
    path: "/website",
    component: Layout,
    redirect: "/website/website_setting",
    name: "website",
    meta: {
      title: "站点",
      icon: "nested"
    },
    children: [
      {
        path: "website_setting",
        component: () => import("@/views/website/website_setting/index"),
        name: "website_setting",
        meta: { title: "站点设置", icon: "tree" }
      },
      {
        path: "user_login_setting",
        component: () => import("@/views/website/user_login_setting/index"),
        name: "user_login_setting",
        meta: { title: "登录设置", icon: "user" }
      },
      {
        path: "sms_setting",
        component: () => import("@/views/website/sms_setting/index"),
        name: "sms_setting",
        meta: { title: "短信设置", icon: "message" }
      },

      {
        path: "accessory_setting",
        component: () => import("@/views/website/accessory_setting/index"),
        name: "accessory_setting",
        meta: { title: "附件设置", icon: "component" }
      },
      {
        path: "register_website",
        component: () => import("@/views/website/register_website/index"),
        name: "register_website",
        meta: { title: "注册站点", icon: "component" }
      },
      {
        path: "white_list",
        component: () => import("@/views/website/white_list/index"),
        name: "white_list",
        meta: { title: "IP白名单", icon: "guide" }
      },
      {
        path: "system_upgrade",
        component: () => import("@/views/website/system_upgrade/index"),
        name: "system_upgrade",
        meta: { title: "系统升级", icon: "guide" }
      }
    ]
  },
  {
    path: "/users",
    component: Layout,
    redirect: "/users/admin",
    name: "Users",
    meta: {
      title: "用户",
      icon: "peoples"
    },
    children: [
      {
        path: "admin",
        component: () => import("@/views/users/admin/index"),
        name: "Admin",
        meta: { title: "管理员用户", icon: "user" }
      },
      {
        path: "admin/edit/:id(\\d+)",
        component: () => import("@/views/users/admin/edit"),
        name: "AdminEdit",
        meta: { title: "编辑管理员用户" },
        hidden: true
      },
      {
        path: "admin/add",
        component: () => import("@/views/users/admin/add"),
        name: "AdminAdd",
        meta: { title: "添加管理员用户" },
        hidden: true
      },
      {
        path: "admin/platform_list/:id(\\d+)",
        component: () => import("@/views/users/admin/platform_list"),
        name: "AdminPlatformList",
        meta: { title: "平台列表" },
        hidden: true
      },

      {
        path: "assistant",
        component: () => import("@/views/users/assistant/index"),
        name: "Assistant",
        meta: { title: "店员用户", icon: "people" }
      },
      // {
      //   path: "admin_group",
      //   component: () => import("@/views/users/admin_group/index"),
      //   name: "AdminGroup",
      //   meta: { title: "管理员用户组", icon: "peoples" }
      // },
      {
        path: "admin_group/add",
        component: () => import("@/views/users/admin_group/add_user_group"),
        name: "AdminGroupAdd",
        meta: { title: "添加管理员用户组" },
        hidden: true
      },
      {
        path: "admin_group/edit/:id(\\d+)",
        component: () => import("@/views/users/admin_group/edit_user_group"),
        name: "AdminGroupEdit",
        meta: { title: "编辑管理员用户组" },
        hidden: true
      },
      // {
      //   path: "permissions",
      //   component: () => import("@/views/users/permissions/index"),
      //   name: "Permissions",
      //   meta: { title: "权限管理", icon: "peoples" }
      // },
      {
        path: "permissions/second/:id(\\d+)",
        component: () => import("@/views/users/permissions/second_menu"),
        name: "PermissionsSecond",
        meta: { title: "权限管理-下级菜单", icon: "peoples" },
        hidden: true
      },

      // {
      //   path: "role",
      //   component: () => import("@/views/users/role/index"),
      //   name: "Role",
      //   meta: { title: "角色管理", icon: "peoples" }
      // },
      {
        path: "role/add",
        component: () => import("@/views/users/role/add_role"),
        name: "RoleAdd",
        meta: { title: "添加角色" },
        hidden: true
      },
      {
        path: "role/edit/:id(\\d+)",
        component: () => import("@/views/users/role/edit_role"),
        name: "RoleEdit",
        meta: { title: "编辑角色" },
        hidden: true
      }
    ]
  },
  {
    path: "/home",
    component: Layout,
    redirect: "/home/index",
    name: "Home",
    meta: {
      title: "首页设置",
      icon: "star"
    },
    children: [
      {
        path: "index/setting",
        component: () => import("@/views/home/index/index"),
        name: "HomeIndex",
        meta: { title: "首页设置", icon: "documentation" }
      },
      {
        path: "theme/index",
        component: () => import("@/views/home/theme/index"),
        name: "ThemeIndex",
        meta: { title: "主题设置", icon: "theme"  },
        hidden: false
      },
      {
        path: "theme/basic/:id(\\d+)",
        component: () => import("@/views/home/theme/basic"),
        name: "ThemeBasic",
        meta: { title: "基础设置", icon: "theme"  },
        hidden: true
      },
      {
        path: "theme/top/:id(\\d+)",
        component: () => import("@/views/home/theme/top"),
        name: "ThemeTop",
        meta: { title: "顶部设置", icon: "theme"  },
        hidden: true
      },
      {
        path: "theme/bottom/:id(\\d+)",
        component: () => import("@/views/home/theme/bottom"),
        name: "ThemeBottom",
        meta: { title: "底部设置", icon: "theme"  },
        hidden: true
      },
      {
        path: "theme/list/:id(\\d+)",
        component: () => import("@/views/home/theme/list"),
        name: "ThemeList",
        meta: { title: "页面列表", icon: "theme"  },
        hidden: true
      },
      {
        path: "theme/record/:id(\\d+)",
        component: () => import("@/views/home/theme/record"),
        name: "ThemeRecordt",
        meta: { title: "提交记录", icon: "theme"  },
        hidden: true
      },
    ]
  },
  {
    path: "/meal",
    component: Layout,
    redirect: "/meal/list",
    name: "Meal",
    meta: {
      title: "套餐管理",
      icon: "peoples"
    },
    children: [
      {
        path: "list/index",
        component: () => import("@/views/meal/list/index"),
        name: "List",
        meta: { title: "套餐列表", icon: "fenleicengji" }
      },
      {
        path: "list/add/:id(\\d+)?",
        component: () => import("@/views/meal/list/add"),
        name: "ListAdd",
        meta: { title: "新增套餐" },
        hidden: true
      },{
        path: "meal_record",
        component: () => import("@/views/meal/record/index"),
        name: "RecordIndex",
        meta: { title: "套餐记录", icon: "jilu3" }
      }
    ]
  },
];

export const constantRouterMap = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/change_mobile",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/change_mobile",
        component: () => import("@/views/forget/change_mobile")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "/500",
    component: () => import("@/views/errorPage/500"),
    hidden: true
  },
  {
    path: "/forget",
    component: () => import("@/views/forget/index"),
    hidden: true
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true
  },
  {
    path: "/change_pwd",
    name:"changePwd",
    component: () => import("@/views/forget/change_pwd"),
    mata:{
      title:'修改密码'
    },
    hidden: true
  },
  {
    path: "/blank",
    component: () => import("@/views/forget/blank"),
    hidden: true
  },
  // 加载页面
  {
    path: "/",
    component: Layout,
    component: () => import("@/views/redirect/loading"),
    hidden: true
  },
  {
    path: "/manage",
    component: Layout,
    name: "platform",
    meta: {
      title: "平台",
      icon: "example"
    },
    children: [
      {
        path: "/manage/index",
        component: () => import("@/views/platform/manage/index"),
        name: "Manage",
        meta: { title: "平台管理", icon: "edit" }
      },
      {
        path: "/manage/add",
        component: () => import("@/views/platform/manage/add_platform"),
        name: "add_platform",
        hidden: true,
        meta: { title: "平台编辑", icon: "edit" }
      },
      {
        path: "/manage/user/:id(\\d+)",
        component: () => import("@/views/platform/manage/user_list"),
        name: "user_list",
        hidden: true,
        meta: { title: "使用者管理", icon: "edit" }
      },
      {
        path: "recycle/index",
        component: () => import("@/views/platform/recycle/index"),
        name: "recycle",
        meta: { title: "回收站", icon: "list" }
      },
      {
        path: "set/index",
        component: () => import("@/views/platform/set/index"),
        name: "set",
        isRoleHidden: true,
        meta: { title: "基础设置", icon: "shezhi" }
      }
    ]
  },
  {
    path: "/install",
    // component: Layout,
    hidden: true,
    component: () => import("@/views/install/wizard"),
    meta: { title: "安装向导" }
  },
  { path: "*", redirect: "/404", hidden: true }
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'platform/manage/index',
  //   children: [
  //     {
  //       path: 'platform/manage/index',
  //       component: () => import('@/views/platform/manage/index'),
  //       name: 'Manage',
  //       meta: { title: '平台管理', icon: 'dashboard', noCache: true }
  //     }
  //   ],
  //   hidden:true,
  // },
];

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

router.addRoutes(asyncRouterMap);

export default router;

// export const asyncRouterMap = [
//   // {
//   //   path: '/permission',
//   //   component: Layout,
//   //   redirect: '/permission/index',
//   //   alwaysShow: true, // will always show the root menu
//   //   meta: {
//   //     title: 'permission',
//   //     icon: 'lock',
//   //     roles: ['admin', 'editor'] // you can set roles in root nav
//   //   },
//   //   children: [
//   //     {
//   //       path: 'page',
//   //       component: () => import('@/views/permission/page'),
//   //       name: 'PagePermission',
//   //       meta: {
//   //         title: 'pagePermission',
//   //         roles: ['admin'] // or you can only set roles in sub nav
//   //       }
//   //     },
//   //     {
//   //       path: 'directive',
//   //       component: () => import('@/views/permission/directive'),
//   //       name: 'DirectivePermission',
//   //       meta: {
//   //         title: 'directivePermission'
//   //         // if do not set roles, means: this page does not require permission
//   //       }
//   //     }
//   //   ]
//   // },

//   // {
//   //   path: '/icon',
//   //   component: Layout,
//   //   children: [
//   //     {
//   //       path: 'index',
//   //       component: () => import('@/views/svg-icons/index'),
//   //       name: 'Icons',
//   //       meta: { title: 'icons', icon: 'icon', noCache: true }
//   //     }
//   //   ]
//   // },

//   /** When your routing table is too long, you can split it into small modules**/
//   componentsRouter,
//   chartsRouter,
//   nestedRouter,
//   tableRouter,

//   {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/list',
//     name: 'Example',
//     meta: {
//       title: 'example',
//       icon: 'example'
//     },
//     children: [
//       {
//         path: 'create',
//         component: () => import('@/views/example/create'),
//         name: 'CreateArticle',
//         meta: { title: 'createArticle', icon: 'edit' }
//       },
//       {
//         path: 'edit/:id(\\d+)',
//         component: () => import('@/views/example/edit'),
//         name: 'EditArticle',
//         meta: { title: 'editArticle', noCache: true },
//         hidden: true
//       },
//       {
//         path: 'list',
//         component: () => import('@/views/example/list'),
//         name: 'ArticleList',
//         meta: { title: 'articleList', icon: 'list' }
//       }
//     ]
//   },

//   {
//     path: '/tab',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/tab/index'),
//         name: 'Tab',
//         meta: { title: 'tab', icon: 'tab' }
//       }
//     ]
//   },

//   // {
//   //   path: '/error',
//   //   component: Layout,
//   //   redirect: 'noredirect',
//   //   name: 'ErrorPages',
//   //   meta: {
//   //     title: 'errorPages',
//   //     icon: '404'
//   //   },
//   //   children: [
//   //     {
//   //       path: '401',
//   //       component: () => import('@/views/errorPage/401'),
//   //       name: 'Page401',
//   //       meta: { title: 'page401', noCache: true }
//   //     },
//   //     {
//   //       path: '404',
//   //       component: () => import('@/views/errorPage/404'),
//   //       name: 'Page404',
//   //       meta: { title: 'page404', noCache: true }
//   //     }
//   //   ]
//   // },

//   // {
//   //   path: '/error-log',
//   //   component: Layout,
//   //   redirect: 'noredirect',
//   //   children: [
//   //     {
//   //       path: 'log',
//   //       component: () => import('@/views/errorLog/index'),
//   //       name: 'ErrorLog',
//   //       meta: { title: 'errorLog', icon: 'bug' }
//   //     }
//   //   ]
//   // },

//   // {
//   //   path: '/excel',
//   //   component: Layout,
//   //   redirect: '/excel/export-excel',
//   //   name: 'Excel',
//   //   meta: {
//   //     title: 'excel',
//   //     icon: 'excel'
//   //   },
//   //   children: [
//   //     {
//   //       path: 'export-excel',
//   //       component: () => import('@/views/excel/exportExcel'),
//   //       name: 'ExportExcel',
//   //       meta: { title: 'exportExcel' }
//   //     },
//   //     {
//   //       path: 'export-selected-excel',
//   //       component: () => import('@/views/excel/selectExcel'),
//   //       name: 'SelectExcel',
//   //       meta: { title: 'selectExcel' }
//   //     },
//   //     {
//   //       path: 'upload-excel',
//   //       component: () => import('@/views/excel/uploadExcel'),
//   //       name: 'UploadExcel',
//   //       meta: { title: 'uploadExcel' }
//   //     }
//   //   ]
//   // },

//   // {
//   //   path: '/zip',
//   //   component: Layout,
//   //   redirect: '/zip/download',
//   //   alwaysShow: true,
//   //   meta: { title: 'zip', icon: 'zip' },
//   //   children: [
//   //     {
//   //       path: 'download',
//   //       component: () => import('@/views/zip/index'),
//   //       name: 'ExportZip',
//   //       meta: { title: 'exportZip' }
//   //     }
//   //   ]
//   // },

//   // {
//   //   path: '/pdf',
//   //   component: Layout,
//   //   redirect: '/pdf/index',
//   //   children: [
//   //     {
//   //       path: 'index',
//   //       component: () => import('@/views/pdf/index'),
//   //       name: 'PDF',
//   //       meta: { title: 'pdf', icon: 'pdf' }
//   //     }
//   //   ]
//   // },
//   // {
//   //   path: '/pdf/download',
//   //   component: () => import('@/views/pdf/download'),
//   //   hidden: true
//   // },

//   // {
//   //   path: '/theme',
//   //   component: Layout,
//   //   redirect: 'noredirect',
//   //   children: [
//   //     {
//   //       path: 'index',
//   //       component: () => import('@/views/theme/index'),
//   //       name: 'Theme',
//   //       meta: { title: 'theme', icon: 'theme' }
//   //     }
//   //   ]
//   // },

//   // {
//   //   path: '/clipboard',
//   //   component: Layout,
//   //   redirect: 'noredirect',
//   //   children: [
//   //     {
//   //       path: 'index',
//   //       component: () => import('@/views/clipboard/index'),
//   //       name: 'ClipboardDemo',
//   //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
//   //     }
//   //   ]
//   // },

//   {
//     path: '/i18n',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/i18n-demo/index'),
//         name: 'I18n',
//         meta: { title: 'i18n', icon: 'international' }
//       }
//     ]
//   },

//   // {
//   //   path: 'external-link',
//   //   component: Layout,
//   //   children: [
//   //     {
//   //       path: 'https://github.com/PanJiaChen/vue-element-admin',
//   //       meta: { title: 'externalLink', icon: 'link' }
//   //     }
//   //   ]
//   // },

//   { path: '*', redirect: '/404', hidden: true }
// ]
