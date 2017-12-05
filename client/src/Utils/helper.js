import axios from 'axios'

export default {

	loginHelper: loginState => {

		let user = {
			email: loginState.email,
			password: loginState.password
		};
		axios.post('/login', user)
		.then(response => console.log(response));
	},

  signUpHelper: (signUpState) => {
    if (!signUpState.match) {
      console.log(`passwords do not match`)
    }
    else {
      console.log(`passwords match, sending user info`);
      let newUser = {
        email: signUpState.email,
        password: signUpState.password
      };
      axios.post('/signup', newUser)
      .then(response => console.log(response));
    }
  },

  tipHelper: (transaction) => {
    axios.post('/api/tip', transaction)
    .then(res => console.log(res));
  }


}