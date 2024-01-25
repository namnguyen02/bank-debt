import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { data, error } = await supabase
    .from('tien_do_thi_hanh_an')
    .select(
      `*, NhanVien (HoTen, CCCD, ChucDanh, SDT), KhachHang (Ho_ten, CCCD, DiaChiThuongTru, DiaChiTamTru)`
    )
    .eq('id', params.id)

  if (error) {
    return NextResponse.json(error, { status: 400 })
  }

  if (data.length === 0) {
    return NextResponse.json({ message: 'Không tìm thấy tiến độ thi hành án' }, { status: 404 })
  }

  const returnData = data[0]

  const logs = await supabase
    .from('thong_tin_log_thi_hanh_an')
    .select(`*`)
    .eq('id_thi_hanh_an', params.id)
    .order('created_at', { ascending: false })
  if (logs && !logs.error) {
    returnData.logs = logs.data
  }

  const appointments = await supabase
    .from('lich_hen')
    .select(`*`)
    .eq('id_thi_hanh_an', params.id)
    .order('thoi_gian_cap_nhat', { ascending: false })
  if (appointments && !appointments.error) {
    returnData.lich_hen = appointments.data
  }

  return NextResponse.json({ result: returnData, status: 200 })
}

export async function PATCH(request, { params }) {
  const res = await request.json()
  const dataToUpdate = res.body

  const thao_tac = dataToUpdate.thao_tac
  const nguoi_thuc_hien = dataToUpdate.nguoi_thuc_hien
  delete dataToUpdate.thao_tac
  delete dataToUpdate.nguoi_thuc_hien

  const { error } = await supabase
    .from('tien_do_thi_hanh_an')
    .update(dataToUpdate)
    .eq('id', params.id)

  if (!error && thao_tac && dataToUpdate.trang_thai_tha) {
    const log = {
      thao_tac: thao_tac,
      trang_thai: dataToUpdate.trang_thai_tha,
      nguoi_thuc_hien: nguoi_thuc_hien,
      id_thi_hanh_an: params.id,
    }
    const { error } = await supabase.from('thong_tin_log_thi_hanh_an').insert(log)
    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }
  }

  if (error) {
    return NextResponse.json(error, { status: 400 })
  }

  return NextResponse.json({ message: 'Updated' })
}
