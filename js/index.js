window.onload = function () {
    searchEffect();
    timeBack();
    bannerEffect();
}
//头部search js
function searchEffect() {
    // 头部搜索块js
    // 1.获取当前banner的高度
    // console.log(1);
    let banner = document.querySelector('.jd_banner');
    let bannerHeight = banner.offsetHeight;
    // console.log(bannerHeight);
    let search = document.querySelector('.jd_search');
    // 2.获取当前屏幕滚动时，banner滚动出屏幕的距离
    window.onscroll = function () {
        let offsetTop = document.documentElement.scrollTop ;
        // console.log(offsetTop);
        let opacity = 0;
        opacity = offsetTop / bannerHeight;
        // console.log(2);
        if (opacity < 1) {
            search.style.backgroundColor = "rgba(233,35,34,"+opacity+")";
            // console.log(1);
        }
    }
    // 3.计算比例值，获取透明度，设置当前北京颜色的样式
}

//倒计时
function timeBack() {
    let spans = document.querySelector('.jd_sk_time').querySelectorAll('span');
    let totalTime = 10000 ;
    let timerId =setInterval(function () {
        totalTime--;
        if (totalTime < 0){
            clearInterval(timerId);
            return;
        }
        let hour = Math.floor(totalTime / 3600);
        let minute = Math.floor(totalTime % 3600 / 60);
        let second = Math.floor(totalTime% 60 );
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = Math.floor(minute % 10);
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);

    },1000)
}

//轮播图

function bannerEffect() {
    //1.设置修改轮播图的页面结构
    //a.在开始位置添加原始的最后一张图
    //b.在结束位置添加原始的第一张图片
    let banner = document.querySelector('.jd_banner');
    let imgBox = document.querySelector('ul:first-of-type');
    let first = imgBox.querySelector('li:first-of-type');
    let last = imgBox.querySelector('li:last-of-type');
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
    //设置对应的样式
    let lis = imgBox.querySelectorAll('li');
    let count = lis.length;
    let bannerWidth = banner.offsetWidth;
    imgBox.style.width = count * bannerWidth + 'px';
    for (let i = 0; i < count; i++){
        lis[i].style.width = bannerWidth + 'px';
        // lis[i].setAttribute('index',i);
    }
    //定义图片索引
    let indexs = 1;

    imgBox.style.left = -bannerWidth + 'px';

    window.onresize = function () {
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count * bannerWidth + 'px';
        for (let i = 0; i < count; i++){
            lis[i].style.width = bannerWidth + 'px';
        }
        imgBox.style.left = -bannerWidth * indexs + 'px';
    }
    let setIndicator = function (index) {
        let indicators = document.querySelector("ul:last-of-type").querySelectorAll('li');
        for (let i = 0; i < indicators.length; i++){
            indicators[i].classList.remove('active');
        }
        // if (index === count -1){
        //     index = 1;
        // }else if (index === 0){
        //     index = count - 2;
        // }
        indicators[index-1].classList.add('active');
    }
    let timerId;
    let startTime = function () {
        timerId = setInterval(function () {
            indexs++;
            //添加过度效果
            imgBox.style.transition = "left 1s ease-in-out";
            imgBox.style.left = -bannerWidth * indexs + 'px';

            // setInterval(function () {
            //     if (indexs === count - 1 ){
            //         indexs = 1;
            //         imgBox.style.transition= 'none';
            //         imgBox.style.left = -bannerWidth * indexs + 'px';
            //     }
            //     if (indexs === 0){
            //         indexs = count - 2;
            //         imgBox.style.transition= 'none';
            //         imgBox.style.left = -bannerWidth * indexs + 'px';
            //     }
            // },1000)

        },2000)
    }
    startTime();

    let startX,moveX,distanceX;

    let isEnd = true;
    imgBox.addEventListener("touchstart",function (e) {
        clearInterval(timerId);
        imgBox.style.transition= 'none';
        startX = e.targetTouches[0].clientX;
    })

    imgBox.addEventListener("touchmove",function (el) {
       if (isEnd === true){
           moveX = el.targetTouches[0].clientX;
           distanceX = moveX - startX;
           imgBox.style.left = -bannerWidth * indexs + distanceX + 'px';
       }
    })


    imgBox.addEventListener("touchend",function (ev) {
        //获取当前滑动的距离，判断距离是否超出指定的范围 100px
        isEnd = false;
        if (Math.abs(distanceX) > 100){
            if (distanceX > 0){
                indexs--
            } else {
                indexs++
            }
            imgBox.style.transition = "left 1s ease-in-out";
            imgBox.style.left = - bannerWidth * indexs + 'px';
        }else if (Math.abs(distanceX) > 0) {
            imgBox.style.transition = "left 1s ease-in-out";
            imgBox.style.left = - bannerWidth * indexs + 'px';
        }
        // startX = 0;
        // moveX = 0;
        // distanceX = 0;
        startTime();
    })

    imgBox.addEventListener("webkitTransitionEnd",function () {
        if (indexs === count - 1 ){
            indexs = 1;
            imgBox.style.transition= 'none';
            imgBox.style.left = -bannerWidth * indexs + 'px';
        }else if (indexs === 0){
            indexs = count - 2;
            imgBox.style.transition= 'none';
            imgBox.style.left = -bannerWidth * indexs + 'px';
        }
        setIndicator(indexs);
        isEnd = true;
            // startTime();
    })
}



