import {Bot} from 'grammy';
import {setDeleteMode, getDeleteMode} from "@/app/lib/state";
import {NextResponse} from 'next/server';

const token = process.env.TELEGRAM_BOT_TOKEN_SECOND;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

let value = false
const bot = new Bot(token);

// Обработка сообщений от Telegram через polling
bot.on('message', async (ctx) => {
    const messageText = ctx.message.text;
    if(!value){
        if (messageText === '/start') {
            await ctx.reply('SUPER');  // В режиме удаления

        }
    }else {
        if (messageText === '/start') {
            await ctx.reply('GOVNO');  // В режиме удаления

        }
    }

});

// Запуск polling
bot.start()
    .then(() => console.log('Бот запущен в режиме polling'))
    .catch(err => console.error('Ошибка запуска бота:', err));

// POST-запрос для изменения состояния
export async function POST(req: Request) {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        const body = await req.json();
        console.log('Получено тело запроса:', body);

        if (body && typeof body.value === 'boolean') {
            // Изменение глобального состояния
            setDeleteMode(body.value);
            return NextResponse.json({success: true, message: 'Mode updated', isDeleteMode: getDeleteMode()});
        }
    }

    return NextResponse.json({success: false, message: 'Invalid request'});
}
