<script setup>
import { Form, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import AppLayout from '@/Components/Layout/AppLayout.vue'
import AnimatedNumber from '@/Components/UI/AnimatedNumber.vue'
import CalculatorActions from '@/Components/Calculator/CalculatorActions.vue'
import SaveCalculationModal from '@/Components/Calculator/SaveCalculationModal.vue'
import SeoHead from '@/Components/Seo/SeoHead.vue'
import Breadcrumbs from '@/Components/Seo/Breadcrumbs.vue'
import FaqSection from '@/Components/Seo/FaqSection.vue'
import RelatedTools from '@/Components/Seo/RelatedTools.vue'
import { useCalculator } from '@/Composables/useCalculator'

const props = defineProps({
    states: Object,
    results: Object,
    inputs: Object,
})

// Get shared SEO data
const page = usePage()
const appUrl = computed(() => page.props.seo?.appUrl || '')

// SEO Data
const seoTitle = 'Cost of Living Calculator | Compare States for Relocation'
const seoDescription = 'Compare cost of living between states for relocations. Compare housing, utilities, transportation, taxes, and calculate equivalent salary needed.'
const canonical = computed(() => `${appUrl.value}/calculators/cost-of-living`)

// Breadcrumbs
const breadcrumbItems = computed(() => [
    { name: 'Home', url: appUrl.value || '/' },
    { name: 'Calculators', url: `${appUrl.value}/calculators/affordability` },
    { name: 'Cost of Living Calculator', url: `${appUrl.value}/calculators/cost-of-living` },
])

// FAQ Data for SEO
const faqQuestions = [
    {
        question: 'How does cost of living vary between states?',
        answer: 'Cost of living varies significantly between states, with factors like housing, utilities, transportation, groceries, healthcare, and taxes all playing a role. States like Mississippi, Oklahoma, and Kansas have the lowest overall costs, while Hawaii, California, and New York are among the most expensive. Housing typically accounts for the largest difference between states.',
    },
    {
        question: 'Which states have the lowest cost of living?',
        answer: 'States with the lowest overall cost of living typically include Mississippi, Oklahoma, Kansas, Alabama, and Missouri. These states offer lower housing costs, utilities, and general expenses. However, you should also consider factors like job market, quality of life, climate, and proximity to family when deciding where to relocate.',
    },
    {
        question: 'How do I calculate equivalent salary when moving states?',
        answer: 'To calculate equivalent salary, you adjust your current income by the cost of living difference between states. If you earn $75,000 in Texas and move to California where costs are 20% higher, you would need approximately $90,000 to maintain the same standard of living. Our calculator performs this calculation automatically based on comprehensive cost of living data.',
    },
    {
        question: 'What factors should I consider when relocating to another state?',
        answer: 'Beyond cost of living, consider: state income tax rates (some states have no income tax), property tax rates, job market for your skills, quality of schools if you have children, healthcare availability, climate preferences, distance from family, and overall quality of life. A lower cost of living state may not be the best choice if job opportunities are limited.',
    },
    {
        question: 'Are there states with no income tax?',
        answer: 'Nine states have no state income tax: Alaska, Florida, Nevada, New Hampshire (limited to interest and dividends), South Dakota, Tennessee, Texas, Washington, and Wyoming. Moving to one of these states can result in significant tax savings, though they may have higher property or sales taxes to compensate.',
    },
    {
        question: 'How accurate is cost of living data?',
        answer: 'Our calculator uses data from MERIC (Missouri Economic Research and Information Center) which provides quarterly cost of living indices based on actual pricing data across multiple categories. While individual experiences may vary based on lifestyle choices and specific cities within a state, this data provides a reliable baseline for comparing states.',
    },
    {
        question: 'What categories are included in cost of living calculations?',
        answer: 'Our calculator compares seven key categories: housing (28% weight), taxes (25% weight), transportation (12%), miscellaneous goods and services (12%), grocery (10%), utilities (8%), and healthcare (5%). Housing and taxes typically have the largest impact on overall cost of living differences between states.',
    },
]

// Related Tools
const relatedTools = computed(() => [
    {
        name: 'VA Loan Affordability Calculator',
        url: `${appUrl.value}/calculators/affordability`,
        description: 'Calculate your maximum VA home loan amount',
    },
    {
        name: 'VA Disability Calculator',
        url: `${appUrl.value}/calculators/disability`,
        description: 'Estimate your VA disability compensation',
    },
])

// Default form values
const defaultValues = {
    from_state: 'TX',
    to_state: 'CA',
    current_salary: 75000,
}

// Update URL with current display values for sharing (SSR-safe)
const updateUrl = () => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams()
    params.set('from', display.from_state)
    params.set('to', display.to_state)
    params.set('salary', display.current_salary)

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

// Page-specific formatter
const formatPercent = (value) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
}

// Placeholder for save modal
const savePlaceholder = computed(() =>
    `e.g., ${props.states[display.from_state]} to ${props.states[display.to_state]}`
)

// Transform function to convert form data types before submission
const transformData = (data) => ({
    ...data,
    current_salary: parseFloat(data.current_salary) || 0,
})
</script>

<template>
    <AppLayout>
        <SeoHead
            :title="seoTitle"
            :description="seoDescription"
            :canonical="canonical"
            :faq-schema="faqQuestions"
            :breadcrumb-schema="breadcrumbItems"
        />

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <!-- Breadcrumbs -->
                <div class="no-print">
                    <Breadcrumbs :items="breadcrumbItems" />
                </div>

                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Cost of Living Comparison Calculator</h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-300">
                        Compare cost of living between states to make informed decisions about relocations.
                    </p>
                </div>

                <!-- Intro Content for SEO -->
                <div class="prose prose-blue mb-8 max-w-none no-print dark:prose-invert">
                    <p class="text-gray-700 dark:text-gray-300">
                        Considering a move to another state? Understanding the cost of living differences is crucial for maintaining your standard of living and making informed financial decisions. This calculator compares comprehensive cost data across housing, utilities, transportation, groceries, healthcare, taxes, and more.
                    </p>
                    <p class="text-gray-700 dark:text-gray-300">
                        Enter your current and destination states, along with your salary, to see the percentage difference in costs and calculate the equivalent salary you would need to maintain your current lifestyle.
                    </p>
                </div>

                <div class="grid gap-8 lg:grid-cols-2">
                    <!-- Input Form -->
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Compare States</h2>

                        <!-- Print-only summary of inputs -->
                        <div class="print-show mb-6 hidden space-y-2 text-sm">
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">From State:</span>
                                <span class="font-medium">{{ states[display.from_state] }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">To State:</span>
                                <span class="font-medium">{{ states[display.to_state] }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Current Annual Salary:</span>
                                <span class="font-medium">{{ formatCurrency(display.current_salary) }}</span>
                            </div>
                        </div>

                        <Form
                            ref="formRef"
                            action="/calculators/cost-of-living/calculate"
                            method="post"
                            :transform="transformData"
                            :options="{ preserveState: true, preserveScroll: true, preserveUrl: true }"
                            class="no-print space-y-6"
                            @input="onInput"
                            @start="onFormStart"
                            @finish="onFormFinish"
                            @error="onFormError"
                        >
                            <div class="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="from_state" class="block text-sm font-medium text-gray-700 dark:text-gray-300">From State</label>
                                    <select
                                        id="from_state"
                                        name="from_state"
                                        :value="display.from_state"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option v-for="(name, code) in states" :key="code" :value="code">{{ name }}</option>
                                    </select>
                                </div>

                                <div>
                                    <label for="to_state" class="block text-sm font-medium text-gray-700 dark:text-gray-300">To State</label>
                                    <select
                                        id="to_state"
                                        name="to_state"
                                        :value="display.to_state"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option v-for="(name, code) in states" :key="code" :value="code">{{ name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label for="current_salary" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Annual Salary</label>
                                <div class="relative mt-1">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true">$</span>
                                    <input
                                        id="current_salary"
                                        name="current_salary"
                                        :value="display.current_salary"
                                        type="number"
                                        class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </Form>
                    </div>

                    <!-- Results -->
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Comparison Results</h2>

                        <div v-if="loading" class="flex items-center justify-center py-12" role="status" aria-label="Calculating results">
                            <div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" aria-hidden="true"></div>
                            <span class="sr-only">Calculating...</span>
                        </div>

                        <div v-else-if="error" class="rounded-md bg-red-50 p-4">
                            <p class="text-sm text-red-700">{{ error }}</p>
                        </div>

                        <div v-else-if="props.results" class="space-y-6">
                            <!-- Overall Comparison -->
                            <div :class="[
                                'rounded-lg p-4',
                                props.results.overall_percent_change > 0 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'
                            ]">
                                <p class="text-sm font-medium" :class="props.results.overall_percent_change > 0 ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'">
                                    {{ props.results.cost_difference_description }}
                                </p>
                                <p class="text-2xl font-bold" :class="props.results.overall_percent_change > 0 ? 'text-red-900 dark:text-white' : 'text-green-900 dark:text-white'">
                                    {{ formatPercent(props.results.overall_percent_change) }}
                                </p>
                                <p class="text-sm" :class="props.results.overall_percent_change > 0 ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'">
                                    {{ states[props.results.to_state] }} vs {{ states[props.results.from_state] }}
                                </p>
                            </div>

                            <!-- Category Breakdown -->
                            <div>
                                <h3 class="mb-3 font-medium text-gray-900 dark:text-white">Category Breakdown</h3>
                                <div class="space-y-3">
                                    <div v-for="(data, category) in props.results.category_comparison" :key="category" class="flex items-center justify-between">
                                        <span class="text-gray-600 capitalize dark:text-gray-300">{{ category.replace('_', ' ') }}</span>
                                        <span :class="['font-medium', data.percent_change > 0 ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400']">
                                            {{ formatPercent(data.percent_change) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Equivalent Salary -->
                            <div v-if="props.results.equivalent_salary" class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
                                <h3 class="font-medium text-blue-800 dark:text-blue-300">Equivalent Salary</h3>
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    To maintain your standard of living in {{ states[props.results.to_state] }}, you would need:
                                </p>
                                <p class="text-2xl font-bold text-blue-900 dark:text-white">
                                    <AnimatedNumber :value="props.results.equivalent_salary" :format="formatCurrency" />
                                </p>
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    ({{ props.results.salary_adjustment >= 0 ? '+' : '' }}{{ formatCurrency(props.results.salary_adjustment) }} from current)
                                </p>
                            </div>

                            <!-- Action Buttons -->
                            <CalculatorActions
                                :link-copied="linkCopied"
                                :show-save="!!user"
                                save-label="Save Comparison"
                                @copy="copyLink"
                                @print="printResults"
                                @save="openSaveModal"
                            />

                            <div v-if="!user" class="text-center">
                                <p class="text-sm text-gray-600 dark:text-gray-300">
                                    <a href="/register" class="font-medium text-green-700 underline hover:text-green-600 dark:text-green-400 dark:hover:text-green-300">
                                        Create an account
                                    </a>
                                    to save your comparisons.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Data Sources -->
                <div class="mt-8 rounded-lg bg-gray-50 p-4 no-print dark:bg-gray-800/50">
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Data Sources</h3>
                    <ul class="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-300">
                        <li>
                            Cost of living indices (grocery, housing, utilities, transportation, health, misc):
                            <a href="https://meric.mo.gov/data/cost-living-data-series" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                MERIC Q3 2025
                            </a>
                        </li>
                        <li>
                            State tax burden data:
                            <a href="https://wallethub.com/edu/states-with-highest-lowest-tax-burden/20494" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                WalletHub 2025
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- FAQ Section -->
                <div class="no-print">
                    <FaqSection :questions="faqQuestions" />
                </div>

                <!-- Related Tools -->
                <div class="no-print">
                    <RelatedTools :tools="relatedTools" />
                </div>
            </div>
        </div>

        <!-- Save Modal -->
        <SaveCalculationModal
            :show="showSaveModal"
            type="cost_of_living"
            :inputs="display"
            :results="props.results"
            :placeholder="savePlaceholder"
            @close="closeSaveModal"
        />
    </AppLayout>
</template>
