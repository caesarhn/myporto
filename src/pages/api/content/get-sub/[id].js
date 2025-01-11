import {db} from "../../../utils/mysql/index"
import {contentComponent} from "../../../models/mysql/schema"
import { and, eq } from "drizzle-orm"

export async function GET({params, url, cookies}){
    
    const contentid = url.searchParams.get("contentid")
    const index = url.searchParams.get("index")
    var message = ""

    console.log("index: ", index, " contentId: ", contentid)

    const data = await db.select().from(contentComponent).where(and(eq(contentComponent.contentId, contentid), eq(contentComponent.index, index)))

    console.log(data[0])
    return new Response(JSON.stringify({
        data: data[0],
        message: message 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}