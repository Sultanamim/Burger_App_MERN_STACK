import React from 'react';
import Ingredient from '../Ingredients/Ingredients';
import './Burger.css';

const Burger = props => {
    let ingredientArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(_ => {
            return  <Ingredient 
                        type={item.type}
                        key={Math.random()}
                     />
        })
    }).reduce((arr,element) => {
        return arr.concat(element);
    },[]);

    if(ingredientArr.length === 0) {
        ingredientArr = <p style={{marginTop: "10px", fontWeight: "bold"}}>Please add some ingredients!</p>
    }
    
    return (
        <div className='Burger'>
            <Ingredient type="bread-top" />
               {ingredientArr}
            <Ingredient type="bread-bottom" />
        </div>
    )
}
export default Burger;