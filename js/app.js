/* <ul>
    <li> <a class="menu__link"> section 1 </a> </li>   == data-nav
    <li> <a class="menu__link"> section 2 </a> </li>   == data-nav
    <li> <a class="menu__link"> section 3 </a> </li>   == data-nav
    <li> <a class="menu__link"> section 4 </a> </li>   == data-nav
</ul> */ 


//  Define Global Variable
let myUnorderList = document.querySelector("#navbar__list");

// Query the all sections and store the list in variable.
let mySections = document.querySelectorAll("section");

//For Better performance use the Fragment Element
let fragmentElement = document.createDocumentFragment();
//  End Global Variable



/////////////////////////////// Build Nav Steps:////////////////////////////////////////////////////////////

 // make dynamic navigation bar by add li for each section
 //Use forEach on the list Variable.
 mySections.forEach(element =>{

    // create <li></li> and <a></a> inside it.
    let myListItem = document.createElement("li");
    let anchor = document.createElement("a");

    //  add text in <a></a> == data-nav (section 1 - section 2 -.....)
    let text = element.getAttribute("data-nav");
    anchor.textContent = text;

    myListItem.appendChild(anchor);

    // For Better performance use appendChild on the Fragment inside the loop.
        fragmentElement.appendChild(myListItem);

    // add this variable which contains the text to the link as (Text Content, class data-nav value)
    // add class to <a></a> 
    anchor.classList.add("menu__link");

    /* When clicking an <a></a> from the navigation menu, 
    the link should scroll to the appropriate section*/
    //Add EventListener to the links and use scrollIntoView().
    anchor.addEventListener("click" , e =>{
        e.preventDefault();
        element.scrollIntoView({behavior: "smooth"});     
    })
})

//After the loop end append that Fragment to the <ul>.
// and the end add all of this in <ul></ul>
myUnorderList.appendChild(fragmentElement);



// /////////////////////////////////////////////// Get the active Section://////////////////////////////////////////////////////////////

//// Get the active Section by using intersection observer API
window.addEventListener('scroll', () => { 

        // init the observer
        const myOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.7,
        }
        
    const allLinks = document.querySelectorAll("a.menu__link");
    
    // function to use for callback in the intersection observer
    const changeNavigationBar = (entries, observer) => {

        entries.forEach((entry) => {
            mySections.forEach(myActive => { 


            // verify the element is intersecting
            if(entry.isIntersecting) {
                //Use classList.add method to add the active class to the active section.
                // add active class to the section 
                entry.target.classList.add("your-active-class");

// ////////////////////////////////////////// Get The Active Link:///////////////////////////////////////////////////////////////////////////
                //use forEach on all the links and check using if condition which link has the textContent equal to active section data-nav
                allLinks.forEach(myLink => {  
                let activeLink = entry.target.getAttribute('data-nav');

                //using if condition to check wgich link has the textContent equal to active section data-nav
                    if(myLink.textContent == activeLink ){ 
                        // add active class to the link
                        myLink.classList.add('your-active-class');
                    }
    
                    // Remove Active class from all links, give the active link class active
                    else{ 
                        myLink.classList.remove('your-active-class'); 
                        }
                })

     
            }
            else{
                // remove the other active classes from all sections
                entry.target.classList.remove("your-active-class");
            }
        });            
        });

}

const observer = new IntersectionObserver(changeNavigationBar, myOptions);
        // target the elements to be observed
        mySections.forEach((myActive) => {
            observer.observe(myActive);
        });

});