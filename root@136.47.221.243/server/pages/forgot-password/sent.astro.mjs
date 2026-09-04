import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DLvoU_Hh.mjs';
export { renderers } from '../../renderers.mjs';

const $$Sent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": "Email Sent" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>Sent!</h1> <p>If your Modeep account has an associated email, you should receive an email with a link to reset your password.</p> </main> ` })}`;
}, "/root/modeep-frontend/src/pages/forgot-password/sent.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/forgot-password/sent.astro";
const $$url = "/forgot-password/sent";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Sent,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
