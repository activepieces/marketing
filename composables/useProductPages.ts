export const useProductPages = () => {
  const productPages = [
    { name: 'AI Adoption Stack', path: '/product/ai-adoption' },
    { name: 'AI Agents', path: '/product/ai-agent-builder' },
    { name: 'Control & Governance', path: '/product/governance-and-management' },
    { name: 'Deployment & Cost', path: '/product/deployment-options' },
  ];

  return { productPages };
};
