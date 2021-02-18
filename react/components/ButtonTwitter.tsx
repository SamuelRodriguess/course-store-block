import React, { FC } from 'react'
import useProduct from 'vtex.product-context/useProduct'

 const ButtonTwitter:FC = () => {

    const { product } = useProduct()

    const brand = product?.brand

    console.log('product data',product)

    return (
        <div>
            <a href={`
                https://twitter.com/intent/tweet?button_hashtag=${brand}&ref_src=twsrc%5Etfw`
            } 
            className="twitter-hashtag-button" data-show-count="false">
                Twettar #{brand}
            </a>
        </div>
    )
}

export default ButtonTwitter