import { ref, reactive, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

/**
 * Shared composable for calculator pages.
 * Provides common state, event handlers, and utility functions.
 *
 * @param {Object} options
 * @param {Object} options.defaultValues - Default form values for the calculator
 * @param {Object} options.inputs - Initial inputs from props (from server)
 * @param {Function} options.updateUrl - Page-specific function to update URL params
 */
export function useCalculator({ defaultValues, inputs, updateUrl }) {
    const page = usePage()

    // Auth state
    const user = computed(() => page.props.auth?.user)
    const flash = computed(() => page.props.flash)

    // Form refs for programmatic submission
    const formRef = ref()
    const saveFormRef = ref()

    // Display state for UI elements (reactive form values)
    const display = reactive(inputs ?? { ...defaultValues })

    // Loading/error state for results section
    const loading = ref(false)
    const error = ref(null)

    // Save modal state
    const showSaveModal = ref(false)
    const saveName = ref('')
    const saving = ref(false)
    const saveSuccess = ref(false)
    const saveError = ref(null)

    // Link copy state
    const linkCopied = ref(false)

    // Form event handlers
    const onFormStart = () => {
        loading.value = true
        error.value = null
    }

    const onFormFinish = () => {
        loading.value = false
    }

    const onFormError = () => {
        error.value = 'An error occurred. Please try again.'
    }

    // Debounced input handler for auto-calculate
    let timeout = null
    const onInput = (event) => {
        const { name, value, type, checked } = event.target

        // Update display state for UI reactivity
        if (type === 'checkbox') {
            display[name] = checked
        } else if (type === 'number' || type === 'range') {
            display[name] = parseFloat(value) || 0
        } else {
            display[name] = value
        }

        // Debounced submit using Form component's programmatic submission
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            formRef.value?.submit()
            if (updateUrl) updateUrl()
        }, 500)
    }

    // Save modal handlers
    const openSaveModal = () => {
        saveName.value = ''
        saveSuccess.value = false
        saveError.value = null
        showSaveModal.value = true
    }

    const closeSaveModal = () => {
        showSaveModal.value = false
    }

    const onSaveStart = () => {
        saving.value = true
    }

    const onSaveFinish = () => {
        saving.value = false
        // Set local state from flash message
        if (flash.value?.success) {
            saveSuccess.value = true
            setTimeout(() => {
                showSaveModal.value = false
            }, 1500)
        } else if (flash.value?.error) {
            saveError.value = flash.value.error
        }
    }

    // Utility functions (SSR-safe)
    const printResults = () => {
        if (typeof window === 'undefined') return
        window.print()
    }

    const copyLink = async () => {
        if (typeof window === 'undefined') return

        if (updateUrl) updateUrl()
        try {
            await navigator.clipboard.writeText(window.location.href)
            linkCopied.value = true
            setTimeout(() => (linkCopied.value = false), 2000)
        } catch (e) {
            // Fallback for older browsers
            const input = document.createElement('input')
            input.value = window.location.href
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            linkCopied.value = true
            setTimeout(() => (linkCopied.value = false), 2000)
        }
    }

    // Formatters
    const formatCurrency = (value) => {
        if (value === null || value === undefined) return '-'
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(value)
    }

    const formatPercent = (value, decimals = 1) => {
        if (value === null || value === undefined) return '-'
        return `${value.toFixed(decimals)}%`
    }

    return {
        // Auth
        user,
        flash,

        // Form refs
        formRef,
        saveFormRef,

        // State
        display,
        loading,
        error,

        // Save modal state
        showSaveModal,
        saveName,
        saving,
        saveSuccess,
        saveError,

        // Link state
        linkCopied,

        // Form handlers
        onFormStart,
        onFormFinish,
        onFormError,
        onInput,

        // Save modal handlers
        openSaveModal,
        closeSaveModal,
        onSaveStart,
        onSaveFinish,

        // Utilities
        printResults,
        copyLink,
        formatCurrency,
        formatPercent,
    }
}
