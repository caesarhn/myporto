import {db} from "../../../utils/mysql/index"
import {contentComponent, content, Session} from "../../../models/mysql/schema"
import { and, eq } from "drizzle-orm"
import { v4 as uuid } from 'uuid'

export async function POST({request, cookies}) {
    const formdata = await request.formData()
    const token = cookies.get("token")
    const imageBlob = formdata.get("image")
    const index = formdata.get("index")
    const contentId = formdata.get("content_id")

    const access = await db.select().from(Session).where(eq(Session.sessionId, token?.value))
    const contents = await db.select().from(content).where(and(eq(content.creatorId, access[0]?.creatorId),eq(content.id, contentId)))

    let message = ""
    let status = 200
    
    if (!imageBlob || !imageBlob.name || !imageBlob.type.startsWith('image/')) {
        status = 400
    }
    else if(contents != null && contents != undefined){
        console.log("EXECUDET ", contents, "index: ", index)
        const arrayBuffer = await imageBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${Date.now()}-${imageBlob.name}`;
    
        // Gunakan fs untuk menyimpan file
        const fs = await import('fs/promises');
        await fs.writeFile(`./public/content/${fileName}`, buffer);

        message = "done upload image"

        await db.update(contentComponent).set({
            content: `content/${fileName}`
        }).where(and(eq(contentComponent.contentId, contentId), eq(contentComponent.index, index)))
    }else{
        message = "data not found"
    }


    return new Response(JSON.stringify({
        message: message 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}