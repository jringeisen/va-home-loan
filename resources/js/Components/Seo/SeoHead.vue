<script setup>
import { Head } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    canonical: {
        type: String,
        default: null,
    },
    faqSchema: {
        type: Array,
        default: null,
    },
    breadcrumbSchema: {
        type: Array,
        default: null,
    },
})

// Build FAQ JSON-LD schema
const faqJsonLd = computed(() => {
    if (!props.faqSchema || props.faqSchema.length === 0) return null

    const mainEntity = props.faqSchema.map((q) => ({
        '@type': 'Question',
        'name': q.question,
        'acceptedAnswer': {
            '@type': 'Answer',
            'text': q.answer,
        },
    }))

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': mainEntity,
    })
})

// Build Breadcrumb JSON-LD schema
const breadcrumbJsonLd = computed(() => {
    if (!props.breadcrumbSchema || props.breadcrumbSchema.length === 0) return null

    const itemListElement = props.breadcrumbSchema.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url,
    }))

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': itemListElement,
    })
})
</script>

<template>
    <Head :title="title">
        <meta name="description" :content="description" />
        <meta property="og:title" :content="title" />
        <meta property="og:description" :content="description" />
        <link v-if="canonical" rel="canonical" :href="canonical" />
        <meta v-if="canonical" property="og:url" :content="canonical" />
        <component v-if="faqJsonLd" :is="'script'" type="application/ld+json" v-html="faqJsonLd" />
        <component v-if="breadcrumbJsonLd" :is="'script'" type="application/ld+json" v-html="breadcrumbJsonLd" />
    </Head>
</template>
