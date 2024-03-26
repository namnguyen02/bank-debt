import React, { useState } from 'react'

import InformationTemplate from '../information-template/information-template'

const ApproverInformation = () => {
  return (
    <div className="grid mb-2">
      <InformationTemplate
        title="Tờ trình miễn giảm"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có <span className="text-green-500 font-medium">24 tờ trình miễn giảm</span>{' '}
                chưa phê duyệt (hoặc từ chối)
              </span>
            ),
          },
        ]}
      />
      <InformationTemplate
        title="Tờ trình đánh giá khởi kiện"
        firstInformation="500"
        secondInformation={[
          {
            data: (
              <span>
                Hôm nay có{' '}
                <span className="text-green-500 font-medium">24 tờ trình đánh giá khởi kiện</span>{' '}
                chưa phê duyệt (hoặc từ chối)
              </span>
            ),
          },
        ]}
      />
    </div>
  )
}

export default ApproverInformation
