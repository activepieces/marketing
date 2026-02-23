/**
 * Flow Definitions for Data-Driven Flow Builder
 * 
 * Each flow is defined as a JSON structure with nodes.
 * Node types: 'trigger', 'action', 'loop', 'condition'
 * 
 * For loops:
 * - The loop node has a `children` array with IDs of child nodes
 * - Child nodes have a `parent` property referencing the loop ID
 * 
 * For conditions/branches:
 * - The condition node has `leftBranch` and `rightBranch` arrays
 * - Child nodes have `branch` (condition ID) and `branchSide` ('left' or 'right')
 */

export const flows = {
  // Lead Enrichment Flow - compact version for demo
  'lead-enrichment': {
    id: 'lead-enrichment',
    name: 'Lead Enrichment',
    nodes: [
      {
        id: 'trigger',
        step: 1,
        type: 'trigger',
        label: 'New Submission',
        app: 'Typeform',
        icon: 'typeform'
      },
      {
        id: 'config',
        step: 2,
        type: 'action',
        label: 'Configuration',
        app: 'Data Mapper',
        icon: 'data-mapper'
      },
      {
        id: 'loop1',
        step: 3,
        type: 'loop',
        label: 'Loop on Items',
        app: 'Loop',
        icon: 'loop',
        children: ['match', 'enrich', 'update']
      },
      {
        id: 'match',
        step: 4,
        type: 'action',
        label: 'Match Person',
        app: 'Apollo',
        icon: 'apollo',
        parent: 'loop1'
      },
      {
        id: 'enrich',
        step: 5,
        type: 'action',
        label: 'Enrich Data',
        app: 'Apollo',
        icon: 'apollo',
        parent: 'loop1'
      },
      {
        id: 'update',
        step: 6,
        type: 'action',
        label: 'Update Sheet',
        app: 'Google Sheets',
        icon: 'google-sheets',
        parent: 'loop1'
      },
      {
        id: 'notify',
        step: 7,
        type: 'action',
        label: 'Send to Slack',
        app: 'Slack',
        icon: 'slack'
      }
    ]
  },

  // Monthly Report Flow - Schedule-based automation
  'monthly-report': {
    id: 'monthly-report',
    name: 'Monthly Report',
    nodes: [
      {
        id: 'trigger',
        step: 1,
        type: 'trigger',
        label: 'Every Month',
        app: 'Schedule',
        icon: 'schedule'
      },
      {
        id: 'fetch-data',
        step: 2,
        type: 'action',
        label: 'Get Analytics',
        app: 'Google Analytics',
        icon: 'google-analytics'
      },
      {
        id: 'loop1',
        step: 3,
        type: 'loop',
        label: 'Loop on Departments',
        app: 'Loop on Items',
        icon: 'loop',
        children: ['filter', 'calculate', 'format']
      },
      {
        id: 'filter',
        step: 4,
        type: 'action',
        label: 'Filter Data',
        app: 'Code',
        icon: 'code',
        parent: 'loop1'
      },
      {
        id: 'calculate',
        step: 5,
        type: 'action',
        label: 'Calculate Metrics',
        app: 'Code',
        icon: 'code',
        parent: 'loop1'
      },
      {
        id: 'format',
        step: 6,
        type: 'action',
        label: 'Update Sheet',
        app: 'Google Sheets',
        icon: 'google-sheets',
        parent: 'loop1'
      },
      {
        id: 'generate',
        step: 7,
        type: 'action',
        label: 'Generate Report',
        app: 'Google Docs',
        icon: 'google-docs'
      },
      {
        id: 'send',
        step: 8,
        type: 'action',
        label: 'Send Report',
        app: 'Gmail',
        icon: 'gmail'
      }
    ]
  },

  // Lead Routing Flow - with condition/branch and loop in branch
  'lead-routing': {
    id: 'lead-routing',
    name: 'Lead Routing',
    nodes: [
      {
        id: 'trigger',
        step: 1,
        type: 'trigger',
        label: 'New Lead',
        app: 'HubSpot',
        icon: 'hubspot'
      },
      {
        id: 'enrich',
        step: 2,
        type: 'action',
        label: 'Enrich Lead',
        app: 'Apollo',
        icon: 'apollo'
      },
      {
        id: 'condition1',
        step: 3,
        type: 'condition',
        label: 'Is Enterprise?',
        app: 'Condition',
        icon: 'condition',
        leftBranch: ['assign-sales', 'create-deal'],
        rightBranch: ['nurture-loop']
      },
      // Left branch (Enterprise = Yes)
      {
        id: 'assign-sales',
        step: 4,
        type: 'action',
        label: 'Assign to Sales',
        app: 'HubSpot',
        icon: 'hubspot',
        branch: 'condition1',
        branchSide: 'left'
      },
      {
        id: 'create-deal',
        step: 5,
        type: 'action',
        label: 'Create Deal',
        app: 'HubSpot',
        icon: 'hubspot',
        branch: 'condition1',
        branchSide: 'left'
      },
      // Right branch (Enterprise = No) - has a loop inside!
      {
        id: 'nurture-loop',
        step: 4,
        type: 'loop',
        label: 'Nurture Sequence',
        app: 'Loop on Items',
        icon: 'loop',
        branch: 'condition1',
        branchSide: 'right',
        children: ['send-email', 'wait-day', 'check-open']
      },
      // Children of the loop (inside right branch)
      {
        id: 'send-email',
        step: 5,
        type: 'action',
        label: 'Send Email',
        app: 'Gmail',
        icon: 'gmail',
        parent: 'nurture-loop'
      },
      {
        id: 'wait-day',
        step: 6,
        type: 'action',
        label: 'Wait 1 Day',
        app: 'Schedule',
        icon: 'schedule',
        parent: 'nurture-loop'
      },
      {
        id: 'check-open',
        step: 7,
        type: 'action',
        label: 'Check Opens',
        app: 'Gmail',
        icon: 'gmail',
        parent: 'nurture-loop'
      },
      // After merge
      {
        id: 'notify',
        step: 8,
        type: 'action',
        label: 'Notify Team',
        app: 'Slack',
        icon: 'slack'
      }
    ]
  },

  // Support Ticket Flow - Customer service automation
  'support-ticket': {
    id: 'support-ticket',
    name: 'Support Ticket Handler',
    nodes: [
      {
        id: 'trigger',
        step: 1,
        type: 'trigger',
        label: 'New Ticket',
        app: 'Zendesk',
        icon: 'zendesk'
      },
      {
        id: 'analyze',
        step: 2,
        type: 'action',
        label: 'Analyze Sentiment',
        app: 'OpenAI',
        icon: 'openai'
      },
      {
        id: 'categorize',
        step: 3,
        type: 'action',
        label: 'Categorize Issue',
        app: 'OpenAI',
        icon: 'openai'
      },
      {
        id: 'lookup',
        step: 4,
        type: 'action',
        label: 'Find Customer',
        app: 'HubSpot',
        icon: 'hubspot'
      },
      {
        id: 'loop1',
        step: 5,
        type: 'loop',
        label: 'Loop on Attachments',
        app: 'Loop on Items',
        icon: 'loop',
        children: ['download', 'scan']
      },
      {
        id: 'download',
        step: 6,
        type: 'action',
        label: 'Download File',
        app: 'HTTP',
        icon: 'http',
        parent: 'loop1'
      },
      {
        id: 'scan',
        step: 7,
        type: 'action',
        label: 'Scan Document',
        app: 'OpenAI',
        icon: 'openai',
        parent: 'loop1'
      },
      {
        id: 'respond',
        step: 8,
        type: 'action',
        label: 'Draft Response',
        app: 'OpenAI',
        icon: 'openai'
      },
      {
        id: 'update',
        step: 9,
        type: 'action',
        label: 'Update Ticket',
        app: 'Zendesk',
        icon: 'zendesk'
      }
    ]
  },

  // Advanced AI Lead Pipeline - demonstrates Agent within a larger business workflow
  // Shortest path to condition: Trigger → HTTP → Agent → Condition
  // Additional features in branches: Loop, Code, Date Helper
  'ai-lead-pipeline': {
    id: 'ai-lead-pipeline',
    name: 'AI Lead Processing Pipeline',
    nodes: [
      // 1. Trigger: New lead arrives
      {
        id: 'trigger',
        step: 1,
        type: 'trigger',
        label: 'New Lead',
        app: 'HubSpot',
        icon: 'hubspot'
      },
      // 2. HTTP Request: Enrich via external API
      {
        id: 'http-enrich',
        step: 2,
        type: 'action',
        label: 'Enrich via API',
        app: 'HTTP Request',
        icon: 'http'
      },
      // 3. AI Agent: Research & qualify
      {
        id: 'ai-agent',
        step: 3,
        type: 'action',
        label: 'Research Lead',
        app: 'AI Agent',
        icon: 'agent'
      },
      // 4. Branch: Route based on qualification
      {
        id: 'check-qualified',
        step: 4,
        type: 'condition',
        label: 'Qualified?',
        app: 'Condition',
        icon: 'condition',
        leftBranch: ['add-crm'],
        rightBranch: ['nurture-loop']
      },
      // Left branch: Qualified → Add to CRM
      {
        id: 'add-crm',
        step: 5,
        type: 'action',
        label: 'Add to CRM',
        app: 'Salesforce',
        icon: 'salesforce',
        branch: 'check-qualified',
        branchSide: 'left'
      },
      // Right branch: Not qualified → Nurture loop with utilities
      {
        id: 'nurture-loop',
        step: 5,
        type: 'loop',
        label: 'Nurture Steps',
        app: 'Loop',
        icon: 'loop',
        branch: 'check-qualified',
        branchSide: 'right',
        children: ['calc-score', 'date-calc', 'send-drip']
      },
      {
        id: 'calc-score',
        step: 6,
        type: 'action',
        label: 'Score Lead',
        app: 'Code',
        icon: 'code',
        parent: 'nurture-loop'
      },
      {
        id: 'date-calc',
        step: 7,
        type: 'action',
        label: 'Set Follow-up',
        app: 'Date Helper',
        icon: 'date-helper',
        parent: 'nurture-loop'
      },
      {
        id: 'send-drip',
        step: 8,
        type: 'action',
        label: 'Send Email',
        app: 'Gmail',
        icon: 'gmail',
        parent: 'nurture-loop'
      },
      // After merge: Notify team
      {
        id: 'notify',
        step: 9,
        type: 'action',
        label: 'Notify Team',
        app: 'Slack',
        icon: 'slack'
      }
    ]
  },

  // Placeholder flow for branding preview - shows flow structure without real app icons
  'branding-placeholder': {
    id: 'branding-placeholder',
    name: 'Branding Preview',
    nodes: [
      // 1. Trigger
      {
        id: 'trigger',
        step: 1,
        type: 'trigger',
        label: 'New Event',
        app: 'Trigger',
        icon: 'placeholder'
      },
      // 2. Action
      {
        id: 'action-1',
        step: 2,
        type: 'action',
        label: 'Process Data',
        app: 'Action',
        icon: 'placeholder'
      },
      // 3. Condition/Branch
      {
        id: 'check-condition',
        step: 3,
        type: 'condition',
        label: 'Check',
        app: 'Condition',
        icon: 'condition',
        leftBranch: ['left-action'],
        rightBranch: ['right-loop']
      },
      // Left branch: Simple action
      {
        id: 'left-action',
        step: 4,
        type: 'action',
        label: 'Path A',
        app: 'Action',
        icon: 'placeholder',
        branch: 'check-condition',
        branchSide: 'left'
      },
      // Right branch: Loop
      {
        id: 'right-loop',
        step: 4,
        type: 'loop',
        label: 'Repeat',
        app: 'Loop',
        icon: 'loop',
        branch: 'check-condition',
        branchSide: 'right',
        children: ['loop-child-1', 'loop-child-2']
      },
      // Loop children
      {
        id: 'loop-child-1',
        step: 5,
        type: 'action',
        label: 'Step A',
        app: 'Action',
        icon: 'placeholder',
        parent: 'right-loop'
      },
      {
        id: 'loop-child-2',
        step: 6,
        type: 'action',
        label: 'Step B',
        app: 'Action',
        icon: 'placeholder',
        parent: 'right-loop'
      },
      // After merge
      {
        id: 'final-action',
        step: 7,
        type: 'action',
        label: 'Complete',
        app: 'Action',
        icon: 'placeholder'
      }
    ]
  }
}

// Icon mapping to CDN URLs or built-in SVG types
export const iconMap = {
  // Apps with CDN logos
  'gmail': 'https://cdn.activepieces.com/pieces/gmail.png',
  'google-sheets': 'https://cdn.activepieces.com/pieces/google-sheets.png',
  'google-docs': 'https://cdn.activepieces.com/pieces/google-docs.png',
  'google-analytics': 'https://cdn.activepieces.com/pieces/google-analytics.png',
  'slack': 'https://cdn.activepieces.com/pieces/slack.png',
  'typeform': 'https://cdn.activepieces.com/pieces/typeform.png',
  'apollo': 'https://cdn.activepieces.com/pieces/apollo.png',
  'segment': 'https://cdn.activepieces.com/pieces/segment.png',
  'zendesk': 'https://cdn.activepieces.com/pieces/zendesk.png',
  'hubspot': 'https://cdn.activepieces.com/pieces/hubspot.png',
  'salesforce': 'https://cdn.activepieces.com/pieces/salesforce.png',
  'openai': 'https://cdn.activepieces.com/pieces/openai.png',
  'http': 'https://cdn.activepieces.com/pieces/http.png',
  'mailchimp': 'https://cdn.activepieces.com/pieces/mailchimp.png',
  
  // Built-in icons (will use SVG)
  'schedule': 'builtin:schedule',
  'loop': 'builtin:loop',
  'code': 'builtin:code',
  'data-mapper': 'builtin:data-mapper',
  'condition': 'builtin:condition',
  'date-helper': 'builtin:date-helper',
  'agent': 'builtin:agent',
  
  // Placeholder icon (renders as gray box)
  'placeholder': 'builtin:placeholder'
}

// Color schemes for different node types
export const nodeColors = {
  trigger: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconBg: 'bg-green-100',
    accent: '#22c55e'
  },
  action: {
    bg: 'bg-white',
    border: 'border-gray-100',
    iconBg: 'bg-gray-50',
    accent: '#6b7280'
  },
  loop: {
    bg: 'bg-white',
    border: 'border-pink-200',
    iconBg: 'bg-pink-50',
    accent: '#ec4899'
  },
  condition: {
    bg: 'bg-white',
    border: 'border-amber-200',
    iconBg: 'bg-amber-50',
    accent: '#f59e0b'
  }
}

export default flows

