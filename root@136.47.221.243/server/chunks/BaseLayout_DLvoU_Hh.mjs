import { e as createComponent, f as createAstro, h as addAttribute, p as renderHead, l as renderScript, o as renderSlot, r as renderTemplate } from './astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { Title: title } = Astro2.props;
  let user = Astro2.cookies.get("user")?.value;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Modeep: MOdular filtration and Decentralized Evaluation of EPic internet treasure"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <header> <nav> <a href="/" title="Modeep - Home"> <img src="/home.webp" alt="Modeep" height="20" width="84"> </a> <a href="/search">Search</a> <a href="/new">Reveal</a> ${user ? renderTemplate`<div id="user-links"> <a${addAttribute(`/map/${user}`, "href")} id="my-treasure-map">${user}</a> <button id="logout-btn">Logout</button> </div>` : renderTemplate`<a href="/login" id="login-link">Login</a>`} </nav> </header> ${renderScript($$result, "/root/modeep-frontend/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")} ${renderSlot($$result, $$slots["default"])}  </html>`;
}, "/root/modeep-frontend/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
