import React, {Component} from 'react'
import Modal from 'react-modal'

import './styles.css'
import {createTransaction} from "../../services/services";

Modal.setAppElement('#root')

class TxModal extends Component {
	state = {
		product: '',
		quantity: 1,
		transactionTypeId: 0
	}

	componentDidMount() {
		const typeMap = {
			'sale': 'RETIRO',
			'entry': 'INGRESO'
		}
		const {types, type} = this.props
		const currentType = types.filter(t => t.name === typeMap[type])[0]
		this.setState({ transactionTypeId: currentType.id })
	}

	handleChange = name => evt => {
		this.setState({ [name]: evt.target.value })
	}

	_submit = async () => {
		const {product, quantity, transactionTypeId} = this.state
		const productObj = this.getProductById(product)
		const {type, onClose} = this.props
		if (!this.state.product) {
			alert('Debe seleccionar un producto')
			return
		}
		if (productObj.currentQuantityStock < quantity) {
			alert('No hay suficientes unidades')
			return
		}
		const data = {
			modifiedQuantity: quantity,
			createdUserId: 1,
			transactionTypeId: {
				id: transactionTypeId
			},
			productId: {
				id: product,
			}
		}
		console.log(data)
		const response = await createTransaction(data)
		if (response.status === 200) {
			alert('Registrado correctamente')
			onClose()
		} else {
			console.log(response)
		}
	}

	getProductById = (id) => {
		const {products} = this.props
		for (let i = 0; i < products.length; i++) {
			if (Number(`${products[i].id}`) === Number(`${id}`)) {
				return products[i]
			}
		}
		return null
	}

	render() {
		const {isOpen, onClose, products, type} = this.props
		const {product, quantity} = this.state
		return (
			<Modal isOpen={isOpen} onRequestClose={onClose}>
				<div className="container">
					<div className="row">
						<h4>Registrar {type === 'sale' ? 'Venta' : 'Ingreso'}</h4>
					</div>
					<div className="row">
						<div className="col-xs-12 col-md-6">
							<div className="form-group">
								<label htmlFor="selectProduct">Producto</label>
								<select id="selectProduct" className="form-control" value={product} onChange={this.handleChange('product')}>
									<option value="">Seleccione producto</option>
									{ products.map(p => (
										<option value={p.id}>{p.name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-xs-12 col-md-6">
							<div className="form-group">
								<label htmlFor="txtQuantity">Cantidad</label>
								<input type="number" className="form-control" value={quantity} onChange={this.handleChange('quantity')} min="1"/>
							</div>
						</div>
					</div>
					<div className="row">
						<button className="btn btn-success btn-raised" onClick={this._submit}>Registrar</button>
					</div>
				</div>
			</Modal>
		);
	}
}

export default TxModal
