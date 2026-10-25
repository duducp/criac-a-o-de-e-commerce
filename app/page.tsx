'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  oldPrice?: number
  image: string
  tag?: string
  colors?: string[]
}

const products: Product[] = [
  { id: 1, name: 'Café especial torrado', category: 'Alimentos', price: 34.9, oldPrice: 42.9, tag: 'Mais vendido', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Vaso cerâmico orgânico', category: 'Casa', price: 89.9, tag: 'Novo', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85', colors: ['#ded7c9', '#77736a', '#bd8b66'] },
  { id: 3, name: 'Azeite extra virgem', category: 'Alimentos', price: 49.9, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Camiseta essencial', category: 'Moda', price: 79.9, oldPrice: 99.9, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', colors: ['#f4f0eb', '#232323', '#71816e'] },
  { id: 5, name: 'Cesta de fibras naturais', category: 'Casa', price: 119.9, image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Chocolate 70% cacau', category: 'Alimentos', price: 18.9, image: 'https://images.unsplash.com/photo-1548907040-4d42f6aa9d3a?auto=format&fit=crop&w=900&q=85' },
]

const categories = [
  { name: 'Todos', count: '24 itens' },
  { name: 'Alimentos', count: '12 itens' },
  { name: 'Casa', count: '8 itens' },
  { name: 'Moda', count: '4 itens' },
]

export default function Page() {
  const [category, setCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState(2)
  const [menuOpen, setMenuOpen] = useState(false)
  const [liked, setLiked] = useState<number[]>([])
  const filtered = useMemo(() => products.filter((p) => (category === 'Todos' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())), [category, search])

  return (
    <main className="shop-shell">
      <div className="topbar"><span>Entrega grátis a partir de R$ 149</span><span className="topbar-link">Conheça a nossa loja física <ArrowRight size={14} /></span></div>
      <header className="header">
        <button className="icon-button mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><Menu size={22} /></button>
        <a className="brand" href="#inicio">nossa<span>casa</span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#produtos">Comprar</a><a href="#categorias">Categorias</a><a href="#sobre">Nossa história</a>
        </nav>
        <div className="header-actions">
          <label className="search-box"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar produtos" aria-label="Buscar produtos" /></label>
          <button className="icon-button desktop-only" aria-label="Minha conta"><UserRound size={20} /></button>
          <button className="icon-button cart-button" aria-label={`${cart} itens no carrinho`}><ShoppingBag size={20} /><b>{cart}</b></button>
        </div>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-copy"><span className="eyebrow"><Sparkles size={15} /> feito para o seu dia</span><h1>Pequenas escolhas,<br /><em>grandes momentos.</em></h1><p>Uma curadoria de produtos que deixam a rotina mais bonita, leve e saborosa.</p><button className="primary-button" onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}>Explorar produtos <ArrowRight size={17} /></button></div>
        <div className="hero-art"><div className="art-card art-main"><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1000&q=85" alt="Produtos naturais em uma mesa" /></div><div className="art-note"><span>feito com<br />carinho</span><span className="note-line" /></div><div className="art-stamp">boa<br />escolha</div></div>
      </section>

      <section id="categorias" className="category-section"><div className="section-heading"><div><span className="eyebrow">explore por categoria</span><h2>Encontre o seu favorito</h2></div><a href="#produtos">Ver tudo <ArrowRight size={16} /></a></div><div className="category-list">{categories.map((item) => <button key={item.name} className={category === item.name ? 'category-chip active' : 'category-chip'} onClick={() => setCategory(item.name)}><span>{item.name}</span><small>{item.count}</small></button>)}</div></section>

      <section id="produtos" className="products-section"><div className="products-toolbar"><div><span className="eyebrow">a nossa seleção</span><h2>Produtos em destaque</h2></div><button className="filter-button"><SlidersHorizontal size={17} /> Filtros <ChevronDown size={15} /></button></div><div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}<button className={liked.includes(product.id) ? 'heart liked' : 'heart'} onClick={() => setLiked(liked.includes(product.id) ? liked.filter((id) => id !== product.id) : [...liked, product.id])} aria-label="Favoritar produto"><Heart size={18} fill={liked.includes(product.id) ? 'currentColor' : 'none'} /></button></div><div className="product-info"><div className="product-category">{product.category}</div><h3>{product.name}</h3><div className="product-bottom"><div><strong>R$ {product.price.toFixed(2).replace('.', ',')}</strong>{product.oldPrice && <del>R$ {product.oldPrice.toFixed(2).replace('.', ',')}</del>}</div><button className="add-button" onClick={() => setCart(cart + 1)} aria-label={`Adicionar ${product.name}`}><ShoppingBag size={17} /></button></div>{product.colors && <div className="swatches">{product.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}<span>+ opções</span></div>}</div></article>)}</div></section>

      <section id="sobre" className="benefits"><div><MapPin size={21} /><strong>Retire na loja</strong><span>Seu pedido pronto para você</span></div><div><ShoppingBag size={21} /><strong>Compra segura</strong><span>Pix, cartão ou na retirada</span></div><div><Sparkles size={21} /><strong>Feito para durar</strong><span>Curadoria com propósito</span></div></section>
      <footer><a className="brand" href="#inicio">nossa<span>casa</span></a><span>© 2025 nossa casa. Tudo bem por aqui.</span><div><a href="#inicio">Instagram</a><a href="#inicio">Contato</a></div></footer>
    </main>
  )
}
