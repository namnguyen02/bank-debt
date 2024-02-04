'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

import LawsuitSearch from '@/components/lawsuitAndExecution/search/lawsuitSearch'
import ManageJudgmentExecutionTable from '@/components/lawsuitAndExecution/manageJudgmentExecutionTable/ManageJudgmentExecutionTable'

import { getJudgments } from 'actions/tien-do-thi-hanh-an/tien-do-thi-hanh-an'

const ManageJudgmentExecution = () => {
  const [checkedList, setCheckedList] = useState([])
  const [data, setData] = useState([])
  const toast = useRef(null)

  const getListJudgments = () => {
    getJudgments().then((res) => {
      if (res && !res.error) {
        setData(res.results)
      }
    })
  }

  const informAddSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      detail: 'Tạo mới thi hành án thành công',
      life: 3000,
    })
    localStorage.removeItem('addJudgment')
  }

  useEffect(() => {
    if (localStorage.getItem('addJudgment') === 'success') {
      informAddSuccessfully()
    }
    getListJudgments()
  }, [])

  return (
    <div className="card">
      <Toast ref={toast} />
      <div>
        <Accordion>
          <AccordionTab header="Tìm kiếm">
            <LawsuitSearch />
          </AccordionTab>
        </Accordion>
      </div>
      <div>
        <div className="flex justify-content-between align-items-center mb-3">
          <div className="font-bold text-xl mt-4 mb-2">Danh sách thi hành án</div>
          <div className="flex" style={{ gap: '16px' }}>
            {checkedList.length > 0 && (
              <Button
                label="Xóa"
                style={{
                  height: '36px',
                  width: '80px',
                  backgroundColor: 'white',
                  color: 'red',
                  border: '1px solid red',
                }}
                className="mt-3"
              />
            )}
            <Link href={{ pathname: 'thi-hanh-an/ho-so', query: { createNew: true } }}>
              <Button label="Thêm" style={{ height: '36px', width: '100px' }} className="mt-3" />
            </Link>
          </div>
        </div>

        <ManageJudgmentExecutionTable
          data={data}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
        />
      </div>
    </div>
  )
}

export default ManageJudgmentExecution
