import supabase from 'utils/supabase/auth/admin'
import createServer from 'utils/supabase/auth/route'

async function addToTable(userId) {
  const supabase = createServer()

  const { error } = await supabase
    .from('profiles')
    .insert({ id: userId, ho: last_name, ten: first_name, ...other })

  if (error) return Response.json(error, { status: error.status || 400 })
}

export async function POST(request) {
  const res = await request.json()

  const { email, password, phone, last_name, first_name, ...other } = res

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    phone,
    email_confirm: true,
    phone_confirm: true,
    user_metadata: { last_name, first_name, ...other },
  })

  if (error) return Response.json(error, { status: error.status || 400 })

  addToTable(data.user.id)

  return Response.json(data)
}
