import { supabase } from 'utils/supabaseClient'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
  try {
    const res = await request.json()
    const dataToCreate = res.body
    const objLength = Object.keys(dataToCreate).length
    // If object has no params
    if (objLength <= 1) {
      return NextResponse.json({ body: 'Invalid or missing parameters' }, { status: 400 })
    }

    // Check logic id
    if (!dataToCreate['id'] || isNaN(parseInt(dataToCreate['id']))) {
      return NextResponse.json(
        { body: 'Invalid or missing "id" parameter' },
        { status: 400 }
      )
    } else {
      // if id is exist
      const { data, error } = await supabase.from('ghi_chep_ls_hanh_dong').select(`id`)
      const foundData = data.filter((item) => item['id'] == dataToCreate['id'])
      if (foundData.length > 0) {
        return NextResponse.json(
          { error: 'Debt recovery action of this id has already exist' },
          { status: 400 }
        )
      }
    }

    
    // create ma_ket_qua_hd
    const { count, data, error1 } = await supabase
      .from('ghi_chep_ls_hanh_dong')
      .select(`ma_ket_qua_hd`, { count: 'exact' })
    const precode = getPrecode(dataToCreate['loai_hanh_dong'], dataToCreate['ten_hanh_dong'])
    const data2 = data.filter((item) => item.ma_ket_qua_hd.includes(precode))
    data2.sort((a, b) => {
      let fa = a.ma_ket_qua_hd.toLowerCase(),
        fb = b.ma_ket_qua_hd.toLowerCase()

      if (fa > fb) {
        return -1
      }
      if (fa < fb) {
        return 1
      }
      return 0
    })
    dataToCreate['ma_ket_qua_hd'] =
      data2.length > 0 ? initiateId(data2[0].ma_ket_qua_hd) : initiateId(precode)

    const { error } = await supabase.from('ghi_chep_ls_hanh_dong').insert(dataToCreate)

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json({ body: 'Inserted' }, { status: 200 })
  } catch (error) {
    let error_response = {
      body: error.message,
    }
    return NextResponse.json(JSON.stringify(error_response), {
      status: 500,
    })
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())

  const id = obj['id'] ? obj['id'] : ''
  const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
  const limit = obj['limit'] ? parseInt(obj['limit']) : 10 // Limit default = 10

  // if get action by id
  if (id) {
    const { count, data, error } = await supabase
      .from('ghi_chep_ls_hanh_dong')
      .select(`*, khach_hang (ho_ten, can_cuoc), nhan_vien (ho_ten), lich_su_hanh_dong (*)`)
      .eq('id', id)
      .range(offset, limit)
    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { count: data.length, next: null, previous: null, results: data },
      { status: 200 }
    )
  }

  else if (obj['offset'] && obj['limit']) {
    const { data, error } = await supabase
      .from('ghi_chep_ls_hanh_dong')
      .select(`*, khach_hang (ho_ten, can_cuoc), nhan_vien (ho_ten), lich_su_hanh_dong (*)`)
      .range(offset, limit)
      .order('last_edited_at', { ascending: false })
    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { count: data.length, next: null, previous: null, results: data },
      { status: 200 }
    )
  } else {
    const { count, data, error } = await supabase
      .from('ghi_chep_ls_hanh_dong')
      .select(`*, khach_hang (ho_ten, can_cuoc), nhan_vien (ho_ten), lich_su_hanh_dong (*)`, { count: 'exact' })
      .order('last_edited_at', { ascending: false })
    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { count: count, next: null, previous: null, results: data },
      { status: 200 }
    )
  }
}
