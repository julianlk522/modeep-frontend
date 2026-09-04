import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$WithFooter } from '../chunks/WithFooter_QHs-FNRp.mjs';
export { renderers } from '../renderers.mjs';

const $$RateLimit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "WithFooter", $$WithFooter, { "Title": "Rate Limited" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>Not so fast!</h1> <p>Literally. You sent too many requests too quickly. Try again after a minute.</p> <p>If you believe the rate limit is too strict, please email <a href="mailto:support@modeep.org">support@modeep.org</a> to share your opinion.</p> </main> ` })}`;
}, "/root/modeep-frontend/src/pages/rate-limit.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/rate-limit.astro";
const $$url = "/rate-limit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$RateLimit,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
