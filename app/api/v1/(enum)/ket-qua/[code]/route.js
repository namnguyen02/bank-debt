import supabase from 'utils/supabase/client'

export async function PATCH(request, { params }) {
  const res = await request.json()

  const { data, error } = await supabase
    .from('ket_qua')
    .update(res)
    .eq('ma_ket_qua', params.code)
    .select()
    .single()

  if (error) return Response.json(error, { status: 400 })

  return Response.json(data)
}

export async function DELETE(_, { params }) {
  const { error } = await supabase.from('ket_qua').delete().eq('ma_ket_qua', params.code)

  if (error) return Response.json(error, { status: 400 })

  return Response.json({ message: 'xoa thanh cong' })
}
