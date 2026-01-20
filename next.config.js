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
        source: "/zzzmachine",
        destination: "/sleep",
        permanent: false,
      },
      {
        source: "/zzzmaker",
        destination: "/sleep",
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
        destination: "/sleep",
        has: [
          {
            type: "host",
            value: "sleep.evin.dev",
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
