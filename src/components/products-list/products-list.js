import React, {Component} from 'react'
import TxModal from '../tx-modal/tx-modal'
import ProductModal from "../product-modal/product-modal"
import {fetchProducts} from "../../services/services"

import './styles.css'
import {fetchMasterValues} from "../../services/services";

class ProductsList extends Component {

	state = {
		products: [],
		saleModal: false,
		entryModal: false,
		productModal: false,
		transactionTypes: [],
		productTypes: []
	}

	componentDidMount() {
		this._fetchProducts()
		this._fetchProductMasterValues()
		this._fetchTxMasterValues()
	}

	_fetchProducts = async () => {
		const response = await fetchProducts()
		console.log(response)
		if (response.status === 200) {
			const products = response.data.answerList
			this.setState({ products })
		}
	}

	_fetchTxMasterValues = async () => {
		const type = 'TRANSACTION_TYPE'
		const response = await fetchMasterValues(type)
		console.log(response)
		if (response.status === 200) {
			const transactionTypes = response.data.answerList
			this.setState({ transactionTypes })
		}
	}

	_fetchProductMasterValues = async () => {
		const type = 'PRODUCT_BASE_TYPE'
		const response = await fetchMasterValues(type)
		console.log(response)
		if (response.status === 200) {
			const productTypes = response.data.answerList
			this.setState({ productTypes })
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
		const {products, saleModal, entryModal, productModal, productTypes, transactionTypes} = this.state
		return (
			<div className="p-container">
				{ productModal && <ProductModal isOpen={productModal} onClose={this._closeModal('productModal')} types={productTypes}/>}
				{ saleModal && <TxModal isOpen={saleModal} type='sale' onClose={this._closeModal('saleModal')} products={products}  types={transactionTypes}/>}
				{ entryModal && <TxModal isOpen={entryModal} type='entry' onClose={this._closeModal('entryModal')} products={products} types={transactionTypes}/>}
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
						<th>Tipo</th>
						<th>Stock</th>
					</tr>
					</thead>
					<tbody>
						{products.map(p => (
							<tr>
								<td>{p.id}</td>
								<td>{p.name}</td>
								<td>{p.basedTypeId.name}</td>
								<td>{p.currentQuantityStock}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ProductsList
