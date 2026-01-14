import { computed } from 'vue'

/**
 * FLOW LAYOUT SYSTEM
 * ==================
 * 
 * KEY LEARNINGS:
 * 
 * 1. BOUNDS CALCULATION
 *    - Track ALL node positions via iteration, not calculated estimates
 *    - DO NOT add fixed offsets for nested structures (loops in branches) -
 *      let the actual child nodes contribute their own bounds when iterated
 *    - This was a major bug: adding CARD_WIDTH to loopData.childrenX
 *      caused ~75px phantom space because childrenX was already CENTER X
 * 
 * 2. SYMMETRIC PADDING
 *    - CANVAS_PADDING (60px) is applied equally on all 4 sides
 *    - contentMinX/Y subtract padding, contentMaxX/Y add padding
 *    - FlowBuilder uses these directly WITHOUT adding extra padding
 * 
 * 3. NESTED STRUCTURE SUPPORT
 *    - Loops can be in main flow OR inside branches (left or right)
 *    - Each nested structure must position its children AND store metadata
 *    - The isLeftBranch flag enables mirrored path rendering
 * 
 * 4. CENTER VS EDGE POSITIONS
 *    - branchData stores CENTER X positions (leftBranchX, rightBranchX)
 *    - nodePositions store LEFT EDGE X positions (pos.x)
 *    - Be careful not to mix these up in calculations
 */

/**
 * Layout constants - all spacing/sizing values in one place
 * Change these to resize the entire flow proportionally
 */
export const LAYOUT = {
  // Main flow positioning
  MAIN_X: 60,            // X position of main flow nodes
  START_Y: 50,           // Starting Y position
  
  // Node dimensions - UNIFORM SIZE for all cards
  CARD_WIDTH: 160,       // Width of ALL nodes (main flow, loops, branches)
  NODE_HEIGHT: 48,       // Height of nodes
  
  // Spacing (more breathing room)
  NODE_GAP: 45,          // Vertical gap between nodes in main flow
  
  // Loop layout
  LOOP_CHILD_OFFSET_X: 200,  // How far right children are from the main flow line
  LOOP_CHILD_GAP: 40,        // Gap between children in loop
  LOOP_ENTRY_DROP: 25,       // How far down before curving to children
  LOOP_CORNER_RADIUS: 12,    // Radius for rounded corners
  LOOP_IN_BRANCH_OFFSET_X: 140, // How far right/left loop children are when inside a branch
  
  // Branch/Condition layout
  BRANCH_OFFSET_X: 160,      // How far left/right each branch is from center
  BRANCH_CHILD_GAP: 40,      // Gap between children in branch
  BRANCH_ENTRY_DROP: 25,     // How far down before branching left/right
  BRANCH_MERGE_GAP: 35,      // Gap below last children before merge line
  
  // Canvas dimensions
  CANVAS_PADDING: 60     // Extra padding around entire flow
}

/**
 * Composable for calculating flow layout positions
 * All calculations are dynamic and based on LAYOUT constants
 * @param {Object} flowDefinition - The flow definition object
 * @returns {Object} Computed layout data
 */
export function useFlowLayout(flowDefinition) {
  
  /**
   * Get all main flow nodes (nodes not inside a loop or branch)
   */
  const mainFlowNodes = computed(() => {
    if (!flowDefinition.value?.nodes) return []
    return flowDefinition.value.nodes.filter(node => !node.parent && !node.branch)
  })
  
  /**
   * Get all loop nodes (both main flow and inside branches)
   */
  const loopNodes = computed(() => {
    if (!flowDefinition.value?.nodes) return []
    return flowDefinition.value.nodes.filter(node => node.type === 'loop')
  })
  
  /**
   * Get all condition/branch nodes
   */
  const conditionNodes = computed(() => {
    if (!flowDefinition.value?.nodes) return []
    return flowDefinition.value.nodes.filter(node => node.type === 'condition')
  })
  
  /**
   * Get children of a specific loop
   */
  const getLoopChildren = (loopId) => {
    if (!flowDefinition.value?.nodes) return []
    return flowDefinition.value.nodes.filter(node => node.parent === loopId)
  }
  
  /**
   * Get children of a specific branch (left or right)
   */
  const getBranchChildren = (conditionId, side) => {
    if (!flowDefinition.value?.nodes) return []
    return flowDefinition.value.nodes.filter(
      node => node.branch === conditionId && node.branchSide === side
    )
  }
  
  /**
   * Calculate positions for all nodes
   * Handles nested structures: loops, branches, and loops-inside-branches
   */
  const nodePositions = computed(() => {
    const positions = {}
    let currentY = LAYOUT.START_Y
    
    // Calculate the center X for the main flow
    const mainFlowCenterX = LAYOUT.MAIN_X + (LAYOUT.CARD_WIDTH / 2)
    
    mainFlowNodes.value.forEach((node, index) => {
      positions[node.id] = {
        x: LAYOUT.MAIN_X,
        y: currentY,
        width: LAYOUT.CARD_WIDTH,
        height: LAYOUT.NODE_HEIGHT,
        isMainFlow: true
      }
      
      if (node.type === 'loop') {
        // Main flow loop (not inside a branch)
        const children = getLoopChildren(node.id)
        const leftLineX = mainFlowCenterX
        const childrenX = LAYOUT.MAIN_X + LAYOUT.LOOP_CHILD_OFFSET_X
        const firstChildY = currentY + LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_ENTRY_DROP + 30
        
        let loopBottomY = firstChildY
        children.forEach((child, childIndex) => {
          const childY = firstChildY + (childIndex * (LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_CHILD_GAP))
          positions[child.id] = {
            x: childrenX,
            y: childY,
            width: LAYOUT.CARD_WIDTH,
            height: LAYOUT.NODE_HEIGHT,
            isMainFlow: false,
            parentLoop: node.id
          }
          loopBottomY = childY + LAYOUT.NODE_HEIGHT
        })
        
        const loopBackY = loopBottomY + 30
        
        positions[node.id].loopData = {
          leftLineX: leftLineX,
          entryJunctionY: currentY + LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_ENTRY_DROP,
          childrenX: childrenX + (LAYOUT.CARD_WIDTH / 2),
          firstChildY: firstChildY,
          lastChildY: loopBottomY,
          loopBackY: loopBackY,
          radius: LAYOUT.LOOP_CORNER_RADIUS,
          isInBranch: false
        }
        
        currentY = loopBackY + 50
        
      } else if (node.type === 'condition') {
        const leftChildren = getBranchChildren(node.id, 'left')
        const rightChildren = getBranchChildren(node.id, 'right')
        
        const leftBranchX = mainFlowCenterX - LAYOUT.BRANCH_OFFSET_X - (LAYOUT.CARD_WIDTH / 2)
        const rightBranchX = mainFlowCenterX + LAYOUT.BRANCH_OFFSET_X - (LAYOUT.CARD_WIDTH / 2)
        const leftBranchCenterX = leftBranchX + (LAYOUT.CARD_WIDTH / 2)
        const rightBranchCenterX = rightBranchX + (LAYOUT.CARD_WIDTH / 2)
        
        const firstChildY = currentY + LAYOUT.NODE_HEIGHT + LAYOUT.BRANCH_ENTRY_DROP + 30
        
        // Position left branch children (including loops inside the branch)
        let leftBottomY = firstChildY
        let leftCurrentY = firstChildY
        let leftBranchExitY = firstChildY // Track where the exit line should start from
        
        leftChildren.forEach((child, childIndex) => {
          positions[child.id] = {
            x: leftBranchX,
            y: leftCurrentY,
            width: LAYOUT.CARD_WIDTH,
            height: LAYOUT.NODE_HEIGHT,
            isMainFlow: false,
            branchParent: node.id,
            branchSide: 'left'
          }
          
          // If this child is a loop, position its children too
          if (child.type === 'loop') {
            const loopChildren = getLoopChildren(child.id)
            const loopX = leftBranchCenterX
            // Loop children extend LEFT from the left branch
            const loopChildrenX = leftBranchX - LAYOUT.LOOP_IN_BRANCH_OFFSET_X
            const loopFirstChildY = leftCurrentY + LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_ENTRY_DROP + 25
            
            let loopBottomY = loopFirstChildY
            loopChildren.forEach((loopChild, loopChildIndex) => {
              const loopChildY = loopFirstChildY + (loopChildIndex * (LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_CHILD_GAP))
              positions[loopChild.id] = {
                x: loopChildrenX,
                y: loopChildY,
                width: LAYOUT.CARD_WIDTH,
                height: LAYOUT.NODE_HEIGHT,
                isMainFlow: false,
                parentLoop: child.id
              }
              loopBottomY = loopChildY + LAYOUT.NODE_HEIGHT
            })
            
            const loopBackY = loopBottomY + 25
            
            // Store loop data for the loop inside the left branch
            positions[child.id].loopData = {
              leftLineX: loopX,
              entryJunctionY: leftCurrentY + LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_ENTRY_DROP,
              childrenX: loopChildrenX + (LAYOUT.CARD_WIDTH / 2),
              firstChildY: loopFirstChildY,
              lastChildY: loopBottomY,
              loopBackY: loopBackY,
              radius: LAYOUT.LOOP_CORNER_RADIUS,
              isInBranch: true,
              isLeftBranch: true  // Flag for path rendering direction
            }
            
            leftBranchExitY = loopBackY
            leftCurrentY = loopBackY + 25
            leftBottomY = leftCurrentY
          } else {
            leftBranchExitY = leftCurrentY + LAYOUT.NODE_HEIGHT
            leftBottomY = leftCurrentY + LAYOUT.NODE_HEIGHT
            leftCurrentY = leftBottomY + LAYOUT.BRANCH_CHILD_GAP
          }
        })
        
        // Position right branch children (including loops inside the branch)
        let rightBottomY = firstChildY
        let rightCurrentY = firstChildY
        let rightBranchExitY = firstChildY // Track where the exit line should start from
        
        rightChildren.forEach((child, childIndex) => {
          positions[child.id] = {
            x: rightBranchX,
            y: rightCurrentY,
            width: LAYOUT.CARD_WIDTH,
            height: LAYOUT.NODE_HEIGHT,
            isMainFlow: false,
            branchParent: node.id,
            branchSide: 'right'
          }
          
          // If this child is a loop, position its children too
          if (child.type === 'loop') {
            const loopChildren = getLoopChildren(child.id)
            const loopX = rightBranchCenterX
            const loopChildrenX = rightBranchX + LAYOUT.LOOP_IN_BRANCH_OFFSET_X
            const loopFirstChildY = rightCurrentY + LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_ENTRY_DROP + 25
            
            let loopBottomY = loopFirstChildY
            loopChildren.forEach((loopChild, loopChildIndex) => {
              const loopChildY = loopFirstChildY + (loopChildIndex * (LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_CHILD_GAP))
              positions[loopChild.id] = {
                x: loopChildrenX,
                y: loopChildY,
                width: LAYOUT.CARD_WIDTH,
                height: LAYOUT.NODE_HEIGHT,
                isMainFlow: false,
                parentLoop: child.id
              }
              loopBottomY = loopChildY + LAYOUT.NODE_HEIGHT
            })
            
            const loopBackY = loopBottomY + 25
            
            // Store loop data for the loop inside the branch
            positions[child.id].loopData = {
              leftLineX: loopX,
              entryJunctionY: rightCurrentY + LAYOUT.NODE_HEIGHT + LAYOUT.LOOP_ENTRY_DROP,
              childrenX: loopChildrenX + (LAYOUT.CARD_WIDTH / 2),
              firstChildY: loopFirstChildY,
              lastChildY: loopBottomY,
              loopBackY: loopBackY,
              radius: LAYOUT.LOOP_CORNER_RADIUS,
              isInBranch: true
            }
            
            // The exit from this branch should come from the loop's bottom
            rightBranchExitY = loopBackY
            rightCurrentY = loopBackY + 25
            rightBottomY = rightCurrentY
          } else {
            rightBranchExitY = rightCurrentY + LAYOUT.NODE_HEIGHT
            rightBottomY = rightCurrentY + LAYOUT.NODE_HEIGHT
            rightCurrentY = rightBottomY + LAYOUT.BRANCH_CHILD_GAP
          }
        })
        
        // The merge line Y is below the longer branch
        const maxBottomY = Math.max(leftBottomY, rightBottomY)
        const mergeY = maxBottomY + LAYOUT.BRANCH_MERGE_GAP
        
        positions[node.id].branchData = {
          centerX: mainFlowCenterX,
          conditionBottomY: currentY + LAYOUT.NODE_HEIGHT,
          entryJunctionY: currentY + LAYOUT.NODE_HEIGHT + LAYOUT.BRANCH_ENTRY_DROP,
          leftBranchX: leftBranchCenterX,
          rightBranchX: rightBranchCenterX,
          firstChildY: firstChildY,
          leftLastChildY: leftBranchExitY, // Use the calculated exit Y (handles loops)
          rightLastChildY: rightBranchExitY, // Use the calculated exit Y (handles loops)
          mergeY: mergeY,
          radius: LAYOUT.LOOP_CORNER_RADIUS
        }
        
        currentY = mergeY + 50
        
      } else {
        currentY += LAYOUT.NODE_HEIGHT + LAYOUT.NODE_GAP
      }
    })
    
    return positions
  })
  
  /**
   * Calculate loop path data for each loop (for SVG generation)
   * Includes loops in main flow AND loops inside branches
   */
  const loopPathData = computed(() => {
    const pathData = []
    
    loopNodes.value.forEach(loop => {
      const loopPos = nodePositions.value[loop.id]
      if (!loopPos?.loopData) return
      
      const children = getLoopChildren(loop.id)
      if (children.length === 0) return
      
      const ld = loopPos.loopData
      
      pathData.push({
        loopId: loop.id,
        leftLineX: ld.leftLineX,
        loopBottomY: loopPos.y + LAYOUT.NODE_HEIGHT,
        entryJunctionY: ld.entryJunctionY,
        childrenX: ld.childrenX,
        firstChildY: ld.firstChildY,
        lastChildY: ld.lastChildY,
        loopBackY: ld.loopBackY,
        radius: ld.radius,
        isInBranch: ld.isInBranch,
        isLeftBranch: ld.isLeftBranch || false  // For mirrored loop rendering in left branches
      })
    })
    
    return pathData
  })
  
  /**
   * Calculate branch path data for each condition (for SVG generation)
   */
  const branchPathData = computed(() => {
    const pathData = []
    
    conditionNodes.value.forEach(condition => {
      const condPos = nodePositions.value[condition.id]
      if (!condPos?.branchData) return
      
      const leftChildren = getBranchChildren(condition.id, 'left')
      const rightChildren = getBranchChildren(condition.id, 'right')
      if (leftChildren.length === 0 && rightChildren.length === 0) return
      
      const bd = condPos.branchData
      
      pathData.push({
        conditionId: condition.id,
        centerX: bd.centerX,
        conditionBottomY: bd.conditionBottomY,
        entryJunctionY: bd.entryJunctionY,
        leftBranchX: bd.leftBranchX,
        rightBranchX: bd.rightBranchX,
        firstChildY: bd.firstChildY,
        leftLastChildY: bd.leftLastChildY,
        rightLastChildY: bd.rightLastChildY,
        mergeY: bd.mergeY,
        radius: bd.radius,
        hasLeftBranch: leftChildren.length > 0,
        hasRightBranch: rightChildren.length > 0
      })
    })
    
    return pathData
  })
  
  /**
   * CANVAS SIZE & CONTENT BOUNDS
   * ============================
   * 
   * CRITICAL: This must iterate ALL nodePositions to get accurate bounds.
   * 
   * DO NOT add hardcoded offsets for nested structures like:
   *   maxX = Math.max(maxX, pos.loopData.childrenX + CARD_WIDTH)
   * 
   * This causes phantom scroll space because:
   * - loopData.childrenX is already CENTER X of children
   * - Adding full CARD_WIDTH overshoots by half a node width
   * - The actual child nodes are ALREADY in nodePositions and will
   *   contribute their correct bounds when iterated
   * 
   * The ONLY additional tracking needed is for SVG paths that extend
   * beyond node boundaries (loopBackY, mergeY lines).
   */
  const canvasSize = computed(() => {
    let minX = Infinity
    let maxX = 0
    let minY = Infinity
    let maxY = 0
    
    // Iterate ALL nodes - this catches everything regardless of nesting depth
    Object.values(nodePositions.value).forEach(pos => {
      // Track all four edges from ACTUAL node positions
      // pos.x is LEFT edge, pos.x + pos.width is RIGHT edge
      minX = Math.min(minX, pos.x)
      maxX = Math.max(maxX, pos.x + pos.width)
      minY = Math.min(minY, pos.y)
      maxY = Math.max(maxY, pos.y + pos.height)
      
      // Only extend for SVG paths that go beyond node boundaries
      if (pos.loopData) {
        maxY = Math.max(maxY, pos.loopData.loopBackY + 40)
      }
      if (pos.branchData) {
        maxY = Math.max(maxY, pos.branchData.mergeY + 40)
      }
    })
    
    if (minX === Infinity) minX = 0
    if (minY === Infinity) minY = 0
    
    // Apply SYMMETRIC padding on all sides
    return {
      width: maxX + LAYOUT.CANVAS_PADDING,
      height: maxY + LAYOUT.CANVAS_PADDING,
      contentMinX: minX - LAYOUT.CANVAS_PADDING,
      contentMaxX: maxX + LAYOUT.CANVAS_PADDING,
      contentMinY: minY - LAYOUT.CANVAS_PADDING,
      contentMaxY: maxY + LAYOUT.CANVAS_PADDING
    }
  })
  
  return {
    nodePositions,
    loopPathData,
    branchPathData,
    canvasSize,
    mainFlowNodes,
    loopNodes,
    conditionNodes,
    getLoopChildren,
    getBranchChildren,
    LAYOUT
  }
}

export default useFlowLayout
