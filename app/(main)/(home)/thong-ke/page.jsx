'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { Accordion, AccordionTab } from 'primereact/accordion'

import StaffDebtRecovery from '@/components/dashboard/staff-debt-recovery/staff-debt-recovery'
import StaffKKTHA from '@/components/dashboard/staff-kk-tha/staff-kk-tha'
import OperatorStaffProportion from '@/components/dashboard/operator-staff-proportion/operator-staff-proportion'
import OperatorStaffCustomers from '@/components/dashboard/operator-staff-customers/operator-staff-customers'

const ThongKe = (props) => {
  return (
    <div className="card">
      <div className="font-bold text-xl mb-4">Thống kê</div>
      {props.user.role === 'SHB' && (
        <Accordion activeIndex={0}>
          <AccordionTab header="Biểu đồ tình hình thu hồi nợ">
            <StaffDebtRecovery />
          </AccordionTab>
          <AccordionTab header="Biểu đồ tình hình khởi kiện - thi hành án">
            <StaffKKTHA />
          </AccordionTab>
        </Accordion>
      )}

      {props.user.role === 'NDH' && (
        <Accordion activeIndex={0}>
          <AccordionTab header="Biểu đồ tổng tỷ trọng của từng nhân viên">
            <OperatorStaffProportion />
          </AccordionTab>
          <AccordionTab header="Biểu đồ tổng số khách hàng mỗi nhân viên phụ trách">
            <OperatorStaffCustomers />
          </AccordionTab>
        </Accordion>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(ThongKe)
