'use client'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

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
import { getListActionCategoryResults } from 'actions/danh-muc-ket-qua-hanh-dong/danh-muc-ket-qua-hanh-dong'
import { getListActionCategories } from 'actions/danh-muc-hanh-dong/danh-muc-hanh-dong'

import { getDebtRecoveryResult } from 'actions/ket-qua-thu-hoi-no/Ket-qua-thu-hoi-no'
import { getListCustomer } from 'actions/customer/Customer'
import { getListStaff } from 'actions/nhan-vien/nhan-vien'
import { getDataToTrain } from 'actions/get-data-to-train/get-data-to-train'

import { actionTypes, evaluations } from './const'

const DebtRecoveryActions = (props) => {
  const [checkedList, setCheckedList] = useState([])
  const [actionCategories, setActionCategories] = useState([])
  const [actionResultCategories, setActionResultCategories] = useState([])
  const [actionNames, setActionNames] = useState([])
  const [results, setResults] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [errorForm, setErrorForm] = useState({})
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
  const [isUpdating, setIsUpdating] = useState(false)
  const [evaluation, setEvaluation] = useState({})
  const [evaluationPoint, setEvaluationPoint] = useState(0)

  const toast = useRef(null)

  const getActions = () => {
    getListActions(`ma_nhan_vien=${props.user?.ma_nhan_vien}&` + query).then((res) => {
      setData(res.results)
    })
  }

  const getActionCategories = () => {
    getListActionCategories().then((res) => {
      if (res && res.count) {
        setActionCategories(res.results)
      }
    })
  }

  const getActionResultCategories = () => {
    getListActionCategoryResults().then((res) => {
      if (res && res.count) {
        setActionResultCategories(res.results)
      }
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
    setEvaluationPoint(0)
    setEvaluation({})
    setAddedError(false)
    setShowDialog(false)
  }

  const onCancelUpdate = () => {
    setErrorForm({ noError: true })
    setActionType({})
    setActionName({})
    setResult({})
    setNote('')
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
    if (isUpdating) {
      if (!actionData.khach_hang?.ma_khach_hang) {
        tempErrorForm.maKhachHangError = true
        tempErrorForm.cccdError = true
        tempErrorForm.hoVaTenError = true
        noError = false
      }
    } else {
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
    }

    if (!actionType.name) {
      tempErrorForm.actionTypeError = true
      noError = false
    }
    if (!actionName.ten_hanh_dong) {
      tempErrorForm.actionNameError = true
      noError = false
    }
    if (!result?.ma_ket_qua) {
      tempErrorForm.actionResultError = true
      noError = false
    }
    if (!evaluation.name) {
      tempErrorForm.evaluationError = true
      noError = false
    }

    setErrorForm(tempErrorForm)
    return noError
  }

  const handleAdd = () => {
    const form = {
      ma_khach_hang: selectedAutoValue1.ma_khach_hang,
      ma_hanh_dong: actionName.ma_hanh_dong,
      ma_ket_qua: result.ma_ket_qua,
      ma_nhan_vien: props.user.ma_nhan_vien,
      ghi_chu: note,
      danh_gia: evaluationPoint,
    }
    addDebtRecoveryResult(form).then((res) => {
      if (res && res.id) {
        getActions()
        setShowDialog(false)
        setActionType({})
        setActionName({})
        setResult({})
        setNote('')
        setEvaluationPoint(0)
        setEvaluation({})
        onCancel()
        informAddSuccessfully()
      } else {
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

  const getData = (data) => {
    // Get action type
    setActionType({ name: data.hanh_dong?.loai_hanh_dong })
    // Get action names
    const localActionNames = actionCategories.filter(
      (item) => item.loai_hanh_dong?.toLowerCase() === data.hanh_dong?.loai_hanh_dong?.toLowerCase()
    )
    setActionNames(localActionNames)
    // Get action name
    if (
      localActionNames.filter((item) => item.ten_hanh_dong === data.hanh_dong?.ten_hanh_dong)
        .length > 0
    ) {
      setActionName(
        localActionNames.filter((item) => item.ten_hanh_dong === data.hanh_dong?.ten_hanh_dong)[0]
      )
    }
    // Get results
    const localActionResults = actionResultCategories.filter(
      (item) =>
        item.hanh_dong.ten_hanh_dong.toLowerCase() ===
          data.hanh_dong?.ten_hanh_dong?.toLowerCase() &&
        item.hanh_dong.loai_hanh_dong.toLowerCase() === data.hanh_dong?.loai_hanh_dong.toLowerCase()
    )
    setResults(localActionResults)
    // Get result
    if (
      localActionResults.filter((item) => item.ghi_chu_ket_qua === data.ket_qua?.ghi_chu_ket_qua)
        .length > 0
    ) {
      setResult(
        localActionResults.filter(
          (item) => item.ghi_chu_ket_qua === data.ket_qua?.ghi_chu_ket_qua
        )[0]
      )
    }
    // Get note
    setNote(data.ghi_chu)
    // Get evaluation
    setEvaluationPoint(data.danh_gia)
    setEvaluation(evaluations.filter((item) => item.point == data.danh_gia)[0])
  }

  const handleUpdate = () => {
    const id = actionData.id
    const time = getTime()
    const body = {
      ma_khach_hang: actionData.khach_hang?.ma_khach_hang,
      ma_hanh_dong: actionName.ma_hanh_dong,
      ma_ket_qua: result.ma_ket_qua,
      ghi_chu: note,
      ngay_cap_nhat: time,
      ma_nhan_vien: props.user.ma_nhan_vien,
      danh_gia: evaluationPoint,
    }
    updateDebtRecoveryResult(id, body).then((res) => {
      if (res && res.id) {
        getActions()
        setShowUpdateDialog(false)
        onCancelUpdate()
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
    getActionCategories()
    getActionResultCategories()
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
                  setActionNames(
                    actionCategories.filter(
                      (item) => item.loai_hanh_dong?.toLowerCase() === e.value?.name?.toLowerCase()
                    )
                  )
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
                  setResults(
                    actionResultCategories.filter(
                      (item) =>
                        item.hanh_dong.ten_hanh_dong.toLowerCase() ===
                          e.value.ten_hanh_dong.toLowerCase() &&
                        item.hanh_dong.loai_hanh_dong.toLowerCase() ===
                          actionType.name.toLowerCase()
                    )
                  )
                }}
                options={actionNames}
                optionLabel="ten_hanh_dong"
                placeholder="Chọn tên hành động"
                className={errorForm.actionNameError ? 'p-invalid' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="SDT">
                Kết quả <span style={{ color: 'red' }}>*</span>
              </label>
              <Dropdown
                value={result}
                onChange={(e) => {
                  setResult(e.value)
                  setErrorForm({ ...errorForm, actionResultError: false })
                }}
                options={results}
                optionLabel="ghi_chu_ket_qua"
                placeholder="Chọn kết quả"
                className={errorForm.actionResultError ? 'p-invalid' : ''}
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

            <div className="field">
              <label htmlFor="danh_gia">
                Đánh giá <span style={{ color: 'red' }}>*</span>
              </label>
              <Dropdown
                value={evaluation}
                onChange={(e) => {
                  setEvaluation(e.value)
                  setEvaluationPoint(e.value?.point)
                  setErrorForm({ ...errorForm, evaluationError: false })
                }}
                options={evaluations}
                optionLabel="name"
                placeholder="Chọn đánh giá"
                className={errorForm.evaluationError ? 'p-invalid' : ''}
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
          onHide={() => onCancelUpdate()}
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
                value={actionData.khach_hang?.ma_khach_hang}
                className={errorForm.MaNhanVienError ? 'p-invalid' : ''}
                disabled
              />
            </div>

            <div className="field">
              <label htmlFor="CCCD">
                Họ và tên <span style={{ color: 'red' }}>*</span>
              </label>
              <InputText
                id="ho_ten"
                type="text"
                placeholder="Họ và tên"
                value={actionData.khach_hang?.ho_ten}
                className={errorForm.HoTenError ? 'p-invalid' : ''}
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
                value={actionData.khach_hang?.can_cuoc}
                className={errorForm.CCCDError ? 'p-invalid' : ''}
                disabled
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
                  setActionName({})
                  setResult({})
                  setActionNames(
                    actionCategories.filter(
                      (item) => item.loai_hanh_dong?.toLowerCase() === e.value?.name?.toLowerCase()
                    )
                  )
                  setErrorForm({
                    ...errorForm,
                    actionTypeError: false,
                    actionNameError: false,
                    actionResultError: false,
                  })
                }}
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
                value={actionName}
                onChange={(e) => {
                  setActionName(e.value)
                  setResult({})
                  setResults(
                    actionResultCategories.filter(
                      (item) =>
                        item.hanh_dong.ten_hanh_dong.toLowerCase() ===
                          e.value.ten_hanh_dong.toLowerCase() &&
                        item.hanh_dong.loai_hanh_dong.toLowerCase() ===
                          actionType.name.toLowerCase()
                    )
                  )
                  setErrorForm({ ...errorForm, actionNameError: false, actionResultError: false })
                }}
                options={actionNames}
                optionLabel="ten_hanh_dong"
                placeholder="Chọn tên hành động"
                className={errorForm.actionNameError ? 'p-invalid' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="SDT">
                Kết quả <span style={{ color: 'red' }}>*</span>
              </label>
              <Dropdown
                value={result}
                onChange={(e) => {
                  setResult(e.value)
                  setErrorForm({ ...errorForm, actionResultError: false })
                }}
                options={results}
                optionLabel="ghi_chu_ket_qua"
                placeholder="Chọn kết quả"
                className={errorForm.actionResultError ? 'p-invalid' : ''}
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

            <div className="field">
              <label htmlFor="danh_gia">
                Đánh giá <span style={{ color: 'red' }}>*</span>
              </label>
              <Dropdown
                value={evaluation}
                onChange={(e) => {
                  setEvaluation(e.value)
                  setEvaluationPoint(e.value?.point)
                  setErrorForm({ ...errorForm, evaluationError: false })
                }}
                options={evaluations}
                optionLabel="name"
                placeholder="Chọn đánh giá"
                className={errorForm.evaluationError ? 'p-invalid' : ''}
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
                  onClick={() => {
                    if (preCheck()) handleUpdate()
                  }}
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
            label="Get data to train"
            style={{ height: '36px' }}
            onClick={() => {
              getDataToTrain().then((res) => {
                console.log(res)
              })
            }}
          />
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
            getData={getData}
            setIsUpdating={setIsUpdating}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(DebtRecoveryActions)
