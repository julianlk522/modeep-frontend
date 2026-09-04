import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_eGmISq15.mjs';
import { manifest } from './manifest_CrkxA4uT.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/500.astro.mjs');
const _page3 = () => import('./pages/about/how.astro.mjs');
const _page4 = () => import('./pages/about.astro.mjs');
const _page5 = () => import('./pages/faq.astro.mjs');
const _page6 = () => import('./pages/feedback.astro.mjs');
const _page7 = () => import('./pages/forgot-password/sent.astro.mjs');
const _page8 = () => import('./pages/forgot-password.astro.mjs');
const _page9 = () => import('./pages/login.astro.mjs');
const _page10 = () => import('./pages/map/_login_name_/_section_.astro.mjs');
const _page11 = () => import('./pages/map/_login_name_.astro.mjs');
const _page12 = () => import('./pages/more.astro.mjs');
const _page13 = () => import('./pages/new.astro.mjs');
const _page14 = () => import('./pages/rate-limit.astro.mjs');
const _page15 = () => import('./pages/reset-password.astro.mjs');
const _page16 = () => import('./pages/search.astro.mjs');
const _page17 = () => import('./pages/summary/_link_id_.astro.mjs');
const _page18 = () => import('./pages/tag/_link_id_.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/500.astro", _page2],
    ["src/pages/about/how.astro", _page3],
    ["src/pages/about.astro", _page4],
    ["src/pages/faq.astro", _page5],
    ["src/pages/feedback.astro", _page6],
    ["src/pages/forgot-password/sent.astro", _page7],
    ["src/pages/forgot-password.astro", _page8],
    ["src/pages/login.astro", _page9],
    ["src/pages/map/[login_name]/[section].astro", _page10],
    ["src/pages/map/[login_name].astro", _page11],
    ["src/pages/more.astro", _page12],
    ["src/pages/new.astro", _page13],
    ["src/pages/rate-limit.astro", _page14],
    ["src/pages/reset-password.astro", _page15],
    ["src/pages/search.astro", _page16],
    ["src/pages/summary/[link_id].astro", _page17],
    ["src/pages/tag/[link_id].astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///root/modeep-frontend/dist/client/",
    "server": "file:///root/modeep-frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
