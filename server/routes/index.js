const UserController = require('../controllers').user;

module.exports = (app) => {
  app.get('/api/user', (req, res) => res.status(200).send({
    message: 'Welcome to the Tipster User API!',
  }));

  // app.post('/api/user', todosController.create);
};