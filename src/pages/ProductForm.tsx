import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Button, Paper, Box, Typography } from '@mui/material'
import { createProduct, getProduct, updateProduct, Product } from '../services/api'

const initialState: Product = {
  nome: '',
  descricao: '',
  preco: 0
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
