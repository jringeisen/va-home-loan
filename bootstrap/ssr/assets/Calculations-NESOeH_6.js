import { withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTISP9sP.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "Calculations",
  __ssrInlineRender: true,
  props: {
    calculations: Object
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
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
    const getViewUrl = (calc) => {
      const inputs = calc.inputs || {};
      const params = new URLSearchParams();
      if (calc.type === "affordability") {
        if (inputs.annual_income) params.set("income", inputs.annual_income);
        if (inputs.monthly_debts) params.set("debts", inputs.monthly_debts);
        if (inputs.down_payment) params.set("down", inputs.down_payment);
        if (inputs.interest_rate) params.set("rate", inputs.interest_rate);
        if (inputs.loan_term_years) params.set("term", inputs.loan_term_years);
        if (inputs.is_first_use === false) params.set("first", "false");
        if (inputs.disability_rating) params.set("rating", inputs.disability_rating);
        if (inputs.has_spouse) params.set("spouse", "true");
        if (inputs.children_count) params.set("children", inputs.children_count);
        return `/calculators/affordability?${params.toString()}`;
      } else if (calc.type === "cost_of_living") {
        if (inputs.from_state) params.set("from", inputs.from_state);
        if (inputs.to_state) params.set("to", inputs.to_state);
        if (inputs.current_salary) params.set("salary", inputs.current_salary);
        if (inputs.is_military) params.set("military", "true");
        if (inputs.zip_code) params.set("zip", inputs.zip_code);
        if (inputs.pay_grade) params.set("grade", inputs.pay_grade);
        if (inputs.has_dependents) params.set("dependents", "true");
        return `/calculators/cost-of-living?${params.toString()}`;
      } else if (calc.type === "disability") {
        if (inputs.disability_rating) params.set("rating", inputs.disability_rating);
        if (inputs.has_spouse) params.set("spouse", "true");
        if (inputs.children_count) params.set("children", inputs.children_count);
        if (inputs.dependent_parents) params.set("parents", inputs.dependent_parents);
        if (inputs.state) params.set("state", inputs.state);
        if (inputs.home_value) params.set("home", inputs.home_value);
        return `/calculators/disability?${params.toString()}`;
      }
      return "#";
    };
    const deleteCalculation = (id) => {
      if (confirm("Are you sure you want to delete this calculation?")) {
        router.delete(`/calculations/${id}`);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Saved Calculations" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white"${_scopeId}>Saved Calculations</h1>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard",
              class: "text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Dashboard `);
                } else {
                  return [
                    createTextVNode(" Back to Dashboard ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-8 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}>`);
            if (__props.calculations.data.length > 0) {
              _push2(`<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300"${_scopeId}> Name </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300"${_scopeId}> Type </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300"${_scopeId}> Date </th><th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"${_scopeId}><!--[-->`);
              ssrRenderList(__props.calculations.data, (calc) => {
                _push2(`<tr${_scopeId}><td class="whitespace-nowrap px-6 py-4"${_scopeId}><div class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(calc.name || "Untitled")}</div></td><td class="whitespace-nowrap px-6 py-4"${_scopeId}><span class="${ssrRenderClass([{
                  "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300": calc.type === "affordability",
                  "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300": calc.type === "cost_of_living",
                  "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300": calc.type === "disability"
                }, "rounded-full px-3 py-1 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getCalculatorLabel(calc.type))}</span></td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300"${_scopeId}>${ssrInterpolate(formatDate(calc.created_at))}</td><td class="whitespace-nowrap px-6 py-4 text-right text-sm"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: getViewUrl(calc),
                  class: "font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` View `);
                    } else {
                      return [
                        createTextVNode(" View ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="ml-4 font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"${_scopeId}> Delete </button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
            } else {
              _push2(`<div class="px-6 py-12 text-center"${_scopeId}><p class="text-gray-600 dark:text-gray-300"${_scopeId}>No calculations saved yet.</p></div>`);
            }
            _push2(`</div>`);
            if (__props.calculations.last_page > 1) {
              _push2(`<div class="mt-6 flex justify-center"${_scopeId}><nav class="flex items-center space-x-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.calculations.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url || "#",
                  class: [
                    "rounded px-3 py-2 text-sm",
                    link.active ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                    !link.url && "cursor-not-allowed opacity-50"
                  ]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></nav></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Saved Calculations" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white" }, "Saved Calculations"),
                    createVNode(unref(Link), {
                      href: "/dashboard",
                      class: "text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Back to Dashboard ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "mt-8 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                    __props.calculations.data.length > 0 ? (openBlock(), createBlock("table", {
                      key: 0,
                      class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    }, [
                      createVNode("thead", { class: "bg-gray-50 dark:bg-gray-700" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300" }, " Name "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300" }, " Type "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300" }, " Date "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300" }, " Actions ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.calculations.data, (calc) => {
                          return openBlock(), createBlock("tr", {
                            key: calc.id
                          }, [
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4" }, [
                              createVNode("div", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(calc.name || "Untitled"), 1)
                            ]),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4" }, [
                              createVNode("span", {
                                class: ["rounded-full px-3 py-1 text-xs font-medium", {
                                  "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300": calc.type === "affordability",
                                  "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300": calc.type === "cost_of_living",
                                  "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300": calc.type === "disability"
                                }]
                              }, toDisplayString(getCalculatorLabel(calc.type)), 3)
                            ]),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300" }, toDisplayString(formatDate(calc.created_at)), 1),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-right text-sm" }, [
                              createVNode(unref(Link), {
                                href: getViewUrl(calc),
                                class: "font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" View ")
                                ]),
                                _: 1
                              }, 8, ["href"]),
                              createVNode("button", {
                                onClick: ($event) => deleteCalculation(calc.id),
                                class: "ml-4 font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                              }, " Delete ", 8, ["onClick"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "px-6 py-12 text-center"
                    }, [
                      createVNode("p", { class: "text-gray-600 dark:text-gray-300" }, "No calculations saved yet.")
                    ]))
                  ]),
                  __props.calculations.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-6 flex justify-center"
                  }, [
                    createVNode("nav", { class: "flex items-center space-x-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.calculations.links, (link) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: link.label,
                          href: link.url || "#",
                          class: [
                            "rounded px-3 py-2 text-sm",
                            link.active ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                            !link.url && "cursor-not-allowed opacity-50"
                          ],
                          innerHTML: link.label
                        }, null, 8, ["href", "class", "innerHTML"]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Calculations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
