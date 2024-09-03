import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

// Обработчик сообщений бота
bot.on('message', async (ctx) => {
    const messageText = ctx.message.text;
    if (messageText === '/start') {
        try {
            // Удалить сообщение с командой /start
            await ctx.deleteMessage();
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    } else {
        // Обработка других текстовых сообщений
        await ctx.reply(`You sent: ${messageText}`);
    }
});

// Функция POST для обработки запросов и логирования данных
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Логирование данных для проверки
        console.log('Request Body:', body);

        // Вызов обработчика webhook для Telegram
        await webhookCallback(bot, 'std/http')(request);

        // Возвращение данных обратно для тестирования
        return NextResponse.json({ message: 'Request received and processed', data: body }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
