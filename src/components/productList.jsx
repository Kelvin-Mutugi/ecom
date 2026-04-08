import '../styles/productList.css';
import ProductCard from "./productCard";

function ProductList() {
    return(
        <div className="product-list">
         <ProductCard product={{id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' }} />
         <ProductCard product={{id: 2, name: 'Product 2', price: 39.99, image: 'https://via.placeholder.com/150' }} />
         <ProductCard product={{id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/150' }} />   
        </div>
    );
}

export default ProductList;