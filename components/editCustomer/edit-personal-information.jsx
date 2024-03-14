import React, { useState } from 'react'

import { InputText } from 'primereact/inputtext'

import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'

import EditRelative from './edit-relative'

import styles from './index.module.scss'

const EditPersonalInformation = (props) => {
  const emptyRelativeForm = {
    ho_ten: '',
    can_cuoc: '',
    sdt: '',
    thuong_tru: '',
    moi_quan_he: '',
    email: '',
  }
  const [birthday, setBirthday] = useState(null)
  const [calendarValue, setCalendarValue] = useState(null)
  const [relatives, setRelatives] = useState([emptyRelativeForm])

  return (
    <div>
      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label className=" ">Mã khách hàng:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            type="text"
            disabled={props.isAdding ? false : true}
            className={props.isAdding ? styles.inputText : styles.inputTextDisable}
            onChange={(e) => props.handleChange('ma_khach_hang', e.target.value)}
            value={props.customerForm.ma_khach_hang}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="name">Họ và tên:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="name"
            type="text"
            className={styles.inputText}
            onChange={(e) => props.handleChange('ho_ten', e.target.value)}
            value={props.customerForm.ho_ten}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="cccd">Căn cước công dân:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="cccd"
            type="text"
            className={styles.inputText}
            onChange={(e) => props.handleChange('can_cuoc', e.target.value)}
            value={props.customerForm.can_cuoc}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="birthday">Ngày sinh:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <Calendar
            className={styles.inputText}
            showIcon
            showButtonBar
            value={calendarValue}
            onChange={(e) => setCalendarValue(e.value ?? null)}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="dc_thuong_tru">Địa chỉ thường trú:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="dc_thuong_tru"
            type="text"
            className={styles.inputText}
            onChange={(e) => props.handleChange('thuong_tru', e.target.value)}
            value={props.customerForm.thuong_tru}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="dc_tam_tru">Địa chỉ tạm trú:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="dc_tam_tru"
            type="text"
            className={styles.inputText}
            onChange={(e) => props.handleChange('tam_tru', e.target.value)}
            value={props.customerForm.tam_tru}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="sdt">Số điện thoại:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="sdt"
            type="text"
            className={styles.inputText}
            onChange={(e) => props.handleChange('dien_thoai', e.target.value)}
            value={props.customerForm.dien_thoai}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="email">Email:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="email"
            type="text"
            className={styles.inputText}
            onChange={(e) => props.handleChange('email', e.target.value)}
            value={props.customerForm.email}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="company_name">Tên công ty:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="company_name"
            type="text"
            className={styles.inputText}
            onChange={(e) => props.handleChange('ten_cong_ty', e.target.value)}
            value={props.customerForm.ten_cong_ty}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="company_address">Địa chỉ công ty:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="company_address"
            type="text"
            className={styles.inputText}
            onChange={(e) => props.handleChange('dia_chi_cong_ty', e.target.value)}
            value={props.customerForm.dia_chi_cong_ty}
          />
        </div>
      </div>

      <EditRelative
        relatives={relatives}
        setRelatives={setRelatives}
        emptyRelativeForm={emptyRelativeForm}
      />
      {/* <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="relative_name">Tên người thân:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="relative_name" type="text" className={styles.inputText} />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="relative_phone_number">Số điện thoại người thân:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="relative_phone_number" type="text" className={styles.inputText} />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="relationship">Quan hệ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="relationship" type="text" className={styles.inputText} />
        </div>
      </div> */}

      <div className="flex justify-content-end">
        <Button
          label="Hủy"
          outlined
          style={{ width: '90px', marginRight: '16px', height: '36px' }}
          onClick={() => window.history.back()}
        />
        {props.isAdding ? (
          <Button
            label="Thêm"
            style={{ width: '90px', height: '36px' }}
            // onClick={props.handleAddCustomer}
            onClick={() => console.log(relatives)}
          />
        ) : (
          <Button
            label="Lưu"
            style={{ width: '90px', height: '36px' }}
            onClick={props.handleEditCustomer}
          />
        )}
      </div>
    </div>
  )
}

export default EditPersonalInformation
