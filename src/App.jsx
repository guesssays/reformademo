// src/App.jsx
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Direction from "./pages/Direction.jsx";
import StudioPage from "./pages/StudioPage.jsx"; // <- НОВОЕ

function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      {/* обработка якорей и скролл наверх */}
      <HashAndTopScroller />
      <main className="flex-1 page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// плавный скролл к якорю и прокрутка наверх при смене маршрута
function HashAndTopScroller() {
  const location = useLocation();

  useEffect(() => {
    // сначала скроллим к началу при смене pathname
    window.scrollTo({ top: 0, behavior: "instant" });
    // затем, если есть хеш — плавно к нужной секции
    if (location.hash) {
      const id = decodeURIComponent(location.hash.replace("#", ""));
      // небольшой timeout, чтобы DOM успел отрендериться
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }, [location.pathname, location.hash]);

  return null;
}

function NotFound() {
  return (
    <div className="p-10">
      <h1 className="font-bebas text-5xl mb-4">Страница не найдена</h1>
      <a href="/" className="btn btn--accent">На главную</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Главная */}
          <Route index element={<Home />} />

          {/* Страницы направлений */}
          <Route path="directions/:slug" element={<Direction />} />

          {/* Страницы студий */}
          <Route path="studios/:id" element={<StudioPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
