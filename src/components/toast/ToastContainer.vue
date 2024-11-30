<template>
  <div class="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300"
      enter-from-class="translate-y-2 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
      class="space-y-2 pointer-events-auto"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="max-w-md w-full bg-white shadow-xl rounded-lg pointer-events-auto transform transition-all duration-300"
        :class="[
          toast.type === 'success' && 'bg-green-50 shadow-green-100',
          toast.type === 'error' && 'bg-red-50 shadow-red-100',
          toast.type === 'warning' && 'bg-yellow-50 shadow-yellow-100',
          toast.type === 'info' && 'bg-blue-50 shadow-blue-100'
        ]"
      >
        <div class="p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <component
                :is="toastIcon(toast.type)"
                class="h-6 w-6"
                :class="[
                  toast.type === 'success' && 'text-green-500',
                  toast.type === 'error' && 'text-red-500',
                  toast.type === 'warning' && 'text-yellow-500',
                  toast.type === 'info' && 'text-blue-500'
                ]"
              />
            </div>
            <div class="ml-3 flex-1">
              <p 
                class="text-sm font-medium"
                :class="[
                  toast.type === 'success' && 'text-green-800',
                  toast.type === 'error' && 'text-red-800',
                  toast.type === 'warning' && 'text-yellow-800',
                  toast.type === 'info' && 'text-blue-800'
                ]"
              >
                {{ toast.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { defineComponent, h } from 'vue';
import { useToast } from '@/composables/useToast';

const { toasts, removeToast } = useToast();

const toastIcon = (type) => ({
  success: defineComponent({
    render: () => h('svg', { 
      class: 'h-6 w-6',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M5 13l4 4L19 7'
      })
    ])
  }),
  error: defineComponent({
    render: () => h('svg', {
      class: 'h-6 w-6',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M6 18L18 6M6 6l12 12'
      })
    ])
  }),
  warning: defineComponent({
    render: () => h('svg', {
      class: 'h-6 w-6',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      })
    ])
  }),
  info: defineComponent({
    render: () => h('svg', {
      class: 'h-6 w-6',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  })
})[type];
</script>
