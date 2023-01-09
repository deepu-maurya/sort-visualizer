var bars_container = document.getElementById("bars_container");
let randomize_array = document.getElementById("randomize_array_btn");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let QuickSort = document.getElementById("QuickSort");
let HeapSort = document.getElementById("HeapSort");
let MergeSort = document.getElementById("MergeSort");
let heightMagnify = 2;
let speedFactor = 100;
let numOfBars = slider.value;

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
  console.log(speedFactor);
});

var array = new Array(numOfBars);
function randomNum() {
  return Math.floor(Math.random() * 100 + 30);
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum();
  }
  return array;
}
function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightMagnify + "px";
    bar.innerText = array[i];
    bars_container.appendChild(bar);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  array = createRandomArray();
  renderBars(array);
});
slider.addEventListener("input", function () {
  numOfBars = slider.value;
  bars_container.innerHTML = "";
  array = createRandomArray();
  renderBars(array);
});
randomize_array.addEventListener("click", function () {
  array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//swap function
async function swap(items, leftIndex, rightIndex, bars) {
  if (leftIndex == rightIndex) {
    return;
  }
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightMagnify + "px";
  bars[leftIndex].style.backgroundColor = "lightgreen";
  bars[leftIndex].innerText = items[leftIndex];
  bars[rightIndex].style.height = items[rightIndex] * heightMagnify + "px";
  bars[rightIndex].style.backgroundColor = "lightgreen";
  bars[rightIndex].innerText = items[rightIndex];
  await sleep(speedFactor);
}

function Disable_All() {
  randomize_array.disabled = true;
  let x = document.getElementsByTagName("input");
  for (let i = 0; i < x.length; i++) x[i].disabled = true;
  // return parseInt(document.getElementById("delay").value);
}

function Finished() {
  let x = document.getElementsByClassName("bar");
  for (let i = 0; i < x.length; i++) x[i].style.backgroundColor = "cyan";
  randomize_array.disabled = false;
  x = document.getElementsByTagName("input");
  for (let i = 0; i < x.length; i++) x[i].disabled = false;
}

async function BubbleSort() {
  Disable_All();
  let counter = 0;
  while (counter != array.length) {
    let bars = document
      .getElementById("bars_container")
      .querySelectorAll("div");
    for (let i = 0; i < array.length - counter - 1; i++) {
      if (array[i] > array[i + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== i && k !== i + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        swap(array, i, i + 1, bars);
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
    counter++;
  }
  Finished();
}

//write insertion sort function
async function InsertionSort() {
  Disable_All();
  let bars = document.getElementById("bars_container").querySelectorAll("div");

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightMagnify + "px";
      bars[j + 1].style.backgroundColor = "red";
      bars[j + 1].innerText = array[j + 1];
      await sleep(speedFactor);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightMagnify + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
    bars[j + 1].innerText = array[j + 1];
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }
  // return array;
  Finished();
}

// //quicksort

async function partition(items, left, right) {
  let bars = document.getElementById("bars_container").querySelectorAll("div");
  // let pivotIndex = Math.floor((right + left) / 2);
  // var pivot = items[pivotIndex]; //middle element
  var pivot = items[left];

  let cnt = 0;
  for (let i = left + 1; i <= right; i++) {
    if (items[i] <= pivot) {
      cnt++;
    }
  }

  //place pivot at right position
  var pivotIndex = left + cnt;
  bars[pivotIndex].style.backgroundColor = "red";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "aqua";
    }
  }
  await swap(items, left, pivotIndex, bars);

  //left and right wala part smbhal lete h
  let i = left;
  let j = right;

  while (i < pivotIndex && j > pivotIndex) {
    while (items[i] <= pivot) {
      i = i + 1;
    }

    while (items[j] > pivot) {
      j = j - 1;
    }

    if (i < pivotIndex && j > pivotIndex) {
      // swap(items[i++], items[j--]);
      await swap(items, i, j, bars);
      i = i + 1;
      j = j - 1;
    }
  }
  await sleep(speedFactor);
  return pivotIndex;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementById("bars_container").querySelectorAll("div");
  //base case
  if (left >= right) {
    return;
  }

  index = await partition(items, left, right); //index returned from partition

  await quickSort(items, left, index - 1);

  await quickSort(items, index + 1, right);

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "aqua";
  }
  return items;
}

QuickSort.addEventListener("click", async function () {
  await Disable_All();
  await quickSort(array, 0, array.length - 1);
  await Finished();
});

//write heap sort function
async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function HeapSort1(array) {
  let bars = document.getElementsByClassName("bar");
  //n/2 se pahele ke sb leave hae wo already heap hae
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  // for (let i = array.length - 1; i >= 0; i--) {
  //   await heapify(array, array.length, i);
  // }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }
  return array;
}

HeapSort.addEventListener("click", async function () {
  await Disable_All();
  await HeapSort1(array);
  await Finished();
});

async function merge(ele, low, mid, high) {
  const n1 = mid - low + 1;
  const n2 = high - mid;
  let left = new Array(n1);
  let right = new Array(n2);

  for (let i = 0; i < n1; i++) {
    await sleep(speedFactor);
    ele[low + i].style.background = "orange";
    left[i] = parseInt(ele[low + i].innerText);
  }
  for (let i = 0; i < n2; i++) {
    await sleep(speedFactor);
    ele[mid + 1 + i].style.background = "orange";
    right[i] = parseInt(ele[mid + 1 + i].innerText);
  }
  await sleep(speedFactor);
  let i = 0,
    j = 0,
    k = low;
  while (i < n1 && j < n2) {
    await sleep(speedFactor);
    if (parseInt(left[i]) <= parseInt(right[j])) {
      ele[k].style.height = left[i] * heightMagnify + "px";
      ele[k].innerText = left[i];
      i++;
      k++;
    } else {
      ele[k].style.height = right[j] * heightMagnify + "px";
      ele[k].innerText = right[j];
      j++;
      k++;
    }
  }
  while (i < n1) {
    await sleep(speedFactor);
    ele[k].style.height = left[i] * heightMagnify + "px";
    ele[k].innerText = left[i];
    i++;
    k++;
  }
  while (j < n2) {
    await sleep(speedFactor);
    ele[k].style.height = right[j] * heightMagnify + "px";
    ele[k].innerText = right[j];
    j++;
    k++;
  }
  for (let i = low; i <= high; i++) {
    ele[i].style.background = "green";
  }
}

async function mergeSort(ele, l, r) {
  if (l >= r) {
    //sorting complete
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  await mergeSort(ele, l, m);
  await mergeSort(ele, m + 1, r);
  await merge(ele, l, m, r);
}

MergeSort.addEventListener("click", async function () {
  await Disable_All();
  let bars = document.getElementById("bars_container").querySelectorAll("div");
  let l = 0;
  let r = parseInt(bars.length) - 1;
  console.log(r);
  await mergeSort(bars, l, r);
  await Finished();
});

//Selection sort

async function SelectionSort() {
  await Disable_All();
  let bars = document.getElementById("bars_container").querySelectorAll("div");
  console.log(bars);
  for (let i = 0; i < array.length - 1; i++) {
    let min1 = 1000;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < min1) {
        min1 = array[j];
      }
    }

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] === min1 && array[j] < array[i]) {
        swap(array, i, j, bars);
        await sleep(speedFactor);
      }
    }
  }
  await Finished();
}
