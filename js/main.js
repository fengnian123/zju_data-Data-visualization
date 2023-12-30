// myScript.js

// 获取模式切换按钮的引用
var modeSwitch = document.getElementById("modeSwitch");
// 添加事件监听器来处理切换模式的逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 根据需要选择初始化的函数
  showDatabaseContent(); // 如果你希望页面加载时显示自动模式
  // 或者
  // hideDatabaseContent(); // 如果你希望页面加载时显示手动模式
});
modeSwitch.addEventListener("change", function () {
  if (this.checked) {
    // 切换到自动模式
    hideDatabaseContent();
  } else {
    // 切换到手动输入模式
    showDatabaseContent();
  }
});
var seatContainer = document.getElementById("seat-container");
var dialogContainer = document.getElementById("dialog-container");
// 定义切换到自动模式时的操作
function showDatabaseContent() {
  // TODO: 显示数据库中的内容
  seatContainer.innerHTML = "";
  dialogContainer.innerHTML = "";
  var databaseData = generateRandomSeatData(); // 获取随机生成的座位数据
  var occupiedSeats = databaseData.split(',');

  for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= 19; j++) {
      var seatId = i + "-" + j;
      var button = document.createElement("button");
      button.textContent = seatId;
      button.addEventListener("click", toggleSeatStatus);
      if (occupiedSeats.includes(seatId)) {
        button.classList.add("occupied");
      }
      seatContainer.appendChild(button);

      if (j === 5 || j === 14) {
        var spacer = document.createElement("div");
        spacer.classList.add("spacer");
        seatContainer.appendChild(spacer);
      }
    }
  }
}

// 定义切换到手动输入模式时的操作
function hideDatabaseContent() {
  // TODO: 手动输入数据
  // 根据需要，可以使用style.display = "none" 或者其他方法隐藏相关元素
  seatContainer.innerHTML = "";
  dialogContainer.innerHTML = "";
  for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= 19; j++) {
      var button = document.createElement("button");
      button.textContent = i + "-" + j;
      button.addEventListener("click", toggleSeatStatus);
      seatContainer.appendChild(button);

      if ((j === 5) || (j === 14)) {
        var spacer = document.createElement("div");
        spacer.classList.add("spacer");
        seatContainer.appendChild(spacer);
      }
    }
  }

  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = "输入占座信息 ( 示例: 1-10,10-3,2-8 )";
  input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      handleInput();
    }
  });

  dialogContainer.appendChild(input);

  function handleInput() {
    var inputValue = input.value;
    var possitions = inputValue.split(",");
    for (var i = 0; i < possitions.length; i++) {
      var pos = possitions[i].split("-");
      var row = parseInt(pos[0], 10);
      var col = parseInt(pos[1], 10);
      var seatButton = containsText(possitions[i]);
      if (seatButton) {
        seatButton.classList.add("occupied");
      }
    }
  }

  function containsText(text) {
    var buttons = document.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent.includes(text)) {
        return buttons[i];
      }
    }
    return null;
  }

  function toggleSeatStatus() {
    this.classList.toggle("occupied");
  }

  var mondayRadio = document.querySelector('input[name="weekday"][value="8:00 ~ 9:35"]');
  var tuesdayRadio = document.querySelector('input[name="weekday"][value="10:00 ~ 12:25"]');
  var wednesdayRadio = document.querySelector('input[name="weekday"][value="13:25 ~ 15:50"]');
  var thursdayRadio = document.querySelector('input[name="weekday"][value="16:15 ~ 17:50"]');
  var fridayRadio = document.querySelector('input[name="weekday"][value="18:50 ~ 21:15"]');

  var selectedDayInput = document.getElementById("selectedDay");

  mondayRadio.addEventListener("change", updateSelectedDay);
  tuesdayRadio.addEventListener("change", updateSelectedDay);
  wednesdayRadio.addEventListener("change", updateSelectedDay);
  thursdayRadio.addEventListener("change", updateSelectedDay);
  fridayRadio.addEventListener("change", updateSelectedDay);

  var mathRadio = document.querySelector('input[name="course"][value="数学分析"]');
  var linearAlgebraRadio = document.querySelector('input[name="course"][value="线性代数"]');
  var probabilityRadio = document.querySelector('input[name="course"][value="概率论"]');

  var selectedCourseInput = document.getElementById("selectedCourse");

  mathRadio.addEventListener("change", updateSelectedCourse);
  linearAlgebraRadio.addEventListener("change", updateSelectedCourse);
  probabilityRadio.addEventListener("change", updateSelectedCourse);

  function updateSelectedCourse() {
    if (mathRadio.checked) {
      selectedCourseInput.value = "数学分析";
    } else if (linearAlgebraRadio.checked) {
      selectedCourseInput.value = "线性代数";
    } else if (probabilityRadio.checked) {
      selectedCourseInput.value = "概率论";
    }
  }


  function updateSelectedDay() {
    //store all red possitions here
    var selectedDay = "";

    if (mondayRadio.checked) {
      selectedDay = mondayRadio.value;
    } else if (tuesdayRadio.checked) {
      selectedDay = tuesdayRadio.value;
    } else if (wednesdayRadio.checked) {
      selectedDay = wednesdayRadio.value;
    } else if (thursdayRadio.checked) {
      selectedDay = thursdayRadio.value;
    } else if (fridayRadio.checked) {
      selectedDay = fridayRadio.value;
    }

    selectedDayInput.value = selectedDay;
  }
}

function generateRandomSeatData() {
  // var size = Math.random();
  // while(size > 15){
  //   size = Math.random();
  // }
  var randomData = [];
  for (var i = 0; i < 20; i++) {
    var row = Math.floor(Math.random() * 10) + 1;
    var col = Math.floor(Math.random() * 19) + 1;
    randomData.push(row + '-' + col);
  }
  return randomData.join(',');
}

function containsText(text) {
  var buttons = document.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent === text) {
      return buttons[i];
    }
  }
  return null;
}

function toggleSeatStatus() {
  this.classList.toggle("occupied");
}
