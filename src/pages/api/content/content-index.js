import {db} from "../../../utils/mysql/index"
import {content, contentComponent, Session} from "../../../models/mysql/schema"
import { and, eq, gt } from "drizzle-orm"
import { v4 as uuid } from 'uuid'

export async function GET({params, url, cookies}){
    
    const contentid = url.searchParams.get("content_id")
    const index = url.searchParams.get("index")
    const token = cookies.get("token")
    var message = ""
    //console.log("index: ", index, " contentId: ", contentid)

    const data = await db.select().from(contentComponent).where(and(eq(contentComponent.contentId, contentid), eq(contentComponent.index, index)))

    //console.log(data[0])
    return new Response(JSON.stringify({
        data: data[0] ?? "",
        message: message 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}

export async function PUT({params, request, cookies}){
    const body = await request.json()
    const token = cookies.get("token")
    var message = ""

    const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))
    const contentData = await db.select().from(content).where(eq(content.id, body.content_id))

    //console.log(body)
    if(access[0].creatorId === contentData[0].creatorId){
        await db.update(contentComponent).set({
            index: body.index,
            content: body.content,
            tag: body.tag,
            style: body.style
        }).where(eq(contentComponent.id, body.id))
        message = "update content done"
    }
    
    return new Response(JSON.stringify({message: message}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}

export async function POST({params, request, cookies}){
    const body = await request.json()
    const token = cookies.get("token")
    var message = ""
    
    const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))
    const contentData = await db.select().from(content).where(eq(content.id, body.content_id))
    if(access[0].creatorId === contentData[0].creatorId){
        await db.insert(contentComponent).values({
            id: uuid(),
            index: body.index,
            content: body.content,
            tag: body.tag,
            style: body.style,
            contentId: body.content_id
        })
        message = "data inserted done"
    }

    return new Response(JSON.stringify({message: message}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}

export async function DELETE({params, url, cookies}) {
    const contentid = url.searchParams.get("content_id")
    const index = url.searchParams.get("index")
    const token = cookies.get("token")
    var message = ""

    const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))
    const contentData = await db.select().from(content).where(eq(content.id, contentid))

    if(access[0].creatorId === contentData[0].creatorId){
        await db.delete(contentComponent).where(and(gt(contentComponent.index, index), eq(contentComponent.id, contentid)))
        message = "delete content done"
    }

    return new Response(JSON.stringify({message: message}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}