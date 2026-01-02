import { ref, mergeProps, useSSRContext, watch, onMounted, computed, unref, withCtx, createVNode, withDirectives, vModelText, toDisplayString, reactive } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Form } from "@inertiajs/vue3";
const _sfc_main$3 = {
  __name: "Tooltip",
  __ssrInlineRender: true,
  props: {
    content: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: "top",
      validator: (value) => ["top", "bottom", "left", "right"].includes(value)
    }
  },
  setup(__props) {
    const showTooltip = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "relative inline-flex items-center" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<button type="button" aria-label="More information"${ssrRenderAttr("aria-expanded", showTooltip.value)} class="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"><svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"></path></svg></button>`);
      if (showTooltip.value) {
        _push(`<div class="${ssrRenderClass([
          "absolute z-50 w-64 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-gray-700",
          {
            "bottom-full left-1/2 mb-2 -translate-x-1/2": __props.position === "top",
            "top-full left-1/2 mt-2 -translate-x-1/2": __props.position === "bottom",
            "right-full top-1/2 mr-2 -translate-y-1/2": __props.position === "left",
            "left-full top-1/2 ml-2 -translate-y-1/2": __props.position === "right"
          }
        ])}">${ssrInterpolate(__props.content)} <div class="${ssrRenderClass([
          "absolute h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700",
          {
            "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2": __props.position === "top",
            "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2": __props.position === "bottom",
            "right-0 top-1/2 translate-x-1/2 -translate-y-1/2": __props.position === "left",
            "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2": __props.position === "right"
          }
        ])}"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Tooltip.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "AnimatedNumber",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 500
    },
    format: {
      type: Function,
      default: (val) => val.toLocaleString()
    }
  },
  setup(__props) {
    const props = __props;
    const displayValue = ref(props.value);
    const isMounted = ref(false);
    let animationFrame = null;
    const isBrowser = () => typeof window !== "undefined";
    const prefersReducedMotion = () => {
      if (!isBrowser()) return true;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    };
    const animateValue = (start, end, duration) => {
      if (!isBrowser() || prefersReducedMotion()) {
        displayValue.value = end;
        return;
      }
      const startTime = performance.now();
      const diff = end - start;
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        displayValue.value = start + diff * easeOut;
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          displayValue.value = end;
        }
      };
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      animationFrame = requestAnimationFrame(animate);
    };
    watch(() => props.value, (newValue, oldValue) => {
      if (!isMounted.value) {
        displayValue.value = newValue;
        return;
      }
      if (typeof oldValue === "number" && typeof newValue === "number") {
        animateValue(oldValue, newValue, props.duration);
      } else {
        displayValue.value = newValue;
      }
    });
    onMounted(() => {
      isMounted.value = true;
      displayValue.value = props.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "tabular-nums" }, _attrs))}>${ssrInterpolate(__props.format(displayValue.value))}</span>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/AnimatedNumber.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CalculatorActions",
  __ssrInlineRender: true,
  props: {
    linkCopied: {
      type: Boolean,
      default: false
    },
    showSave: {
      type: Boolean,
      default: true
    },
    saveLabel: {
      type: String,
      default: "Save Calculation"
    }
  },
  emits: ["copy", "print", "save"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-2 border-t pt-4 dark:border-gray-700" }, _attrs))}><button class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"${ssrRenderAttr("title", __props.linkCopied ? "Copied!" : "Copy shareable link")}${ssrRenderAttr("aria-label", __props.linkCopied ? "Link copied to clipboard" : "Copy shareable link")}>`);
      if (!__props.linkCopied) {
        _push(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path></svg>`);
      } else {
        _push(`<svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>`);
      }
      _push(`</button><button class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600" title="Print results" aria-label="Print results"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"></path></svg></button>`);
      if (__props.showSave) {
        _push(`<button class="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">${ssrInterpolate(__props.saveLabel)}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Calculator/CalculatorActions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SaveCalculationModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ["affordability", "cost_of_living", "disability"].includes(value)
    },
    inputs: {
      type: Object,
      required: true
    },
    results: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: "e.g., My Calculation"
    }
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const page = usePage();
    const flash = computed(() => page.props.flash);
    const saveFormRef = ref();
    const saveName = ref("");
    const saving = ref(false);
    const saveSuccess = ref(false);
    const saveError = ref(null);
    const transformSaveData = () => ({
      type: props.type,
      name: saveName.value || null,
      inputs: props.inputs,
      results: props.results
    });
    const onSaveStart = () => {
      saving.value = true;
    };
    const onSaveFinish = () => {
      saving.value = false;
      if (flash.value?.success) {
        saveSuccess.value = true;
        setTimeout(() => {
          emit("close");
          setTimeout(() => {
            saveSuccess.value = false;
            saveName.value = "";
          }, 300);
        }, 1500);
      } else if (flash.value?.error) {
        saveError.value = flash.value.error;
      }
    };
    const handleClose = () => {
      saveError.value = null;
      saveSuccess.value = false;
      saveName.value = "";
      emit("close");
    };
    const resetState = () => {
      saveName.value = "";
      saveSuccess.value = false;
      saveError.value = null;
    };
    __expose({ resetState });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "modal-title"
        }, _attrs))}><div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"><h3 id="modal-title" class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Save Calculation</h3>`);
        if (saveSuccess.value) {
          _push(`<div class="rounded-md bg-green-50 p-4 dark:bg-green-900/30"><p class="text-sm font-medium text-green-700 dark:text-green-300">Calculation saved successfully!</p></div>`);
        } else {
          _push(`<div>`);
          if (saveError.value) {
            _push(`<div class="mb-4 rounded-md bg-red-50 p-3 dark:bg-red-900/30"><p class="text-sm text-red-700 dark:text-red-300">${ssrInterpolate(saveError.value)} `);
            if (saveError.value.includes("Support")) {
              _push(`<a href="/support" class="ml-1 font-medium underline hover:text-red-800 dark:hover:text-red-200"> Support Us </a>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(unref(Form), {
            ref_key: "saveFormRef",
            ref: saveFormRef,
            action: "/calculations",
            method: "post",
            transform: transformSaveData,
            options: { preserveScroll: true },
            onStart: onSaveStart,
            onFinish: onSaveFinish
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Name (optional)</label><input${ssrRenderAttr("value", saveName.value)} type="text"${ssrRenderAttr("placeholder", __props.placeholder)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId}></div><div class="flex gap-3"${_scopeId}><button type="button" class="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(saving.value ? "Saving..." : "Save")}</button></div>`);
              } else {
                return [
                  createVNode("div", { class: "mb-4" }, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300" }, "Name (optional)"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => saveName.value = $event,
                      type: "text",
                      placeholder: __props.placeholder,
                      class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                      [vModelText, saveName.value]
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode("button", {
                      type: "button",
                      onClick: handleClose,
                      class: "flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }, " Cancel "),
                    createVNode("button", {
                      type: "submit",
                      disabled: saving.value,
                      class: "flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    }, toDisplayString(saving.value ? "Saving..." : "Save"), 9, ["disabled"])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Calculator/SaveCalculationModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function useCalculator({ defaultValues, inputs, updateUrl }) {
  const page = usePage();
  const user = computed(() => page.props.auth?.user);
  const flash = computed(() => page.props.flash);
  const formRef = ref();
  const saveFormRef = ref();
  const display = reactive(inputs ?? { ...defaultValues });
  const loading = ref(false);
  const error = ref(null);
  const showSaveModal = ref(false);
  const saveName = ref("");
  const saving = ref(false);
  const saveSuccess = ref(false);
  const saveError = ref(null);
  const linkCopied = ref(false);
  const onFormStart = () => {
    loading.value = true;
    error.value = null;
  };
  const onFormFinish = () => {
    loading.value = false;
  };
  const onFormError = () => {
    error.value = "An error occurred. Please try again.";
  };
  let timeout = null;
  const onInput = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      display[name] = checked;
    } else if (type === "number" || type === "range") {
      display[name] = parseFloat(value) || 0;
    } else {
      display[name] = value;
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      formRef.value?.submit();
      if (updateUrl) updateUrl();
    }, 500);
  };
  const openSaveModal = () => {
    saveName.value = "";
    saveSuccess.value = false;
    saveError.value = null;
    showSaveModal.value = true;
  };
  const closeSaveModal = () => {
    showSaveModal.value = false;
  };
  const onSaveStart = () => {
    saving.value = true;
  };
  const onSaveFinish = () => {
    saving.value = false;
    if (flash.value?.success) {
      saveSuccess.value = true;
      setTimeout(() => {
        showSaveModal.value = false;
      }, 1500);
    } else if (flash.value?.error) {
      saveError.value = flash.value.error;
    }
  };
  const printResults = () => {
    if (typeof window === "undefined") return;
    window.print();
  };
  const copyLink = async () => {
    if (typeof window === "undefined") return;
    if (updateUrl) updateUrl();
    try {
      await navigator.clipboard.writeText(window.location.href);
      linkCopied.value = true;
      setTimeout(() => linkCopied.value = false, 2e3);
    } catch (e) {
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      linkCopied.value = true;
      setTimeout(() => linkCopied.value = false, 2e3);
    }
  };
  const formatCurrency = (value) => {
    if (value === null || value === void 0) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  };
  const formatPercent = (value, decimals = 1) => {
    if (value === null || value === void 0) return "-";
    return `${value.toFixed(decimals)}%`;
  };
  return {
    // Auth
    user,
    flash,
    // Form refs
    formRef,
    saveFormRef,
    // State
    display,
    loading,
    error,
    // Save modal state
    showSaveModal,
    saveName,
    saving,
    saveSuccess,
    saveError,
    // Link state
    linkCopied,
    // Form handlers
    onFormStart,
    onFormFinish,
    onFormError,
    onInput,
    // Save modal handlers
    openSaveModal,
    closeSaveModal,
    onSaveStart,
    onSaveFinish,
    // Utilities
    printResults,
    copyLink,
    formatCurrency,
    formatPercent
  };
}
export {
  _sfc_main$3 as _,
  _sfc_main$2 as a,
  _sfc_main$1 as b,
  _sfc_main as c,
  useCalculator as u
};
