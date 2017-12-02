

app.get('/search-location/:location', (req, res) => {
//async//await //pass in the query (database/url)
  db.Locations.findAll({
    where: [{
        placeID: req.params.placeID
      }]
    }).then(function(dbLocations) {
      res.json(dbLocations);
    });
})


app.get('/search-date/:date', (req, res) => {
//async 
//await 
//pass in the query (database/url)
})


app.get('/search-user/:user', (req, res) => {
//async 
//await 
//pass in the query (database/url)
})


app.post('/submit-tip', (req, res) => {
//post req object to database //create the tip (in db) //send info to stripe
}

app.get('/tipped-transactions', (req, res) => {
  //pulls all historical transactions (tips given)
  db.Transactions.findAll({
    where: [{
        SenderID: req.params.senderID
      }]
    }).then(function(dbTransactions) {
      res.json(dbTransactions);
    });
}


app.get('/recieved-transactions', (req, res) => {
  //pull up all historical transactions amounts that tipster recieves.
  db.Transactions.findAll({
  where: [{
      recieverID: req.params.renderID
    }]
  }).then(function(dbTransactions) {
    res.json(dbTransactions);
  });
}





