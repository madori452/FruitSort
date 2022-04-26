const url = 'https://shannon945.github.io/farm_produce/data.json';
let data = [];
const showList = document.querySelector('.showList');
function init() {
  axios
    .get(url)
    .then(function(response) {
      data = response.data;
      render();
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

function dataFilter(e) {
  e.preventDefault;
  //btn 樣式
  const btn = document.querySelectorAll('.btn');
  btn.forEach(i => {
    i.classList.remove('active');
  });
  e.target.classList.add('active');
  //tab資料篩選
  let filterData = [];
  const get = e.target.getAttribute('data-type');
  if (get == 'N05') {
    filterData = data.filter(i => i.種類代碼 == 'N05');
    console.log(filterData);
  } else if (get == 'N04') {
    filterData = data.filter(i => i.種類代碼 == 'N04');
    console.log(filterData);
  } else {
    filterData = data.filter(i => i.種類代碼 == 'N06');
    console.log(filterData);
  }
  render(filterData);
}

//資料搜尋
const searchData = document.querySelector('.search');
searchData.addEventListener('click', search);
function search() {
  let inputValue = document.querySelector('input.name').value;
  let filterItem = [];
  if (inputValue == '') {
    alert('請輸入資料');
    return;
  }
  filterItem = data.filter(i => i.作物名稱.match(inputValue));
  //找不到資料
  if (filterItem.length == 0) {
    showList.innerHTML = `<tr>
       <td colspan="7" class="text-center p-3">找不到資料</td>
      </tr>`;
  } else {
    render(filterItem);
  }
}

//資料進階排序
const select = document.querySelector('.js-sort-advanced');

select.addEventListener('click', sort01);
function sort01(e) {
  if (e.target.nodeName == 'I') {
    // 判斷是UP or Down & Price
    let sortStatus = e.target.dataset.sort;
    let sortPrice = e.target.dataset.price;
    if (sortStatus == 'up') {
      // 大到小
      data.sort((a, b) => {
        return b[sortPrice] - a[sortPrice];
      });
    } else if (sortStatus == 'down') {
      // 小到大
      data.sort((a, b) => {
        return a[sortPrice] - b[sortPrice];
      });
    }
    render(data);
  }
}
// select
const dropSelect = document.querySelector('#js-select');
dropSelect.addEventListener('change', dropDownSelect);

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
function selectDown(val) {
  data.sort((a, b) => {
    return a[val] - b[val];
  });
  render(data);
}
