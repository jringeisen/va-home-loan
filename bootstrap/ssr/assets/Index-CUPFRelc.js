import { withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTISP9sP.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    recentCalculations: Array,
    calculationCounts: Object,
    hasPaid: Boolean
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const getCalculatorLabel = (type) => {
      const labels = {
        affordability: "VA Loan Affordability",
        cost_of_living: "Cost of Living",
        disability: "Disability Impact"
      };
      return labels[type] || type;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white"${_scopeId}>Dashboard</h1><div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"${_scopeId}><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><p class="text-sm font-medium text-gray-600 dark:text-gray-300"${_scopeId}>Affordability Calculations</p><p class="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400"${_scopeId}>${ssrInterpolate(__props.calculationCounts.affordability)}</p></div><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><p class="text-sm font-medium text-gray-600 dark:text-gray-300"${_scopeId}>COL Comparisons</p><p class="mt-2 text-3xl font-bold text-green-600 dark:text-green-400"${_scopeId}>${ssrInterpolate(__props.calculationCounts.cost_of_living)}</p></div><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><p class="text-sm font-medium text-gray-600 dark:text-gray-300"${_scopeId}>Disability Calculations</p><p class="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400"${_scopeId}>${ssrInterpolate(__props.calculationCounts.disability)}</p></div><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><p class="text-sm font-medium text-gray-600 dark:text-gray-300"${_scopeId}>Account Status</p><p class="${ssrRenderClass([__props.hasPaid ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300", "mt-2 text-xl font-bold"])}"${_scopeId}>${ssrInterpolate(__props.hasPaid ? "Supporter" : "Free")}</p>`);
            if (!__props.hasPaid) {
              _push2(ssrRenderComponent(unref(Link), {
                href: "/support",
                class: "mt-2 inline-block text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Unlock saves `);
                  } else {
                    return [
                      createTextVNode(" Unlock saves ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="mt-8"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Quick Actions</h2><div class="mt-4 grid gap-4 sm:grid-cols-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/calculators/affordability",
              class: "flex items-center rounded-lg bg-blue-50 p-4 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600"${_scopeId2}><svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"${_scopeId2}></path></svg></div><span class="ml-3 font-medium text-blue-700 dark:text-blue-300"${_scopeId2}>Calculate Affordability</span>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-white",
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
                    createVNode("span", { class: "ml-3 font-medium text-blue-700 dark:text-blue-300" }, "Calculate Affordability")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/calculators/cost-of-living",
              class: "flex items-center rounded-lg bg-green-50 p-4 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600"${_scopeId2}><svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"${_scopeId2}></path></svg></div><span class="ml-3 font-medium text-green-700 dark:text-green-300"${_scopeId2}>Compare States</span>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-green-600" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-white",
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
                    createVNode("span", { class: "ml-3 font-medium text-green-700 dark:text-green-300" }, "Compare States")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/calculators/disability",
              class: "flex items-center rounded-lg bg-purple-50 p-4 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600"${_scopeId2}><svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId2}></path></svg></div><span class="ml-3 font-medium text-purple-700 dark:text-purple-300"${_scopeId2}>Calculate Benefits</span>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-white",
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
                    createVNode("span", { class: "ml-3 font-medium text-purple-700 dark:text-purple-300" }, "Calculate Benefits")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-8"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Recent Calculations</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard/calculations",
              class: "text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View all `);
                } else {
                  return [
                    createTextVNode(" View all ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}>`);
            if (__props.recentCalculations.length > 0) {
              _push2(`<ul class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.recentCalculations, (calc) => {
                _push2(`<li class="px-6 py-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(calc.name || getCalculatorLabel(calc.type))}</p><p class="text-sm text-gray-600 dark:text-gray-300"${_scopeId}>${ssrInterpolate(formatDate(calc.created_at))}</p></div><span class="${ssrRenderClass([{
                  "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300": calc.type === "affordability",
                  "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300": calc.type === "cost_of_living",
                  "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300": calc.type === "disability"
                }, "rounded-full px-3 py-1 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getCalculatorLabel(calc.type))}</span></div></li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<div class="px-6 py-12 text-center"${_scopeId}><p class="text-gray-600 dark:text-gray-300"${_scopeId}>No calculations saved yet.</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/calculators/affordability",
                class: "mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Create your first calculation `);
                  } else {
                    return [
                      createTextVNode(" Create your first calculation ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Dashboard" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white" }, "Dashboard"),
                  createVNode("div", { class: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" }, [
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("p", { class: "text-sm font-medium text-gray-600 dark:text-gray-300" }, "Affordability Calculations"),
                      createVNode("p", { class: "mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400" }, toDisplayString(__props.calculationCounts.affordability), 1)
                    ]),
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("p", { class: "text-sm font-medium text-gray-600 dark:text-gray-300" }, "COL Comparisons"),
                      createVNode("p", { class: "mt-2 text-3xl font-bold text-green-600 dark:text-green-400" }, toDisplayString(__props.calculationCounts.cost_of_living), 1)
                    ]),
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("p", { class: "text-sm font-medium text-gray-600 dark:text-gray-300" }, "Disability Calculations"),
                      createVNode("p", { class: "mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400" }, toDisplayString(__props.calculationCounts.disability), 1)
                    ]),
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("p", { class: "text-sm font-medium text-gray-600 dark:text-gray-300" }, "Account Status"),
                      createVNode("p", {
                        class: ["mt-2 text-xl font-bold", __props.hasPaid ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"]
                      }, toDisplayString(__props.hasPaid ? "Supporter" : "Free"), 3),
                      !__props.hasPaid ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: "/support",
                        class: "mt-2 inline-block text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Unlock saves ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "mt-8" }, [
                    createVNode("h2", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Quick Actions"),
                    createVNode("div", { class: "mt-4 grid gap-4 sm:grid-cols-3" }, [
                      createVNode(unref(Link), {
                        href: "/calculators/affordability",
                        class: "flex items-center rounded-lg bg-blue-50 p-4 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-5 w-5 text-white",
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
                          createVNode("span", { class: "ml-3 font-medium text-blue-700 dark:text-blue-300" }, "Calculate Affordability")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), {
                        href: "/calculators/cost-of-living",
                        class: "flex items-center rounded-lg bg-green-50 p-4 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-green-600" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-5 w-5 text-white",
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
                          createVNode("span", { class: "ml-3 font-medium text-green-700 dark:text-green-300" }, "Compare States")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), {
                        href: "/calculators/disability",
                        class: "flex items-center rounded-lg bg-purple-50 p-4 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-5 w-5 text-white",
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
                          createVNode("span", { class: "ml-3 font-medium text-purple-700 dark:text-purple-300" }, "Calculate Benefits")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "mt-8" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Recent Calculations"),
                      createVNode(unref(Link), {
                        href: "/dashboard/calculations",
                        class: "text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" View all ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "mt-4 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                      __props.recentCalculations.length > 0 ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: "divide-y divide-gray-200 dark:divide-gray-700"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentCalculations, (calc) => {
                          return openBlock(), createBlock("li", {
                            key: calc.id,
                            class: "px-6 py-4"
                          }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(calc.name || getCalculatorLabel(calc.type)), 1),
                                createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-300" }, toDisplayString(formatDate(calc.created_at)), 1)
                              ]),
                              createVNode("span", {
                                class: ["rounded-full px-3 py-1 text-xs font-medium", {
                                  "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300": calc.type === "affordability",
                                  "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300": calc.type === "cost_of_living",
                                  "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300": calc.type === "disability"
                                }]
                              }, toDisplayString(getCalculatorLabel(calc.type)), 3)
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "px-6 py-12 text-center"
                      }, [
                        createVNode("p", { class: "text-gray-600 dark:text-gray-300" }, "No calculations saved yet."),
                        createVNode(unref(Link), {
                          href: "/calculators/affordability",
                          class: "mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create your first calculation ")
                          ]),
                          _: 1
                        })
                      ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
