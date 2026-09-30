const menuYoutube = document.getElementById("menuYoutube");
const sidebarYoutube = document.getElementById("sidebarYoutube");

menuYoutube.addEventListener("click", () => {
if (window.innerWidth >= 700) {
    sidebarYoutube.classList.toggle("closed");
}

if (window.innerWidth <= 700) {
    sidebarYoutube.classList.toggle("expanded");
} 

const menuClosed = sidebarYoutube.classList.contains("closed") 
    ? "closed" 
    : "open";
const menuExpanded =  sidebarYoutube.classList.contains("expanded")
    ? "expanded"
    : "open";

localStorage.setItem('closed', menuClosed);
localStorage.setItem('expanded', menuExpanded);
})

const menuClosed = localStorage.getItem('closed'); 
const menuExpanded = localStorage.getItem('expanded'); 

if (menuClosed === 'closed') {
sidebarYoutube.classList.add('closed');
}

if (menuExpanded === 'expanded') {
sidebarYoutube.classList.add('expanded');
}