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

    // --- Product Card Price and WhatsApp Link Updater ---
    const productCards = document.querySelectorAll('.product-card');

    if (productCards.length > 0) {
        productCards.forEach(card => {
            const quantityButtons = card.querySelectorAll('.quantity-btn');
            const priceDisplay = card.querySelector('.price-display span');
            const orderButton = card.querySelector('.product-button');
            
            // Set initial state for each card
            const initialQuantity = quantityButtons[0].dataset.quantity;
            const initialPrice = quantityButtons[0].dataset.price;
            const productName = card.dataset.product;
            
            // Update price display and WhatsApp link with initial values
            priceDisplay.textContent = `PKR ${initialPrice.toLocaleString('en-US')}`;
            const initialMessage = encodeURIComponent(`Hello, I would like to order *${productName}* - Quantity: *${initialQuantity}* for PKR ${initialPrice}.`);
            orderButton.href = `https://wa.me/923130221118?text=${initialMessage}`;
            
            // Add 'active' class to the first button
            quantityButtons[0].classList.add('active');

            // Add click event listener to each quantity button
            quantityButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove 'active' class from all buttons in the same card
                    quantityButtons.forEach(btn => btn.classList.remove('active'));

                    // Add 'active' class to the clicked button
                    button.classList.add('active');

                    // Get selected quantity and price from the data attributes
                    const selectedQuantity = button.dataset.quantity;
                    const selectedPrice = button.dataset.price;

                    // Update the price text
                    priceDisplay.textContent = `PKR ${selectedPrice.toLocaleString('en-US')}`;

                    // Update the WhatsApp order link
                    const message = encodeURIComponent(`Hello, I would like to order *${productName}* - Quantity: *${selectedQuantity}* for PKR ${selectedPrice}.`);
                    orderButton.href = `https://wa.me/923130221118?text=${message}`;
                });
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
    const contactForm = document.querySelector('.contact-form');
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

});



