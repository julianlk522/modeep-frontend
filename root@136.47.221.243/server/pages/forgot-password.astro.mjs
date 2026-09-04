import { e as createComponent, k as renderComponent, r as renderTemplate, l as renderScript, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DLvoU_Hh.mjs';
export { renderers } from '../renderers.mjs';

const $$ForgotPassword = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": "Forgot Password" }, { "default": async ($$result2) => renderTemplate` ${renderScript($$result2, "/root/modeep-frontend/src/pages/forgot-password.astro?astro&type=script&index=0&lang.ts")} ${maybeRenderHead()}<main> <h1>Send Password Reset Email</h1> <form id="forgot-password"> <label for="login_name">Login Name:</label> <input type="text" name="login_name" id="login_name"> <button type="submit">Send</button> </form> </main> ` })}`;
}, "/root/modeep-frontend/src/pages/forgot-password.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/forgot-password.astro";
const $$url = "/forgot-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ForgotPassword,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
