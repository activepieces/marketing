<template>
  <div 
    ref="containerRef"
    class="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden select-none outline-none"
    style="height: 460px;"
    tabindex="0"
    @keydown="handleKeydown"
    @click="handleContainerClick"
  >
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30"></div>
    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100/40 to-teal-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    
    <!-- Main content -->
    <div class="relative h-full flex flex-col">
      <!-- Header bar -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 text-sm">{{ tableName }}</h3>
            <p class="text-xs text-gray-400">{{ rows.length }} records</p>
          </div>
        </div>
        <button 
          @click.stop="openAgentModal"
          class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-lg transition-all shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span class="text-sm">✨</span>
          Run agent on data
        </button>
      </div>

      <!-- Table container -->
      <div class="flex-1 overflow-auto" ref="tableContainer">
        <table class="w-full border-collapse text-sm">
          <!-- Column headers -->
          <thead class="sticky top-0 z-20">
            <tr class="bg-gray-50/95 backdrop-blur-sm">
              <!-- Row number header -->
              <th class="w-10 px-2 py-2 text-left text-[10px] font-medium text-gray-400 uppercase tracking-wider border-b border-r border-gray-200 bg-gray-50">
                #
              </th>
              <!-- Column headers -->
              <th 
                v-for="(col, colIdx) in columns" 
                :key="col.id"
                class="min-w-[130px] px-3 py-2 text-left border-b border-r border-gray-200 bg-gray-50/95 backdrop-blur-sm group relative cursor-pointer hover:bg-gray-100 transition-colors"
                @click.stop="openColumnMenu(colIdx, $event)"
              >
                <div class="flex items-center gap-2">
                  <span class="text-sm opacity-60">{{ getTypeIcon(col.type) }}</span>
                  <span class="font-medium text-gray-600 text-xs">{{ col.name }}</span>
                  <svg class="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </th>
              <!-- Add column button -->
              <th 
                class="w-10 px-2 py-2 border-b border-gray-200 bg-gray-50/95 backdrop-blur-sm cursor-pointer hover:bg-emerald-50 transition-colors group"
                @click.stop="addColumn"
              >
                <div class="flex items-center justify-center w-5 h-5 rounded bg-gray-200/80 group-hover:bg-emerald-500 transition-colors mx-auto">
                  <svg class="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          
          <!-- Table body -->
          <tbody>
            <tr 
              v-for="(row, rowIdx) in rows" 
              :key="row.id"
              class="group/row"
              :class="{ 'bg-emerald-50/30': selectedRow === rowIdx }"
            >
              <!-- Row number with delete on hover -->
              <td class="px-2 py-0 text-[10px] font-medium text-gray-400 border-b border-r border-gray-100 bg-gray-50/30 text-center relative w-10">
                <span class="group-hover/row:opacity-0 transition-opacity">{{ rowIdx + 1 }}</span>
                <button 
                  @click.stop="deleteRow(rowIdx)"
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity text-red-400 hover:text-red-600 hover:bg-red-50"
                  title="Delete row"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </td>
              <!-- Data cells -->
              <td 
                v-for="(col, colIdx) in columns" 
                :key="col.id"
                class="border-b border-r border-gray-100 relative p-0 cursor-cell transition-colors duration-75"
                :class="getCellClass(rowIdx, colIdx)"
                @click.stop="handleCellClick(rowIdx, colIdx, col)"
                @dblclick.stop="startEditing(rowIdx, colIdx)"
              >
                <!-- Editing state -->
                <template v-if="isEditing(rowIdx, colIdx)">
                  <!-- Text/Email/URL/Number input -->
                  <input
                    v-if="col.type === 'text' || col.type === 'email' || col.type === 'url' || col.type === 'number'"
                    :ref="el => setEditRef(el, 'text')"
                    :type="col.type === 'number' ? 'number' : 'text'"
                    :value="rows[rowIdx][col.id]"
                    @input="updateCellValue(rowIdx, col.id, $event.target.value)"
                    @blur="handleBlur"
                    @keydown="handleInputKeydown"
                    class="w-full px-2 py-1.5 text-sm bg-white border-none outline-none min-h-[32px]"
                    :placeholder="getPlaceholder(col.type)"
                  />
                  <!-- Date input -->
                  <input
                    v-else-if="col.type === 'date'"
                    :ref="el => setEditRef(el, 'date')"
                    type="date"
                    :value="rows[rowIdx][col.id]"
                    @input="updateCellValue(rowIdx, col.id, $event.target.value)"
                    @blur="handleDateBlur"
                    @keydown="handleInputKeydown"
                    @click="handleDateClick"
                    class="w-full px-2 py-1.5 text-sm bg-white border-none outline-none min-h-[32px] cursor-pointer"
                  />
                  <!-- Select dropdown -->
                  <select
                    v-else-if="col.type === 'select'"
                    :ref="el => setEditRef(el, 'select')"
                    :value="rows[rowIdx][col.id]"
                    @change="handleSelectChange(rowIdx, col.id, $event.target.value)"
                    @blur="handleBlur"
                    @keydown="handleSelectKeydown"
                    class="w-full px-2 py-1.5 text-sm bg-white border-none outline-none cursor-pointer min-h-[32px]"
                  >
                    <option value="">Select...</option>
                    <option v-for="opt in col.options" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                </template>
                
                <!-- Display state -->
                <template v-else>
                  <!-- Checkbox type -->
                  <div 
                    v-if="col.type === 'checkbox'" 
                    class="flex items-center justify-center min-h-[32px] px-2"
                    @click.stop="toggleCheckbox(rowIdx, col.id)"
                  >
                    <div 
                      class="w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer"
                      :class="row[col.id] ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-400'"
                    >
                      <svg v-if="row[col.id]" class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Select type (pill display) -->
                  <div v-else-if="col.type === 'select'" class="px-2 py-1.5 min-h-[32px] flex items-center">
                    <span 
                      v-if="row[col.id]"
                      class="inline-flex px-2 py-0.5 text-[11px] font-medium rounded-full"
                      :class="getSelectPillClass(row[col.id])"
                    >
                      {{ row[col.id] }}
                    </span>
                    <span v-else class="text-gray-300 text-xs">—</span>
                  </div>
                  
                  <!-- Other types -->
                  <div v-else class="px-2 py-1.5 text-sm text-gray-700 truncate min-h-[32px] flex items-center">
                    <span v-if="row[col.id]">{{ formatCellValue(row[col.id], col.type) }}</span>
                    <span v-else class="text-gray-300">—</span>
                  </div>
                </template>
              </td>
              <!-- Empty cell for add column -->
              <td class="border-b border-gray-100 w-10"></td>
            </tr>
            
            <!-- Add row button -->
            <tr>
              <td 
                :colspan="columns.length + 2" 
                class="px-3 py-2 cursor-pointer hover:bg-emerald-50/50 transition-colors group/add border-b border-transparent"
                @click.stop="addRow"
              >
                <div class="flex items-center gap-2 text-gray-400 group-hover/add:text-emerald-600 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span class="text-xs font-medium">New row</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Column menu dropdown -->
      <Transition name="dropdown">
        <div 
          v-if="columnMenuOpen !== null"
          class="fixed bg-white rounded-xl shadow-2xl border border-gray-200 py-1 z-50 min-w-[160px]"
          :style="{ top: columnMenuPos.y + 'px', left: columnMenuPos.x + 'px' }"
          @click.stop
        >
          <!-- Rename input -->
          <div class="px-2 py-1.5 border-b border-gray-100">
            <input
              ref="renameInput"
              v-model="columns[columnMenuOpen].name"
              class="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              @keydown.enter="closeColumnMenu"
              @keydown.escape="closeColumnMenu"
            />
          </div>
          
          <!-- Type selector -->
          <div class="px-1 py-1 border-b border-gray-100 max-h-[180px] overflow-y-auto">
            <button
              v-for="type in columnTypes"
              :key="type.id"
              class="w-full flex items-center gap-2 px-2 py-1 text-xs rounded transition-colors text-left"
              :class="columns[columnMenuOpen]?.type === type.id ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'"
              @click="changeColumnType(columnMenuOpen, type.id)"
            >
              <span class="text-sm">{{ type.icon }}</span>
              <span>{{ type.name }}</span>
            </button>
          </div>
          
          <!-- Delete button -->
          <div class="px-1 pt-1">
            <button
              class="w-full flex items-center gap-2 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
              @click="deleteColumn(columnMenuOpen)"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </Transition>

      <!-- Agent Modal with Prompt Input -->
      <Transition name="modal">
        <div 
          v-if="showAgentModal"
          class="absolute inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeAgentModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          
          <!-- Modal content -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <!-- Header -->
            <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">✨</span>
                <h3 class="font-semibold text-gray-900 text-sm">What should the agent do?</h3>
              </div>
              <button @click="closeAgentModal" class="text-gray-400 hover:text-gray-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <!-- Prompt input -->
            <div class="p-4">
              <textarea
                ref="promptInput"
                v-model="agentPrompt"
                placeholder="Describe what you want the agent to do with each row..."
                class="w-full h-24 px-3 py-2 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder:text-gray-400"
                @keydown.meta.enter="runAgent"
                @keydown.ctrl.enter="runAgent"
              ></textarea>
              
              <!-- Quick prompts -->
              <div class="mt-3">
                <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">Try these:</p>
                <div class="flex flex-wrap gap-1.5">
                  <button
                    v-for="suggestion in promptSuggestions"
                    :key="suggestion.id"
                    @click="setPrompt(suggestion.prompt)"
                    class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-gray-100 hover:bg-violet-100 text-gray-600 hover:text-violet-700 rounded-lg transition-colors"
                  >
                    <span>{{ suggestion.icon }}</span>
                    <span>{{ suggestion.label }}</span>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Run button -->
            <div class="px-4 pb-4">
              <button
                @click="runAgent"
                :disabled="!agentPrompt.trim()"
                class="w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                :class="agentPrompt.trim() 
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-md shadow-violet-200' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Run on {{ rows.length }} rows
              </button>
              <p class="text-[10px] text-gray-400 text-center mt-2">⌘ + Enter to run</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Agent Running Animation -->
      <Transition name="running">
        <div 
          v-if="agentRunning"
          class="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
        >
          <div class="text-center max-w-xs px-4">
            <div class="relative w-16 h-16 mx-auto mb-4">
              <div class="absolute inset-0 rounded-full border-4 border-violet-200"></div>
              <div class="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
              <span class="absolute inset-0 flex items-center justify-center text-2xl">🤖</span>
            </div>
            <p class="font-semibold text-gray-900 mb-1">Processing...</p>
            <p class="text-xs text-gray-500 line-clamp-2">{{ agentPrompt }}</p>
          </div>
        </div>
      </Transition>

      <!-- Agent Complete Toast -->
      <Transition name="toast">
        <div 
          v-if="showComplete"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-emerald-500 text-white rounded-xl shadow-lg"
        >
          <span class="text-xl">✅</span>
          <div>
            <p class="font-semibold text-sm">Done!</p>
            <p class="text-xs text-emerald-100">{{ rows.length }} rows processed</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
const tableName = ref('Lead Tracker')
const tableContainer = ref(null)
const renameInput = ref(null)
const promptInput = ref(null)

// Store refs for different input types
const editRefs = ref({
  text: null,
  date: null,
  select: null
})

// Track if date picker is active to prevent premature blur
let datePickerActive = false
let blurTimeout = null

// Column types
const columnTypes = [
  { id: 'text', name: 'Text', icon: '📝' },
  { id: 'number', name: 'Number', icon: '🔢' },
  { id: 'date', name: 'Date', icon: '📅' },
  { id: 'checkbox', name: 'Checkbox', icon: '☑️' },
  { id: 'select', name: 'Select', icon: '🏷️' },
  { id: 'email', name: 'Email', icon: '📧' },
  { id: 'url', name: 'URL', icon: '🔗' },
]

// Prompt suggestions (prefills)
const promptSuggestions = [
  { id: 'enrich', icon: '🔍', label: 'Enrich leads', prompt: 'Research each company and add their industry, employee count, and recent funding information.' },
  { id: 'score', icon: '⭐', label: 'Score prospects', prompt: 'Rate each lead from 1-10 based on their company size, industry fit, and engagement signals.' },
  { id: 'email', icon: '✉️', label: 'Draft emails', prompt: 'Write a personalized follow-up email for each contact based on their company and our last interaction.' },
  { id: 'categorize', icon: '🏷️', label: 'Auto-tag', prompt: 'Categorize each lead into segments: Enterprise, Mid-Market, or SMB based on company characteristics.' },
]

// Initial columns
const columns = ref([
  { id: 'company', name: 'Company', type: 'text' },
  { id: 'contact', name: 'Contact', type: 'text' },
  { id: 'email', name: 'Email', type: 'email' },
  { id: 'status', name: 'Status', type: 'select', options: ['New', 'Contacted', 'Qualified', 'Won', 'Lost'] },
  { id: 'lastContact', name: 'Last Contact', type: 'date' },
])

// Initial rows
const rows = ref([
  { id: 1, company: 'Acme Corp', contact: 'John Smith', email: 'john@acme.com', status: 'Qualified', lastContact: '2025-01-14' },
  { id: 2, company: 'TechStart', contact: 'Sarah Chen', email: 'sarah@techstart.io', status: 'New', lastContact: '2025-01-15' },
  { id: 3, company: 'GlobalTech', contact: 'Mike Johnson', email: 'mike@globaltech.com', status: 'Contacted', lastContact: '2025-01-13' },
  { id: 4, company: 'Innovate Inc', contact: 'Emma Wilson', email: 'emma@innovate.co', status: 'Won', lastContact: '2025-01-10' },
])

// Selection state - separate from editing
const selectedCell = ref(null) // { row, col }
const selectedRow = ref(null)
const editingCell = ref(null) // { row, col }
const editingOriginalValue = ref(null) // Store original value for cancel

// Column menu
const columnMenuOpen = ref(null)
const columnMenuPos = ref({ x: 0, y: 0 })

// Agent state
const showAgentModal = ref(false)
const agentPrompt = ref('')
const agentRunning = ref(false)
const showComplete = ref(false)

let nextId = 5
let nextColId = 1

// Set ref for edit inputs
const setEditRef = (el, type) => {
  editRefs.value[type] = el
}

const getTypeIcon = (type) => {
  const found = columnTypes.find(t => t.id === type)
  return found ? found.icon : '📝'
}

const getPlaceholder = (type) => {
  const placeholders = {
    email: 'email@example.com',
    url: 'https://...',
    number: '0',
  }
  return placeholders[type] || ''
}

const getSelectPillClass = (value) => {
  const classes = {
    'New': 'bg-blue-100 text-blue-700',
    'Contacted': 'bg-amber-100 text-amber-700',
    'Qualified': 'bg-purple-100 text-purple-700',
    'Won': 'bg-emerald-100 text-emerald-700',
    'Lost': 'bg-gray-100 text-gray-500',
  }
  return classes[value] || 'bg-gray-100 text-gray-700'
}

const formatCellValue = (value, type) => {
  if (value === undefined || value === null || value === '') return ''
  if (type === 'date') {
    const date = new Date(value)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
  return value
}

const isSelected = (rowIdx, colIdx) => {
  return selectedCell.value?.row === rowIdx && selectedCell.value?.col === colIdx
}

const isEditing = (rowIdx, colIdx) => {
  return editingCell.value?.row === rowIdx && editingCell.value?.col === colIdx
}

const getCellClass = (rowIdx, colIdx) => {
  if (isEditing(rowIdx, colIdx)) {
    return 'ring-2 ring-emerald-500 ring-inset z-10 bg-white'
  }
  if (isSelected(rowIdx, colIdx)) {
    return 'ring-2 ring-emerald-400 ring-inset bg-emerald-50/50'
  }
  return 'hover:bg-gray-50/80'
}

// Update cell value directly (for controlled inputs)
const updateCellValue = (rowIdx, colId, value) => {
  rows.value[rowIdx][colId] = value
}

// Handle cell click - select or start editing
const handleCellClick = (rowIdx, colIdx, col) => {
  // If already editing this cell, do nothing
  if (isEditing(rowIdx, colIdx)) {
    return
  }
  
  // If editing a different cell, stop editing first
  if (editingCell.value) {
    confirmEdit()
  }
  
  selectedCell.value = { row: rowIdx, col: colIdx }
  selectedRow.value = rowIdx
  columnMenuOpen.value = null
  
  // Focus container for keyboard events
  containerRef.value?.focus()
}

// Click on cell = select (not edit)
const selectCell = (rowIdx, colIdx) => {
  // If clicking a different cell while editing, stop editing first
  if (editingCell.value) {
    confirmEdit()
  }
  
  selectedCell.value = { row: rowIdx, col: colIdx }
  selectedRow.value = rowIdx
  columnMenuOpen.value = null
  
  // Focus container for keyboard events
  containerRef.value?.focus()
}

// Double-click or Enter = start editing
const startEditing = async (rowIdx, colIdx) => {
  const col = columns.value[colIdx]
  
  // Checkbox doesn't need edit mode
  if (col.type === 'checkbox') {
    toggleCheckbox(rowIdx, col.id)
    return
  }
  
  selectedCell.value = { row: rowIdx, col: colIdx }
  selectedRow.value = rowIdx
  editingCell.value = { row: rowIdx, col: colIdx }
  editingOriginalValue.value = rows.value[rowIdx][col.id]
  
  await nextTick()
  focusInput(col.type)
}

const focusInput = (type) => {
  const inputType = type === 'email' || type === 'url' || type === 'number' ? 'text' : type
  const input = editRefs.value[inputType]
  if (input) {
    input.focus()
    if (input.select && inputType === 'text') {
      input.select()
    }
    // For date inputs, open the picker
    if (type === 'date') {
      try {
        input.showPicker?.()
      } catch (e) {
        // showPicker may not be supported in all browsers
      }
    }
  }
}

// Handle input keydown events
const handleInputKeydown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    confirmEdit()
  } else if (e.key === 'Tab') {
    e.preventDefault()
    handleEditTab(e.shiftKey)
  } else if (e.key === 'Escape') {
    e.preventDefault()
    cancelEdit()
  }
}

// Handle select keydown events
const handleSelectKeydown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    cancelEdit()
  } else if (e.key === 'Tab') {
    e.preventDefault()
    handleEditTab(e.shiftKey)
  }
  // Enter is handled by change event for select
}

// Handle select change
const handleSelectChange = (rowIdx, colId, value) => {
  rows.value[rowIdx][colId] = value
  confirmEdit()
}

// Handle blur for standard inputs
const handleBlur = () => {
  // Small delay to allow click events to fire first
  blurTimeout = setTimeout(() => {
    if (editingCell.value) {
      confirmEdit()
    }
  }, 100)
}

// Handle date input click - open picker
const handleDateClick = (e) => {
  datePickerActive = true
  try {
    e.target.showPicker?.()
  } catch (err) {
    // showPicker may not be supported
  }
}

// Handle date blur - need special handling for date picker
const handleDateBlur = () => {
  // Longer delay for date picker to allow selection
  blurTimeout = setTimeout(() => {
    datePickerActive = false
    if (editingCell.value) {
      confirmEdit()
    }
  }, 200)
}

// Enter while editing = confirm and stop editing (stay on same cell)
const confirmEdit = () => {
  if (blurTimeout) {
    clearTimeout(blurTimeout)
    blurTimeout = null
  }
  editingCell.value = null
  editingOriginalValue.value = null
  datePickerActive = false
  // Keep selection on same cell
  nextTick(() => {
    containerRef.value?.focus()
  })
}

// Escape = cancel edit and restore original value
const cancelEdit = () => {
  if (blurTimeout) {
    clearTimeout(blurTimeout)
    blurTimeout = null
  }
  if (editingCell.value && editingOriginalValue.value !== null) {
    const { row, col } = editingCell.value
    const colId = columns.value[col].id
    rows.value[row][colId] = editingOriginalValue.value
  }
  editingCell.value = null
  editingOriginalValue.value = null
  datePickerActive = false
  nextTick(() => {
    containerRef.value?.focus()
  })
}

// Tab while editing = confirm and move to next cell (also start editing)
const handleEditTab = (shiftKey) => {
  if (!editingCell.value) return
  const { row, col } = editingCell.value
  
  // Clear any pending blur
  if (blurTimeout) {
    clearTimeout(blurTimeout)
    blurTimeout = null
  }
  
  // Confirm current edit
  editingCell.value = null
  editingOriginalValue.value = null
  
  if (shiftKey) {
    // Move backwards
    if (col > 0) {
      startEditing(row, col - 1)
    } else if (row > 0) {
      startEditing(row - 1, columns.value.length - 1)
    }
  } else {
    // Move forwards
    if (col < columns.value.length - 1) {
      startEditing(row, col + 1)
    } else if (row < rows.value.length - 1) {
      startEditing(row + 1, 0)
    }
  }
}

const toggleCheckbox = (rowIdx, colId) => {
  rows.value[rowIdx][colId] = !rows.value[rowIdx][colId]
}

const clearSelection = () => {
  if (blurTimeout) {
    clearTimeout(blurTimeout)
    blurTimeout = null
  }
  editingCell.value = null
  editingOriginalValue.value = null
  selectedCell.value = null
  selectedRow.value = null
}

const handleContainerClick = (e) => {
  // If clicking on empty area of container
  if (e.target === containerRef.value || e.target === tableContainer.value) {
    clearSelection()
  }
}

// Keyboard navigation (only when not editing)
const handleKeydown = (e) => {
  // If editing, let the input handle keys (except what we explicitly handle)
  if (editingCell.value) {
    return
  }
  
  // Close column menu on any key
  if (columnMenuOpen.value !== null) {
    if (e.key === 'Escape') {
      columnMenuOpen.value = null
      e.preventDefault()
    }
    return
  }
  
  // If no selection, select first cell on navigation
  if (!selectedCell.value) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
      e.preventDefault()
      selectCell(0, 0)
    }
    return
  }
  
  const { row, col } = selectedCell.value
  
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      if (row > 0) selectCell(row - 1, col)
      break
    case 'ArrowDown':
      e.preventDefault()
      if (row < rows.value.length - 1) selectCell(row + 1, col)
      break
    case 'ArrowLeft':
      e.preventDefault()
      if (col > 0) selectCell(row, col - 1)
      break
    case 'ArrowRight':
      e.preventDefault()
      if (col < columns.value.length - 1) selectCell(row, col + 1)
      break
    case 'Enter':
      e.preventDefault()
      startEditing(row, col)
      break
    case 'Tab':
      e.preventDefault()
      if (e.shiftKey) {
        if (col > 0) selectCell(row, col - 1)
        else if (row > 0) selectCell(row - 1, columns.value.length - 1)
      } else {
        if (col < columns.value.length - 1) selectCell(row, col + 1)
        else if (row < rows.value.length - 1) selectCell(row + 1, 0)
      }
      break
    case 'Escape':
      e.preventDefault()
      clearSelection()
      break
    case 'Delete':
    case 'Backspace':
      e.preventDefault()
      rows.value[row][columns.value[col].id] = ''
      break
    case 'F2':
      // F2 also starts editing (like Excel)
      e.preventDefault()
      startEditing(row, col)
      break
    default:
      // Start typing = start editing and type
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const colType = columns.value[col].type
        if (colType !== 'checkbox' && colType !== 'select') {
          // Clear cell and start editing
          rows.value[row][columns.value[col].id] = ''
          startEditing(row, col)
        } else if (colType === 'select') {
          // For select, just start editing
          startEditing(row, col)
        }
      }
  }
}

const openColumnMenu = (colIdx, event) => {
  event.stopPropagation()
  columnMenuOpen.value = colIdx
  const rect = event.currentTarget.getBoundingClientRect()
  columnMenuPos.value = { 
    x: Math.min(rect.left, window.innerWidth - 180),
    y: rect.bottom + 4
  }
  nextTick(() => {
    renameInput.value?.focus()
    renameInput.value?.select()
  })
}

const closeColumnMenu = () => {
  columnMenuOpen.value = null
}

const changeColumnType = (colIdx, newType) => {
  columns.value[colIdx].type = newType
  if (newType === 'select' && !columns.value[colIdx].options) {
    columns.value[colIdx].options = ['Option 1', 'Option 2', 'Option 3']
  }
  closeColumnMenu()
}

const deleteColumn = (colIdx) => {
  if (columns.value.length <= 1) return
  const colId = columns.value[colIdx].id
  columns.value.splice(colIdx, 1)
  rows.value.forEach(row => delete row[colId])
  closeColumnMenu()
  clearSelection()
}

const addColumn = () => {
  const newColId = `col_${nextColId++}`
  columns.value.push({
    id: newColId,
    name: `Column ${columns.value.length + 1}`,
    type: 'text'
  })
  rows.value.forEach(row => {
    row[newColId] = ''
  })
}

const addRow = () => {
  const newRow = { id: nextId++ }
  columns.value.forEach(col => {
    if (col.type === 'checkbox') {
      newRow[col.id] = false
    } else {
      newRow[col.id] = ''
    }
  })
  rows.value.push(newRow)
  
  // Select first cell of new row
  nextTick(() => {
    selectCell(rows.value.length - 1, 0)
  })
}

const deleteRow = (rowIdx) => {
  if (rows.value.length <= 1) return
  rows.value.splice(rowIdx, 1)
  clearSelection()
}

// Agent functions
const openAgentModal = () => {
  showAgentModal.value = true
  agentPrompt.value = ''
  nextTick(() => {
    promptInput.value?.focus()
  })
}

const closeAgentModal = () => {
  showAgentModal.value = false
  agentPrompt.value = ''
}

const setPrompt = (prompt) => {
  agentPrompt.value = prompt
  promptInput.value?.focus()
}

const runAgent = () => {
  if (!agentPrompt.value.trim()) return
  
  showAgentModal.value = false
  agentRunning.value = true
  
  // Simulate processing
  setTimeout(() => {
    agentRunning.value = false
    showComplete.value = true
    
    // Hide complete toast
    setTimeout(() => {
      showComplete.value = false
      agentPrompt.value = ''
    }, 2500)
  }, 2000)
}

// Close menu when clicking outside
const handleClickOutside = (e) => {
  if (columnMenuOpen.value !== null && !e.target.closest('.column-menu')) {
    closeColumnMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Dropdown animation */
.dropdown-enter-active {
  animation: dropdown-in 0.15s ease-out;
}
.dropdown-leave-active {
  animation: dropdown-out 0.1s ease-in;
}

@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes dropdown-out {
  to { opacity: 0; transform: translateY(-4px); }
}

/* Modal animation */
.modal-enter-active {
  animation: modal-in 0.2s ease-out;
}
.modal-leave-active {
  animation: modal-out 0.15s ease-in;
}

@keyframes modal-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modal-out {
  to { opacity: 0; }
}

.modal-enter-active > div:last-child {
  animation: modal-content-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-leave-active > div:last-child {
  animation: modal-content-out 0.15s ease-in;
}

@keyframes modal-content-in {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes modal-content-out {
  to { opacity: 0; transform: scale(0.98); }
}

/* Running animation */
.running-enter-active {
  animation: fade-in 0.2s ease-out;
}
.running-leave-active {
  animation: fade-out 0.2s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  to { opacity: 0; }
}

/* Toast animation */
.toast-enter-active {
  animation: toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  animation: toast-out 0.2s ease-in;
}

@keyframes toast-in {
  from { opacity: 0; transform: translate(-50%, 16px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes toast-out {
  to { opacity: 0; transform: translate(-50%, 8px); }
}

/* Table styles */
table {
  border-spacing: 0;
}

th, td {
  white-space: nowrap;
}

/* Smooth cursor for cells */
.cursor-cell {
  cursor: cell;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* Input resets */
input, select, textarea {
  font-family: inherit;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
