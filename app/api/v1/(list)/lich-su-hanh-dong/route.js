import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'

export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('ma_nhan_vien')

  const data = {
    '': ['id', 'ghi_chu', 'ngay_thuc_hien', 'ngay_cap_nhat'],
    khach_hang: ['ma_khach_hang', 'ho_ten', 'can_cuoc'],
    hanh_dong: ['ma_hanh_dong', 'loai_hanh_dong', 'ten_hanh_dong'],
    ket_qua: ['ma_ket_qua', 'ghi_chu_ket_qua'],
    nhan_vien: ['ma_nhan_vien', 'ho_ten'],
  }

  if (query) {
    return Action.read({
      table: 'lich_su_hanh_dong',
      query: transformToQuery(data),
      column: 'ma_nhan_vien',
      value: query,
    })
  }

  return Action.read({
    table: 'lich_su_hanh_dong',
    query: transformToQuery({ ...data, nhan_vien: ['ho_ten'] }),
  })
}

export async function POST(request) {
  const res = await request.json()
  return Action.create({ table: 'lich_su_hanh_dong', values: res })
}
