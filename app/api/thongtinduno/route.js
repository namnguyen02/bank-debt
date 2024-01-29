import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())

  const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
  const limit = obj['limit'] ? parseInt(obj['limit']) : 20 // Limit default = 20
  if (obj['offset'] && obj['limit']) {
    const { data, error } = await supabase.from('thong_tin_du_no').select('*').range(offset, limit)
    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error)
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ count: data.length, next: null, previous: null, results: data }, { status: 200 })
  } else {
    const { count, data, error } = await supabase.from('thong_tin_du_no').select('*', { count: 'exact' })
    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error)
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ count: count, next: null, previous: null, results: data }, { status: 200 })
  }
}

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
      return NextResponse.json({ body: 'Invalid or missing "id" parameter' }, { status: 400 })
    }

    const { error } = await supabase.from('thong_tin_du_no').insert(dataToCreate)

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json({ body: 'Inserted' }, { status: 200 })
  } catch (error) {
    let error_response = {
      body: error.message
    }
    return NextResponse.json(JSON.stringify(error_response), {
      status: 500
    })
  }
}
