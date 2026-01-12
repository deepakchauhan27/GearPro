import { Outlet } from 'react-router-dom';
import Header_class from '../MainPages/Header_class';
import Footer from '../MainPages/Footer';

    export default function Layout() {
      return (
        <>
        <Header_class />
        <Outlet/>
        <Footer />
        </>
      );
    }