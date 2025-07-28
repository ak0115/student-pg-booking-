document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            authButtons.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Property Listings Data
    const properties = [
        {
            id: 1,
            title: "Sunshine PG for Girls",
            location: "North Campus, Delhi University",
            price: 8500,
            type: "Girls",
            roomType: "double",
            city: "delhi",
            priceRange: "mid",
            image: "images/property1.svg",
            features: {
                beds: 2,
                baths: 1,
                area: "120 sq ft"
            }
        },
        {
            id: 2,
            title: "Comfort Zone PG",
            location: "Koramangala, Bangalore",
            price: 12000,
            type: "Co-ed",
            roomType: "single",
            city: "bangalore",
            priceRange: "premium",
            image: "images/property2.svg",
            features: {
                beds: 1,
                baths: 1,
                area: "150 sq ft"
            }
        },
        {
            id: 3,
            title: "Scholar's Nest",
            location: "Viman Nagar, Pune",
            price: 7500,
            type: "Boys",
            roomType: "triple",
            city: "pune",
            priceRange: "budget",
            image: "images/property3.svg",
            features: {
                beds: 3,
                baths: 1,
                area: "200 sq ft"
            }
        },
        {
            id: 4,
            title: "Campus View PG",
            location: "Powai, Mumbai",
            price: 15000,
            type: "Co-ed",
            roomType: "single",
            city: "mumbai",
            priceRange: "premium",
            image: "images/property4.svg",
            features: {
                beds: 1,
                baths: 1,
                area: "180 sq ft"
            }
        },
        {
            id: 5,
            title: "Student Hub",
            location: "Ameerpet, Hyderabad",
            price: 6500,
            type: "Boys",
            roomType: "double",
            city: "hyderabad",
            priceRange: "budget",
            image: "images/property5.svg",
            features: {
                beds: 2,
                baths: 1,
                area: "130 sq ft"
            }
        },
        {
            id: 6,
            title: "College Corner PG",
            location: "South Campus, Delhi University",
            price: 9000,
            type: "Girls",
            roomType: "double",
            city: "delhi",
            priceRange: "mid",
            image: "images/property6.svg",
            features: {
                beds: 2,
                baths: 1,
                area: "140 sq ft"
            }
        }
    ];

    // Load Properties
    const propertiesContainer = document.getElementById('properties-container');
    
    function displayProperties(propertiesList) {
        if (!propertiesContainer) return;
        
        propertiesContainer.innerHTML = '';
        
        if (propertiesList.length === 0) {
            propertiesContainer.innerHTML = '<div class="no-results">No properties found matching your criteria. Please try different filters.</div>';
            return;
        }
        
        propertiesList.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            
            propertyCard.innerHTML = `
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
                    <div class="property-type">${property.type}</div>
                </div>
                <div class="property-content">
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${property.location}</span>
                    </div>
                    <h3 class="property-title">${property.title}</h3>
                    <div class="property-features">
                        <div class="property-feature">
                            <i class="fas fa-bed"></i>
                            <span>${property.features.beds} Bed${property.features.beds > 1 ? 's' : ''}</span>
                        </div>
                        <div class="property-feature">
                            <i class="fas fa-bath"></i>
                            <span>${property.features.baths} Bath${property.features.baths > 1 ? 's' : ''}</span>
                        </div>
                        <div class="property-feature">
                            <i class="fas fa-vector-square"></i>
                            <span>${property.features.area}</span>
                        </div>
                    </div>
                    <div class="property-price">
                        <div class="price">₹${property.price}<span>/month</span></div>
                        <a href="property-details.html?id=${property.id}" class="btn btn-outline">View Details</a>
                    </div>
                </div>
            `;
            
            propertiesContainer.appendChild(propertyCard);
        });
    }

    // Initial display of properties
    displayProperties(properties);

    // Filter Properties
    const cityFilter = document.getElementById('city-filter');
    const priceFilter = document.getElementById('price-filter');
    const roomFilter = document.getElementById('room-filter');
    
    function filterProperties() {
        if (!cityFilter || !priceFilter || !roomFilter) return;
        
        const selectedCity = cityFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedRoom = roomFilter.value;
        
        let filteredProperties = properties;
        
        if (selectedCity) {
            filteredProperties = filteredProperties.filter(property => property.city === selectedCity);
        }
        
        if (selectedPrice) {
            filteredProperties = filteredProperties.filter(property => property.priceRange === selectedPrice);
        }
        
        if (selectedRoom) {
            filteredProperties = filteredProperties.filter(property => property.roomType === selectedRoom);
        }
        
        displayProperties(filteredProperties);
    }
    
    if (cityFilter) cityFilter.addEventListener('change', filterProperties);
    if (priceFilter) priceFilter.addEventListener('change', filterProperties);
    if (roomFilter) roomFilter.addEventListener('change', filterProperties);

    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        if (!testimonialCards.length) return;
        
        testimonialCards.forEach((card, i) => {
            if (window.innerWidth <= 768) {
                // On mobile, show one at a time
                card.style.display = i === index ? 'block' : 'none';
            } else {
                // On desktop, slide the testimonials
                const translateValue = -100 * index + '%';
                card.style.transform = `translateX(${translateValue})`;
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Initialize testimonial slider
    showTestimonial(currentTestimonial);
    
    // Handle window resize for responsive testimonial slider
    window.addEventListener('resize', function() {
        showTestimonial(currentTestimonial);
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add scroll to top button styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 99;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-3px);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                width: 40px;
                height: 40px;
                bottom: 20px;
                right: 20px;
            }
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            nav {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--background-white);
                padding: 1rem;
                box-shadow: var(--shadow-md);
                display: none;
                z-index: 99;
            }
            
            nav.active {
                display: block;
            }
            
            nav ul {
                flex-direction: column;
                gap: 1rem;
            }
            
            .auth-buttons {
                position: absolute;
                top: calc(100% + 200px);
                left: 0;
                width: 100%;
                background-color: var(--background-white);
                padding: 1rem;
                box-shadow: var(--shadow-md);
                display: none;
                z-index: 99;
                flex-direction: column;
            }
            
            .auth-buttons.active {
                display: flex;
            }
            
            .mobile-menu-btn.active i:before {
                content: '\\f00d';
            }
        }
    `;
    document.head.appendChild(style);
});