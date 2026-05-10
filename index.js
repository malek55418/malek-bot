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
    console.log('امسح الكود من الرابط ده:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
    console.log('✅ البوت شغال دلوقتي.. جرب تبعت كلمة (بنج)');
});

client.on('message', async msg => {
    // الرد على كلمة بنج
    if (msg.body === 'بنج') {
        msg.reply('بونج! البوت شغال يا مالك ⚡');
    }

    // الرد على كلمة المطور
    if (msg.body === 'المطور') {
        msg.reply('مالك هو عم الناس والمطور بتاعنا 👑');
    }
});

client.initialize();
