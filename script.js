        // Toggle Dark/Light Mode
        const modeToggle = document.getElementById('modeToggle');
        const body = document.body;
        const icon = modeToggle.querySelector('i');

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Mobile bottom nav active state
        const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
        
        bottomNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                bottomNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Login/Signup Dropdown Functionality
        const accountBtn = document.getElementById('accountBtn');
        const authDropdown = document.getElementById('authDropdown');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');
        const loginForm = document.querySelector('.auth-form');
        const signupForm = document.getElementById('signupForm');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
       

       
         // Login/Signup Dropdown Functionality
     
      const dashboard = document.getElementById("dashboard");
      const UserName = document.getElementById("UserName");
      const UserEmail = document.getElementById("UserEmail");
      const logout = document.getElementById("logout");

      // Toggle dropdown visibility
      accountBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        authDropdown.classList.toggle("show");
        const getUser = JSON.parse(localStorage.getItem("data"));

        if (getUser) {
          signupForm.style.display = "none";
          loginForm.style.display = "none";
          dashboard.style.display = "block";
          UserName.innerHTML = `${
            getUser?.firstName + " " + getUser?.lastName
          }`;
          UserEmail.innerHTML = ${getUser?.emailId};
        }
      });

      logout.addEventListener("click", () => {
        localStorage.removeItem("data");
        signupForm.style.display = "none";
        dashboard.style.display = "none";
        loginForm.style.display = "block";
      });

      // Hide dropdown when clicking outside
      document.addEventListener("click", function (e) {
        if (!authDropdown.contains(e.target) && e.target !== accountBtn) {
          authDropdown.classList.remove("show");
        }
      });

      // Switch to signup form
      showSignup.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.style.display = "none";
        signupForm.style.display = "block";
      });

      // Switch to login form
      showLogin.addEventListener("click", function (e) {
        e.preventDefault();
        signupForm.style.display = "none";
        loginForm.style.display = "block";
      });

      // Simple form validation and submission
      loginBtn.addEventListener("click", async function () {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const fullNameSchema = /^[A-Za-z\s]{3,20}$/;
        const emailSchema =
          /^[a-z0-9._%+-]{1,50}@[a-z0-9.-]{1,50}\.[a-z]{2,}$/i;
        const passwordSchema =
          /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^a-zA-Z0-9]).{8,16}$/;
        let error = "";

        if (!emailSchema.test(email)) {
          error = "Please enter a valid email address (max 50 characters).";
        } else if (!passwordSchema.test(password)) {
          error =
            "Password must be 8–16 characters, include uppercase, lowercase, number, and special character.";
        }

        if (error) {
          alert(error);
          return null;
        } else {
          await login({ emailId: email, password });
        }
      });

      signupBtn.addEventListener("click", async function () {
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        const fullNameSchema = /^[A-Za-z\s]{3,20}$/;
        const emailSchema =
          /^[a-z0-9._%+-]{1,50}@[a-z0-9.-]{1,50}\.[a-z]{2,}$/i;
        const passwordSchema =
          /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^a-zA-Z0-9]).{8,16}$/;
        let error = "";

        if (!fullNameSchema.test(name)) {
          error =
            "Full name must be 3–20 characters (letters and spaces only).";
        } else if (!emailSchema.test(email)) {
          error = "Please enter a valid email address (max 50 characters).";
        } else if (!passwordSchema.test(password)) {
          error =
            "Password must be 8–16 characters, include uppercase, lowercase, number, and special character.";
        }

        if (error) {
          alert(error);
          return null;
        } else {
          const firstName = name.split(" ")[0];
          const lastName = name.split(" ")[1];
          console.log(firstName, lastName, email, password);
          await signup({
            firstName,
            lastName,
            emailId: email,
            password,
            userName: email.split("@")[0],
          });
        }
      });

      async function signup(body) {
        try {
          const res = await fetch("https://thedevtinder.vercel.app/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const data = await res.json();
          console.log(data);

          alert(data.message);

          if (data.status) {
            signupForm.style.display = "none";
            loginForm.style.display = "block";
          }

          return data;
        } catch (error) {
          console.error(error.message);
          alert("Something went wrong");
        }
      }

      async function login(body) {
        try {
          const res = await fetch("https://thedevtinder.vercel.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const data = await res.json();
          console.log(data);

          if (data?.data) {
            localStorage.setItem("data", JSON.stringify(data.data));
            const getUser = JSON.parse(localStorage.getItem("data"));

            if (getUser) {
              signupForm.style.display = "none";
              loginForm.style.display = "none";
              dashboard.style.display = "block";
              UserName.innerHTML = `${
                getUser?.firstName + " " + getUser?.lastName
              }`;
              UserEmail.innerHTML = ${getUser?.emailId};
            }
          }

          alert(data.message);
          return data;
        } catch (error) {
          console.error(error.message);
          alert("Something went wrong");
        }
      }



    <!-- PDF.js library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
    <script>
        // Toggle Dark/Light Mode
        const modeToggle = document.getElementById('modeToggle');
        const body = document.body;
        const icon = modeToggle.querySelector('i');

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Mobile bottom nav active state
        const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
        
        bottomNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                bottomNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Login/Signup Dropdown Functionality
        const accountBtn = document.getElementById('accountBtn');
        const authDropdown = document.getElementById('authDropdown');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');
        const loginForm = document.querySelector('.auth-form');
        const signupForm = document.getElementById('signupForm');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');

        // Toggle dropdown visibility
        accountBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            authDropdown.classList.toggle('show');
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!authDropdown.contains(e.target) && e.target !== accountBtn) {
                authDropdown.classList.remove('show');
            }
        });

        // Switch to signup form
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        });

        // Switch to login form
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        });

        // Simple form validation and submission
        loginBtn.addEventListener('click', function() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                alert('Login successful!');
                authDropdown.classList.remove('show');
                // Here you would typically send the data to your server
            } else {
                alert('Please fill in all fields');
            }
        });

        signupBtn.addEventListener('click', function() {
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            if (name && email && password) {
                alert('Account created successfully!');
                authDropdown.classList.remove('show');
                // Here you would typically send the data to your server
            } else {
                alert('Please fill in all fields');
            }
        });

        // PDF Reader Functionality
        // Set up PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

        // PDF Reader Variables
        const pdfUpload = document.getElementById('pdfUpload');
        const uploadTrigger = document.getElementById('uploadTrigger');
        const fileName = document.getElementById('fileName');
        const pdfViewer = document.getElementById('pdfViewer');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const pageInfo = document.getElementById('pageInfo');
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        const progressBar = document.getElementById('progressBar');
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        const zoomLevel = document.getElementById('zoomLevel');
        const rateSlider = document.getElementById('rate');
        const rateValue = document.getElementById('rateValue');
        const pitchSlider = document.getElementById('pitch');
        const pitchValue = document.getElementById('pitchValue');
        const voiceSelect = document.getElementById('voiceSelect');

        let pdfDoc = null;
        let pageNum = 1;
        let pageRendering = false;
        let pageNumPending = null;
        let speechSynthesis = window.speechSynthesis;
        let currentUtterance = null;
        let isPaused = false;
        let currentText = '';
        let scale = 1.0;
        let voices = [];

        // Load available voices
        function loadVoices() {
            voices = speechSynthesis.getVoices();
            voiceSelect.innerHTML = '';
            
            voices.forEach((voice, i) => {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            });
            
            // Set default to English voice if available
            const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
            if (englishVoice) {
                voiceSelect.value = voices.indexOf(englishVoice);
            }
        }

        // Load voices when they become available
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Update slider values display
        rateSlider.addEventListener('input', () => {
            rateValue.textContent = rateSlider.value;
        });

        pitchSlider.addEventListener('input', () => {
            pitchValue.textContent = pitchSlider.value;
        });

        // Zoom functionality
        zoomInBtn.addEventListener('click', () => {
            if (scale < 3) {
                scale += 0.1;
                updateZoom();
            }
        });

        zoomOutBtn.addEventListener('click', () => {
            if (scale > 0.5) {
                scale -= 0.1;
                updateZoom();
            }
        });

        function updateZoom() {
            zoomLevel.textContent = Math.round(scale * 100) + '%';
            if (pdfDoc) {
                renderPage(pageNum);
            }
        }

        // Trigger file input when upload button is clicked
        uploadTrigger.addEventListener('click', () => {
            pdfUpload.click();
        });

        // Handle PDF file selection
        pdfUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type === 'application/pdf') {
                fileName.textContent = `Selected: ${file.name}`;
                
                const fileReader = new FileReader();
                fileReader.onload = function() {
                    const typedarray = new Uint8Array(this.result);
                    
                    // Load PDF using the binary data
                    pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                        pdfDoc = pdf;
                        pageNum = 1;
                        pageInfo.textContent = `Page: ${pageNum} / ${pdf.numPages}`;
                        
                        // Enable navigation buttons
                        prevPageBtn.disabled = pageNum <= 1;
                        nextPageBtn.disabled = pageNum >= pdf.numPages;
                        
                        // Enable voice controls
                        playBtn.disabled = false;
                        pauseBtn.disabled = false;
                        stopBtn.disabled = false;
                        
                        // Render the first page
                        renderPage(pageNum);
                    }).catch(function(error) {
                        console.error('Error loading PDF:', error);
                        pdfViewer.innerHTML = '<p>Error loading PDF. Please try another file.</p>';
                    });
                };
                fileReader.readAsArrayBuffer(file);
            } else {
                fileName.textContent = 'Please select a valid PDF file';
            }
        });

        // Render a specific page
        function renderPage(num) {
            pageRendering = true;
            
            pdfDoc.getPage(num).then(function(page) {
                const viewport = page.getViewport({ scale: scale });
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                // Clear the viewer and append the canvas
                pdfViewer.innerHTML = '';
                pdfViewer.appendChild(canvas);
                
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                const renderTask = page.render(renderContext);
                
                renderTask.promise.then(function() {
                    pageRendering = false;
                    
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                    
                    // Extract text for text-to-speech
                    page.getTextContent().then(function(textContent) {
                        currentText = textContent.items.map(item => item.str).join(' ');
                    });
                });
            });
            
            pageInfo.textContent = `Page: ${num} / ${pdfDoc.numPages}`;
            
            // Update button states
            prevPageBtn.disabled = num <= 1;
            nextPageBtn.disabled = num >= pdfDoc.numPages;
        }

        // Navigate to previous page
        function onPrevPage() {
            if (pageNum <= 1) return;
            pageNum--;
            if (pageRendering) {
                pageNumPending = pageNum;
            } else {
                renderPage(pageNum);
                stopSpeech();
            }
        }

        // Navigate to next page
        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) return;
            pageNum++;
            if (pageRendering) {
                pageNumPending = pageNum;
            } else {
                renderPage(pageNum);
                stopSpeech();
            }
        }

        // Event listeners for page navigation
        prevPageBtn.addEventListener('click', onPrevPage);
        nextPageBtn.addEventListener('click', onNextPage);

        // Text-to-Speech Functions
        function playSpeech() {
            if (speechSynthesis.speaking && !isPaused) {
                pauseSpeech();
                return;
            }
            
            if (isPaused) {
                resumeSpeech();
                return;
            }
            
            if (currentUtterance) {
                speechSynthesis.cancel();
            }
            
            if (currentText) {
                currentUtterance = new SpeechSynthesisUtterance(currentText);
                
                // Apply settings
                currentUtterance.rate = parseFloat(rateSlider.value);
                currentUtterance.pitch = parseFloat(pitchSlider.value);
                
                // Set selected voice
                const selectedVoice = voices[voiceSelect.value];
                if (selectedVoice) {
                    currentUtterance.voice = selectedVoice;
                }
                
                currentUtterance.onboundary = function(event) {
                    const progress = (event.charIndex / currentText.length) * 100;
                    progressBar.style.width = progress + '%';
                };
                
                currentUtterance.onend = function() {
                    progressBar.style.width = '100%';
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                    }, 1000);
                    playBtn.querySelector('i').className = 'fas fa-play';
                    playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
                };
                
                speechSynthesis.speak(currentUtterance);
                playBtn.querySelector('i').className = 'fas fa-pause';
                playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
                isPaused = false;
            }
        }

        function pauseSpeech() {
            if (speechSynthesis.speaking && !isPaused) {
                speechSynthesis.pause();
                playBtn.querySelector('i').className = 'fas fa-play';
                playBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
                isPaused = true;
            }
        }

        function resumeSpeech() {
            if (isPaused) {
                speechSynthesis.resume();
                playBtn.querySelector('i').className = 'fas fa-pause';
                playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
                isPaused = false;
            }
        }

        function stopSpeech() {
            speechSynthesis.cancel();
            playBtn.querySelector('i').className = 'fas fa-play';
            playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            progressBar.style.width = '0%';
            isPaused = false;
            currentUtterance = null;
        }

        // Event listeners for voice controls
        playBtn.addEventListener('click', playSpeech);
        pauseBtn.addEventListener('click', pauseSpeech);
        stopBtn.addEventListener('click', stopSpeech);

               

