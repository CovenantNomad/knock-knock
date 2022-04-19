import * as MediaLibrary from 'expo-media-library';


export const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const getBlob = async (uri) => {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      resolve(xhr.response)
    }

    xhr.onerror = () => {
      reject(new TypeError("Network request failed."))
    }

    xhr.responseType = "blob";
    xhr.open("GET", uri, true)
    xhr.send(null)
  })
}

export const getpermissions = async () => {
  const { accessPrivileges, canAskAgain } = await MediaLibrary.getPermissionsAsync();

  if (accessPrivileges === "none" && canAskAgain) {
    const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync()

    return accessPrivileges
  }
}

export function getDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

export function converStrDate(dateFormat) {
  dateFormat.split("-")
  return `${dateFormat.split("-")[1]}월 ${dateFormat.split("-")[2]}일`
}

export function convertAmPm(hour) {
  return hour >= 12 ? '오후' : '오전'
}

export function convert12hour(hour) {
  return hour >= 12 ? hour-12 : hour
}

export function convertDay(date) {
  const days = ['일', '월', '화', '수', '목', '금', '토']

  return days[date]
}

export function getMondayDate(d) {
  var paramDate = new Date(d);

  var day = paramDate.getDay();
  var diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
  paramDate.setDate(diff);
  paramDate.setUTCHours(0,0,0,0);
  return new Date(paramDate);
}

export function getSundayDate(d) {
  var paramDate = new Date(d);

  var day = paramDate.getDay();
  var diff = paramDate.getDate() - day + (day == 0 ? 0 : 7);
  paramDate.setDate(diff);
  paramDate.setUTCHours(23,59,59,999);
  return new Date(paramDate);
}

export function weekNumberByMonth(inputDate) {
  // const inputDate = new Date(dateFormat);
 
  // 인풋의 년, 월
  let year = inputDate.getFullYear();
  let month = inputDate.getMonth() + 1;
 
  // 목요일 기준 주차 구하기
  const weekNumberByThurFnc = (paramDate) => {
 
    const year = paramDate.getFullYear();
    const month = paramDate.getMonth();
    const date = paramDate.getDate();
 
    // 인풋한 달의 첫 날과 마지막 날의 요일
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month+1, 0);
    const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
    const lastDayOfweek = lastDate.getDay();
 
    // 인풋한 달의 마지막 일
    const lastDay = lastDate.getDate();
 
    // 첫 날의 요일이 금, 토, 일요일 이라면 true
    const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
    // 마지막 날의 요일이 월, 화, 수라면 true
    const lastWeekCheck = lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;
 
    // 해당 달이 총 몇주까지 있는지
    const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);
 
    // 날짜 기준으로 몇주차 인지
    let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);
 
    // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
    if(weekNo === 1 && firstWeekCheck) weekNo = 'prev';
    // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
    else if(weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next';
    // 인풋한 날짜의 첫 주는 아니지만 첫날이 월, 화 수로 시작하면 -1;
    else if(firstWeekCheck) weekNo = weekNo -1;
 
    return weekNo;
  };
 
  // 목요일 기준의 주차
  let weekNo = weekNumberByThurFnc(inputDate);
 
  // 이전달의 마지막 주차일 떄
  if(weekNo === 'prev') {
    // 이전 달의 마지막날
    const afterDate = new Date(year, month-1, 0);
    year = month === 1 ? year - 1 : year;
    month = month === 1 ? 12 : month - 1;
    weekNo = weekNumberByThurFnc(afterDate);
  }
  // 다음달의 첫 주차일 때
  if(weekNo === 'next') {
    year = month === 12 ? year + 1 : year;
    month = month === 12 ? 1 : month + 1;
    weekNo = 1;
  }
 
  return { year, month, weekNo };
}

export const seperateWeekly = ( weekNo, monthlyList, setList ) => {
  let temp = []
  for (weekNo; weekNo > 0; weekNo--) {
    let tempList = monthlyList?.filter(item => item.weekNo === weekNo)
    temp.push({
      id: weekNo,
      data: tempList
    })
  }
  setList(temp)
}