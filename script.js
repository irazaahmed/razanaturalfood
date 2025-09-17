// Wait for the entire page to load before running the script
window.addEventListener('load', () => {
    // Hide the loader once all resources are loaded
    document.body.classList.add('loaded');
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Functionality ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // --- Product Card Price and WhatsApp Link Updater (for products.html) ---
    const productCards = document.querySelectorAll('.product-card');

    if (productCards.length > 0) {
        productCards.forEach(card => {
            const quantityButtons = card.querySelectorAll('.quantity-btn');
            const priceDisplay = card.querySelector('.price-display span');
            const orderButton = card.querySelector('.product-button');
            const minusButton = card.querySelector('.quantity-control.minus');
            const plusButton = card.querySelector('.quantity-control.plus');
            const quantityValueSpan = card.querySelector('.quantity-value');

            let basePrice = parseInt(quantityButtons[0].dataset.price);
            let selectedQuantity = quantityButtons[0].dataset.quantity;
            let currentQuantity = 1;

            // Function to update price and WhatsApp link
            const updateProductInfo = () => {
                const totalPrice = basePrice * currentQuantity;
                if (priceDisplay) {
                    priceDisplay.textContent = `PKR ${totalPrice.toLocaleString('en-US')}`;
                }
                if (orderButton) {
                    const message = encodeURIComponent(`Hello, I would like to order *${currentQuantity}x ${selectedQuantity}* of *${card.dataset.product}*. Total Price: PKR ${totalPrice}.`);
                    orderButton.href = `https://wa.me/923130221118?text=${message}`;
                }
            };
            
            // Set initial quantity and price
            quantityValueSpan.textContent = currentQuantity;
            updateProductInfo();

            // Add click event listener to each size button
            quantityButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove 'active' class from all buttons in the same card
                    quantityButtons.forEach(btn => btn.classList.remove('active'));
                    // Add 'active' class to the clicked button
                    button.classList.add('active');

                    // Get selected size and price from the data attributes
                    selectedQuantity = button.dataset.quantity;
                    basePrice = parseInt(button.dataset.price);
                    
                    // Reset quantity to 1 for the new size
                    currentQuantity = 1;
                    quantityValueSpan.textContent = currentQuantity;

                    // Update price display and WhatsApp link
                    updateProductInfo();
                });
            });

            // Add click event listener for minus button
            minusButton.addEventListener('click', () => {
                if (currentQuantity > 1) {
                    currentQuantity--;
                    quantityValueSpan.textContent = currentQuantity;
                    updateProductInfo();
                }
            });

            // Add click event listener for plus button
            plusButton.addEventListener('click', () => {
                currentQuantity++;
                quantityValueSpan.textContent = currentQuantity;
                updateProductInfo();
            });
        });
    }

    // --- About Us Page Language Switcher ---
    const langButtons = document.querySelectorAll('.lang-button');
    const contentBlocks = document.querySelectorAll('.about-content-block');

    if (langButtons.length > 0 && contentBlocks.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove 'active' class from all language buttons
                langButtons.forEach(btn => btn.classList.remove('active'));
                // Add 'active' class to the clicked button
                button.classList.add('active');

                // Get the language from the data attribute
                const lang = button.dataset.lang;

                // Hide all content blocks
                contentBlocks.forEach(block => {
                    block.classList.remove('active');
                });

                // Show the content block that matches the selected language
                document.querySelector(`.about-content-block[data-lang="${lang}"]`).classList.add('active');
            });
        });
    }


    // --- Contact Form Functionality (for contact.html) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the form from submitting normally

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Create the WhatsApp message
            const waMessage = `New message from the website:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
            
            // Encode the message for the URL
            const encodedMessage = encodeURIComponent(waMessage);
            
            // Construct the WhatsApp URL
            const whatsappUrl = `https://wa.me/923130221118?text=${encodedMessage}`;
            
            // Open the WhatsApp URL in a new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // --- Floating Buttons Logic (Go to Top & WhatsApp) ---
    const goToTopBtn = document.querySelector('.go-to-top');
    const whatsappBtn = document.querySelector('.whatsapp-button');

    if (goToTopBtn && whatsappBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                goToTopBtn.style.display = 'flex';
                whatsappBtn.classList.add('go-up');
            } else {
                goToTopBtn.style.display = 'none';
                whatsappBtn.classList.remove('go-up');
            }
        });

        goToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

