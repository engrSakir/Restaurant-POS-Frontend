import React from 'react';
import { Button } from 'react-bootstrap';

const Filter = ({category}) => {
    return (
         
       <Button variant='secondary' className='m-1 text-uppercase'>{category.name}</Button>
        
    );
};

export default Filter;