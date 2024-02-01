import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'
import { getCurrentTime } from '@/api/v1/helpers'

export async function GET(_, { params }) {
  const data = {
    '': [
      'ma_to_trinh',
      'trang_thai',
      'so_tien_can_thanh_toan',
      'han_thanh_toan',
      'so_tien_lai_giam',
    ],
    khach_hang: ['ma_khach_hang', 'ho_ten', 'can_cuoc', 'thuong_tru', 'tam_tru'],
  }

  return Action.read(
    {
      table: 'to_trinh_mien_giam',
      query: transformToQuery(data),
      column: 'ma_to_trinh',
      value: params.code,
    },
    true
  )
}

export async function PATCH(request, { params }) {
  const res = await request.json()

  res.updated_at = getCurrentTime()

  return Action.update({
    table: 'to_trinh_mien_giam',
    values: res,
    column: 'ma_to_trinh',
    value: params.code,
  })
}

export function DELETE(_, { params }) {
  return Action.delete({ table: 'to_trinh_mien_giam', column: 'ma_to_trinh', value: params.code })
}
