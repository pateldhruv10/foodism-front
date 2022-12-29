const routes = [
  {
    path: "",
    name: "splash",
    component: () => import(
      /* webpackChunkName: "splash-screen" */
      /* webpackMode: "lazy" */
      /* webpackInclude: /\.vue$/ */
      "pages/Splash.vue"
    ),
  },
  {
    path: "/",
    component: () => import(
      /* webpackChunkName: "layout-without-footer" */
      /* webpackMode: "lazy" */
      /* webpackInclude: /\.vue$/ */
      "layouts/WithoutFooterLayout.vue"
    ),
    children: [
      {
        path: "/login",
        name: "index",
        component: () => import(
          /* webpackChunkName: "index-page" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/Index.vue"
        ),
      },
      {
        path: "location",
        component: () => import(
          /* webpackChunkName: "locations" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/Location.vue"
        )
      },
      { path: "locationsearch", component: () => import("pages/Locationsearch.vue"), },
      { path: "locationlist", component: () => import("pages/Locationlist.vue"), },
      { path: "locationedit", component: () => import("pages/Locationedit.vue"), },
      {
        path: "add-recipe",
        name: "written-recipe",
        component: () => import(
          /* webpackChunkName: "create-recipe" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/recipes/create.vue"
        )
      },
      {
        path: "add-vlog",
        name: "add-vlog",
        component: () => import(
          /* webpackChunkName: "create-vlog" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/vlogs/create.vue"
        )
      },
      {
        path: "vlog-preview",
        name: "vlog-preview",
        component: () => import(
          /* webpackChunkName: "preview-vlog" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/vlogs/preview.vue"
        )
      },
      { path: "feedback", name: "feedback", component: () => import("src/pages/feedback.vue") },

      {
        path: "host-events",
        name: "host-events",
        component: () => import(
          /* webpackChunkName: "business-seller-form" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/events/create.vue"
        )
      },
      {
        path: "event/edit/:slug",
        name: "edit-event",
        component: () => import(
          /* webpackChunkName: "business-seller-form" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/events/create.vue"
        )
      },
      {
        path: "seller-form",
        name: 'seller-form',
        component: () => import(
          /* webpackChunkName: "business-seller-form" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/business/seller-form.vue"
        )
      },
      {
        path: "thank-apply",
        name: 'thank-apply',
        component: () => import(
          /* webpackChunkName: "thank-you-apply" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/thank-apply.vue"
        )
      },
      {
        path: "add-product",
        name: "add-product",
        component: () => import(
          /* webpackChunkName: "add-product" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/add-product.vue"
        )
      },
      {
        path: "become-seller",
        name: 'become-seller',
        component: () => import(
          /* webpackChunkName: "become-seller" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/business/become-seller.vue"
        ),
      },
      {
        path: 'user/add-video-recipes',
        name: 'video-recipe',
        component: () => import(
          /* webpackChunkName: "add-recipes" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'pages/user/add-video-recipe.vue'
        )
      },

      {
        // User authendicated routes
        path: "/user",
        component: () => import(
          /* webpackChunkName: "layout-without-footer" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "layouts/WithoutFooterLayout.vue"
        ),
        meta: {
          requiresAuth: true,
          requiresUser: true,
        },
        children: [
          {
            path: 'profile',
            name: 'user-detail',
            component: () => import(
              /* webpackChunkName: "user-detail" */
              /* webpackMode: "lazy" */
              /* webpackInclude: /\.vue$/ */
              'pages/user/User-profile-detail.vue'
            )
          },
          {
            path: 'profile/edit',
            name: 'user-edit',
            component: () => import(
              /* webpackChunkName: "user-profile-edit" */
              /* webpackMode: "lazy" */
              /* webpackInclude: /\.vue$/ */
              'pages/user/User-profile-edit.vue'
            )
          },
        ]
      },
    ],
  },
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

  {
    path: "/",
    component: () => import(
      /* webpackChunkName: "default-layout" */
      /* webpackMode: "lazy" */
      /* webpackInclude: /\.vue$/ */
      "layouts/DefaultLayout.vue"
    ),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import(
          /* webpackChunkName: "home" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/Home.vue"
        ),
      },
      { path: "search", name: "search", component: () => import("src/pages/Search.vue"), props: true },
      {
        path: "draft",
        name: "draft",
        component: () => import(
          /* webpackChunkName: "user-draft" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/user/draft.vue"
        )
      },
      { path: "videos", component: () => import("pages/Video.vue") },
      { path: "allcuisines", component: () => import("pages/Allcuisines.vue") },
      { path: "alloccasions", component: () => import("pages/Alloccasions.vue"), },
      { path: "searchcuisines", component: () => import("pages/Searchcuisines.vue"), },
      { path: "searchsellerlist", component: () => import("pages/Searchsellerlist.vue"), },
      { path: "allseller", component: () => import("pages/Allseller.vue") },
      { path: "seller-profile-buyer-view", component: () => import("pages/seller-profile-buyer-view.vue"), },
      { path: "occasion-recipe-list", component: () => import("pages/Occasion-recipe-list.vue"), },
      { path: "buyer-view-recipe-detail", component: () => import("pages/Buyer-view-recipe-detail.vue"), },
      { path: "thank-you", component: () => import("pages/Thank-you.vue") },
      {
        path: "recipe-details/:slug",
        name: 'recipe-details',
        component: () => import(
          /* webpackChunkName: "recipe-detail" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/recipes/show.vue"
        ),
        // meta: {
        //   requiresAuth: true,
        //   requiresUser: true,
        // },
      },
      { path: "contest-details", name: 'contest-details', component: () => import("src/pages/user/contest-details.vue"), },
      // { path: "video-recipe-details", name: 'video-recipe-details', component: () => import("pages/Video-Recipe-details.vue"), },
      { path: "vlog-detail", name: "vlog-detail", component: () => import("src/pages/vlogs/detail.vue") },
      { path: "policies", name: "policies", component: () => import("src/pages/policies.vue") },
      {
        path: "settings",
        name: "settings",
        component: () => import(
          /* webpackChunkName: "settings" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/user/settings.vue"
        )
      },
      { path: "privacy", name: "privacy", component: () => import("src/pages/privacy.vue") },
      {
        path: "block-account",
        name: "blockAccountcount",
        component: () => import(
          /* webpackChunkName: "blocked-account" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/user/block-account.vue"
        )
      },
      {
        path: "subscribers/:slug",
        name: "subscribers-list",
        component: () => import(
          /* webpackChunkName: "subscriber-list" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/user/subscribers.vue"
        )
      },
      {
        path: "following/:slug",
        name: "following-list",
        component: () => import(
          /* webpackChunkName: "following-list" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/user/following.vue"
        )
      },
      {
        path: "delete-account",
        name: "deleteaccount",
        component: () => import(
          /* webpackChunkName: "delete-account" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/user/delete-account.vue"
        )
      },
      { path: "change-details", name: "changeDetails", component: () => import("src/pages/user/change-details.vue") },
      { path: "change-number", name: "changenumber", component: () => import("src/pages/user/change-number.vue") },
      { path: "change-email", name: "changeEmail", component: () => import("src/pages/user/change-email.vue") },
      { path: "support", name: "support", component: () => import("src/pages/support.vue") },
      { path: "my-favorites", name: "myFavourite", component: () => import("src/pages/user/my-favourite.vue") },
      {
        path: "refer-earn",
        name: "referearn",
        component: () => import(
          /* webpackChunkName: "refer-and-earn" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/user/refer-earn.vue"
        )
      },
      { path: "rewards", name: "rewards", component: () => import("src/pages/user/rewards.vue") },
      { path: "notification", name: "notification", component: () => import("src/pages/user/notification.vue") },
      { path: "encash-details", name: "encash", component: () => import("src/pages/user/encash-details.vue") },
      { path: "referrals", name: "referrals", component: () => import("src/pages/user/referrals.vue") },
      { path: "milestone", name: "milestone", component: () => import("src/pages/user/milestone.vue") },
      { path: "upcoming-milestone", name: "upcomingmilestone", component: () => import("src/pages/user/upcoming-milestone.vue") },
      { path: "history", name: "history", component: () => import("src/pages/user/history.vue") },
      { path: "eligibility", name: "eligibility", component: () => import("src/pages/user/eligibility.vue") },
      { path: "flp", name: "flp", component: () => import("src/pages/user/flp.vue") },
      { path: "transaction-history", name: "transaction-history", component: () => import("src/pages/user/transaction-history.vue") },
      { path: "bank-list", name: "bank-list", component: () => import("src/pages/user/bank-list.vue") },
      { path: "add-bank", name: "add-bank", component: () => import("src/pages/user/add-bank.vue") },
      { path: "bank-details/:id", name: "bank-details", component: () => import("src/pages/user/bank-details.vue") },
      { path: "bank-edit/:id", name: "bank-edit", component: () => import("src/pages/user/add-bank.vue") },
      { path: "redeem-points", name: "redeem-points", component: () => import("src/pages/user/redeem-points.vue") },
      { path: "refer", name: "refer", component: () => import("src/pages/user/refer.vue") },
      { path: "total-rewards", name: "total-rewards", component: () => import("src/pages/user/total-rewards.vue") },
      { path: "redeem-request", name: "redeem-request", component: () => import("src/pages/user/redeem-request.vue") },
      { path: "redeem-request-accepted", name: "redeem-request-accepted", component: () => import("src/pages/user/redeem-request-accepted.vue") },
      { path: "redeem-payment-history", name: "redeem-payment-history", component: () => import("src/pages/user/redeem-payment-history.vue") },

      {
        path: "event-details/:slug",
        name: "event-details",
        component: () => import(
          /* webpackChunkName: "event-show" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "src/pages/events/show.vue"
        ),
        // meta: {
        //   requiresAuth: true,
        //   requiresUser: true,
        // },
      },
      {
        // It will be dynamic route using username from user object and accessible by user only
        path: 'user/profile-view/:slug',
        name: 'profile-view',
        component: () => import(
          /* webpackChunkName: "user-profile-view" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'pages/user/profile-view.vue'
        )
      },
      { path: "coming-soon", name: "coming-soon", component: () => import("src/pages/coming-soon.vue") },
      { path: "feedback-form", name: "feedback-form", component: () => import("src/pages/feedback-form.vue") },
    ],
  },
  // All routes will be come under business module
  {
    path: "/business",
    component: () => import("layouts/BusinessLayout.vue"),
    meta: {
      requiresBusiness: true,
    },
    children: [
      { path: "profile", name: "my-business-profile", component: () => import("pages/business/Business-profile-own-view.vue"), },
    ],
  },
  // All routes will be come under business module
  {
    path: "/business",
    component: () => import("layouts/WithoutFooterLayout.vue"),
    meta: {
      requiresBusiness: true,
    },
    children: [
      { path: "profile/edit", name: "business-profile-edit", component: () => import("pages/business/Business-profile-edit.vue"), },

    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/",
    component: () => import(
      /* webpackChunkName: "default-layout" */
      /* webpackMode: "lazy" */
      /* webpackInclude: /\.vue$/ */
      "layouts/LandingpageLayout.vue"
    ),
    children: [
      {
        path: "landing-page",
        name: 'landing-page',
        component: () => import(
          /* webpackChunkName: "user-home" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          "pages/landing.vue"
        ),
      },
    ],
  },
  // All routes will be come under business module
  {
    path: "/web",
    component: () => import("layouts/WebLayout.vue"),
    meta: {
      requiresBusiness: true,
    },
    children: [
      { path: "home", name: "web-home", component: () => import("pages/webpage/web-home.vue"), },
      { path: "blog", name: "web-blog", component: () => import("pages/webpage/web-blog.vue"), },
      { path: "blog-detail/:slug", name: "web-blog-detail", component: () => import("pages/webpage/web-blog-detail.vue"), },
      { path: "event", name: "web-event", component: () => import("pages/webpage/web-event.vue"), },
      { path: "event-detail/:slug", name: "web-event-detail", component: () => import("pages/webpage/web-event-detail.vue"), },
      { path: "about-us", name: "web-aboutus", component: () => import("pages/webpage/web-aboutus.vue"), },
      { path: "support", name: "web-support", component: () => import("pages/webpage/web-support.vue"), },
      { path: "help-center", name: "web-helpcenter", component: () => import("pages/webpage/web-helpcenter.vue"), },
      { path: "help-faq", name: "web-faq", component: () => import("pages/webpage/web-faq.vue"), },
      { path: "help-faq-video", name: "web-faq-video", component: () => import("pages/webpage/web-faq-video.vue"), },

    ],
  },
  {
    path: "/policies",
    component: () => import("layouts/WebLayout.vue"),
    meta: {
      requiresBusiness: true,
    },
    children: [
      { path: "privacy", name: "pricacy", component: () => import("pages/webpage/privacy.vue"), },
      { path: "community-guideline", name: "community-guideline", component: () => import("pages/webpage/community-guideline.vue"), },
      { path: "terms-and-condition", name: "terms-and-condition", component: () => import("pages/webpage/terms-condition.vue"), },
      { path: "event-policy", name: "event-policy", component: () => import("pages/webpage/event-policy.vue"), },
      { path: "cookies-policy", name: "cookies-policy", component: () => import("pages/webpage/cookies-policy.vue"), },

    ],
  },

];

export default routes;
