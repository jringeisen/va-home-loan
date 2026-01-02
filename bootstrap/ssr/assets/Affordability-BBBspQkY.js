import { computed, withCtx, unref, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Head, Form } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTISP9sP.js";
import { u as useCalculator, _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5 } from "./useCalculator-DFTlb9cV.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "Affordability",
  __ssrInlineRender: true,
  props: {
    results: Object,
    inputs: Object
  },
  setup(__props) {
    const props = __props;
    const defaultValues = {
      annual_income: 75e3,
      monthly_debts: 500,
      down_payment: 1e4,
      interest_rate: 6.5,
      loan_term_years: 30,
      is_first_use: true,
      disability_rating: 0,
      has_spouse: false,
      children_count: 0
    };
    const updateUrl = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams();
      params.set("income", display.annual_income);
      params.set("debts", display.monthly_debts);
      params.set("down", display.down_payment);
      params.set("rate", display.interest_rate);
      params.set("term", display.loan_term_years);
      if (!display.is_first_use) params.set("first", "false");
      if (display.disability_rating > 0) params.set("rating", display.disability_rating);
      if (display.has_spouse) params.set("spouse", "true");
      if (display.children_count > 0) params.set("children", display.children_count);
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
    const saveInputs = computed(() => {
      const dependents = (display.has_spouse ? 1 : 0) + (display.children_count || 0);
      return { ...display, disability_dependents: dependents };
    });
    const transformData = (data) => ({
      ...data,
      is_first_use: data.is_first_use === "on" || data.is_first_use === true,
      has_spouse: data.has_spouse === "on" || data.has_spouse === true,
      annual_income: parseFloat(data.annual_income) || 0,
      monthly_debts: parseFloat(data.monthly_debts) || 0,
      down_payment: parseFloat(data.down_payment) || 0,
      interest_rate: parseFloat(data.interest_rate) || 0,
      loan_term_years: parseInt(data.loan_term_years) || 30,
      disability_rating: parseInt(data.disability_rating) || 0,
      children_count: parseInt(data.children_count) || 0,
      disability_dependents: (data.has_spouse === "on" || data.has_spouse === true ? 1 : 0) + (parseInt(data.children_count) || 0)
    });
    const recommendedPurchasePrice = () => {
      if (!props.results) return null;
      const monthlyIncome = display.annual_income / 12 + (props.results.disability_income || 0);
      const maxHousingPayment = monthlyIncome * 0.3;
      if (maxHousingPayment <= 0) return 0;
      const propertyTaxRate = 0.011;
      const insuranceRate = 4e-3;
      const monthlyTaxInsuranceRate = (propertyTaxRate + insuranceRate) / 12;
      const monthlyRate = display.interest_rate / 100 / 12;
      const numPayments = display.loan_term_years * 12;
      let paymentFactor;
      if (monthlyRate === 0) {
        paymentFactor = 1 / numPayments;
      } else {
        paymentFactor = monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      }
      const downPayment = display.down_payment;
      const recommendedPrice = (maxHousingPayment + downPayment * paymentFactor) / (paymentFactor + monthlyTaxInsuranceRate);
      return Math.max(0, Math.round(recommendedPrice));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "VA Loan Affordability Calculator" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<meta name="description" content="Calculate your maximum VA home loan purchase price based on income, debts, and VA benefits. Includes funding fee calculations, disability income, and no PMI savings."${_scopeId2}><meta property="og:title" content="VA Loan Affordability Calculator - How Much Home Can You Afford?"${_scopeId2}><meta property="og:description" content="Free VA loan affordability calculator for veterans. Factor in disability income, funding fee exemptions, and no PMI to find your max home price."${_scopeId2}>`);
                } else {
                  return [
                    createVNode("meta", {
                      name: "description",
                      content: "Calculate your maximum VA home loan purchase price based on income, debts, and VA benefits. Includes funding fee calculations, disability income, and no PMI savings."
                    }),
                    createVNode("meta", {
                      property: "og:title",
                      content: "VA Loan Affordability Calculator - How Much Home Can You Afford?"
                    }),
                    createVNode("meta", {
                      property: "og:description",
                      content: "Free VA loan affordability calculator for veterans. Factor in disability income, funding fee exemptions, and no PMI to find your max home price."
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white"${_scopeId}>VA Loan Affordability Calculator</h1><p class="mt-2 text-gray-600 dark:text-gray-300"${_scopeId}> Calculate your maximum home purchase price based on your income, debts, and VA loan benefits. </p></div><div class="grid gap-8 lg:grid-cols-2"${_scopeId}><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Your Information</h2><div class="print-show mb-6 hidden space-y-2 text-sm"${_scopeId}><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Annual Gross Income:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(unref(display).annual_income))}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Monthly Debt Payments:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(unref(display).monthly_debts))}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Down Payment:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(unref(display).down_payment))}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Interest Rate:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).interest_rate)}%</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Loan Term:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).loan_term_years)} years</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>First-time VA Loan Use:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).is_first_use ? "Yes" : "No")}</span></div><div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>VA Disability Rating:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).disability_rating)}%</span></div>`);
            if (unref(display).disability_rating >= 30) {
              _push2(`<div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Spouse:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).has_spouse ? "Yes" : "No")}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(display).disability_rating >= 30) {
              _push2(`<div class="flex justify-between border-b pb-1"${_scopeId}><span class="text-gray-600"${_scopeId}>Children:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(display).children_count)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "formRef",
              ref: formRef,
              action: "/calculators/affordability/calculate",
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
                  _push3(`<div${_scopeId2}><label for="annual_income" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}> Annual Gross Income </label><div class="relative mt-1"${_scopeId2}><span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true"${_scopeId2}>$</span><input id="annual_income" type="number" name="annual_income"${ssrRenderAttr("value", unref(display).annual_income)} class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}></div></div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { content: "Your total monthly debt payments affect your Debt-to-Income (DTI) ratio. VA loans typically allow up to 41% DTI, though some lenders may approve higher." }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label for="monthly_debts" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId3}> Monthly Debt Payments </label>`);
                      } else {
                        return [
                          createVNode("label", {
                            for: "monthly_debts",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Monthly Debt Payments ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p id="monthly_debts_desc" class="text-xs text-gray-600 dark:text-gray-300"${_scopeId2}>Car loans, credit cards, student loans, etc.</p><div class="relative mt-1"${_scopeId2}><span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true"${_scopeId2}>$</span><input id="monthly_debts" type="number" name="monthly_debts"${ssrRenderAttr("value", unref(display).monthly_debts)} aria-describedby="monthly_debts_desc" class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}></div></div><div${_scopeId2}><label for="down_payment" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}> Down Payment </label><div class="relative mt-1"${_scopeId2}><span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true"${_scopeId2}>$</span><input id="down_payment" type="number" name="down_payment"${ssrRenderAttr("value", unref(display).down_payment)} class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}></div></div><div${_scopeId2}><label for="interest_rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}> Interest Rate </label><div class="relative mt-1"${_scopeId2}><input id="interest_rate" type="number" name="interest_rate"${ssrRenderAttr("value", unref(display).interest_rate)} step="0.125" class="block w-full rounded-md border-gray-300 pr-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}><span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 dark:text-gray-300" aria-hidden="true"${_scopeId2}>%</span></div></div><div${_scopeId2}><label for="loan_term_years" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}> Loan Term </label><select id="loan_term_years" name="loan_term_years"${ssrRenderAttr("value", unref(display).loan_term_years)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}><option value="15"${_scopeId2}>15 years</option><option value="20"${_scopeId2}>20 years</option><option value="25"${_scopeId2}>25 years</option><option value="30"${_scopeId2}>30 years</option></select></div><div class="space-y-4 border-t pt-4 dark:border-gray-700"${_scopeId2}><h3 class="font-medium text-gray-900 dark:text-white"${_scopeId2}>VA Benefits</h3><div class="flex items-center"${_scopeId2}><input id="first_use" type="checkbox" name="is_first_use"${ssrIncludeBooleanAttr(unref(display).is_first_use) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { content: "First-time VA loan users pay a lower funding fee (2.15% vs 3.3% for subsequent use with no down payment). Your entitlement is restored when you pay off a previous VA loan." }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label for="first_use" class="ml-2 text-sm text-gray-700 dark:text-gray-300"${_scopeId3}> First-time VA loan use </label>`);
                      } else {
                        return [
                          createVNode("label", {
                            for: "first_use",
                            class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                          }, " First-time VA loan use ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { content: "Veterans with a 10%+ disability rating are exempt from the VA funding fee. Ratings of 30%+ also receive additional monthly compensation for dependents." }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label for="disability_rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId3}> VA Disability Rating: ${ssrInterpolate(unref(display).disability_rating)}% </label>`);
                      } else {
                        return [
                          createVNode("label", {
                            for: "disability_rating",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " VA Disability Rating: " + toDisplayString(unref(display).disability_rating) + "% ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<input id="disability_rating" type="range" name="disability_rating"${ssrRenderAttr("value", unref(display).disability_rating)} min="0" max="100" step="10"${ssrRenderAttr("aria-valuenow", unref(display).disability_rating)} aria-valuemin="0" aria-valuemax="100" class="mt-2 w-full"${_scopeId2}><div class="mt-1 flex justify-between text-xs text-gray-600 dark:text-gray-300" aria-hidden="true"${_scopeId2}><span${_scopeId2}>0%</span><span${_scopeId2}>50%</span><span${_scopeId2}>100%</span></div></div>`);
                  if (unref(display).disability_rating >= 30) {
                    _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center"${_scopeId2}><input id="has_spouse" type="checkbox" name="has_spouse"${ssrIncludeBooleanAttr(unref(display).has_spouse) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"${_scopeId2}><label for="has_spouse" class="ml-2 text-sm text-gray-700 dark:text-gray-300"${_scopeId2}> Spouse </label></div><div${_scopeId2}><label for="children_count" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId2}> Number of Children </label><input id="children_count" type="number" name="children_count"${ssrRenderAttr("value", unref(display).children_count)} min="0" max="10" class="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId2}></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "annual_income",
                        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                      }, " Annual Gross Income "),
                      createVNode("div", { class: "relative mt-1" }, [
                        createVNode("span", {
                          class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                          "aria-hidden": "true"
                        }, "$"),
                        createVNode("input", {
                          id: "annual_income",
                          type: "number",
                          name: "annual_income",
                          value: unref(display).annual_income,
                          class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, null, 8, ["value"])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, { content: "Your total monthly debt payments affect your Debt-to-Income (DTI) ratio. VA loans typically allow up to 41% DTI, though some lenders may approve higher." }, {
                        default: withCtx(() => [
                          createVNode("label", {
                            for: "monthly_debts",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Monthly Debt Payments ")
                        ]),
                        _: 1
                      }),
                      createVNode("p", {
                        id: "monthly_debts_desc",
                        class: "text-xs text-gray-600 dark:text-gray-300"
                      }, "Car loans, credit cards, student loans, etc."),
                      createVNode("div", { class: "relative mt-1" }, [
                        createVNode("span", {
                          class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                          "aria-hidden": "true"
                        }, "$"),
                        createVNode("input", {
                          id: "monthly_debts",
                          type: "number",
                          name: "monthly_debts",
                          value: unref(display).monthly_debts,
                          "aria-describedby": "monthly_debts_desc",
                          class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, null, 8, ["value"])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "down_payment",
                        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                      }, " Down Payment "),
                      createVNode("div", { class: "relative mt-1" }, [
                        createVNode("span", {
                          class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                          "aria-hidden": "true"
                        }, "$"),
                        createVNode("input", {
                          id: "down_payment",
                          type: "number",
                          name: "down_payment",
                          value: unref(display).down_payment,
                          class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, null, 8, ["value"])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "interest_rate",
                        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                      }, " Interest Rate "),
                      createVNode("div", { class: "relative mt-1" }, [
                        createVNode("input", {
                          id: "interest_rate",
                          type: "number",
                          name: "interest_rate",
                          value: unref(display).interest_rate,
                          step: "0.125",
                          class: "block w-full rounded-md border-gray-300 pr-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        }, null, 8, ["value"]),
                        createVNode("span", {
                          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 dark:text-gray-300",
                          "aria-hidden": "true"
                        }, "%")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "loan_term_years",
                        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                      }, " Loan Term "),
                      createVNode("select", {
                        id: "loan_term_years",
                        name: "loan_term_years",
                        value: unref(display).loan_term_years,
                        class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      }, [
                        createVNode("option", { value: "15" }, "15 years"),
                        createVNode("option", { value: "20" }, "20 years"),
                        createVNode("option", { value: "25" }, "25 years"),
                        createVNode("option", { value: "30" }, "30 years")
                      ], 8, ["value"])
                    ]),
                    createVNode("div", { class: "space-y-4 border-t pt-4 dark:border-gray-700" }, [
                      createVNode("h3", { class: "font-medium text-gray-900 dark:text-white" }, "VA Benefits"),
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("input", {
                          id: "first_use",
                          type: "checkbox",
                          name: "is_first_use",
                          checked: unref(display).is_first_use,
                          class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        }, null, 8, ["checked"]),
                        createVNode(_sfc_main$2, { content: "First-time VA loan users pay a lower funding fee (2.15% vs 3.3% for subsequent use with no down payment). Your entitlement is restored when you pay off a previous VA loan." }, {
                          default: withCtx(() => [
                            createVNode("label", {
                              for: "first_use",
                              class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                            }, " First-time VA loan use ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$2, { content: "Veterans with a 10%+ disability rating are exempt from the VA funding fee. Ratings of 30%+ also receive additional monthly compensation for dependents." }, {
                          default: withCtx(() => [
                            createVNode("label", {
                              for: "disability_rating",
                              class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                            }, " VA Disability Rating: " + toDisplayString(unref(display).disability_rating) + "% ", 1)
                          ]),
                          _: 1
                        }),
                        createVNode("input", {
                          id: "disability_rating",
                          type: "range",
                          name: "disability_rating",
                          value: unref(display).disability_rating,
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
                      unref(display).disability_rating >= 30 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("input", {
                            id: "has_spouse",
                            type: "checkbox",
                            name: "has_spouse",
                            checked: unref(display).has_spouse,
                            class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                          }, null, 8, ["checked"]),
                          createVNode("label", {
                            for: "has_spouse",
                            class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                          }, " Spouse ")
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "children_count",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Number of Children "),
                          createVNode("input", {
                            id: "children_count",
                            type: "number",
                            name: "children_count",
                            value: unref(display).children_count,
                            min: "0",
                            max: "10",
                            class: "mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          }, null, 8, ["value"])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Your Results</h2>`);
            if (unref(loading)) {
              _push2(`<div class="flex items-center justify-center py-12" role="status" aria-label="Calculating results"${_scopeId}><div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" aria-hidden="true"${_scopeId}></div><span class="sr-only"${_scopeId}>Calculating...</span></div>`);
            } else if (unref(error)) {
              _push2(`<div class="rounded-md bg-red-50 p-4"${_scopeId}><p class="text-sm text-red-700"${_scopeId}>${ssrInterpolate(unref(error))}</p></div>`);
            } else if (props.results) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30"${_scopeId}><p class="text-sm font-medium text-blue-700 dark:text-blue-300"${_scopeId}>Maximum</p><p class="text-2xl font-bold text-blue-900 dark:text-white sm:text-3xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                value: props.results.max_purchase_price,
                format: unref(formatCurrency)
              }, null, _parent2, _scopeId));
              _push2(`</p><p class="mt-1 text-xs text-blue-600 dark:text-blue-400"${_scopeId}>Based on 41% DTI</p></div><div class="rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/30"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { content: "Based on Dave Ramsey's recommendation to keep your housing payment at no more than 30% of your gross monthly income." }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="text-sm font-medium text-green-700 dark:text-green-300"${_scopeId2}>Recommended</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "text-sm font-medium text-green-700 dark:text-green-300" }, "Recommended")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p class="text-2xl font-bold text-green-900 dark:text-white sm:text-3xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                value: recommendedPurchasePrice(),
                format: unref(formatCurrency)
              }, null, _parent2, _scopeId));
              _push2(`</p><p class="mt-1 text-xs text-green-800 dark:text-green-200"${_scopeId}>Based on 30% of income</p></div></div><div${_scopeId}><h3 class="mb-3 font-medium text-gray-900 dark:text-white"${_scopeId}>Monthly Payment Breakdown</h3><div class="space-y-2"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-300"${_scopeId}>Principal &amp; Interest</span><span class="font-medium dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(props.results.monthly_principal_interest))}</span></div><div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-300"${_scopeId}>Property Taxes (est.)</span><span class="font-medium dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(props.results.monthly_taxes))}</span></div><div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-300"${_scopeId}>Home Insurance (est.)</span><span class="font-medium dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(props.results.monthly_insurance))}</span></div><div class="flex justify-between border-t pt-2 dark:border-gray-700"${_scopeId}><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Total Monthly Payment</span><span class="font-bold text-blue-600 dark:text-blue-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                value: props.results.monthly_payment,
                format: unref(formatCurrency)
              }, null, _parent2, _scopeId));
              _push2(`</span></div></div></div>`);
              if (props.results.disability_income > 0) {
                _push2(`<div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30"${_scopeId}><h3 class="mb-2 font-medium text-purple-800 dark:text-purple-300"${_scopeId}>VA Disability Income</h3><p class="text-2xl font-bold text-purple-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(props.results.disability_income))}/mo </p><p class="mt-1 text-sm text-purple-600 dark:text-purple-400"${_scopeId}> Tax-free income added to your qualification </p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/30"${_scopeId}><h3 class="mb-2 font-medium text-green-800 dark:text-green-300"${_scopeId}>VA Loan Benefits</h3><ul class="space-y-1 text-sm text-green-700 dark:text-green-400"${_scopeId}>`);
              if (props.results.no_pmi) {
                _push2(`<li${_scopeId}>No Private Mortgage Insurance (PMI)</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<li${_scopeId}> VA Funding Fee: ${ssrInterpolate(unref(formatCurrency)(props.results.funding_fee))} `);
              if (props.results.funding_fee_exempt) {
                _push2(`<span class="font-medium"${_scopeId}>(Exempt - 10%+ disability)</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li></ul></div><div class="text-sm text-gray-600 dark:text-gray-300"${_scopeId}><p${_scopeId}>Loan Amount: ${ssrInterpolate(unref(formatCurrency)(props.results.max_loan_amount))} (after ${ssrInterpolate(unref(formatCurrency)(unref(display).down_payment))} down)</p>`);
              _push2(ssrRenderComponent(_sfc_main$2, { content: "DTI measures your total monthly debts divided by gross monthly income. VA loans typically allow up to 41% DTI." }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p${_scopeId2}>Debt-to-Income Ratio: ${ssrInterpolate(props.results.dti_ratio)}%</p>`);
                  } else {
                    return [
                      createVNode("p", null, "Debt-to-Income Ratio: " + toDisplayString(props.results.dti_ratio) + "%", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                "link-copied": unref(linkCopied),
                "show-save": !!unref(user),
                onCopy: unref(copyLink),
                onPrint: unref(printResults),
                onSave: unref(openSaveModal)
              }, null, _parent2, _scopeId));
              if (!unref(user)) {
                _push2(`<div class="text-center"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-300"${_scopeId}><a href="/register" class="font-medium text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"${_scopeId}> Create an account </a> to save your calculations. </p></div>`);
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
              type: "affordability",
              inputs: saveInputs.value,
              results: props.results,
              placeholder: "e.g., Dream Home Scenario",
              onClose: unref(closeSaveModal)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "VA Loan Affordability Calculator" }, {
                default: withCtx(() => [
                  createVNode("meta", {
                    name: "description",
                    content: "Calculate your maximum VA home loan purchase price based on income, debts, and VA benefits. Includes funding fee calculations, disability income, and no PMI savings."
                  }),
                  createVNode("meta", {
                    property: "og:title",
                    content: "VA Loan Affordability Calculator - How Much Home Can You Afford?"
                  }),
                  createVNode("meta", {
                    property: "og:description",
                    content: "Free VA loan affordability calculator for veterans. Factor in disability income, funding fee exemptions, and no PMI to find your max home price."
                  })
                ]),
                _: 1
              }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white" }, "VA Loan Affordability Calculator"),
                    createVNode("p", { class: "mt-2 text-gray-600 dark:text-gray-300" }, " Calculate your maximum home purchase price based on your income, debts, and VA loan benefits. ")
                  ]),
                  createVNode("div", { class: "grid gap-8 lg:grid-cols-2" }, [
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("h2", { class: "mb-6 text-lg font-semibold text-gray-900 dark:text-white" }, "Your Information"),
                      createVNode("div", { class: "print-show mb-6 hidden space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Annual Gross Income:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(formatCurrency)(unref(display).annual_income)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Monthly Debt Payments:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(formatCurrency)(unref(display).monthly_debts)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Down Payment:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(formatCurrency)(unref(display).down_payment)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Interest Rate:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).interest_rate) + "%", 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "Loan Term:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).loan_term_years) + " years", 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "First-time VA Loan Use:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).is_first_use ? "Yes" : "No"), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between border-b pb-1" }, [
                          createVNode("span", { class: "text-gray-600" }, "VA Disability Rating:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).disability_rating) + "%", 1)
                        ]),
                        unref(display).disability_rating >= 30 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between border-b pb-1"
                        }, [
                          createVNode("span", { class: "text-gray-600" }, "Spouse:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).has_spouse ? "Yes" : "No"), 1)
                        ])) : createCommentVNode("", true),
                        unref(display).disability_rating >= 30 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between border-b pb-1"
                        }, [
                          createVNode("span", { class: "text-gray-600" }, "Children:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(display).children_count), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(Form), {
                        ref_key: "formRef",
                        ref: formRef,
                        action: "/calculators/affordability/calculate",
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
                            createVNode("label", {
                              for: "annual_income",
                              class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                            }, " Annual Gross Income "),
                            createVNode("div", { class: "relative mt-1" }, [
                              createVNode("span", {
                                class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                                "aria-hidden": "true"
                              }, "$"),
                              createVNode("input", {
                                id: "annual_income",
                                type: "number",
                                name: "annual_income",
                                value: unref(display).annual_income,
                                class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, null, 8, ["value"])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, { content: "Your total monthly debt payments affect your Debt-to-Income (DTI) ratio. VA loans typically allow up to 41% DTI, though some lenders may approve higher." }, {
                              default: withCtx(() => [
                                createVNode("label", {
                                  for: "monthly_debts",
                                  class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                                }, " Monthly Debt Payments ")
                              ]),
                              _: 1
                            }),
                            createVNode("p", {
                              id: "monthly_debts_desc",
                              class: "text-xs text-gray-600 dark:text-gray-300"
                            }, "Car loans, credit cards, student loans, etc."),
                            createVNode("div", { class: "relative mt-1" }, [
                              createVNode("span", {
                                class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                                "aria-hidden": "true"
                              }, "$"),
                              createVNode("input", {
                                id: "monthly_debts",
                                type: "number",
                                name: "monthly_debts",
                                value: unref(display).monthly_debts,
                                "aria-describedby": "monthly_debts_desc",
                                class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, null, 8, ["value"])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "down_payment",
                              class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                            }, " Down Payment "),
                            createVNode("div", { class: "relative mt-1" }, [
                              createVNode("span", {
                                class: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300",
                                "aria-hidden": "true"
                              }, "$"),
                              createVNode("input", {
                                id: "down_payment",
                                type: "number",
                                name: "down_payment",
                                value: unref(display).down_payment,
                                class: "block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, null, 8, ["value"])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "interest_rate",
                              class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                            }, " Interest Rate "),
                            createVNode("div", { class: "relative mt-1" }, [
                              createVNode("input", {
                                id: "interest_rate",
                                type: "number",
                                name: "interest_rate",
                                value: unref(display).interest_rate,
                                step: "0.125",
                                class: "block w-full rounded-md border-gray-300 pr-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              }, null, 8, ["value"]),
                              createVNode("span", {
                                class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 dark:text-gray-300",
                                "aria-hidden": "true"
                              }, "%")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "loan_term_years",
                              class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                            }, " Loan Term "),
                            createVNode("select", {
                              id: "loan_term_years",
                              name: "loan_term_years",
                              value: unref(display).loan_term_years,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            }, [
                              createVNode("option", { value: "15" }, "15 years"),
                              createVNode("option", { value: "20" }, "20 years"),
                              createVNode("option", { value: "25" }, "25 years"),
                              createVNode("option", { value: "30" }, "30 years")
                            ], 8, ["value"])
                          ]),
                          createVNode("div", { class: "space-y-4 border-t pt-4 dark:border-gray-700" }, [
                            createVNode("h3", { class: "font-medium text-gray-900 dark:text-white" }, "VA Benefits"),
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("input", {
                                id: "first_use",
                                type: "checkbox",
                                name: "is_first_use",
                                checked: unref(display).is_first_use,
                                class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                              }, null, 8, ["checked"]),
                              createVNode(_sfc_main$2, { content: "First-time VA loan users pay a lower funding fee (2.15% vs 3.3% for subsequent use with no down payment). Your entitlement is restored when you pay off a previous VA loan." }, {
                                default: withCtx(() => [
                                  createVNode("label", {
                                    for: "first_use",
                                    class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                                  }, " First-time VA loan use ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, { content: "Veterans with a 10%+ disability rating are exempt from the VA funding fee. Ratings of 30%+ also receive additional monthly compensation for dependents." }, {
                                default: withCtx(() => [
                                  createVNode("label", {
                                    for: "disability_rating",
                                    class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                                  }, " VA Disability Rating: " + toDisplayString(unref(display).disability_rating) + "% ", 1)
                                ]),
                                _: 1
                              }),
                              createVNode("input", {
                                id: "disability_rating",
                                type: "range",
                                name: "disability_rating",
                                value: unref(display).disability_rating,
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
                            unref(display).disability_rating >= 30 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-3"
                            }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("input", {
                                  id: "has_spouse",
                                  type: "checkbox",
                                  name: "has_spouse",
                                  checked: unref(display).has_spouse,
                                  class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                }, null, 8, ["checked"]),
                                createVNode("label", {
                                  for: "has_spouse",
                                  class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                                }, " Spouse ")
                              ]),
                              createVNode("div", null, [
                                createVNode("label", {
                                  for: "children_count",
                                  class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                                }, " Number of Children "),
                                createVNode("input", {
                                  id: "children_count",
                                  type: "number",
                                  name: "children_count",
                                  value: unref(display).children_count,
                                  min: "0",
                                  max: "10",
                                  class: "mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                }, null, 8, ["value"])
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }, 8, ["onInput", "onStart", "onFinish", "onError"])
                    ]),
                    createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                      createVNode("h2", { class: "mb-6 text-lg font-semibold text-gray-900 dark:text-white" }, "Your Results"),
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
                        createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                          createVNode("div", { class: "rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30" }, [
                            createVNode("p", { class: "text-sm font-medium text-blue-700 dark:text-blue-300" }, "Maximum"),
                            createVNode("p", { class: "text-2xl font-bold text-blue-900 dark:text-white sm:text-3xl" }, [
                              createVNode(_sfc_main$3, {
                                value: props.results.max_purchase_price,
                                format: unref(formatCurrency)
                              }, null, 8, ["value", "format"])
                            ]),
                            createVNode("p", { class: "mt-1 text-xs text-blue-600 dark:text-blue-400" }, "Based on 41% DTI")
                          ]),
                          createVNode("div", { class: "rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/30" }, [
                            createVNode(_sfc_main$2, { content: "Based on Dave Ramsey's recommendation to keep your housing payment at no more than 30% of your gross monthly income." }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-sm font-medium text-green-700 dark:text-green-300" }, "Recommended")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "text-2xl font-bold text-green-900 dark:text-white sm:text-3xl" }, [
                              createVNode(_sfc_main$3, {
                                value: recommendedPurchasePrice(),
                                format: unref(formatCurrency)
                              }, null, 8, ["value", "format"])
                            ]),
                            createVNode("p", { class: "mt-1 text-xs text-green-800 dark:text-green-200" }, "Based on 30% of income")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "mb-3 font-medium text-gray-900 dark:text-white" }, "Monthly Payment Breakdown"),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-300" }, "Principal & Interest"),
                              createVNode("span", { class: "font-medium dark:text-white" }, toDisplayString(unref(formatCurrency)(props.results.monthly_principal_interest)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-300" }, "Property Taxes (est.)"),
                              createVNode("span", { class: "font-medium dark:text-white" }, toDisplayString(unref(formatCurrency)(props.results.monthly_taxes)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-300" }, "Home Insurance (est.)"),
                              createVNode("span", { class: "font-medium dark:text-white" }, toDisplayString(unref(formatCurrency)(props.results.monthly_insurance)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between border-t pt-2 dark:border-gray-700" }, [
                              createVNode("span", { class: "font-semibold text-gray-900 dark:text-white" }, "Total Monthly Payment"),
                              createVNode("span", { class: "font-bold text-blue-600 dark:text-blue-400" }, [
                                createVNode(_sfc_main$3, {
                                  value: props.results.monthly_payment,
                                  format: unref(formatCurrency)
                                }, null, 8, ["value", "format"])
                              ])
                            ])
                          ])
                        ]),
                        props.results.disability_income > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30"
                        }, [
                          createVNode("h3", { class: "mb-2 font-medium text-purple-800 dark:text-purple-300" }, "VA Disability Income"),
                          createVNode("p", { class: "text-2xl font-bold text-purple-900 dark:text-white" }, toDisplayString(unref(formatCurrency)(props.results.disability_income)) + "/mo ", 1),
                          createVNode("p", { class: "mt-1 text-sm text-purple-600 dark:text-purple-400" }, " Tax-free income added to your qualification ")
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "rounded-lg bg-green-50 p-4 dark:bg-green-900/30" }, [
                          createVNode("h3", { class: "mb-2 font-medium text-green-800 dark:text-green-300" }, "VA Loan Benefits"),
                          createVNode("ul", { class: "space-y-1 text-sm text-green-700 dark:text-green-400" }, [
                            props.results.no_pmi ? (openBlock(), createBlock("li", { key: 0 }, "No Private Mortgage Insurance (PMI)")) : createCommentVNode("", true),
                            createVNode("li", null, [
                              createTextVNode(" VA Funding Fee: " + toDisplayString(unref(formatCurrency)(props.results.funding_fee)) + " ", 1),
                              props.results.funding_fee_exempt ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "font-medium"
                              }, "(Exempt - 10%+ disability)")) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-300" }, [
                          createVNode("p", null, "Loan Amount: " + toDisplayString(unref(formatCurrency)(props.results.max_loan_amount)) + " (after " + toDisplayString(unref(formatCurrency)(unref(display).down_payment)) + " down)", 1),
                          createVNode(_sfc_main$2, { content: "DTI measures your total monthly debts divided by gross monthly income. VA loans typically allow up to 41% DTI." }, {
                            default: withCtx(() => [
                              createVNode("p", null, "Debt-to-Income Ratio: " + toDisplayString(props.results.dti_ratio) + "%", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_sfc_main$4, {
                          "link-copied": unref(linkCopied),
                          "show-save": !!unref(user),
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
                              class: "font-medium text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
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
                type: "affordability",
                inputs: saveInputs.value,
                results: props.results,
                placeholder: "e.g., Dream Home Scenario",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calculators/Affordability.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
