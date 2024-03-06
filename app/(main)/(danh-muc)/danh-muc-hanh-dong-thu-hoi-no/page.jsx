'use client'
import React, { useRef, useEffect, useState } from 'react'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toast } from 'primereact/toast'
import { TreeTable } from 'primereact/treetable'
import { Dropdown } from 'primereact/dropdown'

const types = [
  {
    name: 'Loại hành động',
  },
  {
    name: 'Tên hành động',
  },
  {
    name: 'Kết quả hành động',
  },
]

const DanhMucHanhDongThuHoiNo = () => {
  const tempData = [
    {
      key: '0',
      data: {
        name: 'Liên hệ khách hàng',
        type: 'Loại hành động',
      },
      children: [
        {
          key: '0-0',
          data: {
            name: 'Gọi điện',
            type: 'Tên hành động',
          },
          children: [
            {
              key: '0-0-0',
              data: {
                name: 'Liên hệ được',
                type: 'Kết quả hành động',
              },
            },
            {
              key: '0-0-1',
              data: {
                name: 'Không liên hệ được',
                type: 'Kết quả hành động',
              },
            },
          ],
        },
        {
          key: '0-1',
          data: {
            name: 'Gửi SMS',
            type: 'Tên hành động',
          },
        },
        {
          key: '0-2',
          data: {
            name: 'Gửi Email',
            type: 'Tên hành động',
          },
        },
      ],
    },
    {
      key: '1',
      data: {
        name: 'Liên hệ khách hàng',
        type: 'Loại hành động',
      },
      children: [
        {
          key: '1-0',
          data: {
            name: 'Gọi điện',
            type: 'Tên hành động',
          },
        },
        {
          key: '1-1',
          data: {
            name: 'Gửi SMS',
            type: 'Tên hành động',
          },
        },
        {
          key: '1-2',
          data: {
            name: 'Gửi Email',
            type: 'Tên hành động',
          },
        },
      ],
    },
  ]
  const [data, setData] = useState(tempData)
  const [selectedFileKeys, setSelectedFileKeys] = useState(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [form, setForm] = useState({})
  const [type, setType] = useState({})
  const [actionType, setActionType] = useState({})
  const [actionName, setActionName] = useState({})
  const [errors, setErrors] = useState({})

  const renderActionTypeInputs = () => {
    return type.name === 'Loại hành động' ? (
      <div className="field">
        <label htmlFor="HoTen">
          Loại hành động <span style={{ color: 'red' }}>*</span>
        </label>
        <InputText
          value={form.loai_hanh_dong}
          onChange={(e) => {
            setForm({ ...form, loai_hanh_dong: e.target.value })
            setErrors({ ...errors, actionTypeError: false })
          }}
          className={errors.actionTypeError ? 'p-invalid' : ''}
        />
      </div>
    ) : (
      <div className="field">
        <label htmlFor="HoTen">
          Loại hành động <span style={{ color: 'red' }}>*</span>
        </label>
        <Dropdown
          value={actionType}
          onChange={(e) => {
            setActionType(e.value)
            setForm({ ...form, loai_hanh_dong: e.value.name })
            setErrors({ ...errors, actionTypeError: false })
          }}
          options={types}
          optionLabel="name"
          placeholder="Chọn loại hành động"
          className={errors.actionTypeError ? 'p-invalid' : ''}
        />
      </div>
    )
  }

  const renderActionNameInputs = () => {
    return type.name === 'Tên hành động' ? (
      <>
        {renderActionTypeInputs()}
        <div className="field">
          <label htmlFor="HoTen">
            Tên hành động <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            value={form.ten_hanh_dong}
            onChange={(e) => {
              setForm({ ...form, ten_hanh_dong: e.target.value })
              setErrors({ ...errors, actionNameError: false })
            }}
            className={errors.actionNameError ? 'p-invalid' : ''}
          />
        </div>
      </>
    ) : (
      <>
        {renderActionTypeInputs()}
        <div className="field">
          <label htmlFor="HoTen">
            Tên hành động <span style={{ color: 'red' }}>*</span>
          </label>
          <Dropdown
            value={actionName}
            onChange={(e) => {
              setActionName(e.value)
              setForm({ ...form, ten_hanh_dong: e.value.name })
              setErrors({ ...errors, actionNameError: false })
            }}
            options={types}
            optionLabel="name"
            placeholder="Chọn tên hành động"
            className={errors.actionNameError ? 'p-invalid' : ''}
          />
        </div>
      </>
    )
  }

  const renderActionResultInputs = () => {
    return (
      <>
        {renderActionNameInputs()}
        <div className="field">
          <label htmlFor="HoTen">
            Kết quả hành động <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            value={form.ghi_chu_ket_qua}
            onChange={(e) => {
              setForm({ ...form, ghi_chu_ket_qua: e.target.value })
              setErrors({ ...errors, actionResultError: false })
            }}
            className={errors.actionResultError ? 'p-invalid' : ''}
          />
        </div>
      </>
    )
  }

  const renderAddContent = () => {
    return (
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="HoTen">
            Loại <span style={{ color: 'red' }}>*</span>
          </label>
          <Dropdown
            value={type}
            onChange={(e) => {
              setType(e.value)
              setErrors({})
              setForm({})
              setActionName({})
              setActionType({})
            }}
            options={types}
            optionLabel="name"
            placeholder="Chọn loại cần thêm"
            className={errors.typeError ? 'p-invalid' : ''}
          />
        </div>
        {type.name === 'Loại hành động' && renderActionTypeInputs()}
        {type.name === 'Tên hành động' && renderActionNameInputs()}
        {type.name === 'Kết quả hành động' && renderActionResultInputs()}
        <div className="flex justify-content-center mt-5">
          <Button
            label="Hủy"
            severity="primary"
            outlined
            style={{ width: '80px', height: '36px' }}
            onClick={() => onCancelAddDialog()}
          />
          <Button
            label="Thêm"
            style={{ width: '80px', height: '36px', marginLeft: '16px' }}
            onClick={() => handleAdd()}
          />
        </div>
      </div>
    )
  }

  const onCancelAddDialog = () => {
    setShowAddDialog(false)
    setType({})
    setForm({})
    setActionName({})
    setActionType({})
    setErrors({})
  }

  const preCheck = () => {
    let noError = true
    const tempError = {}
    if (!type.name) {
      noError = false
      tempError.typeError = true
    }
    if (type.name === 'Loại hành động' && !form.loai_hanh_dong) {
      noError = false
      tempError.actionTypeError = true
    }
    if (type.name === 'Tên hành động') {
      if (!actionType.name) {
        noError = false
        tempError.actionTypeError = true
      }
      if (!form.ten_hanh_dong) {
        noError = false
        tempError.actionNameError = true
      }
    }
    if (type.name === 'Kết quả hành động') {
      if (!actionType.name) {
        noError = false
        tempError.actionTypeError = true
      }
      if (!actionName.name) {
        noError = false
        tempError.actionNameError = true
      }
      if (!form.ghi_chu_ket_qua) {
        noError = false
        tempError.actionResultError = true
      }
    }
    setErrors(tempError)
    return noError
  }

  const handleAdd = () => {
    if (preCheck()) {
      onCancelAddDialog()
    }
  }

  return (
    <div className="card" style={{ minHeight: '100vh' }}>
      <div>
        <div className="flex justify-content-between mb-3">
          <div className="font-bold text-xl">Danh mục hành động thu hồi nợ</div>
          <Button
            label="Thêm"
            style={{ width: '80px', height: '36px', marginLeft: '16px' }}
            onClick={() => setShowAddDialog(true)}
          />
        </div>
        <Dialog
          header="Thêm"
          visible={showAddDialog}
          style={{ maxWidth: '400px', width: '90%' }}
          modal
          onHide={() => onCancelAddDialog()}
        >
          {renderAddContent()}
        </Dialog>
        <div>
          <TreeTable
            value={data}
            selectionMode="checkbox"
            selectionKeys={selectedFileKeys}
            onSelectionChange={(e) => setSelectedFileKeys(e.value)}
          >
            <Column field="name" header="Tên" expander />
            <Column field="type" header="Loại" />
          </TreeTable>
        </div>
      </div>
    </div>
  )
}

export default DanhMucHanhDongThuHoiNo
