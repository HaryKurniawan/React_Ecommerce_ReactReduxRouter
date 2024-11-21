import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const About = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Fetch data produk
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  // Filter dan sortir produk
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      if (sortBy === 'alphabet') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="container my-5">
      {/* Header */}
      <h1 className="text-center mb-4">About</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Layout Grid */}
      <div className="row">
        {/* Sidebar Kategori */}
        <div className="col-md-3 mb-4">
          <h5>Categories</h5>
          <ul className="list-group">
            <li
              className={`list-group-item ${
                selectedCategory === '' ? 'active' : ''
              }`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCategory('')}
            >
              All Categories
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={`list-group-item ${
                  selectedCategory === category ? 'active' : ''
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Daftar Produk */}
        <div className="col-md-9">
          {/* Filter */}
          <div className="d-flex justify-content-end mb-3">
            <select
              className="form-select w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="alphabet">Alphabet</option>
            </select>
          </div>

          {/* Produk */}
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
