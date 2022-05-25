const url = 'https://shannon945.github.io/farm_produce/data.json';
let data = [];
let filterData = [];
const name = document.querySelector('#js-crop-name');
const showList = document.querySelector('.showList');
function init() {
  axios
    .get(url)
    .then(function(response) {
      data = response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}
init();

// 資料渲染
function render(arr) {
  let str = '';
  arr.forEach(i => {
    str += `<tr>
        <td>${i.作物名稱}</td>
        <td>${i.市場名稱}</td>
        <td>${i.上價}</td>
        <td>${i.中價}</td>
        <td>${i.下價}</td>
        <td>${i.平均價}</td>
        <td>${i.交易量}</td>
        </tr>`;
  });
  showList.innerHTML = str;
}

//資料篩選
const btnGroup = document.querySelector('.button-group');
btnGroup.addEventListener('click', dataFilter);
const btn = document.querySelectorAll('.btn');

function dataFilter(e) {
  //btn 樣式
  if (e.target.nodeName === 'BUTTON') {
    btn.forEach(i => {
      i.classList.remove('active');
    });
    e.target.classList.add('active');
    //tab資料篩選
    const get = e.target.getAttribute('data-type');

    if (get == 'N05') {
      filterData = data.filter(i => i.種類代碼 == 'N05');
    } else if (get == 'N04') {
      filterData = data.filter(i => i.種類代碼 == 'N04');
    } else {
      filterData = data.filter(i => i.種類代碼 == 'N06');
    }
    render(filterData);
    name.textContent = '';
    Reset();
  }
}
//清除欄位
function Reset() {
  let inputText = document.querySelector('.name').value;
  inputText.length != 0 ? (inputText = '') : (inputText = inputText);
}

//資料搜尋
const searchData = document.querySelector('.search');
searchData.addEventListener('click', search);

function search() {
  let inputValue = document.querySelector('input.name').value.trim();
  if (inputValue == '') {
    alert('請輸入資料');
    return;
  }
  filterData = data.filter(i => i.作物名稱.match(inputValue));
  //找不到資料
  if (filterData.length == 0) {
    showList.innerHTML = `<tr>
       <td colspan="7" class="text-center p-3">找不到資料</td>
      </tr>`;
  } else {
    name.textContent = `查看「${inputValue}」的搜尋結果`;
    render(filterData);
  }
  restBtn();
}
//清除按鈕樣式
function restBtn() {
  btn.forEach(i => {
    i.classList.remove('active');
  });
}

//表格(排序)
const select = document.querySelector('.js-sort-advanced');

select.addEventListener('click', sort01);
function sort01(e) {
  if (e.target.nodeName == 'I') {
    // 判斷是UP or Down & Price
    let sortStatus = e.target.dataset.sort;
    let sortPrice = e.target.dataset.price;
    if (sortStatus == 'up') {
      // 高到低
      selectUP(sortPrice);
    } else if (sortStatus == 'down') {
      // 低到高
      selectDown(sortPrice);
    }
    render(filterData);
  }
}
// 右側下拉選單(排序)
const dropSelect = document.querySelector('#js-select');
const dropSelectMb = document.querySelector('#js-moblie-select');
dropSelect.addEventListener('change', dropDownSelect);
dropSelectMb.addEventListener('change', dropDownSelect);
function dropDownSelect(e) {
  let targetVal = e.target.value;
  switch (targetVal) {
    case '上價':
      selectDown('上價');

      break;
    case '中價':
      selectDown('中價');
      break;
    case '下價':
      selectDown('下價');
      break;
    case '平均價':
      selectDown('平均價');
      break;
    case '交易量':
      selectDown('交易量');
      break;
  }
}

//價格低到高
function selectDown(val) {
  console.log('低到高');

  filterData.sort((a, b) => {
    return a[val] - b[val];
  });
  render(filterData);
}
//價格高到低

function selectUP(val) {
  console.log('高到低');

  filterData.sort((a, b) => {
    return b[val] - a[val];
  });
  render(filterData);
}
