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
		path: '/bestellung/tisch/:tableId',
		name: 'order',
		props: true,
		meta: { sectionName: 'restaurant'},
		component: () => import('@/views/OrderMenuView.vue'),
		/* beforeEnter: (to, from, next) => {
			const id = Number(to.params.id);

			if (Number.isInteger(id) && id > 0) {
				next();
			} else {
				next('/404'); // oder next(false)
			};
		}, */
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
		component: () => import('@/layouts/HostLayout.vue'),
		meta: { requiresAuth: true, allowedRoles: ['ROLE_HOST']},
		children: [
		{
			path: '/host-dashboard',
			name: 'dashboardhost',
			meta: { sectionName: 'dashboardhost'},
			component: () => import('@/views/HostView.vue'),
		},
		{
			path: '/bestellungen',
			name: 'orders',
			meta: { sectionName: 'restaurant'},
			component: () => import('@/views/HostView.vue'),
		},
		{
			path: '/speisekarte',
			name: 'menu',
			meta: { sectionName: 'restaurant'},
			component: () => import('@/views/MenuView.vue'),
		},
		{
			path: '/verwaltung',
			name: 'managerestaurant',
			meta: { sectionName: 'restaurant'},
			component: () => import('@/views/ManageRestaurantView.vue'),
		},
		{
			path: 'live-dashboards/empfangs-dashboard',
			name: 'dashboardwelcomelive',
			meta: { sectionName: 'livedashboard'},
			component: () => import('@/views/HostView.vue'),
		},
		{
			path: 'live-dashboards/küchen-dashboard',
			name: 'dashboardkitchenlive',
			meta: { sectionName: 'livedashboard'},
			component: () => import('@/views/KitchenLiveView.vue'),
		},
		{
			path: 'live-dashboards/bar',
			name: 'dashboardbarlive',
			meta: { sectionName: 'livedashboard'},
			component: () => import('@/views/BarLiveView.vue'),
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
		]
	},
	]
})

export default router

import { useAuthStore } from '@/stores/Auth/useAuthStore'
import { log } from '@/utils/logger'
import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore'

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const restaurantStore = useRestaurantStore();

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
		if (!restaurantStore.isInitialized && (userRoles.includes('ROLE_HOST') || userRoles.includes('ROLE_BAR') || userRoles.includes('ROLE_KITCHEN')))
			await restaurantStore.loadRestaurant(authStore.user?.restaurantId || -1);
		const hasAccess = userRoles.some(role => allowedRoles.includes(role));
		log.debug('Checking role access for route: ', to.path, userRoles);

		if (hasAccess) {
			log.debug('User has access to connect to: ', to.path);
			return next();
		}
	}

	if (authStore.isLoggedIn && (to.name === 'login' || to.name === 'home')) {
		log.debug('Redirecting logged-in user to dashboard.');
		if (authStore.user?.roles.includes('ROLE_ADMIN'))
			return next({ name: 'dashboardadmin' });
		else if (authStore.user?.roles.includes('ROLE_HOST'))
			return next({ name: 'dashboardhost'});
		else if (authStore.user?.roles.includes('ROLE_BAR'))
			return next({ name: 'dashboardbar'});
		else if (authStore.user?.roles.includes('ROLE_KITCHEN'))
			return next({ name: 'dashboardkitchen'});
	}

	if (to.meta.requiresAuth) {
		log.debug('User has no access for path: ', to.path);
		log.debug('Redirecting user to login.');
		return next({ name: 'login' });
	}

	return next();
});
