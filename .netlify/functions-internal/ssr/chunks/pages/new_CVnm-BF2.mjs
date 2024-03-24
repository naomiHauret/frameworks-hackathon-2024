/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_Bm0C1NkT.mjs';
import 'kleur/colors';
import { f as fdk, $ as $$Layout } from './index_CluaQ2Kd.mjs';

const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const frameUrl = Astro2.url.href;
  const frameMetadata = fdk.getFrameMetadata({
    post_url: Astro2.url.href,
    image: {
      url: "https://picsum.photos/seed/frames.js/1126/600"
    },
    buttons: [
      // Redirect to the puzzle creation page on the website 
      { label: "Create my puzzle", action: "link", target: `${frameUrl}puzzle/new` }
    ]
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Create your Pok\xE9mon trivia puzzle - Puzzlemon", "frameMetadata": frameMetadata }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>create puzzle</p> ` })}`;
}, "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/new.astro", void 0);

const $$file = "/home/naomi/dev/perso/puzzlemons/src/pages/puzzles/new.astro";
const $$url = "/puzzles/new";

export { $$New as default, $$file as file, $$url as url };
