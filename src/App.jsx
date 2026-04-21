import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, ArrowLeft } from 'lucide-react';

const productsData = [
  {
    id: 1,
    image: '/images/product1.jpg',
    category: 'Ensemble Homme',
    title: 'Ensemble "Yachting"',
    price: '280,000 DZD',
    desc: 'Un superbe ensemble inspiré du style Old Money classique : polo en maille de coton vert sauge, associé à un pantalon sartorial écru fluide. Vendu avec le pull 100% cachemire marron pour les fins de journées fraîches sur la Méditerranée.'
  },
  {
    id: 2,
    image: '/images/product2.png',
    category: 'Pantalon Sartorial',
    title: 'Le Pantalon d\'Été',
    price: '185,000 DZD',
    desc: 'Le chef-d\'œuvre de notre collection estivale. Une coupe italienne parfaite avec des plis marqués et une ceinture à patte de serrage latérale. Composé à 60% de Coton Supima et 40% de Lin de très haute qualité.'
  },
  {
    id: 3,
    image: '/images/product3.jpg',
    category: 'Ensemble Homme',
    title: 'Ensemble Texture Crépon',
    price: '245,000 DZD',
    desc: 'Un look total blanc audacieux et terriblement élégant. Conçu dans un tissu texturé exclusif façon crépon ultra-léger et respirant. Une chemisette fluide et un pantalon droit coordonné, parfaits pour l\'été algérien.'
  }
];

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'product'
  const [selectedProduct, setSelectedProduct] = useState(productsData[0]);
  const [selectedSize, setSelectedSize] = useState('48');

  // Logic for the Scroll Reveal Animation
  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px', // Begins fading out slightly before hitting the exact edge
      threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          // Removes the class when it leaves the viewport, allowing it to fade out and be ready to animate again
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    // Select all elements with the reveal class and observe them
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [currentView]); // Re-run effect when view changes to observe new elements

  const navigateTo = (view, product = null) => {
    if (product) setSelectedProduct(product);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const renderNavbar = () => (
    <nav className={`navbar ${isScrolled || currentView === 'product' ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="nav-links desktop-only">
          <a href="#nouveautes" className="hover-underline" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Nouveautés</a>
          <a href="#pret-a-porter" className="hover-underline" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Prêt-à-porter</a>
        </div>

        <div className="logo-container" onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>
          <img src="/images/logo.png" alt="AuraLento" className="navbar-logo" />
        </div>

        <div className="nav-right">
          <div className="nav-links desktop-only">
            <a href="#accessoires" className="hover-underline" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Accessoires</a>
            <a href="#heritage" className="hover-underline" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>L'Héritage</a>
          </div>
          <div className="nav-icons">
            <button><Search size={20} /></button>
            <button><User size={20} /></button>
            <button><ShoppingBag size={20} /></button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu">
           <a href="#nouveautes" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigateTo('home'); }}>Nouveautés</a>
          <a href="#pret-a-porter" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigateTo('home'); }}>Prêt-à-porter</a>
        </div>
      )}
    </nav>
  );

  const renderProductPage = () => {
    if (!selectedProduct) return null;
    
    return (
      <div className="pdp container">
        <button 
          onClick={() => navigateTo('home')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--c-text-muted)', fontWeight: 'bold' }}
          className="reveal-on-scroll"
        >
          <ArrowLeft size={20} /> Retour à la collection
        </button>

        <div className="pdp-grid">
          {/* Gallery - Now just a single prominent image for the specific product */}
          <div className="pdp-gallery reveal-on-scroll">
            <img src={selectedProduct.image} alt={selectedProduct.title} className="pdp-main-image" />
          </div>

          {/* Info */}
          <div className="pdp-info reveal-on-scroll" style={{transitionDelay: '0.2s'}}>
            <span className="pdp-category">{selectedProduct.category}</span>
            <h2 className="pdp-title">{selectedProduct.title}</h2>
            <p className="pdp-price">{selectedProduct.price}</p>
            <p className="pdp-description">{selectedProduct.desc}</p>

            <div className="pdp-options">
              <h4>Taille (Standard Numérique)</h4>
              <div className="pdp-sizes">
                {['46', '48', '50', '52', '54'].map(size => (
                  <button 
                    key={size}
                    className={`pdp-size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pdp-actions">
              <button className="btn-primary">Ajouter au panier</button>
              <button className="btn-outline"><Heart size={20} /></button>
            </div>

            <div className="pdp-details">
              <ul style={{ listStyle: 'none' }}>
                <li>Tissus sourcés des meilleures maisons Italiennes</li>
                <li>Conception alliant sophistication luxueuse et praticité</li>
                <li>Conçu pour le climat méditerranéen chaud</li>
                <li>Coutures faites de manière artisanale</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <>
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content opacity-animation">
          <h2 className="hero-title">L'Art de l'Autorité Silencieuse</h2>
          <p className="hero-subtitle">Découvrez la nouvelle collection printemps-été. Le luxe discret, redéfini pour l'Algérie.</p>
          <button onClick={() => navigateTo('home')} className="btn-primary">Découvrir</button>
        </div>
      </header>

      <section id="heritage" className="philosophy section-padding container">
        <div className="philosophy-content text-center reveal-on-scroll">
          <span className="section-eyebrow text-gold">Notre Maison</span>
          <h3 className="section-title">Le Savoir-Faire AuraLento</h3>
          <p className="section-text">
            Chaque pièce est une déclaration d'indépendance et de goût. L'Art de l'Autorité Silencieuse.
          </p>
          <button className="btn-outline">Notre Histoire</button>
        </div>
      </section>

      {/* Dynamic Products Grid */}
      <section id="pret-a-porter" className="featured section-padding container">
        <div className="featured-header reveal-on-scroll">
          <h3 className="section-title">La Collection d'Été</h3>
        </div>
        
        <div className="product-grid">
          {productsData.map(product => (
            <div key={product.id} className="product-card reveal-on-scroll" onClick={() => navigateTo('product', product)}>
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h4 className="product-name">{product.title}</h4>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  return (
    <div className="app-container">
      {renderNavbar()}

      <main style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        {currentView === 'home' ? renderHome() : renderProductPage()}
      </main>

      <footer className="footer ">
        <div className="container footer-grid reveal-on-scroll">
          <div className="footer-brand">
            <img src="/images/logo.png" alt="AuraLento" className="footer-logo" />
            <p>Alger, Algérie</p>
          </div>
          <div className="footer-links">
            <h4>Boutique</h4>
            <a href="#">Femme</a><a href="#">Homme</a><a href="#">Accessoires</a>
          </div>
          <div className="footer-links">
            <h4>La Maison</h4>
            <a href="#">L'Héritage</a><a href="#">Savoir-faire</a><a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
