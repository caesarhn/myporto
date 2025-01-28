import {db} from "../../../utils/mysql/index"
import {content, contentComponent, Session} from "../../../models/mysql/schema"
import { and, eq, gt } from "drizzle-orm"
import { v4 as uuid } from 'uuid'

export async function POST({params, request, cookies}){
    const body = await request.json()
    var message = "yeeayyy"

    console.log(body.data)

    return new Response(JSON.stringify({
        message: message 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}