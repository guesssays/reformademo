// netlify/functions/send-telegram-lead.js
// Node 18+ (в Netlify fetch доступен глобально)

const BOT_TOKEN = process.env.TG_BOT_TOKEN;

// соответствие "филиал → chat_id"
const CHAT_BY_STUDIO = {
  "st-alm": process.env.TG_CHAT_ALM, // Алимкент
  "st-aly": process.env.TG_CHAT_ALY, // Алайский
};

// запасной чат, если не нашли по филиалу
const DEFAULT_CHAT_ID = process.env.TG_CHAT_DEFAULT || process.env.TG_CHAT_ALM;

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizePhone(raw = "") {
  const trimmed = String(raw).trim();
  const plus = trimmed.startsWith("+") ? "+" : "";
  const digits = trimmed.replace(/\D/g, "");
  return plus + digits;
}

async function sendTelegramMessage({ chat_id, text, reply_markup }) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(
      `Telegram error ${data.error_code || res.status}: ${JSON.stringify(data)}`
    );
  }

  return data;
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!BOT_TOKEN) {
      throw new Error("TG_BOT_TOKEN is not set");
    }

    const data = JSON.parse(event.body || "{}");

    const {
      name = "",
      phone = "",
      studio = "",
      type = "lead", // trial | massage | lead
      page = "",
      ua = "",
      extra = {}, // { direction, comment, ... }
    } = data;

    if (!name.trim() || !phone.trim()) {
      return { statusCode: 400, body: "Missing required fields" };
    }

    const chatId = CHAT_BY_STUDIO[studio] || DEFAULT_CHAT_ID;

    const phoneNorm = normalizePhone(phone);

    const lines = [
      `<b>📝 Новая заявка</b>`,
      `Тип: <b>${escapeHtml(type)}</b>`,
      `Имя: <b>${escapeHtml(name)}</b>`,
      `Телефон: <b>${escapeHtml(phoneNorm)}</b>`,
      studio ? `Филиал: <b>${escapeHtml(studio)}</b>` : null,
      extra?.direction
        ? `Направление: <b>${escapeHtml(extra.direction)}</b>`
        : null,
      extra?.comment ? `Комментарий: ${escapeHtml(extra.comment)}` : null,
      page ? `Страница: ${escapeHtml(page)}` : null,
      ua ? `UA: ${escapeHtml(ua)}` : null,
      `⏱ ${new Date().toLocaleString("ru-RU")}`,
    ].filter(Boolean);

    const text = lines.join("\n");

    // Кнопка "Написать в Telegram"
    let reply_markup;
    if (phoneNorm) {
      const tgLink = `tg://resolve?phone=${phoneNorm.replace(/^\+/, "")}`;
      reply_markup = {
        inline_keyboard: [
          [{ text: "💬 Написать в Telegram", url: tgLink }],
        ],
      };
    }

    await sendTelegramMessage({ chat_id: chatId, text, reply_markup });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: String(err?.message || err),
      }),
    };
  }
};
