insert into public.categories (
  name,
  slug,
  description,
  sort_order,
  is_active,
  is_featured
)
values
  (
    'Men / Signature',
    'men-signature',
    'Tailored men''s signature silhouettes for ceremonial and evening presentation.',
    10,
    true,
    true
  ),
  (
    'Outerwear / Ceremony',
    'outerwear-ceremony',
    'Layered ceremonial outerwear with stronger trim and formal proportion.',
    20,
    true,
    true
  ),
  (
    'Women / Signature',
    'women-signature',
    'Core women''s signature pieces with fluid drape and refined finishing.',
    30,
    true,
    true
  ),
  (
    'Men / Limited',
    'men-limited',
    'Limited-release men''s pieces built with stronger structure and rarity cues.',
    40,
    true,
    true
  ),
  (
    'Men / Essential',
    'men-essential',
    'Daily luxury menswear with softer tonality and practical movement.',
    50,
    true,
    false
  ),
  (
    'Women / Occasion',
    'women-occasion',
    'Refined women''s occasionwear designed for layered modest dressing.',
    60,
    true,
    false
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured,
  updated_at = timezone('utc', now());

insert into public.collections (
  name,
  slug,
  eyebrow,
  description,
  highlight,
  tone,
  sort_order,
  is_active,
  is_featured
)
values
  (
    'Atelier Noir',
    'atelier-noir',
    'Signature capsule',
    'The darkest expression of Kravexo: architectural silhouettes, satin restraint, and hard-lit elegance.',
    'Built for evening entrances and low-light product storytelling.',
    'obsidian',
    10,
    true,
    true
  ),
  (
    'Ceremony Edit',
    'ceremony-edit',
    'Occasion wardrobe',
    'Statement modest wear intended for Eid, formal evenings, and refined layered dressing.',
    'Richer trim, stronger reflection, and ceremonial proportion.',
    'bronze',
    20,
    true,
    true
  ),
  (
    'Signature Essentials',
    'signature-essentials',
    'Daily luxury',
    'Year-round pieces with softer tonality and the same premium presentation language.',
    'Designed to scale into a broad catalog without losing the showroom feel.',
    'stone',
    30,
    true,
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  eyebrow = excluded.eyebrow,
  description = excluded.description,
  highlight = excluded.highlight,
  tone = excluded.tone,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured,
  updated_at = timezone('utc', now());

insert into public.products (
  category_id,
  collection_id,
  name,
  slug,
  short_description,
  description,
  story,
  base_price,
  currency_code,
  tags,
  materials,
  fabric_notes,
  care_notes,
  fit_notes,
  specs,
  limited_edition,
  is_active,
  is_featured,
  viewer_360_enabled,
  viewer_360_label,
  viewer_360_description,
  viewer_360_note,
  shipping_lead_time,
  shipping_delivery,
  shipping_returns,
  shipping_presentation
)
values
  (
    (select id from public.categories where slug = 'men-signature'),
    (select id from public.collections where slug = 'atelier-noir'),
    'Obsidian Thobe',
    'obsidian-thobe',
    'A sharply tailored black thobe with satin-edged restraint.',
    'Built with a dense fluid drape and precise line control, the Obsidian Thobe is designed to feel ceremonial without excess.',
    'The silhouette stays clean under strong light, allowing the cloth, fall, and finishing to do the work.',
    420,
    'USD',
    array['Launch Piece', 'Evening Tailoring'],
    array['Italian matte crepe', 'Satin piping', 'Soft shoulder structure'],
    array[
      'Dense matte crepe keeps the silhouette controlled under directional light.',
      'Satin edging adds a restrained line of reflection along the placket and cuff.'
    ],
    array[
      'Dry clean only to protect the finish and preserve the structure.',
      'Steam from the interior to restore drape after storage or travel.'
    ],
    array[
      'Relaxed through the body with a clean shoulder line.',
      'Take your regular size for the intended ceremonial proportion.'
    ],
    '[{"label":"Fit","value":"Relaxed tailored"},{"label":"Length","value":"Full length"},{"label":"Closure","value":"Hidden placket"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    false,
    true,
    true,
    true,
    '360 showroom view',
    'Reserved for a future interactive spin built from controlled studio frames.',
    'Still angles are active for now while the layout remains ready for frame-sequence integration.',
    'Dispatches in 2-4 business days.',
    'Complimentary insured delivery on launch orders.',
    'Returns accepted within 14 days on unworn pieces.',
    'Delivered in a matte black presentation box with garment wrap.'
  ),
  (
    (select id from public.categories where slug = 'outerwear-ceremony'),
    (select id from public.collections where slug = 'ceremony-edit'),
    'Rimal Bisht',
    'rimal-bisht',
    'A structured bisht with polished trim and controlled volume.',
    'The Rimal Bisht introduces ceremonial presence through a wider drape, soft sheen, and sculpted front edge.',
    'Designed as a spotlight layer, it frames the silhouette instead of overpowering it.',
    560,
    'USD',
    array['Ceremony Edit', 'Layered'],
    array['Structured satin blend', 'Metallic edge braid', 'Silk-touch lining'],
    array[
      'A structured satin blend gives the outer layer ceremony-level presence without excess stiffness.',
      'Reflective braid finishing is used sparingly so the edge catches light without becoming ornate.'
    ],
    array[
      'Professional dry clean only due to metallic trim and layered construction.',
      'Store on a broad hanger to keep the shoulder line crisp.'
    ],
    array[
      'Designed as an open ceremonial layer with generous movement.',
      'Size according to shoulder preference and intended underlayer.'
    ],
    '[{"label":"Fit","value":"Open ceremonial drape"},{"label":"Length","value":"Longline"},{"label":"Finish","value":"Metallic edge binding"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    true,
    true,
    true,
    true,
    '360 drape study',
    'Prepared for a future 360 layer view showing trim, volume, and movement in a single module.',
    'The current build uses stills but reserves the same footprint for richer drape presentation later.',
    'Dispatches in 3-5 business days.',
    'Insured global delivery with signature confirmation.',
    'Returns accepted within 14 days on unworn ceremonial pieces.',
    'Presented in a structured black box with protective garment sleeve.'
  ),
  (
    (select id from public.categories where slug = 'women-signature'),
    (select id from public.collections where slug = 'ceremony-edit'),
    'Safa Abaya',
    'safa-abaya',
    'A quiet black abaya cut for movement, gloss, and clean proportion.',
    'The Safa Abaya balances modest volume with an elevated shoulder line and a minimal closure system.',
    'Each panel is intended to read as a soft reflection surface under low light.',
    480,
    'USD',
    array['Women''s Capsule', 'Fluid Cut'],
    array['Japanese nida', 'Silk-touch facing', 'Fine cuff structure'],
    array[
      'Japanese nida provides fluid movement with a softly polished surface.',
      'Silk-touch facings keep interior finish elevated without adding visual noise.'
    ],
    array[
      'Dry clean only to maintain the finish and cuff structure.',
      'Store buttoned lightly to preserve the front line.'
    ],
    array[
      'Fluid relaxed cut with full modest coverage and quiet volume.',
      'Choose your usual size for intended ease or size down for a closer shoulder line.'
    ],
    '[{"label":"Fit","value":"Fluid relaxed"},{"label":"Length","value":"Full length"},{"label":"Closure","value":"Hidden hook closure"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    false,
    true,
    true,
    true,
    '360 silhouette view',
    'Planned for a full silhouette rotation focused on movement, fall, and cuff finishing.',
    'The gallery already reserves a dedicated module for future frame-based viewing.',
    'Dispatches in 2-4 business days.',
    'Complimentary insured shipping for launch-region orders.',
    'Returns accepted within 14 days on unworn pieces with original presentation.',
    'Wrapped in soft black tissue with matte branded outer packaging.'
  ),
  (
    (select id from public.categories where slug = 'men-limited'),
    (select id from public.collections where slug = 'atelier-noir'),
    'Atlas Jubbah',
    'atlas-jubbah',
    'An architectural jubbah with sharp verticals and low-sheen depth.',
    'The Atlas Jubbah is cut to create a column effect, with measured structure through the chest and sleeves.',
    'It is built for premium product photography: shape-first, minimal, and sharply outlined.',
    510,
    'USD',
    array['Limited Capsule', 'Architectural'],
    array['Compact wool blend', 'Matte satin inset', 'Reinforced collar'],
    array[
      'Compact wool blend holds the column silhouette and reads sharply in low light.',
      'Matte satin insets add tonal depth without breaking the restrained composition.'
    ],
    array[
      'Dry clean only for collar structure and panel integrity.',
      'Use a garment brush between wears to preserve the matte finish.'
    ],
    array[
      'Structured straight fit designed to read as a clean vertical line.',
      'Take your standard size for the intended architectural shape.'
    ],
    '[{"label":"Fit","value":"Structured straight fit"},{"label":"Length","value":"Ankle length"},{"label":"Collar","value":"Stand collar"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    true,
    true,
    true,
    true,
    '360 structure view',
    'Designed for a future viewer focused on collar architecture, sleeve line, and panel transitions.',
    'This product is already staged for richer 360 storytelling once real imagery is added.',
    'Dispatches in 3-5 business days.',
    'Global insured delivery with signature confirmation.',
    'Returns accepted within 14 days on unworn pieces.',
    'Boxed in a signature rigid case with interior garment support.'
  ),
  (
    (select id from public.categories where slug = 'men-essential'),
    (select id from public.collections where slug = 'signature-essentials'),
    'Dune Kandura',
    'dune-kandura',
    'A warm stone kandura built for daily luxury and clean movement.',
    'The Dune Kandura softens the showroom palette while maintaining the same premium surface treatment.',
    'Its lighter tone broadens the catalog without sacrificing the controlled, cinematic brand language.',
    360,
    'USD',
    array['Essential Edit', 'Warm Neutral'],
    array['Premium cotton blend', 'Soft matte trim', 'Breathable lining'],
    array[
      'Premium cotton blend gives daily ease while preserving a refined matte surface.',
      'Soft trim detailing keeps the garment elevated without shifting into formalwear.'
    ],
    array[
      'Machine wash cold on a gentle cycle or dry clean for best finish retention.',
      'Hang dry and light steam to restore the line.'
    ],
    array[
      'Relaxed regular fit designed for daily movement and modest comfort.',
      'Choose your normal size for intended ease through the body.'
    ],
    '[{"label":"Fit","value":"Relaxed regular fit"},{"label":"Length","value":"Full length"},{"label":"Weight","value":"Midweight"},{"label":"Care","value":"Machine wash cold"}]'::jsonb,
    false,
    true,
    false,
    true,
    '360 daily edit view',
    'Prepared for an everyday fit rotation that highlights movement and fabric texture.',
    'The placeholder module keeps the media rail future-ready for richer catalog tools.',
    'Dispatches in 2-3 business days.',
    'Tracked delivery with launch-period complimentary shipping.',
    'Returns accepted within 14 days on unworn pieces.',
    'Delivered in branded fold packaging with matte presentation sleeve.'
  ),
  (
    (select id from public.categories where slug = 'women-occasion'),
    (select id from public.collections where slug = 'signature-essentials'),
    'Qamar Set',
    'qamar-set',
    'A coordinated modest set with luminous contrast and quiet tailoring.',
    'The Qamar Set combines an elongated overlayer and matching underdress for elegant, modular dressing.',
    'It is intended to photograph as a single reflective silhouette while remaining practical for repeat wear.',
    460,
    'USD',
    array['Occasion Set', 'Layered Pairing'],
    array['Silk-touch crepe', 'Satin facing', 'Featherweight lining'],
    array[
      'Silk-touch crepe allows the set to move as one silhouette with subtle reflection.',
      'Featherweight lining keeps the layered build comfortable for occasion wear.'
    ],
    array[
      'Dry clean only to preserve the layered pairing and satin facings.',
      'Store the pieces together to maintain the intended set styling.'
    ],
    array[
      'Relaxed layered fit with an elongated overlayer and modest coverage.',
      'Take your usual size for balanced drape across both pieces.'
    ],
    '[{"label":"Fit","value":"Relaxed layered fit"},{"label":"Pieces","value":"Two-piece set"},{"label":"Coverage","value":"Full modest drape"},{"label":"Care","value":"Dry clean only"}]'::jsonb,
    false,
    true,
    false,
    true,
    '360 layered view',
    'Reserved for a future module that shows how the overlayer and underdress move together.',
    'Still photography is active now while preserving the same premium viewer slot.',
    'Dispatches in 2-4 business days.',
    'Tracked insured delivery with signature confirmation available.',
    'Returns accepted within 14 days on unworn pieces with all components included.',
    'Presented in matte packaging with layered garment wrap for both pieces.'
  )
on conflict (slug) do update
set
  category_id = excluded.category_id,
  collection_id = excluded.collection_id,
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  story = excluded.story,
  base_price = excluded.base_price,
  currency_code = excluded.currency_code,
  tags = excluded.tags,
  materials = excluded.materials,
  fabric_notes = excluded.fabric_notes,
  care_notes = excluded.care_notes,
  fit_notes = excluded.fit_notes,
  specs = excluded.specs,
  limited_edition = excluded.limited_edition,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured,
  viewer_360_enabled = excluded.viewer_360_enabled,
  viewer_360_label = excluded.viewer_360_label,
  viewer_360_description = excluded.viewer_360_description,
  viewer_360_note = excluded.viewer_360_note,
  shipping_lead_time = excluded.shipping_lead_time,
  shipping_delivery = excluded.shipping_delivery,
  shipping_returns = excluded.shipping_returns,
  shipping_presentation = excluded.shipping_presentation,
  updated_at = timezone('utc', now());

insert into public.product_images (
  product_id,
  alt_text,
  label,
  angle,
  note,
  tone,
  sort_order,
  is_primary
)
values
  ((select id from public.products where slug = 'obsidian-thobe'), 'Obsidian Thobe front studio angle', 'Hero frame', 'Front studio', 'Hard key light', 'obsidian', 0, true),
  ((select id from public.products where slug = 'obsidian-thobe'), 'Obsidian Thobe profile angle', 'Second angle', 'Profile view', 'Shadow-led contour', 'obsidian', 1, false),
  ((select id from public.products where slug = 'obsidian-thobe'), 'Obsidian Thobe detail crop', 'Detail crop', 'Finish detail', 'Trim focus', 'bronze', 2, false),
  ((select id from public.products where slug = 'rimal-bisht'), 'Rimal Bisht front drape', 'Hero frame', 'Front drape', 'Reflective trim', 'bronze', 0, true),
  ((select id from public.products where slug = 'rimal-bisht'), 'Rimal Bisht side volume', 'Second angle', 'Side volume', 'Layer structure', 'stone', 1, false),
  ((select id from public.products where slug = 'rimal-bisht'), 'Rimal Bisht braid detail', 'Detail crop', 'Braid finish', 'Hand edge work', 'bronze', 2, false),
  ((select id from public.products where slug = 'safa-abaya'), 'Safa Abaya front silhouette', 'Hero frame', 'Front silhouette', 'Soft spotlight', 'obsidian', 0, true),
  ((select id from public.products where slug = 'safa-abaya'), 'Safa Abaya back fall', 'Second angle', 'Back fall', 'Drape emphasis', 'stone', 1, false),
  ((select id from public.products where slug = 'safa-abaya'), 'Safa Abaya cuff detail', 'Detail crop', 'Cuff finish', 'Subtle sheen', 'pearl', 2, false),
  ((select id from public.products where slug = 'atlas-jubbah'), 'Atlas Jubbah front architecture', 'Hero frame', 'Front architecture', 'Structured light', 'obsidian', 0, true),
  ((select id from public.products where slug = 'atlas-jubbah'), 'Atlas Jubbah sleeve profile', 'Second angle', 'Sleeve profile', 'Vertical cut', 'stone', 1, false),
  ((select id from public.products where slug = 'atlas-jubbah'), 'Atlas Jubbah collar detail', 'Detail crop', 'Collar finish', 'Panel contrast', 'bronze', 2, false),
  ((select id from public.products where slug = 'dune-kandura'), 'Dune Kandura front balance', 'Hero frame', 'Front balance', 'Warm key light', 'stone', 0, true),
  ((select id from public.products where slug = 'dune-kandura'), 'Dune Kandura side movement', 'Second angle', 'Side movement', 'Relaxed drape', 'pearl', 1, false),
  ((select id from public.products where slug = 'dune-kandura'), 'Dune Kandura fabric grain detail', 'Detail crop', 'Fabric grain', 'Texture focus', 'stone', 2, false),
  ((select id from public.products where slug = 'qamar-set'), 'Qamar Set full set image', 'Hero frame', 'Full set', 'Front composition', 'pearl', 0, true),
  ((select id from public.products where slug = 'qamar-set'), 'Qamar Set layer profile', 'Second angle', 'Layer profile', 'Tone-on-tone finish', 'stone', 1, false),
  ((select id from public.products where slug = 'qamar-set'), 'Qamar Set trim close-up', 'Detail crop', 'Trim close-up', 'Low-sheen edge', 'bronze', 2, false)
on conflict (product_id, sort_order) do update
set
  alt_text = excluded.alt_text,
  label = excluded.label,
  angle = excluded.angle,
  note = excluded.note,
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
