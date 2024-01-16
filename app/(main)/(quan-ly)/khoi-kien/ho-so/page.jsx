'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import LawsuitFileCustomerInfo from '@/components/lawsuitFileDetail/lawsuitFileCustomerInfo/LawsuitFileCustomerInfo'
import LawsuitFileCreditInfo from '@/components/lawsuitFileDetail/lawsuitFileCreditInfo/LawsuitFileCreditInfo'
import LawsuitFileConsumerCreditInfo from '@/components/lawsuitFileDetail/lawsuitFileConsumerCreditInfo/LawsuitFileConsumerCreditInfo'
import AuthorizedStaffInfo from '@/components/lawsuitFileDetail/authorizedStaffInfo/AuthorizedStaffInfo'
import LawsuitFileActions from '@/components/lawsuitFileDetail/lawsuitFileActions/LawsuitFileActions'
import LogInfo from '@/components/lawsuitFileDetail/logInfo/LogInfo'
import LawsuitFileAppointment from '@/components/lawsuitFileDetail/lawsuitFileAppointment/LawsuitFileAppointment'
import LawsuitFileNotification from '@/components/lawsuitFileDetail/lawsuitFileNotification/LawsuitFileNotification'
import LawsuitFileTUAP from '@/components/lawsuitFileDetail/lawsuit-file-TUAP/lawsuit-file-TUAP'

import {
  addLawsuit,
  getDetailLawsuit,
  updateLawsuit,
} from 'actions/tien-do-khoi-kien/tien-do-khoi-kien'
import { addAppointment } from 'actions/lich-hen/lich-hen'
import { addTUAP } from 'actions/tam-ung-an-phi/tam-ung-an-phi'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import 'primeicons/primeicons.css'

const LawsuitFile = () => {
  const [checkedList, setCheckedList] = useState([])
  const [form, setForm] = useState({})
  const [data, setData] = useState({})
  const [operation, setOperation] = useState('')
  const [state, setState] = useState('')
  const [appointments, setAppointments] = useState([])
  const [displayConfirmation, setDisplayConfirmation] = useState(false)
  const [tuapForm, setTuapForm] = useState([])
  const searchParams = useSearchParams()
  const isCreateNew = searchParams.get('createNew')
  const id = searchParams.get('id') ? searchParams.get('id') : ''
  const router = useRouter()

  const handleSave = () => {
    const bodyToCreate = {
      IDKhachHang: form.IDKhachHang,
      tinh_tp: form.tinh_tp,
      quan_huyen: form.quan_huyen,
      id_nguoi_duoc_uq: form.id_nguoi_duoc_uq,
      so_tien_kk: 100000000,
      nguoi_thuc_hien: 'Lê Văn Bằng',
    }

    const bodyToUpdate = {
      trang_thai_kk: state,
      thao_tac: operation,
      nguoi_thuc_hien: 'Lê Văn Bằng',
    }

    if (isCreateNew) {
      addLawsuit({ body: bodyToCreate }).then((res) => {
        if (res && res.body === 'Inserted') {
          localStorage.setItem('addLawsuit', 'success')
          router.push('/khoi-kien')
        }
      })
    } else {
      updateLawsuit(id, { body: bodyToUpdate }).then((res) => console.log(res))
    }

    if (appointments.length > 0) {
      handleCreateAppointment()
    }

    if (tuapForm.length > 0) {
      handleCreateTUAP()
    }
  }

  const getState = () => {
    if (isCreateNew) {
      return 'Nhập mới'
    }
    return state
  }

  const handleCreateAppointment = () => {
    addAppointment({ body: appointments }).then((res) => console.log(res))
  }

  const handleCreateTUAP = () => {
    addTUAP({ body: tuapForm }).then((res) => console.log(res))
  }

  useEffect(() => {
    if (!isCreateNew && id) {
      getDetailLawsuit(id).then((res) => {
        if (res && res.status == 200) {
          setData(res.result)
          setState(res.result?.trang_thai_kk)
        }
      })
    }
  }, [])

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="Ở lại"
        // icon="pi pi-times"
        onClick={() => setDisplayConfirmation(false)}
        text
      />
      <Button
        type="button"
        label="Tiếp tục"
        // icon="pi pi-check"
        onClick={() => {
          setDisplayConfirmation(false)
          history.back()
        }}
        text
        autoFocus
      />
    </>
  )

  return (
    <div className="card">
      <Dialog
        header="Cảnh báo"
        visible={displayConfirmation}
        onHide={() => setDisplayConfirmation(false)}
        style={{ width: '350px' }}
        modal
        footer={confirmationDialogFooter}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Những thay đổi của bạn chưa được lưu, bạn vẫn muốn tiếp tục quay lại chứ?</span>
        </div>
      </Dialog>

      <div
        className="mb-4 relative cursor-pointer"
        onClick={() => {
          if (
            Object.keys(form).length > 0 ||
            operation ||
            appointments.length > 0 ||
            tuapForm.length > 0
          ) {
            setDisplayConfirmation(true)
          } else {
            history.back()
          }
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '-9px',
          }}
        >
          <i className="pi pi-angle-left" style={{ color: 'slateblue', fontSize: '1.8rem' }}></i>
        </div>
        <div
          className="font-bold text-xl text-primary"
          style={{ lineHeight: '23px', marginLeft: '16px' }}
        >
          Quay lại
        </div>
      </div>
      <div className="flex gap-3">
        <Button label="Quản lý KK" style={{ height: '36px' }} />
        <Button label="Quản lý THA" style={{ height: '36px' }} />
      </div>
      <div className="flex mb-3 align-items-end justify-content-between" style={{ height: '41px' }}>
        <div className="flex">
          <div className="font-bold text-xl mr-2">Trạng thái hồ sơ: </div>
          <div className="font-bold text-xl text-primary">{getState()}</div>
        </div>
        {Object.keys(form).length > 0 ||
        operation ||
        appointments.length > 0 ||
        tuapForm.length > 0 ? (
          <Button label="Lưu thay đổi" style={{ height: '36px' }} onClick={() => handleSave()} />
        ) : (
          <Button label="Lưu thay đổi" style={{ height: '36px' }} disabled />
        )}
      </div>
      <LawsuitFileCustomerInfo
        form={form}
        setForm={setForm}
        isCreateNew={isCreateNew}
        data={data}
      />
      <LawsuitFileCreditInfo form={form} />
      <LawsuitFileConsumerCreditInfo form={form} />
      <AuthorizedStaffInfo form={form} setForm={setForm} isCreateNew={isCreateNew} data={data} />
      {!isCreateNew && (
        <LawsuitFileActions
          data={data}
          state={state}
          setState={setState}
          setOperation={setOperation}
        />
      )}
      {!isCreateNew && (
        <LawsuitFileNotification checkedList={checkedList} setCheckedList={setCheckedList} />
      )}
      {!isCreateNew && <LogInfo data={data} />}
      {!isCreateNew && (
        <LawsuitFileTUAP
          state={state}
          appointments={appointments}
          setAppointments={setAppointments}
          id={id}
          data={data}
          tuapForm={tuapForm}
          setTuapForm={setTuapForm}
        />
      )}
      {!isCreateNew && (
        <LawsuitFileAppointment
          state={state}
          appointments={appointments}
          setAppointments={setAppointments}
          id={id}
          data={data}
        />
      )}
    </div>
  )
}

export default LawsuitFile
