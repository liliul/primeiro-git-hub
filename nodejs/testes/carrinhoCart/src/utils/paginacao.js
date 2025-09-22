async function CursorPagesScrollInfinity() {
    const { cursor_created_at, cursor_id, limit = 5 } = req.query

    const createdAt = cursor_created_at ? new Date(cursor_created_at) : null
    const id = cursor_id || null
    const pageLimit = parseInt(limit, 10) || 5

    const params = []
    let where = ""

    if (createdAt && id) {
        where = "WHERE (o.created_at, o.id) < ($1, $2)"
        params.push(createdAt, id, pageLimit)
    } else {
        where = ""
        params.push(pageLimit)
    }

    const query = `
        SELECT 
            (SELECT u.name FROM users u WHERE u.id = o.user_id) AS user_name,
            (SELECT u.email FROM users u WHERE u.id = o.user_id) AS user_email,
            o.id, o.user_id, o.total, o.status, o.created_at
        FROM orders o
        ${where}
        ORDER BY o.created_at DESC, o.id DESC
        LIMIT $${params.length};
    `

    console.log(params);
    
    const selectOrders = await this.db.query(query, params)

    res.status(200).json({ 
        message: 'Paginando Orders',
        data: selectOrders.rows
    })
}