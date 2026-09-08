module.exports = {
  apps: [
    {
      name: "journal",
      cwd: `${__dirname}/apps/journal`,
      script: "pnpm",
      args: [
        "exec",
        "next",
        "start",
        "-H",
        "127.0.0.1",
        "-p",
        "3000",
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
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
      },
      time: true,
      merge_logs: true,
    },
  ],
};
