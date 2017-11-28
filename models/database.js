const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/tipster_db';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });

/////////////////////////////////////////

const dbConfig = {
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
  max: config.db.max,
  idleTimeoutMillis: config.db.idleTimeoutMillis,
}

const pool = new pg.Pool(dbConfig)
pool.on('error', function (err) {
  winston.error('idle client error', err.message, err.stack)
})