import { useEffect } from "react";

/**
 * Вставляет <script type="application/ld+json"> в <head> и убирает при размонтировании.
 * React 19 нативно поднимает <title>/<meta>, но не обычные <script>, поэтому
 * структурированные данные добавляем в head вручную (как это делал react-helmet-async).
 */
export default function JsonLd({ data }) {
  const json = JSON.stringify(data);
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = json;
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, [json]);
  return null;
}
