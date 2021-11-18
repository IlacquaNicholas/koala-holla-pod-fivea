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
      newKoala.age,
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
router.put('/:id', (req, res) => {
  //log that incoming data
  console.log(req.params);
  console.log(req.body);
  //pack it into variables
  const KoalaID = req.params;
  const koala = req.body;
  //DO I NEED to save each req.body.X as a separate variable?

  //prep the sql stuff for pool.query
  const sqlText = `
    UPDATE "koalas"
      SET 
        "NAME" = $1,
        "AGE" = $2,
        "GENDER" = $3,
        "READY FOR TRANSFER" = $4,
        "NOTES" = $5
      WHERE
        "id" = $6
  `;
  //Or can they be called as object values directly here?
  const sqlValues = [
    koala.name,
    koala.age,
    koala.gender,
    koala.readyForTransfer,
    koala.notes,
    KoalaID
  ];
  
  pool.query(sqlText, sqlValues)
    .then((dbResult) => {
      console.log(dbResult);
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.sendStatus(500);
    })
});

// DELETE - COMPLETED
// I'm starting yay
router.delete('/:id', (req, res) => {
  console.log('DELETE /koalas/:id');
  console.log('req.params:', req.params);
  const koalaIdToDelete = req.params.id;
  const sqlText = `
    DELETE FROM "KoalasNew"
      WHERE "id"=$1;
  `;
  const sqlValues = [koalaIdToDelete];

  pool.query(sqlText, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.sendStatus(500);
    })
});



module.exports = router;