import Action from '@/api/v1/models'

export function GET(_, { params }) {
  return Action.read({
    table: 'lich_su_hanh_dong',
    query:
      'id, ghi_chu, ngay_thuc_hien, khach_hang (ho_ten, can_cuoc), hanh_dong (ten_hanh_dong, loai_hanh_dong), ket_qua (ghi_chu_ket_qua)',
    column: 'ma_nhan_vien',
    value: params.code,
  })
}
