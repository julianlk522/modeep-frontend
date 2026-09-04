import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DLvoU_Hh.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const modeep_island = new Proxy({"src":"/_astro/modeep-island.93aTCOXA.webp","width":1095,"height":898,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/root/modeep-frontend/src/images/modeep-island.webp";
							}
							
							return target[name];
						}
					});

const $$Feedback = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": "Feedback", "data-astro-cid-jg236dr6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-jg236dr6> <h1 data-astro-cid-jg236dr6>Feedback</h1> <img id="modeep-island"${addAttribute(modeep_island.src, "src")} alt="Modeep Island with Treasure Chest" data-astro-cid-jg236dr6> <p data-astro-cid-jg236dr6>All comments and suggestions are appreciated!</p> <p data-astro-cid-jg236dr6>
Email <a href="mailto:support@modeep.org" data-astro-cid-jg236dr6>support@modeep.org</a> to let us know what you'd like to see in the
			next update.
</p> </main> ` })} `;
}, "/root/modeep-frontend/src/pages/feedback.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/feedback.astro";
const $$url = "/feedback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Feedback,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
