document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        autoplay: true,
        interval: 5000,
        arrows: false,
        pagination: true,
        gap: '1rem',
        speed: 1000,
    }).mount();
});

const box = document.querySelector('.box');

function animarSimples(){
    gsap.to(".box",{
        duration: 1,
        x:200,
        opacity:0.5,
        ease:"power2.out"
    });
}
function animarRotacao(){
    gsap.to(".box",{
        duration: 1,
        rotation:360,
        scale:1.2,
        ease:"back.out"
    })
}
function animarSequencia(){
    const tl = gsap.timeline();
    tl.to(".box", { duration: 0.5, x:100})
    .to(".box", {duration:0.5, y:100})
    .to(".box", {duration:0.5, x:0})
    .to(".box", {duration:0.5, y:0});
}
function animarMouse(){
    const box = document.querySelector('.box');
    box.addEventListener('mouseenter',() => {
        gsap.to(".box",{
            duration:0.3,
            scale:1.3,
            backgroundColor:"#ffd93d",
        });

    box.addEventListener('mouseleave',() => {
        gsap.to(".box",{
            duration:0.3,
            scale:1,
            backgroundColor:"#4ecdc4",
        });
    }
    );
    }
    );
}