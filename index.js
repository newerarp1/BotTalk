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
  discord: "قوانين مهمه:\n- قواعد المدينة : يجب على جميع أعضاء العصابات اتباع القواعد العامة للمدينة، بالإضافة إلى القواعد الخاصة بالعصابة، المساهمة في تجربة لعب متفاعلة وممتعة للجميع \n- تجنّب استدراج الشرطة إلى مناطق العصابة : من الممنوع تمامًا جلب الشرطة إلى منطقة العصابة خلال مطاردة الشرطة أو لأغراض الهروب \n- التركيز على الرول بلاي بدلًا من استخدام الأسلحة \n- خلال وقتك في المدينة، نهدف إلى إنشاء مشاهد تفاعلية غامرة تساهم في تجربة اللعب الجماعي \n- حدود أعضاء العصابة : تقتصر العصابات على 15 عضوًا كحد أقصى في قائمة العصابة، وهذا الحد بهدف الحفاظ على التوازن بين العصابات \n- نشاط العصابة : خلال أنشطة العصابة، بما في ذلك المشاهد الإجرامية، يُسمح بدعوة 7 أعضاء كحد أقصى — ويُمنع التخوّل العددي على اللاعبين الآخرين \n- الالتزام بأداء علم العصابة: يجب على جميع أعضاء العصابة ارتداء علم العصابة خلال أنشطة العصابة وفقط أثناء علم العصابة  \n- يجب أن تكون المركبات المستخدمة خلال مشاهد العصابة (أي أثناء نشاط العصابة) مميزة بشكل واضح للحفاظ على التفاعلية والوضوح  \n- التفاعلات المحترمة : عامل اللاعبين الآخرين، سواء كانوا أعضاء عصابات أم لا، باحترام وأدب؛ السلوك السيئ قد يستدعي الشرطة، أو المشاركة في مشاهد منخفضة المستوى محظورة بشدة، ويمكن أن يؤدي إلى توجيه مخالفات للعصابة \n- يجب تشغيل برنامج التصوير مع الصوت اثناء اللعب ( 20د ) ",  
  important: "العداوات بين العصابات:\n- يجب أن تكون العداوات بين العصابات عمومًا حديثة ومبررة، ومدة العداء لا تتجاوز 72 ساعة، توجد استثناءات طويلة المدى عموماً، ولكن يجب أن تكون مبررة ومقبولة من المجتمع \n- من المهم الحفاظ على التواصل والاحترام داخل الرول بلاي خلال العداوات \n- ومع ذلك، يُعد هذا العداء وسيلة مقبولة لتعزيز التوازن عندما يكون طرفي العداوة مجهولي الهوية أو مؤسسين حديثًا في العصابات \n- في هذه الحالة، يُمكن أن تكون النزاعات جزءًا من القصة العامة، وقد تكون النزاعات الطويلة خيارًا، لا يُزال من المتوقع أن تحترم جميع العناصر، وذلك بلاي يؤدي إلى حرب، بمبادئ التواصل المحترم والرول بلاي ",
  general: "ارتداء ملابس العصابة:\n- إذا كان شخص ما يرتدي ملابس عصابتك ولكنه ليس عضوًا في أي عصابة، يُرجى مناقشته بلطف لإزالة الملابس قبل التصرف بعد ذلك شجّع التواصل المحترم وتجنب المواجهات غير الضرورية \n- يمنع من العصابات المعتمدة أن تلبس ملابس عصابات أخرى معتمدة ",
  safezones: "ملابس العصابة والرول بلاي:\n- خلال الأنشطة الإجرامية ومشاهد الرول بلاي، من الضروري أن يرتدي جميع أعضاء العصابة زيّه الخاص بشكل واضح \n- يجب أن يحتفظ أعضاء العصابة بطريقة لعب مميزة تحافظ على هوية العصابة وتميزها عن غيرها، وذلك من خلال ارتداء زي أو علامة واضحة خاصة بالعصابة بهدف تعزيز المشهد الجماعي والتفاعلي ",
  crime: "الحروب:\n- المشاركة في النزاعات المنظمة بين العصابات \n- يمكن أن تضيف إثارة وعمقًا لتجربة اللعب. لضمان أن الحروب تتم بطريقة عادلة ومنظمة، يجب تطبيق القواعد التالية: \n- السبب الواضح للحرب: \n- لبدء حرب، يجب أن يكون هناك قصة قوية توفر دوافع واضحة بين عصابتين مختلفتين \n- يجب أن يكون هناك تواصل واتفاق على هذه الرواية بين قادة العصابتين \n- إعلان الحرب \n- يجب أن يتم قبول إعلان الحرب رسميًا من مسؤول العصابات داخل الرول وتدوينها في الديسكورد من قبل المسؤول بكافة التفاصيل \n- اتفاق القادة \n- يجب على قادة العصابتين المعنيتين التوصل إلى اتفاق مشترك حول شروط وأحكام الحرب، بما في ذلك توقيت محدد لبدايتها \n- توقيت محدد للحرب \n- يجب أن يكون لكل حرب وقت بداية ووقت انتهاء محددين \n- يجب أن يتم التواصل والاتفاق على هذه الأوقات بين الأطراف المعنية في حال الاختلاف في ذلك يحدد مسؤول العصابات الوقت المناسب \n- الرهن في الحرب \n- كجزء من اتفاق الحرب، يمكن أن يكون الرهن متفق عليه ووضع رهَن معيّن \n- يمكن أن يكون الرهن على شكل مصلحة داخل اللعبة، ممتلكات أو شروط متفق عليها أخرى. يجب توضيح تفاصيل الرهن في شروط القتال وتقبلها من قبل جميع الأطراف \n- تدخل إدارة العصابات \n- في الحالات التي تستمر فيها النزاعات المستمرة بين عصابتين، ولا يتم قبول أو إعلان الحرب رسميًا، تحتفظ إدارة العصابات بالحق في التدخل، بما في ذلك إنهاء النزاع أو فرض طريقة تدخل أو إصلاح النزاعات بطريقة منظمة \n- حدود الحرب \n- يمكن للعصابة أن تخوض حربًا واحدة فقط في وقت واحد \n- قد يؤدي كسر هذه القاعدة إلى حرمان العصابة أو كسر القواعد المحددة في قوانين اللعبة أو القوانين العامة للحروب \n- احترام الشروط المتفق عليها \n- يجب على جميع الأطراف الالتزام التام بالشروط المتفق عليها مسبقًا \n- التصرف بحرفية وروح التزام أثناء النزاع يعزز تجربة اللعب ويضمن العدالة ",
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
      { label: 'الحروب', value: 'crime', emoji: '⚔️' },
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



















