const users = [
  {
    path: "/",
    component: () => import(
      /* webpackChunkName: "user-layout" */
      /* webpackMode: "lazy" */
      /* webpackInclude: /\.vue$/ */
      "layouts/UserLayout.vue"
    ),
    children: [
      {
        path: "user-home",
        name: 'user-home',
        component: () => import(
          /* webpackChunkName: "user-home" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/User-Home.vue"
        ),
      },
    ],
  },

];
export default users;
