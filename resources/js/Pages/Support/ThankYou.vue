<script setup>
import { Head, Link } from '@inertiajs/vue3'
import AppLayout from '@/Components/Layout/AppLayout.vue'

const props = defineProps({
    amount: Number,
})
</script>

<template>
    <AppLayout>
        <Head title="Thank You!" />

        <div class="flex min-h-[60vh] items-center justify-center py-12">
            <div class="text-center">
                <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                    <svg class="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h1 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Thank You for Your Support!</h1>
                <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Your ${{ amount }} contribution means a lot to us.
                </p>
                <p class="mt-2 text-gray-600 dark:text-gray-300">
                    You now have lifetime access to save unlimited calculations.
                </p>
                <div class="mt-8 flex justify-center gap-4">
                    <Link
                        href="/dashboard"
                        class="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/calculators/affordability"
                        class="rounded-md bg-gray-100 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        Start Calculating
                    </Link>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
