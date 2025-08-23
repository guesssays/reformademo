// ======================= src/data/directions.js =======================
export const directionsData = [
  // --- STRETCHING ---
  {
    slug: "stretching",
    title: "STRETCHING",
    tag: "Movement",
    hero: {
      image: "/images/cta.jpg",
      title: "STRETCHING",
      subtitle: "Тренировки для развития гибкости и растяжки",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/why-1.jpg",
      title: "На тренировках Stretching вы сможете занять нужное положение, улучшить циркуляцию крови и снять зажимы!",
      text: "Тренировки проводят профессиональные тренеры, среди которых мастера спорта, хореографы, лауреаты и победители соревнований разных уровней."
    },
    benefitsBlock: {
      title: "Основные преимущества STRETCHING",
      items: [
        { title: "Стройная фигура", text: "Регулярная растяжка подтягивает мышцы, улучшает циркуляцию и нормализует работу дыхания." },
        { title: "Красивая осанка", text: "Укрепляются мышцы-стабилизаторы, что позитивно влияет на осанку и походку." },
        { title: "Устойчивость к стрессу", text: "Спокойный ритм занятий улучшает состояние нервной системы и настроение." },
        { title: "Укрепление суставов", text: "Мягкая работа с суставами делает движения свободнее и безопаснее." },
      ]
    },
    prepareSteps: [
      { n: 1, title: "Определить уровень", text: "Lite, Basic, Pro — подскажем подходящую группу." },
      { n: 2, title: "Выбрать форму", text: "Удобная спортивная одежда без жестких швов." },
      { n: 3, title: "Настроиться", text: "Приходите за 10–15 минут до тренировки, возьмите воду." }
    ],
    studios: ["st-aly", "st-alm"],
    gallery: [
      "/images/directions/stretching/g1.jpg",
      "/images/directions/stretching/g2.jpg",
      "/images/directions/stretching/g3.jpg"
    ],
    seo: {
      title: "Stretching в ReForma — гибкость и здоровье",
      description: "Растяжка под руководством сертифицированных тренеров. Пробное занятие в студиях ReForma. Запись по телефону.",
      keywords: "стретчинг ташкент, растяжка для девушек, stretching reforma"
    }
  },

  // ==================== MOVEMENT ====================
  {
    slug: "fitness-mix",
    title: "Фитнес микс",
    tag: "MOVEMENT",
    hero: {
      image: "/images/directions/fitness-mix/hero.jpg",
      title: "Фитнес микс",
      subtitle: "Силовые и кардио-блоки в одном формате для общего тонуса",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/fitness-mix/intro.jpg",
      title: "Сбалансированная тренировка на всё тело",
      text: "Комбинируем силовые упражнения, функциональные связки и кардио. Подходит для любого уровня."
    },
    benefitsBlock: {
      title: "Основные преимущества Фитнес микс",
      items: [
        { title: "Общий тонус", text: "Повышает выносливость и силу." },
        { title: "Сжигание калорий", text: "Интенсивные блоки ускоряют метаболизм." },
        { title: "Разнообразие", text: "Каждая тренировка уникальна." },
        { title: "Подходит всем", text: "Лёгкая регрессия и прогрессия нагрузки." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Уровень", text: "Lite/Basic/Pro — подберём группу." },
      { n: 2, title: "Обувь", text: "Кроссовки с фиксацией стопы." },
      { n: 3, title: "Вода", text: "Бутылка воды и полотенце." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/fitness-mix/g1.jpg",
      "/images/directions/fitness-mix/g2.jpg",
      "/images/directions/fitness-mix/g3.jpg"
    ],
    seo: {
      title: "Фитнес микс в ReForma",
      description: "Силовые и кардио блоки для здоровья и фигуры. Пробное занятие — звоните!",
      keywords: "фитнес микс ташкент, функциональные тренировки"
    }
  },
  {
    slug: "weightloss",
    title: "Похудейка",
    tag: "MOVEMENT",
    hero: {
      image: "/images/directions/weightloss/hero.jpg",
      title: "Похудейка",
      subtitle: "Кардио + силовые + танцы — безопасное снижение веса",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/weightloss/intro.jpg",
      title: "Комплексный подход к снижению веса",
      text: "Работаем аэробно, подключаем силовые блоки и отслеживаем прогресс."
    },
    benefitsBlock: {
      title: "Основные преимущества Похудейка",
      items: [
        { title: "Дефицит калорий", text: "Продуманная интенсивность." },
        { title: "Разнообразие", text: "Танцы + фитнес + стретчинг." },
        { title: "Безопасность", text: "Контроль пульса и дыхания." },
        { title: "Результат", text: "Снижение объёмов и улучшение самочувствия." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "ЧСС", text: "По желанию — пульсометр." },
      { n: 2, title: "Вода", text: "Не забывайте пить." },
      { n: 3, title: "Питание", text: "Режим после тренировки — белок и вода." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/weightloss/g1.jpg",
      "/images/directions/weightloss/g2.jpg",
      "/images/directions/weightloss/g3.jpg"
    ],
    seo: {
      title: "Похудейка в ReForma",
      description: "Эффективные и безопасные кардио-силовые занятия для снижения веса.",
      keywords: "похудение тренировки, жиросжигание"
    }
  },
  {
    slug: "twerk",
    title: "Тверк",
    tag: "MOVEMENT",
    hero: {
      image: "/images/directions/twerk/hero.jpg",
      title: "Тверк",
      subtitle: "Энергичный танцевальный стиль и мощная кардио-нагрузка",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/twerk/intro.jpg",
      title: "Раскройте пластичность и уверенность",
      text: "Работаем над базовыми движениями, ритмикой и выносливостью."
    },
    benefitsBlock: {
      title: "Основные преимущества Тверк",
      items: [
        { title: "Выносливость", text: "Отличная кардио-нагрузка." },
        { title: "Пластика", text: "Контроль корпуса и таза." },
        { title: "Калории", text: "Высокая интенсивность." },
        { title: "Настроение", text: "Музыка и драйв группы." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Форма", text: "Удобная танцевальная одежда." },
      { n: 2, title: "Обувь", text: "Кроссовки/кеды с мягкой подошвой." },
      { n: 3, title: "Вода", text: "Берите воду на тренировку." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/twerk/g1.jpg",
      "/images/directions/twerk/g2.jpg",
      "/images/directions/twerk/g3.jpg"
    ],
    seo: {
      title: "Тверк в ReForma",
      description: "Танцевальный фитнес-стиль для уверенности, пластики и кардио.",
      keywords: "тверк ташкент, танцевальные тренировки"
    }
  },
  {
    slug: "trampoline-fitness",
    title: "Фитнес на батутах",
    tag: "MOVEMENT",
    hero: {
      image: "/images/directions/trampoline/hero.jpg",
      title: "Фитнес на батутах",
      subtitle: "Прыгучий кардио-формат с минимальной ударной нагрузкой",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/trampoline/intro.jpg",
      title: "Мягкое кардио и море позитива",
      text: "Тренировка улучшает лимфодренаж, координацию и настроение."
    },
    benefitsBlock: {
      title: "Основные преимущества Фитнес на батутах",
      items: [
        { title: "Щадящая нагрузка", text: "Мягкая амортизация батутов." },
        { title: "Координация", text: "Баланс и чувство ритма." },
        { title: "Калории", text: "Расход до 1000 калорий в час." },
        { title: "Антистресс", text: "Весело и бодро." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Обувь", text: "Плотно фиксирующая стопу." },
      { n: 2, title: "Разминка", text: "Приходите заранее." },
      { n: 3, title: "Вода", text: "Пейте до и после." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/trampoline/g1.jpg",
      "/images/directions/trampoline/g2.jpg",
      "/images/directions/trampoline/g3.jpg"
    ],
    seo: {
      title: "Фитнес на батутах в ReForma",
      description: "Мягкое кардио и драйв. Записывайтесь на пробный класс.",
      keywords: "батутный фитнес, кардио для девушек"
    }
  },
  {
    slug: "k-pop",
    title: "K-pop",
    tag: "MOVEMENT",
    hero: {
      image: "/images/directions/k-pop/hero.jpg",
      title: "K-pop dance",
      subtitle: "Танцевальные связки под любимые треки",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/k-pop/intro.jpg",
      title: "Хореография, пластика и ритм",
      text: "Разучиваем движения и работаем над синхронизацией."
    },
    benefitsBlock: {
      title: "Основные преимущества K-pop",
      items: [
        { title: "Ритм и чувство музыки", text: "Развитие музыкальности." },
        { title: "Кардио-нагрузка", text: "Движение — это энергия." },
        { title: "Координация", text: "Связки и смены уровня." },
        { title: "Комьюнити", text: "Тёплая атмосфера группы." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Обувь", text: "Лёгкие кеды/кроссовки." },
      { n: 2, title: "Форма", text: "Удобная танцевальная одежда." },
      { n: 3, title: "Видео", text: "Снимайте прогресс — это мотивирует." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/k-pop/g1.jpg",
      "/images/directions/k-pop/g2.jpg",
      "/images/directions/k-pop/g3.jpg"
    ],
    seo: {
      title: "K-pop в ReForma",
      description: "Танцуем и заряжаемся настроением. Пробное занятие — по звонку.",
      keywords: "k-pop танцы, танцы для девушек"
    }
  },
  {
    slug: "arabic-dance-fitness",
    title: "Арабские танцы + фитнес",
    tag: "MOVEMENT",
    hero: {
      image: "/images/directions/arabic-dance-fitness/hero.jpg",
      title: "Арабские танцы + фитнес",
      subtitle: "Пластика восточных движений и функциональная нагрузка",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/arabic-dance-fitness/intro.jpg",
      title: "Грация, женственность и тонус",
      text: "Изучаем базовые элементы восточного танца, укрепляя мышцы корпуса."
    },
    benefitsBlock: {
      title: "Основные преимущества Арабские танцы + фитнес",
      items: [
        { title: "Пластика", text: "Мягкие волны и изоляции." },
        { title: "Тонус", text: "Работа с корпусом и бёдрами." },
        { title: "Силовая нагрузка", text: "Формирует красивое тело." },
        { title: "Уверенность", text: "Выражение и эмоциональность." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Форма", text: "Комфортная одежда, пояс по желанию." },
      { n: 2, title: "Разминка", text: "Приходите заранее." },
      { n: 3, title: "Вода", text: "Обязательно берите воду." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/arabic-dance-fitness/g1.jpg",
      "/images/directions/arabic-dance-fitness/g2.jpg",
      "/images/directions/arabic-dance-fitness/g3.jpg"
    ],
    seo: {
      title: "Арабские танцы + фитнес в ReForma",
      description: "Пластика востока и функциональный фитнес в одном формате.",
      keywords: "восточные танцы фитнес"
    }
  },

  // ==================== MINDSET ====================
  {
    slug: "yoga",
    title: "Йога",
    tag: "MINDSET",
    hero: {
      image: "/images/directions/yoga/hero.jpg",
      title: "Йога",
      subtitle: "Баланс дыхания, движения и внимания",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/yoga/intro.jpg",
      title: "Мягкая практика для тела и ума",
      text: "Асаны, дыхание и расслабление — адаптируем под ваш уровень."
    },
    benefitsBlock: {
      title: "Основные преимущества Йога",
      items: [
        { title: "Гибкость", text: "Постепенная работа над подвижностью." },
        { title: "Антистресс", text: "Дыхание и концентрация внимания." },
        { title: "Осанка", text: "Работа с мышцами-стабилизаторами." },
        { title: "Самочувствие", text: "Глубокое расслабление в конце." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Коврик", text: "Можно свой, можно студийный." },
      { n: 2, title: "Одежда", text: "Эластичная, не сковывающая." },
      { n: 3, title: "Питание", text: "Лёгкий перекус за 1–2 часа." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/yoga/g1.jpg",
      "/images/directions/yoga/g2.jpg",
      "/images/directions/yoga/g3.jpg"
    ],
    seo: {
      title: "Йога в ReForma",
      description: "Практика для гибкости и спокойствия. Первое занятие — по записи.",
      keywords: "йога ташкент, йога для девушек"
    }
  },
  {
    slug: "yoga-pregnant",
    title: "Йога для беременных",
    tag: "MINDSET",
    hero: {
      image: "/images/directions/yoga-pregnant/hero.jpg",
      title: "Йога для беременных",
      subtitle: "Мягкая практика под присмотром специалиста",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/yoga-pregnant/intro.jpg",
      title: "Забота о самочувствии мамы",
      text: "Дыхание, мягкая мобилизация и расслабление. Консультация перед началом обязательна."
    },
    benefitsBlock: {
      title: "Основные преимущества Йога для беременных",
      items: [
        { title: "Снятие напряжения", text: "Мягкие безопасные асаны." },
        { title: "Дыхание", text: "Подготовка к родам." },
        { title: "Самочувствие", text: "Сон, настроение, энергия." },
        { title: "Безопасность", text: "Сертифицированные тренеры." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Консультация", text: "Одобрение врача." },
      { n: 2, title: "Темп", text: "Делаем паузы, слушаем тело." },
      { n: 3, title: "Атрибуты", text: "Болстер/подушки при необходимости." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/yoga-pregnant/g1.jpg",
      "/images/directions/yoga-pregnant/g2.jpg",
      "/images/directions/yoga-pregnant/g3.jpg"
    ],
    seo: {
      title: "Йога для беременных в ReForma",
      description: "Безопасные занятия с опытным инструктором. Запись по телефону.",
      keywords: "йога беременным ташкент"
    }
  },
  {
    slug: "yoga-women",
    title: "Женская йога",
    tag: "MINDSET",
    hero: {
      image: "/images/directions/yoga-women/hero.jpg",
      title: "Женская йога",
      subtitle: "Мягкая практика с акцентом на женское здоровье",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/yoga-women/intro.jpg",
      title: "Гармония и забота о себе",
      text: "Фокус на дыхании, тазовом дне и мягкой мобилизации."
    },
    benefitsBlock: {
      title: "Основные преимущества Женская йога",
      items: [
        { title: "Баланс", text: "Мягкая адаптация нагрузок." },
        { title: "Осознанность", text: "Внимание к телу и дыханию." },
        { title: "Гибкость", text: "Плавное развитие подвижности." },
        { title: "Расслабление", text: "Антистресс-эффект." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Комфорт", text: "Удобная эластичная форма." },

      { n: 2, title: "Режим", text: "Лёгкий перекус до практики." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/yoga-women/g1.jpg",
      "/images/directions/yoga-women/g2.jpg",
      "/images/directions/yoga-women/g3.jpg"
    ],
    seo: {
      title: "Женская йога в ReForma",
      description: "Практика для гармонии и мягкой силы.",
      keywords: "женская йога, йога для девушек"
    }
  },

  // ==================== RECOVERY ====================
  {
    slug: "pilates",
    title: "Пилатес",
    tag: "RECOVERY",
    hero: {
      image: "/images/directions/pilates/hero.jpg",
      title: "Пилатес",
      subtitle: "Контроль движения, глубокие мышцы и осанка",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/pilates/intro.jpg",
      title: "Стабильность и центрирование",
      text: "Работаем над ядром тела, дыханием и выравниванием."
    },
    benefitsBlock: {
      title: "Основные преимущества Пилатес",
      items: [
        { title: "Осанка", text: "Коррекция привычных паттернов." },
        { title: "Стабильность", text: "Глубокие мышцы корпуса." },
        { title: "Контроль", text: "Медленная осознанная техника." },
        { title: "Безопасность", text: "Подходит широкому кругу." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Дыхание", text: "Следите за ритмом выдох-вдох." },
      { n: 2, title: "Фокус", text: "Качество важнее количества." },
      { n: 3, title: "Регулярность", text: "Минимум 2 раза в неделю." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/pilates/g1.jpg",
      "/images/directions/pilates/g2.jpg",
      "/images/directions/pilates/g3.jpg"
    ],
    seo: {
      title: "Пилатес в ReForma",
      description: "Укрепляем центр тела и улучшаем осанку.",
      keywords: "пилатес ташкент"
    }
  },
  {
    slug: "yoga-therapy",
    title: "Йогатерапия",
    tag: "RECOVERY",
    hero: {
      image: "/images/directions/yoga-therapy/hero.jpg",
      title: "Йогатерапия",
      subtitle: "Мягкая коррекция паттернов движения и дыхания",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/yoga-therapy/intro.jpg",
      title: "Индивидуальная адаптация под запрос",
      text: "Внимание к осанке, дыханию и расслаблению — под присмотром инструктора."
    },
    benefitsBlock: {
      title: "Основные преимущества Йогатерапия",
      items: [
        { title: "Безопасно", text: "Щадящий формат занятий." },
        { title: "Постава", text: "Коррекция осанки и паттернов." },
        { title: "Дыхание", text: "Работа с ритмом и объёмом." },
        { title: "Антистресс", text: "Глубокое расслабление." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Консультация", text: "Сообщите о самочувствии." },
      { n: 2, title: "Темп", text: "Делаем паузы по необходимости." },
      { n: 3, title: "Регулярность", text: "Мягкая, но регулярная практика." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/yoga-therapy/g1.jpg",
      "/images/directions/yoga-therapy/g2.jpg",
      "/images/directions/yoga-therapy/g3.jpg"
    ],
    seo: {
      title: "Йогатерапия в ReForma",
      description: "Плавная практика для восстановления и баланса.",
      keywords: "йогатерапия ташкент"
    }
  },
  {
    slug: "aerial-yoga",
    title: "Аэройога",
    tag: "RECOVERY",
    hero: {
      image: "/images/directions/aerial-yoga/hero.jpg",
      title: "Аэройога",
      subtitle: "Поддержка гамаком позволяет безопасно углубляться в асаны.",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/aerial-yoga/intro.jpg",
      title: "Невесомость и мягкая сила",
      text: "Улучшает мобильность и снимает нагрузку с позвоночника."
    },
    benefitsBlock: {
      title: "Основные преимущества Аэройога",
      items: [
        { title: "Декомпрессия", text: "Разгрузка позвоночника." },
        { title: "Гибкость", text: "Мягкие перевёрнутые позиции." },
        { title: "Силовой тонус", text: "Работа с собственным весом." },
        { title: "Эмоции", text: "Новые ощущения и мотивация." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Форма", text: "Рукава до локтя, без молний." },
      { n: 2, title: "Украшения", text: "Снимите кольца/серьги." },
      { n: 3, title: "Питание", text: "Не ешьте за 1.5–2 часа до тренировки." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/aerial-yoga/g1.jpg",
      "/images/directions/aerial-yoga/g2.jpg",
      "/images/directions/aerial-yoga/g3.jpg"
    ],
    seo: {
      title: "Аэройога в ReForma",
      description: "Практика в гамаках для гибкости и разгрузки спины.",
      keywords: "аэройога ташкент, йога в гамаках"
    }
  },
  {
    slug: "women-health",
    title: "Женское здоровье",
    tag: "RECOVERY",
    hero: {
      image: "/images/directions/women-health/hero.jpg",
      title: "Женское здоровье",
      subtitle: "Мягкие комплексы на тазовое дно, осанку и дыхание",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/women-health/intro.jpg",
      title: "Забота о себе через движение",
      text: "Аккуратная мобилизация, дыхание и расслабление под присмотром тренера."
    },
    benefitsBlock: {
      title: "Основные преимущества Женское здоровье",
      items: [
        { title: "Мягко и безопасно", text: "Щадящая нагрузка." },
        { title: "Тазовое дно", text: "Осознанная работа с дыханием." },
        { title: "Освобождение зажимов", text: "Мобилизация и расслабление." },
        { title: "Самочувствие", text: "Сон и настроение улучшаются." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Консультация", text: "Сообщите тренеру нюансы здоровья." },
      { n: 2, title: "Темп", text: "Делаем перерывы по самочувствию." },
      { n: 3, title: "Регулярность", text: "Системная мягкая практика." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/women-health/g1.jpg",
      "/images/directions/women-health/g2.jpg",
      "/images/directions/women-health/g3.jpg"
    ],
    seo: {
      title: "Женское здоровье в ReForma",
      description: "Занятия для комфорта и гармонии.",
      keywords: "женское здоровье тренировки"
    }
  },
  {
    slug: "aerial-stretching",
    title: "Аэростретчинг",
    tag: "RECOVERY",
    hero: {
      image: "/images/directions/aerial-stretch/hero.jpg",
      title: "Аэростретчинг",
      subtitle: "Растяжка в гамаках — мягко и эффективно",
      ctaText: "ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ",
      ctaHref: "tel:+998933775697"
    },
    intro: {
      imageLeft: "/images/directions/aerial-stretch/intro.jpg",
      title: "Гибкость без перегруза",
      text: "Практика в гамаках для декомпрессии и гибкости"
    },
    benefitsBlock: {
      title: "Основные преимущества Аэростретчинг",
      items: [
        { title: "Безопасно", text: "Поддержка инвентарём." },
        { title: "Гибкость", text: "Постепенное углубление." },
        { title: "Освобождение спины", text: "Мягкая декомпрессия." },
        { title: "Расслабление", text: "Успокаивающий эффект." }
      ]
    },
    prepareSteps: [
      { n: 1, title: "Форма", text: "Без острых аксессуаров." },
      { n: 2, title: "Питание", text: "Лёгкий перекус за 2 часа." },
      { n: 3, title: "Регулярность", text: "2 раза в неделю и больше." }
    ],
    studios: ["st-aly","st-alm"],
    gallery: [
      "/images/directions/aerial-stretch/g1.jpg",
      "/images/directions/aerial-stretch/g2.jpg",
      "/images/directions/aerial-stretch/g3.jpg"
    ],
    seo: {
      title: "Аэростретчинг в ReForma",
      description: "Растяжка в гамаках — мягкая и эффективная.",
      keywords: "аэростретчинг ташкент"
    }
  }
];
