import { useEffect, useState } from 'react'
import './App.scss'
import Card from './Card'
import { shoes } from './assets/shoes.json'
import { useDispatch, useSelector } from 'react-redux'
import productSlice from './redux/productSlice'
import trashImg from './assets/trash.png'

function App(props) {
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products)
    const { add, remove, purge } = productSlice.actions
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let price = Object.values(products).reduce(
            (acc, product) => acc + product.amount * product.price,
            0
        )
        price = Math.floor(price * 100) / 100
        setTotalPrice(price)
    }, [products])

    function handleAdd(product) {
        dispatch(add(product))
    }

    function handleRemove(product) {
        dispatch(remove(product))
    }

    function handlePurge(product) {
        dispatch(purge(product))
    }

    function Cart() {
        if (Object.keys(products).length === 0) {
            return <div className="cart">Your cart is empty</div>
        }
        return (
            <div className="cart">
                {Object.values(products).map((product) => {
                    return (
                        <div className="cart-item" key={product.id}>
                            <div className="cart-item-img-container">
                                <div
                                    style={{
                                        backgroundColor: product.color,
                                    }}
                                ></div>
                                <img
                                    src={product.image}
                                    alt="product-image"
                                    className="product-img"
                                />
                            </div>
                            <div className="cart-item-content">
                                <h1>{product.name}</h1>
                                <p className="price">{'$' + product.price}</p>
                                <div className="controller">
                                    <button onClick={() => handleAdd(product)}>+</button>
                                    <p>{product.amount}</p>
                                    <button onClick={() => handleRemove(product)}>-</button>
                                </div>
                                <img
                                    onClick={() => handlePurge(product)}
                                    className="delete"
                                    src={trashImg}
                                    alt="trash-can"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="container">
            <Card title="Our Products">
                {shoes.map((shoe) => {
                    return (
                        <div className="product" key={shoe.id}>
                            <img
                                src={shoe.image}
                                alt="product-image"
                                className="product-img"
                                style={{ backgroundColor: shoe.color, borderRadius: 20 }}
                            />
                            <h3>{shoe.name}</h3>
                            <p>{shoe.description}</p>
                            <div className="price">
                                <h3>{'$' + shoe.price}</h3>
                                <button onClick={() => handleAdd(shoe)}>Add to cart</button>
                            </div>
                        </div>
                    )
                })}
            </Card>
            <Card title="Your cart" label={'$' + totalPrice}>
                <Cart />
            </Card>
        </div>
    )
}

export default App
