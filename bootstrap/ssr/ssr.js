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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-B-jwSHbR.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-EOrVJorR.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-wXfn2NaJ.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BCDdK094.js"), "./Pages/Auth/TwoFactorChallenge.vue": () => import("./assets/TwoFactorChallenge-CEsEAfgr.js"), "./Pages/Calculators/Affordability.vue": () => import("./assets/Affordability-BBBspQkY.js"), "./Pages/Calculators/CostOfLiving.vue": () => import("./assets/CostOfLiving-D974rezx.js"), "./Pages/Calculators/Disability.vue": () => import("./assets/Disability-DOn9TaR4.js"), "./Pages/Dashboard/Calculations.vue": () => import("./assets/Calculations-NESOeH_6.js"), "./Pages/Dashboard/Index.vue": () => import("./assets/Index-CUPFRelc.js"), "./Pages/Dashboard/Settings.vue": () => import("./assets/Settings-B2ylrUhx.js"), "./Pages/Home.vue": () => import("./assets/Home-BoqVHSrU.js"), "./Pages/Support/Index.vue": () => import("./assets/Index-C3LcNkou.js"), "./Pages/Support/ThankYou.vue": () => import("./assets/ThankYou-B_rhAcj8.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin);
    }
  })
);
