/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url:"postgresql://generator_db_owner:2meEorXSNc6O@ep-dark-block-a5dhz826.us-east-2.aws.neon.tech/generator_db?sslmode=require",
    }
  };