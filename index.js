const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    // هيطبع لك الكود مكسر كالعادة (احتياطي)
    qrcode.generate(qr, {small: true});
    
    // وهيطبع لك الرابط ده.. خده كوبي وافتحه في صفحة جديدة
    console.log('--------------------------------------------');
    console.log('لو الكود مكسر افتح الرابط ده عشان تشوفه نظيف:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
    console.log('--------------------------------------------');
});

client.on('ready', () => {
    console.log('✅ مبروك يا مالك.. البوت اشتغل!');
});

client.initialize();
