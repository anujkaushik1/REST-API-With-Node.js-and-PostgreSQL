const client = require("./connection");
const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("Server is running at port", 3000);
});

client.connect();

app.get("/users", function (req, res) {
  client.query(`Select * from users`, function (err, results) {
    if (!err) {
      res.status(200).json({
        success: true,
        data: results.rows,
      });
    }
  });

  client.end;
});

app.get('/users/:id', function(req, res){
    client.query(`Select * from users where id=${req.params.id}`, function(err, results){
        if(!err){
            res.status(200).json({
                success : true,
                data : results.rows
            });
        }
    });
    client.end;
});