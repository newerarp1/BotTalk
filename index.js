require('./server.js')
const {
  Client, GatewayIntentBits, EmbedBuilder,
  ActionRowBuilder, ButtonBuilder, ButtonStyle,
  ModalBuilder, TextInputBuilder, TextInputStyle,
  StringSelectMenuBuilder
} = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = '-annon';

// ====== RULES DATA (edit these texts to your server rules) ======
const RULES = {
  discord: "قوانين مهمه:\n- قواعد المدينة : يجب على جميع أعضاء العصابات اتباع القواعد العامة للمدينة، بالإضافة إلى القواعد الخاصة بالعصابة، المساهمة في تجربة لعب متفاعلة وممتعة للجميع \n- تجنّب استدراج الشرطة إلى مناطق العصابة : من الممنوع تمامًا جلب الشرطة إلى منطقة العصابة خلال مطاردة الشرطة أو لأغرض الهروب \n- التركيز على الرول بلاي بدلًا من استخدام الأسلحة \n- خلال وقتك في المدينة، نهدف إلى إنشاء مشاهد تفاعلية غامرة تساهم في تجربة اللعب الجماعي \n- حدود أعضاء العصابة : تقتصر العصابات على 15 عضوًا كحد أقصى في قائمة العصابة، وهذا الحد بهدف الحفاظ على التوازن بين العصابات \n- نشاط العصابة : خلال أنشطة العصابة، بما في ذلك المشاهد الإجرامية، يُسمح بدعوة 7 أعضاء كحد أقصى — ويُمنع التخوّل العددي على اللاعبين الآخرين — بإستثناء موضوع سيطرة المناطق لها تفاصيل موضحة \n- الالتزام بإرتداء علم العصابة ( بندانه ) : يجب على جميع أعضاء العصابة ارتداء علم ( بندانه ) العصابة خلال أنشطة العصابة \n- يجب أن تكون المركبات المستخدمة خلال مشاهد العصابة (أي أثناء نشاط العصابة) مميزة بشكل واضح للحفاظ على التفاعلية والوضوح  \n- التفاعلات المحترمة : عامل اللاعبين الآخرين، سواء كانوا أعضاء عصابات أم لا، باحترام وأدب؛ السلوك السيئ قد يستدعي الشرطة، أو المشاركة في مشاهد منخفضة المستوى محظورة بشدة، ويمكن أن يؤدي إلى توجيه مخالفات للعصابة \n- يجب تشغيل برنامج التصوير مع الصوت اثناء اللعب ( 20 دقيقة ) ",  
  important: "العداوات بين العصابات:\n- القاعدة العامة: يجب أن تكون العداوات بين العصابات حديثة ومبررة، على ألا تتجاوز مدة العداء 72 ساعة \n- الاستثناءات طويلة المدى: يجوز وجود عداوات تمتد لفترة أطول، بشرط أن تكون مبررة ومقبولة من المجتمع \n- الاحترام أثناء العداء: يجب الحفاظ على التواصل والاحترام بين اللاعبين طوال فترة العداء، حتى في ذروة الرول بلاي \n- حالة العصابات الجديدة أو المجهولة: عندما يكون طرفا العداوة مجهولي الهوية أو حديثي التأسيس، يُعد العداء وسيلة مقبولة لتحقيق التوازن في القصة. وفي هذه الحالة يجوز أن تكون النزاعات، حتى الطويلة منها، جزءًا من القصة العامة \n- مبدأ عام لا يتغير: حتى إذا تصاعد الرول بلاي إلى حرب مفتوحة بين الطرفين، يبقى الالتزام بمبادئ التواصل المحترم وقواعد الرول بلاي مطلوبًا من الجميع دون استثناء ",
  general: "ارتداء ملابس العصابة:\n- إذا كان شخص ما يرتدي ملابس عصابتك ولكنه ليس عضوًا في أي عصابة، يُرجى مناقشته بلطف لإزالة الملابس قبل التصرف بعد ذلك شجّع التواصل المحترم وتجنب المواجهات غير الضرورية \n- يمنع من العصابات أن تلبس ملابس عصابات أخرى ",
  safezones: "ملابس العصابة والرول بلاي:\n- خلال الأنشطة الإجرامية ومشاهد الرول بلاي، من الضروري أن يرتدي جميع أعضاء العصابة زيّه الخاص بشكل واضح \n- يجب أن يحتفظ أعضاء العصابة بطريقة لعب مميزة تحافظ على هوية العصابة وتميزها عن غيرها، وذلك من خلال ارتداء زي أو علامة واضحة خاصة بالعصابة بهدف تعزيز المشهد الجماعي والتفاعلي ",
  crime: "نظام السيطرة على المناطق:\n- راجع اللينك الأول والثاني جيدا مهم مهم جدا \n- نظام السيطرة على المناطق https://docs.google.com/document/d/1uWQUVJWZ8z67nlCBJuUeyHu3VV-VCh6qHeRp_LgF4EY/edit?usp=sharing \n- قوانين المناطق غير الشرعية ونظام التفاوض https://docs.google.com/document/d/1gNoS_TAe-MeuF2SxZnSNHqkzMA9dl8wxaTyeA--bYBk/edit?usp=sharing  ",
  theft: "نظام المخالفات:\n- لكل عصابة حد أقصى يبلغ 5 مخالفات \n- يمكن للعصابة أيضًا التعرّض لمخالفات إضافية داخل العصابة نفسها \n- العقوبات أو استغلال الغياب في تكرار المخالفات من قبل عضو ما يمكن أن يؤدي إلى إنهاء عضويته \n- في حال وجود عدد كبير من المخالفات، يجب الإبلاغ عن ذلك إلى إدارة العصابات لاتخاذ الإجراءات المناسبة \n- إنهاء العصابة \n- عند احتساب للعصابة لـ 5 مخالفات، تُفرض عليها إجراءات قد تشمل الإغلاق أو إعادة التأهيل تحت إشراف فريق الإدارة ويُمنح الفرصة لضبط سلوك الأعضاء وتصحيح الانحرافات عبر جلسات واحدة أو أكثر \n- يتم التواصل مع قيادة العصابة لتوضيح الإجراءات وتصحيح المسار داخل إطار العدل واللعب التشاركي "

};
// ================================================================

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// =============== TEXT COMMANDS =================
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // --- existing -annon command ---
  if (message.content.startsWith(PREFIX)) {
    const embed = new EmbedBuilder()
      .setColor(0x00BFFF)
      .setTitle('Newera Announcement')
      .setThumbnail('https://cdn.discordapp.com/attachments/1346320702772613297/1401750175978094693/avtar-ne.png')
      .setFooter({ text: 'Newera Management', iconURL: 'https://cdn.discordapp.com/attachments/1346320702772613297/1401750175978094693/avtar-ne.png' });

    const button = new ButtonBuilder()
      .setCustomId('create_announcement')
      .setLabel(' ')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('📢');

    const row = new ActionRowBuilder().addComponents(button);

    await message.channel.send({ content: '||@everyone||', embeds: [embed], components: [row] });
    return;
  }

// --- NEW: -rules command posts a dropdown ---
if (message.content.trim().toLowerCase() === '-rules') {
  const select = new StringSelectMenuBuilder()
    .setCustomId('rules_select')
    .setPlaceholder('يرجى الاختيار')
    .addOptions([
      { label: 'قوانين مهمه', value: 'discord', emoji: '📝' },
      { label: 'العداوات بين العصابات', value: 'important', emoji: '☠️' },
      { label: 'ارتداء ملابس العصابة', value: 'general', emoji: '🥼' },
      { label: 'ملابس العصابة والرول بلاي', value: 'safezones', emoji: '🚨' },
      { label: 'نظام السيطرة على المناطق', value: 'crime', emoji: '⚔️' },
      { label: 'نظام المخالفات', value: 'theft', emoji: '⛔' }
    ]);

  const row = new ActionRowBuilder().addComponents(select);

  const embed = new EmbedBuilder()
    .setTitle('NewEra RP Gangs')
    .setDescription(
      'جميع القوانين للعصابات التابعة لسيرفر New Era RP \n نرجوا منك إتباع جميع القوانين لكي لا يتم محاسبتك'
    )
    .setColor(0x00BFFF)
    .setImage('https://cdn.discordapp.com/attachments/1346320702772613297/1403936450587791562/benner_gif.gif?ex=68995d35&is=68980bb5&hm=58481452818f321ec6ea6721c8c426d6c029777d9b75c83cf209f2e4dc270451&');

  await message.channel.send({ embeds: [embed], components: [row] });
}
});

// =============== INTERACTIONS ==================
client.on('interactionCreate', async (interaction) => {
  // --- dropdown handler (ephemeral reply) ---
  if (interaction.isStringSelectMenu() && interaction.customId === 'rules_select') {
    const key = interaction.values[0];
    const text = RULES[key] ?? 'لا يوجد نص لهذه الفئة حالياً.';
    return interaction.reply({ content: text, ephemeral: true });
  }

  // --- existing button -> modal flow ---
  if (interaction.isButton() && interaction.customId === 'create_announcement') {
    const modal = new ModalBuilder()
      .setCustomId('announcement_modal')
      .setTitle('تعميم جديد');

    const titleInput = new TextInputBuilder()
      .setCustomId('announcement_title')
      .setLabel('عنوان التعميم')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const announcementInput = new TextInputBuilder()
      .setCustomId('announcement_text')
      .setLabel('نص التعميم')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const roomIdInput = new TextInputBuilder()
      .setCustomId('room_id')
      .setLabel('ايدي الروم الي تبيه')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
    const secondActionRow = new ActionRowBuilder().addComponents(announcementInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(roomIdInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
    return interaction.showModal(modal);
  }

  if (interaction.isModalSubmit() && interaction.customId === 'announcement_modal') {
    const announcementTitle = interaction.fields.getTextInputValue('announcement_title');
    const announcementText = interaction.fields.getTextInputValue('announcement_text');
    const roomId = interaction.fields.getTextInputValue('room_id');

    try {
      const channel = await client.channels.fetch(roomId);
      if (!channel) return interaction.reply({ content: 'الروم مو موجود', ephemeral: true });

      const announcementEmbed = new EmbedBuilder()
        .setColor(0x00BFFF)
        .setTitle(announcementTitle)
        .setDescription(announcementText)
        .setFooter({ text: 'Newera Management', iconURL: 'https://cdn.discordapp.com/attachments/1346320702772613297/1401750175978094693/avtar-ne.png' });

    
      await channel.send({ embeds: [announcementEmbed] });
      return interaction.reply({ content: 'تم إرسال التعميم بنجاح', ephemeral: true });
    } catch (err) {
      console.error(err);
      return interaction.reply({ content: 'حدث خطأ أثناء إرسال التعميم!', ephemeral: true });
    }
  }
});
console.log("DISCORD_TOKEN موجود:", !!process.env.DISCORD_TOKEN);
console.log("طول التوكن:", process.env.DISCORD_TOKEN?.length || 0);
client.login(process.env.DISCORD_TOKEN);



















