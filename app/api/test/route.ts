export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { Bot, webhookCallback } from 'grammy'

const token = process.env.TELEGRAM_BOT_TOKEN_SECOND

if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')

const bot = new Bot(token)
bot.on('message', async (ctx) => {
    const messageText = ctx.message.text;
    if (messageText === '/start') {
        try {
            // Удалить сообщение, если оно содержит /start
            await ctx.reply('HEELLLLLL');
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    }
});

export const POST = webhookCallback(bot, 'std/http')
