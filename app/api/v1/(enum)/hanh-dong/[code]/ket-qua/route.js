import Action from '@/api/v1/models'

export function GET(_, { params }) {
  return Action.read({ table: 'ket_qua', query: '*', column: 'ma_hanh_dong', value: params.code })
}
