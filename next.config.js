const nextConfig = {
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
  // Optional: Change the output directory `out` -> `dist`
  distDir: ".next",
  async redirects() {
    return [
      {
        source: "/sleep",
        destination: "/zzzmachine",
        permanent: false,
      },
      {
        source: "/zzzmaker",
        destination: "/zzzmachine",
        permanent: false,
      },
    ];
  },
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
      {
        source: "/oh-dear/",
        destination: "/oh-dear/index.html",
      },
      {
        source: "/oh-dear/sounds/:sound*",
        destination: "/hl-sounds/:sound*",
      },
    ];
  },
  trailingSlash: true,
};

module.exports = nextConfig;
