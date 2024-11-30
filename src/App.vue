<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter">
    <Navigation />
    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
    <ToastContainer />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '@/layout/Navigation.vue';
import Footer from '@/layout/Footer.vue';
import ToastContainer from '@/components/toast/ToastContainer.vue';
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>