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
