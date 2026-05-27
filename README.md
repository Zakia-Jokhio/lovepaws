#  LovePaws — Pet Adoption Platform

> *Every pet deserves a safe and happy home.*

LovePaws is a front-end web application that connects rescued animals with caring families across Pakistan. It allows users to browse available pets, list pets for adoption, learn about pet care, donate, and get in touch with the team.

---

##  Table of Contents

- [About the Project](#about-the-project)
- [Pages & Features](#pages--features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

##  About the Project

LovePaws was built to support animal welfare in Pakistan by providing a clean, user-friendly digital platform for pet adoption. The platform serves as a bridge between people who need to rehome a pet and families looking to welcome a new companion.

**Key stats (as shown on the platform):**
- 1,200+ pets adopted
- 850+ happy families
- 5 cities covered: Karachi, Lahore, Islamabad, Rawalpindi, Peshawar
- 40+ volunteers

---

##  Pages & Features

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with hero, featured pets, mission, and shelter info |
| Available Pets | `available-pets.html` | Filterable grid of dogs and cats available for adoption |
| Post a Pet | `post-a-pet.html` | Form to list a pet for adoption with photo upload |
| Pet Care | `pet-care.html` | Tips and guides for caring for your pet |
| About Us | `about-us.html` | Team, values, stats, partners, and story |
| Contact | `contact.html` | Contact form, office info, and map |
| Login | `login.html` | User login with social login options |
| Register | `register.html` | New user registration with password strength indicator |
| Donate | `donate.html` | Donation page for supporting the platform |
| Rescue a Creature | `rescue-a-creature.html` | Report or rescue a stray animal |

###  Feature Highlights

- **Pet filter tabs** — Filter available pets by Dogs, Cats, or All
- **Adoption card overlays** — Hover over a pet card to reveal "Adopt Me."
- **Post a Pet form** — Full listing form with drag-and-drop photo upload
- **Contact form** — With subject selection and success confirmation
- **Login / Register** — Password visibility toggle, strength meter, social login buttons
- **Responsive design** — Mobile-friendly layouts across all pages
- **Smooth animations** — `fadeInUp` entrance animations on key sections

---

##  Tech Stack

- **HTML5** — Semantic page structure
- **CSS3** — Custom properties (variables), Flexbox, CSS Grid, animations
- **Vanilla JavaScript** — Form handling, tab filtering, password toggle
- **Google Fonts** — Playfair Display (headings) + Nunito (body)
- **Font Awesome 6** — Icons for login/register pages
- **No frameworks or build tools required** — runs directly in the browser

---

## 📁 Project Structure

```
LovePaws/
│
├── index.html              # Home page
├── available-pets.html     # Browse pets
├── post-a-pet.html         # List a pet for adoption
├── pet-care.html           # Pet care tips
├── about-us.html           # About the team
├── contact.html            # Contact form
├── login.html              # Login page
├── register.html           # Registration page
├── donate.html             # Donation page
├── rescue-a-creature.html  # Rescue/report a stray
│
├── style.css               # Global stylesheet
├── script.js               # Shared JavaScript
│
└── Images/                 # All image assets
    ├── logo.svg
    ├── blacklogo.svg
    ├── Max.jpeg
    ├── Mittens.jpeg
    ├── Simba.avif
    ├── Bruno.avif
    ├── Daisy.avif
    ├── Rocky.avif
    ├── Luna.avif
    ├── Cleo.avif
    ├── Team1.avif
    ├── Team2.avif
    ├── Team3.jpg
    ├── Team4.avif
    ├── OurMission_img.jpeg
    ├── Welcome_Image.jpeg
    ├── Girl_with_Cat.jpeg
    ├── White_Cat.jpeg
    ├── google.svg
    ├── rfb.svg
    └── ... (icons: heart, trust, world, safety, location, call, email, clock, etc.)
```

---

##  Getting Started

No installation or build step needed — this is a pure HTML/CSS/JS project.

### Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/lovepaws.git
   ```

2. **Navigate into the folder:**
   ```bash
   cd lovepaws
   ```

3. **Open in your browser:**
   - Double-click `index.html`, **or**
   - Use VS Code's Live Server extension for hot reload:
     ```
     Right-click index.html → Open with Live Server
     ```

> ⚠️ Some image assets use local paths. Make sure the `Images/` folder is present alongside the HTML files.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name.`
3. Make your changes and commit: `git commit -m "Add: your feature"`
4. Push to your branch: `git push origin feature/your-feature-name.`
5. Open a Pull Request

---

##  Contact

Built by the LovePaws team — Karachi, Pakistan.

- Email: hello@lovepaws.pk
- Phone: +92 300 1234567
- Address: Block 5, Clifton, Karachi, Pakistan

---

##  License

This project is open source and available under the [MIT License](LICENSE).

---

*© 2026 LovePaws. Made with ❤️ for every paw.*
