$('.mob-btn').on('click', function() {
  $('.main-nav').toggleClass('open');
  $('.overlay').toggleClass('show');
});


const getBTTElm = document.getElementById('back-to-top');
document.addEventListener('scroll', ev => {
    if (window.scrollY > 150) {
        getBTTElm.classList.add('visible');
    } else {
        getBTTElm.classList.remove('visible');
    }
});
getBTTElm.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

// menu function

const getBtn = document.querySelector('.mob-btn');
getBtn.addEventListener('click', e => {
    document.querySelector('body').classList.toggle('show-menu');
})


const getDropDown = document.getElementsByClassName('main-nav');
for (div of getDropDown) {
    var selectLi = div.getElementsByTagName('li');
    for (li of selectLi) {
        if (li.contains(li.querySelector('ul'))) {
            li.classList.add('submenu');
            li.innerHTML += "<i></i>";
        }
    }
}

const getDropDownClick = document.querySelectorAll('.main-nav i');
getDropDownClick.forEach((item) => {
    item.addEventListener('click', e => {
        e.target.parentNode.classList.toggle('open');
    })
})

//animation
// just "anim" in your element
window.addEventListener("load", () => {
    function isInViewport(el, gap) {
        let top = el.offsetTop;
        let left = el.offsetLeft;
        let height = el.offsetHeight;
        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }
        return (
            (window.pageYOffset + window.innerHeight - gap) >= (top) &&
            (window.pageYOffset) <= (height + top)
        );
    }
    let getElem = document.querySelectorAll('[data-anim]');
    //please change as per the design
    const breakPoints = {
        desktop: 250,
        laptop: 80,
        tab: 50,
        mobile: 30
    };
    let targetGap;
    window.innerWidth >= 1200 ? targetGap = breakPoints.desktop :
        window.innerWidth >= 1024 ? targetGap = breakPoints.laptop :
        window.innerWidth >= 768 ? targetGap = breakPoints.tab :
        targetGap = breakPoints.mobile;

    function anim() {
        getElem.forEach(element => {
            isInViewport(element, targetGap) ? element.classList.add("visible") : null;
        })
    }
    getElem.length > 0 ? (window.addEventListener('scroll', anim, false)) : null;
    getElem.length > 0 ? anim() : null;
}, false);



const getDropDownClick2 = document.querySelectorAll('.accordion-title');
getDropDownClick2.forEach((item) => {
    item.addEventListener('click', e => {

        if (e.target.parentNode.parentNode.classList.contains('show-accordion')) {
            e.target.parentNode.parentNode.classList.remove("show-accordion");

        } else {

            if (document.querySelectorAll(".show-accordion").length != 0) {
                document.querySelectorAll(".show-accordion")[0].classList.remove("show-accordion");

            }

            e.target.parentNode.parentNode.classList.add("show-accordion");


        }
    })
})


var scrollpos = window.scrollY;
var header = document.querySelectorAll("header.main-header")[0];

window.addEventListener('scroll', function() {
    scrollpos = window.scrollY;
    if (scrollpos > 30) {
        header.classList.add("scroll-header");
    } else {
        header.classList.remove("scroll-header");
    }
});


$('.contact-form select.form-control').select2({
    minimumResultsForSearch: -1,
    dropdownCssClass: "contact-form-select"
});




// window.onload = () => {
document.body.classList.add("content-loaded");
// }
const boxes = gsap.utils.toArray('.fadein-item');



boxes && boxes.forEach((box, i) => {
    const anim = gsap.fromTo(box, {
        autoAlpha: 0,
        y: 20
    }, {
        duration: 1.5,
        autoAlpha: 1,
        y: 0,
        ease: "power4.out",
        onComplete: function() {
            box.classList.add("animated")
        }
    });

    ScrollTrigger.create({
        trigger: box,
        animation: anim,
        start: "top bottom",
        end: "bottom top",
        toggleActions: 'play play play play',
        // once: true 
    });


});


const contentsitem = gsap.utils.toArray('.movein-content');
contentsitem && contentsitem.forEach((box, i) => {
    const anim = gsap.fromTo(box, {
        autoAlpha: 0.1,
        y: 15
    }, {
        duration: 1.3,
        autoAlpha: 1,
        y: 0,
        ease: "power4.out",
        onComplete: function() {
            box.classList.add("animated")
        }
    });
    ScrollTrigger.create({
        trigger: box,
        animation: anim,
        start: "top bottom",
        end: "bottom top",
        toggleActions: 'play play play play',
        // once: true 
    });
});

const zoomimgitem = gsap.utils.toArray('.img-zoom-in');
zoomimgitem && zoomimgitem.forEach((box, i) => {
    const anim = gsap.fromTo(box, {
        autoAlpha: 0.8,
        scale: 0.95,
        y: 20
    }, {
        duration: 3,
        autoAlpha: 1,
        scale: 1,
        y: 0,
        ease: "power4.out",
        onComplete: function() {
            box.classList.add("animated")
        }
    });
    ScrollTrigger.create({
        trigger: box,
        animation: anim,
        start: "top bottom",
        end: "bottom top",
        toggleActions: 'play play play play',
        // once: true 
    });
});

const moveimgitem = gsap.utils.toArray('.img-move-in');
moveimgitem && moveimgitem.forEach((box, i) => {
    const anim = gsap.fromTo(box, {
        x: 10,
        scale: 1.05
    }, {
        duration: 3,
        x: 0,
        scale: 1,
        ease: "power4.out",
        onComplete: function() {
            box.classList.add("animated")
        }
    });
    ScrollTrigger.create({
        trigger: box,
        animation: anim,
        start: "top bottom",
        end: "bottom top",
        toggleActions: 'play play play play',
        // once: true 
    });
});