import React, {Component} from 'react'
import Modal from 'react-modal'
import {createProduct} from "../../services/services";

Modal.setAppElement('#root')

class ProductModal extends Component {
	state = {
		name: '',
		currentQuantityStock: '',
		type: ''
	}

	handleChange = name => evt => {
		this.setState({ [name]: evt.target.value })
	}

	_validate = () => {
		const {name, currentQuantityStock, type} = this.state
		const messages = []
		if (!name) {
			messages.push('Debe ingresar el nombre')
		}
		if (!currentQuantityStock) {
			messages.push('Debe ingresar un stock')
		}
		if (!type) {
			messages.push('Debe seleccionar el tipo de producto')
		}
		if (messages.length > 0) {
			alert(messages.join('. '))
			return false
		}
		return true
	}

	_submit = async () => {
		if (!this._validate()) {
			return
		}
		const {onClose} = this.props
		const {currentQuantityStock, name, type} = this.state
		const data = {
			currentQuantityStock,
			name,
			createdDate: new Date(),
			createdUserId: 1,
			basedTypeId: {
				id: type
			}
		}
		console.log(data)
		const response = await createProduct(data)
		if (response.status === 200) {
			onClose()
		} else {
			console.log(response)
			alert('Error creando producto')
		}
	}


	render() {
		const {isOpen, onClose, types} = this.props
		const {name, currentQuantityStock, type} = this.state
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
								<label htmlFor="txtStock">Stock</label>
								<input type="number" className="form-control" value={currentQuantityStock} onChange={this.handleChange('currentQuantityStock')} min="1"/>
							</div>
						</div>
						<div className="col-xs-12 col-md-6">
							<div className="form-group">
								<label htmlFor="selectType">Tipo</label>
								<select id="selectType" className="form-control" value={type} onChange={this.handleChange('type')}>
									<option value="">Seleccione tipo</option>
									{ types.map(t => (
										<option value={t.id}>{t.name}</option>
									))}
								</select>
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
