import React from 'react'
import SEO from '../../../next-seo-config';
import { DefaultSeo } from 'next-seo';
import Header from '../_App/Header'
import Footer from '../_App/Footer/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <DefaultSeo {...SEO} />
            {/* <Header /> */}
            {children}
            <Footer />
        </>
    );
}

export default Layout;