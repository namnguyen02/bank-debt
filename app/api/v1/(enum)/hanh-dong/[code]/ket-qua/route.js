import supabase from 'utils/supabase/client'

export async function GET(_, { params }) {
  const { count, data, error } = await supabase
    .from('ket_qua')
    .select('*', { count: 'exact' })
    .eq('ma_hanh_dong', params.code)

  if (error) return Response.json(error, { status: 400 })

  return Response.json({ count: count, next: null, previous: null, results: data })
}
