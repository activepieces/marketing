export const usePiecesCount = () => {
  const { data: piecesCount, error, pending } = useFetch<{ count: number }>('/api/pieces-count', {
    default: () => ({ count: 0 })
  })

  return {
    piecesCount: computed(() => piecesCount.value?.count || 0),
    error,
    pending
  }
} 