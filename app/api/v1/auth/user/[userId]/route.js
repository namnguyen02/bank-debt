import supabase from 'utils/supabase/auth/admin'
import createServer from 'utils/supabase/auth/route'

export async function GET(_, { params }) {
  const { data, error } = await supabase.auth.admin.getUserById(params.userId)

  if (error) return Response.json(error, { status: error.status || 400 })

  return Response.json(data.user)
}

async function updateToTable(userId, other) {
  const supabase = createServer()

  const { error } = await supabase
    .from('nhan_vien')
    .update({ ...other })
    .eq('auth_id', userId)

  if (error) return Response.json(error, { status: 400 })

  return null
}

export async function PATCH(request, { params }) {
  const res = await request.json()

  const { email, phone, password, ...other } = res
  const { data, error } = await supabase.auth.admin.updateUserById(params.userId, {
    email,
    password,
    phone,
    user_metadata: { ...other },
  })

  if (error) return Response.json(error, { status: error.status || 400 })

  const isSuccess = updateToTable(data.user.id, { ...other })

  if (!isSuccess) return isSuccess

  return Response.json(data)
}

export async function DELETE(_, { params }) {
  const { data, error } = await supabase.auth.admin.deleteUser(params.userId)

  if (error) return Response.json(error, { status: error.status || 400 })

  return Response.json(data)
}
