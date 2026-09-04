import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, o as renderSlot, m as maybeRenderHead } from './astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from './BaseLayout_DLvoU_Hh.mjs';
/* empty css                         */

const $$Astro = createAstro();
const $$WithFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WithFooter;
  const { Title: title } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": title, "data-astro-cid-3i6z6swv": true }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ${maybeRenderHead()}<footer data-astro-cid-3i6z6swv> <a href="/about" data-astro-cid-3i6z6swv>About</a> <a href="/feedback" data-astro-cid-3i6z6swv>Feedback</a> <a href="/faq" data-astro-cid-3i6z6swv>FAQ</a> </footer> ` })} `;
}, "/root/modeep-frontend/src/layouts/WithFooter.astro", void 0);

export { $$WithFooter as $ };
