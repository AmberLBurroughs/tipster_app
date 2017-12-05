// import axios from 'axios'

// export default {

// 	loginHelper: loginState => {

// 		let user = {
// 			email: loginState.email,
// 			password: loginState.password
// 		};
// 		axios.post('http://localhost:8000/login', user)
// 		.then(response => console.log(response));
// 	},

//   signUpHelper: (signUpState) => {
//     if (!signUpState.match) {
//       console.log(`passwords do not match`)
//     }
//     else {
//       console.log(`passwords match, sending user info`);
//       let newUser = {
//         email: signUpState.email,
//         password: signUpState.password
//       };
//       axios.post('http://localhost:8000/signup', newUser)
//       .then(response => console.log(response));
//     }
//   },

//   tipHelper: (transaction) => {
//     axios.post('http://localhost:8000/api/tip', transaction)
//     .then(res => console.log(res));
//   }

// }