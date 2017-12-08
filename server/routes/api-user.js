const UserController = require('../controllers/user');
const { getUser, getUser2, updateUser } = UserController;
const { StripeCustomer, User, Transaction, Location } = require('../models');

const express = require("express");
const router = express.Router();
//router on root /api/user

router.get("/history", (req,res) => {
  const USER = getCurrentuserId(req);
  console.log("\n#######id,", req.session)
  console.log("\n>>>>>>hello", req.headers);
  console.log("%%%%%",req.isAuthenticated())
  console.log(`USER: ${USER}`);
  if(!req.isAuthenticated()){ 
    console.log(`not authenticated`);
    res.status(400).json({success: false, message: "Not logged in"})
  }

  Transaction.findAndCountAll({
    // fields: [User.firstName],
    where: {
      fk_tipperuuid: USER
    },
    include: [
      {model: Location},
      {
        model: User,
      },
    ],
  })
  .then(result => {
    console.log(result.count);
    console.log(result.rows);
    res.json(result);
  });

})

module.exports = router;
