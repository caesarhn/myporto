import {db} from "../../../utils/mysql/index"
import {content, contentComponent, Session, contentComponentV3} from "../../../models/mysql/schema"
import { and, eq, gt } from "drizzle-orm"
import { v4 as uuid } from 'uuid'

export async function POST({params, request, cookies}){
    const body = await request.json()
    const token = cookies.get("token")
    var message = "yeeayyy"

    console.log(body)
    const date = new Date(Date.now())
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('id-ID', options)

    await db.update(content).set({
        content: body.data,
        updated: formattedDate,
        tittle: body.title
    }).where(eq(content.id, body.id))

    await db.insert(contentComponentV3).values({
        id: uuid(),
        index: 0,
        content: body.data,
    })

    //const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))
    //const contentData = await db.select().from(content).where(eq(content.id, body.contentId))

    return new Response(JSON.stringify({
        message: message 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}

export async function GET({params, request, cookies}){
    const token = cookies.get("token")
    var message = "yeeayyy"

    const data = await db.select().from(contentComponentV3).where(eq(contentComponentV3.index, 0))

    //const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))
    //const contentData = await db.select().from(content).where(eq(content.id, body.contentId))

    return new Response(JSON.stringify({
        message: message ,
        data: data
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}