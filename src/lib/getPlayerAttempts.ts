
import { clientSupabase } from "@/utils/supabase"

/**
 * Retrieve a specific puzzle from the database based on its id
 */
export async function getPlayerAttempts(args: {idPuzzle: string, idPlayer: string}) {
  const { idPlayer, idPuzzle} = args

  return (await clientSupabase.from("attempts").select('*', { count: 'exact' })
  .eq("id_puzzle", idPuzzle).eq("player", idPlayer))
  
}