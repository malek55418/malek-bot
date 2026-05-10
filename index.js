const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './sessions' }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('رابط الكود:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
    console.log('✅ البوت شغال بنظام الشباك (#)');
});

client.on('message_create', async (msg) => {
    const prefix = '#'; // هنا حددنا الرمز بتاعنا
    const content = msg.body.trim();

    // لو الرسالة مش بتبدأ بالشباك، البوت يطنشها تماماً
    if (!content.startsWith(prefix)) return;

    // بنشيل الشباك وناخد الكلمة اللي بعده
    const command = content.slice(prefix.length).toLowerCase();

    if (command === 'بنج') {
        await msg.reply('⚡ بنجك سريع يا وحش! البوت شغال.');
    }

    if (command === 'المطور') {
        await msg.reply('👑 مطور هذا البوت هو الباشا مالك.');
    }

    if (command === 'اوامر') {
        await msg.reply('📜 الأوامر المتاحة:\n1. #بنج\n2. #المطور\n3. #اوامر');
    }
});

client.initialize();
