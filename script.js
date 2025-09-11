  // Sample book data
        const books = {
            trending: [
                { id: 1, title: "The Midnight Library", author: "Matt Haig", cover: "📚" },
                { id: 2, title: "Project Hail Mary", author: "Andy Weir", cover: "🚀" },
                { id: 3, title: "Klara and the Sun", author: "Kazuo Ishiguro", cover: "🤖" },
                { id: 4, title: "The Four Winds", author: "Kristin Hannah", cover: "🌪️" },
                { id: 5, title: "The Sanatorium", author: "Sarah Pearse", cover: "🏔️" },
                { id: 6, title: "The Push", author: "Ashley Audrain", cover: "👶" }
            ],
            genres: [
                { id: 7, title: "Mystery of the Old House", author: "James Mystery", cover: "🏚️", genre: "Mystery" },
                { id: 8, title: "Space Odyssey", author: "Arthur Space", cover: "🪐", genre: "Sci-Fi" },
                { id: 9, title: "Love in Paris", author: "Emily Romance", cover: "❤️", genre: "Romance" },
                { id: 10, title: "History of Ancient Rome", author: "Robert History", cover: "🏛️", genre: "History" },
                { id: 11, title: "Fantasy Kingdoms", author: "J.R. Fantasy", cover: "🐉", genre: "Fantasy" },
                { id: 12, title: "Business Mindset", author: "Sarah Business", cover: "💼", genre: "Business" }
            ]
        };

        // DOM Elements
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        const accountIcon = document.getElementById('account-icon');
        const authDropdown = document.getElementById('auth-dropdown');
        const exploreLink = document.getElementById('explore-link');
        const exploreDropdown = document.getElementById('explore-dropdown');
        const seeAllLinks = document.querySelectorAll('.see-all');
        const dropdownOptions = document.querySelectorAll('.dropdown-option');

        // Initialize book lists
        function initializeBookLists() {
            const trendingList = document.getElementById('trending-list');
            const genresList = document.getElementById('genres-list');
            
            // Clear existing content
            trendingList.innerHTML = '';
            genresList.innerHTML = '';
            
            // Populate trending books
            books.trending.forEach(book => {
                const bookElement = createBookElement(book);
                trendingList.appendChild(bookElement);
            });
            
            // Populate genre books
            books.genres.forEach(book => {
                const bookElement = createBookElement(book);
                genresList.appendChild(bookElement);
            });
        }

        // Create book element
        function createBookElement(book) {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            
            bookCard.innerHTML = `
                <div class="book-cover">${book.cover}</div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                </div>
            `;
            
            return bookCard;
        }

        // Navigation functionality
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Handle explore link separately to show dropdown
                if (this.id === 'explore-link') {
                    exploreDropdown.classList.toggle('show');
                    // Close auth dropdown if open
                    authDropdown.classList.remove('show');
                    return;
                }
                
                // Close any open dropdowns
                exploreDropdown.classList.remove('show');
                authDropdown.classList.remove('show');
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Show the corresponding page
                const pageId = this.getAttribute('data-page') + '-page';
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === pageId) {
                        page.classList.add('active');
                    }
                });
            });
        });

        // Account dropdown functionality
        accountIcon.addEventListener('click', function() {
            authDropdown.classList.toggle('show');
            // Close explore dropdown if open
            exploreDropdown.classList.remove('show');
        });

        // See All links functionality
        seeAllLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Set explore page as active
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('data-page') === 'explore') {
                        navLink.classList.add('active');
                    }
                });
                
                // Show explore page
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === 'explore-page') {
                        page.classList.add('active');
                    }
                });
                
                // Close any open dropdowns
                exploreDropdown.classList.remove('show');
                authDropdown.classList.remove('show');
                
                // Load books for the selected category
                loadExploreBooks(category);
            });
        });

        // Explore dropdown options functionality
        dropdownOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Set explore page as active
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('data-page') === 'explore') {
                        navLink.classList.add('active');
                    }
                });
                
                // Show explore page
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === 'explore-page') {
                        page.classList.add('active');
                    }
                });
                
                // Close dropdown
                exploreDropdown.classList.remove('show');
                
                // Load books for the selected category
                loadExploreBooks(category);
            });
        });

        // Load books for explore page
        function loadExploreBooks(category) {
            const exploreList = document.getElementById('explore-list');
            exploreList.innerHTML = '';
            
            const pageTitle = document.querySelector('#explore-page h2');
            pageTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            
            books[category].forEach(book => {
                const bookElement = createBookElement(book);
                exploreList.appendChild(bookElement);
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-right') && !e.target.closest('.account-icon')) {
                authDropdown.classList.remove('show');
            }
            
            if (!e.target.closest('.nav-middle') || 
                (e.target.closest('.nav-link') && e.target.id !== 'explore-link')) {
                exploreDropdown.classList.remove('show');
            }
        });

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            initializeBookLists();
        });