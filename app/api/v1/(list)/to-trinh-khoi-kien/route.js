import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'

export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('ma_nhan_vien')

  const data = {
    '': ['ma_to_trinh', 'trang_thai', 'danh_gia', 'ngay_tao'],
    khach_hang: ['ma_khach_hang', 'ho_ten', 'can_cuoc'],
  }

  if (query) {
    return Action.read({
      table: 'to_trinh_khoi_kien',
      query: transformToQuery(data),
      column: 'ma_nhan_vien',
      value: query,
    })
  }

  return Action.read({
    table: 'to_trinh_khoi_kien',
    query: transformToQuery({ ...data, nhan_vien: ['ma_nhan_vien, ho_ten'] }),
  })
}

export async function POST(request) {
  const res = await request.json()
  return Action.create({ table: 'to_trinh_khoi_kien', values: res })
}
