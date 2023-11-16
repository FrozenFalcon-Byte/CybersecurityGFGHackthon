function disableRight(){
  document.addEventListener('contextmenu', function(event){
    event.preventDefault();
  })
}

disableRight()


function init(){
  gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

}

init()

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove", function(dets){
  crsr.style.left = dets.x+"px";
  crsr.style.top = dets.y+"px";
})

var tl = gsap.timeline({
  scrollTrigger:{
    trigger: ".page1 h1",
    scroller:".main",
    start:"top 26%",
    end:"top 0",
    scrub:1.5
  }
})

tl.to(".page1 h1", {
  x: -150
}, "anim")

tl.to(".page1 h2", {
  x:150
}, "anim")

var tl2 = gsap.timeline({
  scrollTrigger:{
    trigger: ".page1 h1",
    scroller:".main",
    start:"top -15%",
    end:"top -20%",
    scrub:1
  }
})

tl2.to(".main", {
  backgroundColor:'#fff',
  color:'black'
})


var clutter = "";

document.querySelector("#page2-cont>p").textContent.split("").forEach(function(dets){
  clutter += `<span>${dets}</span>`

  document.querySelector("#page2-cont>p").innerHTML = clutter;
})

var clutter2 = "";

document.querySelector("#page4-cont>p").textContent.split("").forEach(function(dets){
  clutter2 += `<span>${dets}</span>`

  document.querySelector("#page4-cont>p").innerHTML = clutter2;
})



gsap.to("#page2-cont>p>span", {
  scrollTrigger:{
    trigger: `#page2-cont>p>span`,
    start: `1vw 619vw`,
    end: `505vw 614vw`,
    scroller: `.main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color:`#0f0d0d`,
  opacity: `1`

})

gsap.to("#page4-cont>p>span", {
  scrollTrigger:{
    trigger: `#page4-cont>p>span`,
    start: `41vw 619vw`,
    end: `545vw 614vw`,
    scroller: `.main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color:`#fff`,
  opacity: `1`

})

var tl4 = gsap.timeline({
  scrollTrigger:{
    trigger: ".page1 h1",
    scroller:".main",
    start:"top -235%",
    end:"top -240%",
    scrub:3
  }
})

tl4.to(".main", {
  backgroundColor: "#0f0d0d"
})






function passGen(){
  const passwordEl = document.querySelector('#password');
  const uppercaseEl = document.querySelector('#uppercase');
  const lowercaseEl = document.querySelector('#lowercase');
  const numbersEl = document.querySelector('#numbers');
  const symbolsEl = document.querySelector('#symbols');
  const lengthEl = document.querySelector('#length');

  const generateBtn  = document.querySelector('#generate');
  generateBtn.addEventListener('click', generatePassword);
  const copyBtn = document.querySelector('#copy');
  copyBtn.addEventListener('click', copyPassword);

  const uppercase_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase_chars = "abcdefghijklmnopqrstuvwxyz";
  const numbers_chars = "0123456789";
  const symbols_chars = "!@#$%^&*()";

  function generatePassword(){
    let password = "";
    let length = lengthEl.value - 1;
    let chars = "";
    chars += uppercaseEl.checked ? uppercase_chars : "";
    chars += lowercaseEl.checked ? lowercase_chars : "";
    chars += symbolsEl.checked ? symbols_chars : "";
    chars += numbersEl.checked ? numbers_chars : "";

    for(let i = 0; i<=length; i++){
      let rand = Math.floor(Math.random() * chars.length);
      password += chars.substring(rand, rand + 1);
    }

    passwordEl.value = password;
  }

  async function copyPassword(){
    if (navigator.clipboard){
      await navigator.clipboard.writeText(passwordEl.value);
      alert('Password copied successfully')
    }

    
  }


}

passGen()

function rotate(){
  const container = document.querySelector('.page3');
const button = document.querySelector('.submit');

container.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = centerY - clientY;

    const maxRotateX = 25;
    const maxRotateY = 25;

    let rotateX = -(deltaY / containerRect.height) * 2 * maxRotateX;
    let rotateY = -(deltaX / containerRect.width) * 2 * maxRotateY;

    rotateX = Math.min(Math.max(rotateX, -maxRotateX), maxRotateX);
    rotateY = Math.min(Math.max(rotateY, -maxRotateY), maxRotateY);

    button.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

container.addEventListener('mouseleave', () => {
    button.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

}

rotate()


function validator(){
  const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li")

const requirements = [
  {regex: /.{8,}/, index:0}, 
  {regex: /[0-9]/, index:1}, 
  {regex: /[a-z]/, index:2},
  {regex: /[^A-Za-z0-9]/, index:3}, 
  {regex: /[A-Z]/, index:4} 
]

passwordInput.addEventListener("keyup", (e) => {
  requirements.forEach(item => {
    const isValid = item.regex.test(e.target.value);
    const requirementItem = requirementList[item.index];
    if(isValid){
      requirementItem.firstElementChild.className = "fa-solid fa-check";
      requirementItem.classList.add("valid");
    } else{
      requirementItem.firstElementChild.className = "fa-solid fa-circle";
      requirementItem.classList.remove("valid");
    }

  });
});

eyeIcon.addEventListener("click", () =>{
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";

  eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
});
}

validator()

function checker(){
  function Strength(password){
    let i = 0;
    if(password.length > 6){
      i++;
    }
    if(password.length >= 10){
      i++;
    }
    if(/[A-Z]/.test(password)){
      i++;
    }
    if(/[0-9]/.test(password)){
      i++;
    }
    if(/[A-Za-z0-8]/.test(password)){
      i++;
    }
    return i;
  }
  
  let container = document.querySelector(".wrapper");
  document.addEventListener("keyup", function(e){
    let password = document.querySelector("#myPassword").value;
  
    let strength = Strength(password);
    if(password.length == 0){
      container.classList.remove('weak');
      container.classList.remove('medium');
      container.classList.remove('strong');
    } else if(strength <= 2){
      container.classList.add('weak');
      container.classList.remove('medium');
      container.classList.remove('strong');
    } else if(strength >= 2 && strength <= 4){
      container.classList.remove('weak');
      container.classList.add('medium');
      container.classList.remove('strong');
    } else{
      container.classList.remove('weak');
      container.classList.remove('medium');
      container.classList.add('strong');
    }
  })
  
}

checker()


function bigCursor(){
  var cur = document.querySelector(".cursor");
  var cont = document.querySelector(".names");

  cont.addEventListener("mouseenter", function(){
    cur.style.height= "100px";
    cur.style.width= "100px";
  })
  cont.addEventListener("mouseleave", function(){
    cur.style.height= "20px";
    cur.style.width= "20px";
  })
}

bigCursor()


