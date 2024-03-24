
export const prerender = false
import { html } from "satori-html";
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "fs";

const generateOgImage = async (): Promise<Buffer> => {
  const markup = html(`
  <div
    style="height: 100%; width: 100%; font-family: Inter; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #FDFDFD; font-size: 32px;"
  >
    <div
      style="display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center;"
    >
      <span style="line-height: 1.125; padding-bottom: 20px; font-size: 120px; color: black;">Try to beat this Pokémon puzzle !</span>

      </div>
  </div>`);



  const fontFileSansPath = `${process.cwd()}/public/Inter-Bold.ttf`;
  const fontFileSans = readFileSync(fontFileSansPath);
  const fontFileDisplayPath = `${process.cwd()}/public/Kalam-Regular.ttf`;
  const fontFileDisplay = readFileSync(fontFileDisplayPath);

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
      {
        name: "Kalam",
        data: fontFileDisplay,
        weight: 800,
        style: "normal",
      },
    ],
  });

  const sharpSvg = Buffer.from(svg);

  const buffer = await sharp(sharpSvg).toBuffer();

  return buffer;
};

export async function GET() {
  const response = await generateOgImage();
  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};