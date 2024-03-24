import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/astro_Bm0C1NkT.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/puzzles/[idpuzzle]/play/[idgame]/pickpokemon","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/puzzles\\/([^/]+?)\\/play\\/([^/]+?)\\/pickPokemon\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}],[{"content":"play","dynamic":false,"spread":false}],[{"content":"idGame","dynamic":true,"spread":false}],[{"content":"pickPokemon","dynamic":false,"spread":false}]],"params":["idPuzzle","idGame"],"component":"src/pages/api/puzzles/[idPuzzle]/play/[idGame]/pickPokemon.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/index.og","isIndex":true,"type":"endpoint","pattern":"^\\/index\\.og\\/?$","segments":[[{"content":"index.og","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/index.og.ts","pathname":"/index.og","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DhRKXJIi.css"}],"routeData":{"route":"/puzzles/new","isIndex":false,"type":"page","pattern":"^\\/puzzles\\/new\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"new","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/puzzles/new.astro","pathname":"/puzzles/new","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/puzzles/[idpuzzle]/games/[idgame]/og","isIndex":false,"type":"endpoint","pattern":"^\\/puzzles\\/([^/]+?)\\/games\\/([^/]+?)\\/og\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}],[{"content":"games","dynamic":false,"spread":false}],[{"content":"idGame","dynamic":true,"spread":false}],[{"content":"og","dynamic":false,"spread":false}]],"params":["idPuzzle","idGame"],"component":"src/pages/puzzles/[idPuzzle]/games/[idGame]/og.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DhRKXJIi.css"}],"routeData":{"route":"/puzzles/[idpuzzle]/games/[idgame]","isIndex":true,"type":"page","pattern":"^\\/puzzles\\/([^/]+?)\\/games\\/([^/]+?)\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}],[{"content":"games","dynamic":false,"spread":false}],[{"content":"idGame","dynamic":true,"spread":false}]],"params":["idPuzzle","idGame"],"component":"src/pages/puzzles/[idPuzzle]/games/[idGame]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/puzzles/[idpuzzle]/leaderboard/og","isIndex":false,"type":"endpoint","pattern":"^\\/puzzles\\/([^/]+?)\\/leaderboard\\/og\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}],[{"content":"leaderboard","dynamic":false,"spread":false}],[{"content":"og","dynamic":false,"spread":false}]],"params":["idPuzzle"],"component":"src/pages/puzzles/[idPuzzle]/leaderboard/og.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DhRKXJIi.css"}],"routeData":{"route":"/puzzles/[idpuzzle]/leaderboard","isIndex":true,"type":"page","pattern":"^\\/puzzles\\/([^/]+?)\\/leaderboard\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}],[{"content":"leaderboard","dynamic":false,"spread":false}]],"params":["idPuzzle"],"component":"src/pages/puzzles/[idPuzzle]/leaderboard/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/puzzles/[idpuzzle]/og","isIndex":false,"type":"endpoint","pattern":"^\\/puzzles\\/([^/]+?)\\/og\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}],[{"content":"og","dynamic":false,"spread":false}]],"params":["idPuzzle"],"component":"src/pages/puzzles/[idPuzzle]/og.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/puzzles/[idpuzzle]/play/[idgame]/og","isIndex":false,"type":"endpoint","pattern":"^\\/puzzles\\/([^/]+?)\\/play\\/([^/]+?)\\/og\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}],[{"content":"play","dynamic":false,"spread":false}],[{"content":"idGame","dynamic":true,"spread":false}],[{"content":"og","dynamic":false,"spread":false}]],"params":["idPuzzle","idGame"],"component":"src/pages/puzzles/[idPuzzle]/play/[idGame]/og.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DhRKXJIi.css"}],"routeData":{"route":"/puzzles/[idpuzzle]/play/[idgame]","isIndex":true,"type":"page","pattern":"^\\/puzzles\\/([^/]+?)\\/play\\/([^/]+?)\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}],[{"content":"play","dynamic":false,"spread":false}],[{"content":"idGame","dynamic":true,"spread":false}]],"params":["idPuzzle","idGame"],"component":"src/pages/puzzles/[idPuzzle]/play/[idGame]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DhRKXJIi.css"}],"routeData":{"route":"/puzzles/[idpuzzle]","isIndex":true,"type":"page","pattern":"^\\/puzzles\\/([^/]+?)\\/?$","segments":[[{"content":"puzzles","dynamic":false,"spread":false}],[{"content":"idPuzzle","dynamic":true,"spread":false}]],"params":["idPuzzle"],"component":"src/pages/puzzles/[idPuzzle]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DhRKXJIi.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/naomi/dev/perso/puzzlemons/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/games/[idGame]/index.astro",{"propagation":"none","containsHead":true}],["/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/index.astro",{"propagation":"none","containsHead":true}],["/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/leaderboard/index.astro",{"propagation":"none","containsHead":true}],["/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/play/[idGame]/index.astro",{"propagation":"none","containsHead":true}],["/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/new.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_DyiCbL5t.mjs","/src/pages/index.og.ts":"chunks/pages/index_CLDExl6d.mjs","/src/pages/puzzles/new.astro":"chunks/pages/new_CVnm-BF2.mjs","/src/pages/api/puzzles/[idPuzzle]/play/[idGame]/pickPokemon.ts":"chunks/pages/pickPokemon_DEB_m2HC.mjs","\u0000@astrojs-manifest":"manifest_BXmBcidB.mjs","/home/naomi/dev/perso/puzzlemons/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DO6vr_0N.mjs","\u0000@astro-page:src/pages/api/puzzles/[idPuzzle]/play/[idGame]/pickPokemon@_@ts":"chunks/pickPokemon_DvxfnzVR.mjs","\u0000@astro-page:src/pages/index.og@_@ts":"chunks/index_XPod-USq.mjs","\u0000@astro-page:src/pages/puzzles/new@_@astro":"chunks/new_D-DlIJFJ.mjs","\u0000@astro-page:src/pages/puzzles/[idPuzzle]/games/[idGame]/og@_@ts":"chunks/og_CeGGUhFV.mjs","\u0000@astro-page:src/pages/puzzles/[idPuzzle]/games/[idGame]/index@_@astro":"chunks/index_D_hb319q.mjs","\u0000@astro-page:src/pages/puzzles/[idPuzzle]/leaderboard/og@_@ts":"chunks/og_1654bypl.mjs","\u0000@astro-page:src/pages/puzzles/[idPuzzle]/leaderboard/index@_@astro":"chunks/index_CzWnDcuR.mjs","\u0000@astro-page:src/pages/puzzles/[idPuzzle]/og@_@ts":"chunks/og_griFGE36.mjs","\u0000@astro-page:src/pages/puzzles/[idPuzzle]/play/[idGame]/og@_@ts":"chunks/og_DwnVGsVP.mjs","\u0000@astro-page:src/pages/puzzles/[idPuzzle]/play/[idGame]/index@_@astro":"chunks/index_z5zMiU5c.mjs","\u0000@astro-page:src/pages/puzzles/[idPuzzle]/index@_@astro":"chunks/index_BMWKMKCY.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DktvDr6-.mjs","@/components/ConnectWallet":"_astro/ConnectWallet.Bwf6j9_i.js","@astrojs/react/client.js":"_astro/client.B062ILHn.js","/home/naomi/dev/perso/puzzlemons/node_modules/@walletconnect/modal-ui/dist/index.js":"_astro/index.BX22ixzK.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.DhRKXJIi.css","/Inter-Bold.ttf","/Inter-Regular.ttf","/Inter-Variable.woff2","/Kalam-Bold.ttf","/Kalam-Bold.woff2","/Kalam-Light.ttf","/Kalam-Light.woff2","/Kalam-Regular.ttf","/Kalam-Regular.woff2","/favicon.svg","/_astro/ConnectWallet.Bwf6j9_i.js","/_astro/ConnectWallet.C9c6kRNw.js","/_astro/client.B062ILHn.js","/_astro/index.BX22ixzK.js","/_astro/index.C6tN6kIP.js","/_astro/index.CXsAHNFN.js"],"buildFormat":"directory"});

export { manifest };
