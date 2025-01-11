import {db} from "../../../utils/mysql/index"
import {content, Session} from "../../../models/mysql/schema"
import { and, eq } from "drizzle-orm"

export async function PUT({params, request, cookies}) {
    const body = await request.json()
    const token = cookies.get("token")
    var message = "api has failed ..."
    var status = 200
    const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))

    if(access == null || access == undefined){
        message = "Unauthorize request"
    }else{
        const newTitle = body.title
        const id = body.contentid
        console.log(access)
        console.log("token: ", token, " creatorId: ", access.creatorId)
    
        if(newTitle !== undefined && id !== undefined){
            await db.update(content).set({
                tittle: newTitle,
                contentLink: ''
            }).where(and(eq(content.id, id), eq(content.creatorId, access[0].creatorId)))
            message = "updated content tittle done. yeeay"
        }else{
            message = "title wrong or id not found"
        }
    }

    return new Response(JSON.stringify({message: message}), {
        status: status,
        headers: { "Content-Type": "application/json" },
    })
}