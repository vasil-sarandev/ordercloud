export const STATIC_ROUTES = {
  // public pages
  homepage: { as: '/', href: '/' },
  //    menus
  ordersPage: { as: '/orders/[venue]', href: '/orders/[venue]' },
  menuPage: { as: '/[venue]', href: '/[venue]' },
  //    legal
  termsOfUse: { as: '/legal/terms-of-use', href: '/legal/terms-of-use' },
  // private pages
  dashboard: { as: '/admin/dashboard', href: '/admin/dashboard' },
  createVenue: { as: '/admin/create-venue', href: '/admin/create-venue' },
  //    categories
  categories: { as: '/admin/categories/all', href: '/admin/categories/all' },
  category: { as: '/admin/categories/[id]', href: '/admin/categories/[id]' },
  createCategory: { as: '/admin/categories/create', href: '/admin/categories/create' },
  //    products
  products: { as: '/admin/products/all', href: '/admin/products/all' },
  product: { as: '/admin/products/[id]', href: '/admin/products/[id]' },
  createProduct: { as: '/admin/products/create', href: '/admin/products/create' },
  //    orders
  orders: { as: '/admin/orders/all', href: '/admin/orders/all' },
  order: { as: '/admin/orders/[id]', href: '/admin/orders/[id]' },
  //    personalization
  personalization: { as: '/admin/personalize', href: '/admin/personalize' }
}
