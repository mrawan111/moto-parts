/* eslint-disable */
// Temporary checked-in route tree. The TanStack route generator will overwrite
// this file on the next normal Vite build; it is kept current so all routes
// are available in environments where the generator is not installed.
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ProductsRouteImport } from './routes/products/index'
import { Route as ProductRouteImport } from './routes/products/$slug'
import { Route as SearchRouteImport } from './routes/search'
import { Route as CategoryRouteImport } from './routes/category/$slug'
import { Route as AdminLoginRouteImport } from './routes/admin/login'
import { Route as AdminLayoutRouteImport } from './routes/admin/_layout'
import { Route as AdminIndexRouteImport } from './routes/admin/index'
import { Route as AdminProductsRouteImport } from './routes/admin/products/index'
import { Route as AdminProductNewRouteImport } from './routes/admin/products/new'
import { Route as AdminProductEditRouteImport } from './routes/admin/products/$id'
import { Route as AdminCategoriesRouteImport } from './routes/admin/categories/index'
import { Route as AdminCategoryNewRouteImport } from './routes/admin/categories/new'
import { Route as AdminCategoryEditRouteImport } from './routes/admin/categories/$id'
import { Route as AdminSettingsRouteImport } from './routes/admin/settings'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const ProductsRoute = ProductsRouteImport.update({ id: '/products/', path: '/products', getParentRoute: () => rootRouteImport } as any)
const ProductRoute = ProductRouteImport.update({ id: '/products/$slug', path: '/products/$slug', getParentRoute: () => rootRouteImport } as any)
const SearchRoute = SearchRouteImport.update({ id: '/search', path: '/search', getParentRoute: () => rootRouteImport } as any)
const CategoryRoute = CategoryRouteImport.update({ id: '/category/$slug', path: '/category/$slug', getParentRoute: () => rootRouteImport } as any)
const AdminLoginRoute = AdminLoginRouteImport.update({ id: '/admin/login', path: '/admin/login', getParentRoute: () => rootRouteImport } as any)
const AdminLayoutRoute = AdminLayoutRouteImport.update({ id: '/admin/_layout', path: '/admin', getParentRoute: () => rootRouteImport } as any)
const AdminIndexRoute = AdminIndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => AdminLayoutRoute } as any)
const AdminProductsRoute = AdminProductsRouteImport.update({ id: '/products/', path: '/products', getParentRoute: () => AdminLayoutRoute } as any)
const AdminProductNewRoute = AdminProductNewRouteImport.update({ id: '/products/new', path: '/products/new', getParentRoute: () => AdminLayoutRoute } as any)
const AdminProductEditRoute = AdminProductEditRouteImport.update({ id: '/products/$id', path: '/products/$id', getParentRoute: () => AdminLayoutRoute } as any)
const AdminCategoriesRoute = AdminCategoriesRouteImport.update({ id: '/categories/', path: '/categories', getParentRoute: () => AdminLayoutRoute } as any)
const AdminCategoryNewRoute = AdminCategoryNewRouteImport.update({ id: '/categories/new', path: '/categories/new', getParentRoute: () => AdminLayoutRoute } as any)
const AdminCategoryEditRoute = AdminCategoryEditRouteImport.update({ id: '/categories/$id', path: '/categories/$id', getParentRoute: () => AdminLayoutRoute } as any)
const AdminSettingsRoute = AdminSettingsRouteImport.update({ id: '/settings', path: '/settings', getParentRoute: () => AdminLayoutRoute } as any)

const AdminLayoutChildren = { AdminIndexRoute, AdminProductsRoute, AdminProductNewRoute, AdminProductEditRoute, AdminCategoriesRoute, AdminCategoryNewRoute, AdminCategoryEditRoute, AdminSettingsRoute }
const AdminLayoutRouteWithChildren = AdminLayoutRoute._addFileChildren(AdminLayoutChildren)
const rootRouteChildren = { IndexRoute, ProductsRoute, ProductRoute, SearchRoute, CategoryRoute, AdminLoginRoute, AdminLayoutRoute: AdminLayoutRouteWithChildren }
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' { interface Register { ssr: true; router: Awaited<ReturnType<typeof getRouter>>; config: Awaited<ReturnType<typeof startInstance.getOptions>> } }
