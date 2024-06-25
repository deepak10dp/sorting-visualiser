import React from 'react'
import getMergeSortAnimations from '../sortingAlgorithms/MergeSort.js'
import getQuickSortAnimations from '../sortingAlgorithms/QuickSort'
import getInsertionSortAnimations from '../sortingAlgorithms/InsertionSort'
import getSelectionSortAnimations from '../sortingAlgorithms/SelectionSort'
import getBubbleSortAnimations from '../sortingAlgorithms/BubbleSort.js'
import './SortingVisualizer.css'


const PRIMARY_COLOR = '#03e9f4'

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      array: [],
      active: true,
      orderd: false,
      size: (window.innerWidth / 3) / 2,
      animationSpeed: 100 / (200 / 2),
      maxSize: window.innerWidth / 3,
    }

  }

  componentDidMount() {
    this.timeouts = []
    this.resetArray()
  }

  resetArray() {
    this.timeouts.forEach(clearTimeout)
    const array = []
    for (let i = 0; i < this.state.size; i++) {
      array.push(randomIntFromInterval(5, 500))
    }
    const arrayBars = document.getElementsByClassName('array-bar')

    for(let i = 0; i < arrayBars.length; i++){
      const barStyle = arrayBars[i].style
      barStyle.backgroundColor = PRIMARY_COLOR
    }

    this.setState({ array: array, orderd: false,active: true })
  }


  onTodoChange(value) {

    const newArr = new Promise((resolve) => {
      this.setState({
        size: value,
        animationSpeed: 100 / (this.state.size / 2)
      })
      resolve()
    })

    newArr.then(() => {
      this.resetArray()
    })

  }

  insertionSort() {

    const animations = getInsertionSortAnimations(this.state.array)

    this.setState({ active: false, orderd: true })
    
    this.timeouts.push(setTimeout(() => {
      this.setState({ active: true })
    }, animations.length * this.state.animationSpeed))


    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar')
      const [barOneIdx, barTwoIdx, action] = animations[i]
      const barOneStyle = arrayBars[barOneIdx].style
      const barTwoStyle = arrayBars[barTwoIdx].style

      if (action === 'key') {
        this.timeouts.push(setTimeout(() => {
          barTwoStyle.backgroundColor = PRIMARY_COLOR
          barOneStyle.backgroundColor = 'green'
        }, i * this.state.animationSpeed))

      } else if (action === 'swap') {
        this.timeouts.push(setTimeout(() => {
          const tpm = barOneStyle.height
          barOneStyle.height = barTwoStyle.height
          barTwoStyle.height = tpm
        }, i * this.state.animationSpeed))
      }
      else {
        this.timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR
        }, i * this.state.animationSpeed))
      }
    }
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array)

    this.setState({ active: false, orderd: true })

    this.timeouts.push(setTimeout(() => {
      this.setState({ active: true })
    }, animations.length * this.state.animationSpeed))

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar')
      const [key, prvkey, min, prvmin, barOneIdx, barTwoIdx, action] = animations[i]

      const keyStyle = arrayBars[key].style
      const prvkeyStyle = arrayBars[prvkey].style
      const minStyle = arrayBars[min].style
      const prvminStyle = arrayBars[prvmin].style


      const barOneStyle = arrayBars[barOneIdx].style
      const barTwoStyle = arrayBars[barTwoIdx].style



      if (action === 'fonudMin') {
        this.timeouts.push(setTimeout(() => {
          keyStyle.backgroundColor = 'green'
          prvkeyStyle.backgroundColor = PRIMARY_COLOR
          minStyle.backgroundColor = 'black'
          prvminStyle.backgroundColor = PRIMARY_COLOR
        }, i * this.state.animationSpeed))

      } else if (action === 'lookingForMin') {
        this.timeouts.push(setTimeout(() => {
          keyStyle.backgroundColor = 'green'
          prvkeyStyle.backgroundColor = PRIMARY_COLOR
          minStyle.backgroundColor = 'black'
          prvminStyle.backgroundColor = PRIMARY_COLOR
          barTwoStyle.backgroundColor = PRIMARY_COLOR
          barOneStyle.backgroundColor = 'red'
        }, i * this.state.animationSpeed))
      }
      else if (action === 'swap') {
        this.timeouts.push(setTimeout(() => {
          keyStyle.backgroundColor = PRIMARY_COLOR
          prvkeyStyle.backgroundColor = PRIMARY_COLOR
          minStyle.backgroundColor = PRIMARY_COLOR
          prvminStyle.backgroundColor = PRIMARY_COLOR
          barTwoStyle.backgroundColor = PRIMARY_COLOR
          barOneStyle.backgroundColor = PRIMARY_COLOR
          const tpm = barOneStyle.height
          barOneStyle.height = barTwoStyle.height
          barTwoStyle.height = tpm
        }, i * this.state.animationSpeed))
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array)

    this.setState({ active: false, orderd: true })
    this.timeouts.push(setTimeout(() => {
      this.setState({ active: true })
    }, animations.length * this.state.animationSpeed))

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar')
      const [barOneIdx, barTwoIdx, action] = animations[i]
      const barOneStyle = arrayBars[barOneIdx].style
      const barTwoStyle = arrayBars[barTwoIdx].style

      if (action === 'compare') {
        this.timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = 'red'
          barTwoStyle.backgroundColor = 'red'
        }, i * this.state.animationSpeed))

      } else if (action === 'prvcompare') {
        this.timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR
          barTwoStyle.backgroundColor = PRIMARY_COLOR
        }, i * this.state.animationSpeed))

      } else if (action === 'swap') {
        this.timeouts.push(setTimeout(() => {
          const tpm = barOneStyle.height
          barOneStyle.height = barTwoStyle.height
          barTwoStyle.height = tpm
        }, i * this.state.animationSpeed))
      }
      else if (action === 'orderd') {
        this.timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = 'green'
          barTwoStyle.backgroundColor = PRIMARY_COLOR
        }, i * this.state.animationSpeed))
      } else {
        this.timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR
        }, i * this.state.animationSpeed))
      }
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array)

    this.setState({ active: false, orderd: true })

    this.timeouts.push(setTimeout(() => {
      this.setState({ active: true })
    }, animations.length * this.state.animationSpeed))

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar')
      const isColorChange = i % 3 !== 2
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i]
        const barOneStyle = arrayBars[barOneIdx].style
        const barTwoStyle = arrayBars[barTwoIdx].style
        const color = i % 3 === 0 ? 'red' : PRIMARY_COLOR
        this.timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = color
          barTwoStyle.backgroundColor = color
        }, i * this.state.animationSpeed))
      } else {
        this.timeouts.push(setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i]
          const barOneStyle = arrayBars[barOneIdx].style
          barOneStyle.height = `${newHeight}px`
        }, i * this.state.animationSpeed))
      }
    }

  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array)

    this.setState({ active: false, orderd: true })

    this.timeouts.push(setTimeout(() => {
      this.setState({ active: true })
    }, animations.length * this.state.animationSpeed))

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar')

      const [barOneIdx, barTwoIdx, pivot, swap] = animations[i]
      const barOneStyle = arrayBars[barOneIdx].style
      const barTwoStyle = arrayBars[barTwoIdx].style
      const pivotStyle = arrayBars[pivot].style
      if (!swap) {
        this.timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = 'red'
          barTwoStyle.backgroundColor = 'red'
          pivotStyle.backgroundColor = 'black'
        }, i * this.state.animationSpeed))
      } else {
        this.timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR
          barTwoStyle.backgroundColor = PRIMARY_COLOR
          pivotStyle.backgroundColor = PRIMARY_COLOR
          const tmp = barOneStyle.height
          barOneStyle.height = barTwoStyle.height
          barTwoStyle.height = tmp
        }, i * this.state.animationSpeed))
      }
    }
  }

  render() {
    const { array } = this.state

    return (
      <div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${(400 / this.state.size)}px`,
              }}></div>
          ))}
        </div>
        <nav>
          <button className='mainBtn' onClick={() => this.resetArray()} ><span></span><span></span><span></span><span></span>Generate New Array</button>
          <button disabled={!this.state.active || this.state.orderd} onClick={() => this.insertionSort()} ><span></span><span></span><span></span><span></span>Insertion Sort</button>
          <button disabled={!this.state.active || this.state.orderd} onClick={() => this.selectionSort()} ><span></span><span></span><span></span><span></span>Selection sort</button>
          <button disabled={!this.state.active || this.state.orderd} onClick={() => this.bubbleSort()} ><span></span><span></span><span></span><span></span>Bubble sort</button>
          <button disabled={!this.state.active || this.state.orderd} onClick={() => this.mergeSort()} ><span></span><span></span><span></span><span></span>Merge Sort</button>
          <button disabled={!this.state.active || this.state.orderd} onClick={() => this.quickSort()} ><span></span><span></span><span></span><span></span>Quick Sort</button>
        </nav>
        <div className='arraySize'>
          <h1>Change the array size</h1>
          <input  type="range" min={10} max={this.state.maxSize} step={1} value={this.state.size} onChange={e => this.onTodoChange(e.target.value)}></input>
        </div>
      </div>
    )
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}