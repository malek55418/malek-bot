const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './sessions' }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage', // مهم جداً عشان ميهنجش في ريلواي
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
    console.log('✅ البوت شغال ومستعد لكل الأوامر!');
});

// استخدمنا السطر ده عشان يضمن استلام كل الرسائل باستمرار
client.on('message_create', async (msg) => {
    try {
        const prefix = '#';
        if (!msg.body.startsWith(prefix)) return;

        const command = msg.body.slice(prefix.length).trim().toLowerCase();

        if (command === 'بنج') {
            // استخدمنا sendMessage بدل reply لأنها أخف وأسرع في السيرفرات
            await client.sendMessage(msg.from, '⚡ شغال يا وحش ومنور الدنيا!');
        }

        if (command === 'المطور') {
            await client.sendMessage(msg.from, '👑 مالك هو صاحب الليلة دي كلها.');
        }

    } catch (error) {
        console.error('فيه غلط حصل:', error);
    }
});

client.initialize();
