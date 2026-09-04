import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DLvoU_Hh.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": "FAQ", "data-astro-cid-6kmwghhu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-6kmwghhu> <h1 data-astro-cid-6kmwghhu>FAQ</h1> <article data-astro-cid-6kmwghhu> <h2 data-astro-cid-6kmwghhu>When do a link's global cats get updated?</h2> <p data-astro-cid-6kmwghhu>2 ways:</p> <ol data-astro-cid-6kmwghhu> <li data-astro-cid-6kmwghhu> <p data-astro-cid-6kmwghhu>Someone who has tagged the link edits their tag</p> </li> <li data-astro-cid-6kmwghhu> <p data-astro-cid-6kmwghhu>Someone visits the link's Tags page</p> <span class="subtitle" data-astro-cid-6kmwghhu>(You can get to the Tags page by clicking the number in the parentheses next to a link's cats.)</span> </li> </ol> </article> <article data-astro-cid-6kmwghhu> <h2 data-astro-cid-6kmwghhu>Why do Top Cats and Top Contributors not always match what's on someone's Treaure Map?</h2> <p data-astro-cid-6kmwghhu>
Top Contributors describe global cats but Treasure Maps count their owner's assigned cats primarily and
				only fall back to global cats where necessary. If the Treasure Map owner chooses cats that don't make it
				to the global tag, it causes this apparent discrepancy. On someone's Treasure Map, however, you get
				context-specific output: Top Cats and Subcats rankings as well as any cat recommendations from typing
				reflect the Treasure Map owner's selections.
</p> </article> </main> ` })} `;
}, "/root/modeep-frontend/src/pages/faq.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Faq,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
