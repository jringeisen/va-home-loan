<script setup>
import { Link } from '@inertiajs/vue3'

defineProps({
    items: {
        type: Array,
        required: true,
        validator: (value) => value.every((item) => item.name && item.url),
    },
})
</script>

<template>
    <nav aria-label="Breadcrumb" class="mb-4">
        <ol class="flex flex-wrap items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <li v-for="(item, index) in items" :key="item.url" class="flex items-center">
                <template v-if="index < items.length - 1">
                    <Link
                        :href="item.url"
                        class="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
                    >
                        {{ item.name }}
                    </Link>
                    <svg
                        class="mx-2 h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </template>
                <template v-else>
                    <span class="font-medium text-gray-900 dark:text-white" aria-current="page">
                        {{ item.name }}
                    </span>
                </template>
            </li>
        </ol>
    </nav>
</template>
