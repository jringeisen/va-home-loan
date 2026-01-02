import { withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTISP9sP.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "ThankYou",
  __ssrInlineRender: true,
  props: {
    amount: Number
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Thank You!" }, null, _parent2, _scopeId));
            _push2(`<div class="flex min-h-[60vh] items-center justify-center py-12"${_scopeId}><div class="text-center"${_scopeId}><div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-800"${_scopeId}><svg class="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"${_scopeId}></path></svg></div><h1 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white"${_scopeId}>Thank You for Your Support!</h1><p class="mt-4 text-lg text-gray-600 dark:text-gray-300"${_scopeId}> Your $${ssrInterpolate(__props.amount)} contribution means a lot to us. </p><p class="mt-2 text-gray-600 dark:text-gray-300"${_scopeId}> You now have lifetime access to save unlimited calculations. </p><div class="mt-8 flex justify-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard",
              class: "rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Go to Dashboard `);
                } else {
                  return [
                    createTextVNode(" Go to Dashboard ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/calculators/affordability",
              class: "rounded-md bg-gray-100 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Start Calculating `);
                } else {
                  return [
                    createTextVNode(" Start Calculating ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Thank You!" }),
              createVNode("div", { class: "flex min-h-[60vh] items-center justify-center py-12" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("div", { class: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-800" }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-10 w-10 text-green-600 dark:text-green-400",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M4.5 12.75l6 6 9-13.5"
                      })
                    ]))
                  ]),
                  createVNode("h1", { class: "mt-6 text-3xl font-bold text-gray-900 dark:text-white" }, "Thank You for Your Support!"),
                  createVNode("p", { class: "mt-4 text-lg text-gray-600 dark:text-gray-300" }, " Your $" + toDisplayString(__props.amount) + " contribution means a lot to us. ", 1),
                  createVNode("p", { class: "mt-2 text-gray-600 dark:text-gray-300" }, " You now have lifetime access to save unlimited calculations. "),
                  createVNode("div", { class: "mt-8 flex justify-center gap-4" }, [
                    createVNode(unref(Link), {
                      href: "/dashboard",
                      class: "rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Go to Dashboard ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/calculators/affordability",
                      class: "rounded-md bg-gray-100 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Start Calculating ")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Support/ThankYou.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
