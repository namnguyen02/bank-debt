import Action from '@/api/v1/models'

export function GET() {
  return Action.read({ table: 'ket_qua', query: '*, hanh_dong (ten_hanh_dong, loai_hanh_dong)' })
}

export async function POST(request) {
  const res = await request.json()
  return Action.create({ table: 'ket_qua', values: res })
}
