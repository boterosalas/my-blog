import { generateId } from "./idGenerator";

export const idCategoryMovies = generateId();

export const category =
{
    id: idCategoryMovies,
    name: 'Películas',
    is_active: true,
    created_date: new Date().toLocaleString(),
    updated_date: new Date().toLocaleString()
}