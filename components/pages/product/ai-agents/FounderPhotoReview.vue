<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/80 overflow-auto p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6 sticky top-0 bg-black/90 backdrop-blur py-4 -mt-4 -mx-4 px-4 z-10">
        <div>
          <h2 class="text-2xl font-bold text-white">Review Founder Photos ({{ Object.keys(foundersWithPhotos).length }})</h2>
          <p class="text-gray-400 text-sm mt-1">Click on bad photos to add them to the list</p>
        </div>
        <button @click="close" class="text-white hover:text-gray-300 text-3xl">&times;</button>
      </div>
      
      <!-- Selected count -->
      <div class="mb-6 p-4 bg-gray-900 rounded-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-white font-medium">Bad photos selected: {{ selectedBad.length }}</span>
          <button 
            v-if="selectedBad.length > 0"
            @click="copyToClipboard"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
          >
            {{ copied ? '✓ Copied!' : 'Copy List' }}
          </button>
        </div>
        <textarea 
          v-model="outputText"
          readonly
          class="w-full h-24 bg-gray-800 text-gray-300 text-xs p-3 rounded font-mono resize-none"
          placeholder="Click on bad photos above, then copy this list..."
        ></textarea>
      </div>
      
      <!-- Photo Grid -->
      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        <div 
          v-for="(data, pieceName) in foundersWithPhotos" 
          :key="pieceName"
          @click="toggleSelection(pieceName)"
          class="relative cursor-pointer group"
          :class="selectedBad.includes(pieceName) ? 'ring-4 ring-red-500 rounded-xl' : ''"
        >
          <!-- Photo -->
          <div class="w-full aspect-square rounded-xl overflow-hidden bg-gray-800">
            <img 
              :src="data.founder.photo" 
              :alt="data.founder.name"
              class="w-full h-full object-cover"
              :class="selectedBad.includes(pieceName) ? 'opacity-40' : 'group-hover:scale-105 transition-transform'"
            />
          </div>
          
          <!-- Selected overlay -->
          <div 
            v-if="selectedBad.includes(pieceName)" 
            class="absolute inset-0 flex items-center justify-center"
          >
            <span class="text-3xl">❌</span>
          </div>
          
          <!-- Name tooltip -->
          <div class="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-[10px] p-1 text-center truncate rounded-b-xl">
            {{ pieceName }}
          </div>
          
          <!-- Founder name on hover -->
          <div class="absolute top-0 left-0 right-0 bg-black/80 text-white text-[10px] p-1 text-center truncate rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity">
            {{ data.founder.name }}
          </div>
        </div>
      </div>
      
      <!-- Instructions -->
      <div class="mt-8 p-4 bg-gray-900/50 rounded-lg text-gray-400 text-sm">
        <p><strong>Instructions:</strong></p>
        <ol class="list-decimal list-inside mt-2 space-y-1">
          <li>Scroll through all photos</li>
          <li>Click on any that look bad (wrong person, low quality, etc.)</li>
          <li>Clicked photos will show ❌ and turn red</li>
          <li>Click "Copy List" button to copy all bad photo names</li>
          <li>Paste the list in chat so I can fix them</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isOpen = ref(false)
const foundersData = ref({})
const selectedBad = ref([])
const copied = ref(false)

const foundersWithPhotos = computed(() => {
  const result = {}
  for (const [key, value] of Object.entries(foundersData.value)) {
    if (value.founder?.photo) {
      result[key] = value
    }
  }
  return result
})

const outputText = computed(() => {
  if (selectedBad.value.length === 0) return ''
  return selectedBad.value.join(', ')
})

const open = async () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  
  // Fetch founders data
  try {
    const res = await fetch('/data/pieces-founders.json')
    foundersData.value = await res.json()
  } catch (e) {
    console.error('Failed to load founders data')
  }
}

const close = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

const toggleSelection = (pieceName) => {
  const idx = selectedBad.value.indexOf(pieceName)
  if (idx >= 0) {
    selectedBad.value.splice(idx, 1)
  } else {
    selectedBad.value.push(pieceName)
  }
  copied.value = false
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (e) {
    console.error('Failed to copy')
  }
}

defineExpose({ open })
</script>

