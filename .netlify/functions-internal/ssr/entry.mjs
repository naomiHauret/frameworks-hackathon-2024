import { renderers } from './renderers.mjs';
import { manifest } from './manifest_BXmBcidB.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DO6vr_0N.mjs');
const _page1 = () => import('./chunks/pickPokemon_DvxfnzVR.mjs');
const _page2 = () => import('./chunks/index_XPod-USq.mjs');
const _page3 = () => import('./chunks/new_D-DlIJFJ.mjs');
const _page4 = () => import('./chunks/og_CeGGUhFV.mjs');
const _page5 = () => import('./chunks/index_D_hb319q.mjs');
const _page6 = () => import('./chunks/og_1654bypl.mjs');
const _page7 = () => import('./chunks/index_CzWnDcuR.mjs');
const _page8 = () => import('./chunks/og_griFGE36.mjs');
const _page9 = () => import('./chunks/og_DwnVGsVP.mjs');
const _page10 = () => import('./chunks/index_z5zMiU5c.mjs');
const _page11 = () => import('./chunks/index_BMWKMKCY.mjs');
const _page12 = () => import('./chunks/index_DktvDr6-.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/puzzles/[idPuzzle]/play/[idGame]/pickPokemon.ts", _page1],
    ["src/pages/index.og.ts", _page2],
    ["src/pages/puzzles/new.astro", _page3],
    ["src/pages/puzzles/[idPuzzle]/games/[idGame]/og.ts", _page4],
    ["src/pages/puzzles/[idPuzzle]/games/[idGame]/index.astro", _page5],
    ["src/pages/puzzles/[idPuzzle]/leaderboard/og.ts", _page6],
    ["src/pages/puzzles/[idPuzzle]/leaderboard/index.astro", _page7],
    ["src/pages/puzzles/[idPuzzle]/og.ts", _page8],
    ["src/pages/puzzles/[idPuzzle]/play/[idGame]/og.ts", _page9],
    ["src/pages/puzzles/[idPuzzle]/play/[idGame]/index.astro", _page10],
    ["src/pages/puzzles/[idPuzzle]/index.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "3a05e59f-fa08-4214-95ed-6e829b76612a"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
