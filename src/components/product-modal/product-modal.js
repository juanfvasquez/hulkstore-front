import React, {Component} from 'react'
import Modal from 'react-modal'
import {createProduct} from "../../services/products";

Modal.setAppElement('#root')

class ProductModal extends Component {
	state = {
		name: '',
		price: ''
	}

	handleChange = name => evt => {
		this.setState({ [name]: evt.target.value })
	}

	_submit = async () => {
		const {onClose} = this.props
		const response = await createProduct(this.state)
		if (response.status === 200) {
			onClose()
		} else {
			console.log(response)
			alert('Error creando producto')
		}
	}


	render() {
		const {isOpen, onClose} = this.props
		const {name, price} = this.state
		return (
			<Modal isOpen={isOpen} onRequestClose={onClose}>
				<div className="container">
					<div className="row">
						<h4>Crear producto</h4>
					</div>
					<div className="row">
						<div className="col-xs-12 col-md-6">
							<div className="form-group">
								<label htmlFor="txtName">Nombre</label>
								<input type="text" className="form-control" value={name} onChange={this.handleChange('name')}/>
							</div>
						</div>
						<div className="col-xs-12 col-md-6">
							<div className="form-group">
								<label htmlFor="txtPrice">Precio</label>
								<input type="number" className="form-control" value={price} onChange={this.handleChange('price')} min="1"/>
							</div>
						</div>
					</div>
					<div className="row">
						<button className="btn btn-success btn-raised" onClick={this._submit}>Crear</button>
					</div>
				</div>
			</Modal>
		);
	}
}

export default ProductModal
