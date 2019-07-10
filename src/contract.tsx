import React, { Component } from 'react';
import { Form,Button,Input,Message,Header,Icon } from 'semantic-ui-react'
// import Layout from '../../components/Layout.js';
// import factory from '../../ethereum/factory';
// import web3 from '../../ethereum/web3';
// import { Router } from '../../routes';

type MyProps = { };
type MyState = { title: string,
				 contract_details:string };

class Contract extends Component<MyProps, MyState>{
	constructor(props:any){
		super(props);
		this.state ={
			title:'',
			contract_details:''
		};
	}


	getContractDetails(){
		console.log("this is contract. hurray");
		fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({contract_details:JSON.stringify(json)})
		})
	}
	// onSubmit = async (event) => {
	// 	event.preventDefault();

	// 	this.setState({loading: true, errorMessage:''});

	// 	try{
	// 		const accounts = await web3.eth.getAccounts();
	// 		await factory.methods.createCampaign(this.state.chooseCategory, this.state.title,
	// 																				this.state.minimumContribution, this.state.description)
	// 			.send({
	// 			from: accounts[0]
	// 		});

	// 		Router.pushRoute('/');
	// 	} catch(err){
	// 		this.setState({ errorMessage: err.message });
	// 	}

	// 	this.setState({loading:false});
	// };

	render(){
		return(

			<div>

				<p>this is my div</p>
				<p>{this.state.title}</p>
				<input value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})} ></input>
				<br></br>
				<button onClick={this.getContractDetails}> get Contract Details </button>
				<p>{this.state.contract_details}</p>
				</div>
			//  </Layout>
		);
	}
}

export default Contract;
