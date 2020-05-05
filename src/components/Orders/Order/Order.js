import React from 'react';
import classes from './Order.module.css';


const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const newIngredients = ingredients.map(ingredient => (
        <span key={ingredient.name}
        style={{textTransform: 'capitalize',
            display: 'inline-block',
            padding: '7px',
            border: '1px solid #ccc',
            margin: '3px 8px'}}>{ingredient.name } {(ingredient.amount)}</span>
    ))
    return (
        <div className={classes.Order}>
            <p>Ingredients: {newIngredients}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;
