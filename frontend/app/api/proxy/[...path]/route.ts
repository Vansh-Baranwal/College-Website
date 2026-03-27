import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  // Bypass Node.js strict SSL certificate validation for IIT Delhi's server
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // Await the params correctly as required by Next.js 15+ 
  const resolvedParams = await params;
  const pathParts = resolvedParams.path || [];
  const path = pathParts.join("/");
  const url = new URL(request.url);
  const search = url.search;
  
  // Construct the target URL.
  // Preserve trailing slashes which are critical for WordPress directories
  const hasTrailingSlash = url.pathname.endsWith('/');
  const targetUrl = `https://international.iitd.ac.in/${path}${hasTrailingSlash && path ? '/' : ''}${search}`;

  try {
    // Act as a middleman and fetch the requested resource on behalf of the browser
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": request.headers.get("user-agent") || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
        "Accept": request.headers.get("accept") || "*/*",
        // Forward referer loosely
        "Referer": "https://international.iitd.ac.in/",
      },
    });

    // We must read the body as an ArrayBuffer to proxy binary assets like images and fonts perfectly
    const body = await response.arrayBuffer();
    const newHeaders = new Headers(response.headers);
    
    // THE CRITICAL FIX: Strip all security headers preventing iframe rendering
    newHeaders.delete("x-frame-options");
    newHeaders.delete("content-security-policy");
    newHeaders.delete("x-content-security-policy");
    newHeaders.delete("x-webkit-csp");

    // NODE FIX: Node's fetch automatically decompresses gzip/br payloads.
    // We MUST delete the content-encoding and content-length headers so the browser doesn't try to double-decompress the raw arrayBuffer we return.
    newHeaders.delete("content-encoding");
    newHeaders.delete("content-length");

    // Cookie Rewriting: Prevent the destination from rejecting cross-origin session cookies
    const setCookie = newHeaders.get("set-cookie");
    if (setCookie) {
      const rewrittenCookie = setCookie
        .replace(/Domain=[^;]+/gi, "") // Delete domain so it defaults to the proxy domain
        .replace(/SameSite=(Lax|Strict)/gi, "SameSite=None; Secure"); // Allow跨域
      newHeaders.set("set-cookie", rewrittenCookie);
    }

    // Force allow CORS on the proxy response
    newHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    console.error("Proxy Fetch Error:", error);
    return new Response(JSON.stringify({ error: "Proxy Failed", details: String(error) }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export const OPTIONS = GET;
