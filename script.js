const init = threads => {
  for (let i = 0; i < threads; i++) {
    elems[i] = { link: document.createElement('div'), top: 0 };
    elems[i].link.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    elems[i]['left'] = Math.random() * numCols * 20;
    elems[i].link.style.left = elems[i]['left'] + 'px';
    elems[i]['top'] = Math.random() * numRows * 20;
    elems[i].link.style.top = elems[i]['top'] + 'px';
    root.appendChild(elems[i].link);
    setTimeout(() => elems[i].link.classList.add('active'), 20);
  }
};

const addElem = threads => {
  for (let i = 0; i < threads; i++) {
    elems.unshift({ link: document.createElement('div') });
    elems[0].link.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    if (elems[threads]['top'] + 20 < maxHeight) {
      elems[0]['top'] = elems[threads]['top'] + 20;
      elems[0]['left'] = elems[threads]['left'];
    } else {
      elems[0]['top'] = Math.random() * numRows * 20;
      elems[0]['left'] = Math.random() * numCols * 20;
    }
    elems[0].link.style.left = elems[0]['left'] + 'px';
    elems[0].link.style.top = elems[0]['top'] + 'px';

    root.appendChild(elems[0].link);
		console.log('added')
  }
};

const cleanTrash = threads =>
  setInterval(() => {
    for (let i = 0; i < threads; i++) {
      root.removeChild(elems[elems.length - 1].link);
      elems.pop();
      console.log('popped');
    }
  }, 90);

//Init
const root = document.querySelector('.root'),
  numRows = Math.floor(document.documentElement.clientHeight / 20),
  numCols = Math.floor(document.documentElement.clientWidth / 20),
  maxHeight = numRows * 20,
  threads = 33,
  elems = [],
  symbols = [
    '一',
    '人',
    '日',
    '月',
    '水',
    '山',
    '大',
    '小',
    '口',
    '火',
    '男',
    '女',
    '天',
    '牛',
    '马',
    '羊',
    '木',
    '工',
    '开',
    '心',
    '门',
    '不',
    '十',
    '手',
    '王',
    '米',
    '生',
    '中',
    '上',
    '下'
  ];
init(threads);

//New symbol every 0.09 sec
setInterval(() => {
  addElem(threads);
}, 90);

//Trash cleaning after 1.2 sec
setTimeout(() => {
  cleanTrash(threads);
}, 1200);
