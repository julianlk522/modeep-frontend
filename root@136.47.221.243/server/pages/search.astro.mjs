import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { b as $$NoLinksFound } from '../chunks/NoLinksFound_BFMx5p28.mjs';
import { $ as $$Rankings } from '../chunks/Rankings_BoPxpQ4g.mjs';
import { $ as $$LocalStorageLoader, S as SearchFilters } from '../chunks/LocalStorageLoader_BTWcucKt.mjs';
import { L as LINKS_ENDPOINT, C as CATS_ENDPOINT, d as CONTRIBUTORS_ENDPOINT } from '../chunks/constants_Ckpmcx4f.mjs';
import { $ as $$WithFooter } from '../chunks/WithFooter_QHs-FNRp.mjs';
import { P as Periods, S as SortMetrics, f as fetch_with_handle_redirect } from '../chunks/fetch_with_handle_redirect_CiOAvHRj.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const token = Astro2.cookies.get("token")?.value;
  const user = Astro2.cookies.get("user")?.value;
  const params = Astro2.url.searchParams;
  let cats = "";
  if (params.get("cats")) {
    cats = params.get("cats");
  }
  let neutered_cats = "";
  if (params.get("neutered")) {
    neutered_cats = params.get("neutered");
  }
  let summary_contains = "";
  if (params.get("summary_contains")) {
    summary_contains = params.get("summary_contains");
  }
  let url_contains = "";
  if (params.get("url_contains")) {
    url_contains = params.get("url_contains");
  }
  let url_lacks = "";
  if (params.get("url_lacks")) {
    url_lacks = params.get("url_lacks");
  }
  let period = "all";
  if (params.get("period") && Periods.includes(params.get("period"))) {
    period = params.get("period");
  }
  let sort_by = "times_starred";
  if (params.get("sort_by") && SortMetrics.includes(params.get("sort_by"))) {
    sort_by = params.get("sort_by");
  }
  let include_nsfw = false;
  if (params.get("include_nsfw") && params.get("include_nsfw") === "true") {
    include_nsfw = true;
  }
  let page = 1;
  if (params.get("page")) {
    page = parseInt(params.get("page"));
  }
  const url_params = {
    Cats: cats,
    NeuteredCats: neutered_cats,
    Period: period !== "all" ? period : void 0,
    SortBy: sort_by !== "times_starred" ? sort_by : void 0,
    IncludeNSFW: include_nsfw,
    SummaryContains: summary_contains,
    URLContains: url_contains,
    URLLacks: url_lacks,
    Page: page
  };
  let links_url = LINKS_ENDPOINT;
  if (params.size) {
    links_url += `?${params.toString()}`;
  }
  const get_links_resp = await (token ? fetch_with_handle_redirect(links_url, {
    headers: { Authorization: `Bearer ${token}` }
  }) : fetch_with_handle_redirect(links_url));
  if (!get_links_resp.Response || get_links_resp.RedirectTo) {
    return Astro2.redirect(get_links_resp.RedirectTo);
  }
  const data = await get_links_resp.Response.json();
  const { Links: links, NSFWLinksCount: nsfw_links_count, MergedCats: merged_cats } = data;
  if (!links?.length) {
    if (page > 1) {
      const redirect_url = new URL(Astro2.url);
      redirect_url.searchParams.delete("page");
      return Astro2.redirect(redirect_url);
    }
  }
  let top_cats = [];
  let top_subcats = [];
  const params_minus_page = new URLSearchParams();
  for (const [key, value] of params.entries()) {
    if (key !== "page") {
      params_minus_page.set(key, value);
    }
  }
  const cats_and_contributors_href_suffix = params_minus_page.size ? `?${params_minus_page.toString()}` : "";
  let cats_url = CATS_ENDPOINT + cats_and_contributors_href_suffix;
  let contributors_url = CONTRIBUTORS_ENDPOINT + cats_and_contributors_href_suffix;
  if (cats) {
    const subcats_resp = await fetch_with_handle_redirect(cats_url);
    if (!subcats_resp.Response || subcats_resp.RedirectTo) {
      return Astro2.redirect(subcats_resp.RedirectTo);
    }
    top_subcats = await subcats_resp.Response.json();
  } else {
    const top_cats_resp = await fetch_with_handle_redirect(cats_url);
    if (!top_cats_resp.Response || top_cats_resp.RedirectTo) {
      return Astro2.redirect(top_cats_resp.RedirectTo);
    }
    top_cats = await top_cats_resp.Response.json();
  }
  let top_contributors = [];
  const contributors_resp = await fetch_with_handle_redirect(contributors_url);
  if (!contributors_resp.Response || contributors_resp.RedirectTo) {
    return Astro2.redirect(contributors_resp.RedirectTo);
  }
  top_contributors = await contributors_resp.Response.json();
  let page_title = "Search";
  if (cats) {
    const cats_split = cats ? cats.split(",") : [];
    const has_many_cats = cats_split.length > 3;
    const cats_title_text = has_many_cats ? cats_split.slice(0, 3).join(" + ") + "..." : cats_split.join(" + ");
    page_title = page_title += `: ${cats_title_text}`;
  }
  return renderTemplate`${renderComponent($$result, "WithFooter", $$WithFooter, { "Title": page_title }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "LocalStorageLoader", $$LocalStorageLoader, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "SearchFilters", SearchFilters, { "client:load": true, "InitialCats": cats.length ? cats.split(",") : [], "InitialNeuteredCats": neutered_cats.length ? neutered_cats.split(",") : [], "InitialPeriod": period, "InitialSummaryContains": summary_contains, "InitialURLContains": url_contains, "InitialURLLacks": url_lacks, "InitialSortBy": sort_by, "InitialIncludeNSFW": include_nsfw, "NSFWLinksCount": nsfw_links_count, "client:component-hydration": "load", "client:component-path": "/root/modeep-frontend/src/components/SearchFilters/Filters", "client:component-export": "default" })} ${links && links.length ? renderTemplate`${renderComponent($$result2, "Rankings", $$Rankings, { "Links": links, "URLParams": url_params, "Pages": data.Pages, "TopCats": cats ? top_subcats : top_cats, "TopContributors": top_contributors, "MergedCats": merged_cats, "Token": token, "User": user })}` : renderTemplate`${renderComponent($$result2, "NoLinksFound", $$NoLinksFound, { "AddSomethingPrompt": true })}`} </main> ` })}`;
}, "/root/modeep-frontend/src/pages/search.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Search,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
