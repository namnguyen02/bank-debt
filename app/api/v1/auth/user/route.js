import adminAuthClient from 'utils/supabase/admin'
import supabase from 'utils/supabase/client'

export async function GET() {
  const { data, error } = await adminAuthClient.listUsers()

  if (error) return Response.json(error, { status: error.status || 400 })

  return Response.json({ count: null, next: null, previous: null, results: data.users })
}

async function addToTable(userId, other) {
  const { error } = await supabase.from('nhan_vien').insert({ auth_id: userId, ...other })

  if (error) return Response.json(error, { status: 400 })

  return null
}

function getNewCount(newestID, permission, year) {
  const count = newestID.substring(8, 12)
  let newCount = (Number(count) + 1).toString()
  if (newCount.length === 1) {
    newCount = '000' + newCount
  } else if (newCount.length === 2) {
    newCount = '00' + newCount
  } else if (newCount.length === 3) {
    newCount = '0' + newCount
  }
  return `${permission}-${year}${newCount}`
}

export async function POST(request) {
  const res = await request.json()

  const { email, password, phone, ...other } = res

  if (other.permission) {
    const year = new Date().getFullYear()

    const { data, error } = await supabase
      .from('nhan_vien')
      .select('ma_nhan_vien')
      .like('ma_nhan_vien', `%${other.permission}-${year}%`)
      .order('ma_nhan_vien', { ascending: false })

    // create ma_nhan_vien
    if (data.length === 0) {
      other.ma_nhan_vien = `${other.permission}-${year}0001`
    } else {
      other.ma_nhan_vien = getNewCount(data[0].ma_nhan_vien, other.permission, year)
      console.log(other.ma_nhan_vien)
    }

    if (error) return Response.json(error, { status: 400 })
  }

  const { data, error } = await adminAuthClient.createUser({
    email,
    password,
    phone,
    email_confirm: true,
    phone_confirm: true,
    user_metadata: { ...other },
  })

  if (error) return Response.json(error, { status: error.status || 400 })

  const isSuccess = addToTable(data.user.id, { ...other })

  if (!isSuccess) return isSuccess

  return Response.json(data)
}
