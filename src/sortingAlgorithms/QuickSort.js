export default function getQuickSortAnimations(array) {
    const animations = []
    if (array.length <= 1) return array
    const tmpArry = [...array]
    quickSort(tmpArry, 0, tmpArry.length - 1, animations)
    return animations
  }
  
  function quickSort(Array, left, right, animations) {
    var index
    if (Array.length > 1) {
      index = partition(Array, left, right, animations); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
        quickSort(Array, left, index - 1, animations);
      }
      if (index < right) { //more elements on the right side of the pivot
        quickSort(Array, index, right, animations)
      }
    }
    return animations
  }
  
  function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  
  function partition(Array, left, right, animations) {
    var pivotIndex = Math.floor((right + left) / 2)
    var pivot = Array[pivotIndex], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (Array[i] < pivot) {
        i++;
      }
      while (Array[j] > pivot) {
        j--;
      }
  
      if (i <= j) {
        swap(Array, i, j); //sawpping two elements
        animations.push([i, j, pivotIndex, false])
        animations.push([i, j, pivotIndex, true])
        i++;
        j--;
      }
    }
    return i;
  }
  
  