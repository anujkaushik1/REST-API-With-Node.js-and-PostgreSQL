const client = require("./connection");
const express = require("express");
const app = express();

app.use(express.json());

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

app.get("/users/:id", function (req, res) {
  console.log(req.params);
  client.query(
    `Select * from users where id=${req.params.id}`,
    function (err, results) {
      if (!err) {
        res.status(200).json({
          success: true,
          data: results.rows,
        });
      }
    }
  );
  client.end;
});

app.post("/users", function (req, res) {
  const user = req.body;
  console.log(user);
  let insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`;
  client.query(insertQuery, function (err, results) {
    if (!err) {
      res.status(200).json({
        success: true,
        data: results,
        length: results.rowCount,
      });
    } else {
      res.json({
        data: err.message,
      });
    }
  });
  client.end;
});

app.put("/users/:id", function (req, res) {
  const user = req.body;
  console.log(user);
  const updateQuery = `UPDATE users
                      SET firstname='${user.firstname}', lastname='${user.lastname}', location='${user.location}'
                      WHERE id=${req.params.id}`;

  client.query(updateQuery, function (err, results) {
    if (!err) {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
    else{
      res.json({
        data : err.message
      })
    }
  });

  client.end;

});

app.delete('/users/:id', function(req, res){
  const deleteQuery = `DELETE FROM public.users
                    	 WHERE id = ${req.params.id}`
  client.query(deleteQuery, function(err, results){
      if(!err){
        res.status(200).json({
          success: true,
          data : results.rows
        })
      }
      else{
        res.json({
          data : err.message
        })
      }
  });


})
