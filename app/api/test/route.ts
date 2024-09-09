import { Bot } from 'grammy';
import { NextResponse } from 'next/server';

const token = process.env.TELEGRAM_BOT_TOKEN_SECOND;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

// Обработка сообщений от Telegram через polling
bot.on('message', async (ctx) => {
    const messageText = ctx.message.text;

    if (messageText === '/start') {
        await ctx.reply('Привет! Я ваш Telegram бот.');
    }
});

// Запуск polling
bot.start()
    .then(() => console.log('Бот запущен в режиме polling'))
    .catch(err => console.error('Ошибка запуска бота:', err));

// Обработка POST-запросов для отправки сообщений
export async function POST(req: Request) {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        const body = await req.json();
        console.log('Получено тело запроса:', body);

        if (body && body.message) {
            // Замените `CHAT_ID` на фактический ID чата
            const chatId = process.env.TELEGRAM_CHAT_ID;
            if (!chatId) throw new Error('TELEGRAM_CHAT_ID environment variable not found.');

            await bot.api.sendMessage(chatId, body.message);
            return NextResponse.json({ success: true, message: 'Message sent' });
        }
    }

    return NextResponse.json({ success: false, message: 'Invalid request' });
}
