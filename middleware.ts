import { authMiddleware } from "@clerk/nextjs";
import { pathToRegexp } from "path-to-regexp";

const regexp = pathToRegexp("/shop/:bar");

export default authMiddleware({
  publicRoutes: ["/", "/shop", regexp],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
