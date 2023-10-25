export const databaseConfig = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'yourusername',
  password: 'yourpassword',
  database: 'nest',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
