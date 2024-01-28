import supabase from 'utils/supabase/client'
import { createLog } from './helpers'

const Action = {
  create: async ({ table, values }) => {
    const { data, error } = await supabase.from(table).insert(values).select().single()

    if (error) return Response.json(error, { status: 400 })

    return Response.json(data)
  },
  createWithLog: async ({ table, values, logData = null }) => {
    const { data, error } = await supabase.from(table).insert(values).select().single()

    if (error) return Response.json(error, { status: 400 })

    // Create log of khoi_kien and thi_hanh_an
    if (['khoi_kien', 'thi_hanh_an'].includes(table)) {
      createLog(
        table === 'khoi_kien' ? 'log_khoi_kien' : 'log_thi_hanh_an',
        logData,
        table === 'khoi_kien' ? data.ma_khoi_kien : data.ma_thi_hanh_an
      ).then((res) => {
        if (res.error) return Response.json(error, { status: 400 })
      })
    }

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
  readLawsuitJudgment: async ({ table, query, column = null, value = null }, single = false) => {
    if (single) {
      const { data, error } = await supabase.from(table).select(query).eq(column, value).single()

      if (error) return Response.json(error, { status: 400 })

      // get logs
      if (!error) {
        const { data, error } = await supabase
          .from(table === 'khoi_kien' ? 'log_khoi_kien' : 'log_thi_hanh_an')
          .select('*')
          .eq('ma_khoi_kien', value) // value is ma_khoi_kien
          .order('created_at', { ascending: false })
        if (!error) {
          data.logs = data
        }
      }

      // get lich_hen
      if (!error) {
        const { data, error } = await supabase
          .from('lich_hen')
          .select('*')
          .eq(table === 'khoi_kien' ? 'ma_khoi_kien' : 'ma_thi_hanh_an', value) // value is ma_khoi_kien or ma_thi_hanh_an
          .order('updated_at', { ascending: false })
        if (!error) {
          data.lich_hen = data
        }
      }

      // get tam_ung_an_phi (just khoi_kien has)
      if (!error && table === 'khoi_kien') {
        const { data, error } = await supabase
          .from('tam_ung_an_phi')
          .select('*')
          .eq('ma_khoi_kien', value) // value is ma_khoi_kien
          .order('updated_at', { ascending: false })
        if (!error) {
          data.tuap = data
        }
      }

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
  updateWithLog: async ({ table, values, column, value, logData = null }) => {
    const { data, error } = await supabase
      .from(table)
      .update(values)
      .eq(column, value)
      .select()
      .single()

    if (error) return Response.json(error, { status: 400 })

    // Create log of khoi_kien and thi_hanh_an
    if (['khoi_kien', 'thi_hanh_an'].includes(table)) {
      createLog(
        table === 'khoi_kien' ? 'log_khoi_kien' : 'log_thi_hanh_an',
        logData,
        table === 'khoi_kien' ? data.ma_khoi_kien : data.ma_thi_hanh_an
      ).then((res) => {
        if (res.error) return Response.json(error, { status: 400 })
      })
    }

    return Response.json(data)
  },
  delete: async ({ table, column, value }) => {
    const { error } = await supabase.from(table).delete().eq(column, value)

    if (error) return Response.json(error, { status: 400 })

    return Response.json({ message: 'xoa thanh cong' })
  },
}

export default Action
