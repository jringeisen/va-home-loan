<script setup>
import { Head, Form } from '@inertiajs/vue3'
import AppLayout from '@/Components/Layout/AppLayout.vue'
import Tooltip from '@/Components/UI/Tooltip.vue'
import AnimatedNumber from '@/Components/UI/AnimatedNumber.vue'
import CalculatorActions from '@/Components/Calculator/CalculatorActions.vue'
import SaveCalculationModal from '@/Components/Calculator/SaveCalculationModal.vue'
import { useCalculator } from '@/Composables/useCalculator'

const props = defineProps({
    states: Object,
    results: Object,
    inputs: Object,
})

// Default form values
const defaultValues = {
    disability_rating: 50,
    has_spouse: false,
    children_count: 0,
    state: 'TX',
    home_value: 300000,
}

// Update URL with current display values for sharing (SSR-safe)
const updateUrl = () => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams()
    params.set('rating', display.disability_rating)
    if (display.has_spouse) params.set('spouse', 'true')
    if (display.children_count > 0) params.set('children', display.children_count)
    params.set('state', display.state)
    params.set('home', display.home_value)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
}

// Use the calculator composable
const {
    user,
    formRef,
    display,
    loading,
    error,
    showSaveModal,
    linkCopied,
    onFormStart,
    onFormFinish,
    onFormError,
    onInput,
    openSaveModal,
    closeSaveModal,
    printResults,
    copyLink,
    formatCurrency,
} = useCalculator({
    defaultValues,
    inputs: props.inputs,
    updateUrl,
})

// Transform function to convert form data types before submission
const transformData = (data) => ({
    ...data,
    disability_rating: parseInt(data.disability_rating) || 0,
    has_spouse: data.has_spouse === 'on' || data.has_spouse === true,
    children_count: parseInt(data.children_count) || 0,
    home_value: parseFloat(data.home_value) || 0,
})
</script>

<template>
    <AppLayout>
        <Head title="VA Disability Compensation Calculator - 2025 Rates">
            <meta name="description" content="Calculate your VA disability compensation with 2025 rates. Includes dependent additions, state tax benefits, property tax exemptions, and additional VA benefits." />
            <meta property="og:title" content="VA Disability Calculator - 2025 Compensation Rates" />
            <meta property="og:description" content="Free VA disability compensation calculator with current 2025 rates. Calculate monthly benefits, state tax exemptions, and property tax savings." />
        </Head>

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Disability Rating Impact Calculator</h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-300">
                        Calculate your monthly compensation and discover state-specific tax benefits based on your VA disability rating.
                    </p>
                </div>

                <div class="grid gap-8 lg:grid-cols-2">
                    <!-- Input Form -->
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Your Information</h2>

                        <!-- Print-only summary of inputs -->
                        <div class="print-show mb-6 hidden space-y-2 text-sm">
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Disability Rating:</span>
                                <span class="font-medium">{{ display.disability_rating }}%</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Spouse:</span>
                                <span class="font-medium">{{ display.has_spouse ? 'Yes' : 'No' }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Number of Children:</span>
                                <span class="font-medium">{{ display.children_count }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">State of Residence:</span>
                                <span class="font-medium">{{ states[display.state] }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Home Value:</span>
                                <span class="font-medium">{{ formatCurrency(display.home_value) }}</span>
                            </div>
                        </div>

                        <Form
                            ref="formRef"
                            action="/calculators/disability/calculate"
                            method="post"
                            :transform="transformData"
                            :options="{ preserveState: true, preserveScroll: true, preserveUrl: true }"
                            class="no-print space-y-6"
                            @input="onInput"
                            @start="onFormStart"
                            @finish="onFormFinish"
                            @error="onFormError"
                        >
                            <!-- Disability Rating Slider -->
                            <div>
                                <Tooltip content="VA disability ratings range from 0-100% in 10% increments. Combined ratings use VA math, not simple addition. Ratings of 30%+ receive additional compensation for dependents.">
                                    <label for="disability_rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Disability Rating: {{ display.disability_rating }}%
                                    </label>
                                </Tooltip>
                                <input
                                    id="disability_rating"
                                    name="disability_rating"
                                    :value="display.disability_rating"
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="10"
                                    :aria-valuenow="display.disability_rating"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    class="mt-2 w-full"
                                />
                                <div class="mt-1 flex justify-between text-xs text-gray-600 dark:text-gray-300" aria-hidden="true">
                                    <span>0%</span>
                                    <span>50%</span>
                                    <span>100%</span>
                                </div>
                            </div>

                            <!-- Dependents -->
                            <div class="space-y-4">
                                <Tooltip content="Veterans with 30%+ disability rating receive additional monthly compensation for each dependent (spouse, children, dependent parents).">
                                    <h3 class="font-medium text-gray-900 dark:text-white">Dependents</h3>
                                </Tooltip>

                                <div class="flex items-center">
                                    <input
                                        id="spouse"
                                        name="has_spouse"
                                        :checked="display.has_spouse"
                                        type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <label for="spouse" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Spouse
                                    </label>
                                </div>

                                <div>
                                    <label for="children_count" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Number of Children
                                    </label>
                                    <select
                                        id="children_count"
                                        name="children_count"
                                        :value="display.children_count"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option v-for="n in 11" :key="n-1" :value="n-1">{{ n-1 }}</option>
                                    </select>
                                </div>
                            </div>

                            <!-- State Selection -->
                            <div>
                                <label for="state" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    State of Residence
                                </label>
                                <select
                                    id="state"
                                    name="state"
                                    :value="display.state"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Select state...</option>
                                    <option v-for="(name, code) in states" :key="code" :value="code">
                                        {{ name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Home Value -->
                            <div>
                                <Tooltip content="Many states offer property tax exemptions for disabled veterans. The exemption amount varies by state and disability rating, often requiring 100% rating for full exemption.">
                                    <label for="home_value" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Home Value (for property tax exemption estimate)
                                    </label>
                                </Tooltip>
                                <div class="relative mt-1">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true">$</span>
                                    <input
                                        id="home_value"
                                        name="home_value"
                                        :value="display.home_value"
                                        type="number"
                                        class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </Form>
                    </div>

                    <!-- Results -->
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Your Benefits</h2>

                        <div v-if="loading" class="flex items-center justify-center py-12" role="status" aria-label="Calculating results">
                            <div class="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" aria-hidden="true"></div>
                            <span class="sr-only">Calculating...</span>
                        </div>

                        <div v-else-if="error" class="rounded-md bg-red-50 p-4">
                            <p class="text-sm text-red-700">{{ error }}</p>
                        </div>

                        <div v-else-if="props.results" class="space-y-6">
                            <!-- Monthly Compensation -->
                            <div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30">
                                <p class="text-sm font-medium text-purple-700 dark:text-purple-300">Monthly Compensation</p>
                                <p class="text-3xl font-bold text-purple-900 dark:text-white">
                                    <AnimatedNumber :value="props.results.total_monthly_compensation" :format="formatCurrency" />
                                </p>
                                <p class="mt-1 text-sm text-purple-600 dark:text-purple-400">
                                    <AnimatedNumber :value="props.results.annual_compensation" :format="formatCurrency" />/year (tax-free)
                                </p>
                            </div>

                            <!-- Compensation Breakdown -->
                            <div v-if="props.results.dependent_addition > 0">
                                <h3 class="mb-3 font-medium text-gray-900 dark:text-white">Breakdown</h3>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-300">Base Rate ({{ props.results.disability_rating }}%)</span>
                                        <span class="font-medium dark:text-white">{{ formatCurrency(props.results.base_monthly_compensation) }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-300">Dependent Additions</span>
                                        <span class="font-medium dark:text-white">+{{ formatCurrency(props.results.dependent_addition) }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- State Benefits -->
                            <div v-if="props.results.state_benefits" class="rounded-lg bg-green-50 p-4 dark:bg-green-900/30">
                                <h3 class="mb-2 font-medium text-green-800 dark:text-green-300">
                                    {{ states[props.results.state] }} Benefits
                                </h3>
                                <ul class="space-y-2 text-sm text-green-700 dark:text-green-400">
                                    <li class="flex items-center">
                                        <svg v-if="props.results.state_benefits.income_tax_exempt" class="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                        VA disability compensation is federal tax-free
                                    </li>
                                    <li v-if="props.results.state_benefits.state_income_tax_exempt" class="flex items-center">
                                        <svg class="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                        State income tax exempt
                                    </li>
                                    <li v-if="props.results.state_benefits.property_tax_exemption">
                                        <div class="flex items-start">
                                            <svg class="mr-2 mt-0.5 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span>{{ props.results.state_benefits.property_tax_exemption }}</span>
                                        </div>
                                        <p v-if="props.results.state_benefits.annual_property_tax_savings > 0" class="ml-6 font-medium">
                                            Est. savings: {{ formatCurrency(props.results.state_benefits.annual_property_tax_savings) }}/year
                                        </p>
                                    </li>
                                    <li v-else-if="props.results.state_benefits.property_tax_min_rating">
                                        <span class="text-amber-700">
                                            Property tax exemption requires {{ props.results.state_benefits.property_tax_min_rating }}%+ rating
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Total Annual Benefit -->
                            <div class="rounded-lg border-2 border-purple-200 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/30">
                                <p class="text-sm font-medium text-purple-700 dark:text-purple-300">Estimated Total Annual Benefit</p>
                                <p class="text-3xl font-bold text-purple-900 dark:text-white">
                                    <AnimatedNumber :value="props.results.total_annual_benefit" :format="formatCurrency" />
                                </p>
                            </div>

                            <!-- Additional Benefits -->
                            <div v-if="Object.values(props.results.additional_benefits).some(v => v)">
                                <h3 class="mb-2 font-medium text-gray-900 dark:text-white">Additional Benefits You May Qualify For</h3>
                                <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                    <li v-if="props.results.additional_benefits.va_healthcare">VA Healthcare</li>
                                    <li v-if="props.results.additional_benefits.education_benefits">Education Benefits</li>
                                    <li v-if="props.results.additional_benefits.vocational_rehabilitation">Vocational Rehabilitation</li>
                                    <li v-if="props.results.additional_benefits.dependent_education">Dependent Education Assistance</li>
                                    <li v-if="props.results.additional_benefits.dental_care">VA Dental Care</li>
                                    <li v-if="props.results.additional_benefits.champ_va">CHAMPVA (Family Healthcare)</li>
                                </ul>
                            </div>

                            <!-- Action Buttons -->
                            <CalculatorActions
                                :link-copied="linkCopied"
                                :show-save="!!user"
                                @copy="copyLink"
                                @print="printResults"
                                @save="openSaveModal"
                            />

                            <div v-if="!user" class="text-center">
                                <p class="text-sm text-gray-600 dark:text-gray-300">
                                    <a href="/register" class="font-medium text-purple-700 underline hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300">
                                        Create an account
                                    </a>
                                    to save your calculations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Data Sources -->
                <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Data Sources</h3>
                    <ul class="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-300">
                        <li>
                            VA disability compensation rates (2026, effective Dec 1, 2025):
                            <a href="https://www.va.gov/disability/compensation-rates/veteran-rates/" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                VA.gov
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Save Modal -->
        <SaveCalculationModal
            :show="showSaveModal"
            type="disability"
            :inputs="display"
            :results="props.results"
            placeholder="e.g., My Disability Benefits"
            @close="closeSaveModal"
        />
    </AppLayout>
</template>
