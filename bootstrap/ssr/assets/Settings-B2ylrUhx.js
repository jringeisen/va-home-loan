import { withCtx, unref, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTISP9sP.js";
import "./Logo-Ch_xRQ5X.js";
const _sfc_main = {
  __name: "Settings",
  __ssrInlineRender: true,
  props: {
    user: Object
  },
  setup(__props) {
    const props = __props;
    const profileForm = useForm({
      name: props.user.name,
      email: props.user.email
    });
    const passwordForm = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const updateProfile = () => {
      profileForm.put("/user/profile-information", {
        preserveScroll: true
      });
    };
    const updatePassword = () => {
      passwordForm.put("/user/password", {
        preserveScroll: true,
        onSuccess: () => passwordForm.reset()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Settings" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}>Settings</h1><div class="mt-8 rounded-lg bg-white p-6 shadow"${_scopeId}><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>Profile Information</h2><p class="mt-1 text-sm text-gray-600"${_scopeId}>Update your account&#39;s profile information and email address.</p><form class="mt-6 space-y-6"${_scopeId}><div${_scopeId}><label for="name" class="block text-sm font-medium text-gray-700"${_scopeId}>Name</label><input id="name"${ssrRenderAttr("value", unref(profileForm).name)} type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}>`);
            if (unref(profileForm).errors.name) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(profileForm).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="email" class="block text-sm font-medium text-gray-700"${_scopeId}>Email</label><input id="email"${ssrRenderAttr("value", unref(profileForm).email)} type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}>`);
            if (unref(profileForm).errors.email) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(profileForm).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""} class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"${_scopeId}> Save </button></div></form></div><div class="mt-8 rounded-lg bg-white p-6 shadow"${_scopeId}><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>Update Password</h2><p class="mt-1 text-sm text-gray-600"${_scopeId}>Ensure your account is using a long, random password to stay secure.</p><form class="mt-6 space-y-6"${_scopeId}><div${_scopeId}><label for="current_password" class="block text-sm font-medium text-gray-700"${_scopeId}>Current Password</label><input id="current_password"${ssrRenderAttr("value", unref(passwordForm).current_password)} type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}>`);
            if (unref(passwordForm).errors.current_password) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(passwordForm).errors.current_password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="password" class="block text-sm font-medium text-gray-700"${_scopeId}>New Password</label><input id="password"${ssrRenderAttr("value", unref(passwordForm).password)} type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}>`);
            if (unref(passwordForm).errors.password) {
              _push2(`<p class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(passwordForm).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="password_confirmation" class="block text-sm font-medium text-gray-700"${_scopeId}>Confirm Password</label><input id="password_confirmation"${ssrRenderAttr("value", unref(passwordForm).password_confirmation)} type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="flex justify-end"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(passwordForm).processing) ? " disabled" : ""} class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"${_scopeId}> Update Password </button></div></form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Settings" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, "Settings"),
                  createVNode("div", { class: "mt-8 rounded-lg bg-white p-6 shadow" }, [
                    createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, "Profile Information"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Update your account's profile information and email address."),
                    createVNode("form", {
                      onSubmit: withModifiers(updateProfile, ["prevent"]),
                      class: "mt-6 space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "name",
                          class: "block text-sm font-medium text-gray-700"
                        }, "Name"),
                        withDirectives(createVNode("input", {
                          id: "name",
                          "onUpdate:modelValue": ($event) => unref(profileForm).name = $event,
                          type: "text",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(profileForm).name]
                        ]),
                        unref(profileForm).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(profileForm).errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "email",
                          class: "block text-sm font-medium text-gray-700"
                        }, "Email"),
                        withDirectives(createVNode("input", {
                          id: "email",
                          "onUpdate:modelValue": ($event) => unref(profileForm).email = $event,
                          type: "email",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(profileForm).email]
                        ]),
                        unref(profileForm).errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(profileForm).errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(profileForm).processing,
                          class: "rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        }, " Save ", 8, ["disabled"])
                      ])
                    ], 32)
                  ]),
                  createVNode("div", { class: "mt-8 rounded-lg bg-white p-6 shadow" }, [
                    createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, "Update Password"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Ensure your account is using a long, random password to stay secure."),
                    createVNode("form", {
                      onSubmit: withModifiers(updatePassword, ["prevent"]),
                      class: "mt-6 space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "current_password",
                          class: "block text-sm font-medium text-gray-700"
                        }, "Current Password"),
                        withDirectives(createVNode("input", {
                          id: "current_password",
                          "onUpdate:modelValue": ($event) => unref(passwordForm).current_password = $event,
                          type: "password",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(passwordForm).current_password]
                        ]),
                        unref(passwordForm).errors.current_password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(passwordForm).errors.current_password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "password",
                          class: "block text-sm font-medium text-gray-700"
                        }, "New Password"),
                        withDirectives(createVNode("input", {
                          id: "password",
                          "onUpdate:modelValue": ($event) => unref(passwordForm).password = $event,
                          type: "password",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(passwordForm).password]
                        ]),
                        unref(passwordForm).errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(passwordForm).errors.password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "password_confirmation",
                          class: "block text-sm font-medium text-gray-700"
                        }, "Confirm Password"),
                        withDirectives(createVNode("input", {
                          id: "password_confirmation",
                          "onUpdate:modelValue": ($event) => unref(passwordForm).password_confirmation = $event,
                          type: "password",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(passwordForm).password_confirmation]
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(passwordForm).processing,
                          class: "rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        }, " Update Password ", 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
