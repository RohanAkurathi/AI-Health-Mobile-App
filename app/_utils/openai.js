const OPENAI_API_KEY = "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";

export async function chatCompletion(messages) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
    }),
  });

  // handle HTTP error
  if (!res.ok) {
    let err = "Unknown error";
    try {
      const e = await res.json();
      err = e.error?.message || JSON.stringify(e);
    } catch {}
    throw new Error(err);
  }

  const { choices } = await res.json();
  if (!choices?.[0]?.message?.content) {
    throw new Error("No completion returned");
  }
  return choices[0].message.content.trim();
}