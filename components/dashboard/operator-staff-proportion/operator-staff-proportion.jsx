'use client'
import React, { useState, useEffect, useRef } from 'react'

import { Chart } from 'primereact/chart'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'

const OperatorStaffProportion = () => {
  const barOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6c757d',
          font: {
            weight: '500',
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#6c757d',
        },
        grid: {
          color: '#dfe7ef',
        },
        border: {
          display: false,
        },
      },
    },
  }

  const tempData = {
    labels: ['Nhân viên 1', 'Nhân viên 2', 'Nhân viên 3', 'Nhân viên 4', 'Nhân viên 5'],
    datasets: [
      {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        data: [60, 54, 100, 48, 70],
        label: 'Tổng tỷ trọng',
      },
    ],
  }

  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [loading, setLoading] = useState(false)

  const onLoadingClick = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="card">
      <div className="field grid">
        <div className="flex mr-5">
          <div className="sm:flex sm:justify-content-end sm:align-items-center mr-2">
            <label htmlFor="lsqhad">Từ</label>
          </div>
          <div className="">
            <Calendar
              inputId="calendar"
              value={fromDate}
              onChange={(e) => setFromDate(e.value ?? '')}
            ></Calendar>
          </div>
        </div>
        <div className="flex">
          <div className="sm:flex sm:justify-content-end sm:align-items-center mr-2">
            <label htmlFor="lsqhad">Đến</label>
          </div>
          <div className="">
            <Calendar
              inputId="calendar"
              value={toDate}
              onChange={(e) => setToDate(e.value ?? '')}
            ></Calendar>
          </div>
        </div>
        <Button
          label="Xem"
          icon="pi pi-search"
          loading={loading}
          onClick={onLoadingClick}
          className="ml-4"
        />
      </div>
      <Chart type="bar" data={tempData} options={barOptions}></Chart>
    </div>
  )
}

export default OperatorStaffProportion
