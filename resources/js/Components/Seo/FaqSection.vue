<script setup>
import { ref } from 'vue'

defineProps({
    questions: {
        type: Array,
        required: true,
        validator: (value) => value.every((q) => q.question && q.answer),
    },
    title: {
        type: String,
        default: 'Frequently Asked Questions',
    },
})

const openIndex = ref(null)

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
    <section class="mt-12">
        <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h2>
        <div class="space-y-4">
            <div
                v-for="(item, index) in questions"
                :key="index"
                class="rounded-lg border border-gray-200 dark:border-gray-700"
            >
                <button
                    type="button"
                    class="flex w-full items-center justify-between px-4 py-4 text-left"
                    :aria-expanded="openIndex === index"
                    :aria-controls="`faq-answer-${index}`"
                    @click="toggle(index)"
                >
                    <h3 class="pr-4 text-base font-medium text-gray-900 dark:text-white">
                        {{ item.question }}
                    </h3>
                    <svg
                        :class="[
                            'h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 dark:text-gray-400',
                            openIndex === index ? 'rotate-180' : ''
                        ]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                <Transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                >
                    <div
                        v-show="openIndex === index"
                        :id="`faq-answer-${index}`"
                        class="border-t border-gray-200 px-4 py-4 dark:border-gray-700"
                    >
                        <p class="text-gray-600 dark:text-gray-300">{{ item.answer }}</p>
                    </div>
                </Transition>
            </div>
        </div>
    </section>
</template>
