import supabase from 'utils/supabase/client'

export async function GET(_, { params }) {
  const { count, data, error } = await supabase
    .from('lich_su_hanh_dong')
    .select(
      'id, ghi_chu, ngay_thuc_hien, khach_hang (ho_ten, can_cuoc), hanh_dong (ten_hanh_dong, loai_hanh_dong), ket_qua (ghi_chu_ket_qua)',
      { count: 'exact' }
    )
    .eq('ma_nhan_vien', params.code)

  if (error) return Response.json(error, { status: 400 })

  return Response.json({ count: count, next: null, previous: null, results: data })
}
