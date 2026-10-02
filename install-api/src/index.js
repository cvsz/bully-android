export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/healthz") {
      return Response.json({ status: "ok" });
    }
    if (url.pathname !== "/v1/install" || request.method !== "POST") {
      return new Response("Not found", { status: 404 });
    }
    if (!env.INSTALLS) {
      return Response.json({ error: "storage_unavailable" }, { status: 503 });
    }

    let body;
    try { body = await request.json(); } catch {
      return Response.json({ error: "invalid_json" }, { status: 400 });
    }

    const installId = String(body.install_id || "");
    const ref = String(body.ref || "");
    const packageName = String(body.package_name || "");
    const platform = String(body.platform || "");
    if (!/^[0-9a-f-]{36}$/i.test(installId) || !/^\d{1,20}$/.test(ref) ||
        packageName !== "zone.bully.app" || platform !== "android") {
      return Response.json({ error: "invalid_event" }, { status: 422 });
    }

    const key = `install:${installId}`;
    const existing = await env.INSTALLS.get(key);
    if (existing) return Response.json({ accepted: true, duplicate: true });

    const event = {
      install_id: installId,
      ref,
      package_name: packageName,
      platform,
      version_name: String(body.version_name || "").slice(0, 64),
      version_code: Number(body.version_code || 0),
      first_seen_at: new Date().toISOString()
    };
    await env.INSTALLS.put(key, JSON.stringify(event));
    return Response.json({ accepted: true, duplicate: false }, { status: 201 });
  }
};
