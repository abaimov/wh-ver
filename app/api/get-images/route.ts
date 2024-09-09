import {NextRequest, NextResponse} from "next/server";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
import {list} from '@vercel/blob';

export async function GET(req: NextRequest) {
    try {
        const images = await list()
        return NextResponse.json({images, message: "images data done"}, {status: 200})
    } catch (e) {
        console.error('Error get images', e)
        return NextResponse.json({message: "not found images"}, {status: 500})
    }


}