<script setup>
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import GuestLayout from '@/Components/Layout/GuestLayout.vue'
import SeoHead from '@/Components/Seo/SeoHead.vue'
import FaqSection from '@/Components/Seo/FaqSection.vue'

// Get shared SEO data
const page = usePage()
const appUrl = computed(() => page.props.seo?.appUrl || '')

// SEO Data
const seoTitle = 'VA Loan Calculator | Free VA Home Loan Tools for Veterans'
const seoDescription = 'Free VA loan calculators for veterans and military families. Calculate home affordability, disability compensation, and compare cost of living by state.'
const canonical = computed(() => appUrl.value || '/')

// FAQ Data for SEO
const faqQuestions = [
    {
        question: 'What is a VA loan and who is eligible?',
        answer: 'A VA loan is a mortgage loan program backed by the U.S. Department of Veterans Affairs. Eligible recipients include veterans, active-duty service members, National Guard and Reserve members with qualifying service, and surviving spouses of veterans who died in service or from a service-connected disability. VA loans offer benefits like no down payment, no PMI, and competitive interest rates.',
    },
    {
        question: 'How much can I borrow with a VA loan?',
        answer: 'VA loans no longer have loan limits for borrowers with full entitlement. If you have remaining entitlement from a previous VA loan, limits may apply based on county loan limits. Our affordability calculator helps you determine how much you can borrow based on your income, debts, and VA benefits.',
    },
    {
        question: 'What are the benefits of a VA loan vs conventional mortgage?',
        answer: 'VA loans offer several advantages: no down payment required (vs 3-20% for conventional), no private mortgage insurance (PMI), competitive interest rates often lower than conventional, more flexible credit requirements, and no prepayment penalties. These benefits can save veterans thousands of dollars over the life of the loan.',
    },
    {
        question: 'Do I have to pay the VA funding fee?',
        answer: 'Most VA loan borrowers pay a one-time funding fee that ranges from 1.25% to 3.3% of the loan amount. However, veterans with a service-connected disability rating of 10% or higher are exempt from the funding fee. Surviving spouses receiving DIC benefits are also exempt.',
    },
    {
        question: 'Can I use a VA loan to buy any type of property?',
        answer: 'VA loans can be used for primary residences including single-family homes, condos (in VA-approved complexes), multi-unit properties (up to 4 units if you live in one), and manufactured homes. VA loans cannot be used for investment properties, vacation homes, or commercial real estate.',
    },
]
</script>

<template>
    <GuestLayout>
        <SeoHead
            :title="seoTitle"
            :description="seoDescription"
            :canonical="canonical"
            :faq-schema="faqQuestions"
        />

        <!-- Hero Section -->
        <div class="bg-blue-600 dark:bg-blue-800">
            <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div class="text-center">
                    <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        VA Home Loan Calculator
                    </h1>
                    <p class="mx-auto mt-6 max-w-2xl text-xl text-white/90">
                        Free tools to help veterans make informed decisions about home purchases, relocations, and financial planning using VA benefits.
                    </p>
                    <div class="mt-10 flex justify-center gap-4">
                        <Link
                            href="/calculators/affordability"
                            class="rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                        >
                            Calculate Affordability
                        </Link>
                        <Link
                            href="/register"
                            class="rounded-md bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="bg-white py-16 dark:bg-gray-800 sm:py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Financial Planning Tools for Veterans
                    </h2>
                    <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Make confident financial decisions with our specialized calculators.
                    </p>
                </div>

                <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <!-- Affordability Calculator -->
                    <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </div>
                        <h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                            VA Loan Affordability
                        </h3>
                        <p class="mt-2 text-gray-600 dark:text-gray-300">
                            Calculate your maximum home purchase price based on income, debts, and VA loan benefits including no PMI.
                        </p>
                        <Link
                            href="/calculators/affordability"
                            class="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Calculate now
                            <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>

                    <!-- Cost of Living Calculator -->
                    <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                        </div>
                        <h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                            Cost of Living Comparison
                        </h3>
                        <p class="mt-2 text-gray-600 dark:text-gray-300">
                            Compare cost of living between states. Perfect for PCS moves or retirement planning.
                        </p>
                        <Link
                            href="/calculators/cost-of-living"
                            class="mt-4 inline-flex items-center text-sm font-medium text-green-700 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                        >
                            Compare states
                            <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>

                    <!-- Disability Calculator -->
                    <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                            Disability Rating Impact
                        </h3>
                        <p class="mt-2 text-gray-600 dark:text-gray-300">
                            Calculate monthly compensation, tax benefits, and state-specific property tax exemptions.
                        </p>
                        <Link
                            href="/calculators/disability"
                            class="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                        >
                            Calculate benefits
                            <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Why Use Our Calculators Section -->
        <div class="bg-gray-50 py-16 dark:bg-gray-900">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Why Use Our VA Loan Calculators?
                    </h2>
                </div>
                <div class="prose prose-blue mx-auto mt-8 max-w-3xl dark:prose-invert">
                    <p class="text-gray-700 dark:text-gray-300">
                        VA loans are one of the most valuable benefits available to veterans, but understanding how they work can be complex. Our calculators are designed specifically for the unique aspects of VA loans, taking into account factors that generic mortgage calculators miss.
                    </p>
                    <p class="text-gray-700 dark:text-gray-300">
                        Unlike conventional mortgage calculators, our VA loan affordability calculator factors in your VA disability income, calculates the VA funding fee (and exemptions), and shows you the savings from not paying PMI. This gives you a more accurate picture of what you can truly afford.
                    </p>
                    <p class="text-gray-700 dark:text-gray-300">
                        We also help veterans with broader financial planning. Our disability calculator shows your compensation with current rates and state-specific tax benefits, while our cost of living calculator helps you plan PCS moves or retirement relocations by comparing living costs and BAH rates between states.
                    </p>
                    <p class="text-gray-700 dark:text-gray-300">
                        All calculations are performed using the latest official VA rates and data sources, ensuring accuracy for your financial planning needs.
                    </p>
                </div>
            </div>
        </div>

        <!-- FAQ Section -->
        <div class="bg-white py-16 dark:bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FaqSection :questions="faqQuestions" title="Common Questions About VA Loans" />
            </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-gray-50 py-16 dark:bg-gray-900">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="rounded-2xl bg-blue-600 px-8 py-12 text-center dark:bg-blue-700 sm:px-12">
                    <h2 class="text-2xl font-bold text-white sm:text-3xl">
                        Support a Veteran-Owned Project
                    </h2>
                    <p class="mx-auto mt-4 max-w-xl text-lg text-white/90">
                        These calculators are free forever. If they've helped you, consider supporting us with a one-time contribution to unlock saved calculations and help keep this project running.
                    </p>
                    <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/register"
                            class="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                        >
                            Create Account
                        </Link>
                        <Link
                            href="/support"
                            class="inline-flex items-center rounded-md border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
                        >
                            Support Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
