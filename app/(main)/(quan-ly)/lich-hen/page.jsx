'use client'
import React, { useState, useEffect } from 'react'

import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'

import AppointmentSearch from '@/components/lawsuitAndExecution/search/appointmentSearch'
import ManageAppointmentTable from '@/components/lawsuitAndExecution/manage-appointment-table/manage-appointment-table'

import { getListAppointments } from 'actions/lich-hen/lich-hen'
import { getListCustomer } from 'actions/customer/Customer'
import { getListStaff } from 'actions/nhan-vien/nhan-vien'

const ManageAppointment = () => {
  const [checkedList, setCheckedList] = useState([])
  const [data, setData] = useState([])
  const [customers, setCustomers] = useState([])
  const [staffs, setStaffs] = useState([])

  const getAppointments = () => {
    getListAppointments('offset=0&limit=10').then((res) => {
      if (res && res.count >= 0) {
        setData(res.results)
      }
    })
  }

  const getCustomers = () => {
    getListCustomer('queryAll=true').then((res) => {
      if (res && res.count >= 0) {
        setCustomers(res.results)
      }
    })
  }

  const getStaffList = () => {
    getListStaff('').then((res) => {
      if (res.results) {
        setStaffs(res.results)
      }
    })
  }

  useEffect(() => {
    getAppointments()
    getCustomers()
    getStaffList()
  }, [])

  return (
    <div className="card">
      <div>
        <Accordion>
          <AccordionTab header="Tìm kiếm">
            <AppointmentSearch customers={customers} staffs={staffs} isAppointment />
          </AccordionTab>
        </Accordion>
      </div>
      <div>
        <div className="flex justify-content-between align-items-center">
          <div className="font-bold text-xl mt-4 mb-2">Danh sách lịch hẹn</div>
          {checkedList.length > 0 && (
            <Button label="Xóa" style={{ height: '37px', width: '74px' }} />
          )}
        </div>

        <ManageAppointmentTable
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          data={data}
        />
      </div>
    </div>
  )
}

export default ManageAppointment
