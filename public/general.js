const drawer = document.getElementById("drawer");
const menuButton = document.getElementById("menu-button");

document.getElementById("menu-button").addEventListener("click", ()=>{
    drawer.style.display = "flex";
})

document.addEventListener("click", (event)=>{
    if (!drawer.contains(event.target) && event.target !== menuButton) {
        drawer.style.display = "none";
    }
})