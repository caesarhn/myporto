import {db} from "../../../utils/mysql/index"
import {content} from "../../../models/mysql/schema"
import { v4 as uuid } from 'uuid'

export async function POST({params, request, cookies}) {
    const token = cookies.get("token")
    const param = params
    //console.log("token: ", token, " params: ", param, " ", await request)
    const body = await request.json()

    const newId = uuid()
    const date = new Date(Date.now())
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('id-ID', options)
    //console.log("date: ",formattedDate)
    await db.insert(content).values({
        id: newId,
        tittle: "sadfas",
        creatorId: body.id,
        posted: formattedDate,
        view: 0,
        like: 0,
        contentLink: "sdafsa"
    })

    return new Response(JSON.stringify({
        message: "make new content done",
        url_id: newId 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}