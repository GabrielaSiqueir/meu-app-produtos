import axios from 'axios'

const api = axios.create({
  baseURL: 'http://leoproti.com.br:8004'
})

export interface Product {
  id?: number
  nome: string
  descricao: string
  preco: number
  quantidade: number
}

export const getProducts = () => api.get<Product[]>('/produtos')
export const getProduct = (id: number) => api.get<Product>(`/produtos/${id}`)
export const createProduct = (product: Product) => api.post('/produtos', product)
export const updateProduct = (id: number, product: Product) => api.put(`/produtos/${id}`, product)
export const deleteProduct = (id: number) => api.delete(`/produtos/${id}`)
export default api
