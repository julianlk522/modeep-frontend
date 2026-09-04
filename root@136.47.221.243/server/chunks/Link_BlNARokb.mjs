import { useState, useMemo, useRef, useEffect } from 'preact/hooks';
import { p as MAX_EARLIEST_STARRERS_SHOWN, L as LINKS_ENDPOINT, q as EXPECTED_STAR_REQ_STATUS, r as CLICKS_ENDPOINT, s as LINK_PREVIEW_IMG_ENDPOINT, E as ERR_STATUS_RANGE_START, t as EXPECTED_LINK_DELETE_REQ_STATUS } from './constants_Ckpmcx4f.mjs';
import { f as fetch_with_handle_redirect, i as is_error_response, T as TagCat } from './fetch_with_handle_redirect_CiOAvHRj.mjs';
/* empty css                       */
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';
import { useSignal, effect } from '@preact/signals';

function format_long_date(date) {
  const date_obj = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).format(date_obj);
}
function format_short_date(date) {
  const date_obj = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour12: true
  }).format(date_obj);
}
function get_local_time(utc_date) {
  const date = new Date(utc_date);
  const tz_offset_millis = date.getTimezoneOffset() * 6e4;
  return new Date(date.getTime() - tz_offset_millis).toISOString();
}
function get_units_ago(date) {
  const date_obj = new Date(date);
  const now = /* @__PURE__ */ new Date();
  const diff_millis = now.getTime() - date_obj.getTime();
  const diff_seconds = Math.floor(diff_millis / 1e3);
  const diff_minutes = Math.floor(diff_seconds / 60);
  const diff_hours = Math.floor(diff_minutes / 60);
  const diff_days = Math.floor(diff_hours / 24);
  const diff_weeks = Math.floor(diff_days / 7);
  const diff_months = Math.floor(diff_days / 30);
  const diff_years = Math.floor(diff_days / 365);
  if (diff_years > 0) {
    return `${diff_years} year${diff_years > 1 ? "s" : ""} ago`;
  } else if (diff_months > 0) {
    return `${diff_months} month${diff_months > 1 ? "s" : ""} ago`;
  } else if (diff_weeks > 0) {
    return `${diff_weeks} week${diff_weeks > 1 ? "s" : ""} ago`;
  } else if (diff_days > 0) {
    return `${diff_days} day${diff_days > 1 ? "s" : ""} ago`;
  } else if (diff_hours > 0) {
    return `${diff_hours} hour${diff_hours > 1 ? "s" : ""} ago`;
  } else if (diff_minutes > 0) {
    return `${diff_minutes} minute${diff_minutes > 1 ? "s" : ""} ago`;
  } else if (diff_seconds > 0) {
    return `${diff_seconds} second${diff_seconds > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
}

function save_action_and_path_then_redirect_to_login(redirect_action) {
  const action_target_ID = is_link_redirect_action(redirect_action) ? redirect_action.LinkID : redirect_action.SummaryID;
  document.cookie = `redirect_action=${redirect_action.Action} ${action_target_ID}; path=${window.location.pathname}; max-age=300; SameSite=strict; Secure`;
  return save_path_then_redirect_to_login();
}
function save_path_then_redirect_to_login() {
  document.cookie = `redirect_to=${window.location.pathname.replaceAll("/", "%2F")}; path=/login; max-age=300; SameSite=strict; Secure`;
  return window.location.href = "/login";
}
function is_link_redirect_action(action) {
  return action.LinkID !== void 0;
}

function Modal(props) {
  const {
    children,
    Prompt: prompt,
    IsDeleteConfirmation: is_delete_confirmation,
    DeleteURL: delete_url,
    HandleDelete: handle_delete,
    SetShowModal: set_show_modal
  } = props;
  return jsxs("dialog", {
    class: "modal",
    open: true,
    children: [children ? jsx(Fragment, {
      children
    }) : prompt ? jsxs("p", {
      children: [prompt, delete_url ? jsxs(Fragment, {
        children: [" ", jsx("strong", {
          children: delete_url
        }), "?"]
      }) : null]
    }) : null, is_delete_confirmation ? jsxs(Fragment, {
      children: [jsx("button", {
        onClick: handle_delete,
        children: "Yes"
      }), jsx("button", {
        autofocus: true,
        onClick: () => set_show_modal(false),
        children: "Cancel"
      })]
    }) : jsx("button", {
      class: "ok-btn",
      onClick: () => set_show_modal(false),
      children: "Ok"
    })]
  });
}

function Star(props) {
  const {
    IsActive: is_active,
    IsStatic: is_static
  } = props;
  return is_static ? jsx("img", {
    class: "star static",
    height: "20",
    width: "20",
    src: "../../star-filled.svg"
  }) : is_active ? jsx("img", {
    class: "star active",
    height: "20",
    width: "20",
    src: "../../star-filled.svg"
  }) : jsx("img", {
    class: "star inactive",
    height: "20",
    width: "20",
    src: "../../star-outline.svg"
  });
}

function StarsModal(props) {
  const {
    InitialStars: initial_stars,
    YourStarsUpdatedSignal: your_stars_updated,
    SetShowModal: set_show_modal,
    LinkText: text,
    LinkURL: url
  } = props;
  const [pending_stars, set_pending_stars] = useState(initial_stars);
  const star_descriptive_text_html = useMemo(() => {
    return [jsxs(Fragment, {
      children: [jsx("p", {
        class: pending_stars === 1 ? "emphatic" : "",
        children: "Thanks! "
      }), jsx("p", {
        children: "This is good to know about."
      })]
    }), jsxs(Fragment, {
      children: [jsxs("p", {
        children: ["This is", " ", jsx("span", {
          class: pending_stars === 2 ? "emphatic" : "",
          children: "epic!"
        })]
      }), jsx("p", {
        children: "What treasure I have uncovered..."
      })]
    }), jsxs(Fragment, {
      children: [jsxs("p", {
        children: ["This is", " ", jsx("span", {
          class: pending_stars === 3 ? "emphatic" : "",
          children: "unbelievably epic!!"
        })]
      }), jsx("p", {
        children: "What a testament to human ingenuity and the grandeur of our world!"
      })]
    })];
  }, [pending_stars]);
  async function handle_submit() {
    if (!your_stars_updated) return;
    your_stars_updated.value = pending_stars;
    set_show_modal(false);
  }
  return jsx("div", {
    id: "stars-modal-bg",
    onClick: () => set_show_modal(false),
    children: jsxs("div", {
      id: "stars-modal-content",
      onClick: (e) => e.stopPropagation(),
      children: [jsx("h3", {
        id: "link-title",
        children: text
      }), jsxs("p", {
        children: ["(", url, ")"]
      }), jsx("div", {
        id: "star-selectors",
        children: Array.from({
          length: 3
        }).map((_, i) => jsxs("button", {
          class: "star-selector",
          onClick: () => {
            if (pending_stars === i + 1) {
              set_pending_stars(0);
            } else {
              set_pending_stars(i + 1);
            }
          },
          children: [jsx("div", {
            title: i ? `${i + 1}-star this link?` : "Star this link?",
            children: Array.from({
              length: i + 1
            }).map(() => jsx(Star, {
              IsActive: pending_stars === i + 1
            }))
          }), star_descriptive_text_html[i]]
        }))
      }), jsx("button", {
        id: "ok",
        onClick: handle_submit,
        children: "OK"
      })]
    })
  });
}

function Stars(props) {
  const {
    YourStars: your_stars,
    SetYourStars: set_your_stars,
    AvgStars: avg_stars,
    SetAvgStars: set_avg_stars,
    TimesStarred: times_starred,
    SetTimesStarred: set_times_starred,
    EarliestStarrers: earliest_starrers,
    SetEarliestStarrers: set_earliest_starrers,
    LinkID: link_id,
    LinkText: link_text,
    LinkURL: url,
    User: user,
    Token: token
  } = props;
  const [show_modal, set_show_modal] = useState(false);
  const your_stars_ref = useRef(your_stars);
  const is_static = !user || !token;
  const earliest_starrers_split = earliest_starrers.split(", ");
  const num_earliest_starrers = earliest_starrers_split.length;
  let earliest_starrers_preview = num_earliest_starrers === 2 ? earliest_starrers_split.join(" and ") : num_earliest_starrers > MAX_EARLIEST_STARRERS_SHOWN ? earliest_starrers_split.slice(0, MAX_EARLIEST_STARRERS_SHOWN).concat(`and ${num_earliest_starrers - MAX_EARLIEST_STARRERS_SHOWN} ${num_earliest_starrers === MAX_EARLIEST_STARRERS_SHOWN + 1 ? "other" : "others"}`).join(", ") : earliest_starrers_split.join(", ");
  const avg_stars_rounded = Math.round(avg_stars);
  const avg_stars_text = `avg. ${avg_stars} ${avg_stars === 1 ? "star" : "stars"}`;
  const your_stars_text = `you gave ${your_stars}`;
  const only_you_have_starred = times_starred === 1 && your_stars;
  const stars_summary_text = "(" + (your_stars ? only_you_have_starred ? your_stars_text + (your_stars === 1 ? " star" : " stars") : `${avg_stars_text}, ${your_stars_text}` : avg_stars_text) + ")";
  const stars_tooltip_text = `${only_you_have_starred ? "You are the first to star this!" : `Starred by ${earliest_starrers_preview}`}
${stars_summary_text}`;
  const avg_stars_ref = useRef(avg_stars);
  const times_starred_ref = useRef(times_starred);
  const earliest_starrers_ref = useRef(earliest_starrers);
  async function update_your_stars_for_link(new_stars) {
    const old_stars = your_stars_ref.current;
    if (new_stars === old_stars) {
      return;
    }
    const star_resp = await fetch_with_handle_redirect(LINKS_ENDPOINT + "/star", {
      method: !new_stars ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: new_stars ? JSON.stringify({
        link_id,
        stars: new_stars
      }) : JSON.stringify({
        link_id
      })
    });
    if (!star_resp.Response || star_resp.RedirectTo) {
      return window.location.href = star_resp.RedirectTo ?? "/500";
    } else if (star_resp.Response.status !== EXPECTED_STAR_REQ_STATUS) {
      const resp_data = await star_resp.Response.json();
      if (is_error_response(resp_data)) {
        return console.error("Whoops: ", resp_data.error);
      }
      return console.error("Whoops: ", resp_data);
    }
    const old_avg = avg_stars_ref.current;
    const old_times_starred = times_starred_ref.current;
    const old_earliest_starrers = earliest_starrers_ref.current;
    const new_state = calculate_star_state_updates({
      OldStarState: {
        YourStars: old_stars ?? 0,
        AvgStars: old_avg,
        TimesStarred: old_times_starred,
        EarliestStarrers: old_earliest_starrers
      },
      NewStars: new_stars
    });
    set_your_stars(new_stars);
    set_avg_stars(new_state.AvgStars);
    set_times_starred(new_state.TimesStarred);
    set_earliest_starrers(new_state.EarliestStarrers);
    your_stars_ref.current = new_stars;
    avg_stars_ref.current = new_state.AvgStars;
    times_starred_ref.current = new_state.TimesStarred;
    earliest_starrers_ref.current = new_state.EarliestStarrers;
  }
  function calculate_star_state_updates(update) {
    const {
      OldStarState: old_state,
      NewStars: new_stars
    } = update;
    const {
      YourStars: old_stars,
      AvgStars: old_avg,
      TimesStarred: old_times_starred,
      EarliestStarrers: old_earliest_starrers
    } = old_state;
    const operation = new_stars && !old_stars ? "add" : new_stars && old_stars ? "edit" : "delete";
    const times_starred_delta = operation === "add" ? 1 : operation === "delete" ? -1 : 0;
    const new_times_starred = old_times_starred + times_starred_delta;
    const new_avg = new_times_starred === 0 ? 0 : parseFloat(((old_avg * old_times_starred - old_stars + new_stars) / new_times_starred).toFixed(2));
    let new_earliest_starrers;
    if (operation === "add") {
      new_earliest_starrers = "you, " + old_earliest_starrers;
    } else if (operation === "delete") {
      new_earliest_starrers = old_earliest_starrers.split(", ").filter((starrer) => starrer !== user && starrer !== "you").join(", ");
    } else {
      new_earliest_starrers = old_earliest_starrers;
    }
    return {
      YourStars: new_stars,
      AvgStars: new_avg,
      TimesStarred: new_times_starred,
      EarliestStarrers: new_earliest_starrers
    };
  }
  const your_stars_updated = useSignal(void 0);
  effect(() => {
    if (your_stars_updated.value !== void 0 && your_stars_updated.value !== your_stars) {
      update_your_stars_for_link(your_stars_updated.value);
      your_stars_updated.value = void 0;
    }
  });
  if (is_static) {
    if (!times_starred) {
      return null;
    } else {
      return jsxs("div", {
        class: "star-container",
        title: stars_tooltip_text,
        children: [Array.from({
          length: avg_stars_rounded
        }).map((_, i) => jsx(Star, {
          IsStatic: true
        }, i)), jsx("span", {
          class: "times-starred",
          children: times_starred
        })]
      });
    }
  }
  return jsxs(Fragment, {
    children: [jsxs("div", {
      class: "star-container",
      children: [jsx("div", {
        class: "average-stars",
        title: stars_tooltip_text,
        children: Array.from({
          length: avg_stars_rounded
        }).map((_, i) => jsx(Star, {
          IsStatic: true
        }, i))
      }), times_starred ? jsx("span", {
        class: "times-starred",
        children: times_starred
      }) : null, jsx("button", {
        class: "stars-modal-opener",
        title: your_stars ? "Edit your rating?" : "Star this?",
        onClick: () => set_show_modal(!show_modal),
        children: !your_stars ? jsx(Star, {}) : Array.from({
          length: your_stars
        }).map((_, i) => jsx(Star, {
          IsActive: true
        }, i))
      })]
    }), show_modal ? jsx(StarsModal, {
      InitialStars: your_stars ?? 0,
      YourStarsUpdatedSignal: your_stars_updated,
      SetShowModal: set_show_modal,
      LinkText: link_text,
      LinkURL: url
    }) : null]
  });
}

function URLZone({
  Link_ID: link_id,
  URL: url,
  Summary: summary,
  SummaryCount: summary_count,
  IsSummaryPage: is_summary_page,
  SetClicks: set_clicks
}) {
  const link_text = summary ? summary : url;
  const has_protocol = url.startsWith("http://") || url.startsWith("https://");
  const url_with_protocol = has_protocol ? url : `https://${url}`;
  async function handle_click(e) {
    e.preventDefault();
    await fetch(CLICKS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        link_id
      })
    });
    if (e.button === 0) {
      window.open(url, "_blank");
    }
    set_clicks((prev) => prev + 1);
  }
  return jsxs("div", {
    children: [jsxs("h3", {
      class: "link-title",
      children: [jsx("a", {
        href: url_with_protocol,
        title: summary ? summary : void 0,
        class: "url-link",
        onClick: (e) => {
          e.preventDefault();
          handle_click(e);
        },
        onMouseDown: (e) => {
          if (e.button === 0) return;
          e.preventDefault();
          handle_click(e);
        },
        children: link_text
      }), !is_summary_page ? jsxs(Fragment, {
        children: [` (`, jsx("a", {
          title: `View summaries (${summary_count}) or add/edit yours`,
          href: `/summary/${link_id}`,
          class: "summaries-page-link",
          children: jsx("span", {
            class: "summary-count",
            children: summary_count
          })
        }), `)`]
      }) : null]
    }), summary ? jsx("p", {
      class: "url",
      children: url
    }) : null]
  });
}

function Link(props) {
  const {
    NonCatsURLParams: non_cats_url_params,
    CatsFromUser: cats_from_user,
    SetNewLinkCats: set_new_link_cats,
    IsSummaryPage: is_summary_page,
    IsTagPage: is_tag_page,
    IsTmapPage: is_tmap_page,
    IsNewLink: is_new_link,
    Token: token,
    User: user
  } = props;
  const {
    ID: id,
    URL: url,
    SubmittedBy: submitted_by,
    SubmitDate: submit_date,
    Cats: cats,
    Summary: summary,
    SummaryCount: summary_count,
    TagCount: tag_count,
    PreviewImgFilename: saved_preview_img_filename
  } = props.Link;
  const cats_endpoint = is_tmap_page && cats_from_user ? `/map/${cats_from_user}` : "/search";
  const split_cats = cats.split(",");
  const has_one_tag = tag_count === 1;
  const is_your_link = user !== void 0 && user === submitted_by;
  const display_full_date = is_summary_page || is_tag_page || is_new_link;
  const [your_stars, set_your_stars] = useState(props.Link.StarsAssigned);
  const [avg_stars, set_avg_stars] = useState(props.Link.AvgStars);
  const [times_starred, set_times_starred] = useState(props.Link.TimesStarred);
  const [clicks, set_clicks] = useState(props.Link.ClickCount);
  let initial_earliest_starrers = props.Link.EarliestStarrers ?? "";
  if (props.Link.EarliestStarrers && user) {
    let split_starrers = props.Link.EarliestStarrers.split(", ");
    if (split_starrers.includes(user)) {
      let index = split_starrers.indexOf(user);
      split_starrers.splice(index, 1);
      split_starrers.unshift("you");
      initial_earliest_starrers = split_starrers.join(", ");
    }
  }
  const [earliest_starrers, set_earliest_starrers] = useState(initial_earliest_starrers);
  const [show_delete_modal, set_show_delete_modal] = useState(false);
  const [preview_img_url, set_preview_img_url] = useState(void 0);
  const has_clicks = clicks > 0;
  useEffect(() => {
    async function get_preview_img() {
      if (!saved_preview_img_filename) {
        return;
      }
      const img_resp = await fetch(LINK_PREVIEW_IMG_ENDPOINT + `/${saved_preview_img_filename}`, {
        headers: {
          "Content-Type": "image/*"
        }
      });
      if (img_resp.status >= ERR_STATUS_RANGE_START) {
        console.error(img_resp);
        return set_preview_img_url(void 0);
      }
      const img_blob = await img_resp.blob();
      const img_url = URL.createObjectURL(img_blob);
      set_preview_img_url(img_url);
    }
    get_preview_img();
  }, [saved_preview_img_filename]);
  async function handle_delete() {
    if (!token) {
      save_path_then_redirect_to_login();
    } else if (!is_your_link) {
      console.error("not your link");
      return;
    }
    const delete_resp = await fetch_with_handle_redirect(LINKS_ENDPOINT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        link_id: id
      })
    });
    if (!delete_resp.Response || delete_resp.RedirectTo) {
      return window.location.href = delete_resp.RedirectTo ?? "/500";
    } else if (delete_resp.Response.status !== EXPECTED_LINK_DELETE_REQ_STATUS) {
      const delete_data = await delete_resp.Response.json();
      if (is_error_response(await delete_data)) {
        return console.error("Whoops: ", delete_data.error);
      }
      return console.error("Whoops: ", delete_resp.Response);
    }
    if (is_tag_page || is_summary_page) {
      return window.location.href = `/map/${user}`;
    }
    return window.location.reload();
  }
  return jsxs("li", {
    class: `link${is_summary_page || is_tag_page ? " single" : ""}`,
    children: [preview_img_url ? jsxs("div", {
      class: "preview",
      children: [jsx("img", {
        src: preview_img_url,
        alt: summary ? summary : url,
        width: 75
      }), jsx(URLZone, {
        Link_ID: id,
        URL: url,
        Summary: summary,
        SummaryCount: summary_count,
        IsSummaryPage: is_summary_page,
        SetClicks: set_clicks
      })]
    }) : jsx(URLZone, {
      Link_ID: id,
      URL: url,
      Summary: summary,
      SummaryCount: summary_count,
      IsSummaryPage: is_summary_page,
      SetClicks: set_clicks
    }), jsxs("p", {
      children: [jsx("span", {
        class: "by",
        children: "by "
      }), jsx("a", {
        title: `View ${is_your_link ? "your" : `${submitted_by}'s`} wondrous discoveries? (Treasure Map)`,
        href: `/map/${submitted_by}`,
        class: "submitted-by",
        children: is_your_link ? "you" : submitted_by
      }), " ", jsx("span", {
        class: "submit-date",
        children: display_full_date ? is_new_link ? format_long_date(get_local_time(submit_date)) : format_long_date(submit_date) : get_units_ago(submit_date)
      })]
    }), is_tag_page && has_one_tag ? null : jsxs("div", {
      class: "tag",
      children: [jsxs("ul", {
        class: "cats",
        children: [split_cats.map((cat) => {
          const encoded_cat = encodeURIComponent(cat);
          const url_params = non_cats_url_params ? `?${non_cats_url_params}&cats=${encoded_cat}` : `?cats=${encoded_cat}`;
          return jsx(TagCat, {
            Cat: cat,
            IsNSFW: cat === "NSFW",
            Href: cats_endpoint + url_params
          });
        }), is_tag_page ? jsxs("li", {
          class: "tag-count",
          children: [" (", tag_count, ")"]
        }) : jsxs("li", {
          class: "tag-count",
          children: [" (", jsx("a", {
            title: `View tags (${tag_count}) or add/edit yours`,
            class: "tags-page-link",
            href: `/tag/${id}`,
            children: jsx("span", {
              class: "tags-page-link",
              children: tag_count
            })
          }), ")"]
        })]
      }), set_new_link_cats ? jsx("button", {
        title: "Copy cats to pending new link",
        class: "img-btn copy-cats-btn",
        onClick: () => set_new_link_cats(split_cats),
        children: jsx("img", {
          alt: "Copy cats to pending new link",
          src: "../../copy-cats.svg",
          width: 16,
          height: 16
        })
      }) : null]
    }), jsxs("div", {
      class: "user-interactions",
      children: [jsx(Stars, {
        YourStars: your_stars,
        SetYourStars: set_your_stars,
        AvgStars: avg_stars,
        SetAvgStars: set_avg_stars,
        TimesStarred: times_starred,
        SetTimesStarred: set_times_starred,
        EarliestStarrers: earliest_starrers,
        SetEarliestStarrers: set_earliest_starrers,
        LinkID: id,
        LinkText: summary ?? url,
        LinkURL: url,
        User: user,
        Token: token
      }), has_clicks ? jsxs("div", {
        title: `Clicked ${clicks > 1 ? `${clicks} times.` : "once."}`,
        class: "click-count",
        children: [jsx("img", {
          src: "../../click.svg",
          alt: "Clicks",
          height: 18,
          width: 18
        }), jsx("span", {
          children: clicks
        })]
      }) : null]
    }), is_your_link ? jsxs(Fragment, {
      children: [jsx("button", {
        title: "Delete Link",
        class: "delete-link-btn img-btn",
        onClick: () => set_show_delete_modal(true),
        children: jsx("img", {
          alt: "Delete Link",
          src: "../../../delete.svg",
          height: 20,
          width: 20
        })
      }), show_delete_modal ? jsx(Modal, {
        Prompt: "Delete",
        IsDeleteConfirmation: true,
        DeleteURL: url,
        HandleDelete: handle_delete,
        SetShowModal: set_show_delete_modal
      }) : null]
    }) : null]
  });
}

export { Link as L, Modal as M, format_long_date as a, save_path_then_redirect_to_login as b, format_short_date as f, save_action_and_path_then_redirect_to_login as s };
