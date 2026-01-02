import { ref, computed, withCtx, unref, createVNode, createBlock, openBlock, createCommentVNode, Fragment, renderList, toDisplayString, withDirectives, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTISP9sP.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    hasPaid: Boolean,
    suggestedAmounts: Array,
    minAmount: Number
  },
  setup(__props) {
    const props = __props;
    usePage();
    const selectedAmount = ref(10);
    const customAmount = ref("");
    const isCustom = ref(false);
    const loading = ref(false);
    const actualAmount = computed(() => {
      if (isCustom.value) {
        const parsed = parseFloat(customAmount.value);
        return isNaN(parsed) ? 0 : parsed;
      }
      return selectedAmount.value;
    });
    const isValidAmount = computed(() => actualAmount.value >= props.minAmount);
    const selectAmount = (amount) => {
      selectedAmount.value = amount;
      isCustom.value = false;
      customAmount.value = "";
    };
    const enableCustom = () => {
      isCustom.value = true;
    };
    const submitPayment = () => {
      if (!isValidAmount.value) return;
      loading.value = true;
      router.post("/support/checkout", {
        amount: actualAmount.value
      }, {
        onError: () => {
          loading.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Support Us" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"${_scopeId}>`);
            if (__props.hasPaid) {
              _push2(`<div class="rounded-2xl bg-green-50 p-8 text-center dark:bg-green-900/30"${_scopeId}><div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800"${_scopeId}><svg class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div><h1 class="text-2xl font-bold text-green-900 dark:text-white"${_scopeId}>Thank You for Your Support!</h1><p class="mt-2 text-green-700 dark:text-green-300"${_scopeId}> You have lifetime access to save unlimited calculations. </p><a href="/calculators/affordability" class="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"${_scopeId}> Go to Calculators </a></div>`);
            } else {
              _push2(`<div${_scopeId}><div class="text-center"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white"${_scopeId}>Support VA Home Loan Calculator</h1><p class="mt-4 text-lg text-gray-600 dark:text-gray-300"${_scopeId}> Your contribution helps keep this site running and allows us to add new features for fellow veterans. </p></div><div class="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"${_scopeId}><h2 class="text-center text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Choose Your Amount</h2><p class="mt-1 text-center text-sm text-gray-600 dark:text-gray-300"${_scopeId}>One-time payment, lifetime access</p><div class="mt-6 grid grid-cols-4 gap-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.suggestedAmounts, (amount) => {
                _push2(`<button class="${ssrRenderClass([
                  "rounded-lg border-2 py-4 text-lg font-semibold transition-colors",
                  selectedAmount.value === amount && !isCustom.value ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
                ])}"${_scopeId}> $${ssrInterpolate(amount)}</button>`);
              });
              _push2(`<!--]--><button class="${ssrRenderClass([
                "rounded-lg border-2 py-4 text-lg font-semibold transition-colors",
                isCustom.value ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
              ])}"${_scopeId}> Other </button></div>`);
              if (isCustom.value) {
                _push2(`<div class="mt-4"${_scopeId}><div class="relative"${_scopeId}><span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600 dark:text-gray-300"${_scopeId}>$</span><input${ssrRenderAttr("value", customAmount.value)} type="number"${ssrRenderAttr("min", __props.minAmount)} step="1" placeholder="Enter amount" class="block w-full rounded-lg border-gray-300 pl-8 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"${_scopeId}></div>`);
                if (customAmount.value && !isValidAmount.value) {
                  _push2(`<p class="mt-2 text-sm text-red-600 dark:text-red-400"${_scopeId}> Minimum amount is $${ssrInterpolate(__props.minAmount)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"${_scopeId}><h3 class="font-medium text-gray-900 dark:text-white"${_scopeId}>What you get:</h3><ul class="mt-2 space-y-2"${_scopeId}><li class="flex items-center text-sm text-gray-600 dark:text-gray-300"${_scopeId}><svg class="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg> Save unlimited calculations forever </li><li class="flex items-center text-sm text-gray-600 dark:text-gray-300"${_scopeId}><svg class="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg> Access your saved calculations from any device </li><li class="flex items-center text-sm text-gray-600 dark:text-gray-300"${_scopeId}><svg class="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg> Support a veteran-owned project </li></ul></div><button${ssrIncludeBooleanAttr(!isValidAmount.value || loading.value) ? " disabled" : ""} class="${ssrRenderClass([
                "mt-6 w-full rounded-lg py-4 text-lg font-semibold transition-colors",
                isValidAmount.value && !loading.value ? "bg-blue-600 text-white hover:bg-blue-500" : "cursor-not-allowed bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
              ])}"${_scopeId}>`);
              if (loading.value) {
                _push2(`<span${_scopeId}>Processing...</span>`);
              } else {
                _push2(`<span${_scopeId}>Support with $${ssrInterpolate(actualAmount.value)}</span>`);
              }
              _push2(`</button><p class="mt-4 text-center text-xs text-gray-600 dark:text-gray-300"${_scopeId}> Secure payment powered by Stripe. No recurring charges. </p></div></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Support Us" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" }, [
                  __props.hasPaid ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-2xl bg-green-50 p-8 text-center dark:bg-green-900/30"
                  }, [
                    createVNode("div", { class: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-8 w-8 text-green-600 dark:text-green-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M5 13l4 4L19 7"
                        })
                      ]))
                    ]),
                    createVNode("h1", { class: "text-2xl font-bold text-green-900 dark:text-white" }, "Thank You for Your Support!"),
                    createVNode("p", { class: "mt-2 text-green-700 dark:text-green-300" }, " You have lifetime access to save unlimited calculations. "),
                    createVNode("a", {
                      href: "/calculators/affordability",
                      class: "mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
                    }, " Go to Calculators ")
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white" }, "Support VA Home Loan Calculator"),
                      createVNode("p", { class: "mt-4 text-lg text-gray-600 dark:text-gray-300" }, " Your contribution helps keep this site running and allows us to add new features for fellow veterans. ")
                    ]),
                    createVNode("div", { class: "mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800" }, [
                      createVNode("h2", { class: "text-center text-lg font-semibold text-gray-900 dark:text-white" }, "Choose Your Amount"),
                      createVNode("p", { class: "mt-1 text-center text-sm text-gray-600 dark:text-gray-300" }, "One-time payment, lifetime access"),
                      createVNode("div", { class: "mt-6 grid grid-cols-4 gap-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.suggestedAmounts, (amount) => {
                          return openBlock(), createBlock("button", {
                            key: amount,
                            onClick: ($event) => selectAmount(amount),
                            class: [
                              "rounded-lg border-2 py-4 text-lg font-semibold transition-colors",
                              selectedAmount.value === amount && !isCustom.value ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
                            ]
                          }, " $" + toDisplayString(amount), 11, ["onClick"]);
                        }), 128)),
                        createVNode("button", {
                          onClick: enableCustom,
                          class: [
                            "rounded-lg border-2 py-4 text-lg font-semibold transition-colors",
                            isCustom.value ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
                          ]
                        }, " Other ", 2)
                      ]),
                      isCustom.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-4"
                      }, [
                        createVNode("div", { class: "relative" }, [
                          createVNode("span", { class: "absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600 dark:text-gray-300" }, "$"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => customAmount.value = $event,
                            type: "number",
                            min: __props.minAmount,
                            step: "1",
                            placeholder: "Enter amount",
                            class: "block w-full rounded-lg border-gray-300 pl-8 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                          }, null, 8, ["onUpdate:modelValue", "min"]), [
                            [vModelText, customAmount.value]
                          ])
                        ]),
                        customAmount.value && !isValidAmount.value ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600 dark:text-red-400"
                        }, " Minimum amount is $" + toDisplayString(__props.minAmount), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50" }, [
                        createVNode("h3", { class: "font-medium text-gray-900 dark:text-white" }, "What you get:"),
                        createVNode("ul", { class: "mt-2 space-y-2" }, [
                          createVNode("li", { class: "flex items-center text-sm text-gray-600 dark:text-gray-300" }, [
                            (openBlock(), createBlock("svg", {
                              class: "mr-2 h-5 w-5 text-green-500",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                "clip-rule": "evenodd"
                              })
                            ])),
                            createTextVNode(" Save unlimited calculations forever ")
                          ]),
                          createVNode("li", { class: "flex items-center text-sm text-gray-600 dark:text-gray-300" }, [
                            (openBlock(), createBlock("svg", {
                              class: "mr-2 h-5 w-5 text-green-500",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                "clip-rule": "evenodd"
                              })
                            ])),
                            createTextVNode(" Access your saved calculations from any device ")
                          ]),
                          createVNode("li", { class: "flex items-center text-sm text-gray-600 dark:text-gray-300" }, [
                            (openBlock(), createBlock("svg", {
                              class: "mr-2 h-5 w-5 text-green-500",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                "clip-rule": "evenodd"
                              })
                            ])),
                            createTextVNode(" Support a veteran-owned project ")
                          ])
                        ])
                      ]),
                      createVNode("button", {
                        onClick: submitPayment,
                        disabled: !isValidAmount.value || loading.value,
                        class: [
                          "mt-6 w-full rounded-lg py-4 text-lg font-semibold transition-colors",
                          isValidAmount.value && !loading.value ? "bg-blue-600 text-white hover:bg-blue-500" : "cursor-not-allowed bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                        ]
                      }, [
                        loading.value ? (openBlock(), createBlock("span", { key: 0 }, "Processing...")) : (openBlock(), createBlock("span", { key: 1 }, "Support with $" + toDisplayString(actualAmount.value), 1))
                      ], 10, ["disabled"]),
                      createVNode("p", { class: "mt-4 text-center text-xs text-gray-600 dark:text-gray-300" }, " Secure payment powered by Stripe. No recurring charges. ")
                    ])
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Support/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
