import React, {Component} from 'react'
import TxModal from '../tx-modal/tx-modal'
import ProductModal from "../product-modal/product-modal"
import {fetchProducts} from "../../services/products"

import './styles.css'

class ProductsList extends Component {

	state = {
		products: [],
		saleModal: false,
		entryModal: false,
		productModal: false
	}

	componentDidMount() {
		this._fetchProducts()
	}

	_fetchProducts = async () => {
		const response = await fetchProducts()
		console.log(response)
		if (response.status === 200) {
			const products = response.data
			this.setState({ products })
		}
	}

	_closeModal = modal => () => {
		this.setState({ [modal]: false })
		this._fetchProducts()
	}

	_openModal = name => () => {
		this.setState({ [name]: true })
	}

	render() {
		const {products, saleModal, entryModal, productModal} = this.state
		return (
			<div className="p-container">
				{ productModal && <ProductModal isOpen={productModal} onClose={this._closeModal('productModal')}/>}
				{ saleModal && <TxModal isOpen={saleModal} type='sale' onClose={this._closeModal('saleModal')} products={products}/>}
				{ entryModal && <TxModal isOpen={entryModal} type='entry' onClose={this._closeModal('entryModal')} products={products}/>}
				<div className="actions">
					<h4>Productos</h4>
					<div className="buttons-bar">
						<button className="btn btn-success btn-raised" onClick={this._openModal('productModal')}>Crear Producto</button>
						<button className="btn btn-success btn-raised" onClick={this._openModal('entryModal')}>Registrar Ingreso</button>
						<button className="btn btn-success btn-raised" onClick={this._openModal('saleModal')}>Registrar Venta</button>
					</div>
				</div>
				<hr/>
				<table className="table table-striped">
					<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Precio</th>
						<th>Stock</th>
					</tr>
					</thead>
					<tbody>
						{products.map(p => (
							<tr>
								<td>{p.id}</td>
								<td>{p.name}</td>
								<td>{p.price}</td>
								<td>{p.stock}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ProductsList
