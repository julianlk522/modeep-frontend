import { e as createComponent, k as renderComponent, r as renderTemplate, l as renderScript, m as maybeRenderHead } from '../chunks/astro/server_DK3PlTRm.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DLvoU_Hh.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "Title": "Sign up or Log in to Modeep", "data-astro-cid-sgpqyurt": true }, { "default": async ($$result2) => renderTemplate` ${renderScript($$result2, "/root/modeep-frontend/src/pages/login.astro?astro&type=script&index=0&lang.ts")} ${maybeRenderHead()}<main data-astro-cid-sgpqyurt> <section data-astro-cid-sgpqyurt> <h2 data-astro-cid-sgpqyurt>Log In</h2> <p id="login-error" class="error" data-astro-cid-sgpqyurt></p> <form id="login" data-astro-cid-sgpqyurt> <label for="login_name" data-astro-cid-sgpqyurt>Name</label> <input type="text" name="login_name" required data-astro-cid-sgpqyurt> <br data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>Password</label> <input type="password" name="password" required data-astro-cid-sgpqyurt> <input type="submit" value="Log in" data-astro-cid-sgpqyurt> </form> <a id="forgot-password" href="/forgot-password" data-astro-cid-sgpqyurt>Forgot Your Password?</a> </section> <section data-astro-cid-sgpqyurt> <h2 data-astro-cid-sgpqyurt>Sign Up</h2> <p id="signup-error" class="error" data-astro-cid-sgpqyurt></p> <form id="signup" data-astro-cid-sgpqyurt> <label for="signup_name" data-astro-cid-sgpqyurt>Name</label> <input type="text" name="signup_name" required data-astro-cid-sgpqyurt> <br data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>Password</label> <input type="password" name="password" required data-astro-cid-sgpqyurt> <input type="submit" value="Sign up" data-astro-cid-sgpqyurt> </form> </section> </main> ` })} `;
}, "/root/modeep-frontend/src/pages/login.astro", void 0);

const $$file = "/root/modeep-frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
