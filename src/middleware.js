import { defineMiddleware } from "astro:middleware"
import { db } from "./utils/mysql/index"
import { Account, Session } from "./models/mysql/schema"
import { eq, and } from "drizzle-orm"
import { PUBLIC_URL, makeToken} from "./constant"
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export const onRequest = defineMiddleware(async (context, next) => {
    //const start = Date.now()
    const path = context.url.pathname.split('/')
    const {request, locals} = context
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /mobile/i.test(userAgent);
    locals.device = isMobile ? 'mobile' : 'desktop';

    if(path[2] == 'read' || PUBLIC_URL.includes(context.url.pathname)){
        //console.log("time: ", Date.now())
        return next()
    }

    const token = context.cookies.get("token")
    const findSessions = await db.select().from(Session).where(eq(Session.sessionId, token?.value != null ? token.value : ""))

    if(findSessions.length == 0){
        //public
        if(path[2] == 'read' || PUBLIC_URL.includes(context.url.pathname)){
            return next()
        }
        else if(context.url.pathname == "/login" && context.request.method == "GET"){
            return next()
        }
        else if(context.url.pathname == "/login" && context.request.method == "POST"){
            const data = await context.request.formData()
            //const start = Date.now()
            //const password = await bcrypt.hash(data.get("password"), 7)
            //const end = Date.now() - start
            //console.log(data.get("password"), " ", password, " in ", end, "ms")
            const findUser = await db.select().from(Account).where(eq(Account.username, data.get("username")))
            //console.log(findUser.length)
            if(findUser.length != 0){
                //console.log("user ditemukan: ", findUser[0].username)
                try{
                    const result = await bcrypt.compare(data.get("password"), findUser[0].password)
                    //console.log("verifikasi: ", result)
                    if(result){
                        //init Token
                        const newtoken = makeToken(12)
                        const expired = Date.now() + 14000000
                        context.cookies.set("user", findUser[0].username)
                        context.cookies.set("token", newtoken)
                        await db.insert(Session).values({
                            id: uuid(),
                            accountId: findUser[0].id,
                            sessionId: newtoken,
                            expired: expired,
                            creatorId: findUser[0].creatorId
                        })
                        return context.redirect("/beranda", 302)
                    }else{
                        //console.log("server merespon")
                        return new Response(
                            JSON.stringify({message: 'Password salah'}),
                            {
                                status: 401,
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }
                        )
                    } 
                }catch(err){
                    //console.log("error nyaa")
                    return new Response(
                        JSON.stringify({message: 'error ee'}),
                        {
                            status: 401,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                }
            }
            return context.redirect("/login", 302)
        }
        else{
            return context.redirect("/login", 302)
        }
    }else{
        //check token expired
        //console.log(Number(findSessions[0].expired))
        if(Number(findSessions[0].expired) < Date.now()){
            await db.delete(Session).where(eq(Session.sessionId, context.cookies.get("token")?.value))
            context.cookies.delete("token")
            context.cookies.delete("user")
            return context.redirect("/login", 302)
        }
        else if(path[1] === "logout"){
            //console.log("logout")
            await db.delete(Session).where(eq(Session.sessionId, context.cookies.get("token")?.value))
            return context.redirect("/login", 302)
        }
        else if(path[1] === "api"){
            //console.log("ini permintaan ke API")
            return next()
        }else{
            return next()
        }
    }
})