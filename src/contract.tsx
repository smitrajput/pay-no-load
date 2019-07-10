import React, { Component } from 'react';
import { Container, Form,Button,Input,Message,Header,Icon, Segment, Table, Label } from 'semantic-ui-react'
// import { addABI, decodeMethod } from 'abi-decoder';
// import abiDecoder from 'abi-decoder';
const abiDecoder = require('abi-decoder');
import { array } from "prop-types";
const moment = require("moment");
// import Layout from '../../components/Layout.js';
// import factory from '../../ethereum/factory';
// import web3 from '../../ethereum/web3';
// import { Router } from '../../routes';

let txn;
type MyProps = { };
type MyState = {
				title: string,
				contract_details:string,
				token_details:any,
				params:any,
				transaction_details:any,
				contract_address:any,
				account_address:any,
				token_balances:any,
				contract_abi:any,
				token_contract_address:any,
				transaction_hash:any,
				transactions:any,
				raw_data:any,
				tokenDetail: any
				decodedDataLatest: any
				// transactions:any
				};

class Contract extends Component<MyProps, MyState>{

	constructor(props:any){
		super(props);
		this.state ={
			title:'',
			contract_details:'',
			token_details:'',
			params:{"params":[]},
			transaction_details:'',
			contract_address:'',
			account_address:'',
			token_balances:[],
			contract_abi:'',
			token_contract_address:'',
			transaction_hash:'',
			transactions:[],
			raw_data:'',
			decodedDataLatest:{"params":[]}
		};
		this.getContractDetails.bind(this);
		// this._renderAccountTokenBalances.bind(this);
	}


	getContractDetails = async () => {
		console.log("this is contract. hurray");
		var request = 'https://api.aleth.io/v1/contracts/0x2af47a65da8CD66729b4209C22017d6A5C2d2400'
		await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({contract_details:JSON.stringify(json)})
		})
	}

	getTokenDetails = async () => {
		console.log("this is contract. hurray");
		var request = `https://api.aleth.io/v1/tokens/${this.state.token_contract_address}`
		await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({token_details:json})
		})
	}

	getTokenBalance = async () => {
		// console.log("this is contract. hurray");
		let url = `https://web3api.io/api/v1/addresses/${this.state.account_address}/tokens`;
		let api_key = "UAK85fcd3c978f3c11801d9dbb5c989a815";
		let data;
		try{
			data = await fetch(url, {
				method: 'GET',
				headers: {
					'x-api-key': api_key,
				}
			});
		}
		catch{
			console.log('error')
			return;
		}
	let jsonData = await data.json();
		console.log(jsonData);
		this.setState({token_balances:jsonData["payload"]["records"]})
	}

	getTransactions = async () => {
		let jsonData;
		let data;
		try{
			var request = `https://api.aleth.io/v1/contracts/${this.state.contract_address}/transactions`
			await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(jsonData => {
			console.log(jsonData["data"]);
			// this.setState({transactions:(jsonData["data"])})
			// console.log(this.state.transactions);
			this.setState({transactions:jsonData["data"]})
		})
		}
		catch{
			console.log('error');
			return;
		};
	}

	decodeParams = async () => {
		// console.log(typeof(this.state.contract_abi))
		// console.log(typeof((this.state.contract_abi)))
		const testABI = JSON.parse(this.state.contract_abi) ;
		// const testABI = [{"inputs": [{"type": "address", "name": ""}], "constant": true, "name": "isInstantiation", "payable": false, "outputs": [{"type": "bool", "name": ""}], "type": "function"}, {"inputs": [{"type": "address[]", "name": "_owners"}, {"type": "uint256", "name": "_required"}, {"type": "uint256", "name": "_dailyLimit"}], "constant": false, "name": "create", "payable": false, "outputs": [{"type": "address", "name": "wallet"}], "type": "function"}, {"inputs": [{"type": "address", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "instantiations", "payable": false, "outputs": [{"type": "address", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "creator"}], "constant": true, "name": "getInstantiationCount", "payable": false, "outputs": [{"type": "uint256", "name": ""}], "type": "function"}, {"inputs": [{"indexed": false, "type": "address", "name": "sender"}, {"indexed": false, "type": "address", "name": "instantiation"}], "type": "event", "name": "ContractInstantiation", "anonymous": false}];
		console.log("Test API ",testABI);
		abiDecoder.addABI(testABI);
		const testData = this.state.raw_data;
		// const testData = '0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa';
		// console.log(typeof(testABI))
		console.log("contract abi  : ", testABI);
		console.log("raw data : ", testData);

		let decodedData = abiDecoder.decodeMethod(testData);
		console.log("decoded data ",decodedData);

		this.setState({params:decodedData})
	}

	getTransactionAndDecode = async () => {
		let jsonData;
		let data;
		// await this.decodeParams();
		try{
			var request = `https://api.aleth.io/v1/transactions/${this.state.transaction_hash}`
			await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(jsonData => {
			console.log(jsonData);
			// this.setState({transactions:(jsonData["data"])})
			// console.log(this.state.transactions);
			this.setState({transaction_details:JSON.stringify(jsonData)})
			this.setState({raw_data:jsonData['data']['attributes']['msgPayload']['raw']})
			// this.setState.raw_data = (jsonData['data']['attributes']['msgPayload']['raw'])
			this.decodeParams();
		})
		}
		catch{
			console.log('error');
			return;
		};
	}

	// _renderAccountTokenBalances = async () => {
	// 	console.log(this.state.token_balances)
	// 	if(this.state.token_balances != null){
	// 		return this.state.token_balances.map((tokenDetails: any, index: any) => {
	// 			let {address, holder, amount, decimals, name, symbol, isERC20, isERC721, isERC777, isERC884, isERC998} = tokenDetails;
	// 			return(
	// 				<tr key={address} className="">
	// 					<td className="">{name} [{symbol}]</td>
	// 					<td className="">{amount*Math.pow(10, -1 * decimals)}</td>
	// 				</tr>
	// 				// <Table.Row key={address}>
	// 				// 	<Table.Cell>{name} [{symbol}]</Table.Cell>
	// 				// 	{/* <Table.Cell>{symbol}</Table.Cell> */}
	// 				// 	<Table.Cell>{amount*Math.pow(10, -1 * decimals)}</Table.Cell>
	// 				// </Table.Row>
	// 			)
	// 		})
	// 	}
	// }
	decodeFromLatest = async(txnDetails: any) => {
		let jsonData;
		let data;
		// await this.decodeParams();
		// try{
			console.log(txnDetails)
			var request = `https://api.aleth.io/v1/transactions/${txnDetails.id}`
			await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
				}
			})
			.then(response => response.json())
			.then(jsonData => {
				console.log(jsonData);

				// this.setState({})
				// this.setState({transactions:(jsonData["data"])})
				// console.log(this.state.transactions);
				// Contract.setState({transaction_details:JSON.stringify(jsonData)})
				this.setState({raw_data:jsonData['data']['attributes']['msgPayload']['raw']})
				// this.setState.raw_data = (jsonData['data']['attributes']['msgPayload']['raw'])
				// this.decodeParams();
				const testABI = JSON.parse(this.state.contract_abi) ;
				// const testABI = [{"inputs": [{"type": "address", "name": ""}], "constant": true, "name": "isInstantiation", "payable": false, "outputs": [{"type": "bool", "name": ""}], "type": "function"}, {"inputs": [{"type": "address[]", "name": "_owners"}, {"type": "uint256", "name": "_required"}, {"type": "uint256", "name": "_dailyLimit"}], "constant": false, "name": "create", "payable": false, "outputs": [{"type": "address", "name": "wallet"}], "type": "function"}, {"inputs": [{"type": "address", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "instantiations", "payable": false, "outputs": [{"type": "address", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "creator"}], "constant": true, "name": "getInstantiationCount", "payable": false, "outputs": [{"type": "uint256", "name": ""}], "type": "function"}, {"inputs": [{"indexed": false, "type": "address", "name": "sender"}, {"indexed": false, "type": "address", "name": "instantiation"}], "type": "event", "name": "ContractInstantiation", "anonymous": false}];
				console.log("Test API ",testABI);
				abiDecoder.addABI(testABI);
				const testData = this.state.raw_data;
				// const testData = '0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa';
				// console.log(typeof(testABI))
				console.log("contract abi  : ", testABI);
				console.log("raw data : ", testData);

				let decodedData = abiDecoder.decodeMethod(testData);
				console.log("decoded data ",decodedData);

				this.setState({decodedDataLatest:decodedData})
			})
		// }
		// catch{
		// 	console.log('error');
		// 	return;
		// };
	}

	TxnRow = (props: any) => {
		function handleClick(){
			props.onClick(props.data);
		}
		// console.log(props)
		return(
			<tr className="" onClick={handleClick}>
				<td className="" style={{textAlign:"center"}}>{props.data.id}</td>
				<td className="" style={{textAlign:"center"}}>{moment.unix(parseInt(props.data.attributes.blockCreationTime)).local().toString()}</td>
				{/* <td className="">{props.data.relationships.from.data.id}</td>
				<td className="">{props.data.relationships.to.data.id}</td> */}
			</tr>
		)
	}

	ParamsRow = (props:any) => {
		return(
			<tr className="">
				<td className="">{props.data.name} [{props.data.type}]</td>
				<td className="">{props.data.value}</td>
			</tr>
		)
	}

	render(){
		let contractTokenDetails;
		if(this.state.token_details != ""){
			if(this.state.token_details["errors"] == undefined){
				contractTokenDetails =
				<Container style={{margin:10}}>
				<Table definition>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Token Name:</Table.Cell>
							<Table.Cell>{this.state.token_details["data"]["attributes"]["name"]}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Symbol:</Table.Cell>
							<Table.Cell>{this.state.token_details["data"]["attributes"]["symbol"]}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Total Supply:</Table.Cell>
							<Table.Cell>{this.state.token_details["data"]["attributes"]["totalSupply"]}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Decimals:</Table.Cell>
							<Table.Cell>{this.state.token_details["data"]["attributes"]["decimals"]}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
			}
			else{
				contractTokenDetails =
				<Container style={{margin:10}}>
					<Header inverted as="h4">Error: </Header> Address is not a token contract address!
				</Container>

			}
		}
		else{
			contractTokenDetails = <Container style={{margin:10}}></Container>
		}


		let rows = this.state.token_balances.map((tokenDetails: any) => {
			// let {address, holder, amount, decimals, name, symbol, isERC20, isERC721, isERC777, isERC884, isERC998} = tokenDetails;
			return <AccountTokenBalanceRow key={tokenDetails.address} data={tokenDetails}></AccountTokenBalanceRow>
		})

		let accountTokenDetails;
		if(this.state.token_balances != ""){
			accountTokenDetails =
			<Container style={{margin:10}}>
				<table className="ui definition table">
					<tbody className="">
						{rows}
					</tbody>
				</table>
			</Container>
		}
		else{
			accountTokenDetails = <Container style={{margin:10}}></Container>
		}

		let txnRows = this.state.transactions.map((txnDetails: any) => {
			return <this.TxnRow key={txnDetails.id} data={txnDetails} onClick={this.decodeFromLatest}></this.TxnRow>
		})
		let txnDetails;
		if(this.state.transactions != ""){
			txnDetails =
			<Container style={{margin:10}}>
				<p style={{textAlign:"center"}}>[Click on a transaction to decode it]</p>
				<table className="ui table">
					<thead className="">
						<th className="" style={{textAlign:"center"}}>Transaction Hash</th>
						<th className="" style={{textAlign:"center"}}>Timestamp</th>
					</thead>
					<tbody className="">
						{txnRows}
					</tbody>
				</table>
			</Container>
		}


		let decodedLatestRows = this.state.decodedDataLatest.params.map((param: any) => {
			return <this.ParamsRow key={param.name} data={param}></this.ParamsRow>
		})
		let decodedFromLatest;
		if(this.state.decodedDataLatest.params.length != 0){
			decodedFromLatest =
			<Container style={{margin:10}}>
				<Table definition>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Function Called</Table.Cell>
							<Table.Cell>{this.state.decodedDataLatest.name}</Table.Cell>
						</Table.Row>
						{decodedLatestRows}
					</Table.Body>
				</Table>
			</Container>
		}
		else{
			decodedFromLatest = <Container style={{margin:10}}></Container>
		}

		let decodedParamsRows = this.state.params.params.map((param: any) => {
			return <this.ParamsRow key={param.name} data={param}></this.ParamsRow>
		})
		let decodedParams;
		console.log(this.state.params)
		if(this.state.params.params.length != 0){
			decodedParams =
			<Container style={{margin:10}}>
				<Table definition>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Function Called</Table.Cell>
							<Table.Cell>{this.state.params.name}</Table.Cell>
						</Table.Row>
						{decodedParamsRows}
					</Table.Body>
				</Table>
			</Container>
		}
		else{
			decodedParams = <Container style={{margin:10}}></Container>
		}


		return(

			<div>
				<Container fluid>
					<div style={ {marginLeft: 10, marginRight: 10}}>
						<Container fluid>
							<Segment style={{background: "#f7f8fa"}}>
								<Form inverted>
								<Header style={{color: "#357cff"}} as="h2" textAlign="center">Token Contract Details</Header>
									<Form.Group widths='equal'>
										<Label style={{background: "#f7f8fa",color: "#357cff"}}>Enter Token Contract Address</Label>
										<Form.Input style={{color: "#357cff"}} fluid placeholder='Token Contract Address' value={this.state.token_contract_address} onChange={(e)=>this.setState({token_contract_address:e.target.value})}/>
										{/* <Form.Input fluid label='Last name' placeholder='Last name' /> */}
									</Form.Group>
									<Button style={{background: "#357cff", color:"#ffffff"}} type='submit' onClick={this.getTokenDetails}>Get Token Details</Button>
									{contractTokenDetails}
								</Form>
							</Segment>
						</Container>
					</div>

					<div style={ {marginLeft: 10, marginRight: 10, marginTop: 20}}>
						<Container fluid>
							<Segment style={{background: "#f7f8fa"}}>
								<Form inverted>
								<Header style={{color: "#357cff"}} as="h2" textAlign="center">Account Token Balances</Header>
									<Form.Group widths='equal'>
										<Label style={{background: "#f7f8fa",color: "#357cff"}}>Enter Account Address</Label>
										<Form.Input fluid placeholder='Account Address' value={this.state.account_address} onChange={(e)=>this.setState({account_address:e.target.value})}/>
										{/* <Form.Input fluid label='Last name' placeholder='Last name' /> */}
									</Form.Group>
									<Button style={{background: "#357cff", color:"#ffffff"}} type='submit' onClick={this.getTokenBalance}>Get Token Balances</Button>
									{accountTokenDetails}
								</Form>
							</Segment>
						</Container>
					</div>

					<div style={ {marginLeft: 10, marginRight: 10, marginTop: 20}}>
						<Container fluid>
							<Segment style={{background: "#f7f8fa"}}>
								<Form inverted>
								<Header style={{color: "#357cff"}} as="h2" textAlign="center">Decode Transaction Parameters</Header>
									<Form.Group widths="equal">
										<Label style={{background: "#f7f8fa",color: "#357cff"}}>Enter Contract ABI</Label>
										<Form.Input fluid placeholder='Contract ABI' value={this.state.contract_abi} onChange={(e)=>this.setState({contract_abi: e.target.value})}/>
									</Form.Group>
									<Form.Group widths='equal'>
										<Label style={{background: "#f7f8fa",color: "#357cff"}}>Enter Contract Address</Label>
										<Form.Input fluid placeholder='Contract Address' value={this.state.contract_address} onChange={(e)=>this.setState({contract_address:e.target.value})}/>
										<Button style={{background: "#357cff", color:"#ffffff"}} type='submit' onClick={this.getTransactions}>Get Contract Transactions [10 Latest]</Button>
									</Form.Group>

									{txnDetails}
									{decodedFromLatest}
									<Form.Group widths="equal" style={{marginTop: 20}}>
										<Label style={{background: "#f7f8fa",color: "#357cff"}}>Enter Transaction Hash</Label>
										<Form.Input fluid placeholder="Transaction Hash" value={this.state.transaction_hash} onChange={(e)=>this.setState({transaction_hash:e.target.value})}/>
										<Button style={{background: "#357cff", color:"#ffffff"}} type="submit" onClick={this.getTransactionAndDecode}> Get Decoded Parameters for the Transaction</Button>
									</Form.Group>

									{decodedParams}
								</Form>
							</Segment>
						</Container>
					</div>
				</Container>
			</div>



			// 	<p>Enter Transaction Hash : </p>
			// 	<input value={this.state.transaction_hash} onChange={(e)=>this.setState({transaction_hash:e.target.value})} ></input>
			// 	<br />

			// 	<button onClick={this.decodeParams}> get Decoded Parameters for the transaction </button>
			// 	<p>{this.state.params}</p>

			// 	{/* <button onClick={this.getTransactions}> get Transaction Details </button>
			// 	<p>{this.state.transaction_details}</p>
			// 	<p> Decoded Parameters : <br /> {this.state.params}</p> */}
			// 	</div>
			//  </Layout>
		);
	}
}

const AccountTokenBalanceRow = (props) => {
	return(

		<tr className="">
			<td className="">{props.data.name} [{props.data.symbol}]</td>
			<td className="">{props.data.amount*Math.pow(10, -1 * props.data.decimals)}</td>
		</tr>

	)
}



export default Contract;
