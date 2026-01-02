<script setup>
import { Form, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import AppLayout from '@/Components/Layout/AppLayout.vue'
import Tooltip from '@/Components/UI/Tooltip.vue'
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
const seoTitle = 'VA Disability Calculator 2025 | Monthly Compensation Rates'
const seoDescription = 'Calculate your VA disability compensation with 2025 rates. Includes dependent additions, state tax benefits, and property tax exemptions for veterans.'
const canonical = computed(() => `${appUrl.value}/calculators/disability`)

// Breadcrumbs
const breadcrumbItems = computed(() => [
    { name: 'Home', url: appUrl.value || '/' },
    { name: 'Calculators', url: `${appUrl.value}/calculators/affordability` },
    { name: 'Disability Calculator', url: `${appUrl.value}/calculators/disability` },
])

// FAQ Data for SEO
const faqQuestions = [
    {
        question: 'How is VA disability compensation calculated?',
        answer: 'VA disability compensation is calculated based on your combined disability rating and number of dependents. The VA uses a specific rate table that increases with your disability percentage. Veterans with ratings of 30% or higher receive additional compensation for dependents including spouses, children, and dependent parents.',
    },
    {
        question: 'What are the 2025 VA disability pay rates?',
        answer: 'For 2025, VA disability rates range from $171.23/month for a 10% rating to $3,737.85/month for a 100% rating for veterans without dependents. These rates receive an annual cost-of-living adjustment (COLA). Veterans with dependents receive higher amounts, with the increase varying based on rating level and number of dependents.',
    },
    {
        question: 'Do dependents increase my VA disability payment?',
        answer: 'Yes, if your disability rating is 30% or higher, you receive additional compensation for dependents. This includes your spouse, children under 18, children 18-23 in school, and dependent parents. The additional amount varies based on your rating level - higher ratings provide larger dependent additions.',
    },
    {
        question: 'Is VA disability compensation taxable?',
        answer: 'No, VA disability compensation is completely tax-free at the federal level. Most states also exempt VA disability benefits from state income tax. This tax-free status makes VA disability benefits more valuable than equivalent taxable income and should be considered when comparing to other income sources.',
    },
    {
        question: 'What state benefits do disabled veterans receive?',
        answer: 'State benefits vary significantly but may include: property tax exemptions (partial or full based on rating), state income tax exemptions, vehicle registration fee waivers, hunting and fishing license discounts, state park access, and education benefits. Some states offer full property tax exemption for 100% disabled veterans.',
    },
    {
        question: 'How do I know my VA disability rating?',
        answer: 'Your VA disability rating is determined through the VA claims process. You can view your current rating by logging into VA.gov, calling the VA at 1-800-827-1000, or reviewing your VA benefits letter. If you have multiple conditions, the VA uses "VA math" to calculate your combined rating, which is not a simple addition.',
    },
    {
        question: 'Can I receive VA disability and work at the same time?',
        answer: 'Yes, you can work while receiving VA disability compensation at any rating level, including 100%. VA disability is based on your service-connected conditions, not your ability to work. However, if you receive Total Disability Individual Unemployability (TDIU), there are specific work limitations to maintain that benefit.',
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
        name: 'Cost of Living Calculator',
        url: `${appUrl.value}/calculators/cost-of-living`,
        description: 'Compare cost of living between states for PCS moves',
    },
])

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
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">VA Disability Compensation Calculator</h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-300">
                        Calculate your monthly compensation and discover state-specific tax benefits based on your VA disability rating.
                    </p>
                </div>

                <!-- Intro Content for SEO -->
                <div class="prose prose-blue mb-8 max-w-none no-print dark:prose-invert">
                    <p class="text-gray-700 dark:text-gray-300">
                        Understanding your VA disability compensation is essential for financial planning. This calculator uses the current 2025 VA disability rates to estimate your monthly tax-free compensation based on your rating and dependents.
                    </p>
                    <p class="text-gray-700 dark:text-gray-300">
                        Beyond federal compensation, many states offer additional benefits for disabled veterans including property tax exemptions, state income tax exemptions, and other valuable programs. Our calculator factors in your state of residence to provide a comprehensive view of your potential benefits.
                    </p>
                    <p class="text-gray-700 dark:text-gray-300">
                        Enter your disability rating, dependent information, and state below to see your estimated monthly compensation, annual benefits, and state-specific tax savings.
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
                <div class="mt-8 rounded-lg bg-gray-50 p-4 no-print dark:bg-gray-800/50">
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
            type="disability"
            :inputs="display"
            :results="props.results"
            placeholder="e.g., My Disability Benefits"
            @close="closeSaveModal"
        />
    </AppLayout>
</template>
