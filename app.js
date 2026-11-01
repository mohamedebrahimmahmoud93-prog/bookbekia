if (window.top !== window.self) { try { window.top.location = window.self.location.href; } catch (e) { document.documentElement.style.display = "none"; } }
// رقم الواتساب بالصيغة الدولية بدون + (مثال: 201001234567) · WhatsApp number in international format, no +
let WHATSAPP = "201224516429";

const CATS={
 baby:{c:"#fde1ec",ic:"star_y2",pics:["g/sedra_88_1","g/sedra_88_2","sedra_88"]},
 deen:{c:"#ffd52c",ic:"star_y",pics:["sedra_33","sedra_34","sedra_58"]},
 stories:{c:"#f7a8c4",ic:"girl",pics:["sedra_37","sedra_41","sedra_36"]},
 seerah:{c:"#f7a21b",ic:"rocket2",pics:["sedra_55","sedra_95","sedra_54"]},
 teen:{c:"#c7cdf0",ic:"ruler_blue",pics:["sedra_92","sedra_90","sedra_91"]},
 parent:{c:"#3fe3df",ic:"bulb",pics:["sedra_45","sedra_51","sedra_32"]},
 family:{c:"#86c440",ic:"magnifier",pics:["sedra_98","sedra_89","sedra_99"]}
};
const PUBS={sedra:{ar:"دار سدرة",en:"Sedra Publishing"}};
const el=n=>`assets/el/${n}.png`;
const AGES=[["1","1–3","#fde1ec","star_y2"],["3","3–6","#fff3bf","ruler_pink"],["6","6–9","#d9f8f7","bulb2"],["9","9–12","#efe4f8","rocket2"],["12","12+","#e3f2d3","magnifier"],["p","","#fde1ec","star_y"]];

// [id, العنوان, الوصف, القسم, السعر, السن, وسم, نفدت؟] — كل الكتب جديدة من دار سدرة (الأسعار من موقع الدار)
const RAW=[
["sedra_38","درر الدين: 3 كتيبات","العقيدة والآداب والأذكار في بوكس واحد · 25 درة في كل كتيب","deen",220,"6","مجموعة"],
["sedra_33","درر الدين: كتاب العقيدة","25 من أسس العقيدة بأسلوب بسيط للأطفال · 28 صفحة كوشيه","deen",80,"6"],
["sedra_34","درر الدين: كتاب الآداب","25 من الآداب الإسلامية اليومية · 28 صفحة كوشيه","deen",80,"6"],
["sedra_35","درر الدين: كتاب الأذكار","25 من الأذكار المهمة للطفل · 28 صفحة كوشيه","deen",80,"6"],
["sedra_88","في بيتنا مسلم صغير","بوكس يجمع ما يحتاجه الطفل لتعلم دينه · كتيبات 16×16 ورق مقوى · إسراء ممدوح","baby",300,"1","بوكس"],
["sedra_58","حلية الصغير","39 أدبًا وسلوكًا إسلاميًا · 44 صفحة · أحمد الجوهري عبد الجواد","deen",60,"6"],
["sedra_36","جمانة ورمانة","قصة عن حب الحجاب والتعلق به · 24 صفحة 22×22","stories",80,"3"],
["sedra_37","كلمة السر عزوز","قصة عن حسن الخلق والسيطرة على الغضب · 24 صفحة","stories",80,"3"],
["sedra_39","لن أتردد لن أحتار، عرفت الآن كيف أختار","قصة عن الاستخارة والاستشارة · 24 صفحة","stories",80,"3"],
["sedra_40","قليل لن يضر.. أم طعمه مر؟","قصة عن تحري الحلال · 24 صفحة","stories",80,"3"],
["sedra_41","سر سلسبيل","قصة عن حسن الظن بالله · 24 صفحة","stories",80,"3"],
["sedra_43","حكايات نور ومؤذن","حكايات عن الوضوء والصلاة · 80 صفحة 16×24","stories",150,"6"],
["sedra_54","أنا النبي لا كذب","السيرة النبوية للأطفال · 180 صفحة مقاس كبير 21×30","seerah",300,"6"],
["sedra_95","أبطال العهد النبوي","سيرة الصحابة الكرام من 3 سنين · 178 صفحة · هبة شلبي","seerah",330,"3","جديد"],
["sedra_55","بطل في جيش محمد ﷺ","31 قصة عن أبطال الصحابة · 148 صفحة مقاس كبير · صفية جمعة","seerah",270,"9"],
["sedra_90","سلسلة البوصلة كاملة","اختر من تكون + حين تقترب · كتابين A5 · محمد حشمت","teen",300,"12","مجموعة"],
["sedra_91","اختر من تكون (البوصلة 1)","بناء شخصية اليافع في ضوء القرآن · محمد حشمت","teen",180,"12"],
["sedra_92","حين تقترب (البوصلة 2)","رحلة لاكتشاف ما تفعله العبادة في داخلك · محمد حشمت","teen",160,"12"],
["sedra_32","التربية بالوحيين: الجزء الأول","مدخل عام للتربية بالوحيين وتربية الطفولة الأولى حتى 3 سنين · 728 صفحة هارد","parent",350,"p"],
["sedra_45","ربيهم بآية وحديث","تعديل السلوك بكلام الله ورسوله · 304 صفحة هارد · أسماء محمد لبيب","parent",250,"p"],
["sedra_42","المباح من الكلام","التربية العفيفة في الإسلام لكل المراحل · 340 صفحة هارد","parent",250,"p"],
["sedra_51","غَرْسي ج1","غرس الإيمان من الميلاد وحتى المشيب · 670 صفحة هارد","parent",330,"p"],
["sedra_52","الأسئلة العقائدية (غرسي ج2)","إجابات أسئلة الأطفال عن الله تعالى وأركان الإيمان · 424 صفحة هارد","parent",300,"p"],
["sedra_57","لا خوف (غرسي ج3)","كتاب تربوي تحليلي عن الجن والشياطين · 364 صفحة","parent",250,"p"],
["sedra_53","العيال والمذاكرة","إدارة المذاكرة في ضوء الوحيين لكل المراحل · 428 صفحة","parent",280,"p","نفدت حاليًا",1],
["sedra_100","بيوت تتكلم + تحت أجنحتهن","كتابان وغاية واحدة · محمد حشمت","family",330,"p","مجموعة"],
["sedra_98","بيوت تتكلم","رؤية تربوية لبيوت قرآنية · 200 صفحة A5 · محمد حشمت","family",180,"p","جديد"],
["sedra_99","تحت أجنحتهن","رؤية قرآنية لفهم الطفل والبيت وبناء الإنسان · 232 صفحة A5 · محمد حشمت","family",180,"p","جديد"],
["sedra_96","دفء النبوة","جلسات أسرية عملية لغرس الأخلاق النبوية · 256 صفحة · يمنى عزت","family",180,"p"],
["sedra_89","بيت المودة","رسائل لبناء بيت مطمئن · 176 صفحة 17×24 · منى نور","family",250,"p"]
];
// English titles, descriptions and tags: id -> [title, description, tag]
const EN={
"sedra_38":["Durar Al-Deen: 3 booklets","Creed, manners and daily remembrance in one box · 25 lessons each","Set"],
"sedra_33":["Durar Al-Deen: Creed","25 foundations of belief in simple words · 28 glossy pages",""],
"sedra_34":["Durar Al-Deen: Manners","25 everyday Islamic manners · 28 glossy pages",""],
"sedra_35":["Durar Al-Deen: Remembrance","25 key adhkar for children · 28 glossy pages",""],
"sedra_88":["A Little Muslim in Our Home","A box with what a child needs to learn their faith · 16×16 board booklets · Esraa Mamdouh","Box"],
"sedra_58":["Hilyat Al-Sagheer","39 Islamic manners and behaviors · 44 pages · Ahmed Al-Gohary",""],
"sedra_36":["Jumana and Rummana","A story about loving the hijab · 24 pages, 22×22",""],
"sedra_37":["The Password Is Azzouz","A story about good manners and controlling anger · 24 pages",""],
"sedra_39":["I Won't Hesitate, Now I Know How to Choose","A story about istikhara and asking for advice · 24 pages",""],
"sedra_40":["Just a Little Won't Hurt?","A story about seeking what is halal · 24 pages",""],
"sedra_41":["Salsabeel's Secret","A story about thinking well of Allah · 24 pages",""],
"sedra_43":["Tales of Noor and Mu'adhin","Stories about wudu and prayer · 80 pages, 16×24",""],
"sedra_54":["I Am the Prophet, No Lie","The Prophet's biography for children · 180 pages, large 21×30",""],
"sedra_95":["Heroes of the Prophet's Era","Lives of the noble Companions, ages 3+ · 178 pages · Heba Shalaby","New"],
"sedra_55":["A Hero in Muhammad's ﷺ Army","31 stories of the Companions' heroes · 148 pages, large · Safeya Gomaa",""],
"sedra_90":["The Compass series (complete)","Choose Who You Are + When You Draw Near · 2 A5 books · Mohamed Heshmat","Set"],
"sedra_91":["Choose Who You Are (Compass 1)","Building a teen's character in the light of the Quran · Mohamed Heshmat",""],
"sedra_92":["When You Draw Near (Compass 2)","A journey into what worship does inside you · Mohamed Heshmat",""],
"sedra_32":["Parenting by Revelation, Part 1","An introduction to parenting by Quran and Sunnah, from conception to age 3 · 728 pages, hardcover",""],
"sedra_45":["Raise Them with a Verse and a Hadith","Shaping behavior with the words of Allah and His Messenger · 304 pages, hardcover · Asmaa Labib",""],
"sedra_42":["Al-Mubah Min Al-Kalam","Modest education in Islam for every stage · 340 pages, hardcover",""],
"sedra_51":["Ghars, Part 1","Planting faith from birth to old age · 670 pages, hardcover",""],
"sedra_52":["Questions of Faith (Ghars, Part 2)","Answering children's questions about Allah and the pillars of faith · 424 pages, hardcover",""],
"sedra_57":["No Fear (Ghars, Part 3)","An analytical parenting book about jinn and devils · 364 pages",""],
"sedra_53":["Kids and Studying","Managing study time in the light of revelation, all stages · 428 pages","Out of stock"],
"sedra_100":["Houses That Speak + Under Their Wings","Two books, one goal · Mohamed Heshmat","Set"],
"sedra_98":["Houses That Speak","A parenting vision for Quranic homes · 200 pages, A5 · Mohamed Heshmat","New"],
"sedra_99":["Under Their Wings","A Quranic view of the child, the home and building people · 232 pages, A5 · Mohamed Heshmat","New"],
"sedra_96":["The Warmth of Prophethood","Practical family sessions for prophetic manners · 256 pages · Yomna Ezzat",""],
"sedra_89":["Home of Affection","Letters for building a peaceful home · 176 pages, 17×24 · Mona Nour",""]
};
// صور إضافية لكل كتاب (صفحات من جوه وصور الكتاب) من موقع دار سدرة
const GAL={"sedra_32":["g/sedra_32_1","g/sedra_32_2","g/sedra_32_3","g/sedra_32_4","g/sedra_32_5","g/sedra_32_6"],"sedra_33":["g/sedra_33_1"],"sedra_34":["g/sedra_34_1"],"sedra_35":["g/sedra_35_1"],"sedra_36":["g/sedra_36_1","g/sedra_36_2","g/sedra_36_3"],"sedra_37":["g/sedra_37_1","g/sedra_37_2","g/sedra_37_3"],"sedra_38":["g/sedra_38_1","g/sedra_38_2","g/sedra_38_3","g/sedra_38_4","g/sedra_38_5","g/sedra_38_6"],"sedra_39":["g/sedra_39_1","g/sedra_39_2","g/sedra_39_3"],"sedra_40":["g/sedra_40_1","g/sedra_40_2","g/sedra_40_3"],"sedra_41":["g/sedra_41_1","g/sedra_41_2","g/sedra_41_3"],"sedra_42":["g/sedra_42_1","g/sedra_42_2","g/sedra_42_3","g/sedra_42_4","g/sedra_42_5","g/sedra_42_6"],"sedra_43":["g/sedra_43_1","g/sedra_43_2","g/sedra_43_3","g/sedra_43_4","g/sedra_43_5","g/sedra_43_6"],"sedra_45":["g/sedra_45_1","g/sedra_45_2","g/sedra_45_3","g/sedra_45_4","g/sedra_45_5","g/sedra_45_6"],"sedra_51":["g/sedra_51_1","g/sedra_51_2","g/sedra_51_3","g/sedra_51_4","g/sedra_51_5","g/sedra_51_6"],"sedra_52":["g/sedra_52_1","g/sedra_52_2","g/sedra_52_3","g/sedra_52_4","g/sedra_52_5","g/sedra_52_6"],"sedra_53":["g/sedra_53_1","g/sedra_53_2","g/sedra_53_3","g/sedra_53_4","g/sedra_53_5","g/sedra_53_6"],"sedra_54":["g/sedra_54_1","g/sedra_54_2","g/sedra_54_3","g/sedra_54_4","g/sedra_54_5","g/sedra_54_6"],"sedra_55":["g/sedra_55_1","g/sedra_55_2","g/sedra_55_3","g/sedra_55_4","g/sedra_55_5","g/sedra_55_6"],"sedra_57":["g/sedra_57_1","g/sedra_57_2","g/sedra_57_3","g/sedra_57_4","g/sedra_57_5","g/sedra_57_6"],"sedra_58":["g/sedra_58_1","g/sedra_58_2","g/sedra_58_3","g/sedra_58_4","g/sedra_58_5","g/sedra_58_6"],"sedra_88":["g/sedra_88_1","g/sedra_88_2","g/sedra_88_3","g/sedra_88_4","g/sedra_88_5","g/sedra_88_6"],"sedra_89":["g/sedra_89_1","g/sedra_89_2","g/sedra_89_3","g/sedra_89_4","g/sedra_89_5","g/sedra_89_6"],"sedra_90":["g/sedra_90_1","g/sedra_90_2","g/sedra_90_3","g/sedra_90_4","g/sedra_90_5","g/sedra_90_6"],"sedra_91":["g/sedra_91_1","g/sedra_91_2","g/sedra_91_3","g/sedra_91_4","g/sedra_91_5","g/sedra_91_6"],"sedra_92":["g/sedra_92_1","g/sedra_92_2","g/sedra_92_3","g/sedra_92_4","g/sedra_92_5","g/sedra_92_6"],"sedra_95":["g/sedra_95_1","g/sedra_95_2","g/sedra_95_3","g/sedra_95_4","g/sedra_95_5","g/sedra_95_6"],"sedra_96":["g/sedra_96_1","g/sedra_96_2","g/sedra_96_3","g/sedra_96_4","g/sedra_96_5","g/sedra_96_6"],"sedra_98":["g/sedra_98_1","g/sedra_98_2","g/sedra_98_3","g/sedra_98_4","g/sedra_98_5","g/sedra_98_6"],"sedra_99":["g/sedra_99_1","g/sedra_99_2","g/sedra_99_3","g/sedra_99_4","g/sedra_99_5","g/sedra_99_6"],"sedra_100":["sedra_98","sedra_99","g/sedra_98_1","g/sedra_98_2","g/sedra_99_1","g/sedra_99_2"]};
let BOOKS=RAW.map(([id,t,s,cat,price,age,tag,oos])=>({id,t,s,cat,price,age,tag,oos:!!oos,pub:"sedra",g:GAL[id]||[]}));
const IMGMAP={};
const img=id=>IMGMAP[id]||(id.startsWith("books/")?id:`books/${id}.webp`);

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=n=>Number(n).toLocaleString("en-US");
const ageName=a=>AGES.find(x=>x[0]===a)?.[1]||"";
const ageChip=a=>a==="p"?L().parents:`<span dir="ltr">${ageName(a)}</span> ${L().years}`;
const PAGE=12;
let cat="all", age="all", pub="all", query="", shown=PAGE, cart={}, lookId=null;
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
cart=store.get("bb_cart3",{})||{};
const root=document.documentElement;

/* ---------- languages ---------- */
const T={
 ar:{menu:"القائمة",siteMenu:"قائمة الموقع",closeMenu:"إغلاق القائمة",home:"الرئيسية",byAge:"حسب سن طفلك",byCat:"حسب القسم",cats:"الأقسام",allBooks:"كل الكتب",orderH:"الطلب",cart:"السلة",howLink:"إزاي تطلبي",reviews:"آراء الماميز",contact:"تواصلي معانا",settings:"الإعدادات",dark:"الوضع الليلي",calm:"حركة هادية",focus:"وضع التركيز",langName:"English",switchLang:"Switch to English",themeBtn:"تبديل الوضع الليلي",
  search:"دوّري على كتاب",searchPh:"دوّري على كتاب… سيرة، آداب، صلاة",
  heroH:'كل كتاب <span class="y">مغامرة</span><br>وكل طفل <span class="t">بطل الحكاية</span>',
  heroP:"كتب أطفال جديدة من دار سدرة، توصلك لحد البيت من إسكندرية: أساسيات الدين، قصص القيم، السيرة، اليافعين، وكتب تربوية للآباء. اختاري بالسن أو بالقسم، أو سيبينا نفاجئك.",
  surprise:"فاجئيني بكتاب",logoAlt:"لوجو بوك بيكيا: بنت طايرة بكتاب مفتوح وحواليها صواريخ ولمبات ونجوم",
  agesH:"عمر طفلك كام؟",agesP:"اختاري سن واحد، وهنوريكي الكتب المناسبة بس",catsH:"أو اختاري قسم",catsP:"كل قسم فيه الأغلفة الأصلية للكتب",booksH:"الكتب",
  realNote:"كل الكتب جديدة من الناشر، والأسعار هي سعر الدار.",more:"اعرضي 12 كتاب كمان",
  howH:"الطلب في 3 خطوات",s1:"ضيفي للسلة",s1p:"كل كتاب عليه سعره.",s2:"اكتبي بياناتك",s2p:"الاسم والموبايل والعنوان.",s3:"ابعتي على واتساب",s3p:"ونأكدلك التوافر والشحن والدفع.",
  sdNav:"دار سدرة",sdBadge:"بوك بيكيا موزع دار سدرة في إسكندرية",sdH:"إصدارات دار سدرة",sdP:"كتب جديدة للأطفال واليافعين والآباء: أساسيات الدين، قصص القيم، السيرة والصحابة، وكتب تربوية. كلها من الدار مباشرة وبسعر الدار.",sdTitles:"عنوان",sdAges:"من سن 3 لحد الآباء",sdNew:"جديد",sdNewP:"من الناشر مباشرة",sdAll:"شوفي كل إصدارات سدرة",parents:"للآباء",waChat:"كلمينا على واتساب",callUs:"اتصلي بينا",waHello:"السلام عليكم، عايزة أسأل عن كتب بوك بيكيا",rvP:"سكرين شوتس حقيقية من جروب وصفحة بوك بيكيا على فيسبوك. دوسي على أي واحدة تكبر.",rvOpen:"كبّري الصورة",rvSrc:{grp:"بوست في جروب بوك بيكيا",page:"توصية على صفحة بوك بيكيا",cmt:"تعليق على صفحة بوك بيكيا"},rvAlt:["بوست: وصلنا الحمد لله اوردر من أحب الأوردرات… التعامل راقي، الأسعار حلوة، والتغليف متقن والبوك مارك تحفة","توصية: الكتب أكتر من رائعة وبلاقي دايمًا كنوز من الكتب عند علياء","بوست: يا لولو تعبتك معايا أوي، شكرًا لذوقك، مع صورة الكتب","تعليق: أحلى بوك بيكيا، عقبال سنين كتير في نجاح وتوفيق","بوست: هديتنا وصلت… الجودة والحجم مكنتش متوقعاهم بالسعر ده، وشكرًا على التغليف والبوك مارك"],oos:"نفدت حاليًا",morePics:n=>n==1?"+1 صورة":n==2?"+2 صورتين":`+${n} صور`,prevPic:"الصورة اللي قبلها",nextPic:"الصورة اللي بعدها",gallery:"صور الكتاب",pic:"صورة",galNote:"صور الكتاب وصفحات من جوّه، من دار سدرة",pubOf:"من",
  footLine:"إسكندرية · شحن لكل المحافظات · موزع دار سدرة",whatsapp:"واتساب",insta:"انستجرام",soon:"قريبًا",
  bookDetails:"تفاصيل الكتاب",yourCart:"سلتك",close:"إغلاق",
  cur:"ج",years:"سنين",booksN:"كتاب",all:"الكل",lookingFor:"بتدوري على:",allBooksNone:"كل الكتب",clearAll:"امسحي الكل",
  askPrice:"نأكد السعر",askPriceLong:"بنأكدلك السعر على واتساب",add:"أضيفي",addLong:"أضيفي للسلة",inCart:"في السلة ✓",see:"شوفي",another:"كتاب تاني",
  empty:"مفيش كتب كده. جرّبي سن تاني أو امسحي الاختيارات.",showing:(a,b)=>`بنعرض ${a} من ${b} كتاب`,
  step1:"خطوة 1 من 3: راجعي الكتب",step2:"خطوة 2 من 3: بياناتك",step3:"خطوة 3 من 3: ابعتي الطلب",
  cartEmpty:"السلة فاضية. اختاري كتاب يفرّح طفلك.",total:"الإجمالي",priceOnConfirm:"السعر عند التأكيد",plusAsk:n=>` + ${n} بسعر عند التأكيد`,shipNote:"الشحن حسب المحافظة. كل الكتب جديدة.",remove:"شيلي",
  fName:"الاسم",fPhone:"الموبايل",fGov:"المحافظة",fAge:"سن الطفل",fAgePh:"مثلاً 5 سنين",fAddr:"العنوان",prepare:"جهّزي رسالة الطلب",
  govs:["الإسكندرية","القاهرة","الجيزة","البحيرة","الغربية","الدقهلية","محافظة تانية"],
  sendWa:"ابعتي الطلب على واتساب",copy:"انسخي الرسالة",copied:"الرسالة اتنسخت",selected:"الرسالة متحددة، انسخيها",
  waFallback:n=>`لو واتساب مفتحش، انسخي الرسالة وابعتيها${n?` للرقم +${n}`:" لينا على الخاص"}.`,missing:"كمّلي الاسم والموبايل والعنوان",
  added:"اتضاف للسلة ⭐",removed:"اتشال من السلة",calmOn:"الحركة بقت هادية",calmOff:"الحركة رجعت",focusOn:"وضع التركيز اشتغل",focusOff:"وضع التركيز اتقفل",darkOn:"الوضع الليلي اشتغل",darkOff:"الوضع الفاتح اشتغل",
  msgHead:"طلب جديد من موقع بوك بيكيا",msgTotal:"الإجمالي",msgAsk:n=>` + ${n} كتاب بسعر عند التأكيد`,msgAskOne:"اسأل عن السعر",
  cat:{baby:"بيبي",deen:"أساسيات الدين",stories:"قصص القيم",seerah:"السيرة والصحابة",teen:"يافعين",parent:"تربية للآباء",family:"البيت والأسرة"},
  ageSub:{"1":"بيبي","3":"حضانة وKG","6":"ابتدائي صغير","9":"بيحب يعرف","12":"يافعين","p":"كتب تربوية"}},
 en:{menu:"Menu",siteMenu:"Site menu",closeMenu:"Close menu",home:"Home",byAge:"By your child's age",byCat:"By category",cats:"Categories",allBooks:"All books",orderH:"Ordering",cart:"Cart",howLink:"How to order",reviews:"What moms say",contact:"Contact us",settings:"Settings",dark:"Dark mode",calm:"Calm motion",focus:"Focus mode",langName:"عربي",switchLang:"التحويل للعربي",themeBtn:"Toggle dark mode",
  search:"Search for a book",searchPh:"Search… seerah, manners, prayer",
  heroH:'Every book is an <span class="y">adventure</span><br>every child the <span class="t">hero</span>',
  heroP:"New children's books from Sedra Publishing, delivered from Alexandria: Islamic basics, value stories, the Prophet's life, teens, and parenting books. Pick by age or category, or let us surprise you.",
  surprise:"Surprise me",logoAlt:"Book Bekia logo: a girl flying on an open book with rockets, light bulbs and stars around her",
  agesH:"How old is your child?",agesP:"Pick one age and we'll show only the books that fit",catsH:"Or pick a category",catsP:"Every category shows the original covers",booksH:"Books",
  realNote:"Every book is new from the publisher, at the publisher's price.",more:"Show 12 more books",
  howH:"Order in 3 steps",s1:"Add to cart",s1p:"Every book shows its price.",s2:"Add your details",s2p:"Name, phone and address.",s3:"Send on WhatsApp",s3p:"We confirm availability, shipping and payment.",
  sdNav:"Sedra Publishing",sdBadge:"Book Bekia distributes Sedra Publishing in Alexandria",sdH:"Sedra Publishing titles",sdP:"New books for children, teens and parents: Islamic basics, value stories, the Prophet's life and Companions, and parenting books. Straight from the publisher, at the publisher's price.",sdTitles:"titles",sdAges:"from age 3 up to parents",sdNew:"New",sdNewP:"straight from the publisher",sdAll:"See all Sedra titles",parents:"Parents",waChat:"Chat with us on WhatsApp",callUs:"Call us",waHello:"Hello, I'd like to ask about Book Bekia books",rvP:"Real screenshots from the Book Bekia Facebook group and page. Tap any one to enlarge.",rvOpen:"Enlarge screenshot",rvSrc:{grp:"Post in the Book Bekia group",page:"Recommendation on the Book Bekia page",cmt:"Comment on the Book Bekia page"},rvAlt:["Post: our order arrived, one of our favorite orders… lovely service, great prices, neat packaging and a beautiful bookmark","Recommendation: the books are more than wonderful, I always find treasures at Aliaa's","Post: thank you for your effort and taste, with a photo of the books","Comment: the best Book Bekia, wishing you many more years of success","Post: our gift arrived… I didn't expect this quality and size for the price, thank you for the packaging and bookmark"],oos:"Out of stock",morePics:n=>n==1?"+1 photo":`+${n} photos`,prevPic:"Previous photo",nextPic:"Next photo",gallery:"Book photos",pic:"Photo",galNote:"Book photos and inside pages, from Sedra Publishing",pubOf:"by",
  footLine:"Alexandria · shipping to all governorates · Sedra Publishing distributor",whatsapp:"WhatsApp",insta:"Instagram",soon:"coming soon",
  bookDetails:"Book details",yourCart:"Your cart",close:"Close",
  cur:"EGP",years:"years",booksN:"books",all:"All",lookingFor:"Showing:",allBooksNone:"All books",clearAll:"Clear all",
  askPrice:"Price on request",askPriceLong:"We'll confirm the price on WhatsApp",add:"Add",addLong:"Add to cart",inCart:"In cart ✓",see:"View",another:"Another book",
  empty:"No books match. Try another age or clear the filters.",showing:(a,b)=>`Showing ${a} of ${b} books`,
  step1:"Step 1 of 3: review your books",step2:"Step 2 of 3: your details",step3:"Step 3 of 3: send the order",
  cartEmpty:"Your cart is empty. Pick a book your child will love.",total:"Total",priceOnConfirm:"Price on confirmation",plusAsk:n=>` + ${n} priced on confirmation`,shipNote:"Shipping depends on the governorate. All books are new.",remove:"Remove",
  fName:"Name",fPhone:"Phone",fGov:"Governorate",fAge:"Child's age",fAgePh:"e.g. 5 years",fAddr:"Address",prepare:"Prepare order message",
  govs:["Alexandria","Cairo","Giza","Beheira","Gharbia","Dakahlia","Other"],
  sendWa:"Send order on WhatsApp",copy:"Copy message",copied:"Message copied",selected:"Message selected, copy it",
  waFallback:n=>`If WhatsApp doesn't open, copy the message and send it${n?` to +${n}`:" to us in a private message"}.`,missing:"Please fill in name, phone and address",
  added:"Added to cart ⭐",removed:"Removed from cart",calmOn:"Calm motion on",calmOff:"Motion back on",focusOn:"Focus mode on",focusOff:"Focus mode off",darkOn:"Dark mode on",darkOff:"Light mode on",
  msgHead:"New order from the Book Bekia website",msgTotal:"Total",msgAsk:n=>` + ${n} book(s) priced on confirmation`,msgAskOne:"price on request",
  cat:{baby:"Baby",deen:"Islamic basics",stories:"Value stories",seerah:"Seerah & Companions",teen:"Teens",parent:"Parenting",family:"Home & family"},
  ageSub:{"1":"Baby","3":"Nursery & KG","6":"Early primary","9":"Curious minds","12":"Teens","p":"Parenting books"}}
};
let LANG=store.get("bb_lang","ar"); if(!T[LANG])LANG="ar";
const L=()=>T[LANG];
const bt=b=>LANG==="en"?(EN[b.id]?.[0]||b.t):b.t;
const bs=b=>LANG==="en"?(EN[b.id]?.[1]||b.s):b.s;
const btag=b=>LANG==="en"?(EN[b.id]?.[2]||""):(b.tag||"");
const catName=k=>L().cat[k];
function applyLang(){
  const app=$("#app"); const dir=LANG==="ar"?"rtl":"ltr";
  app.setAttribute("dir",dir); app.setAttribute("lang",LANG); root.setAttribute("lang",LANG); root.setAttribute("dir",dir);
  document.querySelectorAll("[data-i18n]").forEach(n=>{const v=L()[n.dataset.i18n]; if(typeof v==="string") n.innerHTML=v;});
  document.querySelectorAll("[data-i18n-ph]").forEach(n=>n.setAttribute("placeholder",L()[n.dataset.i18nPh]));
  document.querySelectorAll("[data-i18n-aria]").forEach(n=>n.setAttribute("aria-label",L()[n.dataset.i18nAria]));
  document.title=LANG==="ar"?"بوك بيكيا · كتب أطفال تفاعلية":"Book Bekia · Interactive Children's Books";
  $("#waShown").textContent=WHATSAPP?fmtWa(WHATSAPP):L().soon; if(WHATSAPP){$("#waFloat").href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(L().waHello);$("#waFoot").href="tel:+"+WHATSAPP;}else{$("#waFoot").removeAttribute("href");$("#waFloat").removeAttribute("href");} $("#waFloat").hidden=!WHATSAPP; $("#waFoot").title=WHATSAPP?L().callUs+" "+fmtWa(WHATSAPP):"";
  renderCats(); rerender(); renderCart(); if(!$("#modal").hidden&&lookId) openLook(lookId,false);
}
function switchLang(){LANG=LANG==="ar"?"en":"ar";store.set("bb_lang",LANG);applyLang();}
$("#tLang").onclick=switchLang; $("#tLang2").onclick=()=>{switchLang();closeSide();};

/* ---------- dark mode ---------- */
let theme=store.get("bb_theme",null); // null = follow the device
const sysDark=()=>window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches;
const isDark=()=>theme?theme==="dark":sysDark();
function applyTheme(){ root.dataset.theme=isDark()?"dark":"light"; $("#tDark").setAttribute("aria-pressed",isDark()); }
function toggleTheme(){theme=isDark()?"light":"dark";store.set("bb_theme",theme);applyTheme();toast(isDark()?L().darkOn:L().darkOff);}
$("#tTheme").onclick=toggleTheme; $("#tDark").onclick=toggleTheme;
if(window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change",()=>{if(!theme)applyTheme();});
applyTheme();

/* ---------- calm motion + focus ---------- */
const prm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
let calm=store.get("bb_calm",prm), focusMode=store.get("bb_focus",false);
function applyPrefs(){ if(calm)root.dataset.motion="calm"; else delete root.dataset.motion; if(focusMode)root.dataset.focus=""; else delete root.dataset.focus;
  $("#tMotion").setAttribute("aria-pressed",calm); $("#tFocus").setAttribute("aria-pressed",focusMode); }
$("#tMotion").onclick=()=>{calm=!calm;store.set("bb_calm",calm);applyPrefs();toast(calm?L().calmOn:L().calmOff);};
$("#tFocus").onclick=()=>{focusMode=!focusMode;store.set("bb_focus",focusMode);applyPrefs();toast(focusMode?L().focusOn:L().focusOff);};
applyPrefs();

/* ---------- render ---------- */
function renderAges(){
  $("#ageRow").innerHTML=AGES.map(([k,lbl,c,ic])=>`<button class="age" type="button" data-age="${k}" aria-pressed="${age===k}">
    <span class="dot" style="background:${c}"><img src="${el(ic)}" alt=""></span><b dir="${k==="p"?"auto":"ltr"}">${k==="p"?L().parents:lbl}</b><span>${L().ageSub[k]}</span></button>`).join("");
}
function renderCats(){
  $("#sideCats").innerHTML=Object.entries(CATS).map(([k,c])=>`<a href="#books" data-go="${k}"><span class="ic"><img src="${el(c.ic)}" alt=""${c.ic==="girl"?' style="border-radius:50%"':''}></span>${catName(k)}<span class="cnt">${num(BOOKS.filter(b=>b.cat===k).length)}</span></a>`).join("");
  $("#sideAll").textContent=num(BOOKS.length);
  $("#catGrid").innerHTML=Object.entries(CATS).map(([k,c])=>`<button class="cat" type="button" data-go="${k}" style="--c:${c.c}">
    <span class="icon"><img src="${el(c.ic)}" alt=""${c.ic==="girl"?' style="border-radius:50%;max-width:56px;max-height:56px"':''}></span>
    <span class="fan">${c.pics.map(p=>`<img src="${img(p)}" alt="" loading="lazy" width="440" height="560">`).join("")}</span>
    <span class="cap"><b>${catName(k)}</b><small>${num(BOOKS.filter(b=>b.cat===k).length)} ${L().booksN}</small></span></button>`).join("");
}
function renderSedra(){
  const list=BOOKS.filter(b=>b.pub==="sedra"); $("#sdN").textContent=num(list.length);
  const pick=["sedra_95","sedra_54","sedra_88","sedra_92","sedra_37","sedra_98"].map(id=>list.find(b=>b.id===id)).filter(Boolean);
  $("#sdStrip").innerHTML=pick.map(b=>`<button class="sd-b" type="button" data-look="${b.id}" aria-label="${L().see}: ${esc(bt(b))}"><img src="${img(b.id)}" alt="" loading="lazy" width="560" height="560"></button>`).join("");
}
// سكرين شوتس حقيقية من جروب وصفحة بوك بيكيا على فيسبوك (الأسامي والصور متغطية)
const RVS=[["rv1",911,302,"grp"],["rv4",844,180,"page"],["rv3",888,518,"grp"],["rv5",704,96,"cmt"],["rv2",911,347,"grp"]];
function renderReviews(){
  const one=RVS.map(([f,w,h,src],i)=>`<figure class="shot"><button type="button" class="shot-b" data-shot="${f}" aria-label="${L().rvOpen}"><img src="assets/rv/${f}.webp" width="${w}" height="${h}" alt="${esc(L().rvAlt[i])}" loading="lazy"></button>
      <figcaption><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8z"/></svg>${L().rvSrc[src]}</figcaption></figure>`).join("");
  $("#rvTrack").innerHTML=`<div class="mq-set">${one}</div><div class="mq-set" aria-hidden="true">${one}</div>`;
  $("#rvMarquee").setAttribute("aria-label",L().reviews);
}
function openShot(f){ const r=RVS.find(x=>x[0]===f); if(!r)return; $("#shotBox").innerHTML=`<button class="x" type="button" data-shotclose aria-label="${L().close}">×</button><img src="assets/rv/${f}.webp" alt="${esc(L().rvAlt[RVS.indexOf(r)])}">`; $("#shotBox").hidden=false; $("#scrim").hidden=false; $("#shotBox .x").focus(); }
function renderChips(){
  const list=[["all",L().all],...Object.keys(CATS).map(k=>[k,catName(k)])];
  $("#chips").innerHTML=list.map(([k,n])=>`<button class="chip" type="button" data-cat="${k}" aria-pressed="${k===cat}">${n}</button>`).join("");
}
function filtered(){
  const q=query.trim().toLowerCase();
  return BOOKS.filter(b=>(pub==="all"||b.pub===pub)&&(cat==="all"||b.cat===cat)&&(age==="all"||b.age===age)&&(!q||[b.t,b.s,EN[b.id]?.[0]||"",EN[b.id]?.[1]||"",T.ar.cat[b.cat],T.en.cat[b.cat]].join(" ").toLowerCase().includes(q)));
}
function renderFilterbar(){
  const parts=[];
  if(cat!=="all")parts.push(`<button class="pill" type="button" data-unset="cat">${catName(cat)}<svg><use href="#i-x"/></svg></button>`);
  if(pub!=="all")parts.push(`<button class="pill" type="button" data-unset="pub">${PUBS[pub]?PUBS[pub][LANG]:""}<svg><use href="#i-x"/></svg></button>`);
  if(age!=="all")parts.push(`<button class="pill" type="button" data-unset="age">${ageChip(age)}<svg><use href="#i-x"/></svg></button>`);
  if(query.trim())parts.push(`<button class="pill" type="button" data-unset="q">“${esc(query.trim())}”<svg><use href="#i-x"/></svg></button>`);
  $("#filterbar").innerHTML=`<span class="lbl">${L().lookingFor}</span>${parts.length?parts.join(""):`<span class="none">${L().allBooksNone}</span>`}${parts.length?`<button class="clear" type="button" data-unset="all">${L().clearAll}</button>`:""}`;
}
function badgeOf(b){ const tg=btag(b); if(!tg) return ""; const src=b.tag||""; const cls=b.oos?"rare":/جديد/.test(src)?"new":""; return `<span class="badge ${cls}">${esc(tg)}</span>`; }
const priceHTML=(b,long)=>b.price!=null?`<span class="price">${num(b.price)} <small>${L().cur}</small></span>`:`<span class="price ask">${long?L().askPriceLong:L().askPrice}</span>`;
function card(b){
  return `<article class="book">
    <button class="ph" type="button" data-look="${b.id}" aria-label="${L().see}: ${esc(bt(b))}"><img src="${img(b.id)}" alt="${esc(bt(b))}" loading="lazy" width="440" height="560">${badgeOf(b)}${b.g.length?`<span class="pcount"><svg><use href="#i-cam"/></svg>${L().morePics(b.g.length)}</span>`:""}</button>
    <h3 dir="auto">${esc(bt(b))}</h3>
    <div class="meta" dir="auto">${esc(bs(b))}<br><span class="agechip">${ageChip(b.age)}</span></div>
    <div class="buy">${priceHTML(b)}
      ${b.oos?`<button class="add" type="button" disabled>${L().oos}</button>`:`<button class="add ${cart[b.id]?'in':''}" type="button" data-add="${b.id}">${cart[b.id]?L().inCart:L().add}</button>`}</div>
  </article>`;
}
function renderGrid(){
  const items=filtered();
  $("#grid").innerHTML=items.length?items.slice(0,shown).map(card).join(""):`<div class="empty">${L().empty}</div>`;
  $("#moreBtn").hidden=items.length<=shown;
  $("#countNote").textContent=items.length?L().showing(num(Math.min(shown,items.length)),num(items.length)):"";
  renderFilterbar();
}
function rerender(resetPage=true){ if(resetPage)shown=PAGE; renderReviews(); renderAges(); renderChips(); renderGrid(); }

/* ---------- quick look ---------- */
function openLook(id,spin){
  const b=BOOKS.find(x=>x.id===id); if(!b)return; lookId=id; gi=0;
  $("#modal").innerHTML=`<button class="x" type="button" data-close aria-label="${L().close}">×</button>
    <div class="mgal"><div class="mph" id="mph"><img id="mImg" src="${img(b.id)}" alt="${esc(bt(b))}" width="560" height="560">${b.g.length?`<button class="gnav prev" type="button" data-gstep="-1" aria-label="${L().prevPic}">‹</button><button class="gnav next" type="button" data-gstep="1" aria-label="${L().nextPic}">›</button><span class="gcount" id="gCount" dir="ltr">1 / ${b.g.length+1}</span>`:""}</div>
      ${b.g.length?`<div class="thumbs" role="tablist" aria-label="${L().gallery}">${[b.id,...b.g].map((f,i)=>`<button class="th" type="button" data-gi="${i}" aria-pressed="${i===0}" aria-label="${L().pic} ${i+1}"><img src="${img(f)}" alt="" loading="lazy"></button>`).join("")}</div><p class="gnote">${L().galNote}</p>`:""}</div>
    <div class="mb"><span class="agechip">${catName(b.cat)} · ${ageChip(b.age)}</span>${PUBS[b.pub]?`<span class="pubchip">${L().pubOf} ${PUBS[b.pub][LANG]}</span>`:""}
      <h3 dir="auto">${esc(bt(b))}</h3><p dir="auto" style="margin:0;color:var(--ink-soft)">${esc(bs(b))}</p>
      ${btag(b)?`<p style="margin:0;font-weight:700">${esc(btag(b))}</p>`:""}
      <div class="buy" style="margin-top:auto">${priceHTML(b,true)}</div>
      ${b.oos?`<button class="bigbtn ghost" type="button" disabled style="justify-content:center">${L().oos}</button>`:`<button class="bigbtn yellow" type="button" data-add="${b.id}" style="justify-content:center">${cart[b.id]?L().inCart:L().addLong}</button>`}
      ${spin?`<button class="bigbtn line2" type="button" id="again">${L().another}</button>`:""}</div>`;
  $("#modal").hidden=false; $("#scrim").hidden=false; $("#modal .x").focus();
  if(spin&&!calm){ const im=$("#modal .mph img"); im.animate([{transform:"rotateY(90deg) scale(.8)",opacity:.2},{transform:"rotateY(-10deg) scale(1.03)",opacity:1},{transform:"none"}],{duration:650,easing:"cubic-bezier(.34,1.4,.64,1)"}); }
}
let gi=0;
function showPic(i){ const b=BOOKS.find(x=>x.id===lookId); if(!b||!b.g.length)return; const list=[b.id,...b.g]; gi=(i+list.length)%list.length;
  const im=$("#mImg"); im.src=img(list[gi]); $("#gCount").textContent=`${gi+1} / ${list.length}`;
  document.querySelectorAll("#modal .th").forEach((t,k)=>{t.setAttribute("aria-pressed",k===gi); if(k===gi)t.scrollIntoView({block:"nearest",inline:"nearest",behavior:calm?"auto":"smooth"});});
  if(!calm)im.animate([{opacity:.35},{opacity:1}],{duration:220}); }
function closeAll(){ $("#shotBox").hidden=true; $("#modal").hidden=true; $("#drawer").hidden=true; $("#scrim").hidden=true; lookId=null; }
function surprise(){ const f=filtered().filter(b=>!b.oos); const pool=f.length?f:BOOKS.filter(b=>!b.oos); openLook(pool[Math.floor(Math.random()*pool.length)].id,true); }

/* ---------- cart ---------- */
function totals(){let sum=0,ask=0,n=0;Object.keys(cart).forEach(id=>{const b=BOOKS.find(x=>x.id===id);if(!b)return;n++;if(b.price!=null)sum+=b.price;else ask++;});return{sum,ask,n};}
function setProgress(step){["#p1","#p2","#p3"].forEach((s,i)=>$(s).classList.toggle("on",i<step)); $("#plbl").textContent=["",L().step1,L().step2,L().step3][step]||"";}
function renderCart(){
  const {sum,ask,n}=totals(); $("#cartCount").textContent=num(n); $("#sideCartN").textContent=num(n);
  const ids=Object.keys(cart).filter(id=>BOOKS.find(b=>b.id===id));
  $("#lines").innerHTML=ids.length?ids.map(id=>{const b=BOOKS.find(x=>x.id===id);return `<div class="line"><img src="${img(id)}" alt="" width="52" height="64"><div><b dir="auto">${esc(bt(b))}</b><span>${b.price!=null?num(b.price)+" "+L().cur:L().priceOnConfirm}</span></div><button class="rm" type="button" data-rm="${id}">${L().remove}</button></div>`}).join("")
    :`<p class="note" style="padding:24px 0;text-align:center;font-size:15px">${L().cartEmpty}</p>`;
  if(!ids.length){$("#foot").innerHTML="";setProgress(0);return;}
  setProgress(1);
  $("#foot").innerHTML=`<div class="total"><span>${L().total}</span><span>${num(sum)} ${L().cur}${ask?L().plusAsk(num(ask)):""}</span></div>
    <p class="note">${L().shipNote}</p>
    <form class="order" id="orderForm" novalidate>
      <div class="row2"><label>${L().fName}<input id="f_name" autocomplete="name" maxlength="80"></label><label>${L().fPhone}<input id="f_phone" inputmode="tel" autocomplete="tel" dir="ltr" maxlength="20"></label></div>
      <div class="row2"><label>${L().fGov}<select id="f_gov">${L().govs.map(g=>`<option>${g}</option>`).join("")}</select></label><label>${L().fAge}<input id="f_age" placeholder="${L().fAgePh}" maxlength="30"></label></div>
      <label>${L().fAddr}<textarea id="f_addr" rows="2" autocomplete="street-address" maxlength="300"></textarea></label>
      <button class="bigbtn navy" type="submit">${L().prepare}</button>
    </form><div id="sendArea" style="display:grid;gap:8px"></div>`;
  $("#orderForm").addEventListener("focusin",()=>setProgress(2),{once:true});
}
function orderText(){
  const {sum,ask}=totals(); const v=id=>($(id)?.value||"").trim();
  const lines=Object.keys(cart).map(id=>{const b=BOOKS.find(x=>x.id===id);return b?`• ${bt(b)}${b.price!=null?` (${b.price} ${L().cur})`:` (${L().msgAskOne})`}`:""}).filter(Boolean);
  return `${L().msgHead}\n\n${lines.join("\n")}\n\n${L().msgTotal}: ${sum} ${L().cur}${ask?L().msgAsk(ask):""}\n\n${L().fName}: ${v("#f_name")}\n${L().fPhone}: ${v("#f_phone")}\n${L().fGov}: ${v("#f_gov")}\n${L().fAddr}: ${v("#f_addr")}${v("#f_age")?`\n${L().fAge}: ${v("#f_age")}`:""}`;
}
function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,1800);}
function flyToCart(fromEl,id){
  const btn=$("#openCart"); btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
  if(calm||!fromEl||!fromEl.animate) return;
  const a=fromEl.getBoundingClientRect(), b=btn.getBoundingClientRect();
  const f=document.createElement("img"); f.src=img(id); f.className="flyer"; Object.assign(f.style,{left:a.left+"px",top:a.top+"px",width:a.width+"px",height:a.height+"px"}); document.body.appendChild(f);
  const dx=b.left+b.width/2-(a.left+a.width/2), dy=b.top+b.height/2-(a.top+a.height/2);
  f.animate([{transform:"none",opacity:1},{transform:`translate(${dx*.5}px,${dy-80}px) scale(.5) rotate(-12deg)`,opacity:1,offset:.6},{transform:`translate(${dx}px,${dy}px) scale(.12) rotate(-20deg)`,opacity:.4}],{duration:700,easing:"cubic-bezier(.5,0,.6,1)"}).onfinish=()=>{f.remove(); burst(b.left+b.width/2,b.top+b.height/2);};
}
function burst(x,y){
  for(let i=0;i<7;i++){const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("class","burst");s.innerHTML='<use href="#i-star"/>';s.style.left=(x-8)+"px";s.style.top=(y-8)+"px";s.style.color=["#ffd52c","#3fe3df","#f7a8c4"][i%3];document.body.appendChild(s);
    const a=i/7*Math.PI*2, r=38+Math.random()*16; s.animate([{transform:"scale(.4)",opacity:1},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r}px) scale(1) rotate(90deg)`,opacity:0}],{duration:600,easing:"ease-out"}).onfinish=()=>s.remove();}
}

/* ---------- events ---------- */
document.addEventListener("click",e=>{
  const ag=e.target.closest("[data-age]"); if(ag){age=age===ag.dataset.age?"all":ag.dataset.age; rerender(); $("#books").scrollIntoView({behavior:calm?"auto":"smooth"}); return;}
  const pb=e.target.closest("[data-pub]"); if(pb){pub=pb.dataset.pub; cat="all"; rerender(); $("#books").scrollIntoView({behavior:calm?"auto":"smooth"}); return;}
  const g=e.target.closest("[data-go]"); if(g){cat=g.dataset.go; rerender(); $("#books").scrollIntoView({behavior:calm?"auto":"smooth"}); return;}
  const c=e.target.closest("[data-cat]"); if(c){cat=c.dataset.cat; rerender(); return;}
  const u=e.target.closest("[data-unset]"); if(u){const k=u.dataset.unset; if(k==="cat"||k==="all")cat="all"; if(k==="pub"||k==="all")pub="all"; if(k==="age"||k==="all")age="all"; if(k==="q"||k==="all"){query="";$("#q").value="";} rerender(); return;}
  const sh=e.target.closest("[data-shot]"); if(sh){openShot(sh.dataset.shot); return;}
  if(e.target.closest("[data-shotclose]")){closeAll(); return;}
  const gs=e.target.closest("[data-gstep]"); if(gs){showPic(gi+Number(gs.dataset.gstep)); return;}
  const gt=e.target.closest("[data-gi]"); if(gt){showPic(Number(gt.dataset.gi)); return;}
  const lk=e.target.closest("[data-look]"); if(lk){openLook(lk.dataset.look); return;}
  const a=e.target.closest("[data-add]"); if(a){const id=a.dataset.add; if(!BOOKS.some(b=>b.id===id))return; if(cart[id]){delete cart[id];toast(L().removed);} else {cart[id]=1;toast(L().added); const ph=a.closest(".book")?.querySelector(".ph img")||$("#modal .mph img"); flyToCart(ph,id);} store.set("bb_cart3",cart); renderGrid(); renderCart(); if(!$("#modal").hidden){a.textContent=cart[id]?L().inCart:L().addLong;} return;}
  const r=e.target.closest("[data-rm]"); if(r){delete cart[r.dataset.rm];store.set("bb_cart3",cart);renderGrid();renderCart();return;}
  if(e.target.closest("[data-close]")||e.target.id==="scrim"){closeAll();return;}
  if(e.target.closest("#again")){surprise();return;}
  if(e.target.closest("#copyMsg")){const txt=orderText(),box=$("#msgbox");
    Promise.resolve().then(()=>navigator.clipboard.writeText(txt)).then(()=>toast(L().copied)).catch(()=>{const s=getSelection(),rg=document.createRange();rg.selectNodeContents(box);s.removeAllRanges();s.addRange(rg);toast(L().selected);});}
});
document.addEventListener("submit",e=>{
  if(e.target.id!=="orderForm")return; e.preventDefault();
  const miss=["#f_name","#f_phone","#f_addr"].filter(id=>!$(id).value.trim());
  if(miss.length){$(miss[0]).focus();toast(L().missing);return;}
  setProgress(3);
  const txt=orderText(), href=`https://wa.me/${encodeURIComponent(WHATSAPP)}?text=${encodeURIComponent(txt)}`;
  $("#sendArea").innerHTML=`<a class="bigbtn wa" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${L().sendWa}</a>
    <div class="msgbox" id="msgbox">${esc(txt)}</div>
    <button class="bigbtn line2" id="copyMsg" type="button">${L().copy}</button>
    <p class="note">${L().waFallback(WHATSAPP)}</p>`;
});
const openCartFn=()=>{closeSide();$("#drawer").hidden=false;$("#scrim").hidden=false;renderCart();};
$("#openCart").onclick=openCartFn; $("#sideCart").onclick=openCartFn;
/* side menu */
const side=$("#side");
function openSide(){side.classList.add("open");$("#sideScrim").hidden=false;$("#openSide").setAttribute("aria-expanded","true");$("#closeSide").focus();}
function closeSide(){if(!side.classList.contains("open"))return;side.classList.remove("open");$("#sideScrim").hidden=true;$("#openSide").setAttribute("aria-expanded","false");}
$("#openSide").onclick=openSide; $("#closeSide").onclick=closeSide; $("#sideScrim").onclick=closeSide;
side.addEventListener("click",e=>{ if(e.target.closest("a")) closeSide(); });
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeSide();closeAll();} else if(lookId&&!$("#modal").hidden&&(e.key==="ArrowLeft"||e.key==="ArrowRight")){const rtl=LANG==="ar"; showPic(gi+((e.key==="ArrowLeft")!==rtl?-1:1));}});
let tx=null; document.addEventListener("touchstart",e=>{tx=e.target.closest("#mph")?e.touches[0].clientX:null},{passive:true});
document.addEventListener("touchend",e=>{if(tx==null)return; const dx=e.changedTouches[0].clientX-tx; tx=null; if(Math.abs(dx)>40){const rtl=LANG==="ar"; showPic(gi+((dx>0)!==rtl?-1:1));}},{passive:true});
/* scrollspy: shows "you are here" in the side menu */
if("IntersectionObserver" in window){
  const links=[...side.querySelectorAll("a[data-nav]")];
  const io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){const id=en.target.id;links.forEach(l=>l.classList.toggle("on",l.dataset.nav===id));}})},{rootMargin:"-45% 0px -50% 0px"});
  ["top","ages","cats","books","how","reviews","contact"].forEach(id=>{const s=document.getElementById(id); if(s) io.observe(s);});
}
$("#closeCart").onclick=closeAll; $("#scrim").onclick=closeAll; $("#surprise").onclick=surprise;
$("#moreBtn").onclick=()=>{shown+=PAGE;renderGrid();};
let qt; $("#q").addEventListener("input",e=>{clearTimeout(qt);qt=setTimeout(()=>{query=e.target.value.slice(0,80);rerender();},180);});
/* animated logo, built from separate layers of the logo */
const LAY={"rocket_s":[35.673,0,9.19,7.788],"star1":[45.865,.22,3.592,6.245],"magnifier":[25.146,2.939,15.038,8.964],"star_o1":[65.497,3.894,3.592,6.539],"star_y1":[16.959,3.894,7.686,6.098],"bulb":[46.032,4.555,10.86,12.711],"flask":[58.73,8.523,13.784,16.091],"prot_pink":[.835,8.817,17.21,9.405],"prot_blue":[75.773,9.772,16.876,10.287],"molecule":[57.477,9.919,8.271,5.437],"star_y2":[9.691,18.442,5.096,4.776],"star_o2":[50.794,15.797,6.266,7.421],"star_y3":[95.906,19.398,3.091,2.866],"rocket":[72.18,21.161,15.038,7.568],"bulb_s":[91.896,25.79,8.104,8.744],"star_o3":[84.127,31.007,7.352,4.188],"swoosh":[91.562,58.193,8.438,12.05],"en_text":[18.881,83.027,76.19,5.511],"tagline":[20.468,90.375,71.011,8.817],"wordmark":[10.86,40.632,86.8,39.162],"vehicle":[0,11.315,98.413,48.494]};
const LOOP={rocket:"rocketA",rocket_s:"rocketB",magnifier:"swing",bulb:"glow",bulb_s:"glow",flask:"wobble",prot_pink:"tilt",prot_blue:"tilt2",molecule:"spin",swoosh:"pulse"};
function buildLogo(){
  const box=$("#logoAnim"); const AR=1361/1197; const cx=45, cy=34;
  const pos=(n)=>{const [x,y,w,h]=LAY[n];return `left:${x}%;top:${y}%;width:${w}%`;};
  const STARS=[["star_y1",8,7,1.6,0],["star_o1",28,5,2.0,.5],["star_y2",46,8,1.4,.9],["star_o2",62,6,1.8,.25],["star1",80,5,1.5,1.2],["star_o3",18,4,2.2,1.5],["star_y3",70,4,1.7,.7]];
  const speed=`<span class="speed" aria-hidden="true">${STARS.map(([n,y,w,d,dl])=>`<img class="ss" src="assets/anim/${n}.webp" alt="" style="top:${y}%;width:${w}%;--sd:${d}s;--sdl:${dl}s">`).join("")}</span>`;
  let h=`<span class="ly veh-in" style="${pos("vehicle")};z-index:2"><span class="fly" style="display:block;position:relative">${speed}<img src="assets/anim/vehicle.webp" alt="" width="1000" height="460"><img class="ov fan" src="assets/anim/v_fan.webp" alt=""><img class="ov hair" src="assets/anim/v_hair.webp" alt=""></span></span>`;
  h+=`<span class="ly word-in" style="${pos("wordmark")};z-index:3"><span class="breathe" style="display:block"><img class="lt" src="assets/anim/wordmark.webp" alt=""><img class="dk" src="assets/anim/wordmark_w.webp" alt=""></span></span>`;
  h+=`<span class="ly txt-in" style="${pos("en_text")};z-index:3;--d:1.05s"><img class="lt" src="assets/anim/en_text.webp" alt=""><img class="dk" src="assets/anim/en_text_w.webp" alt=""></span>`;
  h+=`<span class="ly txt-in" style="${pos("tagline")};z-index:3;--d:1.25s"><img class="lt" src="assets/anim/tagline.webp" alt=""><img class="dk" src="assets/anim/tagline_w.webp" alt=""></span>`;
  const els=Object.keys(LAY).filter(n=>!["vehicle","wordmark","en_text","tagline"].includes(n));
  els.forEach((n,i)=>{const [x,y,w,hh]=LAY[n]; const ex=x+w/2, ey=y+hh/2;
    const dx=((cx-ex)/w*100).toFixed(0)+"%", dy=((cy-ey)/(hh)*100).toFixed(0)+"%";
    const loop=LOOP[n]||"twinkle"; const tw=loop==="twinkle"?`--t:${(1.7+((i*37)%13)/10).toFixed(2)}s;--td:${((i*0.29)%1.6).toFixed(2)}s`:"";
    h+=`<span class="ly burst-in" style="${pos(n)};z-index:${n==="swoosh"?4:5};--i:${i};--dx:${dx};--dy:${dy}"><span class="${loop}" style="display:block;${tw}"><img src="assets/anim/${n}.webp" alt=""></span></span>`;});
  box.innerHTML=h; requestAnimationFrame(()=>box.classList.add("play"));
}
buildLogo();
applyLang();

/* ---------- بيانات لوحة التحكم (data.json) ----------
   صاحبة المحل بتعدل الكتب والأسعار والنصوص من admin.html، والتعديلات بتتحفظ في data.json.
   لو الملف مش موجود أو فيه مشكلة، الموقع بيفضل شغال بالبيانات اللي جوه الصفحة. */
function fmtWa(n){ return n.startsWith("20")&&n.length===12?`+20 ${n.slice(2,5)} ${n.slice(5,8)} ${n.slice(8)}`:"+"+n; }
const EDITABLE=["heroH","heroP","agesH","agesP","catsH","catsP","booksH","realNote","howH","s1","s1p","s2","s2p","s3","s3p","shipNote","footLine","rvP","searchPh"];
const plain=v=>String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const SAFE_ID=/^[A-Za-z0-9_-]{1,40}$/, SAFE_PATH=/^(books|assets)\/[A-Za-z0-9_\/.-]{1,120}\.(webp|png|jpe?g)$/;
function applyData(d){
  if(!d||typeof d!=="object")return false;
  if(typeof d.whatsapp==="string") WHATSAPP=d.whatsapp.replace(/\D/g,"").slice(0,15);
  if(d.texts) for(const lg of ["ar","en"]) for(const [k,v] of Object.entries(d.texts[lg]||{})){
    if(!EDITABLE.includes(k)||typeof v!=="string"||!v.trim())continue;
    // في العنوان الكبير: [كلمة] باللون الأصفر و{كلمة} بالتركواز، وسطر جديد بيبقى سطر جديد
    T[lg][k]=k==="heroH"?plain(v).replace(/\[([^\]]{1,40})\]/g,'<span class="y">$1</span>').replace(/\{([^}]{1,40})\}/g,'<span class="t">$1</span>').replace(/\n/g,"<br>"):(k==="searchPh"?v:plain(v));
  }
  if(Array.isArray(d.cats)&&d.cats.length){
    const ok=d.cats.filter(c=>c&&SAFE_ID.test(c.key||""));
    if(ok.length){ for(const k of Object.keys(CATS))delete CATS[k];
      ok.forEach(c=>{CATS[c.key]={c:/^#[0-9a-f]{3,8}$/i.test(c.color||"")?c.color:"#ffd52c",ic:/^[a-z0-9_]{1,20}$/.test(c.icon||"")?c.icon:"star_y",pics:(c.pics||[]).filter(x=>typeof x==="string"&&(/^[A-Za-z0-9_\/-]{1,80}$/.test(x)||SAFE_PATH.test(x))).slice(0,3)};
        T.ar.cat[c.key]=plain(c.ar||c.key); T.en.cat[c.key]=plain(c.en||c.ar||c.key);}); }
  }
  if(Array.isArray(d.books)&&d.books.length){
    for(const k of Object.keys(IMGMAP))delete IMGMAP[k];
    BOOKS=d.books.filter(b=>b&&SAFE_ID.test(b.id||"")&&!b.hidden&&CATS[b.cat]).map(b=>{
      if(typeof b.img==="string"&&SAFE_PATH.test(b.img))IMGMAP[b.id]=b.img;
      EN[b.id]=[String(b.et||""),String(b.es||""),String(b.etag||"")];
      const pr=(b.price===""||b.price==null||isNaN(Number(b.price)))?null:Number(b.price);
      return {id:b.id,t:String(b.t||""),s:String(b.s||""),cat:b.cat,price:pr,age:String(b.age||"3"),tag:String(b.tag||""),oos:!!b.oos,pub:String(b.pub||""),
        g:(Array.isArray(b.g)?b.g:[]).filter(x=>typeof x==="string"&&(SAFE_PATH.test("books/"+x+".webp")||SAFE_PATH.test(x))).slice(0,20)};
    });
    for(const id of Object.keys(cart)) if(!BOOKS.some(b=>b.id===id&&!b.oos)) delete cart[id];
  }
  return true;
}
fetch("data.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(d=>{ if(applyData(d)) applyLang(); }).catch(()=>{});

// تطبيق على الموبايل: تسجيل الـ service worker عشان الموقع يتسطب ويشتغل من غير نت
if ("serviceWorker" in navigator && location.protocol === "https:") {
  window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
}
