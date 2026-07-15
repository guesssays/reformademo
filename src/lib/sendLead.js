// src/lib/sendLead.js
export async function sendLead(payload) {
  const body = {
    ...payload,
    page: window.location.href,
    ua: navigator.userAgent,
  };

  const res = await fetch("/.netlify/functions/send-telegram-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let err = "Failed to send";
    try {
      const j = await res.json();
      if (j?.error) err = j.error;
    } catch {}
    throw new Error(err);
  }

  return res.json();
}
