import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, CircularProgress, Box
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { getProducts, deleteProduct, Product } from '../services/api'

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const loadProducts = async () => {
    try {
      const response = await getProducts()
      setProducts(response.data)
    } catch (error) {
      alert('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id?: number) => {
    if (!id) return
    if (!window.confirm('Confirma exclusão do produto?')) return
    try {
      await deleteProduct(id)
      loadProducts()
    } catch (error) {
      alert('Erro ao excluir produto')
    }
  }

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" sx={{ p: 2 }}>Produtos Cadastrados</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.nome}</TableCell>
              <TableCell>{p.descricao}</TableCell>
              <TableCell>R$ {p.preco.toFixed(2)}</TableCell>
              <TableCell>{p.quantidade}</TableCell>
              <TableCell align="center">
                <IconButton component={RouterLink} to={`/editar/${p.id}`} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(p.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">Nenhum produto cadastrado</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
