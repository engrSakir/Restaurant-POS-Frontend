import React from 'react';
import { Button } from 'react-bootstrap';

const Filter = ({category, filterProductByCat}) => {
    return (
       //  onClick={}
       <Button  onClick={()=>filterProductByCat(category.id)} variant='secondary' className='m-1 text-uppercase'>{category.name}</Button>
        
    );
};

export default Filter;
