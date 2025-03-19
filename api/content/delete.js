import {db} from "../../../utils/mysql/index"
import {content, contentComponent, Session} from "../../../models/mysql/schema"
import { and, eq } from "drizzle-orm"

export async function DELETE({params, request, cookies}) {
    const body = await request.json()
    const token = cookies.get("token")
    var message = ""

    const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))
    const contentData = await db.select().from(content).where(and(eq(content.id, body.id), eq(content.creatorId, access[0].creatorId)))

    if(contentData.length !== 0){
        await db.delete(contentComponent).where(eq(contentComponent.contentId, body.id))
        await db.delete(content).where(eq(content.id, body.id))
        message = "content berhasil di hapus"
    }else{
        message = "data tidak ditemukan"
    }

    return new Response(JSON.stringify({message: message}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}