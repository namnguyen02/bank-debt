import supabase from 'utils/supabase/client'

const Action = {
  create: async ({ table, values }) => {
    const { data, error } = await supabase.from(table).insert(values).select().single()

    if (error) return Response.json(error, { status: 400 })

    return Response.json(data)
  },
  read: async ({ table, query, column = null, value = null }, single = false) => {
    if (single) {
      const { data, error } = await supabase.from(table).select(query).eq(column, value).single()

      if (error) return Response.json(error, { status: 400 })

      return Response.json(data)
    }

    const { count, data, error } = await (column && value
      ? supabase
          .from(table)
          .select(query, {
            count: 'exact',
          })
          .eq(column, value)
      : supabase.from(table).select(query, {
          count: 'exact',
        }))

    if (error) return Response.json(error, { status: 400 })

    return Response.json({ count: count, next: null, previous: null, results: data })
  },
  update: async ({ table, values, column, value }) => {
    const { data, error } = await supabase
      .from(table)
      .update(values)
      .eq(column, value)
      .select()
      .single()

    if (error) return Response.json(error, { status: 400 })

    return Response.json(data)
  },
  delete: async ({ table, column, value }) => {
    const { error } = await supabase.from(table).delete().eq(column, value)

    if (error) return Response.json(error, { status: 400 })

    return Response.json({ message: 'xoa thanh cong' })
  },
}

export default Action
