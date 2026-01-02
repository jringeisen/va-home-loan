<script setup>
import { Head, Link } from '@inertiajs/vue3'
import AppLayout from '@/Components/Layout/AppLayout.vue'

const props = defineProps({
    recentCalculations: Array,
    calculationCounts: Object,
    hasPaid: Boolean,
})

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

const getCalculatorLabel = (type) => {
    const labels = {
        affordability: 'VA Loan Affordability',
        cost_of_living: 'Cost of Living',
        disability: 'Disability Impact',
    }
    return labels[type] || type
}
</script>

<template>
    <AppLayout>
        <Head title="Dashboard" />

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

                <!-- Stats -->
                <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Affordability Calculations</p>
                        <p class="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{{ calculationCounts.affordability }}</p>
                    </div>
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">COL Comparisons</p>
                        <p class="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">{{ calculationCounts.cost_of_living }}</p>
                    </div>
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Disability Calculations</p>
                        <p class="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">{{ calculationCounts.disability }}</p>
                    </div>
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Account Status</p>
                        <p class="mt-2 text-xl font-bold" :class="hasPaid ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'">
                            {{ hasPaid ? 'Supporter' : 'Free' }}
                        </p>
                        <Link
                            v-if="!hasPaid"
                            href="/support"
                            class="mt-2 inline-block text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Unlock saves
                        </Link>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="mt-8">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                    <div class="mt-4 grid gap-4 sm:grid-cols-3">
                        <Link
                            href="/calculators/affordability"
                            class="flex items-center rounded-lg bg-blue-50 p-4 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
                        >
                            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </div>
                            <span class="ml-3 font-medium text-blue-700 dark:text-blue-300">Calculate Affordability</span>
                        </Link>
                        <Link
                            href="/calculators/cost-of-living"
                            class="flex items-center rounded-lg bg-green-50 p-4 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50"
                        >
                            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                                <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                            <span class="ml-3 font-medium text-green-700 dark:text-green-300">Compare States</span>
                        </Link>
                        <Link
                            href="/calculators/disability"
                            class="flex items-center rounded-lg bg-purple-50 p-4 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
                        >
                            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                                <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span class="ml-3 font-medium text-purple-700 dark:text-purple-300">Calculate Benefits</span>
                        </Link>
                    </div>
                </div>

                <!-- Recent Calculations -->
                <div class="mt-8">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Calculations</h2>
                        <Link href="/dashboard/calculations" class="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            View all
                        </Link>
                    </div>
                    <div class="mt-4 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <ul v-if="recentCalculations.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
                            <li v-for="calc in recentCalculations" :key="calc.id" class="px-6 py-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900 dark:text-white">
                                            {{ calc.name || getCalculatorLabel(calc.type) }}
                                        </p>
                                        <p class="text-sm text-gray-600 dark:text-gray-300">{{ formatDate(calc.created_at) }}</p>
                                    </div>
                                    <span class="rounded-full px-3 py-1 text-xs font-medium" :class="{
                                        'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300': calc.type === 'affordability',
                                        'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300': calc.type === 'cost_of_living',
                                        'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300': calc.type === 'disability',
                                    }">
                                        {{ getCalculatorLabel(calc.type) }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <div v-else class="px-6 py-12 text-center">
                            <p class="text-gray-600 dark:text-gray-300">No calculations saved yet.</p>
                            <Link href="/calculators/affordability" class="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                Create your first calculation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
