import Header from './_components/Header';
import Hero from './_components/Hero';

import About from './_components/About';
import NewsLetter from './_components/NewsLetter';
import Footer from './_components/Footer';
import SpecialProducts from './_components/SpecialProducts';
import Products from './_components/Products';

const HomePage = () => {
    return (
        <div>     
            <Hero />
            <SpecialProducts />
            <About />
            <Products />
            <NewsLetter />
        </div>
    );
};

export default HomePage;