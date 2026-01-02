<script setup>
defineProps({
    class: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <div :class="['flex items-center gap-2.5', $props.class]">
        <svg viewBox="0 0 48 48" class="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3b82f6" />
                    <stop offset="100%" stop-color="#1d4ed8" />
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
            <!-- House outline -->
            <path
                d="M24 11L11 21v15h26V21L24 11z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
            />
            <!-- Chimney -->
            <path
                d="M31 16v-3h4v7"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
            />
            <!-- Door -->
            <rect x="21" y="28" width="6" height="8" rx="0.5" stroke="white" stroke-width="1.5" fill="none" />
        </svg>
        <div class="flex flex-col leading-none">
            <span class="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-lg font-bold text-transparent dark:from-blue-400 dark:to-blue-500">VA Home Loan</span>
            <span class="text-[10px] font-semibold tracking-widest text-gray-700 dark:text-gray-300">CALCULATOR</span>
        </div>
    </div>
</template>
