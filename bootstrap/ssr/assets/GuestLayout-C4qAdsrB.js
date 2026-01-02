import { computed, ref, onMounted, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    const page = usePage();
    const currentUrl = computed(() => page.url);
    const isActive = (path) => {
      return currentUrl.value.startsWith(path);
    };
    const isDark = ref(false);
    const initDarkMode = () => {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) {
        isDark.value = stored === "true";
      } else {
        isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      updateDarkClass();
    };
    const updateDarkClass = () => {
      if (isDark.value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    onMounted(() => {
      initDarkMode();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}><a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-blue-600 focus:underline focus:shadow-lg dark:focus:bg-gray-800 dark:focus:text-blue-400"> Skip to main content </a><nav class="bg-white shadow-sm dark:bg-gray-800"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex"><div class="flex shrink-0 items-center">`);
      _push(ssrRenderComponent(unref(Link), { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden sm:ml-8 sm:flex sm:space-x-8">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/calculators/affordability",
        class: [
          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
          isActive("/calculators/affordability") ? "border-blue-500 text-gray-900 dark:border-blue-400 dark:text-white" : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100"
        ]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Affordability `);
          } else {
            return [
              createTextVNode(" Affordability ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/calculators/cost-of-living",
        class: [
          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
          isActive("/calculators/cost-of-living") ? "border-green-500 text-gray-900 dark:border-green-400 dark:text-white" : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100"
        ]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cost of Living `);
          } else {
            return [
              createTextVNode(" Cost of Living ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/calculators/disability",
        class: [
          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
          isActive("/calculators/disability") ? "border-purple-500 text-gray-900 dark:border-purple-400 dark:text-white" : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100"
        ]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Disability `);
          } else {
            return [
              createTextVNode(" Disability ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4"><button class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"${ssrRenderAttr("title", isDark.value ? "Switch to light mode" : "Switch to dark mode")}${ssrRenderAttr("aria-label", isDark.value ? "Switch to light mode" : "Switch to dark mode")}>`);
      if (isDark.value) {
        _push(`<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path></svg>`);
      } else {
        _push(`<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/login",
        class: "text-sm font-medium text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign in `);
          } else {
            return [
              createTextVNode(" Sign in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/register",
        class: "inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Get Started `);
          } else {
            return [
              createTextVNode(" Get Started ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav><main id="main-content">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="border-t bg-white dark:border-gray-700 dark:bg-gray-800"><div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><p class="text-center text-sm text-gray-600 dark:text-gray-300"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} VA Home Loan Calculator. All rights reserved. </p></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Layout/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
