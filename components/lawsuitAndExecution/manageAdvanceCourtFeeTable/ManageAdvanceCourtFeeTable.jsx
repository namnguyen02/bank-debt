'use client'
import Link from 'next/link'

import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Checkbox } from 'primereact/checkbox'

const ManageAdvanceCourtFeeTable = (props) => {
  const renderCustomerId = (rowData) => {
    return <Link href="/khach-hang/chi-tiet">{rowData.IDKhachHang}</Link>
  }

  const handleClickCheckbox = (id) => {
    if (props.checkedList.indexOf(id) >= 0) {
      props.setCheckedList(props.checkedList.filter((item) => item !== id))
    } else {
      props.setCheckedList([...props.checkedList, id])
    }
  }

  const renderCheckbox = (rowData) => {
    return (
      <Checkbox
        inputId="checkOption1"
        name="option"
        value={rowData.IDKhachHang}
        checked={props.checkedList.indexOf(rowData.IDKhachHang) >= 0}
        onChange={(e) => handleClickCheckbox(e.value)}
      />
    )
  }

  const renderName = (rowData) => {
    return <div>{rowData.tien_do_khoi_kien?.KhachHang?.Ho_ten}</div>
  }

  const renderCCCD = (rowData) => {
    return <div>{rowData.tien_do_khoi_kien?.KhachHang?.CCCD}</div>
  }

  const renderLawsuitState = (rowData) => {
    return <div>{rowData.tien_do_khoi_kien?.trang_thai_kk}</div>
  }

  const renderAuthorized = (rowData) => {
    return <div>{rowData.tien_do_khoi_kien?.NhanVien.HoTen}</div>
  }

  const renderProvince = (rowData) => {
    return <div>{rowData.tien_do_khoi_kien.tinh_tp}</div>
  }

  const renderDistrict = (rowData) => {
    return <div>{rowData.tien_do_khoi_kien.quan_huyen}</div>
  }

  const renderNgayHoanTUAP = (rowData) => {
    if (!rowData.ngay_hoan_tuap) {
      return ''
    } else {
      const data = rowData.ngay_hoan_tuap
      const year = data.substr(0, 4)
      const month = data.substr(5, 2)
      const date = data.substr(8, 2)
      return (
        <div>
          {date}/{month}/{year}
        </div>
      )
    }
  }

  return (
    <div>
      <DataTable
        value={props.data}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="id"
        // filters={filters1}
        // filterDisplay='menu'
        responsiveLayout="scroll"
        emptyMessage="Không có dữ liệu"
        // header={header1}
      >
        {/* <Column header="" style={{ minWidth: '4px' }} body={renderCheckbox} />
        <Column header="Mã khách hàng" style={{ minWidth: '10rem' }} body={renderCustomerId} /> */}
        <Column
          field="Ho_ten"
          header="Tên khách hàng"
          style={{ minWidth: '12rem' }}
          body={renderName}
        />
        <Column
          field="CCCD"
          header="Căn cước công dân"
          style={{ minWidth: '11rem' }}
          body={renderCCCD}
        />
        <Column
          field="phu_trach_2"
          header="Trạng thái khởi kiện"
          style={{ minWidth: '12rem' }}
          body={renderLawsuitState}
        />
        {/* <Column field="phu_trach_2" header="Trạng thái thi hành án" style={{ minWidth: '13rem' }} /> */}
        <Column field="trang_thai_tuap" header="Trạng thái án phí" style={{ minWidth: '12rem' }} />
        <Column
          header="Người được ủy quyền"
          style={{ minWidth: '13rem' }}
          body={renderAuthorized}
        />
        <Column header="Tỉnh/Thành phố" style={{ minWidth: '10rem' }} body={renderProvince} />
        <Column header="Quận/huyện" style={{ minWidth: '12rem' }} body={renderDistrict} />
        <Column
          field="so_tien_dong_tuap"
          header="Số tiền đóng TƯAP"
          style={{ minWidth: '12rem' }}
        />
        <Column
          field="so_tien_hoan_tuap"
          header="Số tiền hoàn TƯAP"
          style={{ minWidth: '12rem' }}
        />
        <Column header="Ngày hoàn TƯAP" style={{ minWidth: '11rem' }} body={renderNgayHoanTUAP} />
        <Column field="so_bien_lai" header="Biên lai" style={{ minWidth: '10rem' }} />
      </DataTable>
    </div>
  )
}

export default ManageAdvanceCourtFeeTable
