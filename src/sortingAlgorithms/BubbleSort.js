export default function getBubbleSortAnimations(array) {
    const animations = []
    if (array.length <= 1) return array
    const tmpArry = [...array]
  
    bubbleSort(tmpArry, animations)
    return animations
  }
  
  function bubbleSort(array, animations) {
  
    for (var i = 0; i < array.length; i++) {
  
      for (var j = 0; j < (array.length - i - 1); j++) {
        if(j !== 0)  animations.push([j-1, j, 'prvcompare'])
        animations.push([j, j + 1, 'compare'])
        // Checking if the item at present iteration
        // is greater than the next iteration
        if (array[j] > array[j + 1]) {
  
          // If the condition is true then swap them
          var temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          animations.push([j, j+1, 'swap'])
        }
      }
      if(j !== 0)animations.push([j-1, j, 'prvcompare'])
      
      if(j+1 === array.length ) animations.push([j, 1, 'orderd'])
      else animations.push([j, j+1, 'orderd']) 
    }
    animations.push([0, 1, 'finshed']) 
    return array
  }