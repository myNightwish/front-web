<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter">
    <Navigation />
    <main class="container mx-auto px-4 py-8"
      :class="mainBgClass">
      <router-view></router-view>
    </main>
    <Footer />
    <ToastContainer />
  </div>
</template>

<script setup>
import Navigation from '@/layout/Navigation.vue';
import Footer from '@/layout/Footer.vue';
import ToastContainer from '@/components/toast/ToastContainer.vue';
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
// 获取当前路由信息
const route = useRoute();
// 假设内容是从某处获取的，或者通过某个状态来判断
const content = ref(null); // 你可以根据你的业务逻辑设置内容

// 计算是否有内容
const hasContent = computed(() => {
  return content.value && content.value.length > 0;
});

// 判断是否是 404 页面
const is404 = computed(() => {
  return route.name === '404'; // 假设 404 页面路由的名字为 '404'
});

// 动态绑定背景类
const mainBgClass = computed(() => {
  if (!hasContent.value) {
    return 'bg-[url(/assets/main-bg.png)] bg-cover bg-center'; // 默认背景图
  } else if (is404.value) {
    return 'bg-[url(/assets/404-bg.jpg)] bg-cover bg-center'; // 404 页面背景图
  } else {
    return 'bg-purple-600'; // 有内容且不是404页面时的紫色背景
  }
});
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
.main-bg {
  background-image: url('@/assets/images/bg.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>