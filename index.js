const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './sessions' 
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// إظهار الـ QR لو لزم الأمر
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('لو طلب QR افتح الرابط ده:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
    console.log('✅ البوت جاهز يا مالك.. ابدأ جرب الأوامر!');
});

// --- بداية منطقة الأوامر الجديدة ---
client.on('message', async (msg) => {
    const text = msg.body.toLowerCase();
    const chat = await msg.getChat();

    // 1. أمر بنج
    if (text === 'بنج') {
        await msg.reply('بونج! ⚡ البوت شغال يا مالك زي الطلقة.');
    }

    // 2. أمر المطور
    if (text === 'المطور') {
        await msg.reply('مطور البوت هو الباشا مالك. 👑');
    }

    // 3. أمر منشن للكل (للجروبات فقط)
    if (text === '@الكل' && chat.isGroup) {
        let mentions = [];
        let responseText = "تنبيه للجميع: \n\n";
        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            responseText += `@${participant.id.user} `;
        }
        await chat.sendMessage(responseText, { mentions });
    }

    // 4. تحويل صورة لستيكر (ابعت صورة واكتب "ملصق" في الكابشن)
    if (msg.hasMedia && text === 'ملصق') {
        try {
            const media = await msg.downloadMedia();
            await client.sendMessage(msg.from, media, {
                sendMediaAsSticker: true,
                stickerName: "بوت مالك",
                stickerAuthor: "Malek-Bot"
            });
        } catch (err) {
            msg.reply('حصلت مشكلة وأنا بحول الصورة، جرب تاني.');
        }
    }
});
// --- نهاية منطقة الأوامر ---

client.initialize();
