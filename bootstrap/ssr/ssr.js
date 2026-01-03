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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-D5d04gOG.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-CCB5K2WN.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-BlqaoI2c.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-rsKGTCpB.js"), "./Pages/Auth/TwoFactorChallenge.vue": () => import("./assets/TwoFactorChallenge-Ar68Ozmy.js"), "./Pages/Calculators/Affordability.vue": () => import("./assets/Affordability-B5J5jVog.js"), "./Pages/Calculators/CostOfLiving.vue": () => import("./assets/CostOfLiving-kuZE6pLJ.js"), "./Pages/Calculators/Disability.vue": () => import("./assets/Disability-ZDGeE3SR.js"), "./Pages/Dashboard/Calculations.vue": () => import("./assets/Calculations-sCoYp-Lt.js"), "./Pages/Dashboard/Index.vue": () => import("./assets/Index-vMjkll_p.js"), "./Pages/Dashboard/Settings.vue": () => import("./assets/Settings-BR_KU2_9.js"), "./Pages/Home.vue": () => import("./assets/Home-rj_zdEIm.js"), "./Pages/Support/Index.vue": () => import("./assets/Index-DmOP_hq0.js"), "./Pages/Support/ThankYou.vue": () => import("./assets/ThankYou-LY5MSz73.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin);
    }
  })
);
