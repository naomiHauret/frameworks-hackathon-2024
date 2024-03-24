 
import { serverOnlySupabase } from "@/utils/supabase"
import { fdk } from '@/utils/frames'
import { nanoid } from 'nanoid'
export async function POST ({params, request}) {
  try {
    const { idPuzzle, idGame } = params
    const body = await request.json()
    const pokemonNationalNumber = new URL(request.url)?.searchParams.get("national_dex")
    const rowIndex = parseInt(new URL(request.url)?.searchParams.get("row"))
    const columnIndex = parseInt(new URL(request.url)?.searchParams.get("column"))
    const ogDetails = new URL(request.url)?.searchParams.get("ogDetails")
    const player= body.untrustedData?.fid
  
    // Insert player pick (inserting as admin)
    await serverOnlySupabase.from("game-picks").upsert([{
      id: `${idGame}-${columnIndex}-${rowIndex}`,
      id_game: idGame,
      player: player,
      index_column: columnIndex,
      index_row: rowIndex,
      id_pokemon: pokemonNationalNumber
    }])
  
    // Check if the user completed/exhausted their attempts
    const {count} = await serverOnlySupabase.from("game-picks").select("*", { count: "exact"}).eq("id_game", idGame)
    const finished = count === 9

    const metadata = {
      post_url: finished ? `${new URL(request.url).origin}/game/${idGame}` : `${new URL(request.url).origin}/puzzles/${idPuzzle}/play/${idGame}?input=row`,
      image: {
        url: `${new URL(request.url).origin}/puzzles/${idPuzzle}/play/${idGame}/og?t=${nanoid()}&details=${encodeURIComponent(ogDetails)}&state=${encodeURIComponent(JSON.stringify({ grid: []}))}`
      },
      buttons:finished ? [
        {label: "Open my grid", action: 'link', target: `${new URL(request.url).origin}/puzzles/${idPuzzle}/games/${idGame}`},
      ] : [
        {label: "Continue",  action: 'post', target: `${new URL(request.url).origin}/puzzles/${idPuzzle}/play/${idGame}?input=row&state=${encodeURIComponent(JSON.stringify({ grid: []}))}`},
        {label: "Open my grid", action: 'link', target: `${new URL(request.url).origin}/puzzles/${idPuzzle}/games/${idGame}`},
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
  
  } catch(e) {
    console.error("something went wrong: ")
    console.error(e)
  }
}

export default POST