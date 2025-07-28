// Property Details Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize image gallery
    initImageGallery();
    
    // Initialize booking form
    initBookingForm();
    
    // Initialize reviews
    initReviews();
    
    // Load similar properties
    loadSimilarProperties();
});

/**
 * Initialize the property image gallery
 */
function initImageGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    // Set first thumbnail as active by default
    thumbnails[0].classList.add('active');
    
    // Add click event to each thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image source
            const imgSrc = this.querySelector('img').getAttribute('src');
            mainImage.setAttribute('src', imgSrc);
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Initialize the booking form functionality
 */
function initBookingForm() {
    const bookingForm = document.querySelector('.booking-form');
    const moveInDate = document.getElementById('check-in-date');
    const duration = document.getElementById('duration');
    const occupants = document.getElementById('guests');
    const bookNowBtn = document.querySelector('.booking-form .btn-primary');
    const scheduleVisitBtn = document.querySelector('.booking-form .btn-outline');
    
    if (!bookingForm) return;
    
    // Set minimum date for move-in
    const today = new Date();
    
    const formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    if (moveInDate) {
        moveInDate.setAttribute('min', formatDate(today));
        moveInDate.value = formatDate(today);
    }
    
    // Book Now button functionality
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!moveInDate.value) {
                showAlert('Please select a move-in date', 'error');
                return;
            }
            
            if (!duration.value) {
                showAlert('Please select a duration', 'error');
                return;
            }
            
            if (!occupants.value) {
                showAlert('Please select number of occupants', 'error');
                return;
            }
            
            // Calculate total price based on duration
            const moveInDateValue = new Date(moveInDate.value);
            const durationMonths = parseInt(duration.value);
            const occupantsCount = parseInt(occupants.value);
            // Get base price from sidebar
            const basePrice = parseInt(document.getElementById('sidebar-price').textContent.replace('₹', '').replace(',', ''));
            
            // Calculate total price based on duration and occupants
            let totalPrice = basePrice * durationMonths;
            
            // Apply discount for longer stays
            if (durationMonths >= 12) {
                totalPrice = totalPrice * 0.9; // 10% discount for 12+ months
            } else if (durationMonths >= 6) {
                totalPrice = totalPrice * 0.95; // 5% discount for 6+ months
            }
            
            // Apply surcharge for multiple occupants (if applicable)
            if (occupantsCount > 1) {
                totalPrice = totalPrice * (1 + ((occupantsCount - 1) * 0.5)); // 50% extra per additional occupant
            }
            
            // Format the total price
            const formattedTotal = '₹' + Math.round(totalPrice).toLocaleString('en-IN');
            
            // Simulate booking process
            showAlert(`Processing your booking (${durationMonths} months, ${occupantsCount} occupant${occupantsCount > 1 ? 's' : ''}, total: ${formattedTotal})...`, 'info');
            
            // Simulate API call with timeout
            setTimeout(() => {
                showAlert(`Your booking request has been sent! Total: ${formattedTotal}. The owner will contact you shortly.`, 'success');
                
                // Reset form or redirect to confirmation page
                // window.location.href = 'booking-confirmation.html';
            }, 1500);
        });
    }
    
    // Schedule Visit button functionality
    if (scheduleVisitBtn) {
        scheduleVisitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show schedule visit modal
            showScheduleVisitModal();
        });
    }
}

/**
 * Initialize reviews functionality
 */
function initReviews() {
    const viewMoreBtn = document.querySelector('.view-more-reviews .btn');
    const reviewsList = document.querySelector('.reviews-list');
    
    if (!viewMoreBtn || !reviewsList) return;
    
    // Sample additional reviews data
    const additionalReviews = [
        {
            name: 'Michael Johnson',
            date: '2 months ago',
            rating: 4.5,
            text: 'Great place to stay for students. The location is perfect, close to campus and all amenities. The rooms are spacious and well-maintained. The only downside was occasional noise from other residents.'
        },
        {
            name: 'Emily Wilson',
            date: '3 months ago',
            rating: 5,
            text: 'Absolutely loved my stay here! The rooms are clean, staff is friendly, and the facilities are top-notch. Would definitely recommend to any student looking for accommodation.'
        },
        {
            name: 'David Thompson',
            date: '4 months ago',
            rating: 4,
            text: 'Good value for money. The rooms are comfortable and the location is convenient. The WiFi could be better though.'
        }
    ];
    
    let reviewsShown = false;
    
    viewMoreBtn.addEventListener('click', function() {
        if (!reviewsShown) {
            // Add additional reviews
            additionalReviews.forEach(review => {
                const reviewElement = createReviewElement(review);
                reviewsList.appendChild(reviewElement);
            });
            
            // Update button text
            this.textContent = 'Show Less';
            reviewsShown = true;
        } else {
            // Remove additional reviews
            for (let i = 0; i < additionalReviews.length; i++) {
                reviewsList.removeChild(reviewsList.lastChild);
            }
            
            // Update button text
            this.textContent = 'View More Reviews';
            reviewsShown = false;
        }
    });
}

/**
 * Create a review element from review data
 */
function createReviewElement(review) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    
    // Generate stars HTML
    let starsHtml = '';
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    reviewElement.innerHTML = `
        <div class="review-header">
            <div class="reviewer">
                <img src="images/avatars/avatar-${Math.floor(Math.random() * 5) + 1}.jpg" alt="${review.name}">
                <div>
                    <h4>${review.name}</h4>
                    <p>${review.date}</p>
                </div>
            </div>
            <div class="review-rating">
                <div class="stars">${starsHtml}</div>
                <div class="review-date">${review.rating}/5</div>
            </div>
        </div>
        <div class="review-text">
            <p>${review.text}</p>
        </div>
    `;
    
    return reviewElement;
}

/**
 * Show schedule visit modal
 */
function showScheduleVisitModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Schedule a Visit</h2>
            <p>Select your preferred date and time to visit this PG accommodation.</p>
            <form id="visit-form">
                <div class="form-group">
                    <label for="visit-name">Your Name</label>
                    <input type="text" id="visit-name" required>
                </div>
                <div class="form-group">
                    <label for="visit-email">Your Email</label>
                    <input type="email" id="visit-email" required>
                </div>
                <div class="form-group">
                    <label for="visit-phone">Your Phone</label>
                    <input type="tel" id="visit-phone" required>
                </div>
                <div class="form-group">
                    <label for="visit-date">Preferred Visit Date</label>
                    <input type="date" id="visit-date" required>
                </div>
                <div class="form-group">
                    <label for="visit-time">Preferred Time</label>
                    <select id="visit-time" required>
                        <option value="">Select a time</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="visit-notes">Additional Notes</label>
                    <textarea id="visit-notes" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Schedule Visit</button>
            </form>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Add modal styles if not already added
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal {
                display: block;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                animation: fadeIn 0.3s;
            }
            
            .modal-content {
                background-color: white;
                margin: 10% auto;
                padding: 2rem;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                width: 90%;
                max-width: 500px;
                animation: slideIn 0.3s;
            }
            
            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .close:hover {
                color: var(--text-color);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Close modal when clicking on X or outside the modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Handle form submission
    const visitForm = document.getElementById('visit-form');
    visitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate scheduling visit
        showAlert('Processing your visit request...', 'info');
        
        setTimeout(() => {
            document.body.removeChild(modal);
            showAlert('Your visit has been scheduled! The owner will contact you to confirm.', 'success');
        }, 1500);
    });
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => {
        document.body.removeChild(alert);
    });
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="${getAlertIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close">&times;</button>
    `;
    
    // Add alert styles if not already added
    if (!document.getElementById('alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            .alert {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                z-index: 1000;
                animation: slideInRight 0.3s;
                max-width: 400px;
            }
            
            .alert-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .alert-info {
                background-color: #e0f2fe;
                color: #0369a1;
            }
            
            .alert-success {
                background-color: #dcfce7;
                color: #15803d;
            }
            
            .alert-error {
                background-color: #fee2e2;
                color: #b91c1c;
            }
            
            .alert-warning {
                background-color: #fef3c7;
                color: #b45309;
            }
            
            .alert-close {
                background: none;
                border: none;
                font-size: 1.25rem;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
            }
            
            .alert-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add alert to body
    document.body.appendChild(alert);
    
    // Close alert when clicking on X
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        alert.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(alert)) {
            alert.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                if (document.body.contains(alert)) {
                    document.body.removeChild(alert);
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Get alert icon based on alert type
 */
function getAlertIcon(type) {
    switch (type) {
        case 'success':
            return 'fas fa-check-circle';
        case 'error':
            return 'fas fa-exclamation-circle';
        case 'warning':
            return 'fas fa-exclamation-triangle';
        case 'info':
        default:
            return 'fas fa-info-circle';
    }
}

/**
 * Load similar properties
 */
function loadSimilarProperties() {
    const container = document.getElementById('similar-properties-container');
    
    if (!container) return;
    
    // Simulate loading similar properties
    container.innerHTML = '<div class="loading">Loading similar properties...</div>';
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Sample similar properties data
        const similarProperties = [
            {
                id: 2,
                title: 'Modern PG near University',
                location: 'North Campus, Delhi',
                price: 7500,
                type: 'Girls PG',
                image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                features: {
                    beds: 3,
                    baths: 2,
                    area: '120 sq ft'
                },
                rating: 4.2
            },
            {
                id: 3,
                title: 'Luxury PG Accommodation',
                location: 'South Campus, Delhi',
                price: 9000,
                type: 'Boys PG',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                features: {
                    beds: 2,
                    baths: 1,
                    area: '100 sq ft'
                },
                rating: 4.7
            },
            {
                id: 4,
                title: 'Budget Friendly PG',
                location: 'Kamla Nagar, Delhi',
                price: 6000,
                type: 'Co-ed PG',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                features: {
                    beds: 4,
                    baths: 2,
                    area: '90 sq ft'
                },
                rating: 3.9
            }
        ];
        
        // Clear loading indicator
        container.innerHTML = '';
        
        // Create property cards
        similarProperties.forEach(property => {
            const propertyCard = createPropertyCard(property);
            container.appendChild(propertyCard);
        });
    }, 1000);
}

/**
 * Create a property card element
 */
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    // Generate stars HTML
    let starsHtml = '';
    const fullStars = Math.floor(property.rating);
    const hasHalfStar = property.rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    card.innerHTML = `
         <div class="property-image">
             <img src="${property.image}" alt="${property.title}">
             <div class="property-type">${property.type}</div>
         </div>
         <div class="property-content">
             <div class="property-rating">
                 <div class="stars">${starsHtml}</div>
                 <span>${property.rating}</span>
             </div>
             <h3 class="property-title"><a href="property-details.html?id=${property.id}">${property.title}</a></h3>
             <div class="property-location">
                 <i class="fas fa-map-marker-alt"></i>
                 <span>${property.location}</span>
             </div>
             <div class="property-features">
                 <div class="property-feature">
                     <i class="fas fa-bed"></i>
                     <span>${property.features.beds} Beds</span>
                 </div>
                 <div class="property-feature">
                     <i class="fas fa-bath"></i>
                     <span>${property.features.baths} Baths</span>
                 </div>
                 <div class="property-feature">
                     <i class="fas fa-vector-square"></i>
                     <span>${property.features.area}</span>
                 </div>
             </div>
             <div class="property-price">
                 <span class="price">₹${property.price}</span>
                 <span class="period">/month</span>
             </div>
         </div>
    `;
    
    return card;
}