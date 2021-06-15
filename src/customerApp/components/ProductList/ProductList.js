import React from 'react'
import { useStateValue } from '../../../context/StateProvider';
import { displayFilter } from '../../../utils/basicUtils';
import Product from '../Product/Product'
import './ProductList.css'

function ProductList() {
    const [{ products, }, ] = useStateValue();
    
    return (
        <div className="productList">
            
            <div className="productList__row">
            {
              displayFilter(products)?.map((product,index) =>(
                  <Product
                  key={product.docId}
                    id={product.docId}
                    title={product.title}
                    price={product.price}
                    rating={product.rating}
                    image={product.image}
                    seller={product.seller}
                  />
                  
              ))
          }
            </div>
           
        </div>
    )
}

export default ProductList
