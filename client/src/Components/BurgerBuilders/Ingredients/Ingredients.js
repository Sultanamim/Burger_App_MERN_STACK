import React from 'react';
import BreadBottom from '../../../assets/images/burger-bottom.png';
import BreadTop from '../../../assets/images/burger-top.png';
import Meat from '../../../assets/images/meat.png';
import Salad from '../../../assets/images/salad.png';
import Cheese from '../../../assets/images/cheese.png';
import './Ingredients.css';

const Ingredient = props => {
    let ingredient = null;
    switch(props.type) {
        case 'bread-bottom':
            ingredient= <div><img src={BreadBottom} /></div>
            break;
        case 'bread-top':
            ingredient= <div><img src={BreadTop} /></div>
            break;
        case 'meat':
            ingredient= <div><img src={Meat} /></div>
            break;
        case 'salad':
            ingredient= <div><img src={Salad} /></div>
            break;
        case 'cheese':
            ingredient= <div><img src={Cheese} /></div>
            break; 
        default: 
            ingredient = null;
    }

     return (
         <div className='Ingredient'>
            {ingredient}
         </div>
     )
}
export default Ingredient;