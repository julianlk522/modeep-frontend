import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$MergedResultsNotice, a as $$TopCats, b as $$NoLinksFound } from '../chunks/NoLinksFound_BFMx5p28.mjs';
import { $ as $$ScrollUp } from '../chunks/ScrollUp_Daun5uoM.mjs';
import { $ as $$LocalStorageLoader, S as SearchFilters } from '../chunks/LocalStorageLoader_BTWcucKt.mjs';
import { C as CATS_ENDPOINT } from '../chunks/constants_Ckpmcx4f.mjs';
import { $ as $$WithFooter } from '../chunks/WithFooter_QHs-FNRp.mjs';
import { P as Periods, f as fetch_with_handle_redirect, h as has_merged_cats_property } from '../chunks/fetch_with_handle_redirect_CiOAvHRj.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$More = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$More;
  const params = Astro2.url.searchParams;
  params.set("more", "true");
  let cats = "";
  if (params.get("cats")) {
    cats = params.get("cats") ?? "";
  }
  let neutered_cats = "";
  if (params.get("neutered")) {
    neutered_cats = params.get("neutered") ?? "";
  }
  let summary_contains = "";
  if (params.get("summary_contains")) {
    summary_contains = params.get("summary_contains") ?? "";
  }
  let url_contains = "";
  if (params.get("url_contains")) {
    url_contains = params.get("url_contains") ?? "";
  }
  let url_lacks = "";
  if (params.get("url_lacks")) {
    url_lacks = params.get("url_lacks") ?? "";
  }
  let period = "";
  if (params.get("period") && Periods.includes(params.get("period"))) {
    period = params.get("period");
  }
  const more_cats_url = params.size ? `${CATS_ENDPOINT}?${params.toString()}` : CATS_ENDPOINT;
  const url_params = {
    Cats: cats,
    NeuteredCats: neutered_cats,
    Period: period ? period : void 0,
    SummaryContains: summary_contains,
    URLContains: url_contains,
    URLLacks: url_lacks
    // SortBy/IncludeNSFW/Page not relevant here since we are
    // only returning cat counts, not links
  };
  const counts_resp = await fetch_with_handle_redirect(more_cats_url);
  if (!counts_resp.Response || counts_resp.RedirectTo) {
    return Astro2.redirect(counts_resp.RedirectTo);
  }
  const counts = await counts_resp.Response.json();
  let top_cats = [];
  let merged_cats = void 0;
  if (has_merged_cats_property(counts)) {
    top_cats = counts.Counts;
    merged_cats = counts.MergedCats;
  } else {
    top_cats = counts;
  }
  return renderTemplate`${renderComponent($$result, "WithFooter", $$WithFooter, { "Title": "More Cats" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "LocalStorageLoader", $$LocalStorageLoader, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "SearchFilters", SearchFilters, { "client:load": true, "InitialCats": cats.length ? cats.split(",") : [], "InitialNeuteredCats": neutered_cats.length ? neutered_cats.split(",") : [], "InitialPeriod": period ?? "all", "InitialSummaryContains": summary_contains, "InitialURLContains": url_contains, "InitialURLLacks": url_lacks, "Endpoint": "/more", "client:component-hydration": "load", "client:component-path": "/root/modeep-frontend/src/components/SearchFilters/Filters", "client:component-export": "default" })} ${top_cats?.length ? renderTemplate`<section> ${merged_cats && merged_cats.length ? renderTemplate`${renderComponent($$result2, "MergedResultsNotice", $$MergedResultsNotice, { "MergedCats": merged_cats })}` : null} ${renderComponent($$result2, "TopCats", $$TopCats, { "TopCats": top_cats, "URLParams": url_params, "More": true })} </section>` : cats ? renderTemplate`<p>No further subcats.</p>` : renderTemplate`${renderComponent($$result2, "NoLinksFound", $$NoLinksFound, {})}`} ${renderComponent($$result2, "ScrollUp", $$ScrollUp, {})} </main> ` })}`;
}, "/root/modeep-frontend/src/pages/more.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/more.astro";
const $$url = "/more";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$More,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
