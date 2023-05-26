// 获取背景元素对象
var back=document.getElementById('back');
// 绑定鼠标移动事件处理程序
window.onmousemove = function(event){
    // 将鼠标横向位移除以10作为背景图x轴偏移量
    var x=-event.clientX/10;
    // 将鼠标纵向位移除以15作为背景图y轴偏移量
    var y=-event.clientY/15;
    // 改变背景图片在x轴和y轴的偏移量
    back.style.backgroundPositionX = x+"px";
    back.style.backgroundPositionY = y+"px";
}

// // 获取加载动画元素对象
// var con=document.getElementById('con')
// // 隐藏加载动画函数
// function loadoff(){
//     con.style.display="none";
// }
// // 显示加载动画函数
// function loadon(){
//     con.style.display="flex";
// }
// // 页面加载完成后启用的函数
// window.onload=function(){
//     // 显示加载动画
//     loadon();
//     // 延时3秒后隐藏加载动画
//     setTimeout(loadoff,3000);
// }