import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => title ? `${title} - VA Home Loan` : "VA Home Loan",
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-BqGkU5dP.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-CBe99648.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-v9sRUBDs.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-CJWjrmed.js"), "./Pages/Auth/TwoFactorChallenge.vue": () => import("./assets/TwoFactorChallenge-HoajBYn0.js"), "./Pages/Calculators/Affordability.vue": () => import("./assets/Affordability-XYNLYdiE.js"), "./Pages/Calculators/CostOfLiving.vue": () => import("./assets/CostOfLiving-B85q03CN.js"), "./Pages/Calculators/Disability.vue": () => import("./assets/Disability-PoIWHw1t.js"), "./Pages/Dashboard/Calculations.vue": () => import("./assets/Calculations-BFITRQiL.js"), "./Pages/Dashboard/Index.vue": () => import("./assets/Index-C4xzsPhj.js"), "./Pages/Dashboard/Settings.vue": () => import("./assets/Settings-Baua7gdg.js"), "./Pages/Home.vue": () => import("./assets/Home-9rni30D2.js"), "./Pages/Support/Index.vue": () => import("./assets/Index-TRyVfEyk.js"), "./Pages/Support/ThankYou.vue": () => import("./assets/ThankYou-A4pZNON5.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin);
    }
  })
);
