import { useState } from 'react'
import './Card.scss'
import logo from './assets/nike.png'

function Card(props) {
    const label = props.label || ''

    return (
        <div className="card">
            <div className="header">
                <img src={logo} alt="Logo" className="logo" />
                <h3>{props.title}</h3>
                <p className="label">{label}</p>
            </div>

            {props.children}
        </div>
    )
}
export default Card
