const createOptions = (APP) => {
  return {
    name: APP,
    script: './dist/apps/' + APP + '/main.js',
    instances: 1,
    autorestart: true,
    error_file: '/app/log/pm2_' + APP + '_error.log',
    out_file: '/app/log/pm2_' + APP + '_out.log',
    max_memory_restart: '4G',
    env_production: {
      APP,
      PORT: 8080,
      NODE_CONFIG_ENV: 'production',
    },
    node_args:
      '--trace-warnings --trace-uncaught --unhandled-rejections=throw --max-old-space-size=3596 --max-semi-space-size=64 --nouse-idle-notification',
    instance_var: 'INSTANCE_ID',
  };
};

module.exports = {
  apps: ['api-gateway', 'user-service'].map((APP) => createOptions(APP)),
};
