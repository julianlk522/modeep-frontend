import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { useState, useEffect } from 'preact/hooks';
import { L as LINKS_ENDPOINT } from '../chunks/constants_Ckpmcx4f.mjs';
import { f as fetch_with_handle_redirect, i as is_error_response } from '../chunks/fetch_with_handle_redirect_CiOAvHRj.mjs';
import { S as SearchCats } from '../chunks/Cats_CpsisGgK.mjs';
import { L as Link, M as Modal } from '../chunks/Link_BlNARokb.mjs';
/* empty css                               */
import { jsxs, Fragment, jsx } from 'preact/jsx-runtime';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DLvoU_Hh.mjs';
export { renderers } from '../renderers.mjs';

function NewLinks(props) {
  const [error, set_error] = useState(void 0);
  const [dupe_url, set_dupe_url] = useState(void 0);
  const [selected_cats, set_selected_cats] = useState([]);
  const [submitted_links, set_submitted_links] = useState([]);
  function handle_url_change(e) {
    const val = e.currentTarget.value;
    if (!val) {
      return;
    }
    let cats_to_be_added = [];
    if (val.includes("youtube.com/@") && !selected_cats.includes("YouTube channels")) {
      cats_to_be_added.push("YouTube channels");
    }
    if (val.includes("youtube.com/playlist?") && !selected_cats.includes("YouTube playlists")) {
      cats_to_be_added.push("YouTube playlists");
    }
    set_selected_cats([...selected_cats, ...cats_to_be_added].sort((a, b) => a.localeCompare(b)));
  }
  async function handle_submit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const url = data.get("url");
    if (!url) {
      set_error("You're missing a URL there :)");
      return;
    } else if (!selected_cats.length) {
      set_error("Please add at least one cat :) You might just need to click the plus button or hit ENTER if you have typed something.");
      return;
    }
    const summary = data.get("summary");
    let resp_body;
    if (summary) {
      resp_body = JSON.stringify({
        URL: url,
        Cats: selected_cats.join(","),
        Summary: summary
      });
    } else {
      resp_body = JSON.stringify({
        URL: url,
        Cats: selected_cats.join(",")
      });
    }
    const new_link_resp = await fetch_with_handle_redirect(LINKS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.Token}`
      },
      body: resp_body
    });
    if (!new_link_resp.Response || new_link_resp.RedirectTo) {
      return window.location.href = new_link_resp.RedirectTo ?? "/500";
    }
    let new_link_data = await new_link_resp.Response.json();
    if (is_error_response(new_link_data)) {
      if (new_link_data.error.includes("already submitted")) {
        const dupe_URL = new_link_data.error.split("See ")[1];
        set_error(new_link_data.error.split("See ")[0]);
        set_dupe_url(dupe_URL);
      } else {
        set_error(new_link_data.error);
        set_dupe_url(void 0);
      }
      return;
    } else {
      new_link_data.TagCount = 1;
      new_link_data.TimesStarred = 0;
      new_link_data.AvgStars = 0;
      set_selected_cats([]);
      set_error(void 0);
      set_dupe_url(void 0);
      form.reset();
      set_submitted_links([new_link_data, ...submitted_links]);
    }
    return;
  }
  useEffect(() => {
    set_error(void 0);
    set_dupe_url(void 0);
  }, [selected_cats]);
  return jsxs(Fragment, {
    children: [jsxs("section", {
      id: "new-link",
      children: [jsx("h2", {
        children: "What's That?"
      }), error ? jsxs("p", {
        class: "error",
        children: [error, dupe_url ? jsxs(Fragment, {
          children: [" ", jsx("a", {
            href: dupe_url,
            children: "View existing"
          })]
        }) : null]
      }) : null, jsxs("form", {
        onSubmit: async (e) => await handle_submit(e),
        children: [jsx("label", {
          for: "url",
          children: "URL"
        }), jsx("input", {
          type: "text",
          id: "url",
          name: "url",
          onInput: (e) => handle_url_change(e),
          autoFocus: true
        }), jsx(SearchCats, {
          IsNewLinkPage: true,
          SelectedCats: selected_cats,
          SetSelectedCats: set_selected_cats,
          Editable: true,
          SubmittedLinks: submitted_links
        }), jsx("label", {
          for: "summary",
          children: "Summary (optional)"
        }), jsx("textarea", {
          id: "summary",
          name: "summary",
          rows: 3,
          cols: 50
        }), jsx("input", {
          id: "submit-new-link",
          type: "submit",
          value: "Submit"
        })]
      })]
    }), submitted_links.length ? jsx("section", {
      id: "submitted-links",
      children: jsx("ol", {
        children: submitted_links.map((link) => jsx(Link, {
          Link: link,
          IsNewLink: true,
          SetNewLinkCats: set_selected_cats,
          Token: props.Token,
          User: props.User
        }, link.ID))
      })
    }) : null]
  });
}

function ToolTip(props) {
  const [show_modal, set_show_modal] = useState(false);
  return jsxs(Fragment, {
    children: [jsx("button", {
      class: "tip",
      title: props.Title ?? "Click for more information",
      onClick: () => set_show_modal(!show_modal),
      children: props.Prompt
    }), show_modal ? jsx(Modal, {
      SetShowModal: set_show_modal,
      children: props.children
    }) : null]
  });
}

const $$Astro = createAstro();
const $$New = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  let token = Astro2.cookies.get("token")?.value;
  let user = Astro2.cookies.get("user")?.value;
  if (!token || !user) {
    Astro2.cookies.set("redirect_to", Astro2.url.pathname, {
      maxAge: 300,
      path: "/login",
      sameSite: "strict",
      secure: true
    });
    return Astro2.redirect("/login");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": "Tell a tale of your travels - Modeep", "data-astro-cid-h4ugnbzq": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-h4ugnbzq> ${renderComponent($$result2, "NewLinks", NewLinks, { "client:load": true, "Token": token, "User": user, "client:component-hydration": "load", "client:component-path": "/root/modeep-frontend/src/components/Link/NewLinks", "client:component-export": "default", "data-astro-cid-h4ugnbzq": true })} <section id="rules" data-astro-cid-h4ugnbzq> <h2 data-astro-cid-h4ugnbzq>Rules</h2> <ul data-astro-cid-h4ugnbzq> <li data-astro-cid-h4ugnbzq> ${renderComponent($$result2, "ToolTip", ToolTip, { "client:load": true, "Prompt": "NSFW", "Title": "Click to be informed of what 'NSFW' stands for", "client:component-hydration": "load", "client:component-path": "/root/modeep-frontend/src/components/Modal/ToolTip", "client:component-export": "default", "data-astro-cid-h4ugnbzq": true }, { "default": ($$result3) => renderTemplate` <p style="margin-bottom: 1rem;" data-astro-cid-h4ugnbzq><strong data-astro-cid-h4ugnbzq>Not Safe For Work</strong></p> ` })}
stuff should be tagged with
<span id="example-cat" data-astro-cid-h4ugnbzq>"NSFW"</span> </li> </ul> </section> </main> ` })} `;
}, "/root/modeep-frontend/src/pages/new.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/new.astro";
const $$url = "/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$New,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
