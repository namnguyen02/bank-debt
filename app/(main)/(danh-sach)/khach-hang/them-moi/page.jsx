'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { TabView, TabPanel } from 'primereact/tabview'

import EditCaseworker from '@/components/editCustomer/edit-caseworker'
import EditDebtInformation from '@/components/editCustomer/edit-debt-information'
import EditLegalRecord from '@/components/editCustomer/edit-legal-record'
import EditPersonalInformation from '@/components/editCustomer/edit-personal-information'

import { addCustomer } from 'actions/customer/Customer'
import { getListStaff } from 'actions/nhan-vien/nhan-vien'

const AddNonePerformingLoan = () => {
  const router = useRouter()

  const [customerForm, setCustomerForm] = useState({ IDKhachHang: '65' })
  const [debtInfoForm, setDebtInfoForm] = useState({})
  const [staffs, setStaffs] = useState([])

  const handleChange = (field, value) => {
    setCustomerForm({ ...customerForm, [field]: value })
  }

  const handleAddCustomer = () => {
    addCustomer({ body: customerForm }).then((res) => {
      if (res && res.body === 'Inserted') {
        localStorage.setItem('addCustomer', 'success')
        router.push('/khach-hang')
      }
    })
  }

  const getStaffs = () => {
    getListStaff('').then((res) => {
      if (res && !res.error) {
        setStaffs(res.results)
      }
    })
  }

  useEffect(() => {
    getStaffs()
  }, [])

  return (
    <div>
      <TabView>
        <TabPanel header="Thông tin cá nhân">
          <EditPersonalInformation
            isAdding
            customerForm={customerForm}
            handleChange={handleChange}
            handleAddCustomer={handleAddCustomer}
          />
        </TabPanel>
        <TabPanel header="Thông tin dư nợ">
          <EditDebtInformation
            isAdding
            handleAddCustomer={handleAddCustomer}
            debtInfoForm={debtInfoForm}
            setDebtInfoForm={setDebtInfoForm}
          />
        </TabPanel>
        <TabPanel header="Nhân viên phụ trách">
          <EditCaseworker isAdding handleAddCustomer={handleAddCustomer} staffs={staffs} />
        </TabPanel>
        <TabPanel header="Hồ sơ pháp lý">
          <EditLegalRecord isAdding handleAddCustomer={handleAddCustomer} />
        </TabPanel>
      </TabView>
    </div>
  )
}

export default AddNonePerformingLoan
