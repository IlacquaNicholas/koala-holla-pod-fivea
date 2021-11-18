const express = require('express');
const router = express.Router();

// DB CONNECTION
const pg = require('pg');
// Create a pool object constructor.
const Pool = pg.Pool;
// Create our pool object using the above constructor:
const pool = new Pool({
    database: 'koala-holla', // the name of database, This can change!
    host: 'localhost', // where is your database?
    // port: 5432, // the port for your database, 5432 is default for postgres
    // max: 10, // how many connections (queries) at one time
    // idleTimeoutMillis: 30000 // 30 second to try to connect, otherwise cancel query
});
// Log to our console when our pool object makes a connection:
pool.on('connect', () => {
    console.log('Postgresql connected');
});
// Log to our console when something makes our pool error out:
pool.on('error', (error) => {
    console.log('Error with postgres pool', error)
});

// GET
router.get('/', (req, res) => {
    console.log('GET /koalas');
    const sqlText = 'SELECT * FROM koalasNew;';
    pool.query(sqlText)
      .then((dbResult) => {
        console.log(`${dbResult.rows.length} rows to send.`)
        res.send(dbResult.rows);
      })
      .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
      });
  });



// POST
router.post('/', (req, res) => {
    console.log('POST /koalas');
    console.log('req.body:', req.body);
    const newKoala = req.body;
    const sqlText = `
      INSERT INTO "KoalasNew"
      ("NAME", "AGE", "GENDER", "READY FOR TRANSFER", "NOTES")
      VALUES
        ($1, $2, $3, $4, $5);
    `;
    const sqlValues = [
      newKoala.name,
      newKoala.age,  //not sure 
      newKoala.gender,
      newKoala.readyForTransfer,
      newKoala.notes
    ];
    pool.query(sqlText, sqlValues)
      .then((dbResult) => {
        console.log('INSERT succeeded.');
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
      });
  });

// PUT


// DELETE

module.exports = router;