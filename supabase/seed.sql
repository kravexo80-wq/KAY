insert into public.categories (
  name,
  name_ar,
  slug,
  description,
  description_ar,
  sort_order,
  is_active,
  is_featured
)
values
  (
    'Men / Signature',
    'رجالي / التوقيع',
    'men-signature',
    'Tailored men''s signature silhouettes for ceremonial and evening presentation.',
    'قصات رجالية موقعة ومفصلة للمناسبات والعرض المسائي.',
    10,
    true,
    true
  ),
  (
    'Outerwear / Ceremony',
    'طبقات خارجية / المراسم',
    'outerwear-ceremony',
    'Layered ceremonial outerwear with stronger trim and formal proportion.',
    'طبقات خارجية احتفالية بتفاصيل أغنى وتناسب رسمي أكثر حضوراً.',
    20,
    true,
    true
  ),
  (
    'Women / Signature',
    'نسائي / التوقيع',
    'women-signature',
    'Core women''s signature pieces with fluid drape and refined finishing.',
    'قطع نسائية أساسية بتدفق ناعم وتشطيب مصقول.',
    30,
    true,
    true
  ),
  (
    'Men / Limited',
    'رجالي / محدود',
    'men-limited',
    'Limited-release men''s pieces built with stronger structure and rarity cues.',
    'قطع رجالية محدودة الإصدار ببنية أقوى وإشارات ندرة واضحة.',
    40,
    true,
    true
  ),
  (
    'Men / Essential',
    'رجالي / أساسي',
    'men-essential',
    'Daily luxury menswear with softer tonality and practical movement.',
    'ملابس رجالية فاخرة يومية بدرجات أهدأ وحركة عملية.',
    50,
    true,
    false
  ),
  (
    'Women / Occasion',
    'نسائي / المناسبات',
    'women-occasion',
    'Refined women''s occasionwear designed for layered modest dressing.',
    'ملابس نسائية راقية للمناسبات صُممت للارتداء المحتشم متعدد الطبقات.',
    60,
    true,
    false
  )
on conflict (slug) do update
set
  name = excluded.name,
  name_ar = excluded.name_ar,
  description = excluded.description,
  description_ar = excluded.description_ar,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured,
  updated_at = timezone('utc', now());

insert into public.collections (
  name,
  name_ar,
  slug,
  eyebrow,
  eyebrow_ar,
  description,
  description_ar,
  highlight,
  highlight_ar,
  tone,
  sort_order,
  is_active,
  is_featured
)
values
  (
    'Atelier Noir',
    'أتيليه نوار',
    'atelier-noir',
    'Signature capsule',
    'كبسولة التوقيع',
    'The darkest expression of Kravexo: architectural silhouettes, satin restraint, and hard-lit elegance.',
    'أعمق تعبير عن كرافكسو: قصات معمارية، وضبط ساتاني هادئ، وأناقة مضاءة بحدة.',
    'Built for evening entrances and low-light product storytelling.',
    'صممت لمداخل المساء وسرد المنتجات تحت الإضاءة المنخفضة.',
    'obsidian',
    10,
    true,
    true
  ),
  (
    'Ceremony Edit',
    'تحرير المراسم',
    'ceremony-edit',
    'Occasion wardrobe',
    'خزانة المناسبات',
    'Statement modest wear intended for Eid, formal evenings, and refined layered dressing.',
    'ملابس محتشمة لافتة خُصصت للعيد والأمسيات الرسمية والتنسيق الراقي متعدد الطبقات.',
    'Richer trim, stronger reflection, and ceremonial proportion.',
    'تفاصيل أغنى وانعكاس أقوى وتناسب احتفالي أوضح.',
    'bronze',
    20,
    true,
    true
  ),
  (
    'Signature Essentials',
    'أساسيات التوقيع',
    'signature-essentials',
    'Daily luxury',
    'فخامة يومية',
    'Year-round pieces with softer tonality and the same premium presentation language.',
    'قطع على مدار العام بدرجات أهدأ وبنفس لغة العرض الفاخرة.',
    'Designed to scale into a broad catalog without losing the showroom feel.',
    'مصممة لتتسع ضمن كتالوج أوسع من دون فقدان روح المعرض.',
    'stone',
    30,
    true,
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  name_ar = excluded.name_ar,
  eyebrow = excluded.eyebrow,
  eyebrow_ar = excluded.eyebrow_ar,
  description = excluded.description,
  description_ar = excluded.description_ar,
  highlight = excluded.highlight,
  highlight_ar = excluded.highlight_ar,
  tone = excluded.tone,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured,
  updated_at = timezone('utc', now());

insert into public.products (
  category_id,
  collection_id,
  name,
  name_ar,
  slug,
  short_description,
  short_description_ar,
  description,
  description_ar,
  story,
  story_ar,
  base_price,
  currency_code,
  tags,
  tags_ar,
  materials,
  materials_ar,
  fabric_notes,
  fabric_notes_ar,
  care_notes,
  care_notes_ar,
  fit_notes,
  fit_notes_ar,
  specs,
  specs_ar,
  limited_edition,
  is_active,
  is_featured,
  viewer_360_enabled,
  viewer_360_label,
  viewer_360_label_ar,
  viewer_360_description,
  viewer_360_description_ar,
  viewer_360_note,
  viewer_360_note_ar,
  shipping_lead_time,
  shipping_lead_time_ar,
  shipping_delivery,
  shipping_delivery_ar,
  shipping_returns,
  shipping_returns_ar,
  shipping_presentation
  ,
  shipping_presentation_ar
)
values
  (
    (select id from public.categories where slug = 'men-signature'),
    (select id from public.collections where slug = 'atelier-noir'),
    'Obsidian Thobe',
    'ثوب أوبسيديان',
    'obsidian-thobe',
    'A sharply tailored black thobe with satin-edged restraint.',
    'ثوب أسود مفصل بدقة مع حواف ساتانية هادئة.',
    'Built with a dense fluid drape and precise line control, the Obsidian Thobe is designed to feel ceremonial without excess.',
    'صُمم بقماش كثيف وانسياب متزن وتحكم دقيق في الخطوط ليمنح حضوراً احتفالياً من دون مبالغة.',
    'The silhouette stays clean under strong light, allowing the cloth, fall, and finishing to do the work.',
    'يبقى الخط العام نظيفاً تحت الإضاءة القوية ليبرز القماش والانسياب واللمسة النهائية وحدها.',
    420,
    'USD',
    array['Launch Piece', 'Evening Tailoring'],
    array['قطعة الإطلاق', 'تفصيل مسائي'],
    array['Italian matte crepe', 'Satin piping', 'Soft shoulder structure'],
    array['كريب إيطالي مطفي', 'حافة ساتانية', 'بنية كتف ناعمة'],
    array[
      'Dense matte crepe keeps the silhouette controlled under directional light.',
      'Satin edging adds a restrained line of reflection along the placket and cuff.'
    ],
    array[
      'يحافظ الكريب المطفي الكثيف على الخط العام منضبطاً تحت الإضاءة الموجهة.',
      'تضيف الحواف الساتانية خط انعكاس هادئاً على امتداد الصدرية والأكمام.'
    ],
    array[
      'Dry clean only to protect the finish and preserve the structure.',
      'Steam from the interior to restore drape after storage or travel.'
    ],
    array[
      'يُنظف جافاً فقط لحماية التشطيب والحفاظ على البنية.',
      'يُبخر من الداخل لاستعادة الانسياب بعد التخزين أو السفر.'
    ],
    array[
      'Relaxed through the body with a clean shoulder line.',
      'Take your regular size for the intended ceremonial proportion.'
    ],
    array[
      'قصة مريحة عبر الجسم مع خط كتف نظيف.',
      'اختر مقاسك المعتاد للحصول على التناسب الاحتفالي المقصود.'
    ],
    '[{"label":"Fit","value":"Relaxed tailored"},{"label":"Length","value":"Full length"},{"label":"Closure","value":"Hidden placket"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    '[{"label":"القصّة","value":"تفصيل مريح"},{"label":"الطول","value":"طول كامل"},{"label":"الإغلاق","value":"صدرية مخفية"},{"label":"العناية","value":"تنظيف جاف فقط"}]'::jsonb,
    false,
    true,
    true,
    true,
    '360 showroom view',
    'عرض المعرض 360',
    'Reserved for a future interactive spin built from controlled studio frames.',
    'مخصص لعرض تفاعلي مستقبلي مبني من لقطات استوديو مضبوطة.',
    'Still angles are active for now while the layout remains ready for frame-sequence integration.',
    'الزوايا الثابتة تعمل حالياً بينما تبقى الواجهة جاهزة لدمج تسلسل الإطارات لاحقاً.',
    'Dispatches in 2-4 business days.',
    'يُجهز خلال 2 إلى 4 أيام عمل.',
    'Complimentary insured delivery on launch orders.',
    'شحن مؤمن مجاني لطلبات الإطلاق.',
    'Returns accepted within 14 days on unworn pieces.',
    'يُقبل الإرجاع خلال 14 يوماً للقطع غير المستخدمة.',
    'Delivered in a matte black presentation box with garment wrap.'
    ,
    'يصل داخل صندوق عرض أسود مطفي مع تغليف فاخر للقطعة.'
  ),
  (
    (select id from public.categories where slug = 'outerwear-ceremony'),
    (select id from public.collections where slug = 'ceremony-edit'),
    'Rimal Bisht',
    'بشت رمال',
    'rimal-bisht',
    'A structured bisht with polished trim and controlled volume.',
    'بشت ببنية واضحة وتفاصيل مصقولة وحجم متزن.',
    'The Rimal Bisht introduces ceremonial presence through a wider drape, soft sheen, and sculpted front edge.',
    'يمنح بشت رمال حضوراً احتفالياً من خلال انسياب أوسع ولمعان ناعم وحافة أمامية منحوتة.',
    'Designed as a spotlight layer, it frames the silhouette instead of overpowering it.',
    'صُمم كطبقة تلفت الانتباه فتؤطر الخط العام بدل أن تطغى عليه.',
    560,
    'USD',
    array['Ceremony Edit', 'Layered'],
    array['تحرير المراسم', 'طبقات'],
    array['Structured satin blend', 'Metallic edge braid', 'Silk-touch lining'],
    array['مزيج ساتان مبني', 'شريط طرفي معدني', 'بطانة بملمس حريري'],
    array[
      'A structured satin blend gives the outer layer ceremony-level presence without excess stiffness.',
      'Reflective braid finishing is used sparingly so the edge catches light without becoming ornate.'
    ],
    array[
      'يعطي مزيج الساتان المبني الطبقة الخارجية حضوراً احتفالياً من دون قساوة مفرطة.',
      'استخدم التشطيب العاكس على الحواف بقدر محسوب ليلتقط الضوء من دون مبالغة زخرفية.'
    ],
    array[
      'Professional dry clean only due to metallic trim and layered construction.',
      'Store on a broad hanger to keep the shoulder line crisp.'
    ],
    array[
      'يُنظف جافاً لدى مختص بسبب التفاصيل المعدنية والبنية متعددة الطبقات.',
      'يُحفظ على علاقة عريضة للحفاظ على وضوح خط الكتف.'
    ],
    array[
      'Designed as an open ceremonial layer with generous movement.',
      'Size according to shoulder preference and intended underlayer.'
    ],
    array[
      'صُمم كطبقة احتفالية مفتوحة بحركة سخية.',
      'اختر المقاس حسب تفضيل الكتف والطبقة الداخلية المقصودة.'
    ],
    '[{"label":"Fit","value":"Open ceremonial drape"},{"label":"Length","value":"Longline"},{"label":"Finish","value":"Metallic edge binding"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    '[{"label":"القصّة","value":"انسياب احتفالي مفتوح"},{"label":"الطول","value":"طويل"},{"label":"التشطيب","value":"حافة معدنية"},{"label":"العناية","value":"تنظيف جاف فقط"}]'::jsonb,
    true,
    true,
    true,
    true,
    '360 drape study',
    'دراسة الانسياب 360',
    'Prepared for a future 360 layer view showing trim, volume, and movement in a single module.',
    'مهيأ لعرض طبقات 360 مستقبلي يبرز الحواف والحجم والحركة ضمن وحدة واحدة.',
    'The current build uses stills but reserves the same footprint for richer drape presentation later.',
    'البناء الحالي يعتمد الصور الثابتة مع الاحتفاظ بنفس المساحة لعرض انسياب أغنى لاحقاً.',
    'Dispatches in 3-5 business days.',
    'يُجهز خلال 3 إلى 5 أيام عمل.',
    'Insured global delivery with signature confirmation.',
    'توصيل عالمي مؤمن مع تأكيد بالتوقيع.',
    'Returns accepted within 14 days on unworn ceremonial pieces.',
    'يُقبل الإرجاع خلال 14 يوماً للقطع الاحتفالية غير المستخدمة.',
    'Presented in a structured black box with protective garment sleeve.'
    ,
    'يُقدم داخل صندوق أسود مبني مع غلاف حماية للقطعة.'
  ),
  (
    (select id from public.categories where slug = 'women-signature'),
    (select id from public.collections where slug = 'ceremony-edit'),
    'Safa Abaya',
    'عباية صفا',
    'safa-abaya',
    'A quiet black abaya cut for movement, gloss, and clean proportion.',
    'عباية سوداء هادئة مقصوصة للحركة واللمعان الخفيف والتناسب النظيف.',
    'The Safa Abaya balances modest volume with an elevated shoulder line and a minimal closure system.',
    'توازن عباية صفا بين الحجم المحتشم وخط كتف مرتفع ونظام إغلاق minimal.',
    'Each panel is intended to read as a soft reflection surface under low light.',
    'صُممت كل لوحة لتُقرأ كسطح انعكاس ناعم تحت الإضاءة المنخفضة.',
    480,
    'USD',
    array['Women''s Capsule', 'Fluid Cut'],
    array['كبسولة نسائية', 'قصة انسيابية'],
    array['Japanese nida', 'Silk-touch facing', 'Fine cuff structure'],
    array['نِدا ياباني', 'بطانة بملمس حريري', 'بنية كم دقيقة'],
    array[
      'Japanese nida provides fluid movement with a softly polished surface.',
      'Silk-touch facings keep interior finish elevated without adding visual noise.'
    ],
    array[
      'يوفر النِدا الياباني حركة انسيابية مع سطح مصقول بهدوء.',
      'تحافظ البطانات الحريرية على فخامة الداخل من دون ضجيج بصري.'
    ],
    array[
      'Dry clean only to maintain the finish and cuff structure.',
      'Store buttoned lightly to preserve the front line.'
    ],
    array[
      'يُنظف جافاً فقط للحفاظ على التشطيب وبنية الأكمام.',
      'يُحفظ مغلقاً بخفة للحفاظ على خط الواجهة.'
    ],
    array[
      'Fluid relaxed cut with full modest coverage and quiet volume.',
      'Choose your usual size for intended ease or size down for a closer shoulder line.'
    ],
    array[
      'قصة مريحة وانسيابية بتغطية محتشمة كاملة وحجم هادئ.',
      'اختاري مقاسك المعتاد للراحة المقصودة أو مقاساً أصغر لخط كتف أقرب.'
    ],
    '[{"label":"Fit","value":"Fluid relaxed"},{"label":"Length","value":"Full length"},{"label":"Closure","value":"Hidden hook closure"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    '[{"label":"القصّة","value":"انسيابية مريحة"},{"label":"الطول","value":"طول كامل"},{"label":"الإغلاق","value":"مشبك مخفي"},{"label":"العناية","value":"تنظيف جاف فقط"}]'::jsonb,
    false,
    true,
    true,
    true,
    '360 silhouette view',
    'عرض الخط العام 360',
    'Planned for a full silhouette rotation focused on movement, fall, and cuff finishing.',
    'مخطط له كدوران كامل للخط العام يركز على الحركة والانسياب وتشطيب الأكمام.',
    'The gallery already reserves a dedicated module for future frame-based viewing.',
    'يحجز المعرض بالفعل وحدة مخصصة لعرض مستقبلي قائم على تسلسل الإطارات.',
    'Dispatches in 2-4 business days.',
    'يُجهز خلال 2 إلى 4 أيام عمل.',
    'Complimentary insured shipping for launch-region orders.',
    'شحن مؤمن مجاني لطلبات مناطق الإطلاق.',
    'Returns accepted within 14 days on unworn pieces with original presentation.',
    'يُقبل الإرجاع خلال 14 يوماً للقطع غير المستخدمة مع التغليف الأصلي.',
    'Wrapped in soft black tissue with matte branded outer packaging.'
    ,
    'تُلف داخل ورق أسود ناعم مع تغليف خارجي مطفي يحمل هوية العلامة.'
  ),
  (
    (select id from public.categories where slug = 'men-limited'),
    (select id from public.collections where slug = 'atelier-noir'),
    'Atlas Jubbah',
    'جبّة أطلس',
    'atlas-jubbah',
    'An architectural jubbah with sharp verticals and low-sheen depth.',
    'جبّة معمارية بخطوط عمودية حادة وعمق منخفض اللمعان.',
    'The Atlas Jubbah is cut to create a column effect, with measured structure through the chest and sleeves.',
    'قُصت جبّة أطلس لصناعة أثر عمودي واضح مع بنية محسوبة في الصدر والأكمام.',
    'It is built for premium product photography: shape-first, minimal, and sharply outlined.',
    'بُنيت لتصوير المنتجات الفاخر: شكل أولاً، حد أدنى من التفاصيل، وحدود واضحة.',
    510,
    'USD',
    array['Limited Capsule', 'Architectural'],
    array['كبسولة محدودة', 'معماري'],
    array['Compact wool blend', 'Matte satin inset', 'Reinforced collar'],
    array['مزيج صوف مضغوط', 'إدخال ساتاني مطفي', 'ياقة معززة'],
    array[
      'Compact wool blend holds the column silhouette and reads sharply in low light.',
      'Matte satin insets add tonal depth without breaking the restrained composition.'
    ],
    array[
      'يحافظ مزيج الصوف المضغوط على الخط العمودي ويظهر بوضوح تحت الإضاءة المنخفضة.',
      'تضيف الإدخالات الساتانية المطفية عمقاً لونياً من دون كسر التكوين الهادئ.'
    ],
    array[
      'Dry clean only for collar structure and panel integrity.',
      'Use a garment brush between wears to preserve the matte finish.'
    ],
    array[
      'يُنظف جافاً فقط للحفاظ على بنية الياقة وتماسك الألواح.',
      'استخدم فرشاة ملابس بين مرات اللبس للحفاظ على اللمسة المطفية.'
    ],
    array[
      'Structured straight fit designed to read as a clean vertical line.',
      'Take your standard size for the intended architectural shape.'
    ],
    array[
      'قصة مستقيمة مبنية صُممت لتُقرأ كخط عمودي نظيف.',
      'اختر مقاسك المعتاد للحصول على الشكل المعماري المقصود.'
    ],
    '[{"label":"Fit","value":"Structured straight fit"},{"label":"Length","value":"Ankle length"},{"label":"Collar","value":"Stand collar"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    '[{"label":"القصّة","value":"مستقيمة مبنية"},{"label":"الطول","value":"حتى الكاحل"},{"label":"الياقة","value":"ياقة قائمة"},{"label":"العناية","value":"تنظيف جاف فقط"}]'::jsonb,
    true,
    true,
    true,
    true,
    '360 structure view',
    'عرض البنية 360',
    'Designed for a future viewer focused on collar architecture, sleeve line, and panel transitions.',
    'صُممت لمشاهد مستقبلي يركز على بنية الياقة وخط الأكمام وانتقالات الألواح.',
    'This product is already staged for richer 360 storytelling once real imagery is added.',
    'هذه القطعة مهيأة بالفعل لسرد 360 أكثر غنى عند إضافة التصوير الحقيقي.',
    'Dispatches in 3-5 business days.',
    'يُجهز خلال 3 إلى 5 أيام عمل.',
    'Global insured delivery with signature confirmation.',
    'شحن عالمي مؤمن مع تأكيد بالتوقيع.',
    'Returns accepted within 14 days on unworn pieces.',
    'يُقبل الإرجاع خلال 14 يوماً للقطع غير المستخدمة.',
    'Boxed in a signature rigid case with interior garment support.'
    ,
    'يصل داخل صندوق صلب بتوقيع العلامة مع دعم داخلي للقطعة.'
  ),
  (
    (select id from public.categories where slug = 'men-essential'),
    (select id from public.collections where slug = 'signature-essentials'),
    'Dune Kandura',
    'كندورة ديون',
    'dune-kandura',
    'A warm stone kandura built for daily luxury and clean movement.',
    'كندورة بلون حجري دافئ صُممت للفخامة اليومية والحركة النظيفة.',
    'The Dune Kandura softens the showroom palette while maintaining the same premium surface treatment.',
    'تلطف كندورة ديون لوحة ألوان المعرض مع الحفاظ على نفس المعالجة السطحية الفاخرة.',
    'Its lighter tone broadens the catalog without sacrificing the controlled, cinematic brand language.',
    'يوسع لونها الأخف الكتالوج من دون التفريط باللغة البصرية المنضبطة والسينمائية للعلامة.',
    360,
    'USD',
    array['Essential Edit', 'Warm Neutral'],
    array['تحرير أساسي', 'درجة دافئة'],
    array['Premium cotton blend', 'Soft matte trim', 'Breathable lining'],
    array['مزيج قطن فاخر', 'تفاصيل مطفية ناعمة', 'بطانة قابلة للتنفس'],
    array[
      'Premium cotton blend gives daily ease while preserving a refined matte surface.',
      'Soft trim detailing keeps the garment elevated without shifting into formalwear.'
    ],
    array[
      'يمنح مزيج القطن الفاخر راحة يومية مع الحفاظ على سطح مطفي راقٍ.',
      'تبقي التفاصيل الناعمة القطعة مرتفعة المستوى من دون أن تتحول إلى طابع رسمي كامل.'
    ],
    array[
      'Machine wash cold on a gentle cycle or dry clean for best finish retention.',
      'Hang dry and light steam to restore the line.'
    ],
    array[
      'تغسل بارداً على دورة لطيفة أو تنظف جافاً للحفاظ على أفضل تشطيب.',
      'تعلق حتى تجف مع تبخير خفيف لاستعادة الخط.'
    ],
    array[
      'Relaxed regular fit designed for daily movement and modest comfort.',
      'Choose your normal size for intended ease through the body.'
    ],
    array[
      'قصة منتظمة مريحة صُممت للحركة اليومية والراحة المحتشمة.',
      'اختر مقاسك المعتاد للراحة المقصودة عبر الجسم.'
    ],
    '[{"label":"Fit","value":"Relaxed regular fit"},{"label":"Length","value":"Full length"},{"label":"Weight","value":"Midweight"},{"label":"Care","value":"Machine wash cold"}]'::jsonb,
    '[{"label":"القصّة","value":"منتظمة مريحة"},{"label":"الطول","value":"طول كامل"},{"label":"الوزن","value":"متوسط"},{"label":"العناية","value":"غسيل بارد"}]'::jsonb,
    false,
    true,
    false,
    true,
    '360 daily edit view',
    'عرض الاستخدام اليومي 360',
    'Prepared for an everyday fit rotation that highlights movement and fabric texture.',
    'مهيأة لعرض يومي دائري يبرز الحركة وملمس القماش.',
    'The placeholder module keeps the media rail future-ready for richer catalog tools.',
    'تحافظ الوحدة الحالية على جاهزية مسار الوسائط لأدوات كتالوج أغنى لاحقاً.',
    'Dispatches in 2-3 business days.',
    'يُجهز خلال 2 إلى 3 أيام عمل.',
    'Tracked delivery with launch-period complimentary shipping.',
    'توصيل متتبع مع شحن مجاني خلال فترة الإطلاق.',
    'Returns accepted within 14 days on unworn pieces.',
    'يُقبل الإرجاع خلال 14 يوماً للقطع غير المستخدمة.',
    'Delivered in branded fold packaging with matte presentation sleeve.'
    ,
    'يصل داخل تغليف مطوي يحمل هوية العلامة مع غلاف عرض مطفي.'
  ),
  (
    (select id from public.categories where slug = 'women-occasion'),
    (select id from public.collections where slug = 'signature-essentials'),
    'Qamar Set',
    'طقم قمر',
    'qamar-set',
    'A coordinated modest set with luminous contrast and quiet tailoring.',
    'طقم محتشم منسق بتباين مضيء وتفصيل هادئ.',
    'The Qamar Set combines an elongated overlayer and matching underdress for elegant, modular dressing.',
    'يجمع طقم قمر بين طبقة علوية طويلة وفستان داخلي منسق لارتداء أنيق متعدد الاستخدام.',
    'It is intended to photograph as a single reflective silhouette while remaining practical for repeat wear.',
    'صُمم ليُصوَّر كخط انعكاسي واحد مع بقائه عملياً للاستخدام المتكرر.',
    460,
    'USD',
    array['Occasion Set', 'Layered Pairing'],
    array['طقم مناسبات', 'تنسيق متعدد الطبقات'],
    array['Silk-touch crepe', 'Satin facing', 'Featherweight lining'],
    array['كريب بملمس حريري', 'بطانة ساتانية', 'بطانة خفيفة جداً'],
    array[
      'Silk-touch crepe allows the set to move as one silhouette with subtle reflection.',
      'Featherweight lining keeps the layered build comfortable for occasion wear.'
    ],
    array[
      'يسمح الكريب الحريري للطقم بالحركة كخط واحد مع انعكاس خفيف.',
      'تحافظ البطانة الخفيفة جداً على راحة البناء متعدد الطبقات للمناسبات.'
    ],
    array[
      'Dry clean only to preserve the layered pairing and satin facings.',
      'Store the pieces together to maintain the intended set styling.'
    ],
    array[
      'يُنظف جافاً فقط للحفاظ على تنسيق الطبقات والبطانات الساتانية.',
      'تُحفظ القطعتان معاً للحفاظ على الأسلوب المقصود للطقم.'
    ],
    array[
      'Relaxed layered fit with an elongated overlayer and modest coverage.',
      'Take your usual size for balanced drape across both pieces.'
    ],
    array[
      'قصة مريحة متعددة الطبقات مع طبقة علوية مطولة وتغطية محتشمة.',
      'اختاري مقاسك المعتاد للحصول على انسياب متوازن عبر القطعتين.'
    ],
    '[{"label":"Fit","value":"Relaxed layered fit"},{"label":"Pieces","value":"Two-piece set"},{"label":"Coverage","value":"Full modest drape"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    '[{"label":"القصّة","value":"مريحة متعددة الطبقات"},{"label":"القطع","value":"طقم من قطعتين"},{"label":"التغطية","value":"انسياب محتشم كامل"},{"label":"العناية","value":"تنظيف جاف فقط"}]'::jsonb,
    false,
    true,
    false,
    true,
    '360 layered view',
    'عرض الطبقات 360',
    'Reserved for a future module that shows how the overlayer and underdress move together.',
    'مخصص لوحدة مستقبلية تُظهر حركة الطبقة العلوية والفستان الداخلي معاً.',
    'Still photography is active now while preserving the same premium viewer slot.',
    'التصوير الثابت يعمل الآن مع الحفاظ على نفس مساحة المشاهد الفاخر.',
    'Dispatches in 2-4 business days.',
    'يُجهز خلال 2 إلى 4 أيام عمل.',
    'Tracked insured delivery with signature confirmation available.',
    'شحن متتبع ومؤمن مع خيار تأكيد التوقيع.',
    'Returns accepted within 14 days on unworn pieces with all components included.',
    'يُقبل الإرجاع خلال 14 يوماً للقطع غير المستخدمة مع جميع المكونات.',
    'Presented in matte packaging with layered garment wrap for both pieces.'
    ,
    'يُقدم داخل تغليف مطفي مع لف فاخر متعدد الطبقات للقطعتين.'
  )
on conflict (slug) do update
set
  category_id = excluded.category_id,
  collection_id = excluded.collection_id,
  name = excluded.name,
  name_ar = excluded.name_ar,
  short_description = excluded.short_description,
  short_description_ar = excluded.short_description_ar,
  description = excluded.description,
  description_ar = excluded.description_ar,
  story = excluded.story,
  story_ar = excluded.story_ar,
  base_price = excluded.base_price,
  currency_code = excluded.currency_code,
  tags = excluded.tags,
  tags_ar = excluded.tags_ar,
  materials = excluded.materials,
  materials_ar = excluded.materials_ar,
  fabric_notes = excluded.fabric_notes,
  fabric_notes_ar = excluded.fabric_notes_ar,
  care_notes = excluded.care_notes,
  care_notes_ar = excluded.care_notes_ar,
  fit_notes = excluded.fit_notes,
  fit_notes_ar = excluded.fit_notes_ar,
  specs = excluded.specs,
  specs_ar = excluded.specs_ar,
  limited_edition = excluded.limited_edition,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured,
  viewer_360_enabled = excluded.viewer_360_enabled,
  viewer_360_label = excluded.viewer_360_label,
  viewer_360_label_ar = excluded.viewer_360_label_ar,
  viewer_360_description = excluded.viewer_360_description,
  viewer_360_description_ar = excluded.viewer_360_description_ar,
  viewer_360_note = excluded.viewer_360_note,
  viewer_360_note_ar = excluded.viewer_360_note_ar,
  shipping_lead_time = excluded.shipping_lead_time,
  shipping_lead_time_ar = excluded.shipping_lead_time_ar,
  shipping_delivery = excluded.shipping_delivery,
  shipping_delivery_ar = excluded.shipping_delivery_ar,
  shipping_returns = excluded.shipping_returns,
  shipping_returns_ar = excluded.shipping_returns_ar,
  shipping_presentation = excluded.shipping_presentation,
  shipping_presentation_ar = excluded.shipping_presentation_ar,
  updated_at = timezone('utc', now());

insert into public.product_images (
  product_id,
  alt_text,
  alt_text_ar,
  label,
  label_ar,
  angle,
  angle_ar,
  note,
  note_ar,
  tone,
  sort_order,
  is_primary
)
values
  ((select id from public.products where slug = 'obsidian-thobe'), 'Obsidian Thobe front studio angle', 'ثوب أوبسيديان من الأمام داخل الاستوديو', 'Hero frame', 'اللقطة الرئيسية', 'Front studio', 'الواجهة الأمامية', 'Hard key light', 'إضاءة رئيسية حادة', 'obsidian', 0, true),
  ((select id from public.products where slug = 'obsidian-thobe'), 'Obsidian Thobe profile angle', 'ثوب أوبسيديان من الجانب', 'Second angle', 'اللقطة الثانية', 'Profile view', 'منظر جانبي', 'Shadow-led contour', 'تحديد يقوده الظل', 'obsidian', 1, false),
  ((select id from public.products where slug = 'obsidian-thobe'), 'Obsidian Thobe detail crop', 'تفصيل قريب لثوب أوبسيديان', 'Detail crop', 'لقطة التفاصيل', 'Finish detail', 'تفصيل التشطيب', 'Trim focus', 'تركيز على الحافة', 'bronze', 2, false),
  ((select id from public.products where slug = 'rimal-bisht'), 'Rimal Bisht front drape', 'بشت رمال من الأمام', 'Hero frame', 'اللقطة الرئيسية', 'Front drape', 'الانسياب الأمامي', 'Reflective trim', 'تفاصيل عاكسة', 'bronze', 0, true),
  ((select id from public.products where slug = 'rimal-bisht'), 'Rimal Bisht side volume', 'بشت رمال من الجانب', 'Second angle', 'اللقطة الثانية', 'Side volume', 'الحجم الجانبي', 'Layer structure', 'بنية الطبقات', 'stone', 1, false),
  ((select id from public.products where slug = 'rimal-bisht'), 'Rimal Bisht braid detail', 'تفصيل شريط بشت رمال', 'Detail crop', 'لقطة التفاصيل', 'Braid finish', 'تفصيل الحافة', 'Hand edge work', 'تشطيب طرفي يدوي', 'bronze', 2, false),
  ((select id from public.products where slug = 'safa-abaya'), 'Safa Abaya front silhouette', 'عباية صفا من الأمام', 'Hero frame', 'اللقطة الرئيسية', 'Front silhouette', 'الواجهة الأمامية', 'Soft spotlight', 'إضاءة ناعمة مركزة', 'obsidian', 0, true),
  ((select id from public.products where slug = 'safa-abaya'), 'Safa Abaya back fall', 'عباية صفا من الخلف', 'Second angle', 'اللقطة الثانية', 'Back fall', 'الانسياب الخلفي', 'Drape emphasis', 'تركيز على الانسياب', 'stone', 1, false),
  ((select id from public.products where slug = 'safa-abaya'), 'Safa Abaya cuff detail', 'تفصيل كم عباية صفا', 'Detail crop', 'لقطة التفاصيل', 'Cuff finish', 'تفصيل الكم', 'Subtle sheen', 'لمعة خفيفة', 'pearl', 2, false),
  ((select id from public.products where slug = 'atlas-jubbah'), 'Atlas Jubbah front architecture', 'جبّة أطلس من الأمام', 'Hero frame', 'اللقطة الرئيسية', 'Front architecture', 'البنية الأمامية', 'Structured light', 'إضاءة مبنية', 'obsidian', 0, true),
  ((select id from public.products where slug = 'atlas-jubbah'), 'Atlas Jubbah sleeve profile', 'جانب كم جبّة أطلس', 'Second angle', 'اللقطة الثانية', 'Sleeve profile', 'منظر الكم الجانبي', 'Vertical cut', 'قصة عمودية', 'stone', 1, false),
  ((select id from public.products where slug = 'atlas-jubbah'), 'Atlas Jubbah collar detail', 'تفصيل ياقة جبّة أطلس', 'Detail crop', 'لقطة التفاصيل', 'Collar finish', 'تفصيل الياقة', 'Panel contrast', 'تباين الألواح', 'bronze', 2, false),
  ((select id from public.products where slug = 'dune-kandura'), 'Dune Kandura front balance', 'كندورة ديون من الأمام', 'Hero frame', 'اللقطة الرئيسية', 'Front balance', 'التوازن الأمامي', 'Warm key light', 'إضاءة دافئة رئيسية', 'stone', 0, true),
  ((select id from public.products where slug = 'dune-kandura'), 'Dune Kandura side movement', 'كندورة ديون من الجانب', 'Second angle', 'اللقطة الثانية', 'Side movement', 'الحركة الجانبية', 'Relaxed drape', 'انسياب مريح', 'pearl', 1, false),
  ((select id from public.products where slug = 'dune-kandura'), 'Dune Kandura fabric grain detail', 'تفصيل نسيج كندورة ديون', 'Detail crop', 'لقطة التفاصيل', 'Fabric grain', 'ملمس القماش', 'Texture focus', 'تركيز على الملمس', 'stone', 2, false),
  ((select id from public.products where slug = 'qamar-set'), 'Qamar Set full set image', 'صورة كاملة لطقم قمر', 'Hero frame', 'اللقطة الرئيسية', 'Full set', 'الطقم الكامل', 'Front composition', 'تكوين أمامي', 'pearl', 0, true),
  ((select id from public.products where slug = 'qamar-set'), 'Qamar Set layer profile', 'طقم قمر من الجانب', 'Second angle', 'اللقطة الثانية', 'Layer profile', 'منظر الطبقات', 'Tone-on-tone finish', 'تشطيب متناغم', 'stone', 1, false),
  ((select id from public.products where slug = 'qamar-set'), 'Qamar Set trim close-up', 'تفصيل حافة طقم قمر', 'Detail crop', 'لقطة التفاصيل', 'Trim close-up', 'لقطة الحافة', 'Low-sheen edge', 'حافة بلمعة منخفضة', 'bronze', 2, false)
on conflict (product_id, sort_order) do update
set
  alt_text = excluded.alt_text,
  alt_text_ar = excluded.alt_text_ar,
  label = excluded.label,
  label_ar = excluded.label_ar,
  angle = excluded.angle,
  angle_ar = excluded.angle_ar,
  note = excluded.note,
  note_ar = excluded.note_ar,
  tone = excluded.tone,
  is_primary = excluded.is_primary;

insert into public.product_variants (
  product_id,
  sku,
  size,
  color,
  stock_quantity,
  is_active,
  position
)
values
  ((select id from public.products where slug = 'obsidian-thobe'), 'KRV-OBS-THB-S', 'S', null, 6, true, 10),
  ((select id from public.products where slug = 'obsidian-thobe'), 'KRV-OBS-THB-M', 'M', null, 8, true, 20),
  ((select id from public.products where slug = 'obsidian-thobe'), 'KRV-OBS-THB-L', 'L', null, 7, true, 30),
  ((select id from public.products where slug = 'obsidian-thobe'), 'KRV-OBS-THB-XL', 'XL', null, 4, true, 40),
  ((select id from public.products where slug = 'rimal-bisht'), 'KRV-RIM-BSH-M', 'M', null, 5, true, 10),
  ((select id from public.products where slug = 'rimal-bisht'), 'KRV-RIM-BSH-L', 'L', null, 6, true, 20),
  ((select id from public.products where slug = 'rimal-bisht'), 'KRV-RIM-BSH-XL', 'XL', null, 3, true, 30),
  ((select id from public.products where slug = 'safa-abaya'), 'KRV-SAF-ABY-XS', 'XS', null, 4, true, 10),
  ((select id from public.products where slug = 'safa-abaya'), 'KRV-SAF-ABY-S', 'S', null, 8, true, 20),
  ((select id from public.products where slug = 'safa-abaya'), 'KRV-SAF-ABY-M', 'M', null, 7, true, 30),
  ((select id from public.products where slug = 'safa-abaya'), 'KRV-SAF-ABY-L', 'L', null, 5, true, 40),
  ((select id from public.products where slug = 'atlas-jubbah'), 'KRV-ATL-JUB-S', 'S', null, 3, true, 10),
  ((select id from public.products where slug = 'atlas-jubbah'), 'KRV-ATL-JUB-M', 'M', null, 5, true, 20),
  ((select id from public.products where slug = 'atlas-jubbah'), 'KRV-ATL-JUB-L', 'L', null, 4, true, 30),
  ((select id from public.products where slug = 'atlas-jubbah'), 'KRV-ATL-JUB-XL', 'XL', null, 2, true, 40),
  ((select id from public.products where slug = 'dune-kandura'), 'KRV-DUN-KAN-S', 'S', null, 10, true, 10),
  ((select id from public.products where slug = 'dune-kandura'), 'KRV-DUN-KAN-M', 'M', null, 12, true, 20),
  ((select id from public.products where slug = 'dune-kandura'), 'KRV-DUN-KAN-L', 'L', null, 11, true, 30),
  ((select id from public.products where slug = 'dune-kandura'), 'KRV-DUN-KAN-XL', 'XL', null, 9, true, 40),
  ((select id from public.products where slug = 'qamar-set'), 'KRV-QMR-SET-XS', 'XS', null, 4, true, 10),
  ((select id from public.products where slug = 'qamar-set'), 'KRV-QMR-SET-S', 'S', null, 6, true, 20),
  ((select id from public.products where slug = 'qamar-set'), 'KRV-QMR-SET-M', 'M', null, 5, true, 30),
  ((select id from public.products where slug = 'qamar-set'), 'KRV-QMR-SET-L', 'L', null, 3, true, 40)
on conflict (sku) do update
set
  product_id = excluded.product_id,
  size = excluded.size,
  color = excluded.color,
  stock_quantity = excluded.stock_quantity,
  is_active = excluded.is_active,
  position = excluded.position,
  updated_at = timezone('utc', now());
