function openModal() {
    document.getElementById("modal").style.display = "block";
    document.body.classList.add("blur-background");
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.body.classList.remove("blur-background");
}

function toggleMenu() {
    var dropdown = document.getElementById("userDropdown");
    dropdown.classList.toggle("show");
}

// Fecha o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.logo-icon') && !event.target.closest('.user-menu')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function toggleMenu(element) {
    const menu = element.nextElementSibling;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function deletePost(element) {
    const post = element.closest('.post');
    post.remove();
}


