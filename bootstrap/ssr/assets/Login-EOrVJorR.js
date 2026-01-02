import { withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, toDisplayString, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./GuestLayout-C4qAdsrB.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post("/login", {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Sign In" }, null, _parent2, _scopeId));
            _push2(`<div class="flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8"${_scopeId}><div class="sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><h2 class="text-center text-3xl font-bold tracking-tight text-gray-900"${_scopeId}> Sign in to your account </h2><p class="mt-2 text-center text-sm text-gray-600"${_scopeId}> Or `);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/register",
              class: "font-medium text-blue-600 hover:text-blue-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` create a new account `);
                } else {
                  return [
                    createTextVNode(" create a new account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label for="email" class="block text-sm font-medium text-gray-700"${_scopeId}> Email address </label><div class="mt-1"${_scopeId}><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"${_scopeId}></div>`);
            if (unref(form).errors.email) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="password" class="block text-sm font-medium text-gray-700"${_scopeId}> Password </label><div class="mt-1"${_scopeId}><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" autocomplete="current-password" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"${_scopeId}></div>`);
            if (unref(form).errors.password) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><input id="remember"${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"${_scopeId}><label for="remember" class="ml-2 block text-sm text-gray-900"${_scopeId}> Remember me </label></div><div class="text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/forgot-password",
              class: "font-medium text-blue-600 hover:text-blue-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Forgot your password? `);
                } else {
                  return [
                    createTextVNode(" Forgot your password? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span${_scopeId}>Signing in...</span>`);
            } else {
              _push2(`<span${_scopeId}>Sign in</span>`);
            }
            _push2(`</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Sign In" }),
              createVNode("div", { class: "flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "sm:mx-auto sm:w-full sm:max-w-md" }, [
                  createVNode("h2", { class: "text-center text-3xl font-bold tracking-tight text-gray-900" }, " Sign in to your account "),
                  createVNode("p", { class: "mt-2 text-center text-sm text-gray-600" }, [
                    createTextVNode(" Or "),
                    createVNode(unref(Link), {
                      href: "/register",
                      class: "font-medium text-blue-600 hover:text-blue-500"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" create a new account ")
                      ]),
                      _: 1
                    })
                  ])
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
                        createVNode("label", {
                          for: "password",
                          class: "block text-sm font-medium text-gray-700"
                        }, " Password "),
                        createVNode("div", { class: "mt-1" }, [
                          withDirectives(createVNode("input", {
                            id: "password",
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: "password",
                            autocomplete: "current-password",
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
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          withDirectives(createVNode("input", {
                            id: "remember",
                            "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                            type: "checkbox",
                            class: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).remember]
                          ]),
                          createVNode("label", {
                            for: "remember",
                            class: "ml-2 block text-sm text-gray-900"
                          }, " Remember me ")
                        ]),
                        createVNode("div", { class: "text-sm" }, [
                          createVNode(unref(Link), {
                            href: "/forgot-password",
                            class: "font-medium text-blue-600 hover:text-blue-500"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Forgot your password? ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Signing in...")) : (openBlock(), createBlock("span", { key: 1 }, "Sign in"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
