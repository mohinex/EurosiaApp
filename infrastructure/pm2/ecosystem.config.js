module.exports = {
  apps: [{
    name: 'eurosia-api',
    script: 'dist/apps/api/main.js',
    instances: 'max',
    exec_mode: 'cluster'
  }]
};
