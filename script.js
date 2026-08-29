const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector("#nav");
if(toggle){
  toggle.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded",open);
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
}

const progress=document.querySelector("#progress");
window.addEventListener("scroll",()=>{
  const h=document.documentElement;
  const scrolled=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
  progress.style.width=`${scrolled}%`;
},{passive:true});

document.querySelector("#year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
