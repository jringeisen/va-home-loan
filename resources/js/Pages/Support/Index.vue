<script setup>
import { Head, router, usePage } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import AppLayout from '@/Components/Layout/AppLayout.vue'

const props = defineProps({
    hasPaid: Boolean,
    suggestedAmounts: Array,
    minAmount: Number,
})

const page = usePage()

const selectedAmount = ref(10)
const customAmount = ref('')
const isCustom = ref(false)
const loading = ref(false)

const actualAmount = computed(() => {
    if (isCustom.value) {
        const parsed = parseFloat(customAmount.value)
        return isNaN(parsed) ? 0 : parsed
    }
    return selectedAmount.value
})

const isValidAmount = computed(() => actualAmount.value >= props.minAmount)

const selectAmount = (amount) => {
    selectedAmount.value = amount
    isCustom.value = false
    customAmount.value = ''
}

const enableCustom = () => {
    isCustom.value = true
}

const submitPayment = () => {
    if (!isValidAmount.value) return

    loading.value = true

    router.post('/support/checkout', {
        amount: actualAmount.value,
    }, {
        onError: () => {
            loading.value = false
        },
    })
}
</script>

<template>
    <AppLayout>
        <Head title="Support Us" />

        <div class="py-12">
            <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <!-- Already Paid -->
                <div v-if="hasPaid" class="rounded-2xl bg-green-50 p-8 text-center dark:bg-green-900/30">
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                        <svg class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 class="text-2xl font-bold text-green-900 dark:text-white">Thank You for Your Support!</h1>
                    <p class="mt-2 text-green-700 dark:text-green-300">
                        You have lifetime access to save unlimited calculations.
                    </p>
                    <a
                        href="/calculators/affordability"
                        class="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
                    >
                        Go to Calculators
                    </a>
                </div>

                <!-- Payment Form -->
                <div v-else>
                    <div class="text-center">
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Support VA Home Loan Calculator</h1>
                        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Your contribution helps keep this site running and allows us to add new features for fellow veterans.
                        </p>
                    </div>

                    <div class="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h2 class="text-center text-lg font-semibold text-gray-900 dark:text-white">Choose Your Amount</h2>
                        <p class="mt-1 text-center text-sm text-gray-600 dark:text-gray-300">One-time payment, lifetime access</p>

                        <!-- Amount Buttons -->
                        <div class="mt-6 grid grid-cols-4 gap-3">
                            <button
                                v-for="amount in suggestedAmounts"
                                :key="amount"
                                @click="selectAmount(amount)"
                                :class="[
                                    'rounded-lg border-2 py-4 text-lg font-semibold transition-colors',
                                    selectedAmount === amount && !isCustom
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                        : 'border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500'
                                ]"
                            >
                                ${{ amount }}
                            </button>
                            <button
                                @click="enableCustom"
                                :class="[
                                    'rounded-lg border-2 py-4 text-lg font-semibold transition-colors',
                                    isCustom
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                        : 'border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500'
                                ]"
                            >
                                Other
                            </button>
                        </div>

                        <!-- Custom Amount Input -->
                        <div v-if="isCustom" class="mt-4">
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600 dark:text-gray-300">$</span>
                                <input
                                    v-model="customAmount"
                                    type="number"
                                    :min="minAmount"
                                    step="1"
                                    placeholder="Enter amount"
                                    class="block w-full rounded-lg border-gray-300 pl-8 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                                />
                            </div>
                            <p v-if="customAmount && !isValidAmount" class="mt-2 text-sm text-red-600 dark:text-red-400">
                                Minimum amount is ${{ minAmount }}
                            </p>
                        </div>

                        <!-- What You Get -->
                        <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                            <h3 class="font-medium text-gray-900 dark:text-white">What you get:</h3>
                            <ul class="mt-2 space-y-2">
                                <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <svg class="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    Save unlimited calculations forever
                                </li>
                                <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <svg class="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    Access your saved calculations from any device
                                </li>
                                <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <svg class="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    Support a veteran-owned project
                                </li>
                            </ul>
                        </div>

                        <!-- Submit Button -->
                        <button
                            @click="submitPayment"
                            :disabled="!isValidAmount || loading"
                            :class="[
                                'mt-6 w-full rounded-lg py-4 text-lg font-semibold transition-colors',
                                isValidAmount && !loading
                                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                                    : 'cursor-not-allowed bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                            ]"
                        >
                            <span v-if="loading">Processing...</span>
                            <span v-else>Support with ${{ actualAmount }}</span>
                        </button>

                        <p class="mt-4 text-center text-xs text-gray-600 dark:text-gray-300">
                            Secure payment powered by Stripe. No recurring charges.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
