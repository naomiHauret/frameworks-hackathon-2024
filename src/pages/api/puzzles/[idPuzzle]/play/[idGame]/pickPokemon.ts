export const prerender = false 
import { serverOnlySupabase } from "@/utils/supabase"
import { fdk } from '@/utils/frames'

export async function POST ({params, request}) {
  const { idPuzzle, idGame } = params
  const body = await request.json()
  const pokemonNationalNumber = new URL(request.url)?.searchParams.get("national_dex")
  const idPokemon = new URL(request.url)?.searchParams.get("id")
  const rowIndex = parseInt(new URL(request.url)?.searchParams.get("row"))
  const columnIndex = parseInt(new URL(request.url)?.searchParams.get("column"))
  const ogDetails = parseInt(new URL(request.url)?.searchParams.get("ogDetails"))
  const player= body.untrustedData?.fid

  // Insert player pick (inserting as admin)
  const result =  await serverOnlySupabase.from("game-picks").upsert([{
    id: `${idGame}-${columnIndex}-${rowIndex}`,
    id_game: idGame,
    player: player,
    index_column: columnIndex,
    index_row: rowIndex,
    id_pokemon: pokemonNationalNumber
  }])

  const metadata = {
    post_url: `${new URL(request.url).origin}/puzzles/${idPuzzle}/play/${idGame}?input=row`,
    image: {
      url: `${new URL(request.url).origin}/puzzles/${idPuzzle}/play/${idGame}/og?details=${ogDetails}&state=${encodeURIComponent(JSON.stringify({ grid: []}))}`
    },
    buttons: [
      {label: "Continue",  action: 'post', target: `${new URL(request.url).origin}/puzzles/${idPuzzle}/play/${idGame}?input=row&state=${encodeURIComponent(JSON.stringify({ grid: []}))}`},
      {label: "Give up",  action: 'post', target: `${new URL(request.url).origin}/puzzles/${idPuzzle}`}
    ],
  }

  const frameMetadata = fdk.getFrameMetadata(metadata);


 return new Response(`<html><head>${frameMetadata}</head><body></body></html>`, {
  status: 200,
  headers: {
    "Content-Type": "text/html"
  }
})
}

export default POST