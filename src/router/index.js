import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// only the home view is loaded at first. all other routes are lazy-loaded when called.
// this is done simply to cut down on network usage and speed up loading a bit on initial landing.
// but i'm not sure whether this is the right thing to do.

// NOTE: when using lazy loading feature, be sure to add the webpackChunkName directives (yes, it's not random comments)
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/speakers",
    name: "speakers",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "pastevents" */ "../views/Speakers.vue"),
    meta: {
      title: "Speakers",
    },
  },

  {
    path: "/pastevents",
    name: "pastevents",
    component: () =>
      import(
        /* webpackChunkName: "pastevents" */ "../views/PastEventsView.vue"
      ),
    meta: {
      title: "Past Events",
    },
  },

  {
    path: "/partners",
    name: "partners",
    component: () =>
      import(/* webpackChunkName: "partners" */ "../views/Partners.vue"),
    meta: {
      title: "Partners",
    },
  },

  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      title: "About",
    },
  },

  // past events
  {
    path: "/pastevents/2021",
    name: "pastevent_2021",
    component: () =>
      import(
        /* webpackChunkName: "pastevent_2021" */ "../views/PastEvents/PastEvent.2021.vue"
      ),
    meta: {
      title: "Roar, 2021",
    },
  },
  {
    path: "/pastevents/2022",
    name: "pastevent_2022",
    component: () =>
      import(
        /* webpackChunkName: "pastevent_2021" */ "../views/PastEvents/PastEvent.2022.vue"
      ),
    meta: {
      title: "Infinite_affinities, 2022",
    },
  },
  {
    path: "/pastevents/2023",
    name: "pastevent_2023",
    component: () =>
      import(
        /* webpackChunkName: "pastevent_2021" */ "../views/PastEvents/PastEvent.2023.vue"
      ),
    meta: {
      title: "Prism_of_perception, 2023",
    },
  },
  {
    path: "/pastevents/2019",
    name: "pastevent_2019",
    component: () =>
      import(
        /* webpackChunkName: "pastevent_2019" */ "../views/PastEvents/PastEvent.2019.vue"
      ),
    meta: {
      title: "Metamorphosis, 2019",
    },
  },

  {
    path: "/pastevents/2016",
    name: "pastevent_2016",
    component: () =>
      import(
        /* webpackChunkName: "pastevent_2016" */ "../views/PastEvents/PastEvent.2016.vue"
      ),
    meta: {
      title: "Shedding Off Feathers, 2016",
    },
  },
  {
    path: "/qrcode",
    name: "qrcode",
    component: () =>
      import(/* webpackChunkName: "qrcode" */ "../views/Qrcode.vue"),
    meta: {
      title: "Redirect",
    },
  },
  {
    path: "/iitp-55a095e504b85523a2fd54a5e75d3bca/ticketbooking",
    name: "ticketbooking",
    component: () =>
      import(
        /* webpackChunkName: "ticketbooking" */ "../views/TicketBooking.vue"
      ),
    meta: {
      title: "Ticket Booking",
    },
  },
  {
    path: "/comingsoon",
    name: "comingsoon",
    component: () =>
      import(
        /* webpackChunkName: "commingsoon" */ "../views/ComingSoonView.vue"
      ),
    meta: {
      title: "Coming Soon",
    },
  },
  // {  // UPDATED WITH   /buyMerchTickets  ROUTE
  //   path: "/merch",
  //   name: "merch",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "tshirtbanner" */ "../views/TshirtBanner.vue"
  //     ),
  //   meta: {
  //     title: "Merchandise",
  //   },
  // },
  {
    path: "/our-journey",
    name: "our-journey",
    component: () => import("../views/Journey.vue"),
    meta: {
      title: "Our-Journey",
    },
  },
  {
    path: "/funfair",
    name: "funfair",
    component: () => import("../views/Funfairpage.vue"),
    meta: {
      title: "Fun Fair",
    },
  },
  {
    path: "/contact-us",
    name: "contact us",
    component: () => import("../views/ContactUsPage.vue"),
    meta: {
      title: "Contact Us",
    },
  },
  {
    path: "/buyMerchTickets",
    name: "BuyNow",
    component: () => import("../views/BuyNow.vue"),
    meta: {
      title: "Buy Now",
    },
  },
  {
    path:'/contact-us',
    name:'contact us',
    component:()=>import('../views/ContactUsPage.vue'),
    meta:{
      title:'Contact Us'
    }
  },
  
  // New routes for journey events - these will trigger page reload
  {
    path: '/vera',
    name: 'vera',
    component: () => import(/* webpackChunkName: "vera" */ '../views/vera.vue'),
    meta: {
      title: 'Veiled Veracity',
      requiresReload: true,
      backRoute: '/our-journey'
    }
  },
  {
    path: '/prism',
    name: 'prism',
    component: () => import(/* webpackChunkName: "prism" */ '../views/prism.vue'),
    meta: {
      title: 'Prisms of Perception',
      requiresReload: true,
      backRoute: '/our-journey'
    }
  },
  {
    path: '/infinite',
    name: 'infinite',
    component: () => import(/* webpackChunkName: "infinite" */ '../views/infinite.vue'),
    meta: {
      title: 'Infinite Affinities',
      requiresReload: true,
      backRoute: '/our-journey'
    }
  },
  {
    path: '/roar',
    name: 'roar',
    component: () => import(/* webpackChunkName: "roar" */ '../views/roar.vue'),
    meta: {
      title: 'Roar',
      requiresReload: true,
      backRoute: '/our-journey'
    }
  },
  {
    path: '/meta',
    name: 'meta',
    component: () => import(/* webpackChunkName: "meta" */ '../views/meta.vue'),
    meta: {
      title: 'Metamorphosis',
      requiresReload: true,
      backRoute: '/our-journey'
    }
  },
  {
    path: '/shed',
    name: 'shed',
    component: () => import(/* webpackChunkName: "shed" */ '../views/shed.vue'),
    meta: {
      title: 'Shedding Off Feathers',
      requiresReload: true,
      backRoute: '/our-journey'
    }
  }
  
  // *** Error404 path. This needs to be created.
  // {
  //   path: '*',
  //   name: 'error404',
  //   component:
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Add navigation guard to handle page reload for specific routes
router.beforeEach((to, from, next) => {
  // Check if the target route requires a reload and we're coming from a different route that also requires reload
  if (to.meta.requiresReload && from.meta.requiresReload && to.path !== from.path) {
    // Force a page reload by navigating to the URL directly
    window.location.href = to.path
    return
  }
  
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

export default router
