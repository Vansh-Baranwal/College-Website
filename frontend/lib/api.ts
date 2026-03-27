let API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/api\/?$/, "").replace(/\/$/, "");

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
  const data = await apiFetch<any[]>("/api/data/announcements");
  return data.map(item => ({
    ...item,
    body: item.content || item.body || "",
    category: item.category || "General",
    priority: item.priority || "medium",
    date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  }));
}

export async function getEvents() {
  const data = await apiFetch<any[]>("/api/data/events");
  return data.map((item, i) => ({
    ...item,
    type: item.type || (i % 2 === 0 ? "Cultural Fest" : "Tech Fest"),
    expected: item.expected || "1000+",
    image: item.image || (i % 3 === 0 ? "bg-gradient-to-br from-pink-500/20 to-orange-500/20" : i % 3 === 1 ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" : "bg-gradient-to-br from-gold/20 to-yellow-600/20")
  }));
}

export async function getCourses() {
  const data = await apiFetch<any[]>("/api/data/courses");
  return data.map((item, i) => ({
    ...item,
    department: item.department || "Computer Science",
    credits: item.credits || (i % 2 === 0 ? 4 : 3),
    semester: item.semester || (i % 2 === 0 ? "Autumn" : "Spring"),
    level: item.level || (i < 5 ? "UG" : "PG"),
    enrolled: item.enrolled || Math.floor(Math.random() * 300 + 100),
    rating: item.rating || (4.5 + Math.random() * 0.4).toFixed(1),
    faculty: item.faculty || (i % 3 === 0 ? "Dr. Naveen Garg" : i % 3 === 1 ? "Prof. Mausam" : "Dr. Sorav Bansal"),
    intro: item.description || "An intensive course covering foundational concepts and advanced applications in the field."
  }));
}

export async function getFaculty() {
  const data = await apiFetch<any[]>("/api/data/faculty");
  return data.map((item, i) => ({
    ...item,
    department: item.department || "Computer Science",
    publications: item.publications || Math.floor(Math.random() * 200 + 50),
    awards: item.awards || Math.floor(Math.random() * 8 + 1),
    specialization: item.specialization || "Advanced Research",
    email: item.email || `${item.name?.toLowerCase().replace(/\s/g, '.')}@iitd.ac.in`
  }));
}

export async function getDepartments() {
  try {
    return await apiFetch<any[]>("/api/data/departments");
  } catch {
    return []; // Return empty to fallback to static in the page component
  }
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
