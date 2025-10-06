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

        
