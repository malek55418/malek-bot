const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    // السطر ده هو السر.. هيحفظ بيانات الدخول في فولدر اسمه .wwebjs_auth
    authStrategy: new LocalAuth({
        dataPath: './sessions' 
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('لو طلب منك QR مرة أخيرة، امسحه من الرابط ده:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
    console.log('✅ مبروك يا مالك.. البوت شغال والواتساب مربوط!');
});

// --- منطقة الأوامر (ضيف هنا اللي إنت عاوزه) ---

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const user = msg.author || msg.from;

    // أمر: هلا
    if (msg.body === 'هلا') {
        msg.reply('هلا بيك يا حب، أنا بوت مالك شغال دلوقتي! 🚀');
    }

    // أمر: بنج
    if (msg.body === 'بنج') {
        msg.reply('بونج! البوت شغال بطلقة ⚡');
    }

    // أمر: ايدي
    if (msg.body === 'ايدي') {
        msg.reply(`الآيدي بتاعك هو: ${user}`);
    }
});

client.initialize();
