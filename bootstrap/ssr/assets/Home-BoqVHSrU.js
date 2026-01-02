import { withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./GuestLayout-C4qAdsrB.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Free VA Loan Calculators for Veterans" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<meta name="description" content="Free VA home loan calculators for veterans. Calculate affordability, compare cost of living between states, and estimate VA disability compensation with 2025 rates."${_scopeId2}><meta property="og:title" content="VA Home Loan Calculator - Free Tools for Veterans"${_scopeId2}><meta property="og:description" content="Free VA home loan calculators for veterans. Calculate affordability, compare cost of living, and estimate disability compensation."${_scopeId2}>`);
                } else {
                  return [
                    createVNode("meta", {
                      name: "description",
                      content: "Free VA home loan calculators for veterans. Calculate affordability, compare cost of living between states, and estimate VA disability compensation with 2025 rates."
                    }),
                    createVNode("meta", {
                      property: "og:title",
                      content: "VA Home Loan Calculator - Free Tools for Veterans"
                    }),
                    createVNode("meta", {
                      property: "og:description",
                      content: "Free VA home loan calculators for veterans. Calculate affordability, compare cost of living, and estimate disability compensation."
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="bg-blue-600 dark:bg-blue-800"${_scopeId}><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"${_scopeId}><div class="text-center"${_scopeId}><h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"${_scopeId}> VA Home Loan Calculator </h1><p class="mx-auto mt-6 max-w-2xl text-xl text-white/90"${_scopeId}> Free tools to help veterans make informed decisions about home purchases, relocations, and financial planning using VA benefits. </p><div class="mt-10 flex justify-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/calculators/affordability",
              class: "rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Calculate Affordability `);
                } else {
                  return [
                    createTextVNode(" Calculate Affordability ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/register",
              class: "rounded-md bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Free Account `);
                } else {
                  return [
                    createTextVNode(" Create Free Account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white py-16 dark:bg-gray-800 sm:py-24"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center"${_scopeId}><h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"${_scopeId}> Financial Planning Tools for Veterans </h2><p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300"${_scopeId}> Make confident financial decisions with our specialized calculators. </p></div><div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900"${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600"${_scopeId}><svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"${_scopeId}></path></svg></div><h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> VA Loan Affordability </h3><p class="mt-2 text-gray-600 dark:text-gray-300"${_scopeId}> Calculate your maximum home purchase price based on income, debts, and VA loan benefits including no PMI. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/calculators/affordability",
              class: "mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Calculate now <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Calculate now "),
                    (openBlock(), createBlock("svg", {
                      class: "ml-1 h-4 w-4",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900"${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600"${_scopeId}><svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"${_scopeId}></path></svg></div><h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Cost of Living Comparison </h3><p class="mt-2 text-gray-600 dark:text-gray-300"${_scopeId}> Compare cost of living between states. Perfect for PCS moves or retirement planning. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/calculators/cost-of-living",
              class: "mt-4 inline-flex items-center text-sm font-medium text-green-700 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Compare states <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Compare states "),
                    (openBlock(), createBlock("svg", {
                      class: "ml-1 h-4 w-4",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900"${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600"${_scopeId}><svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Disability Rating Impact </h3><p class="mt-2 text-gray-600 dark:text-gray-300"${_scopeId}> Calculate monthly compensation, tax benefits, and state-specific property tax exemptions. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/calculators/disability",
              class: "mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Calculate benefits <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Calculate benefits "),
                    (openBlock(), createBlock("svg", {
                      class: "ml-1 h-4 w-4",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-gray-50 py-16 dark:bg-gray-900"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="rounded-2xl bg-blue-600 px-8 py-12 text-center dark:bg-blue-700 sm:px-12"${_scopeId}><h2 class="text-2xl font-bold text-white sm:text-3xl"${_scopeId}> Support a Veteran-Owned Project </h2><p class="mx-auto mt-4 max-w-xl text-lg text-white/90"${_scopeId}> These calculators are free forever. If they&#39;ve helped you, consider supporting us with a one-time contribution to unlock saved calculations and help keep this project running. </p><div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/register",
              class: "inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Account `);
                } else {
                  return [
                    createTextVNode(" Create Account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/support",
              class: "inline-flex items-center rounded-md border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Support Us `);
                } else {
                  return [
                    createTextVNode(" Support Us ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Free VA Loan Calculators for Veterans" }, {
                default: withCtx(() => [
                  createVNode("meta", {
                    name: "description",
                    content: "Free VA home loan calculators for veterans. Calculate affordability, compare cost of living between states, and estimate VA disability compensation with 2025 rates."
                  }),
                  createVNode("meta", {
                    property: "og:title",
                    content: "VA Home Loan Calculator - Free Tools for Veterans"
                  }),
                  createVNode("meta", {
                    property: "og:description",
                    content: "Free VA home loan calculators for veterans. Calculate affordability, compare cost of living, and estimate disability compensation."
                  })
                ]),
                _: 1
              }),
              createVNode("div", { class: "bg-blue-600 dark:bg-blue-800" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h1", { class: "text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" }, " VA Home Loan Calculator "),
                    createVNode("p", { class: "mx-auto mt-6 max-w-2xl text-xl text-white/90" }, " Free tools to help veterans make informed decisions about home purchases, relocations, and financial planning using VA benefits. "),
                    createVNode("div", { class: "mt-10 flex justify-center gap-4" }, [
                      createVNode(unref(Link), {
                        href: "/calculators/affordability",
                        class: "rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Calculate Affordability ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), {
                        href: "/register",
                        class: "rounded-md bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Create Free Account ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "bg-white py-16 dark:bg-gray-800 sm:py-24" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h2", { class: "text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" }, " Financial Planning Tools for Veterans "),
                    createVNode("p", { class: "mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300" }, " Make confident financial decisions with our specialized calculators. ")
                  ]),
                  createVNode("div", { class: "mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" }, [
                    createVNode("div", { class: "rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900" }, [
                      createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-6 w-6 text-white",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "mt-6 text-lg font-semibold text-gray-900 dark:text-white" }, " VA Loan Affordability "),
                      createVNode("p", { class: "mt-2 text-gray-600 dark:text-gray-300" }, " Calculate your maximum home purchase price based on income, debts, and VA loan benefits including no PMI. "),
                      createVNode(unref(Link), {
                        href: "/calculators/affordability",
                        class: "mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Calculate now "),
                          (openBlock(), createBlock("svg", {
                            class: "ml-1 h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            })
                          ]))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900" }, [
                      createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-lg bg-green-600" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-6 w-6 text-white",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "mt-6 text-lg font-semibold text-gray-900 dark:text-white" }, " Cost of Living Comparison "),
                      createVNode("p", { class: "mt-2 text-gray-600 dark:text-gray-300" }, " Compare cost of living between states. Perfect for PCS moves or retirement planning. "),
                      createVNode(unref(Link), {
                        href: "/calculators/cost-of-living",
                        class: "mt-4 inline-flex items-center text-sm font-medium text-green-700 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Compare states "),
                          (openBlock(), createBlock("svg", {
                            class: "ml-1 h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            })
                          ]))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900" }, [
                      createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-6 w-6 text-white",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "mt-6 text-lg font-semibold text-gray-900 dark:text-white" }, " Disability Rating Impact "),
                      createVNode("p", { class: "mt-2 text-gray-600 dark:text-gray-300" }, " Calculate monthly compensation, tax benefits, and state-specific property tax exemptions. "),
                      createVNode(unref(Link), {
                        href: "/calculators/disability",
                        class: "mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Calculate benefits "),
                          (openBlock(), createBlock("svg", {
                            class: "ml-1 h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "bg-gray-50 py-16 dark:bg-gray-900" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "rounded-2xl bg-blue-600 px-8 py-12 text-center dark:bg-blue-700 sm:px-12" }, [
                    createVNode("h2", { class: "text-2xl font-bold text-white sm:text-3xl" }, " Support a Veteran-Owned Project "),
                    createVNode("p", { class: "mx-auto mt-4 max-w-xl text-lg text-white/90" }, " These calculators are free forever. If they've helped you, consider supporting us with a one-time contribution to unlock saved calculations and help keep this project running. "),
                    createVNode("div", { class: "mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row" }, [
                      createVNode(unref(Link), {
                        href: "/register",
                        class: "inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Create Account ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), {
                        href: "/support",
                        class: "inline-flex items-center rounded-md border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Support Us ")
                        ]),
                        _: 1
                      })
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
