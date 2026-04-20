import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { normalizeSupabaseUrl } from "@/lib/supabase/url";

/** Copy cookies set during session refresh (e.g. rotated JWT) onto another response. */
function copyCookies(from: NextResponse, to: NextResponse) {
  const list = from.headers.getSetCookie?.();
  if (list?.length) {
    list.forEach((line) => to.headers.append("Set-Cookie", line));
    return;
  }
  from.cookies.getAll().forEach(({ name, value }) => {
    to.cookies.set(name, value);
  });
}

export async function proxy(request: NextRequest) {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!rawUrl?.trim() || !key?.trim()) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(normalizeSupabaseUrl(rawUrl), key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isAdminLogin = path === "/admin/login";

  if (isAdminRoute && !isAdminLogin && !user) {
    const redirectUrl = new URL("/admin/login", request.url);
    const redirect = NextResponse.redirect(redirectUrl);
    copyCookies(response, redirect);
    return redirect;
  }

  if (isAdminLogin && user) {
    const redirectUrl = new URL("/admin", request.url);
    const redirect = NextResponse.redirect(redirectUrl);
    copyCookies(response, redirect);
    return redirect;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
