import {db} from "../../utils/mysql/index"
import {content} from "../../models/mysql/schema"
import { v4 as uuid } from 'uuid'

export async function POST({params, request}) {
    const body = await request.json()
    //console.log("esfasd ", body.id)
    const newId = uuid()
    await db.insert(content).values({
        id: newId,
        tittle: "sadfas",
        creatorId: body.id,
        posted: Date.now(),
        view: 0,
        like: 0,
        contentLink: "sdafsa"
    })

    return new Response(JSON.stringify({message: "make new content done"}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}