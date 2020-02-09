import React, {Component} from 'react'
import Modal from 'react-modal'

import './styles.css'
import {createSale} from "../../services/sales";
import {createEntry} from "../../services/entries";

Modal.setAppElement('#root')

class TxModal extends Component {
	state = {
		product: null,
		quantity: 1
	}

	handleChange = name => evt => {
		this.setState({ [name]: evt.target.value })
	}

	_submit = () => {
		const {product, quantity} = this.state
		const {type} = this.props
		if (!this.state.product) {
			alert('Debe seleccionar un producto')
			return
		}
		if (product.stock < quantity) {
			alert('No hay suficientes unidades')
			return
		}
		if (type === 'sale') {
			this._registerSale()
		} else {
			this._registerEntry()
		}
	}

	_registerSale = async () => {
		const response = await createSale(this.state)
		console.log(response)
	}

	_registerEntry = async () => {
		const response = await createEntry(this.state)
		console.log(response)
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
										<option value={p}>{p.name}</option>
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
