module.exports = {
  apps: [
    {
      name: "journal",
      cwd: __dirname,
      script: "bash",
      args: [
        "-lc",
        "pnpm --filter journal run build && pnpm --filter journal exec next start -H 0.0.0.0 -p 3000",
      ],
      interpreter: "none",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 5000,
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: "3000",
      },
      time: true,
      merge_logs: true,
    },
  ],
};
