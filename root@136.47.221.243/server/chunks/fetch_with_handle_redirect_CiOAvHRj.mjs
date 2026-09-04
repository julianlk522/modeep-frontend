import { useRef, useEffect } from 'preact/hooks';
/* empty css                       */
import { jsx, jsxs, Fragment } from 'preact/jsx-runtime';

function is_error_response(obj) {
  return obj.error !== void 0;
}
const tmap_sections = ["Submitted", "Starred", "Tagged"];
const Periods = ["day", "week", "month", "year", "all"];
const SortMetrics = ["times_starred", "avg_stars", "newest", "oldest", "clicks"];
const PrettySortMetrics = {
  times_starred: "times starred",
  avg_stars: "average stars",
  newest: "newest",
  oldest: "oldest",
  clicks: "clicks"
};
function has_merged_cats_property(obj) {
  return obj?.MergedCats !== void 0;
}

function TagCat(props) {
  const {
    Cat: cat,
    IsNSFW: is_nsfw,
    Addable: addable,
    Removable: removable,
    Neuterable: neuterable,
    Neutered: neutered,
    Fat: fat,
    Href: href,
    IsNewLinkPage: is_new_link_page,
    IsMorePage: is_more_page
  } = props;
  const add_btn_ref = useRef(null);
  const neuter_btn_ref = useRef(null);
  const delete_btn_ref = useRef(null);
  useEffect(() => {
    if (!addable) {
      return;
    }
    add_btn_ref.current?.addEventListener("click", handle_add);
    add_btn_ref.current?.addEventListener("keydown", (e) => e.stopPropagation());
    return () => {
      add_btn_ref.current?.removeEventListener("click", handle_add);
      add_btn_ref.current?.removeEventListener("keydown", (e) => e.stopPropagation());
    };
  }, [addable]);
  useEffect(() => {
    if (!neuterable) {
      return;
    }
    neuter_btn_ref.current?.addEventListener("click", handle_neuter);
    neuter_btn_ref.current?.addEventListener("keydown", (e) => e.stopPropagation());
    return () => {
      neuter_btn_ref.current?.removeEventListener("click", handle_neuter);
      neuter_btn_ref.current?.removeEventListener("keydown", (e) => e.stopPropagation());
    };
  }, [neuterable]);
  useEffect(() => {
    if (!removable) {
      return;
    }
    delete_btn_ref.current?.addEventListener("click", handle_delete);
    delete_btn_ref.current?.addEventListener("keydown", (e) => e.stopPropagation());
    return () => {
      delete_btn_ref.current?.removeEventListener("click", handle_delete);
      delete_btn_ref.current?.removeEventListener("keydown", (e) => e.stopPropagation());
    };
  }, [removable]);
  async function handle_add(e) {
    e.preventDefault();
    if (!props.AddedSignal) return;
    props.AddedSignal.value = cat;
  }
  async function handle_neuter(e) {
    e.preventDefault();
    if (!props.NeuteredSignal) return;
    props.NeuteredSignal.value = cat;
  }
  async function handle_delete(e) {
    e.preventDefault();
    if (!props.DeletedSignal) return;
    props.DeletedSignal.value = cat;
  }
  return jsx("li", {
    title: "Filtering for: " + cat,
    class: `cat${addable ? " addable" : ""}${neuterable ? " neuterable" : ""}${neutered ? " neutered" : ""}${removable ? " removable" : ""}${is_nsfw ? " nsfw" : ""}${fat ? " fat" : ""}${is_more_page ? " more" : ""}`,
    children: href ? jsxs(Fragment, {
      children: [jsx("a", {
        href,
        children: props.Cat
      }), props.Count ? jsx("span", {
        children: ` (${props.Count})`
      }) : null]
    }) : jsxs(Fragment, {
      children: [jsxs("p", {
        children: [props.Cat, props.Count ? ` (${props.Count})` : ""]
      }), removable && props.DeletedSignal ? jsx("button", {
        // without type='button' the click event handler fires
        // even when you have the input field focused and hit
        // "Enter"
        type: "button",
        ref: delete_btn_ref,
        title: `Remove '${cat}'${neutered ? " from neutered cats" : ""}`,
        class: "img-btn",
        children: jsx("img", {
          src: "../../../delete.svg",
          height: 20,
          width: 20
        })
      }) : null, addable && props.AddedSignal ? jsx("button", {
        type: "button",
        ref: add_btn_ref,
        title: is_new_link_page ? `Add '${cat}' to tag` : `Add '${cat}' to cats filters`,
        class: "img-btn plus-btn",
        children: jsx("img", {
          src: "../../../add.svg",
          height: 20,
          width: 20
        })
      }) : null, neuterable && props.NeuteredSignal ? jsx("button", {
        type: "button",
        ref: neuter_btn_ref,
        title: `Neuter '${cat}'`,
        class: "img-btn neuter-btn",
        children: jsx("img", {
          src: "../../../neuter.svg",
          height: 16,
          width: 16
        })
      }) : null]
    })
  });
}

async function fetch_with_handle_redirect(url, opts) {
  try {
    const resp = await fetch(url, opts);
    switch (resp.status) {
      // unauthorized
      case 401:
        return {
          Response: resp,
          RedirectTo: "/login"
        };
      // not found
      case 404:
        return {
          Response: void 0,
          RedirectTo: "/404"
        };
      // rate limited
      case 429:
        return {
          Response: resp,
          RedirectTo: "/rate-limit"
        };
      // server error
      case 500:
        return {
          Response: void 0,
          RedirectTo: "/500"
        };
      // anything else: no redirect
      default:
        return {
          Response: resp,
          RedirectTo: void 0
        };
    }
  } catch {
    return {
      Response: void 0,
      RedirectTo: "/404"
    };
  }
}

export { Periods as P, SortMetrics as S, TagCat as T, PrettySortMetrics as a, fetch_with_handle_redirect as f, has_merged_cats_property as h, is_error_response as i, tmap_sections as t };
