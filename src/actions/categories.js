import { types } from "../types/types"
import Swal from 'sweetalert2';
import { finishLoading, startLoading } from './ui';




export const addCategory = (category, resetForm) => {
    return (dispatch) => {
        dispatch(startLoading());
        const newCategory = {
            id: new Date().getTime(),
            name: category.name,
            is_active: category.is_active,
            created_date: new Date().toLocaleString(),
            updated_date: new Date().toLocaleString()
        }
        const lclStrg = JSON.parse(localStorage.getItem(types.categoriesLocalStorage)) || [];
        const checkCategory = lclStrg.filter(categ => categ.name.toLowerCase().trim() === category.name.toLowerCase().trim())[0];
        if (checkCategory) {
            Swal.fire('Error', 'Ya existe esa categoría, intenta con otra.', 'error');
        } else {
            lclStrg.unshift(newCategory);
            dispatch({
                type: types.categoriesAddNew,
                payload: lclStrg
            });
            localStorage.setItem(types.categoriesLocalStorage, JSON.stringify(lclStrg));
            Swal.fire(category.name, 'Categoría creada correctamente.', 'success').then(res => {
                resetForm();
                dispatch(stopToCreateCategory());
            })
        }
        dispatch(finishLoading());
    }
}

export const updateCategory = (updatedCategory, resetForm) => {
    return (dispatch) => {
        dispatch(startLoading());
        Swal.fire({
            title: updatedCategory.name,
            text: '¿Seguro que deseas actualizar esta categoría?',
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Sí',
        }).then(res => {
            if (res.value) {
                const lclStrg = JSON.parse(localStorage.getItem(types.categoriesLocalStorage)) || [];
                const updatedCategories = lclStrg.map(category => {
                    if (category.name.toLowerCase() === updatedCategory.name.toLowerCase()) {
                        return {
                            id: updatedCategory.id,
                            name: updatedCategory.name,
                            is_active: updatedCategory.is_active,
                            created_date: updatedCategory.created_date,
                            updated_date: new Date().toLocaleString()
                        }
                    };
                    return category;
                });
                localStorage.setItem(types.categoriesLocalStorage, JSON.stringify(updatedCategories));
                dispatch({
                    type: types.categoriesUpdate,
                    payload: updatedCategories
                });
                Swal.fire(updatedCategory.name, 'Categoría actualizada correctamente.', 'success').then(res => {
                    resetForm();
                    dispatch(selectedCategoryToNull());
                })
                dispatch(finishLoading());
            }
        })
    }
}

export const deleteCategory = (category) => {
    return (dispatch) => {
        Swal.fire({
            title: category.name,
            text: '¿Seguro que desea eliminar esta categoría?',
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Sí',
            reverseButtons: true,
            focusConfirm: false
        }).then(res => {
            if (res.value) {
                const lclStrg = JSON.parse(localStorage.getItem(types.categoriesLocalStorage)) || [];
                const updatedCategories = lclStrg.map(categ => {
                    if (categ.id === category.id) categ.is_active = false;
                    return categ;
                })
                localStorage.setItem(types.categoriesLocalStorage, JSON.stringify(updatedCategories));
                dispatch({
                    type: types.categoriesDelete,
                    payload: updatedCategories
                })
                Swal.fire(category.name, 'Categoría eliminada correctamente.', 'success')
            }
        });

    }
}

export const selectCategory = (category) => {
    return (dispatch) => {
        dispatch({
            type: types.categoriesSelected,
            payload: category
        });
    }
}

export const selectedCategoryToNull = () => ({
    type: types.categoriesSelectedToNull
})

export const startToCreateCategory = () => ({
    type: types.categoriesStartCreatingCategory
})

export const stopToCreateCategory = () => ({
    type: types.categoriesStopCreatingCategory
})