export const useProductPages = () => {
  const productPages = [
    { id: 'ai-adoption', name: 'AI Adoption Stack', path: '/product/ai-adoption', heroImage: '/images/sections-heros/ai-adoption.png' },
    { id: 'ai-agents', name: 'AI Agents', path: '/product/ai-agent-builder', heroImage: '/images/sections-heros/ai-agents.png' },
    { id: 'governance', name: 'Control & Governance', path: '/product/governance-and-management', heroImage: '/images/sections-heros/control-and-governance.png' },
    { id: 'deployment', name: 'Deployment & Cost', path: '/product/deployment-options', heroImage: '/images/sections-heros/deployment-and-cost.png' },
  ];

  return { productPages };
};
