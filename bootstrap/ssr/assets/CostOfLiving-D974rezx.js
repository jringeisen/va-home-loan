import { computed, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { Head, Form } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTISP9sP.js";
import { u as useCalculator, _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5 } from "./useCalculator-DFTlb9cV.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "CostOfLiving",
  __ssrInlineRender: true,
  props: {
    states: Object,
    results: Object,
    inputs: Object
  },
  setup(__props) {
    const props = __props;
    const defaultValues = {
      from_state: "TX",
      to_state: "CA",
      current_salary: 75e3,
      is_military: false,
      zip_code: "",
      pay_grade: "",
      has_dependents: false
    };
    const updateUrl = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams();
      params.set("from", display.from_state);
      params.set("to", display.to_state);
      params.set("salary", display.current_salary);
      if (display.is_military) {
        params.set("military", "true");
        if (display.zip_code) params.set("zip", display.zip_code);
        if (display.pay_grade) params.set("grade", display.pay_grade);
        if (display.has_dependents) params.set("dependents", "true");
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    };
    const {
      user,
      formRef,
      display,
      loading,
      error,
      showSaveModal,
      linkCopied,
      onFormStart,
      onFormFinish,
      onFormError,
      onInput,
      openSaveModal,
      closeSaveModal,
      printResults,
      copyLink,
      formatCurrency
    } = useCalculator({
      defaultValues,
      inputs: props.inputs,
      updateUrl
    });
    const formatPercent = (value) => {
      const sign = value >= 0 ? "+" : "";
      return `${sign}${value.toFixed(1)}%`;
    };
    const savePlaceholder = computed(
      () => `e.g., ${props.states[display.from_state]} to ${props.states[display.to_state]}`
    );
    const transformData = (data) => ({
      ...data,
      current_salary: parseFloat(data.current_salary) || 0,
      is_military: data.is_military === "on" || data.is_military === true,
      has_dependents: data.has_dependents === "on" || data.has_dependents === true
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Cost of Living Comparison Calculator" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<meta name="description" content="Compare cost of living between states for PCS moves and retirement planning. Includes housing, utilities, transportation, and BAH rate comparisons for military."${_scopeId2}><meta property="og:title" content="Cost of Living Comparison - Compare States for Military Moves"${_scopeId2}><meta property="og:description" content="Free cost of living calculator for veterans and military families. Compare states, calculate equivalent salary, and plan your next PCS move."${_scopeId2}>`);
                } else {
                  return [
                    createVNode("meta", {
                      name: "description",
                      content: "Compare cost of living between states for PCS moves and retirement planning. Includes housing, utilities, transportation, and BAH rate comparisons for military."
                    }),
                    createVNode("meta", {
                      property: "og:title",
                      content: "Cost of Living Comparison - Compare States for Military Moves"
                    }),
                    createVNode("meta", {
                      property: "og:description",
                      content: "Free cost of living calculator for veterans and military families. Compare states, calculate equivalent salary, and plan your next PCS move."
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white"${_scopeId}>Cost of Living Comparison</h1><p class="mt-2 text-gray-600 dark:text-gray-300"${_scopeId}> Compare cost of living between states to make informed decisions about relocations. </p></div><div class="grid gap-8 lg:grid-cols-2"${_scopeId}><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Compare States</h2><div class="print-show mb-6 hidden space-y-2 text-sm"${_scopeId}><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>From State:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(__props.states[unref(display).from_state])}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>To State:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(__props.states[unref(display).to_state])}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Current Annual Salary:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(unref(display).current_salary))}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Active Duty Military:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).is_military ? "Yes" : "No")}</span></div>`);
            if (unref(display).is_military && unref(display).zip_code) {
              _push2(`<div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Current ZIP Code:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).zip_code)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(display).is_military && unref(display).pay_grade) {
              _push2(`<div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Pay Grade:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).pay_grade)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(display).is_military) {
              _push2(`<div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>With Dependents:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).has_dependents ? "Yes" : "No")}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "formRef",
              ref: formRef,
              action: "/calculators/cost-of-living/calculate",
              method: "post",
              transform: transformData,
              options: { preserveState: true, preserveScroll: true, preserveUrl: true },
              class: "no-print space-y-6",
              onInput: unref(onInput),
              onStart: unref(onFormStart),
              onFinish: unref(onFormFinish),
              onError: unref(onFormError)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 sm:grid-cols-2"${_scopeId2}><div${_scopeId2}><label for="from_state" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}>From State</label><select id="from_state" name="from_state"${ssrRenderAttr("value", unref(display).from_state)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.states, (name, code) => {
                    _push3(`<option${ssrRenderAttr("value", code)}${_scopeId2}>${ssrInterpolate(name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div${_scopeId2}><label for="to_state" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}>To State</label><select id="to_state" name="to_state"${ssrRenderAttr("value", unref(display).to_state)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.states, (name, code) => {
                    _push3(`<option${ssrRenderAttr("value", code)}${_scopeId2}>${ssrInterpolate(name)}</option>`);
                  });
                  _push3(`<!--]--></select></div></div><div${_scopeId2}><label for="current_salary" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}>Current Annual Salary</label><div class="relative mt-1"${_scopeId2}><span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true"${_scopeId2}>$</span><input id="current_salary" name="current_salary"${ssrRenderAttr("value", unref(display).current_salary)} type="number" class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}></div></div><div class="flex items-center"${_scopeId2}><input id="military" name="is_military" type="checkbox"${ssrIncludeBooleanAttr(unref(display).is_military) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { content: "Basic Allowance for Housing (BAH) varies by location, pay grade, and dependency status. Enable this to compare BAH rates between locations." }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label for="military" class="ml-2 text-sm text-gray-700 dark:text-gray-300"${_scopeId3}> Active duty military (show BAH comparison) </label>`);
                      } else {
                        return [
                          createVNode("label", {
                            for: "military",
                            class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                          }, " Active duty military (show BAH comparison) ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(display).is_military) {
                    _push3(`<div class="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"${_scopeId2}><div${_scopeId2}><label for="zip_code" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}>Current ZIP Code</label><input id="zip_code" name="zip_code"${ssrRenderAttr("value", unref(display).zip_code)} type="text" maxlength="5" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}></div><div${_scopeId2}><label for="pay_grade" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}>Pay Grade</label><select id="pay_grade" name="pay_grade"${ssrRenderAttr("value", unref(display).pay_grade)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}><option value=""${_scopeId2}>Select...</option><!--[-->`);
                    ssrRenderList(["E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9", "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10"], (grade) => {
                      _push3(`<option${ssrRenderAttr("value", grade)}${_scopeId2}>${ssrInterpolate(grade)}</option>`);
                    });
                    _push3(`<!--]--></select></div><div class="flex items-center"${_scopeId2}><input id="dependents" name="has_dependents" type="checkbox"${ssrIncludeBooleanAttr(unref(display).has_dependents) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"${_scopeId2}><label for="dependents" class="ml-2 text-sm text-gray-700 dark:text-gray-300"${_scopeId2}> With dependents </label></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "from_state",
                          class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                        }, "From State"),
                        createVNode("select", {
                          id: "from_state",
                          name: "from_state",
                          value: unref(display).from_state,
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.states, (name, code) => {
                            return openBlock(), createBlock("option", {
                              key: code,
                              value: code
                            }, toDisplayString(name), 9, ["value"]);
                          }), 128))
                        ], 8, ["value"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "to_state",
                          class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                        }, "To State"),
                        createVNode("select", {
                          id: "to_state",
                          name: "to_state",
                          value: unref(display).to_state,
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.states, (name, code) => {
                            return openBlock(), createBlock("option", {
                              key: code,
                              value: code
                            }, toDisplayString(name), 9, ["value"]);
                          }), 128))
                        ], 8, ["value"])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "current_salary",
                        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                      }, "Current Annual Salary"),
                      createVNode("div", { class: "relative mt-1" }, [
                        createVNode("span", {
                          class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                          "aria-hidden": "true"
                        }, "$"),
                        createVNode("input", {
                          id: "current_salary",
                          name: "current_salary",
                          value: unref(display).current_salary,
                          type: "number",
                          class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, null, 8, ["value"])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("input", {
                        id: "military",
                        name: "is_military",
                        type: "checkbox",
                        checked: unref(display).is_military,
                        class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      }, null, 8, ["checked"]),
                      createVNode(_sfc_main$2, { content: "Basic Allowance for Housing (BAH) varies by location, pay grade, and dependency status. Enable this to compare BAH rates between locations." }, {
                        default: withCtx(() => [
                          createVNode("label", {
                            for: "military",
                            class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                          }, " Active duty military (show BAH comparison) ")
                        ]),
                        _: 1
                      })
                    ]),
                    unref(display).is_military ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "zip_code",
                          class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                        }, "Current ZIP Code"),
                        createVNode("input", {
                          id: "zip_code",
                          name: "zip_code",
                          value: unref(display).zip_code,
                          type: "text",
                          maxlength: "5",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, null, 8, ["value"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "pay_grade",
                          class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                        }, "Pay Grade"),
                        createVNode("select", {
                          id: "pay_grade",
                          name: "pay_grade",
                          value: unref(display).pay_grade,
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, [
                          createVNode("option", { value: "" }, "Select..."),
                          (openBlock(), createBlock(Fragment, null, renderList(["E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9", "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10"], (grade) => {
                            return createVNode("option", {
                              key: grade,
                              value: grade
                            }, toDisplayString(grade), 9, ["value"]);
                          }), 64))
                        ], 8, ["value"])
                      ]),
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("input", {
                          id: "dependents",
                          name: "has_dependents",
                          type: "checkbox",
                          checked: unref(display).has_dependents,
                          class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        }, null, 8, ["checked"]),
                        createVNode("label", {
                          for: "dependents",
                          class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                        }, " With dependents ")
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Comparison Results</h2>`);
            if (unref(loading)) {
              _push2(`<div class="flex items-center justify-center py-12" role="status" aria-label="Calculating results"${_scopeId}><div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" aria-hidden="true"${_scopeId}></div><span class="sr-only"${_scopeId}>Calculating...</span></div>`);
            } else if (unref(error)) {
              _push2(`<div class="rounded-md bg-red-50 p-4"${_scopeId}><p class="text-sm text-red-700"${_scopeId}>${ssrInterpolate(unref(error))}</p></div>`);
            } else if (props.results) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="${ssrRenderClass([
                "rounded-lg p-4",
                props.results.overall_percent_change > 0 ? "bg-red-50 dark:bg-red-900/30" : "bg-green-50 dark:bg-green-900/30"
              ])}"${_scopeId}><p class="${ssrRenderClass([props.results.overall_percent_change > 0 ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300", "text-sm font-medium"])}"${_scopeId}>${ssrInterpolate(props.results.cost_difference_description)}</p><p class="${ssrRenderClass([props.results.overall_percent_change > 0 ? "text-red-900 dark:text-white" : "text-green-900 dark:text-white", "text-2xl font-bold"])}"${_scopeId}>${ssrInterpolate(formatPercent(props.results.overall_percent_change))}</p><p class="${ssrRenderClass([props.results.overall_percent_change > 0 ? "text-red-800 dark:text-red-200" : "text-green-800 dark:text-green-200", "text-sm"])}"${_scopeId}>${ssrInterpolate(__props.states[props.results.to_state])} vs ${ssrInterpolate(__props.states[props.results.from_state])}</p></div><div${_scopeId}><h3 class="mb-3 font-medium text-gray-900 dark:text-white"${_scopeId}>Category Breakdown</h3><div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(props.results.category_comparison, (data, category) => {
                _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600 capitalize dark:text-gray-300"${_scopeId}>${ssrInterpolate(category.replace("_", " "))}</span><span class="${ssrRenderClass(["font-medium", data.percent_change > 0 ? "text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400"])}"${_scopeId}>${ssrInterpolate(formatPercent(data.percent_change))}</span></div>`);
              });
              _push2(`<!--]--></div></div>`);
              if (props.results.equivalent_salary) {
                _push2(`<div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30"${_scopeId}><h3 class="font-medium text-blue-800 dark:text-blue-300"${_scopeId}>Equivalent Salary</h3><p class="text-sm text-blue-600 dark:text-blue-400"${_scopeId}> To maintain your standard of living in ${ssrInterpolate(__props.states[props.results.to_state])}, you would need: </p><p class="text-2xl font-bold text-blue-900 dark:text-white"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  value: props.results.equivalent_salary,
                  format: unref(formatCurrency)
                }, null, _parent2, _scopeId));
                _push2(`</p><p class="text-sm text-blue-600 dark:text-blue-400"${_scopeId}> (${ssrInterpolate(props.results.salary_adjustment >= 0 ? "+" : "")}${ssrInterpolate(unref(formatCurrency)(props.results.salary_adjustment))} from current) </p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$4, {
                "link-copied": unref(linkCopied),
                "show-save": !!unref(user),
                "save-label": "Save Comparison",
                onCopy: unref(copyLink),
                onPrint: unref(printResults),
                onSave: unref(openSaveModal)
              }, null, _parent2, _scopeId));
              if (!unref(user)) {
                _push2(`<div class="text-center"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-300"${_scopeId}><a href="/register" class="font-medium text-green-700 underline hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"${_scopeId}> Create an account </a> to save your comparisons. </p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50"${_scopeId}><h3 class="text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Data Sources</h3><ul class="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-300"${_scopeId}><li${_scopeId}> Cost of living indices (grocery, housing, utilities, transportation, health, misc): <a href="https://meric.mo.gov/data/cost-living-data-series" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"${_scopeId}> MERIC Q3 2025 </a></li><li${_scopeId}> State tax burden data: <a href="https://wallethub.com/edu/states-with-highest-lowest-tax-burden/20494" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"${_scopeId}> WalletHub 2025 </a></li></ul></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              show: unref(showSaveModal),
              type: "cost_of_living",
              inputs: unref(display),
              results: props.results,
              placeholder: savePlaceholder.value,
              onClose: unref(closeSaveModal)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Cost of Living Comparison Calculator" }, {
                default: withCtx(() => [
                  createVNode("meta", {
                    name: "description",
                    content: "Compare cost of living between states for PCS moves and retirement planning. Includes housing, utilities, transportation, and BAH rate comparisons for military."
                  }),
                  createVNode("meta", {
                    property: "og:title",
                    content: "Cost of Living Comparison - Compare States for Military Moves"
                  }),
                  createVNode("meta", {
                    property: "og:description",
                    content: "Free cost of living calculator for veterans and military families. Compare states, calculate equivalent salary, and plan your next PCS move."
                  })
                ]),
                _: 1
              }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white" }, "Cost of Living Comparison"),
                    createVNode("p", { class: "mt-2 text-gray-600 dark:text-gray-300" }, " Compare cost of living between states to make informed decisions about relocations. ")
                  ]),
                  createVNode("div", { class: "grid gap-8 lg:grid-cols-2" }, [
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("h2", { class: "mb-6 text-lg font-semibold text-gray-900 dark:text-white" }, "Compare States"),
                      createVNode("div", { class: "print-show mb-6 hidden space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "From State:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(__props.states[unref(display).from_state]), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "To State:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(__props.states[unref(display).to_state]), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Current Annual Salary:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(formatCurrency)(unref(display).current_salary)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Active Duty Military:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).is_military ? "Yes" : "No"), 1)
                        ]),
                        unref(display).is_military && unref(display).zip_code ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between border-b pb-1"
                        }, [
                          createVNode("span", { class: "text-gray-600" }, "Current ZIP Code:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).zip_code), 1)
                        ])) : createCommentVNode("", true),
                        unref(display).is_military && unref(display).pay_grade ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between border-b pb-1"
                        }, [
                          createVNode("span", { class: "text-gray-600" }, "Pay Grade:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).pay_grade), 1)
                        ])) : createCommentVNode("", true),
                        unref(display).is_military ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "flex justify-between border-b pb-1"
                        }, [
                          createVNode("span", { class: "text-gray-600" }, "With Dependents:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).has_dependents ? "Yes" : "No"), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(Form), {
                        ref_key: "formRef",
                        ref: formRef,
                        action: "/calculators/cost-of-living/calculate",
                        method: "post",
                        transform: transformData,
                        options: { preserveState: true, preserveScroll: true, preserveUrl: true },
                        class: "no-print space-y-6",
                        onInput: unref(onInput),
                        onStart: unref(onFormStart),
                        onFinish: unref(onFormFinish),
                        onError: unref(onFormError)
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "from_state",
                                class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                              }, "From State"),
                              createVNode("select", {
                                id: "from_state",
                                name: "from_state",
                                value: unref(display).from_state,
                                class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.states, (name, code) => {
                                  return openBlock(), createBlock("option", {
                                    key: code,
                                    value: code
                                  }, toDisplayString(name), 9, ["value"]);
                                }), 128))
                              ], 8, ["value"])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "to_state",
                                class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                              }, "To State"),
                              createVNode("select", {
                                id: "to_state",
                                name: "to_state",
                                value: unref(display).to_state,
                                class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.states, (name, code) => {
                                  return openBlock(), createBlock("option", {
                                    key: code,
                                    value: code
                                  }, toDisplayString(name), 9, ["value"]);
                                }), 128))
                              ], 8, ["value"])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "current_salary",
                              class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                            }, "Current Annual Salary"),
                            createVNode("div", { class: "relative mt-1" }, [
                              createVNode("span", {
                                class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                                "aria-hidden": "true"
                              }, "$"),
                              createVNode("input", {
                                id: "current_salary",
                                name: "current_salary",
                                value: unref(display).current_salary,
                                type: "number",
                                class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, null, 8, ["value"])
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("input", {
                              id: "military",
                              name: "is_military",
                              type: "checkbox",
                              checked: unref(display).is_military,
                              class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            }, null, 8, ["checked"]),
                            createVNode(_sfc_main$2, { content: "Basic Allowance for Housing (BAH) varies by location, pay grade, and dependency status. Enable this to compare BAH rates between locations." }, {
                              default: withCtx(() => [
                                createVNode("label", {
                                  for: "military",
                                  class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                                }, " Active duty military (show BAH comparison) ")
                              ]),
                              _: 1
                            })
                          ]),
                          unref(display).is_military ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "zip_code",
                                class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                              }, "Current ZIP Code"),
                              createVNode("input", {
                                id: "zip_code",
                                name: "zip_code",
                                value: unref(display).zip_code,
                                type: "text",
                                maxlength: "5",
                                class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, null, 8, ["value"])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "pay_grade",
                                class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                              }, "Pay Grade"),
                              createVNode("select", {
                                id: "pay_grade",
                                name: "pay_grade",
                                value: unref(display).pay_grade,
                                class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, [
                                createVNode("option", { value: "" }, "Select..."),
                                (openBlock(), createBlock(Fragment, null, renderList(["E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9", "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10"], (grade) => {
                                  return createVNode("option", {
                                    key: grade,
                                    value: grade
                                  }, toDisplayString(grade), 9, ["value"]);
                                }), 64))
                              ], 8, ["value"])
                            ]),
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("input", {
                                id: "dependents",
                                name: "has_dependents",
                                type: "checkbox",
                                checked: unref(display).has_dependents,
                                class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                              }, null, 8, ["checked"]),
                              createVNode("label", {
                                for: "dependents",
                                class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                              }, " With dependents ")
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["onInput", "onStart", "onFinish", "onError"])
                    ]),
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("h2", { class: "mb-6 text-lg font-semibold text-gray-900 dark:text-white" }, "Comparison Results"),
                      unref(loading) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-center py-12",
                        role: "status",
                        "aria-label": "Calculating results"
                      }, [
                        createVNode("div", {
                          class: "h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent",
                          "aria-hidden": "true"
                        }),
                        createVNode("span", { class: "sr-only" }, "Calculating...")
                      ])) : unref(error) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "rounded-md bg-red-50 p-4"
                      }, [
                        createVNode("p", { class: "text-sm text-red-700" }, toDisplayString(unref(error)), 1)
                      ])) : props.results ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "space-y-6"
                      }, [
                        createVNode("div", {
                          class: [
                            "rounded-lg p-4",
                            props.results.overall_percent_change > 0 ? "bg-red-50 dark:bg-red-900/30" : "bg-green-50 dark:bg-green-900/30"
                          ]
                        }, [
                          createVNode("p", {
                            class: ["text-sm font-medium", props.results.overall_percent_change > 0 ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"]
                          }, toDisplayString(props.results.cost_difference_description), 3),
                          createVNode("p", {
                            class: ["text-2xl font-bold", props.results.overall_percent_change > 0 ? "text-red-900 dark:text-white" : "text-green-900 dark:text-white"]
                          }, toDisplayString(formatPercent(props.results.overall_percent_change)), 3),
                          createVNode("p", {
                            class: ["text-sm", props.results.overall_percent_change > 0 ? "text-red-800 dark:text-red-200" : "text-green-800 dark:text-green-200"]
                          }, toDisplayString(__props.states[props.results.to_state]) + " vs " + toDisplayString(__props.states[props.results.from_state]), 3)
                        ], 2),
                        createVNode("div", null, [
                          createVNode("h3", { class: "mb-3 font-medium text-gray-900 dark:text-white" }, "Category Breakdown"),
                          createVNode("div", { class: "space-y-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(props.results.category_comparison, (data, category) => {
                              return openBlock(), createBlock("div", {
                                key: category,
                                class: "flex items-center justify-between"
                              }, [
                                createVNode("span", { class: "text-gray-600 capitalize dark:text-gray-300" }, toDisplayString(category.replace("_", " ")), 1),
                                createVNode("span", {
                                  class: ["font-medium", data.percent_change > 0 ? "text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400"]
                                }, toDisplayString(formatPercent(data.percent_change)), 3)
                              ]);
                            }), 128))
                          ])
                        ]),
                        props.results.equivalent_salary ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30"
                        }, [
                          createVNode("h3", { class: "font-medium text-blue-800 dark:text-blue-300" }, "Equivalent Salary"),
                          createVNode("p", { class: "text-sm text-blue-600 dark:text-blue-400" }, " To maintain your standard of living in " + toDisplayString(__props.states[props.results.to_state]) + ", you would need: ", 1),
                          createVNode("p", { class: "text-2xl font-bold text-blue-900 dark:text-white" }, [
                            createVNode(_sfc_main$3, {
                              value: props.results.equivalent_salary,
                              format: unref(formatCurrency)
                            }, null, 8, ["value", "format"])
                          ]),
                          createVNode("p", { class: "text-sm text-blue-600 dark:text-blue-400" }, " (" + toDisplayString(props.results.salary_adjustment >= 0 ? "+" : "") + toDisplayString(unref(formatCurrency)(props.results.salary_adjustment)) + " from current) ", 1)
                        ])) : createCommentVNode("", true),
                        createVNode(_sfc_main$4, {
                          "link-copied": unref(linkCopied),
                          "show-save": !!unref(user),
                          "save-label": "Save Comparison",
                          onCopy: unref(copyLink),
                          onPrint: unref(printResults),
                          onSave: unref(openSaveModal)
                        }, null, 8, ["link-copied", "show-save", "onCopy", "onPrint", "onSave"]),
                        !unref(user) ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center"
                        }, [
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-300" }, [
                            createVNode("a", {
                              href: "/register",
                              class: "font-medium text-green-700 underline hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                            }, " Create an account "),
                            createTextVNode(" to save your comparisons. ")
                          ])
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50" }, [
                    createVNode("h3", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, "Data Sources"),
                    createVNode("ul", { class: "mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-300" }, [
                      createVNode("li", null, [
                        createTextVNode(" Cost of living indices (grocery, housing, utilities, transportation, health, misc): "),
                        createVNode("a", {
                          href: "https://meric.mo.gov/data/cost-living-data-series",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          class: "text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        }, " MERIC Q3 2025 ")
                      ]),
                      createVNode("li", null, [
                        createTextVNode(" State tax burden data: "),
                        createVNode("a", {
                          href: "https://wallethub.com/edu/states-with-highest-lowest-tax-burden/20494",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          class: "text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        }, " WalletHub 2025 ")
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$5, {
                show: unref(showSaveModal),
                type: "cost_of_living",
                inputs: unref(display),
                results: props.results,
                placeholder: savePlaceholder.value,
                onClose: unref(closeSaveModal)
              }, null, 8, ["show", "inputs", "results", "placeholder", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calculators/CostOfLiving.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
