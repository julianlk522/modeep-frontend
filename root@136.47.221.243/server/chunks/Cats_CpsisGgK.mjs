import { useSignal, effect } from '@preact/signals';
import { useMemo, useState, useCallback, useRef, useEffect } from 'preact/hooks';
import { n as CATS_PER_TAG_LIMIT, C as CATS_ENDPOINT, D as DEBOUNCE_INTERVAL_MS, o as CATS_CHAR_LIMIT } from './constants_Ckpmcx4f.mjs';
import { T as TagCat } from './fetch_with_handle_redirect_CiOAvHRj.mjs';
/* empty css                       */
import { jsxs, Fragment, jsx } from 'preact/jsx-runtime';

function SearchCats(props) {
  const {
    SelectedCats: selected_cats,
    SetSelectedCats: set_selected_cats,
    SelectedNeuteredCats: selected_neutered_cats = [],
    SetSelectedNeuteredCats: set_selected_neutered_cats,
    IsHomePage: is_home_page,
    IsTmapAndOwnerIs: tmap_owner,
    IsNewLinkPage: is_new_link_page,
    SubmittedLinks: submitted_links,
    IsTagPage: is_tag_page
  } = props;
  const editable = props.Editable ?? true;
  const you_are_adding_cats = is_new_link_page || is_tag_page || tmap_owner !== void 0;
  const combined_selections = useMemo(() => [...selected_cats, ...selected_neutered_cats || []], [selected_cats, selected_neutered_cats]);
  const has_max_num_cats = selected_cats.length >= CATS_PER_TAG_LIMIT || (selected_neutered_cats?.length || 0) >= CATS_PER_TAG_LIMIT;
  const [recommended_cats, set_recommended_cats] = useState(void 0);
  const [snippet, set_snippet] = useState("");
  const [error, set_error] = useState(void 0);
  const non_selected_recommendations = recommended_cats?.filter((rc) => !combined_selections.includes(rc.Category));
  const fetch_snippet_recommendations = useCallback(async () => {
    if (!snippet) return;
    const encoded_snippet = encodeURIComponent(snippet);
    const snippet_params = new URLSearchParams();
    if (tmap_owner) {
      snippet_params.set("tmap", tmap_owner);
    }
    if (you_are_adding_cats) {
      snippet_params.set("adding_cats", "true");
    }
    if (selected_cats.length) {
      const encoded_selected_cats = selected_cats.map((cat) => encodeURIComponent(cat)).join(",");
      snippet_params.set("cats", encoded_selected_cats);
    }
    if (selected_neutered_cats && selected_neutered_cats.length) {
      const encoded_selected_neutered_cats = selected_neutered_cats.map((cat) => encodeURIComponent(cat)).join(",");
      snippet_params.set("neutered", encoded_selected_neutered_cats);
    }
    const spellfix_matches_url = CATS_ENDPOINT + `/${encoded_snippet}?${snippet_params.toString()}`;
    try {
      const spellfix_matches_resp = await fetch(spellfix_matches_url);
      if (!spellfix_matches_resp.ok) {
        const msg = await spellfix_matches_resp.json();
        set_error(msg.error);
        throw new Error(msg.error);
      }
      const spellfix_matches = await spellfix_matches_resp.json();
      set_recommended_cats(spellfix_matches);
    } catch (error2) {
      set_recommended_cats(void 0);
      set_error(error2 instanceof Error ? error2.message : String(error2));
    }
  }, [snippet, selected_cats, selected_neutered_cats]);
  const prev_combined_selections_ref = useRef(combined_selections);
  const timeout_ref = useRef(null);
  const MIN_SNIPPET_CHARS = 2;
  useEffect(() => {
    const prev_length = prev_combined_selections_ref.current.length;
    const curr_length = combined_selections.length;
    if (prev_length > curr_length) {
      prev_combined_selections_ref.current = combined_selections;
      return;
    }
    if (snippet?.length < MIN_SNIPPET_CHARS) {
      set_recommended_cats(void 0);
    } else {
      reset_timeout_and_fetch_new_recommendations();
    }
    prev_combined_selections_ref.current = combined_selections;
    return () => {
      if (timeout_ref.current) {
        window.clearTimeout(timeout_ref.current);
      }
    };
  }, [snippet, combined_selections.length]);
  function reset_timeout_and_fetch_new_recommendations() {
    if (timeout_ref.current) {
      window.clearTimeout(timeout_ref.current);
    }
    timeout_ref.current = window.setTimeout(() => {
      fetch_snippet_recommendations();
    }, DEBOUNCE_INTERVAL_MS);
  }
  const added_cat = useSignal(void 0);
  const neutered_cat = useSignal(void 0);
  const deleted_cat = useSignal(void 0);
  effect(() => {
    if (added_cat.value?.length) {
      verify_and_add_cat(added_cat.value);
      added_cat.value = void 0;
    } else if (neutered_cat.value?.length) {
      verify_and_add_neutered_cat(neutered_cat.value);
      neutered_cat.value = void 0;
    } else if (deleted_cat.value) {
      set_selected_cats((c) => c.filter((cat) => cat !== deleted_cat.value));
      if (set_selected_neutered_cats) {
        set_selected_neutered_cats((c) => c.filter((cat) => cat !== deleted_cat.value));
      }
      set_error(void 0);
      deleted_cat.value = void 0;
    }
  });
  function verify_and_add_cat(cat) {
    if (has_max_num_cats) {
      set_error("Max number of cats reached :(");
      return;
    }
    if (cat.length > CATS_CHAR_LIMIT) {
      set_error("Cat is too long :(");
      return;
    }
    cat = cat.trim();
    if (cat === "nsfw") {
      cat = "NSFW";
    }
    if (selected_cats.includes(cat)) {
      set_error("You have that already, doofus");
      return;
    }
    if (selected_neutered_cats && set_selected_neutered_cats !== void 0 && selected_neutered_cats.includes(cat)) {
      set_selected_neutered_cats((prev) => prev.filter((c) => c !== cat));
    }
    set_selected_cats((prev) => {
      const next = [...prev, cat].sort((a, b) => a.localeCompare(b));
      prev_combined_selections_ref.current = [...next, ...selected_neutered_cats || []];
      return next;
    });
    set_snippet("");
    set_error(void 0);
  }
  function verify_and_add_neutered_cat(cat) {
    if (!set_selected_neutered_cats) return;
    if (has_max_num_cats) {
      set_error("Max number of cats reached :(");
      return;
    }
    if (cat.length > CATS_CHAR_LIMIT) {
      set_error("Cat is too long :(");
      return;
    }
    cat = cat.trim();
    if (cat === "nsfw") {
      cat = "NSFW";
    }
    if (selected_neutered_cats && selected_neutered_cats.includes(cat)) {
      set_error("Already neutered :)");
      return;
    }
    if (selected_cats.includes(cat)) {
      set_selected_cats((prev) => prev.filter((c) => c !== cat));
    }
    set_selected_neutered_cats((prev) => {
      const next = [...prev, cat].sort((a, b) => a.localeCompare(b));
      prev_combined_selections_ref.current = [...selected_cats, ...next];
      return next;
    });
    set_snippet("");
    set_error(void 0);
  }
  function handle_enter(event) {
    if (event.key === "Enter" && snippet.length) {
      event.preventDefault();
      event.stopPropagation();
      if (event.shiftKey) {
        verify_and_add_neutered_cat(snippet);
      } else {
        verify_and_add_cat(snippet);
      }
    }
  }
  useEffect(() => {
    if (submitted_links?.length) {
      set_snippet("");
    }
    set_recommended_cats(void 0);
  }, [submitted_links]);
  const input_ref = useRef(null);
  useEffect(() => {
    if (!is_tag_page) return;
    input_ref.current?.focus();
  }, [is_tag_page]);
  const placeholder_text = "Start typing for cat suggestions";
  return jsxs(Fragment, {
    children: [editable ? jsxs("div", {
      id: "search-cats-container",
      class: is_home_page ? "home" : "",
      children: [!is_home_page ? jsx("label", {
        for: "cats",
        children: "Cats:"
      }) : null, jsx("input", {
        id: "search-cats",
        ref: input_ref,
        name: "cats",
        type: "text",
        value: snippet,
        autocomplete: "off",
        placeholder: selected_cats?.length ? "" : placeholder_text,
        onInput: (event) => {
          prev_combined_selections_ref.current = selected_cats;
          set_snippet(event.target.value);
          set_error(void 0);
        },
        onKeyDown: handle_enter
      }), !is_home_page ? jsx("input", {
        id: "add-cat-filter",
        title: has_max_num_cats ? "Max number of cats reached" : "Add cat filter",
        type: "button",
        value: "+",
        onClick: () => verify_and_add_cat(snippet),
        onKeyDown: handle_enter,
        disabled: !snippet || has_max_num_cats
      }) : null, error ? jsx("p", {
        class: "error",
        children: error
      }) : null]
    }) : null, non_selected_recommendations?.length ? jsx("ol", {
      id: "recommendations-list",
      children: non_selected_recommendations.map((cat) => jsx(TagCat, {
        Cat: is_home_page ? `${cat.Category} (${cat.Count})` : cat.Category,
        Count: is_home_page ? void 0 : cat.Count,
        Href: is_home_page ? `/search?cats=${cat.Category}` : void 0,
        Addable: !is_home_page,
        AddedSignal: added_cat,
        Neuterable: props.SelectedNeuteredCats !== void 0,
        NeuteredSignal: neutered_cat,
        IsNewLinkPage: is_new_link_page
      }, cat.Category))
    }) : null, !is_home_page ? combined_selections.length ? jsx("div", {
      id: "selected-cats-container",
      children: jsxs("ul", {
        id: "cat-list",
        children: [selected_cats.map((cat) => jsx(TagCat, {
          Cat: cat,
          IsNSFW: cat === "NSFW",
          Removable: editable,
          DeletedSignal: deleted_cat,
          Fat: true
        }, cat)), selected_neutered_cats ? selected_neutered_cats.map((cat) => jsx(TagCat, {
          Cat: cat,
          Neutered: true,
          Removable: editable,
          DeletedSignal: deleted_cat,
          Fat: true
        }, cat)) : null, editable && combined_selections.length > 1 ? jsx("li", {
          children: jsx("input", {
            id: "clear-cat-filters",
            title: "Clear cat filters",
            type: "button",
            value: "Clear",
            onClick: () => {
              set_selected_cats([]);
              set_selected_neutered_cats?.([]);
            }
          })
        }) : null]
      })
    }) : null : null]
  });
}

export { SearchCats as S };
