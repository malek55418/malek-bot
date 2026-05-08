const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// إعدادات البوت
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// إظهار الكود بشكل أوضح
client.on('qr', (qr) => {
    // جربنا الـ false عشان المربعات تكون أوضح لو الشاشة كبيرة
    qrcode.generate(qr, {small: false});
    console.log('--- الكود الجديد وصل يا مالك.. جرب تمسحه دلوقتي ---');
});

client.on('ready', () => {
    console.log('✅ مبروك يا وحش.. البوت اشتغل والواتساب اتربط!');
});

client.initialize();
