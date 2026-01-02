<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
    value: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        default: 500,
    },
    format: {
        type: Function,
        default: (val) => val.toLocaleString(),
    },
})

const displayValue = ref(props.value)
const isMounted = ref(false)
let animationFrame = null

// Check if we're in a browser environment
const isBrowser = () => typeof window !== 'undefined'

// Check for reduced motion preference (SSR-safe)
const prefersReducedMotion = () => {
    if (!isBrowser()) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const animateValue = (start, end, duration) => {
    // Skip animation during SSR or if user prefers reduced motion
    if (!isBrowser() || prefersReducedMotion()) {
        displayValue.value = end
        return
    }

    const startTime = performance.now()
    const diff = end - start

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)

        displayValue.value = start + diff * easeOut

        if (progress < 1) {
            animationFrame = requestAnimationFrame(animate)
        } else {
            displayValue.value = end
        }
    }

    if (animationFrame) {
        cancelAnimationFrame(animationFrame)
    }

    animationFrame = requestAnimationFrame(animate)
}

watch(() => props.value, (newValue, oldValue) => {
    // Only animate after component is mounted (client-side)
    if (!isMounted.value) {
        displayValue.value = newValue
        return
    }
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
        animateValue(oldValue, newValue, props.duration)
    } else {
        displayValue.value = newValue
    }
})

onMounted(() => {
    isMounted.value = true
    displayValue.value = props.value
})
</script>

<template>
    <span class="tabular-nums">{{ format(displayValue) }}</span>
</template>
