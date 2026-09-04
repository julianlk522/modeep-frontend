import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$WithFooter } from '../chunks/WithFooter_QHs-FNRp.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "WithFooter", $$WithFooter, { "Title": "What is Modeep? Who cares?", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-kh7btl4r> <h1 data-astro-cid-kh7btl4r>
MODEEP: <span style="font-weight: normal;" data-astro-cid-kh7btl4r>MOdular filtration and Decentralized Evaluation of EPic internet treasure</span> </h1> <section data-astro-cid-kh7btl4r> <p data-astro-cid-kh7btl4r>
Modeep is an open source search engine optimized for precise visualization and traversal of manually
				curated, high-value Internet links.
</p> </section> <section data-astro-cid-kh7btl4r> <h2 data-astro-cid-kh7btl4r>Motivation</h2> <p data-astro-cid-kh7btl4r>
The Internet constantly introduces knowledge, joy, curiosity, beauty, and meaning to all manner of
				visitors. It holds an enormous sum of greatness and potential. <strong data-astro-cid-kh7btl4r>Yet, it's so easy to miss fantastic and indispensable parts</strong>, particularly within specific niches and intersections of niches. Gems of imaginative genius and/or
				radical utility lie idle somewhere across an impenetrable ocean, ready to brighten your life but without
				the means to be noticed. They remain obscure and underappreciated, and their great potential is wasted.
				What a tragedy! Exceptional webpages deserve proper commemoration, for their own sake and for yours.
</p> <p data-astro-cid-kh7btl4r>
To fix this, the highlights need to be documented and indexed. But crawling and algorithmically indexing
				has not worked for 2 important reasons:
</p> <ol data-astro-cid-kh7btl4r> <li data-astro-cid-kh7btl4r> <strong data-astro-cid-kh7btl4r>Misjudging the tradeoff between breadth and accuracy, and offering too little control over it</strong>. It's not helpful to get 1,000,000+ pages of results. Nobody is looking through all that. Nor
					should they because it doesn't make sense: there aren't 1,000,000 relevant pages for anything. Only
					very vague topics, e.g., "funny" are that broad, and why settle for vagueness? It would be easier to
					just be more specific about what you want ("funny" and "gaming" and "fails", ...) so you can rule
					out and skip poor matches. Literally, you <em data-astro-cid-kh7btl4r>can</em> search "funny gaming fails" in most search engines,
					but there's no guarantee that the output will be exclusive to that intersection of themes. We routinely
					are forced to under-specify due to lack of precise parameters, get way too many results, ignore 99.9999%
					of them and select from the first few, and finally accept something that fails to capture the full intent
					of our request. That's dumb! It's more helpful and efficient to prioritize accuracy. However it's nice
					to be able to browse: to start with a broad scope and narrow it progressively based on what's available.
					The best of both worlds is to provide flexible search precision, where it can be scaled up or down through
					optional parameters to meet changing needs.
</li> <li data-astro-cid-kh7btl4r> <strong data-astro-cid-kh7btl4r>A single point of failure</strong>. Even if relevancy to <em data-astro-cid-kh7btl4r>all</em> keywords were guaranteed,
					any keywords said to be associated with a link, and any determination of its quality, are still just
<em data-astro-cid-kh7btl4r>what the crawler / algorithm unilaterally decides</em>, which is only tenuously reliable. A
					sample size of one gives an incomplete representation of the whole of anything, even if it's a
					high-quality source, and a voracious web crawler is no exception. Important choices (like choosing
					the best resource) warrant multiple perspectives to guarantee accuracy. Which perspectives are worth
					considering? It depends, and it's good to have options. Sometimes consensus is preferred so you
					might consider everyone's inputs equally. Sometimes it's better for a subjective expert to answer a
					more subjective request, e.g., for something really funny, what does the funniest person you know
					recommend? It may have nothing to do with expertise: your best friend knows you well and you trust
					them, what do <em data-astro-cid-kh7btl4r>they</em> think is valuable? Their picks are likely worth more to you than the tellings
					of a program which cannot conceive of your complex personhood. Regardless of subjectivity, corroborated
					results give the most certainty. If you want the "funniest dog video ever," to you, would you rather
					ask your 1 search engine of choice or 10 close friends?
</li> </ol> </section> <section data-astro-cid-kh7btl4r> <h2 data-astro-cid-kh7btl4r>How <em data-astro-cid-kh7btl4r>should</em> a search engine work?</h2> <ul data-astro-cid-kh7btl4r> <li data-astro-cid-kh7btl4r>
Draw from links curated directly by Internet users, ranked by how much they have been publicly
					vouched for.
</li> <li data-astro-cid-kh7btl4r>
Infinitely many subjective search views: letting people decide link ratings and classifications
					which can then be either independently explored or amalgamated into explorable global
					averages/aggregates.
</li> <li data-astro-cid-kh7btl4r>Fine-grained search parameters, which can be scoped to subjective or global views.</li> <li data-astro-cid-kh7btl4r>
Snapshots of the most frequent themes from within specific search results for real-time, high-level
					overviews of active subcategories.
<ul data-astro-cid-kh7btl4r> <li data-astro-cid-kh7btl4r>
with a simple interface for including and excluding subcategories, for rapid incremental
							specificity adjustments.
</li> </ul> </li> <li data-astro-cid-kh7btl4r> <a href="https://github.com/julianlk522/modeep-backend" data-astro-cid-kh7btl4r>Open source</a> engine.
</li> <li data-astro-cid-kh7btl4r>Not polluting the experience with paid placement or other ad garbage.</li> </ul> <p data-astro-cid-kh7btl4r>Now that's more like it!</p> <br data-astro-cid-kh7btl4r> <p data-astro-cid-kh7btl4r>
Good news: that's Modeep in a nutshell. It was built to organize and improve the accessibility of
				high-value resources, while maintaining transparency, accuracy, subjectivity, and minimal noise.
</p> <p data-astro-cid-kh7btl4r></p> <p data-astro-cid-kh7btl4r> <a href="/about/how" data-astro-cid-kh7btl4r>Learn more</a> about how it works.
</p> </section> <section data-astro-cid-kh7btl4r> <h2 data-astro-cid-kh7btl4r>Seen something great?</h2> <p data-astro-cid-kh7btl4r>
Consider <a href="/new" data-astro-cid-kh7btl4r>showing off a cool thing you found</a>. Anything at all. If you like it then
				someone else would too, and you could make their day by sharing it.
</p> <p data-astro-cid-kh7btl4r>Otherwise sit back and enjoy the treasure!</p> </section> </main> ` })} `;
}, "/root/modeep-frontend/src/pages/about.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
