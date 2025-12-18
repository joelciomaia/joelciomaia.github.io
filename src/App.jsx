// App.jsx
import './theme.js';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Timeline />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;