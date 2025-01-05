import { defineMiddleware } from "astro:middleware"
import { db } from "./utils/db"
import { Account, Session } from "./models/schema"
import { eq, and } from "drizzle-orm"
import { PUBLIC_URL, makeToken} from "./constant"
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export const onRequest = defineMiddleware(async (context, next) => {
    //console.log(await context.request.formData())

    const Token = context.cookies.get("token")?.value ?? "no-token"
    const path = context.url.pathname.split('/')
    console.log(path)

    const token = await context.cookies.get("token")
    const findSessions = await db.select().from(Session).where(eq(Session.sessionId, token?.value))

    if(findSessions.length == 0){
        console.log("no session")
        //public
        if(path[2] == 'read' || PUBLIC_URL.includes(context.url.pathname)){
            return next()
        }
        else if(context.url.pathname == "/login" && context.request.method == "GET"){
            return next()
        }
        else if(context.url.pathname == "/login" && context.request.method == "POST"){
            const data = await context.request.formData()
            const start = Date.now()
            const password = await bcrypt.hash(data.get("password"), 11)
            const end = Date.now() - start
            console.log(data.get("password"), " ", password, " in ", end, "ms")
            const findUser = await db.select().from(Account).where(eq(Account.username, data.get("username")))
            if(findUser.length != 0){
                console.log("user ditemukan: ", findUser[0].username)
                await bcrypt.compare(data.get("password"), findUser[0].password, async (err, result) => {
                    console.log("verifikasi: ", result)
                    if(err){
                        console.log("error nyaa")
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
                    else if(result){
                        //init Token
                        const newtoken = makeToken(12)
                        const expired = Date.now() + 3600000
                        context.cookies.set("user", findUser[0].username)
                        context.cookies.set("token", newtoken)
                        await db.insert(Session).values({
                            id: uuid(),
                            userid: findUser[0].id,
                            sessionId: newtoken,
                            expired: expired
                        })
                        return context.redirect("/beranda", 302)
                    }else{
                        console.log("server merespon")
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
                })
            }
            return context.redirect("/login", 302)
        }
        else{
            return context.redirect("/login", 302)
        }
    }else{
        //check token expired
        console.log(Number(findSessions[0].expired))
        console.log(Date.now() - 1725657249609)
        if(Number(findSessions[0].expired) < Date.now()){
            await db.delete(Session).where(eq(Session.sessionId, context.cookies.get("token")?.value))
            context.cookies.delete("token")
            context.cookies.delete("user")
            return context.redirect("/login", 302)
        }else{
            return next()
        }
    }
})