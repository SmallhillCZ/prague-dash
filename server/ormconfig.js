module.exports = {
  type: 'postgres',
  host: process.env['PG_HOST'] || 'localhost',
  post: process.env['PORT'] ? Number(process.env['PORT']) : 5432,
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
