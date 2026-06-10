/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== HOME TYPED JS ===============*/
 const typedHome = new Typed('#home-typed', {
      strings: ['Data Science Undergraduate_', 'Co-Founder_', 'Digital marketer_' , 'Content Creator_'],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      cursorChar: '_',
    })

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
   const header = document.getElementById('header')
   // Add the .shadow-header class if the bottom scroll of the viewport is greater than 50
   this.scrollY >= 50 ? header.classList.add('shadow-header') 
                      : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== CONTACT EMAIL JS ===============*/ 
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
   e.preventDefault()

   /*
      The code for sending emails is a sample test.

Create your account at https://www.emailjs.com/ 
and follow the instructions in the video and images 
to send emails with your account.
   */

// serviceID - templateID - #form - publicKey
   emailjs.sendForm('service_nwe96js', 'template_owc8m1y', '#contact-form', 'm7Nn0r6rGUCJSj4Dz')
    .then(() => {
        // Show the message
        contactMessage.textContent = 'Message sent successfully ✅'

         // Remove the message after 5 seconds
         setTimeout(() => {
            contactMessage.textContent = ''
         }, 5000)

         // Clear the input fields
         contactForm.reset()
     }, () => {
         // Show the error message
         contactMessage.textContent = 'Message not sent (service error) ❌'   
    })   
}

contactForm.addEventListener('submit', sendEmail)



/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 350
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						     : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

// Link the ID of each section (section id="home") to each link (a href="#home") 
// and activate the link with the class .active-link
const scrollActive = () => {
   // We get the position by scrolling down
   const scrollY = window.scrollY

   sections.forEach(section => {
      const id = section.id, // id of each section
            top = section.offsetTop - 50, // Distance from the top edge
            height = section.offsetHeight, // Element height
            link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

      if(!link) return

      link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'top',
   distance: '60px',
   duration: 2000,
   reset: true, //Animation repeat
})

sr.reveal('.home__content,.resume__content:nth-child(1),.footer__container', {delay: 300})
sr.reveal('.home__data, .resume__content:nth-child(2)', {delay: 300,origin: 'bottom'})

sr.reveal('.about__content, .contact__content', {origin: 'bottom'})
sr.reveal('.about__image, .contact__form', {delay: 300,})

sr.reveal('.projects__card', {interval: 100})

/*=============== HERO PARTICLE CANVAS ===============*/
const initParticles = () => {
   const canvas = document.getElementById('hero-canvas')
   if (!canvas) return

   const ctx = canvas.getContext('2d')
   let particles = []
   let animId

   const resize = () => {
      canvas.width  = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
   }
   resize()
   window.addEventListener('resize', () => { resize(); buildParticles() })

   const PARTICLE_COUNT = 55
   const MAX_DIST       = 130
   const TEAL           = '29, 185, 154'

   class Particle {
      constructor() { this.init() }
      init() {
         this.x    = Math.random() * canvas.width
         this.y    = Math.random() * canvas.height
         this.vx   = (Math.random() - 0.5) * 0.35
         this.vy   = (Math.random() - 0.5) * 0.35
         this.size = Math.random() * 1.8 + 0.8
         this.alpha = Math.random() * 0.45 + 0.1
      }
      update() {
         this.x += this.vx
         this.y += this.vy
         if (this.x < -10 || this.x > canvas.width  + 10) this.vx *= -1
         if (this.y < -10 || this.y > canvas.height + 10) this.vy *= -1
      }
      draw() {
         ctx.beginPath()
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
         ctx.fillStyle = `rgba(${TEAL}, ${this.alpha})`
         ctx.fill()
      }
   }

   const buildParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())
   }
   buildParticles()

   const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
         for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x
            const dy   = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < MAX_DIST) {
               const opacity = 0.18 * (1 - dist / MAX_DIST)
               ctx.beginPath()
               ctx.moveTo(particles[i].x, particles[i].y)
               ctx.lineTo(particles[j].x, particles[j].y)
               ctx.strokeStyle = `rgba(${TEAL}, ${opacity})`
               ctx.lineWidth   = 0.6
               ctx.stroke()
            }
         }
      }
   }

   const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      drawConnections()
      animId = requestAnimationFrame(animate)
   }
   animate()

   // Pause when tab is hidden (performance)
   document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(animId)
      else animate()
   })
}
initParticles()
