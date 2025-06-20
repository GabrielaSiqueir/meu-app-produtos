import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Button, Paper, Box, Typography } from '@mui/material'
import { createProduct, getProduct, updateProduct, Product } from '../services/api'

const initialState: Product = {
  nome: '',
  descricao: '',
  preco: 0,
  quantidade: 0
}

export default function ProductForm() {
  const [product, setProduct] = useState<Product>(initialState)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      setLoading(true)
      getProduct(Number(id))
        .then(res => setProduct(res.data))
        .catch(() => alert('Produto não encontrado'))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({
      ...prev,
      [name]: name === 'preco' || name === 'quantidade' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product.nome.trim()) {
      alert('Nome é obrigatório')
      return
    }
    if (product.preco <= 0) {
      alert('Preço deve ser maior que zero')
      return
    }
    if (product.quantidade < 0) {
      alert('Quantidade não pode ser negativa')
      return
    }

    setLoading(true)
    try {
      if (id) {
        await updateProduct(Number(id), product)
        alert('Produto atualizado com sucesso')
      } else {
        await createProduct(product)
        alert('Produto criado com sucesso')
      }
      navigate('/')
    } catch {
      alert('Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>{id ? 'Editar Produto' : 'Novo Produto'}</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Nome"
          name="nome"
          fullWidth
          margin="normal"
          value={product.nome}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <TextField
          label="Descrição"
          name="descricao"
          fullWidth
          margin="normal"
          value={product.descricao}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          label="Preço"
          name="preco"
          type="number"
          fullWidth
          margin="normal"
          value={product.preco}
          onChange={handleChange}
          required
          disabled={loading}
          inputProps={{ min: 0, step: 0.01 }}
        />
        <TextField
          label="Quantidade"
          name="quantidade"
          type="number"
          fullWidth
          margin="normal"
          value={product.quantidade}
          onChange={handleChange}
          required
          disabled={loading}
          inputProps={{ min: 0, step: 1 }}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {id ? 'Atualizar' : 'Cadastrar'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => window.history.back()} disabled={loading}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
