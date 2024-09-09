import { Bot, webhookCallback } from 'grammy';
import { setDeleteMode, getDeleteMode } from "@/app/lib/state";
import { NextResponse } from 'next/server';

const token = process.env.TELEGRAM_BOT_TOKEN_SECOND;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

// Обработка сообщений от Telegram
bot.on('message', async (ctx) => {
    const messageText = ctx.message.text;

    if (messageText === '/start') {
        if (getDeleteMode()) {
            await ctx.reply('SUPER');  // В режиме удаления
        } else {
            await ctx.reply('HEELLLLLL');  // В обычном режиме
        }
    }
});

// Вебхук для Telegram
const handleTelegramWebhook = webhookCallback(bot, 'std/http');

// POST-запрос для изменения состояния
export async function POST(req: Request) {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        const body = await req.json();

        if (body && typeof body.value === 'boolean') {
            // Изменение глобального состояния
            setDeleteMode(body.value);
            return NextResponse.json({ success: true, message: 'Mode updated', isDeleteMode: getDeleteMode() });
        }
    }

    // Если это запрос от Telegram (вебхук), обрабатываем его
    return handleTelegramWebhook(req);
}
