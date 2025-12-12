import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/',
		component: () => import('@/layouts/LoggedOutLayout.vue'),
		meta: { requiredAuth: false },
		children: [
		{
			path: '/home',
			name: 'home',
			component: HomeView,
		},
		]
	},
	{
		path: '/',
		component: () => import('@/layouts/AuthLayout.vue'),
		meta: { requiresAuth: false },
		children: [
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginView.vue'),
		},
		]
	},
	{
		path: '/',
		component: () => import('@/layouts/InternLayout.vue'),
		meta: { requiresAuth: true, allowedRoles: ['ROLE_KITCHEN', 'ROLE_HOST']},
		children: [
		{
			path: '/kitchen-dashboard',
			name: 'dashboardkitchen',
			meta: { displayName: 'Küchen-Dashboard' },
			component: () => import('@/views/KitchenView.vue'),
		},
		]
	},
	{
		path: '/',
		component: () => import('@/layouts/InternLayout.vue'),
		meta: { requiresAuth: true, allowedRoles: ['ROLE_BAR', 'ROLE_HOST']},
		children: [
		{
			path: '/bar-dashboard',
			name: 'dashboardbar',
			meta: { displayName: 'Bar-Dashboard' },
			component: () => import('@/views/BarView.vue'),
		},
		]
	},
	{
		path: '/',
		component: () => import('@/layouts/InternLayout.vue'),
		meta: { requiresAuth: true, allowedRoles: ['ROLE_HOST']},
		children: [
		{
			path: '/host-dashboard',
			name: 'dashboardhost',
			component: () => import('@/views/HostView.vue'),
		},
		]
	},
	{
		path: '/',
		component: () => import('@/layouts/AdminLayout.vue'),
		meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'], displayName: 'Admin-Dashboard'},
		children: [
		{
			path: '/admin-dashboard',
			name: 'dashboardadmin',
			component: () => import('@/views/AdminView.vue'),
		},
		{
			path: '/restaurant-statistics',
			name: 'statisticsrestaurant',
			component: () => import('@/components/Admin/StatisticsRestaurant.vue'),
		},
		{
			path: '/user-statistics',
			name: 'statisticsuser',
			component: () => import('@/components/Admin/StatisticsUser.vue'),
		},
		{
			path: '/add-restaurant',
			name: 'addrestaurant',
			component: () => import('@/components/Admin/RegisterRestaurant.vue'),
		},
		{
			path: '/manage-restaurant',
			name: 'managerestaurant',
			component: () => import('@/components/Admin/ManageRestaurant.vue'),
		},
		{
			path: '/manage-restaurant-accounts',
			name: 'managerestaurantaccounts',
			component: () => import('@/components/Admin/ManageRestaurant.vue'),
		},
		{
			path: '/manage-user',
			name: 'manageuser',
			component: () => import('@/components/Admin/ManageUser.vue'),
		},
		]
	},
	]
})

export default router

import { useAuthStore } from '@/stores/Auth/useAuthStore'
import { log } from '@/utils/logger'

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

	if (!authStore.isLoggedIn && authStore.accessToken) {
		log.info('Trying to load user from JWT.')
		try {
			await authStore.loadUser();
			log.debug('Successfully loaded user: ', authStore.user);
		} catch {
			log.error('Loading user from JWT failed.')
			return next({ name: 'login' });
		}
	}

	if (to.meta.requiresAuth && authStore.isLoggedIn) {
		const allowedRoles :string[] = to.meta.allowedRoles as string[];
		const userRoles = authStore.user?.roles || [];
		const hasAccess = userRoles.some(role => allowedRoles.includes(role));
		log.debug('Checking role access for route: ', to.path, userRoles);

		if (hasAccess) {
			log.debug('User has access to connect to: ', to.path);
			return next();
		}
	}

	if (authStore.isLoggedIn) {
		log.debug('Redirecting user to its user dashboard.');
		if (authStore.user?.roles.includes('ROLE_KITCHEN'))
			return next({ name: 'dashboardkitchen'});
		if (authStore.user?.roles.includes('ROLE_BAR'))
			return next({ name: 'dashboardbar'});
		if (authStore.user?.roles.includes('ROLE_HOST'))
			return next({ name: 'dashboardhost'});
		if (authStore.user?.roles.includes('ROLE_ADMIN'))
			return next( { name: 'dashboardadmin' });
	}

	if (to.meta.requiresAuth) {
		log.debug('User has no access for path: ', to.path);
		log.debug('Redirecting user to login.');
		return next({ name: 'login' });
	}

	return next();
});
