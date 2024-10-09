


// 固定导航栏
const headerEl = document.querySelector('header')
// 返回顶部按钮
const scrolllToTop = document.querySelector('.scrollTotop')

window.addEventListener('scroll', () => {
    // getBoundingClientRect 是DOM元素的一个方法，返回一个DOMRect对象，包含元素的大小及其相对于视口的位置。
    //  该对象有6个属性：top,lef,right,bottom,width,height；
    let height = headerEl.getBoundingClientRect().height

    if (window.pageYOffset - height > 800) {
        if (!headerEl.classList.contains('sticky')) {
            headerEl.classList.add('sticky')
        }
    } else {
        headerEl.classList.remove('sticky')
    }

    if (window.pageYOffset > 2000) {
        scrolllToTop.style.display = "block"
    } else {
        scrolllToTop.style.display = 'none'
    }
})



const glide = new Glide('.glide')

const captionsEl = document.querySelectorAll('.slide-caption')

glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEl[glide.index]
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: 'linear',
        delay: anime.stagger(400, { start: 300 }),
        translateY: [anime.stagger([40, 10]), 0]
    })
})

glide.on("run.before", () => {
    document.querySelectorAll('.slide-caption > *').forEach(el => {
        el.computedStyleMap.opacity = 0;
    })
})

glide.mount();


const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: '.case-item'
})

const filterBtns = document.querySelector(".filter-btns")

filterBtns.addEventListener('click', e => {
    let { target } = e
    const filterOption = target.getAttribute('data-filter')
    if (filterOption) {
        document.querySelectorAll('.filter-btn.active').forEach(btn => btn.classList.remove('active'))
        target.classList.add('active')

        isotope.arrange({ filter: filterOption })
    }
})

// 使用 ScrollReveal 库
// 让关于我们，服务流程卡片有渐入动画
const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: 'bottom',
}
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 })

ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 })

// 数据部分 背景视差
const dataSectionEl = document.querySelector('.data-section')
// 数据部分
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0, el.innerHTML];
            },
            duration: 2000,
            round: 1,
            easing: "easeInExpo"
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
    }
})

// 数据部分 背景视差
window.addEventListener('scroll', () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    // innerHeight 浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。
    // 判断元素是否在视口区域内
    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
    }
})


// 使用smooth-scroll库，进行点击跳转动画
const scroll = new SmoothScroll('nav a[href*="#"], .scrollTotop a[href*="#"]', {
    header: "header",
    offset: 80
})

// 打开导航栏时，跳转关闭
document.addEventListener('scrollStart', () => {
    if (headerEl.classList.contains('open')) {
        headerEl.classList.remove('open')
    }
})


// 探索更多按钮点击跳转
const exploreBtnEls = document.querySelectorAll('.explore-btn')

exploreBtnEls.forEach(exploreBtn => {
    exploreBtn.addEventListener('click', () => {
        scroll.animateScroll(document.querySelector("#about-us"))
    })
})


// 折叠按钮
const burgerEl = document.querySelector('.burger')
burgerEl.addEventListener('click', () => {
    headerEl.classList.toggle('open')
})