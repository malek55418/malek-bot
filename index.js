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
    qrcode.generate(qr, {small: true});
    console.log('امسح الكود ده دلوقتي يا مالك:');
});

client.on('ready', () => {
    console.log('✅ مبروك يا وحش.. البوت اشتغل!');
});

client.initialize();
