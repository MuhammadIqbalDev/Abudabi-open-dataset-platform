import * as XLSX from 'xlsx'

export const getNumberOfDaysInYear = (year) => {
  return new Date(year, 1, 29).getDate() === 29 ? 366 : 365
}

export const getNumberOfDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const generateFile = (fileType, filename, data) => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${filename}.${fileType}`);
}

export const numberWithCommas = (x) => {
  if (x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
  }
  return "0";
}


export const validateEmail = (email) => {
  let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
};

export const isStrongPassword = (str, name) => {
  // var regex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{15,30}$/;
  var regex = /^(?=.*\d)\S+$/
  return name ? !str.includes(name) &&  regex.test(str) : regex.test(str)  ;
}

export const isLowerCaseExist = (str) => {
  var regex = /[a-z]/;
  return regex.test(str);
}

export const isUpperCaseExist = (str) => {
  var regex = /[A-Z]/;
  return regex.test(str);
}

export const isDigitExist = (str) => {
  var regex = /^.{15,}$/
  return regex.test(str);
}

export const isSpecialCharExist = (str) => {
  var regex = /^(?=.*[!@#$%^&+=^]).*$/g;
  return regex.test(str);
}

export const isMaximumLengthExist = (str) => {
  var regex = /^.{30,30}$/
  return regex.test(str)
}

// export const isUsernameExist = (username, str) => {
//   console.log("s=====>", username, str);
//   var regex = new RegExp("(?!.*" + username + ")");
//   return regex.test(str)
// }

export const getBreakpoint = () => {
  return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '');
};

export const getUnixTime = (date) => {
  return parseInt((new Date(date).getTime() / 1000).toFixed(0))
}

export const getYears = () => {
  let years = []
  let start_year = 2020
  let end_year = new Date().getFullYear()

  for (let i = start_year; i <= end_year; i++) {
    years.push(i)
  }

  return years;

}

export const isEmptyString = (str) => {
  return str.trim() === '';
}

export const isDuplicates = (arr) => arr?.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.title === value.title
  ))
)


export const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "b" },
    { value: 1e12, symbol: "t" },
    { value: 1e15, symbol: "p" },
    { value: 1e18, symbol: "e" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
