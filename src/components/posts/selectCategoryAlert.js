import Swal from 'sweetalert2';
import { selectPostCategory, selectPostCategoryToNull } from '../../actions/posts';
import { types } from '../../types/types';


export const selectCategoryAlert = (categories, dispatch) => {
    let categoriesList = {};
    let categoriesArray
    if (Array.isArray(categories)) {
        categoriesArray = categories;
    } else {
        categoriesArray = [categories];
    }

    categoriesArray.map(category => {
        categoriesList[category.id] = category.name;
        return category;
    });

    const handleCancel = () => {
        dispatch(selectPostCategoryToNull());
    }
    const getCategoryById = (id) => {
        const lclStrg = JSON.parse(localStorage.getItem(types.categoriesLocalStorage));
        return lclStrg.filter(category => parseInt(category.id) === parseInt(id))[0];
    }
    const swalWithCustomStyles = Swal.mixin({
        customClass: {
            input: 'form-select form-select-lg',
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
    swalWithCustomStyles.fire({
        title: 'Selecciona una categoría',
        input: 'select',
        inputOptions: categoriesList,
        inputPlaceholder: 'Categorías...',
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
    }).then(res => {
        if ((res.value) && (res.value !== '')) {
            const categorySelected = getCategoryById(res.value)
            if (categorySelected) {
                dispatch(selectPostCategory(categorySelected));
            } else {
                Swal.fire('Error', 'Ocurrió un error, intenta de nuevo por favor.', 'error')
                handleCancel();
            }
        } else {
            handleCancel();
        }
    })

}