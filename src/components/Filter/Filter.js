import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import useCategory from "../../hooks/useCategory";
import useProduct from "../../hooks/useProduct";

const Filter = ({categories, filterProductByCat, filterProductByName}) => {

    return (
        //  onClick={}
        <div className="product-filter-wrapper">

            <div className="filter-by-name my-3">
                <input type="text" min={0} max={100} className="form-control form-control-sm"
                       onChange={(event) => filterProductByName(event.target.value)}/>
            </div>


            <div className="filter-by-category my-3">
                <Button onClick={() => filterProductByCat()} variant='secondary'
                        className='m-1 text-uppercase'> All </Button>
                {categories?.map((category) => <Button key={category.id} onClick={() => filterProductByCat(category.id)}
                                                       variant='secondary'
                                                       className='m-1 text-uppercase'>{category.name}</Button>)}
            </div>

        </div>


    );
};

export default Filter;
