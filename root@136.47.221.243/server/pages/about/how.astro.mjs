import { e as createComponent, m as maybeRenderHead, r as renderTemplate, k as renderComponent } from '../../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                  */
import { $ as $$ScrollUp } from '../../chunks/ScrollUp_Daun5uoM.mjs';
import { $ as $$WithFooter } from '../../chunks/WithFooter_QHs-FNRp.mjs';
export { renderers } from '../../renderers.mjs';

const $$GlobalTagCalcDiagram = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg id="global-tag-calc-diagram" xmlns="http://www.w3.org/2000/svg" viewBox="99.5 19.5 601 739.5" data-astro-cid-z25j3r4n> <rect x="150" y="20" width="200" height="100" fill="#cce5ff" stroke="#7ea6e0" data-astro-cid-z25j3r4n></rect> <text x="250" y="45" font-size="18" text-anchor="middle" font-weight="bold" data-astro-cid-z25j3r4n>Tag 1</text> <text x="250" y="75" text-anchor="middle" data-astro-cid-z25j3r4n>Cats: A, B, C</text> <text x="250" y="95" text-anchor="middle" data-astro-cid-z25j3r4n>Lifespan: 95%</text> <rect x="450" y="20" width="200" height="100" fill="#cce5ff" stroke="#7ea6e0" data-astro-cid-z25j3r4n></rect> <text x="550" y="45" font-size="18" text-anchor="middle" font-weight="bold" data-astro-cid-z25j3r4n>Tag 2</text> <text x="550" y="75" text-anchor="middle" data-astro-cid-z25j3r4n>Cats: B, D, E</text> <text x="550" y="95" text-anchor="middle" data-astro-cid-z25j3r4n>Lifespan: 30%</text> <rect x="100" y="150" width="600" height="185" fill="#ffe6cc" stroke="#d79b00" data-astro-cid-z25j3r4n></rect> <text x="400" y="180" font-size="20" text-anchor="middle" font-weight="bold" data-astro-cid-z25j3r4n>Cat Scores</text> <text x="120" y="215" font-size="16" data-astro-cid-z25j3r4n>1. Weight for each tag:</text> <text x="140" y="240" data-astro-cid-z25j3r4n>Weight = tag <tspan font-weight="bold" data-astro-cid-z25j3r4n>T</tspan> lifespan % / number of cats in <tspan font-weight="bold" data-astro-cid-z25j3r4n>T</tspan></text> <text x="120" y="275" font-size="16" data-astro-cid-z25j3r4n>2. Score for each cat:</text> <text x="140" y="300" data-astro-cid-z25j3r4n>Cat Score = Σ (tag <tspan font-weight="bold" data-astro-cid-z25j3r4n>T</tspan> weight) where <tspan font-weight="bold" data-astro-cid-z25j3r4n>T</tspan> contains cat</text> <rect x="100" y="365" width="600" height="345" fill="#cf9" stroke="#97d077" data-astro-cid-z25j3r4n></rect> <text x="400" y="395" font-size="20" text-anchor="middle" font-weight="bold" data-astro-cid-z25j3r4n>Calculations</text> <text x="120" y="430" data-astro-cid-z25j3r4n>Tag 1 Weight: 95% ÷ 3 = <tspan font-weight="bold" data-astro-cid-z25j3r4n>31.67%</tspan> </text> <text x="120" y="460" data-astro-cid-z25j3r4n>Tag 2 Weight: 30% ÷ 3 = <tspan font-weight="bold" data-astro-cid-z25j3r4n>10%</tspan> </text> <text x="120" y="490" data-astro-cid-z25j3r4n>Cat A Score: 31.67% × 1 = 31.67</text> <text x="120" y="520" data-astro-cid-z25j3r4n>Cat B Score: (31.67% × 1) + (10% × 1) = 41.67</text> <text x="120" y="550" data-astro-cid-z25j3r4n>Cat C Score: 31.67% × 1 = 31.67</text> <text x="120" y="580" data-astro-cid-z25j3r4n>Cat D Score: 10% × 1 = 10</text> <text x="120" y="610" data-astro-cid-z25j3r4n>Cat E Score: 10% × 1 = 10</text> <text x="120" y="640" data-astro-cid-z25j3r4n>Highest Score: <tspan font-weight="bold" data-astro-cid-z25j3r4n>41.67</tspan> (Cat B) </text> <text x="120" y="670" data-astro-cid-z25j3r4n>Min score for Global Tag: 41.67 / 4 = <tspan font-weight="bold" data-astro-cid-z25j3r4n>10.4167</tspan> </text> <text x="400" y="750" font-size="18" text-anchor="middle" fill="#fff" font-weight="bold" data-astro-cid-z25j3r4n>Global Cats: A, B, C <tspan font-weight="normal" data-astro-cid-z25j3r4n>(D and E scores too low)</tspan> </text> </svg> `;
}, "/root/modeep-frontend/src/components/About/GlobalTagCalcDiagram.astro", void 0);

const $$How = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "WithFooter", $$WithFooter, { "Title": "A closer look at Modeep - key terms and systems", "data-astro-cid-7vbd4ryf": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-7vbd4ryf> <h1 data-astro-cid-7vbd4ryf>How Modeep Works</h1> <section data-astro-cid-7vbd4ryf> <h2 id="cats" class="subsection" data-astro-cid-7vbd4ryf>Meow</h2> <p data-astro-cid-7vbd4ryf> <em data-astro-cid-7vbd4ryf>Cats</em> is shorthand for <a href="#tags" data-astro-cid-7vbd4ryf>tag categories</a>. (And as a <a href="https://en.wikipedia.org/wiki/I_Can_Has_Cheezburger%3F" data-astro-cid-7vbd4ryf>classic Internet symbol</a>, cats also seem well fitted to moderate a curated collection of links.)
</p> <p data-astro-cid-7vbd4ryf>
When you <em data-astro-cid-7vbd4ryf>reveal</em> (post) a treasured link you decide the best cats to describe it and submit them
				as a vote. Your vote, which we'll call an <em data-astro-cid-7vbd4ryf>individual tag</em>, influences the link's <em data-astro-cid-7vbd4ryf><a href="#global-tags" data-astro-cid-7vbd4ryf>global tag</a></em> in proportion to its <a href="#global-tag-calculation" data-astro-cid-7vbd4ryf>estimated goodness of fit</a>.
</p> <p data-astro-cid-7vbd4ryf>
In searches, you can declare which cats must be present in the global tag of any found links by adding <em data-astro-cid-7vbd4ryf>cat filters</em>.
</p> <p data-astro-cid-7vbd4ryf>
Searches always show their <em data-astro-cid-7vbd4ryf>Top Cats</em>, the most frequent cats throughout all returned links, or
				their Top <em data-astro-cid-7vbd4ryf>Subcats</em>, the most frequent cats that were <strong data-astro-cid-7vbd4ryf>not provided as filters</strong>,
				if your search included cat filters.
</p> <p id="cat-stacking" data-astro-cid-7vbd4ryf>
Top cats or subcats can be stacked on existing filters to add specificity and rapidly concentrate on
				some theme(s). If your search gets too specific, remove cats to re-broaden the focus.
</p> </section> <section data-astro-cid-7vbd4ryf> <h2 id="core-actions" class="subsection" data-astro-cid-7vbd4ryf>Collective Evaluation</h2> <p data-astro-cid-7vbd4ryf>Anyone can use these methods to "vote" on the classifications of various links.</p> <p data-astro-cid-7vbd4ryf>This helps ensure that what YOU think is cool or important makes its way to others.</p> <h3 class="subsection" data-astro-cid-7vbd4ryf>Summarize</h3> <p data-astro-cid-7vbd4ryf>Every link has a summary page where anyone can offer their interpretation of its contents.</p> <p data-astro-cid-7vbd4ryf>
Summaries can be upvoted, and a link's top summary is displayed above its URL to provide a quick gist of
				what it contains. On your Treasure Map, other users see your summary, if you wrote one, for any links
				there.
</p> <h3 class="subsection" data-astro-cid-7vbd4ryf>Copy</h3> <p data-astro-cid-7vbd4ryf> <strong data-astro-cid-7vbd4ryf>Copying</strong> links to your Treasure Map bookmarks them publicly, so that both you and your fans
				can easily find them by reading your Treasure Map.
</p> <h3 class="subsection" data-astro-cid-7vbd4ryf>Star</h3> <p data-astro-cid-7vbd4ryf> <strong data-astro-cid-7vbd4ryf>Starring</strong> links vouches for their "goodness" (comprehensiveness, authenticity, hilarity&mdash;whatever).
				It helps move the really great stuff to the top of searches. You can give 1-3 stars depending on how epic
				you deem something to be.
</p> <h3 id="tags" class="subsection" data-astro-cid-7vbd4ryf>Tag</h3> <p data-astro-cid-7vbd4ryf> <strong data-astro-cid-7vbd4ryf>Tagging</strong> links helps the right people find them. Tags are personal interpretations of the
				topics that various links may be associated with, or terms that someone interested in them might look up.
</p> <p data-astro-cid-7vbd4ryf>
Every link has a tag page where individual tags can be submitted or edited and where you can see its top <a href="#global-tags" data-astro-cid-7vbd4ryf>highest-weighted</a> tags.
</p> <p data-astro-cid-7vbd4ryf>
We don't have to agree on the most appropriate cat(s) for any link. By acknowledging both individual and
				global tags, we can enjoy the benefits of collective thinking without drowning out valuable individual
				opinions.
</p> </section> <section id="global-tags" data-astro-cid-7vbd4ryf> <h2 data-astro-cid-7vbd4ryf>Global Tags and the Global Treasure Map</h2> <p data-astro-cid-7vbd4ryf>
Any individual tag decides how the link it applies to is sorted on the tag author's Treasure Map. Every
				link also has a global tag, which determines its placement on the <em data-astro-cid-7vbd4ryf>Global Treasure Map</em>. The
				Global Treasure Map represents the averages of individual tags and the aggregate of other forms of
				feedback such as likes and clicks. You can access it from <a href="/search" data-astro-cid-7vbd4ryf>Search</a> or <a href="/more" data-astro-cid-7vbd4ryf>More Cats</a>. A global tag represents an approximate consensus of a link's key concepts.
</p> <p data-astro-cid-7vbd4ryf>
Global tags for a link are calculated automatically based on: <strong data-astro-cid-7vbd4ryf>1)</strong> the age of each individual
				tag and <strong data-astro-cid-7vbd4ryf>2)</strong> the frequencies of cats across all of them. This system is based on the assumptions
				that the best interpretations of various links' cats (most logical, most useful, etc.) will be those that
<strong data-astro-cid-7vbd4ryf>1)</strong> reappear often across tags or <strong data-astro-cid-7vbd4ryf>2)</strong> remain unedited for a long time.
</p> <p data-astro-cid-7vbd4ryf>
Each individual tag shows, in addition to its cats, its <em data-astro-cid-7vbd4ryf>lifespan overlap percentage</em>, author,
				and submission timestamp. Tags that have kept the same combination of cats for greater portions of their
				link's lifespan are given greater weight in influencing the global tag. Editing a tag's cats resets its
				lifespan overlap percentage.
</p> <p data-astro-cid-7vbd4ryf> <strong data-astro-cid-7vbd4ryf>Note:</strong> a link's global cats will not necessarily resemble only its highest-ranked tags. If
				many newer tags contain some cats that are not already present in the global tag, it's likely that those
				will also be assigned. A long-unchanged tag could still be a poor representation, but if enough people disagree
				and submit alternative tags their collective input will nullify it; the old tag's cats will likely be removed
				from the global tag.
</p> </section> <section data-astro-cid-7vbd4ryf> <h2 id="global-tag-calculation" class="subsection" data-astro-cid-7vbd4ryf>Global Tag Calculation</h2> <p data-astro-cid-7vbd4ryf>Note: <a href="/feedback" data-astro-cid-7vbd4ryf>constructive criticism welcomed</a> for this system.</p> <p data-astro-cid-7vbd4ryf>
For a cat to be added to link <code data-astro-cid-7vbd4ryf>L</code>'s global tags, it's <em data-astro-cid-7vbd4ryf>score</em> must be &ge;25% of the highest
				score among <code data-astro-cid-7vbd4ryf>L</code>'s cats.
</p> <p data-astro-cid-7vbd4ryf> <em data-astro-cid-7vbd4ryf>Scores</em> for cat <code data-astro-cid-7vbd4ryf>C</code> of link <code data-astro-cid-7vbd4ryf>L</code> are calculated as the sum of scores from all
				occurrences of <code data-astro-cid-7vbd4ryf>C</code> in <code data-astro-cid-7vbd4ryf>L</code>'s tags.
</p> <p data-astro-cid-7vbd4ryf>
Each bit of score added for a cat is scaled down according to the weight of the tag in which the cat was
				found.
</p> <p data-astro-cid-7vbd4ryf>
A tag's weight is inversely proportional to its total number of cats. (e.g., a cat from a tag with only
				1 cat counts for 10x more than one from a tag with 10 cats.)
</p> <p data-astro-cid-7vbd4ryf>
Weights for tag <code data-astro-cid-7vbd4ryf>T</code> are calculated as <em data-astro-cid-7vbd4ryf>lifespan overlap percentage</em> of <code data-astro-cid-7vbd4ryf>T</code>,
				divided by <code data-astro-cid-7vbd4ryf>T</code>'s number of cats.
</p> <p data-astro-cid-7vbd4ryf>
Lifespan overlap percentage for tag <code data-astro-cid-7vbd4ryf>T</code> of link <code data-astro-cid-7vbd4ryf>L</code> is the percentage of <code data-astro-cid-7vbd4ryf>L</code>'s time on Modeep that <code data-astro-cid-7vbd4ryf>T</code> has existed since creation or last edit.
</p> ${renderComponent($$result2, "GlobalTagCalcDiagram", $$GlobalTagCalcDiagram, { "data-astro-cid-7vbd4ryf": true })} </section> <section data-astro-cid-7vbd4ryf> <h2 id="retrieving-metadata" class="subsection" data-astro-cid-7vbd4ryf>Retrieving Metadata</h2> <p data-astro-cid-7vbd4ryf>
Modeep employs very limited use of automated website requests to fetch <a href="https://ogp.me/" data-astro-cid-7vbd4ryf>Open Graph</a> metadata for submitted links. This is to attempt to find a thumbnail preview image and descriptive text
				("Auto Summary") to display with them.
</p> <p data-astro-cid-7vbd4ryf>These requests can be identified by the <strong data-astro-cid-7vbd4ryf>Modeep-Bot</strong> user agent.</p> <p data-astro-cid-7vbd4ryf>
A max of 1-3 automated requests go out to each submitted URL (Modeep-Bot tries different protocol
				prefixes, e.g., "https://" and "http://", if the first request fails).
</p> <p data-astro-cid-7vbd4ryf>
The goal, as with all of this, is to help promote and garner appreciation for great, public Internet
				sites. Links with an appropriate thumbnail and/or summary are easiest for would-be-enjoyers to notice.
</p> <p data-astro-cid-7vbd4ryf> <strong data-astro-cid-7vbd4ryf>Anyone can have their site or domain added to a no-touch list (exempt from Modeep's automated
					traffic) upon request with no questions asked</strong>: just email <a href="mailto:support@modeep.org" data-astro-cid-7vbd4ryf>support@modeep.org</a> to let us know.
</p> </section> ${renderComponent($$result2, "ScrollUp", $$ScrollUp, { "data-astro-cid-7vbd4ryf": true })} </main> ` })} `;
}, "/root/modeep-frontend/src/pages/about/how.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/about/how.astro";
const $$url = "/about/how";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$How,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
