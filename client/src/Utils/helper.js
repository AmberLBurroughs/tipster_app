import axios from 'axios'

export default{

	loginHelper: loginState => {

		let user = {
			email: loginState.email,
			password: loginState.password
		};
		axios.post('/login', user)
		.then( response => console.log(response));
	}

}