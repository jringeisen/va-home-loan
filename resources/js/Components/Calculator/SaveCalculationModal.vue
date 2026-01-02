<script setup>
import { ref, computed } from 'vue'
import { Form, usePage } from '@inertiajs/vue3'

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
        validator: (value) => ['affordability', 'cost_of_living', 'disability'].includes(value),
    },
    inputs: {
        type: Object,
        required: true,
    },
    results: {
        type: Object,
        required: true,
    },
    placeholder: {
        type: String,
        default: 'e.g., My Calculation',
    },
})

const emit = defineEmits(['close'])

const page = usePage()
const flash = computed(() => page.props.flash)

const saveFormRef = ref()
const saveName = ref('')
const saving = ref(false)
const saveSuccess = ref(false)
const saveError = ref(null)

// Transform function for save form
const transformSaveData = () => ({
    type: props.type,
    name: saveName.value || null,
    inputs: props.inputs,
    results: props.results,
})

const onSaveStart = () => {
    saving.value = true
}

const onSaveFinish = () => {
    saving.value = false
    // Set local state from flash message
    if (flash.value?.success) {
        saveSuccess.value = true
        setTimeout(() => {
            emit('close')
            // Reset state after close
            setTimeout(() => {
                saveSuccess.value = false
                saveName.value = ''
            }, 300)
        }, 1500)
    } else if (flash.value?.error) {
        saveError.value = flash.value.error
    }
}

const handleClose = () => {
    saveError.value = null
    saveSuccess.value = false
    saveName.value = ''
    emit('close')
}

// Reset state when modal opens
const resetState = () => {
    saveName.value = ''
    saveSuccess.value = false
    saveError.value = null
}

// Watch for show prop changes to reset state
defineExpose({ resetState })
</script>

<template>
    <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @keydown.escape="handleClose"
    >
        <div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h3 id="modal-title" class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Save Calculation</h3>

            <div v-if="saveSuccess" class="rounded-md bg-green-50 p-4 dark:bg-green-900/30">
                <p class="text-sm font-medium text-green-700 dark:text-green-300">Calculation saved successfully!</p>
            </div>

            <div v-else>
                <div v-if="saveError" class="mb-4 rounded-md bg-red-50 p-3 dark:bg-red-900/30">
                    <p class="text-sm text-red-700 dark:text-red-300">
                        {{ saveError }}
                        <a
                            v-if="saveError.includes('Support')"
                            href="/support"
                            class="ml-1 font-medium underline hover:text-red-800 dark:hover:text-red-200"
                        >
                            Support Us
                        </a>
                    </p>
                </div>

                <Form
                    ref="saveFormRef"
                    action="/calculations"
                    method="post"
                    :transform="transformSaveData"
                    :options="{ preserveScroll: true }"
                    @start="onSaveStart"
                    @finish="onSaveFinish"
                >
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name (optional)</label>
                        <input
                            v-model="saveName"
                            type="text"
                            :placeholder="placeholder"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div class="flex gap-3">
                        <button
                            type="button"
                            @click="handleClose"
                            class="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            :disabled="saving"
                            class="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {{ saving ? 'Saving...' : 'Save' }}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
