import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import ProductsList from './pages/ProductsList'
import ProductForm from './pages/ProductForm'

export default function App() {
  return (
    <Container maxWidth="md">
      <AppBar position="static" sx={{ marginBottom: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cadastro de Produtos
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Lista
          </Button>
          <Button color="inherit" component={Link} to="/novo">
            Novo Produto
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/novo" element={<ProductForm />} />
        <Route path="/editar/:id" element={<ProductForm />} />
      </Routes>
    </Container>
  )
}
