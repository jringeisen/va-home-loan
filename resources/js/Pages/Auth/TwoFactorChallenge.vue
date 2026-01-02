<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import GuestLayout from '@/Components/Layout/GuestLayout.vue'

const recovery = ref(false)

const form = useForm({
    code: '',
    recovery_code: '',
})

const submit = () => {
    form.post('/two-factor-challenge')
}

const toggleRecovery = () => {
    recovery.value = !recovery.value
    form.code = ''
    form.recovery_code = ''
}
</script>

<template>
    <GuestLayout>
        <Head title="Two-Factor Authentication" />

        <div class="flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
                    Two-Factor Authentication
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    <template v-if="!recovery">
                        Enter the authentication code from your authenticator app.
                    </template>
                    <template v-else>
                        Enter one of your emergency recovery codes.
                    </template>
                </p>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <form @submit.prevent="submit" class="space-y-6">
                        <div v-if="!recovery">
                            <label for="code" class="block text-sm font-medium text-gray-700">
                                Authentication Code
                            </label>
                            <div class="mt-1">
                                <input
                                    id="code"
                                    v-model="form.code"
                                    type="text"
                                    inputmode="numeric"
                                    autocomplete="one-time-code"
                                    required
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <p v-if="form.errors.code" class="mt-2 text-sm text-red-600">
                                {{ form.errors.code }}
                            </p>
                        </div>

                        <div v-else>
                            <label for="recovery_code" class="block text-sm font-medium text-gray-700">
                                Recovery Code
                            </label>
                            <div class="mt-1">
                                <input
                                    id="recovery_code"
                                    v-model="form.recovery_code"
                                    type="text"
                                    autocomplete="one-time-code"
                                    required
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <p v-if="form.errors.recovery_code" class="mt-2 text-sm text-red-600">
                                {{ form.errors.recovery_code }}
                            </p>
                        </div>

                        <div class="flex items-center justify-between">
                            <button
                                type="button"
                                class="text-sm font-medium text-blue-600 hover:text-blue-500"
                                @click="toggleRecovery"
                            >
                                <template v-if="!recovery">
                                    Use a recovery code
                                </template>
                                <template v-else>
                                    Use authentication code
                                </template>
                            </button>
                        </div>

                        <div>
                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                <span v-if="form.processing">Verifying...</span>
                                <span v-else>Verify</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
