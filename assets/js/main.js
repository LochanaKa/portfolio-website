const header=document.getElementById("header");
const navMenu=document.getElementById("nav-menu");
const navToggle=document.getElementById("nav-toggle");
const navClose=document.getElementById("nav-close");

navToggle?.addEventListener("click",()=>{
  navMenu?.classList.add("open");
  navToggle.setAttribute("aria-expanded","true");
});
const closeMenu=()=>{
  navMenu?.classList.remove("open");
  navToggle?.setAttribute("aria-expanded","false");
};
navClose?.addEventListener("click",closeMenu);
document.querySelectorAll(".nav-menu a").forEach(link=>link.addEventListener("click",closeMenu));

const updateHeader=()=>{
  header?.classList.toggle("scrolled",window.scrollY>24);
};
window.addEventListener("scroll",updateHeader,{passive:true});
updateHeader();

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll('.nav-menu a[href^="#"]')];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section=>sectionObserver.observe(section));

const year=document.getElementById("year");
if(year) year.textContent=new Date().getFullYear();

const contactForm=document.getElementById("contact-form");
contactForm?.addEventListener("submit",event=>{
  event.preventDefault();
  const form=new FormData(contactForm);
  const name=String(form.get("name")||"").trim();
  const email=String(form.get("email")||"").trim();
  const message=String(form.get("message")||"").trim();
  const subject=encodeURIComponent("Portfolio enquiry from "+name);
  const body=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\n\n"+message);
  const note=document.getElementById("form-note");
  if(note) note.textContent="Opening your email application…";
  window.location.href="mailto:lochana.contact@gmail.com?subject="+subject+"&body="+body;
});
