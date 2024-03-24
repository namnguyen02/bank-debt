'use client'
import React, { useEffect, useState } from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

import styles from './index.module.scss'

const EditDebtInformation = (props) => {
  const [process, setProcess] = useState({ name: 'Chưa khởi kiện' })
  const [processNote, setProcessNote] = useState('')

  return (
    <div>
      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="khu_vuc">Khu vực:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="khu_vuc"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.khu_vuc}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, khu_vuc: e.target.value })
            }}
            disabled
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="chi_nhanh">Chi nhánh:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="chi_nhanh"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.chi_nhanh}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, chi_nhanh: e.target.value })
            }}
            disabled
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="dvcn">Đơn vị chịu nợ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="dvcn"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.don_vi_chiu_no}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, don_vi_chiu_no: e.target.value })
            }}
            disabled
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="dvqlhs">Đơn vị quản lý hồ sơ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="dvqlhs"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.don_vi_quan_ly}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, don_vi_quan_ly: e.target.value })
            }}
            disabled
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="so_the">Số thẻ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="so_the"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.so_the}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, so_the: e.target.value })
            }}
            disabled
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="stk">Số tài khoản:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="stk"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.khu_vuc}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, khu_vuc: e.target.value })
            }}
            disabled
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="ngay_mo_the">Ngày mở thẻ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="ngay_mo_the" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="ncn3">Ngày chuyển nhóm 3:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="ncn3" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="ngnut">Nợ gốc nhận ủy thác:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="ngnut" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="nlnut">Nợ lãi nhận ủy thác:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="nlnut" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="tdnut">Tổng dư nợ ủy thác:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="tdnut" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="nght">Nợ gốc hiện tại:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="nght" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="nlht">Nợ lãi hiện tại:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="nlht" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="tdnht">Tổng dư nợ hiện tại:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="tdnht" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="stdtt">Số tiền đã thanh toán:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="stdtt" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsthad">Lãi suất trong hạn áp dụng:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="lsthad" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsqhad">Lãi suất quá hạn áp dụng:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="lsqhad" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsqhad">Hạn mức:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText id="lsqhad" type="text" className={styles.inputText} disabled />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsqhad">Tiến độ CN/PGD:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <Dropdown
            value={process}
            onChange={(e) => setProcess(e.value)}
            options={[
              { name: 'Chưa khởi kiện' },
              { name: 'Đã khởi kiện' },
              { name: 'Chưa thi hành án' },
              { name: 'Đã thi hành án' },
            ]}
            optionLabel="name"
            placeholder="Select"
            className={styles.dropdownStyle}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsqhad">Nội dung ghi chú tiến độ CN/PGD:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="lsqhad"
            type="text"
            className={styles.inputText}
            value={processNote}
            onChange={(e) => setProcessNote(e.target.value)}
          />
        </div>
      </div>

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
            onClick={() => console.log(customerForm)}
          />
        ) : (
          <Button label="Lưu" style={{ width: '90px', height: '36px' }} />
        )}
      </div>
    </div>
  )
}

export default EditDebtInformation
