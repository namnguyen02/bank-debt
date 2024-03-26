import React, { useState } from 'react'

import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'

const InformationTemplate = (props) => {
  const filterChoices = [
    { name: 'Kể từ lần cuối xem' },
    { name: 'Hôm nay' },
    { name: 'Hôm qua' },
    { name: 'Chọn ngày cụ thể' },
  ]
  const [preFilter, setPreFilter] = useState({ name: 'Kể từ lần cuối xem' })
  const [filter, setFilter] = useState({ name: 'Kể từ lần cuối xem' })
  const [typeIsFiltering, setTypeIsFiltering] = useState('Kể từ lần cuối xem')
  const [date, setDate] = useState(null)

  return (
    <div className="col-12 xl:col-6">
      <div className="card mb-0" style={{ height: '100%' }}>
        <div className="mb-4">
          <div
            className="flex justify-content-between align-items-center"
            style={{ height: '41px' }}
          >
            <div className="text-primary-500 font-medium text-900 text-xl">{props.title}</div>
            <div className="flex align-items-center">
              {props.isNewCustomer && filter.name === 'Chọn ngày cụ thể' && (
                <Button
                  icon="pi pi-undo"
                  rounded
                  severity="primary"
                  style={{ width: '30px', height: '30px' }}
                  onClick={() => setFilter(preFilter)}
                />
              )}
              {props.isNewCustomer && (
                <Button
                  icon="pi pi-search"
                  rounded
                  severity="primary"
                  style={{ width: '30px', height: '30px', marginLeft: '8px' }}
                  onClick={() => {
                    setTypeIsFiltering(filter.name)
                  }}
                />
              )}
              {props.isNewCustomer &&
                (filter.name !== 'Chọn ngày cụ thể' ? (
                  <Dropdown
                    value={filter}
                    options={filterChoices}
                    onChange={(e) => {
                      if (e.value.name === 'Chọn ngày cụ thể') {
                        setPreFilter(filter)
                      }
                      setFilter(e.value)
                    }}
                    optionLabel="name"
                    style={{ width: '170px', marginLeft: '8px' }}
                  />
                ) : (
                  <Calendar
                    inputId="calendar"
                    value={date}
                    onChange={(e) => setDate(e.value ?? '')}
                    style={{ width: '170px', marginLeft: '8px' }}
                    showIcon
                  ></Calendar>
                ))}

              <div className="underline cursor-pointer text-primary ml-3">Chi tiết</div>
            </div>

            {/* <div className="text-900 font-medium text-xl">{props.firstInformation}</div> */}
          </div>
          {/* <div
            className="flex align-items-center justify-content-center bg-blue-100 border-round"
            style={{ width: '2.5rem', height: '2.5rem' }}
          >
            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
          </div> */}
        </div>
        {props.isNewCustomer
          ? props.secondInformation.map((item, key) => (
              <div key={key}>
                <span className="text-green-500 font-medium">{item.data} </span>
                {typeIsFiltering === 'Kể từ lần cuối xem' && <span>kể từ lần cuối xem </span>}
                {typeIsFiltering === 'Hôm nay' && <span>trong hôm nay </span>}
                {typeIsFiltering === 'Hôm qua' && <span>trong hôm qua </span>}
                {typeIsFiltering === 'Chọn ngày cụ thể' && <span>trong ngày xx/xx/xxxx </span>}
              </div>
            ))
          : props.secondInformation.map((item, key) => <div key={key}>{item.data}</div>)}
      </div>
    </div>
  )
}

export default InformationTemplate
