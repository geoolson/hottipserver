var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tips.db');
 
db.serialize(function() {
  db.run(`CREATE TABLE tips (
      username TEXT,
      lat REAL,
      lng REAL,
      tip INT,
      sub_total INT
      )`);

    db.run(`CREATE TABLE users (
      username TEXT,
      password TEXT,
      permission INT
      )`
    )
 
  var stmt = db.prepare("INSERT INTO tips VALUES (?,?,?,?,?)");
  for (var i = 0; i < 10; i++) {
      stmt.run(0, 45,45,i,i);
  }
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO users VALUES (?,?,?)");
  stmt.run("test", "test", 100);
  stmt.finalize();
 
  db.each("SELECT * FROM tips", function(err, row) {
      console.log(row);
  });
  db.each("SELECT * FROM users", function(err, row) {
      console.log(row);
  });
});
 
db.close();