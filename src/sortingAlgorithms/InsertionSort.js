export default function getInsertionSortAnimations(array) {
    const animations = []
    if (array.length <= 1) return array
    const tmpArry = [...array]
    insertionSort(tmpArry, animations)
    return animations
  }
  
  function insertionSort(array, animations) {
    let i, key, j;
    for (i = 1; i < array.length; i++) {
      key = array[i];
      j = i - 1;
      animations.push([i, i - 1, 'key'])
  
      /* Move elements of arr[0..i-1], that are 
      greater than key, to one position ahead 
      of their current position */
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        animations.push([j + 1, j, 'swap'])
        j = j - 1;
      }
      array[j + 1] = key;
    }
    animations.push([array.length - 1, j, 'finished'])
    return array
  }