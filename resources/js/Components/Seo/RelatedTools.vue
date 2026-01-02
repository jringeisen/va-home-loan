<script setup>
import { Link } from '@inertiajs/vue3'

defineProps({
    tools: {
        type: Array,
        required: true,
        validator: (value) => value.every((tool) => tool.name && tool.url && tool.description),
    },
    title: {
        type: String,
        default: 'Related Tools',
    },
})
</script>

<template>
    <section class="mt-12">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h2>
        <div class="grid gap-4 sm:grid-cols-2">
            <Link
                v-for="tool in tools"
                :key="tool.url"
                :href="tool.url"
                class="group rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
            >
                <h3 class="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {{ tool.name }}
                </h3>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {{ tool.description }}
                </p>
            </Link>
        </div>
    </section>
</template>
