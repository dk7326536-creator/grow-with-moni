/* ==========================================
   Grow With Moni
   Premium Website JavaScript
   Vanilla JS
   ========================================== */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzRsU6CrNMGBR2NhM-DxWwHoPkRNJjj1-U5Wco0Nlkqo25uAq6h0--IFE3fztngxRub/exec";
/* ==========================================
   PRELOADER
   ========================================== */


window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 1500);

});



/* ==========================================
   NAVBAR SCROLL EFFECT
   ========================================== */


const header = document.getElementById("header");


window.addEventListener("scroll", () => {


    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }


});



/* ==========================================
   MOBILE MENU
   ========================================== */


const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");


menuBtn.addEventListener("click",()=>{


    navLinks.classList.toggle("active");


    if(navLinks.classList.contains("active")){

        menuBtn.innerHTML =
        '<i class="ri-close-line"></i>';

    }

    else{

        menuBtn.innerHTML =
        '<i class="ri-menu-3-line"></i>';

    }


});



/* CLOSE MOBILE MENU AFTER CLICK */


document.querySelectorAll(".nav-links a")
.forEach(link=>{


    link.addEventListener("click",()=>{


        navLinks.classList.remove("active");


        menuBtn.innerHTML =
        '<i class="ri-menu-3-line"></i>';


    });


});



/* ==========================================
   SCROLL PROGRESS BAR
   ========================================== */


const progressBar =
document.getElementById("progressBar");


window.addEventListener("scroll",()=>{


    const scrollTop =
    document.documentElement.scrollTop;


    const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;


    const progress =
    (scrollTop / height) * 100;


    progressBar.style.width =
    progress + "%";


});



/* ==========================================
   SMOOTH SCROLL
   ========================================== */


document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{


    anchor.addEventListener("click",function(e){


        const target =
        document.querySelector(this.getAttribute("href"));


        if(target){

            // e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });

        }


    });


});
/* ==========================================
   ANIMATED COUNTERS
   ========================================== */


const counters =
document.querySelectorAll(".counter");


const counterObserver =
new IntersectionObserver((entries, observer)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            const counter = entry.target;


            const target =
            Number(counter.getAttribute("data-target"));


            let current = 0;


            const speed = target / 100;


            const updateCounter = ()=>{


                current += speed;


                if(current < target){


                    counter.innerText =
                    Math.ceil(current);


                    requestAnimationFrame(updateCounter);


                }

                else{


                    counter.innerText =
                    target + "+";


                }


            };


            updateCounter();


            observer.unobserve(counter);


        }


    });


},{


    threshold:0.5


});


counters.forEach(counter=>{


    counterObserver.observe(counter);


});



/* ==========================================
   SCROLL REVEAL ANIMATION
   ========================================== */


const revealElements =
document.querySelectorAll(
".section-title, .glass-card, .gallery-card, .stat-card"
);



const revealObserver =
new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("active");


        }


    });


},{

    threshold:0.15

});



revealElements.forEach(element=>{


    element.classList.add("reveal");


    revealObserver.observe(element);


});



/* ==========================================
   FAQ ACCORDION
   ========================================== */


const faqItems =
document.querySelectorAll(".faq-item");



faqItems.forEach(item=>{


    const button =
    item.querySelector(".faq-question");


    button.addEventListener("click",()=>{


        faqItems.forEach(other=>{


            if(other !== item){

                other.classList.remove("active");

            }


        });


        item.classList.toggle("active");


        const icon =
        button.querySelector("i");


        if(item.classList.contains("active")){


            icon.className =
            "ri-subtract-line";


        }

        else{


            icon.className =
            "ri-add-line";


        }


    });


});



/* ==========================================
   BACK TO TOP BUTTON
   ========================================== */


const backToTop =
document.getElementById("backToTop");



window.addEventListener("scroll",()=>{


    if(window.scrollY > 500){


        backToTop.classList.add("show");


    }

    else{


        backToTop.classList.remove("show");


    }


});



backToTop.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});
/* ==========================================
   JOIN FORM VALIDATION
   ========================================== */


const joinForm =
document.getElementById("joinForm");


if(joinForm){


    joinForm.addEventListener("submit",(e)=>{


        e.preventDefault();


        const name =
        document.getElementById("name").value.trim();


        const phone =
        document.getElementById("phone").value.trim();


        const email =
        document.getElementById("email").value.trim();


        const city =
        document.getElementById("city").value.trim();


        const occupation =
        document.getElementById("occupation").value.trim();


        const message =
        document.getElementById("message").value.trim();



        if(
            name === "" ||
            phone === "" ||
            email === ""
        ){


            alert(
            "Please fill your Name, Phone and Email."
            );


            return;


        }



        const phonePattern =
        /^[0-9]{10}$/;


        if(!phonePattern.test(phone)){


            alert(
            "Please enter a valid 10 digit phone number."
            );


            return;


        }



        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if(!emailPattern.test(email)){


            alert(
            "Please enter a valid email address."
            );


            return;


        }



        const submitButton = joinForm.querySelector('button[type="submit"]');

submitButton.disabled = true;
submitButton.innerText = "Submitting...";

fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        city: city,
        occupation: occupation,
        message: message
    })
})
.then(response => response.json())
.then(result => {

    if (result.status === "success") {

        alert("🎉 Thank you for joining Grow With Moni! We will contact you soon.");

        joinForm.reset();

    } else {

        alert("Submission failed. Please try again.");

    }

})
.catch(error => {
console.log(error);
console.log(JSON.stringify(error));
alert(error);

    console.error(error);

    alert("Unable to connect to Google Sheets.");

})
.finally(() => {

    submitButton.disabled = false;
    submitButton.innerText = "Join Our Team";

});



    });


}



/* ==========================================
   GALLERY HOVER EFFECT
   ========================================== */


const galleryCards =
document.querySelectorAll(".gallery-card");



galleryCards.forEach(card=>{


    card.addEventListener("mouseenter",()=>{


        card.style.zIndex="5";


    });



    card.addEventListener("mouseleave",()=>{


        card.style.zIndex="1";


    });


});



/* ==========================================
   ACTIVE NAV LINK
   ========================================== */


const sections =
document.querySelectorAll("section");


const navItems =
document.querySelectorAll(".nav-links a");



window.addEventListener("scroll",()=>{


    let current="";


    sections.forEach(section=>{


        const sectionTop =
        section.offsetTop - 120;


        if(window.scrollY >= sectionTop){


            current =
            section.getAttribute("id");


        }


    });



    navItems.forEach(link=>{


        link.classList.remove("active");


        if(
        link.getAttribute("href")
        === "#" + current
        ){


            link.classList.add("active");


        }


    });


});



/* ==========================================
   PAGE LOAD OPTIMIZATION
   ========================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    document.body.classList.add("loaded");


});