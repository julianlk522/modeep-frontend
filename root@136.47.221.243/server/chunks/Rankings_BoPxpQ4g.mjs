import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, n as Fragment, l as renderScript } from './astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { t as tmap_sections } from './fetch_with_handle_redirect_CiOAvHRj.mjs';
import { $ as $$ScrollUp } from './ScrollUp_Daun5uoM.mjs';
import { g as get_non_cats_url_params, b as $$NoLinksFound, $ as $$MergedResultsNotice, a as $$TopCats } from './NoLinksFound_BFMx5p28.mjs';
import 'clsx';
import { k as MIN_LIST_ITEMS_FOR_SCROLLBAR, l as LINKS_PAGE_LIMIT } from './constants_Ckpmcx4f.mjs';
/* empty css                         */
import { L as Link } from './Link_BlNARokb.mjs';

const $$Astro$3 = createAstro();
const $$TopContributors = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TopContributors;
  const { Contributors: contributors, URLParams: url_params } = Astro2.props;
  let href_suffix = "";
  if (url_params) {
    const params = new URLSearchParams();
    const {
      Cats: cats,
      NeuteredCats: neutered_cats,
      Period: period,
      SortBy: sort_by,
      IncludeNSFW: include_nsfw,
      SummaryContains: summary_contains,
      URLContains: url_contains,
      URLLacks: url_lacks
    } = url_params;
    if (cats) {
      params.set("cats", cats);
    }
    if (neutered_cats) {
      params.set("neutered", neutered_cats);
    }
    if (period && period !== "all") {
      params.set("period", period);
    }
    if (sort_by && sort_by !== "times_starred") {
      params.set("sort_by", sort_by);
    }
    if (include_nsfw) {
      params.set("include_nsfw", "true");
    }
    if (summary_contains?.length) {
      params.set("summary_contains", summary_contains);
    }
    if (url_contains?.length) {
      params.set("url_contains", url_contains);
    }
    if (url_lacks?.length) {
      params.set("url_lacks", url_lacks);
    }
    href_suffix = params.size ? `?${params.toString()}` : "";
  }
  return renderTemplate`${maybeRenderHead()}<div id="top-contributors-container" data-astro-cid-d5zcdajq> <h2 data-astro-cid-d5zcdajq>Top Treasure Hunters</h2> <ol id="top-contributors"${addAttribute(contributors?.length >= MIN_LIST_ITEMS_FOR_SCROLLBAR ? "scrollable" : "", "class")} data-astro-cid-d5zcdajq> ${contributors.map((c) => renderTemplate`<li data-astro-cid-d5zcdajq> <strong data-astro-cid-d5zcdajq> <a${addAttribute(`/map/${c.LoginName}${href_suffix}`, "href")} data-astro-cid-d5zcdajq>${c.LoginName}</a> </strong> <span data-astro-cid-d5zcdajq>(${c.LinksSubmitted})</span> </li>`)} </ol> </div> `;
}, "/root/modeep-frontend/src/components/Rankings/TopContributors.astro", void 0);

function get_page_href(opts) {
  const {
    BaseHref: base_href,
    Page: page,
    OtherParams: params
  } = opts;
  params.set("page", page.toString());
  return `${base_href}?${params.toString()}`;
}

const $$Astro$2 = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Pagination;
  const {
    URLParams: url_params,
    Pages: pages,
    SingleTmapSectionName: single_tmap_section_name,
    TmapOwner: tmap_owner
  } = Astro2.props;
  const {
    Cats: cats,
    NeuteredCats: neutered_cats,
    Period: period,
    SummaryContains: summary_contains,
    URLContains: url_contains,
    URLLacks: url_lacks,
    SortBy: sort_by,
    IncludeNSFW: include_nsfw
  } = url_params;
  const page = url_params.Page ?? 1;
  const params = new URLSearchParams();
  if (cats !== void 0 && cats.length) {
    params.set("cats", cats);
  }
  if (neutered_cats !== void 0 && neutered_cats.length) {
    params.set("neutered", neutered_cats);
  }
  if (period && period !== "all") {
    params.set("period", period);
  }
  if (sort_by && sort_by !== "times_starred") {
    params.set("sort_by", sort_by);
  }
  if (include_nsfw) {
    params.set("include_nsfw", "true");
  }
  if (summary_contains && summary_contains.length) {
    params.set("summary_contains", summary_contains);
  }
  if (url_contains && url_contains.length) {
    params.set("url_contains", url_contains);
  }
  if (url_lacks && url_lacks.length) {
    params.set("url_lacks", url_lacks);
  }
  let base_href = single_tmap_section_name ? `/map/${tmap_owner}/${single_tmap_section_name.toLowerCase()}` : "/search";
  return renderTemplate`${maybeRenderHead()}<nav class="pagination" data-astro-cid-d776pwuy> ${page > 1 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-d776pwuy": true }, { "default": ($$result2) => renderTemplate` <a${addAttribute(
    get_page_href({
      BaseHref: base_href,
      OtherParams: params,
      Page: 1
    }),
    "href"
  )} data-astro-cid-d776pwuy>1</a> ${page > 3 ? renderTemplate`<span data-astro-cid-d776pwuy>...</span>` : renderTemplate`<span data-astro-cid-d776pwuy> . </span>`}` })}` : null} ${page > 2 ? renderTemplate`<span data-astro-cid-d776pwuy> <a${addAttribute(
    get_page_href({
      BaseHref: base_href,
      OtherParams: params,
      Page: page - 1
    }),
    "href"
  )} data-astro-cid-d776pwuy> ${page - 1} </a> ${" . "} </span>` : null} <span data-astro-cid-d776pwuy>${page}</span> ${pages > page ? renderTemplate`<span data-astro-cid-d776pwuy> ${" . "} <a${addAttribute(
    get_page_href({
      BaseHref: base_href,
      OtherParams: params,
      Page: page + 1
    }),
    "href"
  )} data-astro-cid-d776pwuy> ${page + 1} </a> </span>` : null} ${pages > page + 1 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-d776pwuy": true }, { "default": ($$result2) => renderTemplate` <span data-astro-cid-d776pwuy> ${" . "} <a${addAttribute(
    get_page_href({
      BaseHref: base_href,
      OtherParams: params,
      Page: page + 2
    }),
    "href"
  )} data-astro-cid-d776pwuy>${page + 2}</a> </span> ${pages > page + 2 ? renderTemplate`<span data-astro-cid-d776pwuy> ${pages > page + 3 ? renderTemplate`<span data-astro-cid-d776pwuy> ... </span>` : renderTemplate`<span data-astro-cid-d776pwuy> . </span>`} <a${addAttribute(
    get_page_href({
      BaseHref: base_href,
      OtherParams: params,
      Page: pages
    }),
    "href"
  )} data-astro-cid-d776pwuy> ${pages} </a> </span>` : null}` })}` : null} </nav> `;
}, "/root/modeep-frontend/src/components/Pagination.astro", void 0);

const $$Astro$1 = createAstro();
const $$TopLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TopLinks;
  const {
    Links: links,
    URLParams: url_params,
    Pages: pages,
    Tmap: tmap,
    MultipleTmapSections: multiple_tmap_sections,
    SingleTmapSection: single_tmap_section,
    SingleTmapSectionName: single_tmap_section_name,
    TmapOwner: tmap_owner_login_name,
    IsHomePage: is_home_page,
    User: user,
    Token: token
  } = Astro2.props;
  const page = url_params.Page;
  const non_cats_url_params = get_non_cats_url_params(url_params);
  const is_only_page = !page || !pages || page === 1 && pages < 2;
  const is_your_tmap = tmap_owner_login_name !== void 0 && user == tmap_owner_login_name;
  const home_page_non_default_periods = ["day", "month", "year", "all"];
  return renderTemplate`${maybeRenderHead()}<div id="top-links" data-astro-cid-tgdw3fqy> ${renderScript($$result, "/root/modeep-frontend/src/components/Rankings/TopLinks.astro?astro&type=script&index=0&lang.ts")} ${is_home_page || links?.length ? renderTemplate`<section class="links-section" data-astro-cid-tgdw3fqy> ${is_home_page ? renderTemplate`<ul id="change-period" data-astro-cid-tgdw3fqy> <li data-astro-cid-tgdw3fqy> <h2 data-astro-cid-tgdw3fqy>Treasure This Week:</h2> </li> ${home_page_non_default_periods.map((period) => renderTemplate`<li class="period" data-astro-cid-tgdw3fqy> <a${addAttribute(`/search?period=${period}`, "href")} data-astro-cid-tgdw3fqy>${period}</a> </li>`)} </ul>` : null} ${links?.length ? renderTemplate`<ol${addAttribute(page ? (page - 1) * LINKS_PAGE_LIMIT + 1 : "", "start")} data-astro-cid-tgdw3fqy> ${links?.map((link) => renderTemplate`${renderComponent($$result, "Link", Link, { "client:load": true, "Link": link, "NonCatsURLParams": non_cats_url_params, "Token": token, "User": user, "client:component-hydration": "load", "client:component-path": "/root/modeep-frontend/src/components/Link/Link", "client:component-export": "default", "data-astro-cid-tgdw3fqy": true })}`)} </ol>` : renderTemplate`${renderComponent($$result, "NoLinksFound", $$NoLinksFound, { "AddSomethingPrompt": true, "data-astro-cid-tgdw3fqy": true })}`} </section>` : tmap ? multiple_tmap_sections?.length ? renderTemplate`<div id="tmap-multiple-sections-container" data-astro-cid-tgdw3fqy> ${multiple_tmap_sections.map((s) => {
    const is_section_with_more = tmap.SectionsWithMore?.length && tmap.SectionsWithMore?.includes(s.toLowerCase());
    return renderTemplate`<section${addAttribute(s.toLowerCase(), "id")} class="links-section" data-astro-cid-tgdw3fqy> <div${addAttribute(is_section_with_more ? "section-with-more" : "", "class")} data-astro-cid-tgdw3fqy> <img class="section-expansion-arrow" src="../../back.svg" alt="Section is expanded"${addAttribute(20, "height")}${addAttribute(20, "width")} data-astro-cid-tgdw3fqy> <h2 data-astro-cid-tgdw3fqy>${s}</h2> ${is_section_with_more ? renderTemplate`<span class="see-all" data-astro-cid-tgdw3fqy> <a${addAttribute(Astro2.url.href.replace(
      `/map/${tmap_owner_login_name}`,
      `/map/${tmap_owner_login_name}/${s.toLowerCase()}`
    ), "href")} onclick="event.stopPropagation()" data-astro-cid-tgdw3fqy>
See All
</a> </span>` : null} <div class="bg" data-astro-cid-tgdw3fqy></div> </div> <ol data-astro-cid-tgdw3fqy> ${tmap[s].map((link) => renderTemplate`${renderComponent($$result, "Link", Link, { "client:load": true, "Link": link, "NonCatsURLParams": non_cats_url_params, "CatsFromUser": link.CatsFromUser ? tmap_owner_login_name : void 0, "IsTmapPage": true, "Token": token, "User": user, "client:component-hydration": "load", "client:component-path": "/root/modeep-frontend/src/components/Link/Link", "client:component-export": "default", "data-astro-cid-tgdw3fqy": true })}`)} </ol> </section>`;
  })} </div>` : renderTemplate`${renderComponent($$result, "NoLinksFound", $$NoLinksFound, { "AddSomethingPrompt": is_your_tmap, "data-astro-cid-tgdw3fqy": true })}` : single_tmap_section?.length ? renderTemplate`<section${addAttribute(`${single_tmap_section_name?.toLowerCase()}-links`, "id")} class="links-section single-tmap-section" data-astro-cid-tgdw3fqy> <ol${addAttribute(page ? (page - 1) * LINKS_PAGE_LIMIT + 1 : "", "start")} data-astro-cid-tgdw3fqy> ${single_tmap_section.map((link) => renderTemplate`${renderComponent($$result, "Link", Link, { "client:load": true, "Link": link, "NonCatsURLParams": non_cats_url_params, "IsTmapPage": true, "CatsFromUser": link.CatsFromUser ? tmap_owner_login_name : void 0, "Token": token, "User": user, "client:component-hydration": "load", "client:component-path": "/root/modeep-frontend/src/components/Link/Link", "client:component-export": "default", "data-astro-cid-tgdw3fqy": true })}`)} </ol> </section>` : renderTemplate`${renderComponent($$result, "NoLinksFound", $$NoLinksFound, { "AddSomethingPrompt": is_your_tmap, "data-astro-cid-tgdw3fqy": true })}`} ${is_only_page ? null : renderTemplate`${renderComponent($$result, "Pagination", $$Pagination, { "URLParams": is_home_page ? { ...url_params, Period: "month" } : url_params, "Pages": pages, "SingleTmapSectionName": single_tmap_section_name, "TmapOwner": tmap_owner_login_name, "data-astro-cid-tgdw3fqy": true })}`} </div> `;
}, "/root/modeep-frontend/src/components/Rankings/TopLinks.astro", void 0);

const $$Astro = createAstro();
const $$Rankings = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Rankings;
  const {
    Links: links,
    URLParams: url_params,
    Pages: pages,
    TopCats: top_cats,
    TopContributors: top_contributors,
    MergedCats: merged_cats,
    Tmap: tmap,
    SingleTmapSection: single_tmap_section,
    SingleTmapSectionName: single_tmap_section_name,
    IsHomePage: is_home_page,
    IsTmapFromUser: tmap_owner,
    User: user,
    Token: token
  } = Astro2.props;
  let multiple_tmap_sections = [];
  if (tmap) {
    multiple_tmap_sections = tmap_sections.filter((s) => tmap[s]?.length);
  }
  const no_links_found = links && links.length === 0 || tmap && multiple_tmap_sections.length === 0;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-7jzpvmdx": true }, { "default": ($$result2) => renderTemplate`${merged_cats && merged_cats.length ? renderTemplate`${renderComponent($$result2, "MergedResultsNotice", $$MergedResultsNotice, { "MergedCats": merged_cats, "data-astro-cid-7jzpvmdx": true })}` : null}${maybeRenderHead()}<div id="rankings"${addAttribute(`${is_home_page ? "home" : ""}${merged_cats && merged_cats.length ? " has-merged-results" : ""}`, "class")} data-astro-cid-7jzpvmdx>${no_links_found ? null : renderTemplate`<aside id="top-cats-and-contributors"${addAttribute(tmap || single_tmap_section ? "tmap" : "", "class")} data-astro-cid-7jzpvmdx>${renderComponent($$result2, "TopCats", $$TopCats, { "TopCats": top_cats, "URLParams": url_params, "IsTmapFromUser": tmap_owner, "SingleTmapSection": single_tmap_section_name, "data-astro-cid-7jzpvmdx": true })}${top_contributors ? renderTemplate`${renderComponent($$result2, "TopContributors", $$TopContributors, { "Contributors": top_contributors, "URLParams": url_params, "data-astro-cid-7jzpvmdx": true })}` : null}</aside>`}${renderComponent($$result2, "TopLinks", $$TopLinks, { "Links": links, "URLParams": url_params, "Pages": pages, "Tmap": tmap, "MultipleTmapSections": multiple_tmap_sections, "SingleTmapSection": single_tmap_section, "SingleTmapSectionName": single_tmap_section_name, "TmapOwner": tmap_owner, "IsHomePage": is_home_page, "Token": token, "User": user, "data-astro-cid-7jzpvmdx": true })}${links && links.length > 5 ? renderTemplate`${renderComponent($$result2, "ScrollUp", $$ScrollUp, { "data-astro-cid-7jzpvmdx": true })}` : null}</div>` })}`;
}, "/root/modeep-frontend/src/components/Rankings/Rankings.astro", void 0);

export { $$Rankings as $ };
