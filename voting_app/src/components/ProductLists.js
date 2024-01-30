import {useState, useEffect} from 'react';
import Product from './Product';

const ProductList = () => {
	const [products, setProducts] 
		= useState([]);
		
	useEffect(() => {
		setProducts(window.Seed.products);
	}, [])
		
	const handleProductUpVote = (productId) => {
		const nextProducts = products.map(p => {
			if(p.id === productId) {
				return Object.assign({}, p, {
					votes: p.votes + 1
				});
			} else {
				return p;
			}
		})
		setProducts(nextProducts);
	}
	
	return (
		<div className='ui unstackable items'>
			{products.sort((a, b) => b.votes - a.votes).map((p) => 
			<Product 
				key={p.id} 
				{...p} 
				handleProductUpVote={handleProductUpVote} />
			)}
		</div>
	)
}

export default ProductList;