import supabase from 'utils/supabase/client'

export async function POST() {
  const { error } = await supabase.auth.signOut()

  if (error) return Response.json(error, { status: 400 })
}
