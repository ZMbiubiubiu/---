// 页面打开时的时刻
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth();

window.onload = function() {
  // show the present month
  var presentMonth = monthGenerate(year, month);
  presentMonth.setAttribute("id","presentMonth");
  var days = document.getElementById("days");
  days.appendChild(presentMonth);

  // turn up to go to the last month
  var up = document.getElementById("up");
  up.onclick = changeLastMonth;
  // turn down to go to the next month
  var down = document.getElementById("down");
  down.onclick = changeNextMonth;

  // jump to the date you want
  // var display = document.getElementById("display");
  // display.onclick = changeTo;
  var timer =setInterval(displayTimeAndDate,1000) ;
}

// 
function monthGenerate(thisyear, thismonth) {
  // 初始化newMonth，它代表这个月的格子容器。每一天都是一个div格子
  var newMonth = document.createElement("div");
  // 检查是不是当前的月份 (如果是的话，就要为代表今天的div加上today的class)
  var pos = ((new Date()).getFullYear() === thisyear && (new Date()).getMonth() === thismonth)?1:0;
  // 算出该月的天数
  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (this % 4 === 0) monthDays.splice(1,1,29);
  var presentMonthDays = monthDays[thismonth];
  // 算出该月1号是星期几
  var firstDay = new Date(Date.UTC(thisyear, thismonth, 1));
  var onWhatDay = firstDay.getDay();

  // 创建该月1号前的div格子，填上上个月的最后几天。设置class为inactive
  // 坑爹的是Date的月份是从0到11的。
  var mon = thismonth - 1;
  if (mon<0) mon = 11;
  var lastMonthDays = monthDays[mon];
  for (let i=0; i<onWhatDay; i++) {
    var div = document.createElement("div");
    div.className = "inactive";
    div.innerHTML = lastMonthDays - onWhatDay + 1 + i;
    div.onclick = changeLastMonth;
    newMonth.appendChild(div);
  }
  // 创建该月的所有天数的格子。设置class为active
  for (let i=0; i<presentMonthDays; i++) {
    let div = document.createElement("div");
    div.className = "acitve";
    div.innerHTML = (i+1);
    if (pos === 1 && (i+1) === (new Date()).getDate()) {
      div.setAttribute("id","today")
    };
    newMonth.appendChild(div);
  };

  // 在月末补充完整
  var restDays = (42 - onWhatDay - presentMonthDays);
  for (let i=0; i<restDays; i++) {
    let div = document.createElement("div");
    div.className = "inactive";
    div.innerHTML = (i+1);
    div.onclick = changeNextMonth;
    newMonth.appendChild(div);
  }

  // #display 模块
  var display = document.getElementById("display");
  display.innerHTML = `${thisyear}年${thismonth+1}月`;
  display.onclick = changeTo;
  // 此函数的返回值
  return newMonth;
}


// 切换上个月份
function changeLastMonth() {
  if (month === 0) {
    year = year - 1;
    month = 11;
  } else {
    month = month -1;
  }
  var presentMonth = monthGenerate(year, month);
  presentMonth.setAttribute("id", "presentMonth");
  var days = document.getElementById("days");
  days.innerHTML = "";
  days.appendChild(presentMonth);
}
// 切换下个月份
function changeNextMonth() {
  if (month === 11) {
    year = year+1;
    month = 0;
  } else {
    month = month + 1;
  }
  var presentMonth = monthGenerate(year, month);
  presentMonth.setAttribute("id", "presentMonth");

  var days = document.getElementById("days");
  days.innerHTML = "";
  days.appendChild(presentMonth);
}
// 调转日期
// 显示的是跳转时刻！
function changeTo() {
  // alert("jump")
  var display = document.getElementById("display");
  display.onclick = null; // 这时你点了没事
  display.innerHTML = `<form id="form">跳转到<input type="number" id="year" min="1970" max="2100" required></input>年<input type="number" id="month" min="1" max="12" required></input>月 <input type="submit" value="确定"></form>`
  var form = document.getElementById("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var container = document.getElementById("container");
    container.innerHTML = "";
    var presentMonth = monthGenerate(+form.elements[0].value, +form.elements[1].value-1);
    presentMonth.setAttribute("id", "presentMonth");
    container.appendChild(presentMonth);
  },false);
}

// 展示#time 和 #date模块
// 显示的是本地的实时时刻
function standardDoubleDigits(number) {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}
function displayTimeAndDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var dateday = now.getDate();
  var day = now.getDay();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  minute = standardDoubleDigits(minute);
  second = standardDoubleDigits(second);
  // 找到展示区域
  var time = document.getElementById("time");
  var date = document.getElementById("date");
  // 开始展示
  var week = ["日", "一", "二", "三", "四", "五", "六", ];
  time.innerHTML = `${hour}:${minute}:${second}`;
  date.innerHTML = `${year}年${month+1}月${dateday}日,星期${week[day]}`;
  
}