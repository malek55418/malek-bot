const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    // السطر ده هيخلي السيرفر يحفظ ملفات الدخول في فولدر مش بيتمسح بسهولة
    authStrategy: new LocalAuth({
        dataPath: './sessions' 
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('امسح الكود لآخر مرة:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
    console.log('✅✅ البوت شغال ومحفوظ.. اقفل اللابتوب براحتك!');
});

client.on('message', async msg => {
    if (msg.body === 'بنج') {
        msg.reply('بونج! أنا شغال والسيرفر صاحي ⚡');
    }
});

client.initialize();
