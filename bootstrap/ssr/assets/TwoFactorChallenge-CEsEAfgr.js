import { ref, withCtx, unref, createVNode, createBlock, openBlock, Fragment, createTextVNode, withModifiers, createCommentVNode, withDirectives, vModelText, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./GuestLayout-C4qAdsrB.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "TwoFactorChallenge",
  __ssrInlineRender: true,
  setup(__props) {
    const recovery = ref(false);
    const form = useForm({
      code: "",
      recovery_code: ""
    });
    const submit = () => {
      form.post("/two-factor-challenge");
    };
    const toggleRecovery = () => {
      recovery.value = !recovery.value;
      form.code = "";
      form.recovery_code = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Two-Factor Authentication" }, null, _parent2, _scopeId));
            _push2(`<div class="flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8"${_scopeId}><div class="sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><h2 class="text-center text-3xl font-bold tracking-tight text-gray-900"${_scopeId}> Two-Factor Authentication </h2><p class="mt-2 text-center text-sm text-gray-600"${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<!--[--> Enter the authentication code from your authenticator app. <!--]-->`);
            } else {
              _push2(`<!--[--> Enter one of your emergency recovery codes. <!--]-->`);
            }
            _push2(`</p></div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"${_scopeId}><form class="space-y-6"${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<div${_scopeId}><label for="code" class="block text-sm font-medium text-gray-700"${_scopeId}> Authentication Code </label><div class="mt-1"${_scopeId}><input id="code"${ssrRenderAttr("value", unref(form).code)} type="text" inputmode="numeric" autocomplete="one-time-code" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"${_scopeId}></div>`);
              if (unref(form).errors.code) {
                _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.code)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}><label for="recovery_code" class="block text-sm font-medium text-gray-700"${_scopeId}> Recovery Code </label><div class="mt-1"${_scopeId}><input id="recovery_code"${ssrRenderAttr("value", unref(form).recovery_code)} type="text" autocomplete="one-time-code" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"${_scopeId}></div>`);
              if (unref(form).errors.recovery_code) {
                _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.recovery_code)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`<div class="flex items-center justify-between"${_scopeId}><button type="button" class="text-sm font-medium text-blue-600 hover:text-blue-500"${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<!--[--> Use a recovery code <!--]-->`);
            } else {
              _push2(`<!--[--> Use authentication code <!--]-->`);
            }
            _push2(`</button></div><div${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span${_scopeId}>Verifying...</span>`);
            } else {
              _push2(`<span${_scopeId}>Verify</span>`);
            }
            _push2(`</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Two-Factor Authentication" }),
              createVNode("div", { class: "flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "sm:mx-auto sm:w-full sm:max-w-md" }, [
                  createVNode("h2", { class: "text-center text-3xl font-bold tracking-tight text-gray-900" }, " Two-Factor Authentication "),
                  createVNode("p", { class: "mt-2 text-center text-sm text-gray-600" }, [
                    !recovery.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(" Enter the authentication code from your authenticator app. ")
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode(" Enter one of your emergency recovery codes. ")
                    ], 64))
                  ])
                ]),
                createVNode("div", { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, [
                  createVNode("div", { class: "bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      !recovery.value ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("label", {
                          for: "code",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Authentication Code "),
                        createVNode("div", { class: "mt-1" }, [
                          withDirectives(createVNode("input", {
                            id: "code",
                            "onUpdate:modelValue": ($event) => unref(form).code = $event,
                            type: "text",
                            inputmode: "numeric",
                            autocomplete: "one-time-code",
                            required: "",
                            class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).code]
                          ])
                        ]),
                        unref(form).errors.code ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.code), 1)) : createCommentVNode("", true)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("label", {
                          for: "recovery_code",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Recovery Code "),
                        createVNode("div", { class: "mt-1" }, [
                          withDirectives(createVNode("input", {
                            id: "recovery_code",
                            "onUpdate:modelValue": ($event) => unref(form).recovery_code = $event,
                            type: "text",
                            autocomplete: "one-time-code",
                            required: "",
                            class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).recovery_code]
                          ])
                        ]),
                        unref(form).errors.recovery_code ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.recovery_code), 1)) : createCommentVNode("", true)
                      ])),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("button", {
                          type: "button",
                          class: "text-sm font-medium text-blue-600 hover:text-blue-500",
                          onClick: toggleRecovery
                        }, [
                          !recovery.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createTextVNode(" Use a recovery code ")
                          ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode(" Use authentication code ")
                          ], 64))
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Verifying...")) : (openBlock(), createBlock("span", { key: 1 }, "Verify"))
                        ], 8, ["disabled"])
                      ])
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/TwoFactorChallenge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
