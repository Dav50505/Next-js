import React from 'react'
import Container from '../global/Container'
import Logo from './Logo'
import NavSearch from './NavSearch'
import CartButton from './CartButton'
import DarkMode from './DarkMode'
import LinksDropdown from './LinksDropdown'
import { Suspense } from 'react'
function Navbar() {
  return (
    <nav className='border-b border-gray-400 dark:border-gray-300'>
        <Container className='flex flex-cols sm:flex-row sm:justify-between sm:items-center flex-warp py-8 gap-4'>
            <Logo />
            <Suspense fallback={<div>Loading...</div>}>
                <NavSearch/>
            </Suspense>
            <div className='flex items-center justify-between gap-4'>
                <CartButton/>
                <DarkMode/>
                <LinksDropdown/>
            </div>
        </Container>
    </nav>
  )
}

export default Navbar