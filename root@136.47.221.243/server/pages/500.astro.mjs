import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DLvoU_Hh.mjs';
export { renderers } from '../renderers.mjs';

const $$500 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": "Internal Server Error" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>500 Oops</h1> <p>Modeep's server screwed up while processing your request. Sorry about that.</p> <p>If you can consistently recreate this condition, please email <a href="mailto:support@modeep.org">support@modeep.org</a> to share what you did.</p> </main> ` })}`;
}, "/root/modeep-frontend/src/pages/500.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$500,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
