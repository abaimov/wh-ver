import { Bot } from 'grammy';
import { NextResponse } from 'next/server';

const token = process.env.TELEGRAM_BOT_TOKEN_SECOND;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

// Обработка POST-запросов для отправки сообщений
export async function POST(req: Request) {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        const body = await req.json();
        console.log('Получено тело запроса:', body);

        const { message, users } = body;

        if (message && Array.isArray(users) && users.length > 0) {
            try {
                // Отправляем сообщение каждому пользователю из массива users
                for (const userId of users) {
                    await bot.api.sendMessage(userId, message);
                }

                return NextResponse.json({ success: true, message: 'Messages sent to all users' });
            } catch (err) {
                console.error('Ошибка при отправке сообщений:', err);
                return NextResponse.json({ success: false, message: 'Error sending messages' });
            }
        }
    }

    return NextResponse.json({ success: false, message: 'Invalid request' });
}
