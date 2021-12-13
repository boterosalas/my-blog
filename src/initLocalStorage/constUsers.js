import { generateId } from "./idGenerator";

export const adminId = generateId();

export const initAdmin = {
    id: adminId,
    name: 'Admin',
    email: 'admin@admin.com',
    password: '123456',
    cellphone: '3123456789',
    role: 'admin',
    is_active: true,
    created_date: new Date().toLocaleString(),
    updated_date: new Date().toLocaleString()
}