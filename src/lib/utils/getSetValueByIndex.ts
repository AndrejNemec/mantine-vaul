export function getSetValueByIndex<T = unknown>(target: Set<T>, index: number) { 
    if (typeof index !== 'number') throw new Error(`Index must be a number!`)
  
    let i = 0
    for (const item of target) if (i++ === index) return item
  
    throw new Error(`Index ${index} out of bounds!`)
  }