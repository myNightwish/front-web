<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h2 class="text-2xl font-semibold">Profile</h2>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div class="space-y-6">
        <div class="flex items-center space-x-4">
          <div class="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 
                      flex items-center justify-center text-2xl">
            JD
          </div>
          <div>
            <h3 class="text-xl font-medium">John Doe</h3>
            <p class="text-gray-500 dark:text-gray-400">john.doe@example.com</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input type="text" value="John Doe" 
                   class="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input type="email" value="john.doe@example.com" 
                   class="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Notification Preferences</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" checked class="mr-2" />
                Email notifications
              </label>
              <label class="flex items-center">
                <input type="checkbox" checked class="mr-2" />
                Push notifications
              </label>
            </div>
          </div>
        </div>
        
        <button class="btn btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
</template>