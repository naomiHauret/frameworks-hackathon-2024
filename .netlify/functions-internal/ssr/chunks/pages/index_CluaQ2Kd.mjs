/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, u as unescapeHTML, j as Fragment, k as renderHead, l as renderSlot, m as maybeRenderHead, h as addAttribute } from '../astro_Bm0C1NkT.mjs';
import 'kleur/colors';
import { nanoid } from 'nanoid';
import { createClient } from '@supabase/supabase-js';
import { PinataFDK } from 'pinata-fdk';

const clientSupabase = createClient("https://qleaufmhfmpbxxffvfvg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZWF1Zm1oZm1wYnh4ZmZ2ZnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMjQ3MDIsImV4cCI6MjAyNjcwMDcwMn0.tc9zJn3ZcMBrothYARSdB60kaKFPTBE1lqrxaNkkrGQ");
const serverOnlySupabase = createClient("https://qleaufmhfmpbxxffvfvg.supabase.co", process.env.SUPABASE_SECRET);

const fdk = new PinataFDK();

const $$Astro$6 = createAstro();
const $$Meta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Meta;
  const { title, frameMetadata } = Astro2.props;
  return renderTemplate`<title>${title}</title>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(frameMetadata)}` })}<meta property="of:accepts:xmtp" content="2024-02-01">`;
}, "/home/naomi/dev/perso/puzzlemons/src/components/Meta.astro", void 0);

const $$Astro$5 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, frameMetadata } = Astro2.props;
  return renderTemplate`<html> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">${renderComponent($$result, "Meta", $$Meta, { "frameMetadata": frameMetadata, "title": title })}${renderHead()}</head> <body class="flex flex-col min-h-screen h-full bg-neutral-200"> ${renderSlot($$result, $$slots["default"])} <div class="mt-auto flex justify-center pb-12 pt-6"> ${renderComponent($$result, "Wallet", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/ConnectWallet", "client:component-export": "Wallet" })} </div> </body></html>`;
}, "/home/naomi/dev/perso/puzzlemons/src/components/Layout.astro", void 0);

const $$Astro$4 = createAstro();
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$4;
  const { idGame, idPuzzle } = Astro2.params;
  const frameUrl = Astro2.url.href;
  const gamePicks = await clientSupabase.from("game-picks").select("*").eq("id_game", idGame);
  const playerFid = gamePicks.data[0].player;
  const player = await fdk.getUserByFid(playerFid);
  const frameMetadata = fdk.getFrameMetadata({
    post_url: Astro2.url.href,
    image: {
      url: `${frameUrl}/og`
    },
    buttons: [
      // Redirect to the homepage of the website 
      { label: "Check grid", action: "link", target: `${frameUrl}` },
      { label: "Play this puzzle", action: "post", target: `${Astro2.url.origin}/puzzles/${idPuzzle}/play/${nanoid()}?input=row&state=${encodeURIComponent(JSON.stringify({ grid: [] }))}` }
    ]
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pok\xE9mon trivia puzzle game - Puzzlemon", "frameMetadata": frameMetadata }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full mx-auto px-3 max-w-screen-lg pt-8"> <h1 class="flex flex-col items-center text-center space-y-4"><span class="text-3xl font-bold">A Puzzlemon grid by</span> <span class="w-fit text-sm font-semibold rounded-full inline-flex items-center border border-violet-300 bg-violet-50 py-0.5 ps-[0.05em] pe-[1em] text-violet-600"><img class="w-6 h-6 rounded-full"${addAttribute(player.pfp, "src")}> <span class="ps-[1ex]">${player.username}</span></span></h1> </div> ` })}`;
}, "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/games/[idGame]/index.astro", void 0);

const $$file$4 = "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/games/[idGame]/index.astro";
const $$url$4 = "/puzzles/[idPuzzle]/games/[idGame]";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$4,
    file: $$file$4,
    url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const frameUrl = Astro2.url.href;
  const basicNextActionUrl = `${Astro2.url.origin}${Astro2.url.pathname}`;
  const frameMetadata = fdk.getFrameMetadata({
    post_url: frameUrl,
    image: {
      url: `${frameUrl}/og`
    },
    buttons: [
      { label: "Reveal top 3", action: "post", target: `${basicNextActionUrl}?input=top-3` },
      { label: "Show my score", action: "post", target: `${basicNextActionUrl}?input=self` },
      { label: "Play", action: "post", target: `${frameUrl}/play/${nanoid()}` }
    ]
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Who's the very best ? - Pok\xE9mon trivia knowledge masters revealed!", "frameMetadata": frameMetadata }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>leaderboard</p> ` })}`;
}, "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/leaderboard/index.astro", void 0);

const $$file$3 = "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/leaderboard/index.astro";
const $$url$3 = "/puzzles/[idPuzzle]/leaderboard";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$3,
    file: $$file$3,
    url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

async function getPuzzle(id) {
  return await clientSupabase.from("puzzles").select("*").eq("id", id).single();
}

const $$Astro$2 = createAstro();
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const { idPuzzle, idGame } = Astro2.params;
  const puzzle = await getPuzzle(idPuzzle);
  const userInput = Astro2.url.searchParams.get("input");
  let state = JSON.parse(decodeURIComponent(Astro2.url.searchParams.get("state"))) ?? { grid: [] };
  const buttons = [];
  const basicNextActionUrl = `${Astro2.url.origin}${Astro2.url.pathname}`;
  const puzzleData = JSON.stringify(puzzle.data);
  const ogImageVariableContent = encodeURIComponent(puzzleData.trim());
  let searchResult;
  switch (userInput) {
    case "row":
      buttons.push(
        { label: "Row 1", action: "post", target: `${basicNextActionUrl}?input=column&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            row: 1
          }
        }))}` },
        { label: "Row 2", action: "post", target: `${basicNextActionUrl}?input=column&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            row: 2
          }
        }))}` },
        { label: "Row 3", action: "post", target: `${basicNextActionUrl}?input=column&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            row: 3
          }
        }))}` }
      );
      break;
    case "column":
      buttons.push(
        { label: "Column 1", action: "post", target: `${basicNextActionUrl}?input=search&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            ...state.cell,
            column: 1
          }
        }))}` },
        { label: "Column 2", action: "post", target: `${basicNextActionUrl}?input=search&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            ...state.cell,
            column: 2
          }
        }))}` },
        { label: "Column 3", action: "post", target: `${basicNextActionUrl}?input=search&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            ...state.cell,
            column: 3
          }
        }))}` }
      );
      break;
    case "search":
      buttons.push(
        { label: "Search", action: "post", target: `${basicNextActionUrl}?input=validate&state=${encodeURIComponent(JSON.stringify(state))}` }
      );
      break;
    case "validate":
      try {
        const body = await Astro2.request.json();
        if (body.untrustedData?.inputText) {
          const find = await clientSupabase.from("pokemons").select("*").textSearch("name", `"${body?.untrustedData?.inputText}"`);
          const pokemon = find?.data?.[0];
          if (pokemon?.national_number) {
            searchResult = {
              name: pokemon?.name,
              id: pokemon?.id,
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.national_number}.png`
              // temporary way to display images, best way would be to upload and serve all sprites from Pinata
            };
            buttons.push(
              { label: `Pick ${searchResult?.name}`, action: "post", target: `${Astro2.url.origin}/api/puzzles/${idPuzzle}/play/${idGame}/pickPokemon?id=${pokemon.id}&national_dex=${pokemon?.national_number}&row=${state.cell.row}&column=${state.cell.column}&ogDetails=${ogImageVariableContent}` },
              { label: "Back to search", action: "post", target: `${basicNextActionUrl}?input=search&state=${encodeURIComponent(JSON.stringify(state))}` }
            );
            state.searchResult = searchResult;
          } else {
            buttons.push(
              { label: "Back to search", action: "post", target: `${basicNextActionUrl}?input=search&state=${encodeURIComponent(JSON.stringify(state))}` }
            );
          }
        }
      } catch (e) {
        console.error(e);
        buttons.push(
          { label: "Back to search", action: "post", target: `${basicNextActionUrl}?input=search&state=${encodeURIComponent(JSON.stringify(state))}` }
        );
      }
      break;
    default:
      buttons.push(
        { label: "Row 1", action: "post", target: `${basicNextActionUrl}?input=column&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            row: 1
          }
        }))}` },
        { label: "Row 2", action: "post", target: `${basicNextActionUrl}?input=column&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            row: 2
          }
        }))}` },
        { label: "Row 3", action: "post", target: `${basicNextActionUrl}?input=column&state=${encodeURIComponent(JSON.stringify({
          ...state,
          cell: {
            row: 3
          }
        }))}` }
      );
  }
  const metadata = {
    post_url: Astro2.url.href,
    image: {
      url: `${basicNextActionUrl}/og?t=${nanoid()}&&details=${ogImageVariableContent}&state=${encodeURIComponent(JSON.stringify(state))}`
    },
    buttons
  };
  if (userInput === "search")
    metadata.input = {
      text: "pikachu"
    };
  const frameMetadata = fdk.getFrameMetadata(metadata);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Beat this puzzle ! Puzzlemon - Pokemon trivia puzzle", "frameMetadata": frameMetadata }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="height: 100%; width: 100%; font-size:75px; font-family: Inter; display: flex; justify-content: center; align-items:center;"> <div style="display: flex; flex-wrap: wrap;"> <div style="display: flex; width:100%"> <div style="width:25%; display: flex;"></div> <div style="width:25%; display: flex; align-items: end; padding-bottom:4px; justify-content: center;"><span>COL 1</span></div> <div style="width:25%; display: flex; align-items: end; padding-bottom:4px; justify-content: center;"><span>COL 2</span></div> <div style="width:25%; display: flex; align-items: end; padding-bottom:4px; justify-content: center;"><span>COL 3</span></div> </div> <div style="display: flex; width:100%"> <div style="width:25%; display: flex; justify-content: end; align-items: center;"><span style="padding-right: 4px">ROW 1</span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> </div> <div style="display: flex; width:100%; padding-top: 4px; padding-bottom: 4px;"> <div style="width:25%; display: flex; justify-content: end; align-items: center;"><span style="padding-right: 4px">ROW 2</span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> </div> <div style="display: flex; width:100%"> <div style="width:25%; display: flex; justify-content: end; align-items: center;"><span style="padding-right: 4px">ROW </span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> <div style="padding-left: 2px; padding-right: 2px; width:25%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; aspect-ratio: 1 / 1"></span></div> </div> </div> </div> ` })}`;
}, "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/play/[idGame]/index.astro", void 0);

const $$file$2 = "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/play/[idGame]/index.astro";
const $$url$2 = "/puzzles/[idPuzzle]/play/[idGame]";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const frameUrl = Astro2.url.href;
  const { idPuzzle } = Astro2.params;
  const puzzle = await getPuzzle(idPuzzle);
  const frameMetadata = fdk.getFrameMetadata({
    post_url: Astro2.url.href,
    image: {
      url: `${Astro2.url.href}/og?creator=${puzzle?.data?.creator}&requirements=${JSON.stringify(puzzle?.data?.requirements)}`
    },
    buttons: [
      { label: "Play", action: "post", target: `${frameUrl}/play/${nanoid()}?input=row&state=${encodeURIComponent(JSON.stringify({ grid: [] }))}` },
      { label: "Leaderboard", action: "post_redirect" }
    ]
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "I challenge you! Puzzlemon - Pokemon trivia puzzle", "frameMetadata": frameMetadata }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>create puzzle</p> ` })}`;
}, "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/index.astro", void 0);

const $$file$1 = "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/[idPuzzle]/index.astro";
const $$url$1 = "/puzzles/[idPuzzle]";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const frameUrl = Astro2.url.href;
  const frameMetadata = fdk.getFrameMetadata({
    post_url: Astro2.url.href,
    image: {
      url: `${frameUrl}index.og`
    },
    buttons: [
      // Redirect to the homepage of the website 
      { label: "Learn more", action: "link", target: `${frameUrl}` },
      { label: "Create puzzle", action: "link", target: `${frameUrl}puzzle/new` }
    ]
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pok\xE9mon trivia puzzle game - Puzzlemon", "frameMetadata": frameMetadata }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>hello world</p> ` })}`;
}, "/home/naomi/dev/perso/puzzlemons/src/pages/index.astro", void 0);

const $$file = "/home/naomi/dev/perso/puzzlemons/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, index$3 as a, index$2 as b, clientSupabase as c, index$1 as d, index as e, fdk as f, index$4 as i, serverOnlySupabase as s };
