import { computed } from 'vue'
import { LAYOUT } from './useFlowLayout'

/**
 * SVG PATH GENERATION
 * ===================
 * 
 * KEY LEARNINGS:
 * 
 * 1. PATH COORDINATE SYSTEM
 *    - SVG paths use absolute coordinates matching node positions
 *    - M = move to, L = line to, Q = quadratic curve (control point, end point)
 *    - Curves need: start point → control point → end point
 * 
 * 2. LOOP VISUALIZATION
 *    - Entry: Down from loop node → curve RIGHT → horizontal → curve DOWN → to first child
 *    - Loop-back: Down from last child → curve LEFT → up → curve RIGHT → arrow to entry
 *    - For LEFT branches: Mirror everything (entry curves LEFT, loop-back curves RIGHT)
 *    - The isLeftBranch flag triggers this mirroring
 * 
 * 3. BRANCH VISUALIZATION
 *    - Entry lines MUST curve to exact branch center X positions
 *    - Exit lines MUST meet EXACTLY at centerX (the merge point)
 *    - Use precise path strings, not estimated positions
 * 
 * 4. CONNECTION SKIPPING
 *    - Skip drawing connections TO/FROM loops and conditions in main flow
 *    - They handle their own entry/exit paths
 *    - Same for loops inside branches - skip them in branch child connections
 * 
 * 5. ARROW MARKERS
 *    - Use SVG <marker> elements with orient="auto"
 *    - For left-pointing arrows, need separate marker with reversed path
 *    - arrowReversed flag tells renderer which marker to use
 */

/**
 * Generates all SVG paths for flow visualization
 */
export function useFlowPaths(flowDefinition, nodePositions, loopPathData, branchPathData, getLoopChildren, getBranchChildren) {
  
  /**
   * Generate all connection paths
   */
  const connections = computed(() => {
    const paths = []
    const nodes = flowDefinition.value?.nodes || []
    const positions = nodePositions.value
    
    if (!positions || Object.keys(positions).length === 0) return paths
    
    // Get main flow nodes (not inside loops or branches)
    const mainFlowNodes = nodes.filter(n => !n.parent && !n.branch)
    const mainFlowCenterX = LAYOUT.MAIN_X + (LAYOUT.CARD_WIDTH / 2)
    
    // Generate connections between main flow nodes
    mainFlowNodes.forEach((node, index) => {
      const pos = positions[node.id]
      if (!pos || index === 0) return
      
      const prevNode = mainFlowNodes[index - 1]
      const prevPos = positions[prevNode.id]
      if (!prevPos) return
      
      // Skip if previous was a loop or condition (they handle their own exit paths)
      if (prevNode.type === 'loop' || prevNode.type === 'condition') return
      
      // Regular straight connection
      const startY = prevPos.y + LAYOUT.NODE_HEIGHT
      const endY = pos.y
      
      paths.push({
        id: `conn-${prevNode.id}-to-${node.id}`,
        type: 'straight',
        d: `M ${mainFlowCenterX} ${startY} L ${mainFlowCenterX} ${endY}`,
        dashed: false
      })
    })
    
    // Generate connections inside loops (between children)
    const loopData = loopPathData.value || []
    loopData.forEach(data => {
      if (!data) return
      const children = getLoopChildren(data.loopId)
      
      children.forEach((child, index) => {
        const childPos = positions[child.id]
        if (!childPos || index === children.length - 1) return
        
        const nextChild = children[index + 1]
        const nextPos = positions[nextChild.id]
        if (!nextPos) return
        
        const childCenterX = childPos.x + (childPos.width / 2)
        
        paths.push({
          id: `conn-${child.id}-to-${nextChild.id}`,
          type: 'straight',
          d: `M ${childCenterX} ${childPos.y + LAYOUT.NODE_HEIGHT} L ${childCenterX} ${nextPos.y}`,
          dashed: false
        })
      })
    })
    
    // Generate connections inside branches (between children in each branch)
    const branchData = branchPathData.value || []
    branchData.forEach(data => {
      if (!data) return
      
      // Left branch connections (but not for loops - they handle their own)
      const leftChildren = getBranchChildren(data.conditionId, 'left')
      leftChildren.forEach((child, index) => {
        // Skip loops - they handle their own child connections
        if (child.type === 'loop') return
        
        const childPos = positions[child.id]
        if (!childPos || index === leftChildren.length - 1) return
        
        const nextChild = leftChildren[index + 1]
        // Skip if next child is a loop
        if (nextChild?.type === 'loop') return
        
        const nextPos = positions[nextChild.id]
        if (!nextPos) return
        
        const childCenterX = childPos.x + (childPos.width / 2)
        
        paths.push({
          id: `conn-${child.id}-to-${nextChild.id}`,
          type: 'straight',
          d: `M ${childCenterX} ${childPos.y + LAYOUT.NODE_HEIGHT} L ${childCenterX} ${nextPos.y}`,
          dashed: false
        })
      })
      
      // Right branch connections (but not for loops - they handle their own)
      const rightChildren = getBranchChildren(data.conditionId, 'right')
      rightChildren.forEach((child, index) => {
        // Skip loops - they handle their own child connections
        if (child.type === 'loop') return
        
        const childPos = positions[child.id]
        if (!childPos || index === rightChildren.length - 1) return
        
        const nextChild = rightChildren[index + 1]
        // Skip if next child is a loop or if this is the last non-loop child
        if (nextChild?.type === 'loop') return
        
        const nextPos = positions[nextChild.id]
        if (!nextPos) return
        
        const childCenterX = childPos.x + (childPos.width / 2)
        
        paths.push({
          id: `conn-${child.id}-to-${nextChild.id}`,
          type: 'straight',
          d: `M ${childCenterX} ${childPos.y + LAYOUT.NODE_HEIGHT} L ${childCenterX} ${nextPos.y}`,
          dashed: false
        })
      })
    })
    
    return paths
  })
  
  /**
   * Generate loop-specific paths
   * 
   * Loop visualization:
   * 
   *     [Loop Node]
   *          |
   *          └───────┐
   *                  ↓
   *              [Child 1]
   *                  |
   *              [Child 2]
   *                  |
   *    ┌─────────────┘
   *    │     ↑
   *    └─────┘ (arrow pointing back)
   *          |
   *    [Next Step]
   * 
   * The EXIT line connects from the MIDDLE of the horizontal return line
   */
  const loopPaths = computed(() => {
    const paths = []
    const nodes = flowDefinition.value?.nodes || []
    const positions = nodePositions.value
    const loopData = loopPathData.value || []
    
    if (!positions || Object.keys(positions).length === 0) return paths
    if (loopData.length === 0) return paths
    
    const mainFlowNodes = nodes.filter(n => !n.parent && !n.branch)
    
    loopData.forEach(data => {
      if (!data) return
      
      const {
        loopId,
        leftLineX,
        loopBottomY,
        entryJunctionY,
        childrenX,
        firstChildY,
        lastChildY,
        loopBackY,
        radius,
        isInBranch,
        isLeftBranch
      } = data
      
      // Validate all required values exist
      if (leftLineX == null || loopBottomY == null || entryJunctionY == null || 
          childrenX == null || firstChildY == null || lastChildY == null || 
          loopBackY == null || radius == null) {
        return
      }
      
      // How far the loop-back line extends past center (away from children)
      // Dynamically calculated based on whether in branch
      const extendAmount = isInBranch ? 30 : 45
      
      // The Y position where the arrow points back (aligned with entry curve)
      const arrowTargetY = entryJunctionY + radius
      
      // For LEFT branch loops, children are to the LEFT of the loop node
      // So paths need to be mirrored (curve left instead of right)
      if (isLeftBranch) {
        // MIRRORED: Far right extends to the right of leftLineX
        const farRightX = leftLineX + extendAmount
        
        // ENTRY PATH: From loop bottom, down, then curve LEFT to first child
        const entryPath = `M ${leftLineX} ${loopBottomY} L ${leftLineX} ${entryJunctionY} Q ${leftLineX} ${entryJunctionY + radius}, ${leftLineX - radius} ${entryJunctionY + radius} L ${childrenX + radius} ${entryJunctionY + radius} Q ${childrenX} ${entryJunctionY + radius}, ${childrenX} ${entryJunctionY + radius + radius} L ${childrenX} ${firstChildY}`
        
        paths.push({
          id: `loop-entry-${loopId}`,
          type: 'loop-entry',
          d: entryPath,
          dashed: false
        })
        
        // LOOP-BACK PATH: From last child down, then RIGHT, up, and arrow left
        const loopBackPath = `M ${childrenX} ${lastChildY} L ${childrenX} ${loopBackY - radius} Q ${childrenX} ${loopBackY}, ${childrenX + radius} ${loopBackY} L ${farRightX - radius} ${loopBackY} Q ${farRightX} ${loopBackY}, ${farRightX} ${loopBackY - radius} L ${farRightX} ${arrowTargetY + radius} Q ${farRightX} ${arrowTargetY}, ${farRightX - radius} ${arrowTargetY} L ${leftLineX + 8} ${arrowTargetY}`
        
        paths.push({
          id: `loop-back-${loopId}`,
          type: 'loop-back',
          d: loopBackPath,
          dashed: false,
          hasArrow: true,
          arrowReversed: true  // Arrow points left instead of right
        })
      } else {
        // NORMAL: Far left extends to the left of leftLineX
        const farLeftX = leftLineX - extendAmount
        const horizontalMidX = leftLineX // Exit connects at the main flow line
        
        // ENTRY PATH: From loop bottom, down, then curve right to first child
        const entryPath = `M ${leftLineX} ${loopBottomY} L ${leftLineX} ${entryJunctionY} Q ${leftLineX} ${entryJunctionY + radius}, ${leftLineX + radius} ${entryJunctionY + radius} L ${childrenX - radius} ${entryJunctionY + radius} Q ${childrenX} ${entryJunctionY + radius}, ${childrenX} ${entryJunctionY + radius + radius} L ${childrenX} ${firstChildY}`
        
        paths.push({
          id: `loop-entry-${loopId}`,
          type: 'loop-entry',
          d: entryPath,
          dashed: false
        })
        
        // LOOP-BACK PATH: From last child down, then left, up, and arrow right
        // Goes: down from child → left to farLeftX → up → right with arrow
        const loopBackPath = `M ${childrenX} ${lastChildY} L ${childrenX} ${loopBackY - radius} Q ${childrenX} ${loopBackY}, ${childrenX - radius} ${loopBackY} L ${farLeftX + radius} ${loopBackY} Q ${farLeftX} ${loopBackY}, ${farLeftX} ${loopBackY - radius} L ${farLeftX} ${arrowTargetY + radius} Q ${farLeftX} ${arrowTargetY}, ${farLeftX + radius} ${arrowTargetY} L ${leftLineX - 8} ${arrowTargetY}`
        
        paths.push({
          id: `loop-back-${loopId}`,
          type: 'loop-back',
          d: loopBackPath,
          dashed: false,
          hasArrow: true
        })
        
        // EXIT PATH: From the horizontal line at loopBackY, go down
        // Only for main flow loops (branch loops connect via branch merge lines)
        if (!isInBranch) {
          const loopIndex = mainFlowNodes.findIndex(n => n.id === loopId)
          const nextNode = mainFlowNodes[loopIndex + 1]
          const nextNodeY = nextNode && positions[nextNode.id] ? positions[nextNode.id].y : loopBackY + 100
          
          // Exit line starts from the horizontal part of the loop-back at horizontalMidX
          const exitPath = `M ${horizontalMidX} ${loopBackY} L ${horizontalMidX} ${nextNodeY}`
          
          paths.push({
            id: `loop-exit-${loopId}`,
            type: 'loop-exit',
            d: exitPath,
            dashed: false
          })
        }
      }
    })
    
    return paths
  })
  
  /**
   * Generate branch/condition-specific paths
   * 
   * The branch creates this shape:
   * 
   *         [Condition]
   *              |
   *         ─────┴─────
   *        ↙           ↘
   *    [Left 1]    [Right 1]
   *        |           |
   *    [Left 2]    [Right 2]
   *        ↘           ↙
   *         ─────┬─────  ← Lines MUST meet exactly at centerX
   *              |
   *         [Next Step]
   */
  const branchPaths = computed(() => {
    const paths = []
    const nodes = flowDefinition.value?.nodes || []
    const positions = nodePositions.value
    const branchData = branchPathData.value || []
    
    if (!positions || Object.keys(positions).length === 0) return paths
    if (branchData.length === 0) return paths
    
    const mainFlowNodes = nodes.filter(n => !n.parent && !n.branch)
    
    branchData.forEach(data => {
      if (!data) return
      
      const {
        conditionId,
        centerX,
        conditionBottomY,
        entryJunctionY,
        leftBranchX,
        rightBranchX,
        firstChildY,
        leftLastChildY,
        rightLastChildY,
        mergeY,
        radius,
        hasLeftBranch,
        hasRightBranch
      } = data
      
      // Validate required values
      if (centerX == null || conditionBottomY == null || entryJunctionY == null || 
          mergeY == null || radius == null) {
        return
      }
      
      // Find the next node after this condition in main flow
      const condIndex = mainFlowNodes.findIndex(n => n.id === conditionId)
      const nextNode = mainFlowNodes[condIndex + 1]
      const nextNodeY = nextNode && positions[nextNode.id] ? positions[nextNode.id].y : mergeY + 100
      
      // LEFT BRANCH ENTRY: From center, curve down-left to first left child
      if (hasLeftBranch) {
        const leftEntryPath = `M ${centerX} ${conditionBottomY} L ${centerX} ${entryJunctionY} Q ${centerX} ${entryJunctionY + radius}, ${centerX - radius} ${entryJunctionY + radius} L ${leftBranchX + radius} ${entryJunctionY + radius} Q ${leftBranchX} ${entryJunctionY + radius}, ${leftBranchX} ${entryJunctionY + radius + radius} L ${leftBranchX} ${firstChildY}`
        
        paths.push({
          id: `branch-left-entry-${conditionId}`,
          type: 'branch-entry',
          d: leftEntryPath,
          dashed: false
        })
        
        // LEFT BRANCH EXIT: From last left child, down, curve to EXACTLY centerX
        // Use precise path to ensure it meets exactly at centerX
        const leftExitPath = `M ${leftBranchX} ${leftLastChildY} L ${leftBranchX} ${mergeY - radius} Q ${leftBranchX} ${mergeY}, ${leftBranchX + radius} ${mergeY} L ${centerX} ${mergeY}`
        
        paths.push({
          id: `branch-left-exit-${conditionId}`,
          type: 'branch-exit',
          d: leftExitPath,
          dashed: false
        })
      }
      
      // RIGHT BRANCH ENTRY: From center, curve down-right to first right child
      if (hasRightBranch) {
        const rightEntryPath = `M ${centerX} ${conditionBottomY} L ${centerX} ${entryJunctionY} Q ${centerX} ${entryJunctionY + radius}, ${centerX + radius} ${entryJunctionY + radius} L ${rightBranchX - radius} ${entryJunctionY + radius} Q ${rightBranchX} ${entryJunctionY + radius}, ${rightBranchX} ${entryJunctionY + radius + radius} L ${rightBranchX} ${firstChildY}`
        
        paths.push({
          id: `branch-right-entry-${conditionId}`,
          type: 'branch-entry',
          d: rightEntryPath,
          dashed: false
        })
        
        // RIGHT BRANCH EXIT: From last right child, down, curve to EXACTLY centerX
        const rightExitPath = `M ${rightBranchX} ${rightLastChildY} L ${rightBranchX} ${mergeY - radius} Q ${rightBranchX} ${mergeY}, ${rightBranchX - radius} ${mergeY} L ${centerX} ${mergeY}`
        
        paths.push({
          id: `branch-right-exit-${conditionId}`,
          type: 'branch-exit',
          d: rightExitPath,
          dashed: false
        })
      }
      
      // MERGE TO NEXT: From merge center, continue down to next step
      const mergePath = `M ${centerX} ${mergeY} L ${centerX} ${nextNodeY}`
      
      paths.push({
        id: `branch-merge-${conditionId}`,
        type: 'branch-merge',
        d: mergePath,
        dashed: false
      })
    })
    
    return paths
  })
  
  return {
    connections,
    loopPaths,
    branchPaths
  }
}

export default useFlowPaths
