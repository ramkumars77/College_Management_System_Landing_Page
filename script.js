const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            let count = 0;
            const increment = target / 100; // Speed of counting

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    entry.target.innerText = Math.ceil(count);
                    setTimeout(updateCount, 20);
                } else {
                    entry.target.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(entry.target); // Only animate once
        }
    });
});
counters.forEach(counter => observer.observe(counter));


const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        
        courseCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

function sortTable(columnIndex) {
    const table = document.getElementById("feeTable");
    let switching = true;
    let shouldSwitch, i;
    let dir = "asc"; 
    let switchcount = 0;

    while (switching) {
        switching = false;
        let rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            let x = rows[i].getElementsByTagName("TD")[columnIndex];
            let y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
            
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.style.display = 'none';
});

const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if(name === "" || email === "") {
        alert("Please fill out your name and email.");
    } else {
        alert("Message sent successfully!");
        form.reset();
    }
});