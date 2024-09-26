// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {

    // Smooth Scroll for Navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal Feature for Product Details
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('h3').innerText;
            const productPrice = this.querySelector('p').innerText;
            const productImageSrc = this.querySelector('img').src;
            showProductModal(productName, productPrice, productImageSrc);
        });
    });

    function showProductModal(name, price, imageSrc) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${imageSrc}" alt="${name}">
                <h2>${name}</h2>
                <p>${price}</p>
            </div>
        `;
        
        document.body.appendChild(modal);

        // Close Modal
        modal.querySelector('.close').addEventListener('click', function() {
            modal.remove();
        });

        // Close when clicking outside the modal
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.remove();
            }
        });
    }

    // Lazy Loading for Product Images
    const images = document.querySelectorAll('.product-item img');

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    };

    const imageObserver = new IntersectionObserver(lazyLoad, {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0.1
    });

    images.forEach(image => {
        imageObserver.observe(image);
    });

});