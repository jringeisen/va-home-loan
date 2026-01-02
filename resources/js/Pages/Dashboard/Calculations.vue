<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import AppLayout from '@/Components/Layout/AppLayout.vue'

const props = defineProps({
    calculations: Object,
})

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    })
}

const getCalculatorLabel = (type) => {
    const labels = {
        affordability: 'VA Loan Affordability',
        cost_of_living: 'Cost of Living',
        disability: 'Disability Impact',
    }
    return labels[type] || type
}

const getViewUrl = (calc) => {
    const inputs = calc.inputs || {}
    const params = new URLSearchParams()

    if (calc.type === 'affordability') {
        if (inputs.annual_income) params.set('income', inputs.annual_income)
        if (inputs.monthly_debts) params.set('debts', inputs.monthly_debts)
        if (inputs.down_payment) params.set('down', inputs.down_payment)
        if (inputs.interest_rate) params.set('rate', inputs.interest_rate)
        if (inputs.loan_term_years) params.set('term', inputs.loan_term_years)
        if (inputs.is_first_use === false) params.set('first', 'false')
        if (inputs.disability_rating) params.set('rating', inputs.disability_rating)
        if (inputs.has_spouse) params.set('spouse', 'true')
        if (inputs.children_count) params.set('children', inputs.children_count)
        return `/calculators/affordability?${params.toString()}`
    } else if (calc.type === 'cost_of_living') {
        if (inputs.from_state) params.set('from', inputs.from_state)
        if (inputs.to_state) params.set('to', inputs.to_state)
        if (inputs.current_salary) params.set('salary', inputs.current_salary)
        if (inputs.is_military) params.set('military', 'true')
        if (inputs.zip_code) params.set('zip', inputs.zip_code)
        if (inputs.pay_grade) params.set('grade', inputs.pay_grade)
        if (inputs.has_dependents) params.set('dependents', 'true')
        return `/calculators/cost-of-living?${params.toString()}`
    } else if (calc.type === 'disability') {
        if (inputs.disability_rating) params.set('rating', inputs.disability_rating)
        if (inputs.has_spouse) params.set('spouse', 'true')
        if (inputs.children_count) params.set('children', inputs.children_count)
        if (inputs.dependent_parents) params.set('parents', inputs.dependent_parents)
        if (inputs.state) params.set('state', inputs.state)
        if (inputs.home_value) params.set('home', inputs.home_value)
        return `/calculators/disability?${params.toString()}`
    }

    return '#'
}

const deleteCalculation = (id) => {
    if (confirm('Are you sure you want to delete this calculation?')) {
        router.delete(`/calculations/${id}`)
    }
}
</script>

<template>
    <AppLayout>
        <Head title="Saved Calculations" />

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Saved Calculations</h1>
                    <Link href="/dashboard" class="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                        Back to Dashboard
                    </Link>
                </div>

                <div class="mt-8 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <table v-if="calculations.data.length > 0" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                    Name
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                    Type
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                    Date
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                            <tr v-for="calc in calculations.data" :key="calc.id">
                                <td class="whitespace-nowrap px-6 py-4">
                                    <div class="font-medium text-gray-900 dark:text-white">
                                        {{ calc.name || 'Untitled' }}
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <span class="rounded-full px-3 py-1 text-xs font-medium" :class="{
                                        'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300': calc.type === 'affordability',
                                        'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300': calc.type === 'cost_of_living',
                                        'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300': calc.type === 'disability',
                                    }">
                                        {{ getCalculatorLabel(calc.type) }}
                                    </span>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                    {{ formatDate(calc.created_at) }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4 text-right text-sm">
                                    <Link
                                        :href="getViewUrl(calc)"
                                        class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        View
                                    </Link>
                                    <button
                                        @click="deleteCalculation(calc.id)"
                                        class="ml-4 font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="px-6 py-12 text-center">
                        <p class="text-gray-600 dark:text-gray-300">No calculations saved yet.</p>
                    </div>
                </div>

                <!-- Pagination -->
                <div v-if="calculations.last_page > 1" class="mt-6 flex justify-center">
                    <nav class="flex items-center space-x-2">
                        <Link
                            v-for="link in calculations.links"
                            :key="link.label"
                            :href="link.url || '#'"
                            :class="[
                                'rounded px-3 py-2 text-sm',
                                link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                                !link.url && 'cursor-not-allowed opacity-50'
                            ]"
                            v-html="link.label"
                        />
                    </nav>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
