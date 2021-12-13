import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, selectCategory, startToCreateCategory } from '../../actions/categories';

const AllCategories = () => {

    const dispatch = useDispatch();
    const categoriesState = useSelector(state => state.categories);
    const { categories: allCategories } = categoriesState;

    const handleDeleteCategory = (event, category) => {
        event.stopPropagation();
        dispatch(deleteCategory(category));
    }

    const handleSelectCategory = (category) => {
        dispatch(selectCategory(category));
    }

    const handleNewCategory = () => {
        dispatch(startToCreateCategory());
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-end mb-3">
                <h1>Todas las categorías</h1>
                <button className="btn btn-primary" onClick={handleNewCategory}>Nuevo</button>
            </div>
            <p className="mb-0">Encuentra en esta lista todas las categorías y haz click sobre cada fila si quieres editarla, también puedes hacer click directamente sobre el ícono de papelera para desactivar la categoría del sistema.</p>
            <p className="mb-0">Recuerda que si una categoría está desactivada, ningún post sobre esa categoría se podrá visualizar hasta activar la categoría nuevamente.</p>
            <p className="mb-0">Si quieres crear una nueva categoría haz click en el boton 'NUEVO' que está en la parte superior a la derecha.</p>
            {
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allCategories && allCategories.map((category, idx) => {
                                return (
                                    <tr key={category.id} className="pointer" onClick={() => { handleSelectCategory(category) }}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>{category.name}</td>
                                        <td>{category.is_active ? 'Activa' : 'Inactiva'}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger btn-sm me-1" onClick={(e) => { handleDeleteCategory(e, category) }} disabled={!category.is_active}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </>
    )
}

export default AllCategories
