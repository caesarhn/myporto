import {db} from "../../../utils/mysql/index"
import {content, contentComponent, Session} from "../../../models/mysql/schema"
import { and, eq, gt } from "drizzle-orm"
import { v4 as uuid } from 'uuid'

export async function GET({params, url, cookies}) {
    const contentId = url.searchParams.get("content_id")
    var message = "sucsess..."

    message = contentId
    const data = await db.select({
                            content: contentComponent.content, 
                            tag: contentComponent.tag
                        })
                        .from(contentComponent)
                        .where(eq(contentComponent.contentId, contentId))
                        .orderBy(contentComponent.index)

    return new Response(JSON.stringify({
        message: message,
        data: data
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}

export async function POST({params, request, cookies}){
    const body = await request.json()
    const token = cookies.get("token")
    var message = "yeeayyy"

    const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))
    const contentData = await db.select().from(content).where(eq(content.id, body.contentId))
    
    if(access[0].creatorId === contentData[0].creatorId){
        const check = await db.select().from(contentComponent).where(eq(contentComponent.contentId, body.contentId))
        const data = JSON.parse(body.data)
        //console.log(data)
        //console.log(body)
        data.map(async (item, i) => {
            if(item !== null || item !== ""){
                if(check.length-1 < i){
                    await db.insert(contentComponent).values({
                        id: uuid(),
                        index: i,
                        content: item.content,
                        tag: item.tag,
                        contentId: body.contentId,
                    })
                }else{
                    await db.update(contentComponent)
                            .set({
                                tag: item.tag,
                                content: item.content
                            })
                            .where(and(
                                eq(contentComponent.contentId, body.contentId), 
                                eq(contentComponent.index, i)
                            ))
                }
                if(item.tag === 7){
                    await db.update(content)
                        .set({
                            previewImg: item.content
                        }).where(eq(content.id, body.contentId))
                }
                if(i === 0 && item.tag === 5){
                    await db.update(content)
                        .set({
                            previewDesc: item.content
                        }).where(eq(content.id, body.contentId))
                }
            }
        })
        const moreThan = data.length - 1
        await db.delete(contentComponent)
            .where(and(
                eq(contentComponent.contentId, body.contentId),
                gt(contentComponent.index, moreThan)
            ))
    }

    return new Response(JSON.stringify({
        message: message 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}