type NavLink = {
    href: string;
    label: string;
  };
  
  export const links: NavLink[] = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/products', label: 'products' },
    { href: '/fav', label: 'favorites' },
    { href: '/cart', label: 'cart' },
    { href: '/orders', label: 'orders' },
  ];