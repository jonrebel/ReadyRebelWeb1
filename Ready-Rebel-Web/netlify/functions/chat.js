export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let payload = {};
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    // ignore
  }

  const message = (payload.message || "").toString().trim();
  if (!message) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing message" }),
    };
  }

  // Interview/demo mode: no DB, just prove the API round-trip works.
  // Later you can replace this with a real external API call (using process.env.* secrets).
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reply: `Echo: ${message}` }),
  };
}
