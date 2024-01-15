import supabase from 'utils/supabase/auth/admin'
import createServer from 'utils/supabase/auth/route'

export async function GET() {
  const { data, error } = await supabase.auth.admin.listUsers()

  if (error) return Response.json(error, { status: error.status || 400 })

  return Response.json({ count: null, next: null, previous: null, results: data.users })
}

async function addToTable(userId, other) {
  const supabase = createServer()

  const { error } = await supabase.from('nhan_vien').insert({ auth_id: userId, ...other })

  if (error) return Response.json(error, { status: 400 })

  return null
}

export async function POST(request) {
  const res = await request.json()

  const { email, password, phone, ...other } = res

  const { data, error } = await supabase.auth.admin.createUser({
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
