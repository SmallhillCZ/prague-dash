module.exports = {
  type: 'postgres',
  host: process.env['PG_HOST'] || 'localhost',
  port: process.env['PG_PORT'] ? Number(process.env['PG_PORT']) : 5432,
  username: process.env['PG_USER'] || 'postgres',
  password: process.env['PG_PASSWORD'] || 'password',
  database: process.env['PG_DATABASE'] || 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrationsRun: true,
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
