
export const prerender = false
import { html } from "satori-html";
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "fs";

const generateOgImage = async (puzzleDetails): Promise<Buffer> => {
  const rows = puzzleDetails.requirements.list.filter(requirement => requirement.position === 'row').map(requirement => requirement).sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0)).map(r => r.value)
  const cols = puzzleDetails.requirements.list.filter(requirement => requirement.position === 'column').map(requirement => requirement).sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0)).map(r => r.value)

  const markup = html(`
  <div
  style="height: 100%; width: 100%; font-size:40px; padding-bottom: 20px; font-family: Inter; display: flex;"
>
  <div style="display: flex; flex-direction: column; padding-left: 12.5%;justify-content: center; margin: auto;">
    <div style="display: flex; width:100%">
      <div style="width:20%; display: flex;"></div>
      ${cols.map(requirement => `<div style="width:20%; display: flex; align-items: flex-end; padding-bottom:4px; justify-content: center;"><span>${requirement}</span></div>`).join("")}
       <div style="width:20%; display: flex;"></div>
      </div>
      ${  rows.map(requirement => `
      <div style="display: flex; width:100%">
      <div style="width:20%; display: flex; justify-content: flex-end; align-items: center;"><span style="padding-right: 16px">${requirement}</span></div>
      <div style="padding:4px; width:20%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; height: 160px;"></span></div>
      <div style="padding:4px; width:20%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; height: 160px;"></span></div>
      <div style="padding:4px; width:20%; display: flex;"><span style="background-color: rgb(234,234,234); border-radius: 6px; width: 100%; height: 160px;"></span></div>
      <div style="width:20%; display: flex; flex-shrink: 1"></div>
    </div>`).join("")
    }

  </div>
</div>`);



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
  console.log(puzzleDetails)

  const response = await generateOgImage(puzzleDetails);

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};