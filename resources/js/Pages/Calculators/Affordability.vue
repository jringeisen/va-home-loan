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
    results: Object,
    inputs: Object,
})

// Get shared SEO data
const page = usePage()
const appUrl = computed(() => page.props.seo?.appUrl || '')

// SEO Data
const seoTitle = 'VA Loan Affordability Calculator | How Much Home Can You Afford?'
const seoDescription = 'Calculate your maximum VA home loan amount based on income, debts, and disability benefits. Free calculator with funding fee estimates and no PMI savings.'
const canonical = computed(() => `${appUrl.value}/calculators/affordability`)

// Breadcrumbs
const breadcrumbItems = computed(() => [
    { name: 'Home', url: appUrl.value || '/' },
    { name: 'Calculators', url: `${appUrl.value}/calculators/affordability` },
    { name: 'Affordability Calculator', url: `${appUrl.value}/calculators/affordability` },
])

// FAQ Data for SEO
const faqQuestions = [
    {
        question: 'How much house can I afford with a VA loan?',
        answer: 'The amount of house you can afford with a VA loan depends on your income, existing debts, credit score, and current interest rates. VA loans use a debt-to-income (DTI) ratio of up to 41% to determine affordability. Our calculator factors in your annual income, monthly debt payments, down payment, and VA disability benefits to give you an accurate estimate of your maximum purchase price.',
    },
    {
        question: 'What is the debt-to-income ratio for VA loans?',
        answer: 'VA loans typically allow a maximum debt-to-income (DTI) ratio of 41%. This means your total monthly debts, including your new mortgage payment, should not exceed 41% of your gross monthly income. However, some lenders may approve higher ratios with compensating factors such as excellent credit, significant savings, or VA disability income.',
    },
    {
        question: 'Does VA disability income count for VA loan qualification?',
        answer: 'Yes, VA disability compensation is considered stable, tax-free income and can be used to qualify for a VA loan. Since it\'s non-taxable, lenders often "gross up" this income by 25% when calculating your DTI ratio. For example, $2,000 in monthly disability benefits might count as $2,500 for qualification purposes.',
    },
    {
        question: 'What is the VA funding fee and who is exempt?',
        answer: 'The VA funding fee is a one-time fee paid to the VA that helps sustain the loan program. It ranges from 1.25% to 3.3% of the loan amount, depending on your down payment and whether it\'s your first VA loan. Veterans with a service-connected disability rating of 10% or higher are exempt from paying the funding fee, potentially saving thousands of dollars.',
    },
    {
        question: 'Do VA loans require PMI?',
        answer: 'No, VA loans do not require Private Mortgage Insurance (PMI), regardless of your down payment amount. This is one of the major benefits of VA loans compared to conventional mortgages, which typically require PMI for down payments less than 20%. This can save you hundreds of dollars per month.',
    },
    {
        question: 'Can I get a VA loan with no down payment?',
        answer: 'Yes, one of the biggest advantages of VA loans is the ability to purchase a home with no down payment. VA loans are one of the only loan programs that offer 100% financing for eligible veterans, service members, and surviving spouses. However, making a down payment can reduce your VA funding fee and monthly payments.',
    },
    {
        question: 'What credit score do I need for a VA loan?',
        answer: 'The VA does not set a minimum credit score requirement, but most lenders require a score of at least 620. Some lenders may approve borrowers with lower scores, especially those with compensating factors. A higher credit score typically results in better interest rates and more favorable loan terms.',
    },
    {
        question: 'How does VA loan affordability differ from conventional loans?',
        answer: 'VA loans offer several advantages that can increase your buying power compared to conventional loans: no down payment requirement, no PMI, competitive interest rates, and the ability to include VA disability income. Additionally, VA loans have more flexible DTI requirements and may accept lower credit scores, making homeownership accessible to more veterans.',
    },
]

// Related Tools
const relatedTools = computed(() => [
    {
        name: 'VA Disability Calculator',
        url: `${appUrl.value}/calculators/disability`,
        description: 'Estimate your VA disability compensation with 2025 rates',
    },
    {
        name: 'Cost of Living Calculator',
        url: `${appUrl.value}/calculators/cost-of-living`,
        description: 'Compare cost of living between states for PCS moves',
    },
])

// Default form values
const defaultValues = {
    annual_income: 75000,
    monthly_debts: 500,
    down_payment: 10000,
    interest_rate: 6.5,
    loan_term_years: 30,
    is_first_use: true,
    disability_rating: 0,
    has_spouse: false,
    children_count: 0,
}

// Update URL with current display values for sharing (SSR-safe)
const updateUrl = () => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams()
    params.set('income', display.annual_income)
    params.set('debts', display.monthly_debts)
    params.set('down', display.down_payment)
    params.set('rate', display.interest_rate)
    params.set('term', display.loan_term_years)
    if (!display.is_first_use) params.set('first', 'false')
    if (display.disability_rating > 0) params.set('rating', display.disability_rating)
    if (display.has_spouse) params.set('spouse', 'true')
    if (display.children_count > 0) params.set('children', display.children_count)

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

// Inputs to pass to save modal (with computed dependents)
const saveInputs = computed(() => {
    const dependents = (display.has_spouse ? 1 : 0) + (display.children_count || 0)
    return { ...display, disability_dependents: dependents }
})

// Transform function to convert checkbox values and add computed fields before submission
const transformData = (data) => ({
    ...data,
    is_first_use: data.is_first_use === 'on' || data.is_first_use === true,
    has_spouse: data.has_spouse === 'on' || data.has_spouse === true,
    annual_income: parseFloat(data.annual_income) || 0,
    monthly_debts: parseFloat(data.monthly_debts) || 0,
    down_payment: parseFloat(data.down_payment) || 0,
    interest_rate: parseFloat(data.interest_rate) || 0,
    loan_term_years: parseInt(data.loan_term_years) || 30,
    disability_rating: parseInt(data.disability_rating) || 0,
    children_count: parseInt(data.children_count) || 0,
    disability_dependents: (data.has_spouse === 'on' || data.has_spouse === true ? 1 : 0) + (parseInt(data.children_count) || 0),
})

// Calculate recommended purchase price based on 30% of income (Dave Ramsey)
const recommendedPurchasePrice = () => {
    if (!props.results) return null

    const monthlyIncome = (display.annual_income / 12) + (props.results.disability_income || 0)
    const maxHousingPayment = monthlyIncome * 0.30

    if (maxHousingPayment <= 0) return 0

    const propertyTaxRate = 0.011
    const insuranceRate = 0.004
    const monthlyTaxInsuranceRate = (propertyTaxRate + insuranceRate) / 12

    const monthlyRate = (display.interest_rate / 100) / 12
    const numPayments = display.loan_term_years * 12

    let paymentFactor
    if (monthlyRate === 0) {
        paymentFactor = 1 / numPayments
    } else {
        paymentFactor = (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1)
    }

    const downPayment = display.down_payment
    const recommendedPrice = (maxHousingPayment + downPayment * paymentFactor) /
                             (paymentFactor + monthlyTaxInsuranceRate)

    return Math.max(0, Math.round(recommendedPrice))
}
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
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">VA Loan Affordability Calculator</h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-300">
                        Calculate your maximum home purchase price based on your income, debts, and VA loan benefits.
                    </p>
                </div>

                <!-- Intro Content for SEO -->
                <div class="prose prose-blue mb-8 max-w-none no-print dark:prose-invert">
                    <p class="text-gray-700 dark:text-gray-300">
                        Understanding how much home you can afford is the first step in your VA home buying journey. This VA loan affordability calculator helps veterans, active-duty service members, and eligible surviving spouses determine their maximum purchase price based on the unique benefits of VA home loans.
                    </p>
                    <p class="text-gray-700 dark:text-gray-300">
                        Unlike conventional mortgages, VA loans offer significant advantages including no down payment requirement, no private mortgage insurance (PMI), and competitive interest rates. Our calculator takes these benefits into account, along with your VA disability rating if applicable, to provide an accurate estimate of what you can afford.
                    </p>
                    <p class="text-gray-700 dark:text-gray-300">
                        Simply enter your annual income, monthly debt payments, and other details below. The calculator uses the VA's standard 41% debt-to-income ratio and also shows a recommended purchase price based on the 30% income rule for comfortable monthly payments.
                    </p>
                </div>

                <div class="grid gap-8 lg:grid-cols-2">
                    <!-- Input Form -->
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Your Information</h2>

                        <!-- Print-only summary of inputs -->
                        <div class="print-show mb-6 hidden space-y-2 text-sm">
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Annual Gross Income:</span>
                                <span class="font-medium">{{ formatCurrency(display.annual_income) }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Monthly Debt Payments:</span>
                                <span class="font-medium">{{ formatCurrency(display.monthly_debts) }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Down Payment:</span>
                                <span class="font-medium">{{ formatCurrency(display.down_payment) }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Interest Rate:</span>
                                <span class="font-medium">{{ display.interest_rate }}%</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Loan Term:</span>
                                <span class="font-medium">{{ display.loan_term_years }} years</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">First-time VA Loan Use:</span>
                                <span class="font-medium">{{ display.is_first_use ? 'Yes' : 'No' }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">VA Disability Rating:</span>
                                <span class="font-medium">{{ display.disability_rating }}%</span>
                            </div>
                            <div v-if="display.disability_rating >= 30" class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Spouse:</span>
                                <span class="font-medium">{{ display.has_spouse ? 'Yes' : 'No' }}</span>
                            </div>
                            <div v-if="display.disability_rating >= 30" class="flex justify-between border-b pb-1">
                                <span class="text-gray-600">Children:</span>
                                <span class="font-medium">{{ display.children_count }}</span>
                            </div>
                        </div>

                        <Form
                            ref="formRef"
                            action="/calculators/affordability/calculate"
                            method="post"
                            :transform="transformData"
                            :options="{ preserveState: true, preserveScroll: true, preserveUrl: true }"
                            class="no-print space-y-6"
                            @input="onInput"
                            @start="onFormStart"
                            @finish="onFormFinish"
                            @error="onFormError"
                        >
                            <!-- Annual Income -->
                            <div>
                                <label for="annual_income" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Annual Gross Income
                                </label>
                                <div class="relative mt-1">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true">$</span>
                                    <input
                                        id="annual_income"
                                        type="number"
                                        name="annual_income"
                                        :value="display.annual_income"
                                        class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            <!-- Monthly Debts -->
                            <div>
                                <Tooltip content="Your total monthly debt payments affect your Debt-to-Income (DTI) ratio. VA loans typically allow up to 41% DTI, though some lenders may approve higher.">
                                    <label for="monthly_debts" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Monthly Debt Payments
                                    </label>
                                </Tooltip>
                                <p id="monthly_debts_desc" class="text-xs text-gray-600 dark:text-gray-300">Car loans, credit cards, student loans, etc.</p>
                                <div class="relative mt-1">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true">$</span>
                                    <input
                                        id="monthly_debts"
                                        type="number"
                                        name="monthly_debts"
                                        :value="display.monthly_debts"
                                        aria-describedby="monthly_debts_desc"
                                        class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            <!-- Down Payment -->
                            <div>
                                <label for="down_payment" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Down Payment
                                </label>
                                <div class="relative mt-1">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300" aria-hidden="true">$</span>
                                    <input
                                        id="down_payment"
                                        type="number"
                                        name="down_payment"
                                        :value="display.down_payment"
                                        class="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            <!-- Interest Rate -->
                            <div>
                                <label for="interest_rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Interest Rate
                                </label>
                                <div class="relative mt-1">
                                    <input
                                        id="interest_rate"
                                        type="number"
                                        name="interest_rate"
                                        :value="display.interest_rate"
                                        step="0.125"
                                        class="block w-full rounded-md border-gray-300 pr-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 dark:text-gray-300" aria-hidden="true">%</span>
                                </div>
                            </div>

                            <!-- Loan Term -->
                            <div>
                                <label for="loan_term_years" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Loan Term
                                </label>
                                <select
                                    id="loan_term_years"
                                    name="loan_term_years"
                                    :value="display.loan_term_years"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="15">15 years</option>
                                    <option value="20">20 years</option>
                                    <option value="25">25 years</option>
                                    <option value="30">30 years</option>
                                </select>
                            </div>

                            <!-- VA-specific options -->
                            <div class="space-y-4 border-t pt-4 dark:border-gray-700">
                                <h3 class="font-medium text-gray-900 dark:text-white">VA Benefits</h3>

                                <div class="flex items-center">
                                    <input
                                        id="first_use"
                                        type="checkbox"
                                        name="is_first_use"
                                        :checked="display.is_first_use"
                                        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <Tooltip content="First-time VA loan users pay a lower funding fee (2.15% vs 3.3% for subsequent use with no down payment). Your entitlement is restored when you pay off a previous VA loan.">
                                        <label for="first_use" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                            First-time VA loan use
                                        </label>
                                    </Tooltip>
                                </div>

                                <!-- Disability Rating -->
                                <div>
                                    <Tooltip content="Veterans with a 10%+ disability rating are exempt from the VA funding fee. Ratings of 30%+ also receive additional monthly compensation for dependents.">
                                        <label for="disability_rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            VA Disability Rating: {{ display.disability_rating }}%
                                        </label>
                                    </Tooltip>
                                    <input
                                        id="disability_rating"
                                        type="range"
                                        name="disability_rating"
                                        :value="display.disability_rating"
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

                                <!-- Dependents (only show if rating >= 30%) -->
                                <div v-if="display.disability_rating >= 30" class="space-y-3">
                                    <div class="flex items-center">
                                        <input
                                            id="has_spouse"
                                            type="checkbox"
                                            name="has_spouse"
                                            :checked="display.has_spouse"
                                            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <label for="has_spouse" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                            Spouse
                                        </label>
                                    </div>

                                    <div>
                                        <label for="children_count" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Number of Children
                                        </label>
                                        <input
                                            id="children_count"
                                            type="number"
                                            name="children_count"
                                            :value="display.children_count"
                                            min="0"
                                            max="10"
                                            class="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>

                    <!-- Results -->
                    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Your Results</h2>

                        <div v-if="loading" class="flex items-center justify-center py-12" role="status" aria-label="Calculating results">
                            <div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" aria-hidden="true"></div>
                            <span class="sr-only">Calculating...</span>
                        </div>

                        <div v-else-if="error" class="rounded-md bg-red-50 p-4">
                            <p class="text-sm text-red-700">{{ error }}</p>
                        </div>

                        <div v-else-if="props.results" class="space-y-6">
                            <!-- Purchase Price Cards -->
                            <div class="grid gap-4 sm:grid-cols-2">
                                <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
                                    <p class="text-sm font-medium text-blue-700 dark:text-blue-300">Maximum</p>
                                    <p class="text-2xl font-bold text-blue-900 dark:text-white sm:text-3xl">
                                        <AnimatedNumber :value="props.results.max_purchase_price" :format="formatCurrency" />
                                    </p>
                                    <p class="mt-1 text-xs text-blue-600 dark:text-blue-400">Based on 41% DTI</p>
                                </div>

                                <div class="rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/30">
                                    <Tooltip content="Based on Dave Ramsey's recommendation to keep your housing payment at no more than 30% of your gross monthly income.">
                                        <span class="text-sm font-medium text-green-700 dark:text-green-300">Recommended</span>
                                    </Tooltip>
                                    <p class="text-2xl font-bold text-green-900 dark:text-white sm:text-3xl">
                                        <AnimatedNumber :value="recommendedPurchasePrice()" :format="formatCurrency" />
                                    </p>
                                    <p class="mt-1 text-xs text-green-800 dark:text-green-200">Based on 30% of income</p>
                                </div>
                            </div>

                            <!-- Monthly Payment Breakdown -->
                            <div>
                                <h3 class="mb-3 font-medium text-gray-900 dark:text-white">Monthly Payment Breakdown</h3>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-300">Principal & Interest</span>
                                        <span class="font-medium dark:text-white">{{ formatCurrency(props.results.monthly_principal_interest) }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-300">Property Taxes (est.)</span>
                                        <span class="font-medium dark:text-white">{{ formatCurrency(props.results.monthly_taxes) }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-300">Home Insurance (est.)</span>
                                        <span class="font-medium dark:text-white">{{ formatCurrency(props.results.monthly_insurance) }}</span>
                                    </div>
                                    <div class="flex justify-between border-t pt-2 dark:border-gray-700">
                                        <span class="font-semibold text-gray-900 dark:text-white">Total Monthly Payment</span>
                                        <span class="font-bold text-blue-600 dark:text-blue-400">
                                            <AnimatedNumber :value="props.results.monthly_payment" :format="formatCurrency" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Disability Income -->
                            <div v-if="props.results.disability_income > 0" class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30">
                                <h3 class="mb-2 font-medium text-purple-800 dark:text-purple-300">VA Disability Income</h3>
                                <p class="text-2xl font-bold text-purple-900 dark:text-white">
                                    {{ formatCurrency(props.results.disability_income) }}/mo
                                </p>
                                <p class="mt-1 text-sm text-purple-600 dark:text-purple-400">
                                    Tax-free income added to your qualification
                                </p>
                            </div>

                            <!-- VA Benefits -->
                            <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/30">
                                <h3 class="mb-2 font-medium text-green-800 dark:text-green-300">VA Loan Benefits</h3>
                                <ul class="space-y-1 text-sm text-green-700 dark:text-green-400">
                                    <li v-if="props.results.no_pmi">No Private Mortgage Insurance (PMI)</li>
                                    <li>
                                        VA Funding Fee: {{ formatCurrency(props.results.funding_fee) }}
                                        <span v-if="props.results.funding_fee_exempt" class="font-medium">(Exempt - 10%+ disability)</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Additional Details -->
                            <div class="text-sm text-gray-600 dark:text-gray-300">
                                <p>Loan Amount: {{ formatCurrency(props.results.max_loan_amount) }} (after {{ formatCurrency(display.down_payment) }} down)</p>
                                <Tooltip content="DTI measures your total monthly debts divided by gross monthly income. VA loans typically allow up to 41% DTI.">
                                    <p>Debt-to-Income Ratio: {{ props.results.dti_ratio }}%</p>
                                </Tooltip>
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
                                    <a href="/register" class="font-medium text-blue-700 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
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
            type="affordability"
            :inputs="saveInputs"
            :results="props.results"
            placeholder="e.g., Dream Home Scenario"
            @close="closeSaveModal"
        />
    </AppLayout>
</template>
