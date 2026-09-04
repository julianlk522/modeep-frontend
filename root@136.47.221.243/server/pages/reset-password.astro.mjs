import { e as createComponent, k as renderComponent, r as renderTemplate, l as renderScript, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$WithFooter } from '../chunks/WithFooter_QHs-FNRp.mjs';
export { renderers } from '../renderers.mjs';

const $$ResetPassword = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "WithFooter", $$WithFooter, { "Title": "Reset Password" }, { "default": async ($$result2) => renderTemplate` ${renderScript($$result2, "/root/modeep-frontend/src/pages/reset-password.astro?astro&type=script&index=0&lang.ts")} ${maybeRenderHead()}<main> <h1>Reset Password</h1> <form id="reset-password"> <label for="new_password">New Password:</label> <input type="password" name="new_password" id="new_password" required autocomplete="off"> <label for="confirm">Confirm:</label> <input type="password" name="confirm" id="confirm" required autocomplete="off"> <button type="submit">Reset</button> </form> </main> ` })}`;
}, "/root/modeep-frontend/src/pages/reset-password.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/reset-password.astro";
const $$url = "/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ResetPassword,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
