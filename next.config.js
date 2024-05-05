const nextConfig = {
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
  // Optional: Change the output directory `out` -> `dist`
  distDir: ".next",
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/metronome",
        has: [
          {
            type: "host",
            value: "tacotacoburrito.com",
          },
        ],
      },
      {
        source: "/",
        destination: "/evinos",
      },
    ];
  },
};

module.exports = nextConfig;
