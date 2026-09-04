import { useState, useRef, useCallback } from 'preact/hooks';
import { S as SearchCats } from './Cats_CpsisGgK.mjs';
/* empty css                                */
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';
import { P as Periods, S as SortMetrics, a as PrettySortMetrics } from './fetch_with_handle_redirect_CiOAvHRj.mjs';
import { e as createComponent, r as renderTemplate } from './astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import 'clsx';

function SearchNSFW(props) {
  const {
    IncludeNSFW: include_nsfw,
    SetIncludeNSFW: set_include_nsfw,
    NSFWLinksCount: nsfw_links_count
  } = props;
  return jsxs("div", {
    id: "search-nsfw-container",
    children: [jsxs("label", {
      for: "nsfw",
      children: ["Include NSFW ", nsfw_links_count ? jsx("span", {
        id: "nsfw-link-count",
        children: `(${nsfw_links_count})`
      }) : ""]
    }), jsx("input", {
      type: "checkbox",
      id: "search-nsfw",
      name: "nsfw",
      checked: include_nsfw,
      onChange: (e) => set_include_nsfw(e.target.checked)
    })]
  });
}

function SearchPeriod(props) {
  const {
    Period: period,
    SetPeriod: set_period
  } = props;
  async function handle_set_period(e) {
    set_period(e.currentTarget.value);
  }
  return jsxs("div", {
    id: "search-period-container",
    children: [jsx("label", {
      for: "period",
      children: "Period:"
    }), jsx("select", {
      name: "period",
      id: "period",
      value: period,
      onChange: handle_set_period,
      children: Periods.map((per) => jsx("option", {
        value: per,
        children: per
      }))
    })]
  });
}

function SearchSortBy(props) {
  const {
    SortBy: sort_by,
    SetSortBy: set_sort_by
  } = props;
  async function handle_set_sort_by(e) {
    set_sort_by(e.currentTarget.value);
  }
  return jsxs("div", {
    id: "search-sort-by-container",
    children: [jsx("label", {
      for: "sort-by",
      children: "Sort By:"
    }), jsx("select", {
      name: "sort-by",
      id: "search-sort-by",
      value: sort_by,
      onChange: handle_set_sort_by,
      children: SortMetrics.map((met) => {
        return jsx("option", {
          value: met,
          children: PrettySortMetrics[met]
        });
      })
    })]
  });
}

function SearchSummmaryContains(props) {
  const {
    SummaryContains: summary_contains,
    SetSummaryContains: set_summary_contains
  } = props;
  return jsxs("div", {
    id: "search-summary-contains-container",
    children: [jsx("label", {
      for: "summary-snippet",
      children: "Summary Contains:"
    }), jsx("input", {
      id: "summary-snippet",
      type: "text",
      value: summary_contains,
      onInput: (e) => {
        set_summary_contains(e.target.value);
      }
    })]
  });
}

function SearchURLContains(props) {
  const {
    URLContains: url_contains,
    SetURLContains: set_url_contains
  } = props;
  return jsxs("div", {
    id: "search-url-contains-container",
    children: [jsx("label", {
      for: "url-contains-snippet",
      children: "URL Contains:"
    }), jsx("input", {
      id: "url-contains-snippet",
      type: "text",
      value: url_contains,
      onInput: (e) => {
        set_url_contains(e.target.value);
      }
    })]
  });
}

function SearchURLLacks(props) {
  const {
    URLLacks: url_lacks,
    SetURLLacks: set_url_lacks
  } = props;
  return jsxs("div", {
    id: "search-url-lacks-container",
    children: [jsx("label", {
      for: "url-lacks-snippet",
      children: "URL Lacks:"
    }), jsx("input", {
      id: "search-url-lacks",
      name: "url-lacks-snippet",
      type: "text",
      value: url_lacks,
      onInput: (e) => {
        set_url_lacks(e.target.value);
      }
    })]
  });
}

function SearchFilters(props) {
  const {
    Endpoint: endpoint,
    TmapOwnerLoginName: tmap_owner_login_name,
    SingleTmapSectionName: single_tmap_section_name,
    NSFWLinksCount: nsfw_links_count,
    InitialCats: initial_cats,
    InitialNeuteredCats: initial_neutered_cats,
    InitialSummaryContains: initial_summary_contains,
    InitialURLContains: initial_url_contains,
    InitialURLLacks: initial_url_lacks,
    InitialPeriod: initial_period,
    InitialSortBy: initial_sort_by,
    InitialIncludeNSFW: initial_include_nsfw
  } = props;
  const is_tmap = endpoint === "/map";
  const [cats, set_cats] = useState(initial_cats);
  const [neutered_cats, set_neutered_cats] = useState(initial_neutered_cats);
  const [summary_contains, set_summary_contains] = useState(initial_summary_contains);
  const [url_contains, set_url_contains] = useState(initial_url_contains);
  const [url_lacks, set_url_lacks] = useState(initial_url_lacks);
  const [period, set_period] = useState(initial_period ?? "all");
  const [sort_by, set_sort_by] = useState(initial_sort_by ?? "times_starred");
  const [include_nsfw, set_include_nsfw] = useState(initial_include_nsfw ?? false);
  const params = new URLSearchParams();
  if (cats.length) {
    params.set("cats", cats.join(","));
  }
  if (neutered_cats.length) {
    params.set("neutered", neutered_cats.join(","));
  }
  const has_summary_contains = summary_contains?.length;
  if (has_summary_contains) {
    params.set("summary_contains", summary_contains);
  }
  const has_url_contains = url_contains?.length;
  if (has_url_contains) {
    params.set("url_contains", url_contains);
  }
  const has_url_lacks = url_lacks?.length;
  if (has_url_lacks) {
    params.set("url_lacks", url_lacks);
  }
  const has_period = period !== "all";
  if (has_period) {
    params.set("period", period);
  }
  if (sort_by && sort_by !== "times_starred") {
    params.set("sort_by", sort_by);
  }
  if (include_nsfw) {
    params.set("include_nsfw", "true");
  }
  const has_changed_cats = cats.length !== initial_cats.length || cats.some((cat) => !initial_cats.includes(cat));
  const has_changed_neutered_cats = neutered_cats.length !== initial_neutered_cats.length;
  const has_changed_filters = has_changed_cats || has_changed_neutered_cats || summary_contains !== initial_summary_contains || url_contains !== initial_url_contains || url_lacks !== initial_url_lacks || period !== initial_period || sort_by !== initial_sort_by || include_nsfw !== initial_include_nsfw;
  let base_url = endpoint ? is_tmap ? single_tmap_section_name ? `/map/${tmap_owner_login_name}/${single_tmap_section_name.toLowerCase()}` : `/map/${tmap_owner_login_name}` : endpoint : "/search";
  const search_url = params.toString() ? `${base_url}?${params.toString()}` : base_url;
  const scour_anchor_ref = useRef(null);
  const handle_keydown = useCallback((e) => {
    if (e.key === "Enter" && has_changed_filters) {
      scour_anchor_ref.current?.click();
    }
  }, [has_changed_filters]);
  function toggle_search_filters_collapsed() {
    document.documentElement.classList.toggle("search-filters-collapsed");
    const is_collaped = document.documentElement.classList.contains("search-filters-collapsed") ? "true" : "false";
    localStorage.setItem("collapse_search_filters_initially", is_collaped);
  }
  return jsxs("section", {
    id: "search-filters",
    children: [jsxs("div", {
      id: "search-filters-header",
      onClick: toggle_search_filters_collapsed,
      children: [jsx("img", {
        id: "filters-expansion-arrow",
        src: "../../back.svg",
        alt: "Filters are expanded",
        height: 20,
        width: 20
      }), jsx("h2", {
        children: "Filters"
      })]
    }), jsxs("form", {
      onKeyDown: handle_keydown,
      children: [jsx(SearchCats, {
        SelectedCats: cats,
        SetSelectedCats: set_cats,
        SelectedNeuteredCats: neutered_cats,
        SetSelectedNeuteredCats: set_neutered_cats,
        Editable: true,
        IsTmapAndOwnerIs: tmap_owner_login_name
      }), is_tmap && cats.length ? jsx("p", {
        id: "transfer-to-global-map",
        children: jsx("a", {
          href: single_tmap_section_name ? search_url.replace(`/map/${tmap_owner_login_name}/${single_tmap_section_name?.toLowerCase()}`, "/search") : search_url.replace(`/map/${tmap_owner_login_name}`, "/search"),
          children: "Transfer cats to Global Treasure Map"
        })
      }) : null, jsx(SearchSummmaryContains, {
        SummaryContains: summary_contains,
        SetSummaryContains: set_summary_contains
      }), jsx(SearchURLContains, {
        URLContains: url_contains,
        SetURLContains: set_url_contains
      }), jsx(SearchURLLacks, {
        URLLacks: url_lacks,
        SetURLLacks: set_url_lacks
      }), jsx(SearchPeriod, {
        Period: period,
        SetPeriod: set_period
      }), endpoint !== "/more" ? jsxs(Fragment, {
        children: [jsx(SearchSortBy, {
          SortBy: sort_by,
          SetSortBy: set_sort_by
        }), jsx(SearchNSFW, {
          IncludeNSFW: include_nsfw,
          SetIncludeNSFW: set_include_nsfw,
          NSFWLinksCount: nsfw_links_count
        })]
      }) : null, jsxs("a", {
        id: "search-from-filters",
        title: has_changed_filters ? "" : "Filters unchanged; scroll down to see matching links",
        class: has_changed_filters ? "filters-changed" : "",
        href: search_url,
        ref: scour_anchor_ref,
        children: ["Scour", is_tmap ? " this " : " the ", "Treasure Map", single_tmap_section_name ? " section" : ""]
      })]
    }), jsx("div", {
      id: "lower-expansion-toggle-clickable-zone",
      onClick: toggle_search_filters_collapsed
    })]
  });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$LocalStorageLoader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["<script>\n    const search_filters_collapsed_cache = localStorage.getItem('collapse_search_filters_initially') ? JSON.parse(localStorage.getItem('collapse_search_filters_initially')) : undefined\n    document.documentElement.classList.toggle('search-filters-collapsed', search_filters_collapsed_cache)\n<\/script>"])));
}, "/root/modeep-frontend/src/components/SearchFilters/LocalStorageLoader.astro", void 0);

export { $$LocalStorageLoader as $, SearchFilters as S };
