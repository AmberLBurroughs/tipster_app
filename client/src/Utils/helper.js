import axios from 'axios'

export default{

	loginHelper: loginState => {

		let user = {
			email: loginState.email,
			password: loginState.password
		};
		axios.post('localhost://8000/login', user)
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

  tipHelper: (token) => {
    let transaction = {
      location: this.props.state.markerClicked.id,
      amount: this.state.amount,
      anonymous: this.state.anonymous,
      note: this.state.note,
      token: token
    }
    axios.post('/tip', transaction)
    .then(res => console.log(res));

  }

}