import React, { useEffect, useState } from 'react'
import { countUnique } from '../../../../utils/basicUtils';

const CartItems = ({ cartItems }) => {
    const [cartUniqueItems, setCartUniqueItems] = useState(null);


    let output = '';
    useEffect(() => {
        setCartUniqueItems(countUnique(cartItems))
    }, [])
    for (let property in cartUniqueItems) {
        output += ` ${property}  X ${cartUniqueItems[property]}, `
    }

    return (
        <>
            {
                output
            }
        </>
    )
}

export default CartItems
