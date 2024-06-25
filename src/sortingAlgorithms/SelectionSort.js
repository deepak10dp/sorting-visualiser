export default function getSelectionSortAnimations(array) {
    const animations = []
    if (array.length <= 1) return array
    const tmpArry = [...array]
    selectionSort(tmpArry, animations)
    return animations
  }
  
  function swapInsertionSort(array, xp, yp) {
    var temp = array[xp];
    array[xp] = array[yp];
    array[yp] = temp;
  }
  
  function selectionSort(array, animations) {
    var i, j, min_idx;
  
    // One by one move boundary of unsorted subarray
    for (i = 0; i < array.length - 1; i++) {
      // Find the minimum element in unsorted array
  
      //[key, prvkey, min, prvmin, barOneIdx, barTwoIdx, action] 
      min_idx = i;
      if (i === 0) animations.push([i, 1, min_idx, 1, 1, 1, 'fonudMin'])
      else animations.push([i, i - 1, min_idx, 1, 1, 1, 'fonudMin'])
  
      for (j = i + 1; j < array.length; j++) {
        if (i === 0) animations.push([i, 1, min_idx, 1, j, j - 1, 'lookingForMin'])
        else animations.push([i, i - 1, min_idx, 1, j, j - 1, 'lookingForMin'])
  
        if (array[j] < array[min_idx]) {
          if (i === 0) animations.push([i, 1, j, min_idx, 1, 1, 'fonudMin'])
          else animations.push([i, i - 1, j, min_idx, 1, 1, 'fonudMin'])
          min_idx = j;
        }
  
      }
  
      // Swap the found minimum element with the first element
      swapInsertionSort(array, min_idx, i);
      animations.push([i, i, min_idx, j - 1, min_idx, i, 'swap'])
    }
  
    return array
  }
  