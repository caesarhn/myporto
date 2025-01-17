import {db} from "../../../utils/mysql/index"
import {content} from "../../../models/mysql/schema"
import { v4 as uuid } from 'uuid'

export async function post({request}) {
    const formdata = await request.formdata()
    const imageBlob = formdata.get("image")

    if (!imageBlob || !imageBlob.name || !imageBlob.type.startsWith('image/')) {
        return new Response(JSON.stringify({ error: 'Invalid image file' }), { status: 400 });
    }

    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}-${imageBlob.name}`;

    // Gunakan fs untuk menyimpan file
    const fs = await import('fs/promises');
    await fs.writeFile(`./content/${fileName}`, buffer);
}