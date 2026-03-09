import type { Locale } from "./config";

const adminTaxonomyCopy = {
  en: {
    categories: {
      list: {
        eyebrow: "Admin categories",
        title: "Category control for the live Kravexo catalog.",
        description:
          "Manage category identity, bilingual copy, publishing state, and product assignment visibility without touching the database directly.",
        note:
          "Categories keep the existing storefront filters and product assignments intact. Product counts are shown here so structural edits stay visible before you publish changes.",
        count: "Categories",
        active: "Active",
        assignedProducts: "Assigned products",
        unused: "Unused",
        updateError: "Update error",
        updateSaved: "Update saved",
        activeUpdated: "Category publishing state updated.",
        emptyTitle: "No categories exist in the catalog yet.",
        emptyDescription:
          "Create the first category here, then assign products to it from the product editor.",
      },
      newPage: {
        eyebrow: "Create category",
        title: "Add a new category to the Kravexo catalog structure.",
        description:
          "Define the category identity, bilingual description, and publishing state in one admin flow.",
        note:
          "This first pass keeps category management focused on content, slug stability, and storefront compatibility.",
      },
      editPage: {
        eyebrow: "Edit category",
        description:
          "Update bilingual category copy, publishing state, and ordering without disturbing product assignments.",
        note:
          "Products already linked to this category will keep their assignments while the public storefront refreshes behind the same routes.",
        createdMessage:
          "Category created successfully. You can continue refining its bilingual content here.",
        updatedMessage:
          "Category changes saved and affected storefront/admin pages revalidated.",
      },
      card: {
        active: "Active",
        inactive: "Inactive",
        products: "Products",
        updated: "Updated",
        edit: "Edit category",
        deactivate: "Deactivate",
        activate: "Activate",
      },
      form: {
        saveError: "Save error",
        saved: "Saved",
        identity: "Identity",
        bilingual: "Bilingual content",
        presentation: "Presentation",
        publishingState: "Publishing state",
        nameEn: "Name (English)",
        nameAr: "Name (Arabic)",
        slug: "Slug",
        slugHint: "Leave blank to generate from the English name.",
        descriptionEn: "Description (English)",
        descriptionAr: "Description (Arabic)",
        sortOrder: "Sort order",
        sortOrderHint:
          "Lower numbers appear first in admin options and storefront ordering.",
        presentationNoteTitle: "Schema note",
        presentationNoteBody:
          "The current category schema does not include a dedicated image field, so this admin pass focuses on identity, description, and ordering only.",
        active: "Category active",
        activeHint:
          "Inactive categories remain editable but should not appear in the public catalog.",
        create: "Create category",
        save: "Save category",
        editorNote: "Editor note",
        editorBody:
          "Slugs stay unique, bilingual fields remain aligned, and affected storefront/admin pages are revalidated after every save.",
        record: "Category record",
        created: "Created",
        updated: "Updated",
      },
      actions: {
        invalidState: "Category state update was invalid.",
        referenceMissing: "Category reference is missing.",
        notFound: "Category could not be found.",
        createFailed: "Category creation failed.",
        updateFailed: "Category update failed.",
        slugInUse: "This category slug is already in use.",
      },
    },
    collections: {
      list: {
        eyebrow: "Admin collections",
        title: "Editorial collection control for Kravexo.",
        description:
          "Manage collection identity, bilingual editorial copy, tone, featured state, and publishing visibility from the admin area.",
        note:
          "Collections remain compatible with the existing storefront routes and product assignments. Featured state still drives homepage and editorial presentation.",
        count: "Collections",
        active: "Active",
        featured: "Featured",
        assignedProducts: "Assigned products",
        updateError: "Update error",
        updateSaved: "Update saved",
        activeUpdated: "Collection publishing state updated.",
        emptyTitle: "No collections exist in the catalog yet.",
        emptyDescription:
          "Create the first collection here, then assign products to it from the product editor.",
      },
      newPage: {
        eyebrow: "Create collection",
        title: "Add a new editorial collection to the live catalog.",
        description:
          "Define collection identity, bilingual copy, showroom tone, featured state, and publishing state in one admin flow.",
        note:
          "This editor keeps the existing storefront collection routes intact while giving the admin side real merchandising control.",
      },
      editPage: {
        eyebrow: "Edit collection",
        description:
          "Refine collection copy, editorial labels, tone, featured state, and publishing visibility without breaking existing product links.",
        note:
          "The storefront keeps reading the same collection records. This editor only changes the live merchandising data behind those routes.",
        createdMessage:
          "Collection created successfully. You can continue refining its editorial presentation here.",
        updatedMessage:
          "Collection changes saved and affected storefront/admin pages revalidated.",
      },
      card: {
        active: "Active",
        inactive: "Inactive",
        featured: "Featured",
        standard: "Standard",
        products: "Products",
        tone: "Tone",
        updated: "Updated",
        edit: "Edit collection",
        deactivate: "Deactivate",
        activate: "Activate",
      },
      form: {
        saveError: "Save error",
        saved: "Saved",
        identity: "Identity",
        bilingual: "Bilingual content",
        visuals: "Visual and editorial settings",
        publishingState: "Publishing state",
        nameEn: "Name (English)",
        nameAr: "Name (Arabic)",
        slug: "Slug",
        slugHint: "Leave blank to generate from the English name.",
        descriptionEn: "Description (English)",
        descriptionAr: "Description (Arabic)",
        eyebrowEn: "Eyebrow (English)",
        eyebrowAr: "Eyebrow (Arabic)",
        highlightEn: "Highlight note (English)",
        highlightAr: "Highlight note (Arabic)",
        tone: "Tone",
        sortOrder: "Sort order",
        sortOrderHint:
          "Lower numbers appear first in collection lists and editorial ordering.",
        visualsNoteTitle: "Schema note",
        visualsNoteBody:
          "The current collection schema does not include a dedicated image field, so this admin pass focuses on editorial tone and messaging instead.",
        active: "Collection active",
        activeHint:
          "Inactive collections remain editable but should disappear from the public storefront.",
        featured: "Featured collection",
        featuredHint:
          "Featured collections can be used in homepage and editorial collection surfaces.",
        create: "Create collection",
        save: "Save collection",
        editorNote: "Editor note",
        editorBody:
          "Slugs remain unique, editorial fields stay bilingual, and affected storefront/admin pages are revalidated after every save.",
        record: "Collection record",
        created: "Created",
        updated: "Updated",
      },
      tones: {
        obsidian: "Obsidian",
        stone: "Stone",
        bronze: "Bronze",
        pearl: "Pearl",
      },
      actions: {
        invalidState: "Collection state update was invalid.",
        referenceMissing: "Collection reference is missing.",
        notFound: "Collection could not be found.",
        createFailed: "Collection creation failed.",
        updateFailed: "Collection update failed.",
        slugInUse: "This collection slug is already in use.",
      },
    },
  },
  ar: {
    categories: {
      list: {
        eyebrow: "فئات الإدارة",
        title: "تحكم كامل بفئات كتالوج كرافكسو الحي.",
        description:
          "أدر هوية الفئة ومحتواها الثنائي وحالة نشرها ووضوح ارتباط المنتجات بها من داخل الإدارة مباشرة.",
        note:
          "تحافظ الفئات على الفلاتر الحالية وروابط المنتجات كما هي. ويظهر عدد المنتجات هنا حتى تبقى التأثيرات الهيكلية واضحة قبل نشر أي تعديل.",
        count: "الفئات",
        active: "النشطة",
        assignedProducts: "المنتجات المرتبطة",
        unused: "غير المستخدمة",
        updateError: "خطأ في التحديث",
        updateSaved: "تم حفظ التحديث",
        activeUpdated: "تم تحديث حالة نشر الفئة.",
        emptyTitle: "لا توجد فئات داخل الكتالوج بعد.",
        emptyDescription:
          "أنشئ أول فئة هنا، ثم اربط المنتجات بها من خلال محرر المنتجات.",
      },
      newPage: {
        eyebrow: "إنشاء فئة",
        title: "أضف فئة جديدة إلى بنية كتالوج كرافكسو.",
        description:
          "عرّف هوية الفئة ووصفها الثنائي وحالة نشرها ضمن مسار إداري واحد.",
        note:
          "تركز هذه المرحلة الأولى على المحتوى وثبات المعرّف والتوافق مع واجهات المتجر الحالية.",
      },
      editPage: {
        eyebrow: "تعديل الفئة",
        description:
          "حدّث النصوص الثنائية للفئة وحالة نشرها وترتيبها دون المساس بارتباطات المنتجات الحالية.",
        note:
          "ستبقى المنتجات المرتبطة بهذه الفئة على حالها بينما يعاد تحديث المتجر العام خلف المسارات نفسها.",
        createdMessage:
          "تم إنشاء الفئة بنجاح. يمكنك متابعة تحسين محتواها الثنائي من هنا.",
        updatedMessage:
          "تم حفظ تغييرات الفئة وإعادة تهيئة الصفحات المتأثرة في المتجر والإدارة.",
      },
      card: {
        active: "نشطة",
        inactive: "غير نشطة",
        products: "المنتجات",
        updated: "آخر تحديث",
        edit: "تعديل الفئة",
        deactivate: "إلغاء التفعيل",
        activate: "تفعيل",
      },
      form: {
        saveError: "خطأ في الحفظ",
        saved: "تم الحفظ",
        identity: "الهوية",
        bilingual: "المحتوى الثنائي",
        presentation: "العرض والترتيب",
        publishingState: "حالة النشر",
        nameEn: "الاسم بالإنجليزية",
        nameAr: "الاسم بالعربية",
        slug: "المعرّف",
        slugHint: "اتركه فارغًا لتوليده من الاسم الإنجليزي.",
        descriptionEn: "الوصف بالإنجليزية",
        descriptionAr: "الوصف بالعربية",
        sortOrder: "ترتيب الظهور",
        sortOrderHint:
          "تظهر الأرقام الأقل أولًا داخل خيارات الإدارة وترتيب الواجهة.",
        presentationNoteTitle: "ملاحظة بنيوية",
        presentationNoteBody:
          "لا يتضمن مخطط الفئات الحالي حقلاً مستقلاً للصورة، لذلك تركز هذه المرحلة على الهوية والوصف والترتيب فقط.",
        active: "الفئة نشطة",
        activeHint:
          "تبقى الفئات غير النشطة قابلة للتعديل لكنها لا ينبغي أن تظهر في الكتالوج العام.",
        create: "إنشاء الفئة",
        save: "حفظ الفئة",
        editorNote: "ملاحظة المحرر",
        editorBody:
          "تظل المعرّفات فريدة، وتبقى الحقول الثنائية متوافقة، وتُعاد تهيئة الصفحات المتأثرة بعد كل عملية حفظ.",
        record: "سجل الفئة",
        created: "أُنشئت في",
        updated: "آخر تحديث",
      },
      actions: {
        invalidState: "بيانات تحديث حالة الفئة غير صالحة.",
        referenceMissing: "مرجع الفئة مفقود.",
        notFound: "تعذر العثور على الفئة المطلوبة.",
        createFailed: "فشل إنشاء الفئة.",
        updateFailed: "فشل تحديث الفئة.",
        slugInUse: "هذا المعرّف مستخدم بالفعل لفئة أخرى.",
      },
    },
    collections: {
      list: {
        eyebrow: "مجموعات الإدارة",
        title: "تحكم تحريري كامل بمجموعات كرافكسو.",
        description:
          "أدر هوية المجموعة ومحتواها التحريري الثنائي ونغمتها البصرية وحالة تمييزها ونشرها من داخل الإدارة.",
        note:
          "تبقى المجموعات متوافقة مع مسارات المتجر الحالية وارتباطات المنتجات. كما تستمر حالة التمييز في تغذية أقسام العرض التحريري والصفحة الرئيسية.",
        count: "المجموعات",
        active: "النشطة",
        featured: "المميزة",
        assignedProducts: "المنتجات المرتبطة",
        updateError: "خطأ في التحديث",
        updateSaved: "تم حفظ التحديث",
        activeUpdated: "تم تحديث حالة نشر المجموعة.",
        emptyTitle: "لا توجد مجموعات داخل الكتالوج بعد.",
        emptyDescription:
          "أنشئ أول مجموعة هنا، ثم اربط المنتجات بها من خلال محرر المنتجات.",
      },
      newPage: {
        eyebrow: "إنشاء مجموعة",
        title: "أضف مجموعة تحريرية جديدة إلى الكتالوج الحي.",
        description:
          "عرّف هوية المجموعة ونصوصها الثنائية ونغمتها البصرية وحالة تمييزها وحالة نشرها ضمن مسار إداري واحد.",
        note:
          "يحافظ هذا المحرر على مسارات المجموعات الحالية في المتجر مع منح الإدارة تحكمًا حقيقيًا بالمحتوى التحريري.",
      },
      editPage: {
        eyebrow: "تعديل المجموعة",
        description:
          "حسّن نصوص المجموعة وعناصرها التحريرية ونغمتها البصرية وحالة تمييزها وظهورها العام دون كسر ارتباطات المنتجات الحالية.",
        note:
          "يواصل المتجر العام القراءة من سجلات المجموعات نفسها. هذا المحرر يغير فقط البيانات التسويقية الحية خلف تلك المسارات.",
        createdMessage:
          "تم إنشاء المجموعة بنجاح. يمكنك متابعة تحسين حضورها التحريري من هنا.",
        updatedMessage:
          "تم حفظ تغييرات المجموعة وإعادة تهيئة الصفحات المتأثرة في المتجر والإدارة.",
      },
      card: {
        active: "نشطة",
        inactive: "غير نشطة",
        featured: "مميزة",
        standard: "قياسية",
        products: "المنتجات",
        tone: "النغمة",
        updated: "آخر تحديث",
        edit: "تعديل المجموعة",
        deactivate: "إلغاء التفعيل",
        activate: "تفعيل",
      },
      form: {
        saveError: "خطأ في الحفظ",
        saved: "تم الحفظ",
        identity: "الهوية",
        bilingual: "المحتوى الثنائي",
        visuals: "الإعدادات البصرية والتحريرية",
        publishingState: "حالة النشر",
        nameEn: "الاسم بالإنجليزية",
        nameAr: "الاسم بالعربية",
        slug: "المعرّف",
        slugHint: "اتركه فارغًا لتوليده من الاسم الإنجليزي.",
        descriptionEn: "الوصف بالإنجليزية",
        descriptionAr: "الوصف بالعربية",
        eyebrowEn: "العنوان العلوي بالإنجليزية",
        eyebrowAr: "العنوان العلوي بالعربية",
        highlightEn: "الملاحظة البارزة بالإنجليزية",
        highlightAr: "الملاحظة البارزة بالعربية",
        tone: "النغمة",
        sortOrder: "ترتيب الظهور",
        sortOrderHint:
          "تظهر الأرقام الأقل أولًا داخل القوائم وترتيب العرض التحريري.",
        visualsNoteTitle: "ملاحظة بنيوية",
        visualsNoteBody:
          "لا يتضمن مخطط المجموعات الحالي حقلاً مستقلاً للصورة، لذلك تركز هذه المرحلة على النغمة البصرية والرسائل التحريرية بدلًا من وسائط منفصلة.",
        active: "المجموعة نشطة",
        activeHint:
          "تبقى المجموعات غير النشطة قابلة للتعديل لكنها تختفي من الواجهة العامة.",
        featured: "مجموعة مميزة",
        featuredHint:
          "يمكن استخدام المجموعات المميزة في الصفحة الرئيسية والأقسام التحريرية.",
        create: "إنشاء المجموعة",
        save: "حفظ المجموعة",
        editorNote: "ملاحظة المحرر",
        editorBody:
          "تظل المعرّفات فريدة، وتبقى الحقول التحريرية ثنائية اللغة، وتُعاد تهيئة الصفحات المتأثرة بعد كل عملية حفظ.",
        record: "سجل المجموعة",
        created: "أُنشئت في",
        updated: "آخر تحديث",
      },
      tones: {
        obsidian: "أسود لامع",
        stone: "حجري",
        bronze: "برونزي",
        pearl: "لؤلؤي",
      },
      actions: {
        invalidState: "بيانات تحديث حالة المجموعة غير صالحة.",
        referenceMissing: "مرجع المجموعة مفقود.",
        notFound: "تعذر العثور على المجموعة المطلوبة.",
        createFailed: "فشل إنشاء المجموعة.",
        updateFailed: "فشل تحديث المجموعة.",
        slugInUse: "هذا المعرّف مستخدم بالفعل لمجموعة أخرى.",
      },
    },
  },
} as const;

export function getAdminTaxonomyCopy(locale: Locale) {
  return adminTaxonomyCopy[locale];
}
