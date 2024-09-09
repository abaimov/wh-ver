import {NextRequest, NextResponse} from 'next/server';
import {put} from '@vercel/blob';

export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({status: 'fail', message: 'No file uploaded'}, {status: 400});
        }

        // Convert the file to a buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Use Vercel Blob Storage to upload the file
        const {url} = await put(`uploads/${file.name}`, buffer, {access: 'public'});

        return NextResponse.json({status: 'success', url});

    } catch (e: unknown) {
        let errorMessage = 'An unknown error occurred';

        // Проверяем, является ли ошибка экземпляром Error
        if (e instanceof Error) {
            errorMessage = e.message;  // Получаем сообщение об ошибке
        }

        return NextResponse.json({status: 'fail', message: errorMessage}, {status: 500});
    }
}
