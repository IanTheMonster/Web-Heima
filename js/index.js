window.addEventListener('load', function () {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var ol = focus.querySelector('ol');
    var ul = focus.querySelector('ul');
    var num = 0;
    var circle = 0;
    var numOflis = focus.querySelectorAll('li').length;
    var timer = setInterval(function () {
        arrow_r.click();
    }, 1000)
    for (var i = 0; i < numOflis; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var j = 0; j < numOflis; j++) {
                ol.children[j].className = '';

            }
            //如果这里是li 不是this,则结束后li已经是第四个了。
            this.className = 'current';
            index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 1000)
    })
    // 3. 点按钮左右移动效果
    var cNode = ul.children[0].cloneNode(true);
    ul.appendChild(cNode);//添加第五张实现轮播图。不管怎么样都是先滑动，再设置。


    arrow_r.addEventListener('click', function () {
        if (num == numOflis) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        for (var i = 0; i < numOflis; i++) {
            ol.children[i].className = '';
        }
        animate(ul, -num * focusWidth);
        circle++;
        if (circle == 4) {
            circle = 0;
        }
        ol.children[circle].className = 'current';

    })
    //4. 实现轮播功能，即点到最右边的时候返回第一张

    //5.左侧按钮
    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            //要从第一张图跑到第五张，ul列表要往左跑，变成负值。
            ul.style.left = -numOflis * focusWidth + 'px';
            num = 4;
        }
        num--;
        animate(ul, -num * focusWidth);
        for (var i = 0; i < numOflis; i++) {
            ol.children[i].className = '';
        }
        circle--;
        if (circle < 0) {
            circle = 3;
        }
        ol.children[circle].className = 'current';

    })

    focus.addEventListener('mouseover', function () {
        clearInterval(timer);
    })
})