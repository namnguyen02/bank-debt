'use client'
import React, { useState, useEffect, useRef } from 'react'

import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { AutoComplete } from 'primereact/autocomplete'

import DebtRecoverySearch from '@/components/debtRecoveryActions/search/debt-recovery-search'
import ActionTable from '@/components/debtRecoveryActions/action-table/action-table'

import styles from './index.module.scss'

import {
  getListActions,
  addDebtRecoveryResult,
  updateDebtRecoveryResult,
} from 'actions/ket-qua-thu-hoi-no/Ket-qua-thu-hoi-no'

import { getDebtRecoveryResult } from 'actions/ket-qua-thu-hoi-no/Ket-qua-thu-hoi-no'
import { getListCustomer } from 'actions/customer/Customer'
import { getListStaff } from 'actions/nhan-vien/nhan-vien'

import { actionNames, actionTypes, results } from './const'

const DebtRecoveryActions = () => {
  const [checkedList, setCheckedList] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [errorForm, setErrorForm] = useState({})
  const [IDKhachHang, setIDKhachHang] = useState('')
  const [actionName, setActionName] = useState({})
  const [actionType, setActionType] = useState({})
  const [result, setResult] = useState({})
  const [note, setNote] = useState('')
  const [data, setData] = useState([])
  const [addedError, setAddedError] = useState(false)
  const [actionData, setActionData] = useState({})
  const [query, setQuery] = useState('')
  const [customers, setCustomers] = useState([])
  const [staffs, setStaffs] = useState([])
  const [selectedAutoValue1, setSelectedAutoValue1] = useState(null)
  const [selectedAutoValue2, setSelectedAutoValue2] = useState(null)
  const [selectedAutoValue3, setSelectedAutoValue3] = useState(null)
  const [autoFilteredValue, setAutoFilteredValue] = useState([])

  const toast = useRef(null)

  const getActions = () => {
    getListActions(query).then((res) => {
      setData(res.results)
    })
  }

  const getListCustomers = () => {
    getListCustomer('queryAll=true').then((res) => {
      setCustomers(res.results)
    })
  }

  const getStaffList = () => {
    getListStaff('').then((res) => {
      if (res.results) {
        setStaffs(res.results)
      }
    })
  }

  const handleSearch = (query) => {
    setQuery(query)
    getDebtRecoveryResult(query).then((res) => {
      if (res && res.count > 0) {
        setData(res.results)
      } else {
        setData([])
      }
    })
  }

  const onCancel = () => {
    setSelectedAutoValue1(null)
    setSelectedAutoValue2(null)
    setSelectedAutoValue3(null)
    setErrorForm({ noError: true })
    setActionType({})
    setActionName({})
    setResult({})
    setNote('')
    setAddedError(false)
    setShowDialog(false)
  }

  const onCancelUpdate = () => {
    setShowUpdateDialog(false)
  }

  const informAddSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      detail: 'Thêm thành công',
      life: 3000,
    })
  }

  const informUpdateSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      detail: 'Cập nhật thành công',
      life: 3000,
    })
  }

  const preCheck = () => {
    let noError = true
    const tempErrorForm = {}
    if (!selectedAutoValue1 || typeof selectedAutoValue1 !== 'object') {
      tempErrorForm.maKhachHangError = true
      noError = false
    }
    if (!selectedAutoValue2 || typeof selectedAutoValue2 !== 'object') {
      tempErrorForm.cccdError = true
      noError = false
    }
    if (!selectedAutoValue3 || typeof selectedAutoValue3 !== 'object') {
      tempErrorForm.hoVaTenError = true
      noError = false
    }
    if (!actionName.name) {
      tempErrorForm.actionNameError = true
      noError = false
    }
    if (!actionType.name) {
      tempErrorForm.actionTypeError = true
      noError = false
    }
    setErrorForm(tempErrorForm)
    return noError
  }

  const handleAdd = () => {
    const form = {
      IDKhachHang: IDKhachHang,
      ten_hanh_dong: actionName.name,
      loai_hanh_dong: actionType.name,
      ket_qua: result.name,
      ghi_chu: note,
    }

    addDebtRecoveryResult({ body: form }).then((res) => {
      if (res && res.body === 'Inserted') {
        getActions()
        setShowDialog(false)
        setIDKhachHang('')
        setCCCD('')
        setActionType({})
        setActionName({})
        setResult({})
        setNote('')
        informAddSuccessfully()
      } else if (
        res &&
        res.response.data.error === 'Debt recovery action of this IDKhachHang has already exist'
      ) {
        setAddedError(true)
      }
    })
  }

  const getTime = () => {
    const date = new Date()
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${hour}:${minute}:${second}+00`
  }

  const handleUpdate = () => {
    const id = actionData.ma_ket_qua_hd
    const time = getTime()
    const body = {
      IDKhachHang: actionData.IDKhachHang,
      loai_hanh_dong: actionData.loai_hanh_dong,
      ten_hanh_dong: actionData.ten_hanh_dong,
      ket_qua: actionData.ket_qua,
      ghi_chu: actionData.ghi_chu,
      last_edited_at: time,
    }
    updateDebtRecoveryResult(id, { body: body }).then((res) => {
      if (res && res.body === 'Updated') {
        getActions()
        setShowUpdateDialog(false)
        informUpdateSuccessfully()
      }
    })
  }

  const search = (event, field) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...customers])
      } else {
        setAutoFilteredValue(
          customers.filter((customer) => {
            return customer[field].toString().toLowerCase().startsWith(event.query.toLowerCase())
          })
        )
      }
    }, 250)
  }

  useEffect(() => {
    getActions()
    getListCustomers()
    getStaffList()
  }, [])

  return (
    <div className="card">
      <Toast ref={toast} />

      <div>
        <Accordion>
          <AccordionTab header="Tìm kiếm">
            <DebtRecoverySearch
              handleSearch={handleSearch}
              customers={customers}
              query={query}
              staffs={staffs}
            />
          </AccordionTab>
        </Accordion>
      </div>

      <div>
        <Dialog
          header="Thêm hành động thu hồi nợ"
          visible={showDialog}
          onHide={() => onCancel()}
          style={{ width: '400px' }}
          modal
        >
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="ma_nv">
                Mã khách hàng <span style={{ color: 'red' }}>*</span>
              </label>
              <AutoComplete
                placeholder="Search"
                id="dd"
                dropdown
                value={selectedAutoValue1}
                onChange={(e) => {
                  setSelectedAutoValue1(e.value)
                  if (typeof e.value === 'object') {
                    setErrorForm({
                      ...errorForm,
                      cccdError: false,
                      hoVaTenError: false,
                      maKhachHangError: false,
                    })
                    setSelectedAutoValue2(e.value)
                    setSelectedAutoValue3(e.value)
                  } else {
                    setSelectedAutoValue2(null)
                    setSelectedAutoValue3(null)
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'ma_khach_hang')}
                field="ma_khach_hang"
                className={errorForm.maKhachHangError ? styles.autoCompleteError : ''}
              />
            </div>
            {addedError && (
              <div style={{ color: 'red', marginBottom: '12px' }}>
                Khách hàng này đã được thêm hành động thu hồi nợ
              </div>
            )}

            <div className="field">
              <label htmlFor="ho_ten">
                Họ và tên <span style={{ color: 'red' }}>*</span>
              </label>
              <AutoComplete
                placeholder="Search"
                id="ho_ten"
                dropdown
                value={selectedAutoValue3}
                onChange={(e) => {
                  setSelectedAutoValue3(e.value)
                  if (typeof e.value === 'object') {
                    setErrorForm({
                      ...errorForm,
                      cccdError: false,
                      hoVaTenError: false,
                      maKhachHangError: false,
                    })
                    setSelectedAutoValue1(e.value)
                    setSelectedAutoValue2(e.value)
                  } else {
                    setSelectedAutoValue1(null)
                    setSelectedAutoValue2(null)
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'ho_ten')}
                field="ho_ten"
                className={errorForm.hoVaTenError ? styles.autoCompleteError : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="CCCD">
                Căn cước công dân <span style={{ color: 'red' }}>*</span>
              </label>
              <AutoComplete
                placeholder="Search"
                id="dd"
                dropdown
                value={selectedAutoValue2}
                onChange={(e) => {
                  setSelectedAutoValue2(e.value)
                  if (typeof e.value === 'object') {
                    setErrorForm({
                      ...errorForm,
                      cccdError: false,
                      hoVaTenError: false,
                      maKhachHangError: false,
                    })
                    setSelectedAutoValue1(e.value)
                    setSelectedAutoValue3(e.value)
                  } else {
                    setSelectedAutoValue1(null)
                    setSelectedAutoValue3(null)
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'can_cuoc')}
                field="can_cuoc"
                className={errorForm.cccdError ? styles.autoCompleteError : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="Email">
                Loại hành động <span style={{ color: 'red' }}>*</span>
              </label>
              <Dropdown
                value={actionType}
                onChange={(e) => {
                  setActionType(e.value)
                  setErrorForm({ ...errorForm, actionTypeError: false })
                }}
                options={actionTypes}
                optionLabel="name"
                placeholder="Chọn loại hành động"
                className={errorForm.actionTypeError ? 'p-invalid' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="HoTen">
                Tên hành động <span style={{ color: 'red' }}>*</span>
              </label>
              <Dropdown
                value={actionName}
                onChange={(e) => {
                  setActionName(e.value)
                  setErrorForm({ ...errorForm, actionNameError: false })
                }}
                options={actionNames[actionType.name]}
                optionLabel="name"
                placeholder="Chọn tên hành động"
                className={errorForm.actionNameError ? 'p-invalid' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="SDT">Kết quả</label>
              {/* <InputText
                id="SDT"
                type="text"
                placeholder="Kết quả"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className={errorForm.SDTError ? 'p-invalid' : ''}
              /> */}
              <Dropdown
                value={result}
                onChange={(e) => setResult(e.value)}
                options={results[actionName.name]}
                optionLabel="name"
                placeholder="Chọn kết quả"
              />
            </div>

            <div className="field">
              <label htmlFor="SDT">Ghi chú</label>
              <InputTextarea
                id="SDT"
                type="text"
                placeholder="Ghi chú"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={errorForm.SDTError ? 'p-invalid' : ''}
              />
            </div>

            <div>
              <div className="flex justify-content-center mt-5">
                <Button
                  label="Hủy"
                  severity="primary"
                  outlined
                  style={{ width: '80px', height: '36px' }}
                  onClick={() => onCancel()}
                />
                <Button
                  label="Thêm"
                  style={{ width: '80px', height: '36px', marginLeft: '16px' }}
                  onClick={() => {
                    if (preCheck()) {
                      handleAdd()
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          header="Cập nhật"
          visible={showUpdateDialog}
          onHide={() => setShowUpdateDialog(false)}
          style={{ width: '400px' }}
          modal
        >
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="ma_nv">
                Mã khách hàng <span style={{ color: 'red' }}>*</span>
              </label>
              <InputText
                id="ma_nv"
                type="text"
                value={actionData.IDKhachHang}
                className={errorForm.MaNhanVienError ? 'p-invalid' : ''}
                disabled
              />
            </div>

            <div className="field">
              <label htmlFor="CCCD">
                Căn cước công dân <span style={{ color: 'red' }}>*</span>
              </label>
              <InputText
                id="CCCD"
                type="text"
                placeholder="Căn cước công dân"
                value={actionData.KhachHang?.CCCD}
                className={errorForm.CCCDError ? 'p-invalid' : ''}
                disabled
              />
            </div>

            <div className="field">
              <label htmlFor="Email">
                Loại hành động <span style={{ color: 'red' }}>*</span>
              </label>
              <Dropdown
                value={{ name: actionData.loai_hanh_dong }}
                onChange={(e) => setActionData({ ...actionData, loai_hanh_dong: e.value.name })}
                options={actionTypes}
                optionLabel="name"
                placeholder="Chọn loại hành động"
                className={errorForm.HoTenError ? 'p-invalid' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="HoTen">
                Tên hành động <span style={{ color: 'red' }}>*</span>
              </label>
              <Dropdown
                value={{ name: actionData.ten_hanh_dong }}
                onChange={(e) => setActionData({ ...actionData, ten_hanh_dong: e.value.name })}
                options={actionNames[actionData.loai_hanh_dong]}
                optionLabel="name"
                placeholder="Chọn tên hành động"
              />
            </div>

            <div className="field">
              <label htmlFor="SDT">Kết quả</label>
              {/* <InputText
                id="SDT"
                type="text"
                placeholder="Kết quả"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className={errorForm.SDTError ? 'p-invalid' : ''}
              /> */}
              <Dropdown
                value={{ name: actionData.ket_qua }}
                onChange={(e) => setActionData({ ...actionData, ket_qua: e.value.name })}
                options={results[actionData.ten_hanh_dong]}
                optionLabel="name"
                placeholder="Chọn kết quả"
              />
            </div>

            <div className="field">
              <label htmlFor="SDT">Ghi chú</label>
              <InputTextarea
                id="SDT"
                type="text"
                placeholder="Ghi chú"
                rows={4}
                value={actionData.ghi_chu}
                onChange={(e) => setActionData({ ...actionData, ghi_chu: e.target.value })}
                className={errorForm.SDTError ? 'p-invalid' : ''}
              />
            </div>

            <div>
              <div className="flex justify-content-center mt-5">
                <Button
                  label="Hủy"
                  severity="primary"
                  outlined
                  style={{ width: '80px', height: '36px' }}
                  onClick={() => onCancelUpdate()}
                />
                <Button
                  label="Cập nhật"
                  style={{ width: '96px', height: '36px', marginLeft: '16px' }}
                  onClick={() => handleUpdate()}
                />
              </div>
            </div>
          </div>
        </Dialog>

        <div className="flex justify-content-between align-items-center mt-3 mb-3">
          <div className="font-bold text-xl mt-4 mb-2">Lịch sử hành động thu hồi nợ</div>
          {/* {checkedList.length > 0 && (
            <Button label="Xóa" style={{ height: '37px', width: '74px' }} />
          )} */}
          <Button
            label="Thêm"
            style={{ height: '36px', width: '100px' }}
            onClick={() => setShowDialog(true)}
          />
        </div>
        <div>
          <ActionTable
            data={data}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            setShowUpdateDialog={setShowUpdateDialog}
            setActionData={setActionData}
          />
        </div>
      </div>
    </div>
  )
}

export default DebtRecoveryActions
