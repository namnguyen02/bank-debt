'use client'
import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar'

const JudgmentAppointments = (props) => {
  const [showDialog, setShowDialog] = useState(false)
  const [appointmentContent, setAppointmentContent] = useState('')
  const [calendarValue, setCalendarValue] = useState(null)

  const onCancel = () => {
    setAppointmentContent('')
    setCalendarValue(null)
    setShowDialog(false)
  }

  const renderAddAppointmentContent = () => {
    return (
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="ngay_hen">
            Trạng thái hồ sơ <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText value={props.state} disabled />
        </div>

        <div className="field">
          <label htmlFor="ngay_hen">
            Ngày hẹn <span style={{ color: 'red' }}>*</span>
          </label>
          <Calendar
            showIcon
            showButtonBar
            placeholder="Chọn ngày hẹn"
            value={calendarValue}
            onChange={(e) => setCalendarValue(e.value ?? null)}
          />
        </div>

        <div className="field">
          <label htmlFor="noi_dung_hen">
            Nội dung hẹn <span style={{ color: 'red' }}>*</span>
          </label>
          <InputTextarea
            id="noi_dung_hen"
            placeholder="Nhập nội dung hẹn"
            rows={5}
            cols={30}
            value={appointmentContent}
            onChange={(e) => setAppointmentContent(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-content-center mt-2">
            <Button
              label="Hủy"
              severity="primary"
              outlined
              style={{ width: '80px', height: '36px' }}
              onClick={() => onCancel()}
            />
            <Button
              label="Tạo"
              style={{ width: '80px', height: '36px', marginLeft: '16px' }}
              onClick={() => {
                props.setAppointments([
                  {
                    ngay_hen: calendarValue.toString(),
                    noi_dung_hen: appointmentContent,
                    trang_thai_ho_so: props.state,
                    nguoi_tao_lich_hen: props.user.ho_ten,
                    ma_thi_hanh_an: props.id,
                    updated_at: 'Được thêm sau khi lưu',
                    ma_khach_hang: props.data.ma_khach_hang,
                  },
                  ...props.appointments,
                ])
                onCancel()
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  const getData = () => {
    if (props.data.lich_hen && props.data.lich_hen.length > 0) {
      return [...props.appointments, ...props.data?.lich_hen]
    } else {
      return [...props.appointments]
    }
  }

  const renderSTT = (rowData) => {
    if (rowData.updated_at === 'Được thêm sau khi lưu') {
      return <div>{`${rowData.STT} (mới)`}</div>
    }
    return <div>{rowData.STT}</div>
  }

  const renderAppointmentDate = (rowData) => {
    const dateTime = new Date(rowData.ngay_hen)
    const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
    const month =
      dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1
    const year = dateTime.getFullYear()
    return (
      <div>
        {date}/{month}/{year}
      </div>
    )
  }

  const renderUpdateTime = (rowData) => {
    if (rowData.updated_at === 'Được thêm sau khi lưu') {
      return <div>Được thêm sau khi lưu</div>
    }
    const dateTime = new Date(rowData.updated_at)
    const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
    const month =
      dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1
    const year = dateTime.getFullYear()
    return (
      <div>
        {date}/{month}/{year}
      </div>
    )
  }

  return (
    <div className="mt-3">
      <Dialog
        header="Tạo lịch hẹn"
        visible={showDialog}
        style={{ maxWidth: '400px', width: '90%' }}
        modal
        onHide={() => onCancel()}
      >
        {renderAddAppointmentContent()}
      </Dialog>
      <div className="flex mb-3 justify-content-between align-items-end">
        <div className="font-bold text-xl ">Lịch hẹn</div>
        <div className="flex">
          <Button label="Tạo lịch hẹn" onClick={() => setShowDialog(true)} />
          <Button label="Xuất Excel" className="ml-4" severity="success" />
        </div>
      </div>
      <div>
        <DataTable
          value={getData().map((item, index) => {
            return {
              STT: index + 1,
              ...item,
            }
          })}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={5}
          dataKey="id"
          // filters={filters1}
          // filterDisplay='menu'
          responsiveLayout="scroll"
          emptyMessage="Không có dữ liệu"
          // header={header1}
        >
          <Column header="STT" style={{ minWidth: '6rem' }} body={renderSTT} />
          <Column
            field="trang_thai_ho_so"
            header="Trạng thái hồ sơ"
            style={{ minWidth: '12rem' }}
          />
          <Column header="Ngày hẹn" style={{ minWidth: '8rem' }} body={renderAppointmentDate} />
          <Column field="noi_dung_hen" header="Nội dung hẹn" style={{ minWidth: '14rem' }} />
          <Column
            field="nguoi_tao_lich_hen"
            header="Người tạo lịch hẹn"
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="updated_at"
            header="Thời gian cập nhật"
            style={{ minWidth: '11rem' }}
            body={renderUpdateTime}
          />
        </DataTable>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(JudgmentAppointments)
