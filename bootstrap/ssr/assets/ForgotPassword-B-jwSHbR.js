import { withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./GuestLayout-C4qAdsrB.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post("/forgot-password");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent2, _scopeId));
            _push2(`<div class="flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8"${_scopeId}><div class="sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><h2 class="text-center text-3xl font-bold tracking-tight text-gray-900"${_scopeId}> Reset your password </h2><p class="mt-2 text-center text-sm text-gray-600"${_scopeId}> Enter your email and we&#39;ll send you a link to reset your password. </p></div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label for="email" class="block text-sm font-medium text-gray-700"${_scopeId}> Email address </label><div class="mt-1"${_scopeId}><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"${_scopeId}></div>`);
            if (unref(form).errors.email) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span${_scopeId}>Sending...</span>`);
            } else {
              _push2(`<span${_scopeId}>Send reset link</span>`);
            }
            _push2(`</button></div><div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/login",
              class: "text-sm font-medium text-blue-600 hover:text-blue-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to sign in `);
                } else {
                  return [
                    createTextVNode(" Back to sign in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Forgot Password" }),
              createVNode("div", { class: "flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "sm:mx-auto sm:w-full sm:max-w-md" }, [
                  createVNode("h2", { class: "text-center text-3xl font-bold tracking-tight text-gray-900" }, " Reset your password "),
                  createVNode("p", { class: "mt-2 text-center text-sm text-gray-600" }, " Enter your email and we'll send you a link to reset your password. ")
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
                            autocomplete: "email",
                            required: "",
                            class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ])
                        ]),
                        unref(form).errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Sending...")) : (openBlock(), createBlock("span", { key: 1 }, "Send reset link"))
                        ], 8, ["disabled"])
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode(unref(Link), {
                          href: "/login",
                          class: "text-sm font-medium text-blue-600 hover:text-blue-500"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Back to sign in ")
                          ]),
                          _: 1
                        })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
