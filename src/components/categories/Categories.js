import React from 'react'
import { useSelector } from 'react-redux';
import AllCategories from './AllCategories'
import CategoryForm from './CategoryForm'

const Categories = () => {

    const categoriesState = useSelector(state => state.categories);
    const { categorySelected, startCreatingCategory } = categoriesState;

    const initialRegisterValues =
    {
        id: '',
        name: '',
        is_active: true,
        created_date: '',
        updated_date: ''
    }

    return (
        <>
            {
                categorySelected || startCreatingCategory
                    ? <CategoryForm category={categorySelected || initialRegisterValues} />
                    : <AllCategories />
            }
        </>
    )
}

export default Categories
