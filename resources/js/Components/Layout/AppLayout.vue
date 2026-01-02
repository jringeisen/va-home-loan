<script setup>
import { Link, usePage } from '@inertiajs/vue3'
import { computed, ref, onMounted } from 'vue'
import Logo from '@/Components/Logos/Logo.vue'

const page = usePage()
const user = computed(() => page.props.auth?.user)
const hasPaid = computed(() => page.props.auth?.hasPaid ?? false)
const currentUrl = computed(() => page.url)

const showMobileMenu = ref(false)
const showUserMenu = ref(false)

const isActive = (path) => {
    return currentUrl.value.startsWith(path)
}

// Dark mode
const isDark = ref(false)

const initDarkMode = () => {
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
        isDark.value = stored === 'true'
    } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateDarkClass()
}

const updateDarkClass = () => {
    if (isDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

const toggleDarkMode = () => {
    isDark.value = !isDark.value
    localStorage.setItem('darkMode', isDark.value)
    updateDarkClass()
}

onMounted(() => {
    initDarkMode()
})
</script>

<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <!-- Skip to main content link -->
        <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-blue-600 focus:underline focus:shadow-lg dark:focus:bg-gray-800 dark:focus:text-blue-400"
        >
            Skip to main content
        </a>

        <!-- Navigation -->
        <nav class="bg-white shadow-sm dark:bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 justify-between">
                    <div class="flex">
                        <div class="flex shrink-0 items-center">
                            <Link href="/">
                                <Logo />
                            </Link>
                        </div>
                        <div class="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link
                                href="/calculators/affordability"
                                :class="[
                                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                                    isActive('/calculators/affordability')
                                        ? 'border-blue-500 text-gray-900 dark:border-blue-400 dark:text-white'
                                        : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100'
                                ]"
                            >
                                Affordability
                            </Link>
                            <Link
                                href="/calculators/cost-of-living"
                                :class="[
                                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                                    isActive('/calculators/cost-of-living')
                                        ? 'border-green-500 text-gray-900 dark:border-green-400 dark:text-white'
                                        : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100'
                                ]"
                            >
                                Cost of Living
                            </Link>
                            <Link
                                href="/calculators/disability"
                                :class="[
                                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                                    isActive('/calculators/disability')
                                        ? 'border-purple-500 text-gray-900 dark:border-purple-400 dark:text-white'
                                        : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100'
                                ]"
                            >
                                Disability
                            </Link>
                        </div>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:items-center">
                        <!-- Dark Mode Toggle -->
                        <button
                            @click="toggleDarkMode"
                            class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                        >
                            <svg v-if="isDark" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        </button>

                        <div v-if="user" class="relative ml-3">
                            <button
                                @click="showUserMenu = !showUserMenu"
                                class="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                                :aria-expanded="showUserMenu"
                                aria-haspopup="true"
                            >
                                <span class="sr-only">Open user menu</span>
                                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                                    {{ user.name?.charAt(0).toUpperCase() }}
                                </div>
                            </button>
                            <div
                                v-if="showUserMenu"
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 dark:bg-gray-700 dark:ring-gray-600"
                                role="menu"
                                aria-orientation="vertical"
                            >
                                <Link
                                    href="/dashboard"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                    role="menuitem"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/dashboard/settings"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                    role="menuitem"
                                >
                                    Settings
                                </Link>
                                <Link
                                    v-if="!hasPaid"
                                    href="/support"
                                    class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-600"
                                    role="menuitem"
                                >
                                    Support Us
                                </Link>
                                <div v-else class="px-4 py-2 text-sm text-green-600 dark:text-green-400" role="menuitem">
                                    Supporter
                                </div>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                    role="menuitem"
                                >
                                    Sign out
                                </Link>
                            </div>
                        </div>
                        <template v-else>
                            <Link
                                href="/login"
                                class="text-sm font-medium text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/register"
                                class="ml-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Get Started
                            </Link>
                        </template>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page Content -->
        <main id="main-content">
            <slot />
        </main>
    </div>
</template>
