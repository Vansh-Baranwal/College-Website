const API = process.env.NEXT_PUBLIC_API_URL || "";
if (typeof window !== "undefined" && !API) {
  console.warn("⚠️ NEXT_PUBLIC_API_URL is not defined. All API calls will fail with 404 on the frontend domain.");
}

// ── Helper ──
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API && typeof window !== "undefined") {
     throw new Error("Backend API URL not configured. Please set NEXT_PUBLIC_API_URL.");
  }
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = { "Content-Type": "application/json", ...(options?.headers as Record<string, string>) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "API Error");
  }
  return res.json();
}

// ── Auth ──
export async function apiSignup(name: string, email: string, password: string, role: "student" | "faculty") {
  return apiFetch<{ token: string; user: { id: string; name: string; email: string } }>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  });
}

export async function apiLogin(email: string, password: string) {
  return apiFetch<{ token: string; user: { id: string; name: string; email: string } }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// ── Chat ──
export async function apiChat(message: string): Promise<string> {
  const data = await apiFetch<{ reply: string }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
  return data.reply;
}

// ── Data ──
export async function getAnnouncements() {
  return apiFetch<any[]>("/api/data/announcements");
}

export async function getEvents() {
  return apiFetch<any[]>("/api/data/events");
}

export async function getCourses() {
  return apiFetch<any[]>("/api/data/courses");
}

export async function getFaculty() {
  return apiFetch<any[]>("/api/data/faculty");
}

// ── Search ──
export async function apiSearch(q: string) {
  return apiFetch<{ departments: any[]; faculty: any[]; courses: any[] }>(`/api/search?q=${encodeURIComponent(q)}`);
}

// ── Mock endpoints for pages without backend yet ──
const MOCK_ITEMS = [
  { id: "1", type: "lost", title: "MacBook Pro", description: "Lost in the library floor 2.", category: "Electronics", location: "Central Library", image_url: "", created_at: Date.now() },
  { id: "2", type: "found", title: "Casio Calculator", description: "Found near LT-1.", category: "Academics", location: "Lecture Hall Complex", image_url: "", created_at: Date.now() }
];

export async function getItems() {
  try {
    return await apiFetch<any[]>("/api/items");
  } catch {
    return MOCK_ITEMS;
  }
}

export async function createItem(data: any) {
  try {
    return await apiFetch("/api/items", { method: "POST", body: JSON.stringify(data) });
  } catch {
    return { success: true, item: { ...data, id: Date.now().toString(), created_at: Date.now() }, mock: true };
  }
}

export async function verifyCertificate(id: string) {
  try {
    return await apiFetch<any>("/api/verify", { method: "POST", body: JSON.stringify({ certificateId: id }) });
  } catch {
    return new Promise(resolve => setTimeout(() => {
      if (id.length > 5) resolve({ valid: true, issuer: "IIT Delhi Academic Section", timestamp: new Date().toISOString(), hash: "0x8a92f...c3" });
      else resolve({ valid: false });
    }, 1500));
  }
}
