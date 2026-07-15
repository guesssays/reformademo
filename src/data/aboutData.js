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
    { name: "Карима", role: "Тренер по йоге и йога-терапии", photo: "/images/about/team-placeholder.svg" },
    { name: "Камила", role: "Тренер по стретчингу, пилатесу, тверку и аэростретчингу", photo: "/images/about/team-4.jpg" },
    { name: "Марина", role: "Тренер по фитнесу и пилатесу", photo: "/images/about/team-11.jpg" },
    { name: "Гульзия", role: "Тренер по йоге", photo: "/images/about/team-placeholder.svg" },
    { name: "Валентина", role: "Тренер по йоге", photo: "/images/about/team-placeholder.svg" },
    { name: "Фарангиз", role: "Тренер по фитнесу, стретчингу и джампинг фитнесу", photo: "/images/about/team-15.jpg" },
    { name: "Наргиза", role: "Тренер по фитнесу", photo: "/images/about/team-16.jpg" },

    // === МАССАЖИСТЫ ===
    { name: "Малика", role: "Массажист", photo: "/images/about/team-5.jpg" },
    { name: "Малика", role: "Массажист", photo: "/images/about/team-9.jpg" },
    { name: "Юлия", role: "Массажист", photo: "/images/about/team-july.jpg" },
    { name: "Феруза", role: "Массажист", photo: "/images/about/team-14.jpg" },

    // === АДМИНИСТРАТОРЫ ===
    { name: "Лилия", role: "Администратор", photo: "/images/about/team-8.jpg" },
    { name: "Радмила", role: "Администратор", photo: "/images/about/team-17.jpg" },
    { name: "Вилена", role: "Администратор", photo: "/images/about/team-placeholder.svg" },
    { name: "Нигина", role: "Администратор", photo: "/images/about/team-nigina.jpg" },
  ],
};
