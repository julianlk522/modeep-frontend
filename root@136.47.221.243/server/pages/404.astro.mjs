import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DLvoU_Hh.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": "Page Not Found", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-zetdm5md> <h1 data-astro-cid-zetdm5md>404 Page not found</h1> <p data-astro-cid-zetdm5md> <a id="go-home" title="Go home" href="/" data-astro-cid-zetdm5md> <img src="../../back.svg"${addAttribute(18, "height")}${addAttribute(18, "width")} data-astro-cid-zetdm5md>
Go home
</a> </p> </main> ` })} `;
}, "/root/modeep-frontend/src/pages/404.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
