import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$Rankings } from '../chunks/Rankings_BoPxpQ4g.mjs';
import { $ as $$ScrollUp } from '../chunks/ScrollUp_Daun5uoM.mjs';
import { S as SearchCats } from '../chunks/Cats_CpsisGgK.mjs';
import { C as CATS_ENDPOINT, d as CONTRIBUTORS_ENDPOINT, j as TOTALS_ENDPOINT, L as LINKS_ENDPOINT } from '../chunks/constants_Ckpmcx4f.mjs';
import { $ as $$WithFooter } from '../chunks/WithFooter_QHs-FNRp.mjs';
import { f as fetch_with_handle_redirect } from '../chunks/fetch_with_handle_redirect_CiOAvHRj.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const token = Astro2.cookies.get("token")?.value;
  const user = Astro2.cookies.get("user")?.value;
  const top_cats_resp = await (token ? fetch_with_handle_redirect(CATS_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` }
  }) : fetch_with_handle_redirect(CATS_ENDPOINT));
  if (!top_cats_resp.Response || top_cats_resp.RedirectTo) {
    return Astro2.redirect(top_cats_resp.RedirectTo);
  }
  const top_cats = await top_cats_resp.Response?.json();
  const top_contributors_resp = await fetch_with_handle_redirect(CONTRIBUTORS_ENDPOINT);
  if (!top_contributors_resp.Response || top_contributors_resp.RedirectTo) {
    return Astro2.redirect(top_contributors_resp.RedirectTo);
  }
  const top_contributors = await top_contributors_resp.Response.json();
  const DEFAULT_PERIOD = "week";
  const links_url = LINKS_ENDPOINT + `?period=${DEFAULT_PERIOD}`;
  const get_links_resp = await (token ? fetch_with_handle_redirect(links_url, {
    headers: { Authorization: `Bearer ${token}` }
  }) : fetch_with_handle_redirect(links_url));
  if (!get_links_resp.Response || get_links_resp.RedirectTo) {
    return Astro2.redirect(get_links_resp.RedirectTo);
  }
  const links_data = await get_links_resp.Response.json();
  const links = links_data.Links;
  const totals_resp = await fetch_with_handle_redirect(TOTALS_ENDPOINT);
  if (!totals_resp.Response || totals_resp.RedirectTo) {
    return Astro2.redirect(totals_resp.RedirectTo);
  }
  const totals = await totals_resp.Response.json();
  return renderTemplate`${renderComponent($$result, "WithFooter", $$WithFooter, { "Title": "Modeep", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Welcome Home, Good Hunter</h1> <p id="subtitle" data-astro-cid-j7pv25f6>What is it you desire?</p> ${renderComponent($$result2, "SearchCats", SearchCats, { "client:load": true, "SelectedCats": [], "SetSelectedCats": () => {
  }, "IsHomePage": true, "client:component-hydration": "load", "client:component-path": "/root/modeep-frontend/src/components/SearchFilters/Cats", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Rankings", $$Rankings, { "Links": links, "URLParams": { Page: 1 }, "Pages": links_data.Pages, "TopCats": top_cats, "TopContributors": top_contributors, "Token": token, "User": user, "IsHomePage": true, "data-astro-cid-j7pv25f6": true })} <div id="totals" data-astro-cid-j7pv25f6> <div class="row" data-astro-cid-j7pv25f6> <div class="total" data-astro-cid-j7pv25f6> <span class="number" data-astro-cid-j7pv25f6>${totals.Links}</span> <span class="category" data-astro-cid-j7pv25f6>Links</span> </div> <span data-astro-cid-j7pv25f6>•</span> <div class="total" data-astro-cid-j7pv25f6> <span class="number" data-astro-cid-j7pv25f6>${totals.Clicks}</span> <span class="category" data-astro-cid-j7pv25f6>Clicks</span> </div> <span data-astro-cid-j7pv25f6>•</span> <div class="total" data-astro-cid-j7pv25f6> <span class="number" data-astro-cid-j7pv25f6>${totals.LinksStarred}</span> <span class="category" data-astro-cid-j7pv25f6>Links Starred</span> </div> </div> <div class="row" data-astro-cid-j7pv25f6> <div class="total" data-astro-cid-j7pv25f6> <span class="number" data-astro-cid-j7pv25f6>${totals.Contributors}</span> <span class="category" data-astro-cid-j7pv25f6>Treasure Hunters</span> </div> <span data-astro-cid-j7pv25f6>•</span> <div class="total" data-astro-cid-j7pv25f6> <span class="number" data-astro-cid-j7pv25f6>${totals.Tags}</span> <span class="category" data-astro-cid-j7pv25f6>Tags</span> </div> <span data-astro-cid-j7pv25f6>•</span> <div class="total" data-astro-cid-j7pv25f6> <span class="number" data-astro-cid-j7pv25f6>${totals.Summaries}</span> <span class="category" data-astro-cid-j7pv25f6>Summaries</span> </div> </div> </div> ${renderComponent($$result2, "ScrollUp", $$ScrollUp, { "data-astro-cid-j7pv25f6": true })} </main> ` })} `;
}, "/root/modeep-frontend/src/pages/index.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
