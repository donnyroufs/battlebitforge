export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/forge", "/forge", "/loadouts/:slug/votes", "/my-loadouts"],
};
