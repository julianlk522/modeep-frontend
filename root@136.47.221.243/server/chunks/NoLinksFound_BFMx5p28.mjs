import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, h as addAttribute, k as renderComponent, n as Fragment } from './astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */
import { k as MIN_LIST_ITEMS_FOR_SCROLLBAR, m as CATS_PAGE_LIMIT } from './constants_Ckpmcx4f.mjs';
import { T as TagCat } from './fetch_with_handle_redirect_CiOAvHRj.mjs';

const $$Astro$2 = createAstro();
const $$MergedResultsNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MergedResultsNotice;
  let { MergedCats: merged_cats } = Astro2.props;
  if (merged_cats.length > 3) {
    merged_cats = merged_cats.slice(0, 3).concat(`and ${merged_cats.length - 3} others`);
  }
  return renderTemplate`${maybeRenderHead()}<p id="merged-results-notice" data-astro-cid-45e57voz>
(Merging results for: ${renderTemplate`<span data-astro-cid-45e57voz>${merged_cats.join(", ")}</span>`})
</p> `;
}, "/root/modeep-frontend/src/components/Rankings/MergedResultsNotice.astro", void 0);

function get_non_cats_url_params(params_obj) {
  const {
    // cats params reset by clicking a cat - not needed in that case
    NeuteredCats: neutered_cats,
    Period: period,
    SummaryContains: summary_contains,
    URLContains: url_contains,
    URLLacks: url_lacks,
    SortBy: sort_by,
    IncludeNSFW: include_nsfw
  } = params_obj;
  const params = new URLSearchParams();
  if (neutered_cats) {
    params.set("neutered", neutered_cats);
  }
  if (period) {
    params.set("period", period);
  }
  if (summary_contains) {
    params.set("summary_contains", summary_contains);
  }
  if (url_contains) {
    params.set("url_contains", url_contains);
  }
  if (url_lacks) {
    params.set("url_lacks", url_lacks);
  }
  if (sort_by) {
    params.set("sort_by", sort_by);
  }
  if (include_nsfw) {
    params.set("include_nsfw", include_nsfw.toString());
  }
  return params.toString();
}

const $$Astro$1 = createAstro();
const $$TopCats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TopCats;
  const {
    TopCats: top_cats,
    URLParams: url_params,
    More: more,
    Mini: mini,
    SingleTmapSection: single_tmap_section,
    IsTmapFromUser: tmap_owner
  } = Astro2.props;
  let top_cats_classes = more ? ["more"] : tmap_owner ? ["tmap"] : [];
  if (mini) top_cats_classes.push("mini");
  if (!more && top_cats?.length >= MIN_LIST_ITEMS_FOR_SCROLLBAR) top_cats_classes.push("scrollable");
  const has_subcats = url_params.Cats ? true : false;
  let endpoint = tmap_owner ? `/map/${tmap_owner}` : "/search";
  if (single_tmap_section) endpoint += `/${single_tmap_section}`;
  const non_cats_url_params = get_non_cats_url_params(url_params);
  return renderTemplate`${top_cats?.length ? renderTemplate`${maybeRenderHead()}<div id="top-cats-container"${addAttribute(`${tmap_owner ? "tmap" : ""}${more ? " more" : ""}`, "class")} data-astro-cid-t6lay67j><h2${addAttribute(more ? "more" : "", "class")} data-astro-cid-t6lay67j>${has_subcats ? "Top Subcats" : more ? "More Cats" : "Top Cats"}</h2><ol id="top-cats"${addAttribute(top_cats_classes.join(" "), "class")} data-astro-cid-t6lay67j>${top_cats.map((cat) => {
    const new_cats_params = (url_params.Cats ? url_params.Cats + "," + cat.Category : cat.Category).split(",").sort((a, b) => a.localeCompare(b)).join(",");
    return renderTemplate`${renderComponent($$result, "TagCat", TagCat, { "Cat": cat.Category, "Count": cat.Count, "IsNSFW": cat.Category === "NSFW", "Href": `${endpoint}?cats=${new_cats_params}${non_cats_url_params.length ? `&${non_cats_url_params}` : ""}`, "IsMorePage": more, "data-astro-cid-t6lay67j": true })}`;
  })}</ol>${top_cats.length === CATS_PAGE_LIMIT ? renderTemplate`<span id="to-more" data-astro-cid-t6lay67j><a${addAttribute(
    has_subcats ? `/more?cats=${url_params.Cats}${non_cats_url_params.length ? `&${non_cats_url_params}` : ""}` : `/more${non_cats_url_params.length ? `?${non_cats_url_params}` : ""}`,
    "href"
  )} data-astro-cid-t6lay67j>
more
</a><img src="../../back.svg" alt="Go to /more"${addAttribute(18, "height")}${addAttribute(18, "width")} data-astro-cid-t6lay67j></span>` : null}</div>` : has_subcats ? renderTemplate`<p id="no-further-cats" data-astro-cid-t6lay67j>No further subcats.</p>` : null}`;
}, "/root/modeep-frontend/src/components/Rankings/TopCats.astro", void 0);

const $$Astro = createAstro();
const $$NoLinksFound = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NoLinksFound;
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-il4hyych> <p id="no-links" data-astro-cid-il4hyych>Alas, no treasure here.</p> <p data-astro-cid-il4hyych>&macr;&bsol;&lowbar;&lpar;&#x30c4;&rpar;&lowbar;&sol;&macr;</p> ${Astro2.props.AddSomethingPrompt && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-il4hyych": true }, { "default": ($$result2) => renderTemplate` <p id="hope" data-astro-cid-il4hyych>Unless... ?</p> <p id="anime-glasses-moment" data-astro-cid-il4hyych> <a href="/new" data-astro-cid-il4hyych>I know a thing</a> </p> ` })}`} </section> `;
}, "/root/modeep-frontend/src/components/Rankings/NoLinksFound.astro", void 0);

export { $$MergedResultsNotice as $, $$TopCats as a, $$NoLinksFound as b, get_non_cats_url_params as g };
