import supabase from 'utils/supabase/client'

export async function GET() {
  const { count, data, error } = await supabase
    .from('ket_qua')
    .select('*, hanh_dong(ten_hanh_dong, loai_hanh_dong)', {
      count: 'exact',
    })

  if (error) return Response.json(error, { status: 400 })

  return Response.json({ count: count, next: null, previous: null, results: data })
}

export async function POST(request) {
  const res = await request.json()

  const { data, error } = await supabase.from('ket_qua').insert(res).select().single()

  if (error) return Response.json(error, { status: 400 })

  return Response.json(data)
}
