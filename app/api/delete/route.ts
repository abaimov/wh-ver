// app/api/delete/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {del} from '@vercel/blob';
export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'
export async function POST(req: NextRequest) {
    try {
        const {pathname} = await req.json();

        if (!pathname) {
            return NextResponse.json({status: 'fail', message: 'No pathname provided'}, {status: 400});
        }

        // Удаляем файл через Vercel Blob API
        await del(pathname);

        return NextResponse.json({status: 'success', message: `File ${pathname} deleted successfully`});
    } catch (error: unknown) {
        console.error('Error deleting file:', error);

        let errorMessage = 'Unknown error occurred';

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ status: 'fail', message: errorMessage }, { status: 500 });
    }
}
