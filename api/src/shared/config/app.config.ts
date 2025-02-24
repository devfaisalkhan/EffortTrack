export default () => ({
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_SECRET,
    secret: process.env.JWT_SECRET,
  },

  database: {
    location: process.env.DATABASE_LOCATION,
    seedData: process.env.SEED_DATA,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE,
  },

  app: {
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    localPort: parseInt(process.env.LOCAL_PORT, 10) || 3000,
    swaggerPath: process.env.SWAGGER_PATH,
  },

  files: {
    destination: process.env.FILES_DESTINATION,
  },

  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    secure: process.env.EMAIL_SECURE,
    from: process.env.EMAIL_FROM,
  },
});
