import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const filter = Object.fromEntries(searchParams.entries())

  let query = supabase.from('khoi_kien_filter').select(`*`, { count: 'exact' })

  const offset = filter['offset'] ? parseInt(filter['offset']) : 0
  const limit = filter['limit'] ? parseInt(filter['limit']) : 10
  if (filter['offset'] && filter['limit']) {
    query = query.range(offset, limit)
  }
  // Condition chaining for filters
  if (filter['ma_khoi_kien']) {
    query = query.eq('ma_khoi_kien', filter['ma_khoi_kien'])
  }
  if (filter['ma_khach_hang']) {
    query = query.eq('ma_khach_hang', filter['ma_khach_hang'])
  }
  if (filter['ho_ten']) {
    query = query.like('ho_ten', '%' + filter['ho_ten'] + '%')
  }
  if (filter['can_cuoc']) {
    query = query.eq('can_cuoc', filter['can_cuoc'])
  }
  if (filter['trang_thai']) {
    query = query.eq('trang_thai', filter['trang_thai'])
  }
  if (filter['tinh_tp']) {
    query = query.eq('tinh_tp', filter['tinh_tp'])
  }
  if (filter['quan_huyen']) {
    query = query.eq('quan_huyen', filter['quan_huyen'])
  }
  if (filter['so_tien_kk']) {
    query = query.eq('so_tien_kk', filter['so_tien_kk'])
  }
  if (filter['ma_nhan_vien']) {
    query = query.eq('ma_nhan_vien', filter['ma_nhan_vien'])
  }

  const { count, data, error } = await query

  if (error) {
    return NextResponse.json(
      {
        body: JSON.stringify(error),
      },
      { status: 500 }
    )
  }
  return NextResponse.json({ count: count, next: null, prev: null, result: data }, { status: 200 })
}
