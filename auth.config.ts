import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnRegister = nextUrl.pathname.startsWith("/register");
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      const authMenu = {
        navMain: [
          {
            url: "/",
          },
          {
            url: "/feedback",
          },
          { url: "/settings" },
          { url: "/users" },
        ],
      };

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (
        (!isLoggedIn &&
          authMenu.navMain.find((e) => e.url === nextUrl.pathname)) ||
        (!isLoggedIn && nextUrl.pathname === "/")
      ) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isOnRegister || isOnLogin) {
        return true; // Always allow access to register and login pages
      }

      if (!isLoggedIn && nextUrl.pathname === "/") {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
