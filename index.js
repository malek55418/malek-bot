const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    // شيلنا مسار الـ Sessions عشان ميعملش تعارض في الأول
    authStrategy: new LocalAuth(), 
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // عشان ميسحبش رامات كتير
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('--- كود جديد ---');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
    console.log('✅✅ البوت نطق يا مالك! جرب دلوقتي');
});

client.on('message', async msg => {
    if (msg.body === 'بنج') {
        msg.reply('بونج! شغال يا وحش ⚡');
    }
});

client.initialize().catch(err => console.log('خطأ في التشغيل:', err));
