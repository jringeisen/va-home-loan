<script setup>
import { ref } from 'vue'

defineProps({
    content: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        default: 'top',
        validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
    },
})

const showTooltip = ref(false)
</script>

<template>
    <span class="relative inline-flex items-center">
        <slot />
        <button
            type="button"
            aria-label="More information"
            :aria-expanded="showTooltip"
            class="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
            @focus="showTooltip = true"
            @blur="showTooltip = false"
        >
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
        </button>
        <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="showTooltip"
                :class="[
                    'absolute z-50 w-64 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-gray-700',
                    {
                        'bottom-full left-1/2 mb-2 -translate-x-1/2': position === 'top',
                        'top-full left-1/2 mt-2 -translate-x-1/2': position === 'bottom',
                        'right-full top-1/2 mr-2 -translate-y-1/2': position === 'left',
                        'left-full top-1/2 ml-2 -translate-y-1/2': position === 'right',
                    }
                ]"
            >
                {{ content }}
                <div
                    :class="[
                        'absolute h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700',
                        {
                            'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2': position === 'top',
                            'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2': position === 'bottom',
                            'right-0 top-1/2 translate-x-1/2 -translate-y-1/2': position === 'left',
                            'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2': position === 'right',
                        }
                    ]"
                />
            </div>
        </Transition>
    </span>
</template>
