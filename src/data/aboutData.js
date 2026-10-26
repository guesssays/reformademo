// src/data/aboutData.js
export const aboutData = {
  hero: {
    image: "/images/about/hero.jpg",
    title: "КОМАНДА",
    subtitle: "", // текст убрали
  },

  // тексты/баннер для раздела «о компании» больше не используем
  features: [],
  redBanner: "",

  teamTitle: "КОМАНДА",
  // Порядок: СНАЧАЛА ТРЕНЕРЫ → затем МАССАЖИСТЫ → затем АДМИНИСТРАТОРЫ
  team: [
    // === ТРЕНЕРЫ ===
    { name: "Карима", role: "Тренер по йоге и йога-терапии", photo: "/images/about/team-karima.jpg",
      bio: ["Дипломированный специалист по направлению Йога и Йогатерапия","Более 4-х лет в сфере йоги","Прошла профессиональное обучение в Академии Татьяны Дудиной"] },
    { name: "Камила", role: "Тренер по стретчингу, пилатесу, тверку и аэростретчингу", photo: "/images/about/team-4.jpg" },
    { name: "Марина", role: "Тренер по фитнесу и пилатесу", photo: "/images/about/team-11.jpg" },
    { name: "Гульзия", role: "Тренер по йоге", photo: "/images/about/team-placeholder.svg" },
    { name: "Валентина", role: "Тренер по йоге", photo: "/images/about/team-valentina.jpg",
      bio: ["Стаж преподавания более 10 лет","Инструктор по йоге более 2-х лет","Поможет поддержать ментальное и физическое здоровье, баланс и гармонию"] },
    { name: "Фарангиз", role: "Тренер по фитнесу, стретчингу и джампинг фитнесу", photo: "/images/about/team-15.jpg" },
    { name: "Евгения", role: "Тренер по арабским танцам", photo: "/images/about/team-evgenia.jpg",
      bio: ["Стаж преподавания более 10 лет","Индивидуальный подход к каждой ученице и работа на результат","Подарит уверенность в себе, горящие глаза и ровную осанку"] },

    // === МАССАЖИСТЫ ===
    { name: "Малика", role: "Массажист", photo: "/images/about/team-5.jpg" },
    { name: "Малика", role: "Массажист", photo: "/images/about/team-9.jpg" },
    { name: "Феруза", role: "Массажист", photo: "/images/about/team-14.jpg" },
    { name: "Ирина", role: "Массажист", photo: "/images/about/team-placeholder.svg" },

    // === АДМИНИСТРАТОРЫ ===
    { name: "Вилена", role: "Администратор", photo: "/images/about/team-vilena.jpg",
      bio: ["Трудолюбивая, яркая и отзывчивая","Готова на любую авантюру от руководства","Всегда рада выслушать и помочь"] },
    { name: "Нигина", role: "Администратор", photo: "/images/about/team-nigina.jpg" },
  ],
};
