import { withCtx, unref, createVNode, withModifiers, withDirectives, vModelText, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./GuestLayout-C4qAdsrB.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: String,
    token: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post("/reset-password", {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent2, _scopeId));
            _push2(`<div class="flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8"${_scopeId}><div class="sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><h2 class="text-center text-3xl font-bold tracking-tight text-gray-900"${_scopeId}> Set new password </h2></div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label for="email" class="block text-sm font-medium text-gray-700"${_scopeId}> Email address </label><div class="mt-1"${_scopeId}><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required class="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm" readonly${_scopeId}></div></div><div${_scopeId}><label for="password" class="block text-sm font-medium text-gray-700"${_scopeId}> New password </label><div class="mt-1"${_scopeId}><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"${_scopeId}></div>`);
            if (unref(form).errors.password) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="password_confirmation" class="block text-sm font-medium text-gray-700"${_scopeId}> Confirm new password </label><div class="mt-1"${_scopeId}><input id="password_confirmation"${ssrRenderAttr("value", unref(form).password_confirmation)} type="password" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"${_scopeId}></div></div><div${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span${_scopeId}>Resetting...</span>`);
            } else {
              _push2(`<span${_scopeId}>Reset password</span>`);
            }
            _push2(`</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Reset Password" }),
              createVNode("div", { class: "flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "sm:mx-auto sm:w-full sm:max-w-md" }, [
                  createVNode("h2", { class: "text-center text-3xl font-bold tracking-tight text-gray-900" }, " Set new password ")
                ]),
                createVNode("div", { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, [
                  createVNode("div", { class: "bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "email",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Email address "),
                        createVNode("div", { class: "mt-1" }, [
                          withDirectives(createVNode("input", {
                            id: "email",
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            required: "",
                            class: "block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm",
                            readonly: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "password",
                          class: "block text-sm font-medium text-gray-700"
                        }, " New password "),
                        createVNode("div", { class: "mt-1" }, [
                          withDirectives(createVNode("input", {
                            id: "password",
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: "password",
                            required: "",
                            class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).password]
                          ])
                        ]),
                        unref(form).errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "password_confirmation",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Confirm new password "),
                        createVNode("div", { class: "mt-1" }, [
                          withDirectives(createVNode("input", {
                            id: "password_confirmation",
                            "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                            type: "password",
                            required: "",
                            class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).password_confirmation]
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Resetting...")) : (openBlock(), createBlock("span", { key: 1 }, "Reset password"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
