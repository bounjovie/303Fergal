/* ==================================================
   303FERGAL
   Prototype v1
   js/main.js
================================================== */
/* ========= ELEMENTS ========= */
const loader = document.getElementById("loader");
const progressBar = document.getElementById("progress-bar");
const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menu-toggle");
const topButton = document.getElementById("top-button");
const navigationLinks =
    document.querySelectorAll("nav a");
const accordionItems =
    document.querySelectorAll(".accordion-item");
const revealElements =
    document.querySelectorAll(".fade-up");
const sections =
    document.querySelectorAll("section");
/* ========= LOADER ========= */
window.addEventListener("load",()=>{
    loader.classList.add("hide");
});
/* ========= MOBILE MENU ========= */
menuToggle.addEventListener("click",()=>{
    navigation.classList.toggle("open");
});
navigationLinks.forEach(link=>{
    link.addEventListener("click",()=>{
        navigation.classList.remove("open");
    });
});
/* ========= SMOOTH ACTIVE NAVIGATION ========= */
window.addEventListener("scroll",()=>{
    let current="";
    sections.forEach(section=>{
        const top =
            section.offsetTop-120;
        const height =
            section.offsetHeight;
        if(window.scrollY>=top){
            current=section.id;
        }
    });
    navigationLinks.forEach(link=>{
        link.classList.remove("active");
        if(link.getAttribute("href")==="#"+current){
            link.classList.add("active");
        }
    });
});
/* ========= ACCORDION ========= */
accordionItems.forEach(item=>{
    const header =
        item.querySelector(".accordion-header");
    const body =
        item.querySelector(".accordion-body");
    header.addEventListener("click",()=>{
        const opened =
            item.classList.contains("active");
        accordionItems.forEach(card=>{
            card.classList.remove("active");
            card
                .querySelector(".accordion-body")
                .style.maxHeight = null;
        });
        if(!opened){
            item.classList.add("active");
            body.style.maxHeight =
                body.scrollHeight + "px";
        }
    });
});
/* ========= SCROLL REVEAL ========= */
const revealObserver =
new IntersectionObserver(
(entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},
{
    threshold:.15
}
);
revealElements.forEach(element=>{
    revealObserver.observe(element);
});
/* ========= PROGRESS BAR ========= */
window.addEventListener("scroll",()=>{
    const scrollPosition =
        window.scrollY;
    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;
    const progress =
        (scrollPosition / totalHeight) * 100;
    progressBar.style.width =
        progress + "%";
});
/* ========= BACK TO TOP ========= */
window.addEventListener("scroll",()=>{
    if(window.scrollY > 600){
        topButton.classList.add("show");
    }else{
        topButton.classList.remove("show");
    }
});
topButton.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});
/* ========= HEADER SHADOW ========= */
window.addEventListener("scroll",()=>{
    if(window.scrollY > 40){
        navigation.style.borderBottom =
            "1px solid rgba(255,255,255,.10)";
        navigation.style.background =
            "rgba(5,5,5,.88)";
    }else{
        navigation.style.borderBottom =
            "1px solid rgba(255,255,255,.06)";
        navigation.style.background =
            "rgba(5,5,5,.78)";
    }
});
/* ========= IMAGE FALLBACK ========= */
document.querySelectorAll(".member-photo img")
.forEach(image=>{
    image.addEventListener("error",()=>{
        image.src =
            "assets/members/placeholder.jpg";
    });
});
/* ========= INITIAL STATE ========= */
document.dispatchEvent(
    new Event("scroll")
);
/* ========= END OF FILE ========= */

/* ============================= */
/* PARTICLES */
/* ============================= */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize",resize);
for(let i=0;i<80;i++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2+0.5,
        dx:(Math.random()-0.5)*0.2,
        dy:(Math.random()-0.5)*0.2,
        a:Math.random()*0.4+0.1
    });
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        p.x+=p.dx;
        p.y+=p.dy;
        if(p.x<0)p.x=canvas.width;
        if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height;
        if(p.y>canvas.height)p.y=0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${p.a})`;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();