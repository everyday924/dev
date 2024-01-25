/** 全屏事件 */
export function toggleFullScreen() {
    const elem = document.documentElement; // 获取文档根元素
    if (!document.fullscreenElement && // 当前不在全屏模式
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {  // 也适用于IE/Edge
        if (elem.requestFullscreen) {
        elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
        }
    } else { // 当前在全屏模式，退出全屏
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
        }
    }
}


// 数组去重
export function newSet(arr:[], key:String) {
    const uniqueArr = [];
    arr.forEach(item => {
      if (!uniqueArr.some(i => i[key] === item[key])) {
        uniqueArr.push(item);
      }
    });
    return uniqueArr
  }
  
  // 判断对象数组中是否包含另一个对象
export function deepEqual(obj1:object, obj2:object) {
    if (obj1 === obj2) {
      return true;
    }
    if (typeof obj1 !== typeof obj2) {
      return false;
    }
    if (typeof obj1 !== 'object') {
      return obj1 === obj2;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }
  