// app/api/webhook/route.ts


export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import {Bot, webhookCallback} from 'grammy';
import {setDeleteMode, getDeleteMode} from "@/app/lib/state";
import {NextResponse} from 'next/server';


const token = process.env.TELEGRAM_BOT_TOKEN_SECOND;

if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

// Инициализация бота
const bot = new Bot(token);

// Функция для динамической обработки сообщений
bot.on('message', async (ctx) => {
    const messageText = ctx.message.text;

    if (messageText === '/start') {
        try {
            // В зависимости от состояния, отправляем разные сообщения
            if (getDeleteMode()) {
                await ctx.reply('SUPER');  // Если режим true
            } else {
                await ctx.reply('HEELLLLLL');  // Если режим false
            }
        } catch (error) {
            console.error('Failed to reply:', error);
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
            // Изменяем глобальное состояние
            setDeleteMode(body.value);
            return NextResponse.json({success: true, message: 'Mode updated', isDeleteMode: getDeleteMode()});
        }
    }

    // Если это не кастомный запрос, обрабатываем как вебхук Telegram
    return handleTelegramWebhook(req);
}
