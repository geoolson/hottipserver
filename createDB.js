var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tips.db');
 
db.serialize(function() {
  db.run(`CREATE TABLE tips (
      user_id INT,
      lat REAL,
      lng REAL,
      tip INT,
      sub_total INT
      )`);
 
  var stmt = db.prepare("INSERT INTO tips VALUES (?,?,?,?,?)");
  for (var i = 0; i < 10; i++) {
      stmt.run(0, 45,45,i,i);
  }
  stmt.finalize();
 
  db.each("SELECT * FROM tips", function(err, row) {
      console.log(row);
  });
});
 
db.close();