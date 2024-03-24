
export const prerender = false
import { html } from "satori-html";
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "fs";
import { clientSupabase } from "@/utils/supabase";

const generateOgImage = async (puzzleDetails, state): Promise<Buffer> => {
  console.log(puzzleDetails, state)
  const rows = puzzleDetails.requirements.list.filter(requirement => requirement.position === 'row').map(requirement => requirement).sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
  const cols = puzzleDetails.requirements.list.filter(requirement => requirement.position === 'column').map(requirement => requirement).sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
  let markup
  if(!state.cell?.column) markup = html(`
  <div
  style="height: 100%; width: 100%; font-size:40px; padding-bottom: 20px; font-family: Inter; display: flex;"
>
  <div style="display: flex; flex-direction: column; padding-left: 12.5%;justify-content: center; margin: auto;">
    <div style="display: flex; width:100%">
      <div style="width:20%; display: flex;"></div>
      ${cols.map(requirement => `<div style="width:20%; display: flex; align-items: flex-end; padding-bottom:4px; justify-content: center;"><span>${requirement.value}</span></div>`).join("")}
       <div style="width:20%; display: flex;"></div>
      </div>
      ${  rows.map((requirement, index) => `
      <div style="display: flex; width:100%">
      <div style="width:20%; display: flex; justify-content: flex-end; align-items: center; opacity: ${!state?.cell?.row  ?  "1": (index + 1) !== state?.cell?.row ? "0" : "1"  }"><span style="padding-right: 16px">${requirement.value}</span></div>
      <div style="padding:4px; width:20%; display: flex;"><div style="display: flex; justify-content: center; align-items: center; padding: 10px; background-color: rgb(234,234,234); border-radius: 6px; width: 100%; height: 160px;">
      ${state.grid.filter((pick, indexPick) => pick.row === index + 1 && pick.column === indexPick + 1 ).map(el => `<img style="width: 130px; height: 130px" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${el.value}.png"/>`)}
      </div></div>
      <div style="padding:4px; width:20%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; height: 160px;"></span></div>
      <div style="padding:4px; width:20%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; height: 160px;"></span></div>
      <div style="width:20%; display: flex; flex-shrink: 1"></div>
    
      </div>`).join("")
    }

  </div>
</div>`);

  else {
    if(!state?.searchResult) {
    markup = html(`
      <div style="display: flex; flex-direction: column; font-size: 48px; justify-content: center; margin: auto;">
        <div style="display: flex; align-items: center; flex-direction: column;">
        <span style="padding-bottom: 20px; font-size: 36px;">
          Pick a pokémon matches the following :
        </span>
        <div style="display: flex; justify-content: center; flex-direction: column;">
          <span style="padding: 25px;">
          ${rows.filter(requirement => requirement.index === state.cell.row).map(requirement => `${requirement.value}`)}
          </span>
          <span style="padding: 25px;">
          ${cols.filter(requirement => requirement.index === state.cell.column).map(requirement => `${requirement.value}`)}
          </span>
        </div>

        </div>
      </div>
      `)
   } else {
    markup = html(`
    <div style="display: flex; flex-direction: column; font-size: 36px; justify-content: center; margin: auto;">
      <div style="display: flex; flex-direction: column; justify-content: center; align-items-center;">
      <span style="padding-bottom: 20px; font-size: 48px;">
        Pick this Pokémon for ${rows.filter(requirement => requirement.index === state.cell.row).map(requirement => `${requirement.value}`)} /       ${cols.filter(requirement => requirement.index === state.cell.column).map(requirement => `${requirement.value}`)} ?
      </span>
      <img style="margin: auto;" src="${state?.searchResult?.uri}" width="300" height="300" />
      <span style="padding-top: 20px; margin: 0 auto; font-weight: bold; font-size: 70px;">${state?.searchResult?.name}</span>
    </div>
    `)

   }
  }


  const fontFileSansPath = `${process.cwd()}/public/Inter-Bold.ttf`;
  const fontFileSans = readFileSync(fontFileSansPath);

  const svg = await satori(markup as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: fontFileSans,
        weight: 600,
        style: "normal",
      },
    ],
  });

  const sharpSvg = Buffer.from(svg);

  const buffer = await sharp(sharpSvg).toBuffer();

  return buffer;
};

export async function GET({params, request}) {
  const puzzleDetails = JSON.parse(new URL(request.url)?.searchParams.get("details"))
  const state = JSON.parse(new URL(request.url)?.searchParams.get("state"))
  const picks = await clientSupabase
    .from("game-picks")
    .select("*")
    .eq("id_game", params.idGame)


  const response = await generateOgImage(puzzleDetails, state, picks?.data);
  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};