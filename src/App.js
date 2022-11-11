import React, { useState, useEffect, useRef} from 'react';
import './css/App.css';
import Navbar from './components/Navbar.js'
import SortingVisualizer from './components/SortingVisualizer.js'

function App() {
  const [array, setArray] = useState([])
  const [current_sorting, setSorting] = useState('bubble')
  const [sortingActive, setSortingActive] = useState(false)
  const sortingActiveRef = useRef(sortingActive)


  const [isCurrentlySorted,setIsCurrentlySorted] = useState(false)
  const isCurrentlySortedRef = useRef(isCurrentlySorted)
  useEffect(() => {
    isCurrentlySortedRef.current = isCurrentlySorted
  }, [isCurrentlySorted])

  const sorting_algorithms = { bubble: 'Bubble sort', insertion: 'Insertion sort', selection: 'Selection sort', merge: 'Merge sort' }
  const [generateArraySize, setGenerateArraySize] = useState(100);
  const SORTING_ARRAY_SPEED = 1000


  const [sortingSpeedMultiplier, setSortingSpeedMultiplier] = useState(1)
  const sortingSpeedMultiplierRef = useRef(sortingSpeedMultiplier)
  useEffect(() => {
    sortingSpeedMultiplierRef.current = sortingSpeedMultiplier
  }, [sortingSpeedMultiplier])


  const [isScreenLoaded, SetIsScreenLoaded] = useState(false)

  useEffect(() => {
    generateArrayOfSize(generateArraySize)
  }, [generateArraySize])

  useEffect(() => {
    if (!isCurrentlySortedRef.current) generateArrayOfSize(generateArraySize)
  }, [current_sorting])

  useEffect(() => {
    document.addEventListener('keyup', detectShortcut, true)
  },[])

  const detectShortcut = (e) => {
    // console.log("key:" + e.code)
    switch(e.code) {
      case 'Space':
        if(sortingActiveRef.current) { 
          console.log("stopped")
          sortingStop()
        } else {
          console.log("runned")
          sortingRun()
        }
        break;
      case 'ArrowUp':
        changeSortingSpeedHandler(true)
        setSpeedChangeEffectDisplay(true)
        break;
      case 'ArrowDown':
        changeSortingSpeedHandler(false)
        setSpeedChangeEffectDisplay(true)
        break;
      default:
        break;
    }
  }

  // useEffect(()=>{
  //   console.log(sortingSpeedMultiplier)
  // },[sortingSpeedMultiplier])

  const changeSortingHandler = (goNext) => {
    const algo = Object.keys(sorting_algorithms)
    const current_index = algo.indexOf(current_sorting);
    // console.log(algo[current_index])
    if (goNext) {
      const next_key = algo[(current_index + 1) % algo.length]
      setSorting(next_key)
    } else {
      const previous_key = algo[(current_index - 1) % algo.length]
      setSorting(previous_key)
    }
  }
  
  const changeSortingSpeedHandler = (goNext) => {
    const multipliers = [1,2,4,8,16,32,64]
    const currentElementIndex = multipliers.indexOf(sortingSpeedMultiplierRef.current)
    const nextItemIndex = (currentElementIndex + 1) % multipliers.length;
    const previousItemIndex = (currentElementIndex + multipliers.length - 1) % multipliers.length;
    setSortingSpeedMultiplier(multipliers[goNext ? nextItemIndex : previousItemIndex])
  }
  
  const generateArrayOfSize = async (size) => {
    setSortingActive(false)
    setCurrentModifyingIndex([])
    setCurrentRightPlaceIndex([])
    setCurrentFinalAnimationIndex([])
    setArray([])
    var generatedArray = []
    for (var i = 0; i < size; i++) {
      generatedArray.push(Math.floor(Math.random() * 100))
    }
    setArray(generatedArray)
    setIsCurrentlySorted(true)
  }
  
  useEffect(() => {
    SetIsScreenLoaded(true)
    generateArrayOfSize(generateArraySize)
  },[])

  const [currentModifyingIndex, setCurrentModifyingIndex] = useState([])
  const [currentRightPlaceIndex, setCurrentRightPlaceIndex] = useState([])
  const [currentFinalAnimationIndex, setCurrentFinalAnimationIndex] = useState([])


  useEffect(() => {
    console.log("sorted: " + isCurrentlySorted)
  }, [isCurrentlySorted])

  useEffect(() => {
    sortingActiveRef.current = sortingActive;
    if (sortingActive) sortingSelectionRun()
  }, [sortingActive])

  const sortingRun = () => {
    if (!isCurrentlySortedRef.current) {
      generateArrayOfSize(generateArraySize)
    } else {
      setSortingActive(true)
    }
  }

  const sortingStop = () => {
    setSortingActive(false)
    setIsCurrentlySorted(false)
  }

  const sortingSelectionRun = async () => {
    switch (current_sorting) {
      case 'bubble':
        await bubble_sort_algorithm()
        break;
      case 'insertion':
        await insertion_sort_algorithm()
        break;
      case 'selection':
        await selection_sort_algorithm()
        break;
      case 'merge':
        await merge_sort_alogrithm()
        break;
      default:
        console.log('Error, algorithm not found. It may be a bug')
        break;
    }
    setSortingActive(false)
  }

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }

  const bubble_sort_algorithm = async () => {
    let temp_array = [...array]
    for (let i = 0; i < temp_array.length ; i++){
      for (let j = 0; j < temp_array.length; j++) {
        // console.log(await testGetSortingActive())
        setCurrentModifyingIndex([j,j+1])
        if (temp_array[j] > temp_array[j + 1]) {
          var temp = temp_array[j]
          temp_array[j] = temp_array[j + 1]
          temp_array[j + 1] = temp
        }
        await delay(SORTING_ARRAY_SPEED / sortingSpeedMultiplierRef.current);
        if (!sortingActiveRef.current) { return false; }
        setArray([...temp_array]);
      }
      setCurrentRightPlaceIndex(currentRightPlaceIndex => [...currentRightPlaceIndex, (temp_array.length - 1 - i)])
    }
    setCurrentRightPlaceIndex(currentRightPlaceIndex => [...currentRightPlaceIndex, 0])
    // Final check animation
    for (let k = 0; k < temp_array.length; k++) {
      setCurrentFinalAnimationIndex(currentFinalAnimationIndex => [...currentFinalAnimationIndex, k])
      await delay(30);
    }
    setIsCurrentlySorted(false)
  }
  const insertion_sort_algorithm = async () => {
    let A = [...array]
    for (let i = 1; i < A.length; i++) {
      let element = A[i]
      let j = i - 1
      while (j >= 0 && A[j] > element){
          A[j+1] = A[j]
          j -= 1
          setCurrentModifyingIndex([j, j + 1])
          setArray([...A]);
          await delay(SORTING_ARRAY_SPEED / sortingSpeedMultiplierRef.current);
          if (!sortingActiveRef.current) { return false; }
      }
      A[j + 1] = element
    }
    setCurrentModifyingIndex([])
    for (let k = 0; k < A.length; k++) {
      setCurrentRightPlaceIndex(currentRightPlaceIndex => [...currentRightPlaceIndex, k])
      await delay(30);
    }
    for (let k = 0; k < A.length; k++) {
      setCurrentFinalAnimationIndex(currentFinalAnimationIndex => [...currentFinalAnimationIndex, k])
      await delay(30);
    }
    setIsCurrentlySorted(false)
  }
  const selection_sort_algorithm = async () => {
    let A = [...array]
    for (let i = 0; i < A.length - 1 ; i++) {
      let min = i
      for (let j = i + 1; j < A.length; j++) {
        setCurrentModifyingIndex([j, min])
        if (A[j] < A[min]) {
          min = j
        }
        await delay(SORTING_ARRAY_SPEED / sortingSpeedMultiplierRef.current);
        if (!sortingActiveRef.current) { return false; }
      }
      let temp = A[min]
      A[min] = A[i]
      A[i] = temp;
      setCurrentRightPlaceIndex(currentRightPlaceIndex => [...currentRightPlaceIndex, i])
      setArray([...A]);
      await delay(SORTING_ARRAY_SPEED / sortingSpeedMultiplierRef.current);
    }
    setCurrentModifyingIndex([])
    setCurrentRightPlaceIndex(currentRightPlaceIndex => [...currentRightPlaceIndex, A.length-1])
    for (let k = 0; k < A.length; k++) {
      setCurrentFinalAnimationIndex(currentFinalAnimationIndex => [...currentFinalAnimationIndex, k])
      await delay(30);
    }
    setIsCurrentlySorted(false)
  }
  const merge_sort_alogrithm = async () => {
    let arr = [...array]
    var sorted = arr.slice(),
    n = sorted.length,
    buffer = new Array(n);
    
    for (var size = 1; size < n; size *= 2) {
      for (var leftStart = 0; leftStart < n; leftStart += 2 * size) {
        var left = leftStart,
          right = Math.min(left + size, n),
          leftLimit = right,
          rightLimit = Math.min(right + size, n),
          i = left;
        while (left < leftLimit && right < rightLimit) {
          if (sorted[left] <= sorted[right]) {
            buffer[i++] = sorted[left++];
          } else {
            buffer[i++] = sorted[right++];
          }
        }
        while (left < leftLimit) {
          buffer[i++] = sorted[left++];
        }
        while (right < rightLimit) {
          buffer[i++] = sorted[right++];
        }
        setCurrentModifyingIndex([right, left])
      }
      setArray([...buffer]);
      await delay(SORTING_ARRAY_SPEED / sortingSpeedMultiplierRef.current);
      if (!sortingActiveRef.current) { return false; }
      var temp = sorted,
      sorted = buffer,
      buffer = temp;
    }
    for (let k = 0; k < sorted.length; k++) {
      setCurrentFinalAnimationIndex(currentFinalAnimationIndex => [...currentFinalAnimationIndex, k])
      await delay(30);
    }
    return sorted;
  }


  const background_text = sorting_algorithms[current_sorting].split(' ')

  const [speedChangeEffectDisplay, setSpeedChangeEffectDisplay] = useState(false)

  return (
    // onClick={() => generateArrayOfSize(DEFAULT_GENERATING_SIZE)}
    <div id="App">
      <div id="loading-screen" className={isScreenLoaded ? 'hidden' : ''}><div><h1 className="main-text">Hello there</h1><h2 className="main-text">Loading</h2></div></div>
      <div id="speed-multiplier" style={{ display: speedChangeEffectDisplay ? '' : 'none' }} onAnimationEnd={() => setSpeedChangeEffectDisplay(false)}><h1 className="main-text" data-value={sortingSpeedMultiplier + 'x'}>{sortingSpeedMultiplier}x</h1></div>
      <div id="background-sort" className="w-100 h-100 flex-all-centered"><h1 id="background-sort-text" className="main-text"><span className="text-b">{background_text[0]}</span><br/>{background_text[1]}</h1></div>
      <Navbar generateArrayOfSize={() => generateArrayOfSize(generateArraySize)} 
              currentSorting={sorting_algorithms[current_sorting]} 
              sortingRun={() => sortingRun()}     
              sortingStop={() => sortingStop()} 
              isSortingActive={sortingActive}
              isCurrentlySorted={isCurrentlySorted}
              changeSortingHandler={() => changeSortingHandler} 
              changeInputSizeValue={(value) => setGenerateArraySize(value)}
              inputSize={generateArraySize}
              currentSpeedMultiplier={sortingSpeedMultiplier}
              changeSortingSpeedHandler={(goNext) => changeSortingSpeedHandler(goNext)}
              /> 
      <div id="sound-control" style={{display: 'none'}}>
        <svg id="sound-active" className="visible" width="25" height="25" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.5429 28.4222C25.102 26.8674 26.3384 25.0199 27.1812 22.9858C28.024 20.9516 28.4564 18.771 28.4537 16.5692C28.4564 14.3674 28.024 12.1868 27.1812 10.1527C26.3384 8.11852 25.102 6.27099 23.5429 4.71625L22.1466 6.1106C23.5223 7.48244 24.6132 9.11264 25.3568 10.9075C26.1004 12.7023 26.482 14.6264 26.4795 16.5692C26.4795 20.6536 24.8229 24.3515 22.1466 27.0278L23.5429 28.4222Z" fill="white" />
          <path d="M20.7521 25.6335C21.9443 24.4444 22.8897 23.0316 23.5342 21.476C24.1786 19.9205 24.5093 18.2529 24.5072 16.5692C24.5093 14.8855 24.1786 13.2179 23.5342 11.6624C22.8897 10.1068 21.9443 8.69396 20.7521 7.50494L19.3578 8.89929C20.3665 9.90541 21.1665 11.1009 21.7118 12.4172C22.257 13.7335 22.5368 15.1445 22.535 16.5692C22.5373 17.9941 22.258 19.4054 21.7131 20.722C21.1681 22.0386 20.3684 23.2346 19.3598 24.2411L20.7521 25.6335Z" fill="white" />
          <path d="M17.9635 22.8448C18.7888 22.0216 19.4433 21.0434 19.8894 19.9664C20.3355 18.8894 20.5643 17.7349 20.5628 16.5692C20.5643 15.4035 20.3355 14.249 19.8894 13.172C19.4433 12.0951 18.7888 11.1169 17.9635 10.2937L16.5691 11.688C17.211 12.3283 17.7201 13.0892 18.067 13.9269C18.4139 14.7645 18.5919 15.6625 18.5906 16.5692C18.5918 17.4759 18.4138 18.3738 18.0669 19.2115C17.7199 20.0492 17.2109 20.81 16.5691 21.4504L17.9635 22.8448ZM14.0388 7.79289C14.2058 7.87338 14.3468 7.99934 14.4456 8.15632C14.5443 8.3133 14.5967 8.49494 14.5969 8.68039V24.458C14.5966 24.6436 14.544 24.8253 14.4451 24.9823C14.3462 25.1393 14.205 25.2652 14.0377 25.3455C13.8705 25.4259 13.6839 25.4574 13.4996 25.4364C13.3152 25.4155 13.1405 25.343 12.9955 25.2272L8.33515 21.4997H3.74977C3.48824 21.4997 3.23742 21.3958 3.05249 21.2109C2.86756 21.026 2.76367 20.7752 2.76367 20.5136V12.6248C2.76367 12.3633 2.86756 12.1124 3.05249 11.9275C3.23742 11.7426 3.48824 11.6387 3.74977 11.6387H8.33515L12.9955 7.91123C13.1406 7.79524 13.3155 7.72259 13.5001 7.70166C13.6846 7.68072 13.8714 7.71235 14.0388 7.79289Z" fill="white" />
        </svg>
        <svg id="sound-muted" width="25" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1415 7.47398C14.3199 7.55989 14.4704 7.69436 14.5758 7.86194C14.6811 8.02951 14.7371 8.22341 14.7373 8.42138V25.264C14.737 25.4621 14.6809 25.6561 14.5753 25.8237C14.4697 25.9913 14.319 26.1257 14.1404 26.2114C13.9619 26.2972 13.7627 26.3308 13.5659 26.3085C13.3691 26.2861 13.1826 26.2087 13.0278 26.0851L8.0529 22.106H3.15801C2.87883 22.106 2.61108 21.9951 2.41367 21.7977C2.21625 21.6003 2.10535 21.3325 2.10535 21.0534V12.632C2.10535 12.3529 2.21625 12.0851 2.41367 11.8877C2.61108 11.6903 2.87883 11.5794 3.15801 11.5794H8.0529L13.0278 7.6003C13.1827 7.47648 13.3694 7.39893 13.5664 7.37658C13.7635 7.35423 13.9628 7.38799 14.1415 7.47398ZM29.1673 11.8867C29.2653 11.9845 29.3431 12.1007 29.3961 12.2286C29.4492 12.3565 29.4765 12.4936 29.4765 12.632C29.4765 12.7705 29.4492 12.9076 29.3961 13.0355C29.3431 13.1634 29.2653 13.2795 29.1673 13.3773L25.6998 16.8427L29.1673 20.3081C29.3649 20.5057 29.476 20.7738 29.476 21.0534C29.476 21.3329 29.3649 21.601 29.1673 21.7986C28.9696 21.9963 28.7015 22.1073 28.422 22.1073C28.1424 22.1073 27.8743 21.9963 27.6767 21.7986L24.2113 18.3312L20.7459 21.7986C20.5483 21.9963 20.2802 22.1073 20.0007 22.1073C19.7211 22.1073 19.453 21.9963 19.2554 21.7986C19.0577 21.601 18.9467 21.3329 18.9467 21.0534C18.9467 20.7738 19.0577 20.5057 19.2554 20.3081L22.7228 16.8427L19.2554 13.3773C19.1575 13.2794 19.0799 13.1633 19.0269 13.0354C18.9739 12.9075 18.9467 12.7704 18.9467 12.632C18.9467 12.4936 18.9739 12.3566 19.0269 12.2287C19.0799 12.1008 19.1575 11.9846 19.2554 11.8867C19.453 11.6891 19.7211 11.578 20.0007 11.578C20.1391 11.578 20.2761 11.6053 20.404 11.6583C20.5319 11.7112 20.6481 11.7889 20.7459 11.8867L24.2113 15.3542L27.6767 11.8867C27.7745 11.7887 27.8906 11.7109 28.0185 11.6579C28.1464 11.6048 28.2835 11.5775 28.422 11.5775C28.5604 11.5775 28.6975 11.6048 28.8254 11.6579C28.9533 11.7109 29.0695 11.7887 29.1673 11.8867Z" fill="white" />
        </svg>
      </div>
      <SortingVisualizer array={array} 
                         currentModifyingIndex={currentModifyingIndex} 
                         currentRightPlaceIndex={currentRightPlaceIndex}
                         currentFinalAnimationIndex={currentFinalAnimationIndex} />
    </div>
  );
}



export default App;
