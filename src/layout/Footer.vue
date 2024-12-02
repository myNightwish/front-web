<template>
  <footer class="fixed border-t bg-white/80 dark:bg-gray-900/80 bottom-0 left-0 w-full z-0">
    <!-- <div class="container mx-auto px-4 py-8"> -->
      <!-- <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4"> -->
        <!-- <div>
          <h3 class="mb-4 text-lg font-semibold">About FamilyList</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Simplify your family shopping with our collaborative shopping list manager.
          </p>
        </div> -->
        <!-- <div>
          <h3 class="mb-4 text-lg font-semibold">Features</h3>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li>Shared Shopping Lists</li>
            <li>Real-time Smart Notifications</li>
          </ul>
        </div> -->
        <!-- <div>
          <h3 class="mb-4 text-lg font-semibold">Support</h3>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div> -->
        <!-- <div>
          <h3 class="mb-4 text-lg font-semibold">Connect</h3>
          <div class="flex space-x-4 text-gray-500 dark:text-gray-400">
            <a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400">
              <Github class="h-5 w-5" />
            </a>
            <a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400">
              <Twitter class="h-5 w-5" />
            </a>
          </div>
        </div> -->
      <!-- </div> -->
     
    <!-- </div> -->
    <div class="mb-4 border-t pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {{ new Date().getFullYear() }} FamilyList. All rights reserved.
      </div>
  </footer>
</template>

<script setup>
import { Github, Twitter } from 'lucide-vue-next';
</script>