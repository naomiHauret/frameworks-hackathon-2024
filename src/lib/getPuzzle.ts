import { clientSupabase } from "@/utils/supabase"

/**
 * Retrieve a specific puzzle from the database based on its id
 */
export async function getPuzzle(id: string) {
  return (await clientSupabase.from("puzzles").select('*').eq("id", id).single())
}