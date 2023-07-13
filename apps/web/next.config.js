module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    "@bbforge/design-system",
    "@bbforge/database",
    "@bbforge/auth",
    "@bbforge/loadouts",
  ],
  experimental: {
    serverActions: true,
  },
};
