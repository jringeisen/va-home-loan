import { withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { Head, Form } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTISP9sP.js";
import { u as useCalculator, _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5 } from "./useCalculator-DFTlb9cV.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "Disability",
  __ssrInlineRender: true,
  props: {
    states: Object,
    results: Object,
    inputs: Object
  },
  setup(__props) {
    const props = __props;
    const defaultValues = {
      disability_rating: 50,
      has_spouse: false,
      children_count: 0,
      state: "TX",
      home_value: 3e5
    };
    const updateUrl = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams();
      params.set("rating", display.disability_rating);
      if (display.has_spouse) params.set("spouse", "true");
      if (display.children_count > 0) params.set("children", display.children_count);
      params.set("state", display.state);
      params.set("home", display.home_value);
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
    const transformData = (data) => ({
      ...data,
      disability_rating: parseInt(data.disability_rating) || 0,
      has_spouse: data.has_spouse === "on" || data.has_spouse === true,
      children_count: parseInt(data.children_count) || 0,
      home_value: parseFloat(data.home_value) || 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "VA Disability Compensation Calculator - 2025 Rates" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<meta name="description" content="Calculate your VA disability compensation with 2025 rates. Includes dependent additions, state tax benefits, property tax exemptions, and additional VA benefits."${_scopeId2}><meta property="og:title" content="VA Disability Calculator - 2025 Compensation Rates"${_scopeId2}><meta property="og:description" content="Free VA disability compensation calculator with current 2025 rates. Calculate monthly benefits, state tax exemptions, and property tax savings."${_scopeId2}>`);
                } else {
                  return [
                    createVNode("meta", {
                      name: "description",
                      content: "Calculate your VA disability compensation with 2025 rates. Includes dependent additions, state tax benefits, property tax exemptions, and additional VA benefits."
                    }),
                    createVNode("meta", {
                      property: "og:title",
                      content: "VA Disability Calculator - 2025 Compensation Rates"
                    }),
                    createVNode("meta", {
                      property: "og:description",
                      content: "Free VA disability compensation calculator with current 2025 rates. Calculate monthly benefits, state tax exemptions, and property tax savings."
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white"${_scopeId}>Disability Rating Impact Calculator</h1><p class="mt-2 text-gray-600 dark:text-gray-300"${_scopeId}> Calculate your monthly compensation and discover state-specific tax benefits based on your VA disability rating. </p></div><div class="grid gap-8 lg:grid-cols-2"${_scopeId}><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Your Information</h2><div class="print-show mb-6 hidden space-y-2 text-sm"${_scopeId}><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Disability Rating:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).disability_rating)}%</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Spouse:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).has_spouse ? "Yes" : "No")}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Number of Children:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).children_count)}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>State of Residence:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(__props.states[unref(display).state])}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Home Value:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(unref(display).home_value))}</span></div></div>`);
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "formRef",
              ref: formRef,
              action: "/calculators/disability/calculate",
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
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { content: "VA disability ratings range from 0-100% in 10% increments. Combined ratings use VA math, not simple addition. Ratings of 30%+ receive additional compensation for dependents." }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label for="disability_rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId3}> Disability Rating: ${ssrInterpolate(unref(display).disability_rating)}% </label>`);
                      } else {
                        return [
                          createVNode("label", {
                            for: "disability_rating",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Disability Rating: " + toDisplayString(unref(display).disability_rating) + "% ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<input id="disability_rating" name="disability_rating"${ssrRenderAttr("value", unref(display).disability_rating)} type="range" min="0" max="100" step="10"${ssrRenderAttr("aria-valuenow", unref(display).disability_rating)} aria-valuemin="0" aria-valuemax="100" class="mt-2 w-full"${_scopeId2}><div class="mt-1 flex justify-between text-xs text-gray-600 dark:text-gray-300" aria-hidden="true"${_scopeId2}><span${_scopeId2}>0%</span><span${_scopeId2}>50%</span><span${_scopeId2}>100%</span></div></div><div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { content: "Veterans with 30%+ disability rating receive additional monthly compensation for each dependent (spouse, children, dependent parents)." }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h3 class="font-medium text-gray-900 dark:text-white"${_scopeId3}>Dependents</h3>`);
                      } else {
                        return [
                          createVNode("h3", { class: "font-medium text-gray-900 dark:text-white" }, "Dependents")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center"${_scopeId2}><input id="spouse" name="has_spouse"${ssrIncludeBooleanAttr(unref(display).has_spouse) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"${_scopeId2}><label for="spouse" class="ml-2 text-sm text-gray-700 dark:text-gray-300"${_scopeId2}> Spouse </label></div><div${_scopeId2}><label for="children_count" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}> Number of Children </label><select id="children_count" name="children_count"${ssrRenderAttr("value", unref(display).children_count)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}><!--[-->`);
                  ssrRenderList(11, (n) => {
                    _push3(`<option${ssrRenderAttr("value", n - 1)}${_scopeId2}>${ssrInterpolate(n - 1)}</option>`);
                  });
                  _push3(`<!--]--></select></div></div><div${_scopeId2}><label for="state" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}> State of Residence </label><select id="state" name="state"${ssrRenderAttr("value", unref(display).state)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}><option value=""${_scopeId2}>Select state...</option><!--[-->`);
                  ssrRenderList(__props.states, (name, code) => {
                    _push3(`<option${ssrRenderAttr("value", code)}${_scopeId2}>${ssrInterpolate(name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { content: "Many states offer property tax exemptions for disabled veterans. The exemption amount varies by state and disability rating, often requiring 100% rating for full exemption." }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label for="home_value" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId3}> Home Value (for property tax exemption estimate) </label>`);
                      } else {
                        return [
                          createVNode("label", {
                            for: "home_value",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Home Value (for property tax exemption estimate) ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative mt-1"${_scopeId2}><span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true"${_scopeId2}>$</span><input id="home_value" name="home_value"${ssrRenderAttr("value", unref(display).home_value)} type="number" class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, { content: "VA disability ratings range from 0-100% in 10% increments. Combined ratings use VA math, not simple addition. Ratings of 30%+ receive additional compensation for dependents." }, {
                        default: withCtx(() => [
                          createVNode("label", {
                            for: "disability_rating",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Disability Rating: " + toDisplayString(unref(display).disability_rating) + "% ", 1)
                        ]),
                        _: 1
                      }),
                      createVNode("input", {
                        id: "disability_rating",
                        name: "disability_rating",
                        value: unref(display).disability_rating,
                        type: "range",
                        min: "0",
                        max: "100",
                        step: "10",
                        "aria-valuenow": unref(display).disability_rating,
                        "aria-valuemin": "0",
                        "aria-valuemax": "100",
                        class: "mt-2 w-full"
                      }, null, 8, ["value", "aria-valuenow"]),
                      createVNode("div", {
                        class: "mt-1 flex justify-between text-xs text-gray-600 dark:text-gray-300",
                        "aria-hidden": "true"
                      }, [
                        createVNode("span", null, "0%"),
                        createVNode("span", null, "50%"),
                        createVNode("span", null, "100%")
                      ])
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode(_sfc_main$2, { content: "Veterans with 30%+ disability rating receive additional monthly compensation for each dependent (spouse, children, dependent parents)." }, {
                        default: withCtx(() => [
                          createVNode("h3", { class: "font-medium text-gray-900 dark:text-white" }, "Dependents")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("input", {
                          id: "spouse",
                          name: "has_spouse",
                          checked: unref(display).has_spouse,
                          type: "checkbox",
                          class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        }, null, 8, ["checked"]),
                        createVNode("label", {
                          for: "spouse",
                          class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                        }, " Spouse ")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "children_count",
                          class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                        }, " Number of Children "),
                        createVNode("select", {
                          id: "children_count",
                          name: "children_count",
                          value: unref(display).children_count,
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(11, (n) => {
                            return createVNode("option", {
                              key: n - 1,
                              value: n - 1
                            }, toDisplayString(n - 1), 9, ["value"]);
                          }), 64))
                        ], 8, ["value"])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "state",
                        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                      }, " State of Residence "),
                      createVNode("select", {
                        id: "state",
                        name: "state",
                        value: unref(display).state,
                        class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      }, [
                        createVNode("option", { value: "" }, "Select state..."),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.states, (name, code) => {
                          return openBlock(), createBlock("option", {
                            key: code,
                            value: code
                          }, toDisplayString(name), 9, ["value"]);
                        }), 128))
                      ], 8, ["value"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, { content: "Many states offer property tax exemptions for disabled veterans. The exemption amount varies by state and disability rating, often requiring 100% rating for full exemption." }, {
                        default: withCtx(() => [
                          createVNode("label", {
                            for: "home_value",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Home Value (for property tax exemption estimate) ")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative mt-1" }, [
                        createVNode("span", {
                          class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                          "aria-hidden": "true"
                        }, "$"),
                        createVNode("input", {
                          id: "home_value",
                          name: "home_value",
                          value: unref(display).home_value,
                          type: "number",
                          class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, null, 8, ["value"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Your Benefits</h2>`);
            if (unref(loading)) {
              _push2(`<div class="flex items-center justify-center py-12" role="status" aria-label="Calculating results"${_scopeId}><div class="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" aria-hidden="true"${_scopeId}></div><span class="sr-only"${_scopeId}>Calculating...</span></div>`);
            } else if (unref(error)) {
              _push2(`<div class="rounded-md bg-red-50 p-4"${_scopeId}><p class="text-sm text-red-700"${_scopeId}>${ssrInterpolate(unref(error))}</p></div>`);
            } else if (props.results) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30"${_scopeId}><p class="text-sm font-medium text-purple-700 dark:text-purple-300"${_scopeId}>Monthly Compensation</p><p class="text-3xl font-bold text-purple-900 dark:text-white"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                value: props.results.total_monthly_compensation,
                format: unref(formatCurrency)
              }, null, _parent2, _scopeId));
              _push2(`</p><p class="mt-1 text-sm text-purple-600 dark:text-purple-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                value: props.results.annual_compensation,
                format: unref(formatCurrency)
              }, null, _parent2, _scopeId));
              _push2(`/year (tax-free) </p></div>`);
              if (props.results.dependent_addition > 0) {
                _push2(`<div${_scopeId}><h3 class="mb-3 font-medium text-gray-900 dark:text-white"${_scopeId}>Breakdown</h3><div class="space-y-2"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-300"${_scopeId}>Base Rate (${ssrInterpolate(props.results.disability_rating)}%)</span><span class="font-medium dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(props.results.base_monthly_compensation))}</span></div><div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-300"${_scopeId}>Dependent Additions</span><span class="font-medium dark:text-white"${_scopeId}>+${ssrInterpolate(unref(formatCurrency)(props.results.dependent_addition))}</span></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (props.results.state_benefits) {
                _push2(`<div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/30"${_scopeId}><h3 class="mb-2 font-medium text-green-800 dark:text-green-300"${_scopeId}>${ssrInterpolate(__props.states[props.results.state])} Benefits </h3><ul class="space-y-2 text-sm text-green-700 dark:text-green-400"${_scopeId}><li class="flex items-center"${_scopeId}>`);
                if (props.results.state_benefits.income_tax_exempt) {
                  _push2(`<svg class="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` VA disability compensation is federal tax-free </li>`);
                if (props.results.state_benefits.state_income_tax_exempt) {
                  _push2(`<li class="flex items-center"${_scopeId}><svg class="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg> State income tax exempt </li>`);
                } else {
                  _push2(`<!---->`);
                }
                if (props.results.state_benefits.property_tax_exemption) {
                  _push2(`<li${_scopeId}><div class="flex items-start"${_scopeId}><svg class="mr-2 mt-0.5 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(props.results.state_benefits.property_tax_exemption)}</span></div>`);
                  if (props.results.state_benefits.annual_property_tax_savings > 0) {
                    _push2(`<p class="ml-6 font-medium"${_scopeId}> Est. savings: ${ssrInterpolate(unref(formatCurrency)(props.results.state_benefits.annual_property_tax_savings))}/year </p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</li>`);
                } else if (props.results.state_benefits.property_tax_min_rating) {
                  _push2(`<li${_scopeId}><span class="text-amber-700"${_scopeId}> Property tax exemption requires ${ssrInterpolate(props.results.state_benefits.property_tax_min_rating)}%+ rating </span></li>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</ul></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="rounded-lg border-2 border-purple-200 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/30"${_scopeId}><p class="text-sm font-medium text-purple-700 dark:text-purple-300"${_scopeId}>Estimated Total Annual Benefit</p><p class="text-3xl font-bold text-purple-900 dark:text-white"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                value: props.results.total_annual_benefit,
                format: unref(formatCurrency)
              }, null, _parent2, _scopeId));
              _push2(`</p></div>`);
              if (Object.values(props.results.additional_benefits).some((v) => v)) {
                _push2(`<div${_scopeId}><h3 class="mb-2 font-medium text-gray-900 dark:text-white"${_scopeId}>Additional Benefits You May Qualify For</h3><ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300"${_scopeId}>`);
                if (props.results.additional_benefits.va_healthcare) {
                  _push2(`<li${_scopeId}>VA Healthcare</li>`);
                } else {
                  _push2(`<!---->`);
                }
                if (props.results.additional_benefits.education_benefits) {
                  _push2(`<li${_scopeId}>Education Benefits</li>`);
                } else {
                  _push2(`<!---->`);
                }
                if (props.results.additional_benefits.vocational_rehabilitation) {
                  _push2(`<li${_scopeId}>Vocational Rehabilitation</li>`);
                } else {
                  _push2(`<!---->`);
                }
                if (props.results.additional_benefits.dependent_education) {
                  _push2(`<li${_scopeId}>Dependent Education Assistance</li>`);
                } else {
                  _push2(`<!---->`);
                }
                if (props.results.additional_benefits.dental_care) {
                  _push2(`<li${_scopeId}>VA Dental Care</li>`);
                } else {
                  _push2(`<!---->`);
                }
                if (props.results.additional_benefits.champ_va) {
                  _push2(`<li${_scopeId}>CHAMPVA (Family Healthcare)</li>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</ul></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$4, {
                "link-copied": unref(linkCopied),
                "show-save": !!unref(user),
                onCopy: unref(copyLink),
                onPrint: unref(printResults),
                onSave: unref(openSaveModal)
              }, null, _parent2, _scopeId));
              if (!unref(user)) {
                _push2(`<div class="text-center"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-300"${_scopeId}><a href="/register" class="font-medium text-purple-700 underline hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"${_scopeId}> Create an account </a> to save your calculations. </p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50"${_scopeId}><h3 class="text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Data Sources</h3><ul class="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-300"${_scopeId}><li${_scopeId}> VA disability compensation rates (2026, effective Dec 1, 2025): <a href="https://www.va.gov/disability/compensation-rates/veteran-rates/" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"${_scopeId}> VA.gov </a></li></ul></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              show: unref(showSaveModal),
              type: "disability",
              inputs: unref(display),
              results: props.results,
              placeholder: "e.g., My Disability Benefits",
              onClose: unref(closeSaveModal)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "VA Disability Compensation Calculator - 2025 Rates" }, {
                default: withCtx(() => [
                  createVNode("meta", {
                    name: "description",
                    content: "Calculate your VA disability compensation with 2025 rates. Includes dependent additions, state tax benefits, property tax exemptions, and additional VA benefits."
                  }),
                  createVNode("meta", {
                    property: "og:title",
                    content: "VA Disability Calculator - 2025 Compensation Rates"
                  }),
                  createVNode("meta", {
                    property: "og:description",
                    content: "Free VA disability compensation calculator with current 2025 rates. Calculate monthly benefits, state tax exemptions, and property tax savings."
                  })
                ]),
                _: 1
              }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white" }, "Disability Rating Impact Calculator"),
                    createVNode("p", { class: "mt-2 text-gray-600 dark:text-gray-300" }, " Calculate your monthly compensation and discover state-specific tax benefits based on your VA disability rating. ")
                  ]),
                  createVNode("div", { class: "grid gap-8 lg:grid-cols-2" }, [
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("h2", { class: "mb-6 text-lg font-semibold text-gray-900 dark:text-white" }, "Your Information"),
                      createVNode("div", { class: "print-show mb-6 hidden space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Disability Rating:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).disability_rating) + "%", 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Spouse:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).has_spouse ? "Yes" : "No"), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Number of Children:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).children_count), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "State of Residence:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(__props.states[unref(display).state]), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Home Value:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(formatCurrency)(unref(display).home_value)), 1)
                        ])
                      ]),
                      createVNode(unref(Form), {
                        ref_key: "formRef",
                        ref: formRef,
                        action: "/calculators/disability/calculate",
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
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, { content: "VA disability ratings range from 0-100% in 10% increments. Combined ratings use VA math, not simple addition. Ratings of 30%+ receive additional compensation for dependents." }, {
                              default: withCtx(() => [
                                createVNode("label", {
                                  for: "disability_rating",
                                  class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                                }, " Disability Rating: " + toDisplayString(unref(display).disability_rating) + "% ", 1)
                              ]),
                              _: 1
                            }),
                            createVNode("input", {
                              id: "disability_rating",
                              name: "disability_rating",
                              value: unref(display).disability_rating,
                              type: "range",
                              min: "0",
                              max: "100",
                              step: "10",
                              "aria-valuenow": unref(display).disability_rating,
                              "aria-valuemin": "0",
                              "aria-valuemax": "100",
                              class: "mt-2 w-full"
                            }, null, 8, ["value", "aria-valuenow"]),
                            createVNode("div", {
                              class: "mt-1 flex justify-between text-xs text-gray-600 dark:text-gray-300",
                              "aria-hidden": "true"
                            }, [
                              createVNode("span", null, "0%"),
                              createVNode("span", null, "50%"),
                              createVNode("span", null, "100%")
                            ])
                          ]),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode(_sfc_main$2, { content: "Veterans with 30%+ disability rating receive additional monthly compensation for each dependent (spouse, children, dependent parents)." }, {
                              default: withCtx(() => [
                                createVNode("h3", { class: "font-medium text-gray-900 dark:text-white" }, "Dependents")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("input", {
                                id: "spouse",
                                name: "has_spouse",
                                checked: unref(display).has_spouse,
                                type: "checkbox",
                                class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                              }, null, 8, ["checked"]),
                              createVNode("label", {
                                for: "spouse",
                                class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                              }, " Spouse ")
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "children_count",
                                class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                              }, " Number of Children "),
                              createVNode("select", {
                                id: "children_count",
                                name: "children_count",
                                value: unref(display).children_count,
                                class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, [
                                (openBlock(), createBlock(Fragment, null, renderList(11, (n) => {
                                  return createVNode("option", {
                                    key: n - 1,
                                    value: n - 1
                                  }, toDisplayString(n - 1), 9, ["value"]);
                                }), 64))
                              ], 8, ["value"])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "state",
                              class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                            }, " State of Residence "),
                            createVNode("select", {
                              id: "state",
                              name: "state",
                              value: unref(display).state,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            }, [
                              createVNode("option", { value: "" }, "Select state..."),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.states, (name, code) => {
                                return openBlock(), createBlock("option", {
                                  key: code,
                                  value: code
                                }, toDisplayString(name), 9, ["value"]);
                              }), 128))
                            ], 8, ["value"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, { content: "Many states offer property tax exemptions for disabled veterans. The exemption amount varies by state and disability rating, often requiring 100% rating for full exemption." }, {
                              default: withCtx(() => [
                                createVNode("label", {
                                  for: "home_value",
                                  class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                                }, " Home Value (for property tax exemption estimate) ")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "relative mt-1" }, [
                              createVNode("span", {
                                class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                                "aria-hidden": "true"
                              }, "$"),
                              createVNode("input", {
                                id: "home_value",
                                name: "home_value",
                                value: unref(display).home_value,
                                type: "number",
                                class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, null, 8, ["value"])
                            ])
                          ])
                        ]),
                        _: 1
                      }, 8, ["onInput", "onStart", "onFinish", "onError"])
                    ]),
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("h2", { class: "mb-6 text-lg font-semibold text-gray-900 dark:text-white" }, "Your Benefits"),
                      unref(loading) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-center py-12",
                        role: "status",
                        "aria-label": "Calculating results"
                      }, [
                        createVNode("div", {
                          class: "h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent",
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
                        createVNode("div", { class: "rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30" }, [
                          createVNode("p", { class: "text-sm font-medium text-purple-700 dark:text-purple-300" }, "Monthly Compensation"),
                          createVNode("p", { class: "text-3xl font-bold text-purple-900 dark:text-white" }, [
                            createVNode(_sfc_main$3, {
                              value: props.results.total_monthly_compensation,
                              format: unref(formatCurrency)
                            }, null, 8, ["value", "format"])
                          ]),
                          createVNode("p", { class: "mt-1 text-sm text-purple-600 dark:text-purple-400" }, [
                            createVNode(_sfc_main$3, {
                              value: props.results.annual_compensation,
                              format: unref(formatCurrency)
                            }, null, 8, ["value", "format"]),
                            createTextVNode("/year (tax-free) ")
                          ])
                        ]),
                        props.results.dependent_addition > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("h3", { class: "mb-3 font-medium text-gray-900 dark:text-white" }, "Breakdown"),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-300" }, "Base Rate (" + toDisplayString(props.results.disability_rating) + "%)", 1),
                              createVNode("span", { class: "font-medium dark:text-white" }, toDisplayString(unref(formatCurrency)(props.results.base_monthly_compensation)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-300" }, "Dependent Additions"),
                              createVNode("span", { class: "font-medium dark:text-white" }, "+" + toDisplayString(unref(formatCurrency)(props.results.dependent_addition)), 1)
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        props.results.state_benefits ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "rounded-lg bg-green-50 p-4 dark:bg-green-900/30"
                        }, [
                          createVNode("h3", { class: "mb-2 font-medium text-green-800 dark:text-green-300" }, toDisplayString(__props.states[props.results.state]) + " Benefits ", 1),
                          createVNode("ul", { class: "space-y-2 text-sm text-green-700 dark:text-green-400" }, [
                            createVNode("li", { class: "flex items-center" }, [
                              props.results.state_benefits.income_tax_exempt ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "mr-2 h-4 w-4 text-green-500",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                  "clip-rule": "evenodd"
                                })
                              ])) : createCommentVNode("", true),
                              createTextVNode(" VA disability compensation is federal tax-free ")
                            ]),
                            props.results.state_benefits.state_income_tax_exempt ? (openBlock(), createBlock("li", {
                              key: 0,
                              class: "flex items-center"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "mr-2 h-4 w-4 text-green-500",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                  "clip-rule": "evenodd"
                                })
                              ])),
                              createTextVNode(" State income tax exempt ")
                            ])) : createCommentVNode("", true),
                            props.results.state_benefits.property_tax_exemption ? (openBlock(), createBlock("li", { key: 1 }, [
                              createVNode("div", { class: "flex items-start" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "mr-2 mt-0.5 h-4 w-4 text-green-500",
                                  fill: "currentColor",
                                  viewBox: "0 0 20 20"
                                }, [
                                  createVNode("path", {
                                    "fill-rule": "evenodd",
                                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                    "clip-rule": "evenodd"
                                  })
                                ])),
                                createVNode("span", null, toDisplayString(props.results.state_benefits.property_tax_exemption), 1)
                              ]),
                              props.results.state_benefits.annual_property_tax_savings > 0 ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "ml-6 font-medium"
                              }, " Est. savings: " + toDisplayString(unref(formatCurrency)(props.results.state_benefits.annual_property_tax_savings)) + "/year ", 1)) : createCommentVNode("", true)
                            ])) : props.results.state_benefits.property_tax_min_rating ? (openBlock(), createBlock("li", { key: 2 }, [
                              createVNode("span", { class: "text-amber-700" }, " Property tax exemption requires " + toDisplayString(props.results.state_benefits.property_tax_min_rating) + "%+ rating ", 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "rounded-lg border-2 border-purple-200 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/30" }, [
                          createVNode("p", { class: "text-sm font-medium text-purple-700 dark:text-purple-300" }, "Estimated Total Annual Benefit"),
                          createVNode("p", { class: "text-3xl font-bold text-purple-900 dark:text-white" }, [
                            createVNode(_sfc_main$3, {
                              value: props.results.total_annual_benefit,
                              format: unref(formatCurrency)
                            }, null, 8, ["value", "format"])
                          ])
                        ]),
                        Object.values(props.results.additional_benefits).some((v) => v) ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode("h3", { class: "mb-2 font-medium text-gray-900 dark:text-white" }, "Additional Benefits You May Qualify For"),
                          createVNode("ul", { class: "space-y-1 text-sm text-gray-600 dark:text-gray-300" }, [
                            props.results.additional_benefits.va_healthcare ? (openBlock(), createBlock("li", { key: 0 }, "VA Healthcare")) : createCommentVNode("", true),
                            props.results.additional_benefits.education_benefits ? (openBlock(), createBlock("li", { key: 1 }, "Education Benefits")) : createCommentVNode("", true),
                            props.results.additional_benefits.vocational_rehabilitation ? (openBlock(), createBlock("li", { key: 2 }, "Vocational Rehabilitation")) : createCommentVNode("", true),
                            props.results.additional_benefits.dependent_education ? (openBlock(), createBlock("li", { key: 3 }, "Dependent Education Assistance")) : createCommentVNode("", true),
                            props.results.additional_benefits.dental_care ? (openBlock(), createBlock("li", { key: 4 }, "VA Dental Care")) : createCommentVNode("", true),
                            props.results.additional_benefits.champ_va ? (openBlock(), createBlock("li", { key: 5 }, "CHAMPVA (Family Healthcare)")) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode(_sfc_main$4, {
                          "link-copied": unref(linkCopied),
                          "show-save": !!unref(user),
                          onCopy: unref(copyLink),
                          onPrint: unref(printResults),
                          onSave: unref(openSaveModal)
                        }, null, 8, ["link-copied", "show-save", "onCopy", "onPrint", "onSave"]),
                        !unref(user) ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "text-center"
                        }, [
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-300" }, [
                            createVNode("a", {
                              href: "/register",
                              class: "font-medium text-purple-700 underline hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
                            }, " Create an account "),
                            createTextVNode(" to save your calculations. ")
                          ])
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50" }, [
                    createVNode("h3", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, "Data Sources"),
                    createVNode("ul", { class: "mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-300" }, [
                      createVNode("li", null, [
                        createTextVNode(" VA disability compensation rates (2026, effective Dec 1, 2025): "),
                        createVNode("a", {
                          href: "https://www.va.gov/disability/compensation-rates/veteran-rates/",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          class: "text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        }, " VA.gov ")
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$5, {
                show: unref(showSaveModal),
                type: "disability",
                inputs: unref(display),
                results: props.results,
                placeholder: "e.g., My Disability Benefits",
                onClose: unref(closeSaveModal)
              }, null, 8, ["show", "inputs", "results", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calculators/Disability.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
