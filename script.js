/* ============================================================
   script.js — LovePaws Interactive JavaScript
   Drop this file next to your HTML files and add this line
   just before </body> in EVERY HTML page:
   <script src="script.js"></script>
   ============================================================ */

/* ============================================================
   1. MOBILE HAMBURGER MENU
   ============================================================ */
(function initMobileMenu() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-btn';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  hamburger.style.cssText = `
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 6px; z-index: 200;
  `;

  const style = document.createElement('style');
  style.textContent = `
    .hamburger-btn span {
      display: block; width: 26px; height: 3px;
      background: var(--dark); border-radius: 3px; transition: all 0.3s ease;
    }
    .hamburger-btn.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .hamburger-btn.open span:nth-child(2) { opacity: 0; }
    .hamburger-btn.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
    @media (max-width: 768px) {
      .hamburger-btn { display: flex !important; }
      .nav-links {
        position: fixed !important; top: 0; left: 0;
        width: 100%; height: 100vh;
        background: rgba(255,255,255,0.98);
        flex-direction: column !important; align-items: center;
        justify-content: center; gap: 32px !important; z-index: 150;
        transform: translateX(-100%);
        transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
      }
      .nav-links.mobile-open { transform: translateX(0) !important; display: flex !important; }
      .nav-links a { font-size: 1.3rem !important; }
      .nav-actions { display: none !important; }
    }
  `;
  document.head.appendChild(style);
  navbar.appendChild(hamburger);

  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });
  navLinks && navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
})();


/* ============================================================
   2. NAVBAR SCROLL SHRINK EFFECT
   ============================================================ */
(function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const s = document.createElement('style');
  s.textContent = `
    .navbar { transition: padding 0.3s ease, box-shadow 0.3s ease; }
    .navbar.scrolled { padding-top: 8px !important; padding-bottom: 8px !important;
      box-shadow: 0 4px 24px rgba(232,71,106,0.15) !important; }
  `;
  document.head.appendChild(s);
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
})();


/* ============================================================
   3. GLOBAL LIVE SEARCH DROPDOWN
   ============================================================ */
(function initSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;

  const s = document.createElement('style');
  s.textContent = `
    .search-wrapper { position: relative; }
    .search-dropdown {
      position: absolute; top: calc(100% + 8px); left: 0;
      min-width: 280px; background: #fff; border-radius: 16px;
      box-shadow: 0 12px 40px rgba(232,71,106,0.18); z-index: 300;
      overflow: hidden; display: none; animation: fadeInUp 0.2s ease;
    }
    .search-dropdown.open { display: block; }
    .search-result-item {
      padding: 12px 18px; font-size: 0.88rem; color: var(--text);
      cursor: pointer; border-bottom: 1px solid #f5e6ea;
      display: flex; align-items: center; gap: 10px; transition: background 0.15s;
    }
    .search-result-item:last-child { border-bottom: none; }
    .search-result-item:hover { background: var(--pink-light); }
    .search-result-item .sr-emoji { font-size: 1.2rem; }
    .search-no-result { padding: 14px 18px; color: var(--muted); font-size: 0.88rem; }
  `;
  document.head.appendChild(s);

  const wrapper = document.createElement('div');
  wrapper.className = 'search-wrapper';
  searchInput.parentNode.insertBefore(wrapper, searchInput);
  wrapper.appendChild(searchInput);
  const dropdown = document.createElement('div');
  dropdown.className = 'search-dropdown';
  wrapper.appendChild(dropdown);

  const petData = [
    { name: 'Max', type: 'Dog', age: '1.5 Years', city: 'Karachi', emoji: '🐕', link: 'available-pets.html' },
    { name: 'Bruno', type: 'Dog', age: '3 Years', city: 'Lahore', emoji: '🐕', link: 'available-pets.html' },
    { name: 'Daisy', type: 'Dog', age: '2 Years', city: 'Islamabad', emoji: '🐕', link: 'available-pets.html' },
    { name: 'Rocky', type: 'Dog', age: '4 Years', city: 'Karachi', emoji: '🐕', link: 'available-pets.html' },
    { name: 'Mittens', type: 'Cat', age: '1 Year', city: 'Karachi', emoji: '🐈', link: 'available-pets.html' },
    { name: 'Simba', type: 'Cat', age: '3 Years', city: 'Lahore', emoji: '🐈', link: 'available-pets.html' },
    { name: 'Luna', type: 'Cat', age: '2 Years', city: 'Karachi', emoji: '🐈', link: 'available-pets.html' },
    { name: 'Cleo', type: 'Cat', age: '1.5 Years', city: 'Islamabad', emoji: '🐈', link: 'available-pets.html' },
  ];

  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    dropdown.innerHTML = '';
    if (q.length < 1) { dropdown.classList.remove('open'); return; }
    const results = petData.filter(p =>
      p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)
    );
    if (results.length === 0) {
      dropdown.innerHTML = `<div class="search-no-result">No pets found for "<strong>${q}</strong>"</div>`;
    } else {
      results.forEach(pet => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `<span class="sr-emoji">${pet.emoji}</span>
          <div><strong>${pet.name}</strong> · ${pet.type}
          <div style="color:var(--muted);font-size:0.78rem;">${pet.age} · ${pet.city}</div></div>`;
        item.addEventListener('click', () => { window.location.href = pet.link; });
        dropdown.appendChild(item);
      });
    }
    dropdown.classList.add('open');
  });
  document.addEventListener('click', (e) => { if (!wrapper.contains(e.target)) dropdown.classList.remove('open'); });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') window.location.href = 'available-pets.html';
  });
})();


/* ============================================================
   4. ANIMATED STATS COUNTER (About Us page)
   ============================================================ */
(function initStatsCounter() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;
  function animateCount(el) {
    const text = el.textContent;
    const num = parseInt(text.replace(/\D/g, ''), 10);
    const suffix = text.replace(/[\d]/g, '');
    if (isNaN(num)) return;
    let start = 0;
    const step = Math.ceil(num / (1800 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { el.textContent = num + suffix; clearInterval(timer); }
      else { el.textContent = start + suffix; }
    }, 16);
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { animateCount(entry.target); observer.unobserve(entry.target); } });
  }, { threshold: 0.5 });
  statNums.forEach(el => observer.observe(el));
})();


/* ============================================================
   5. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   ============================================================ */
(function initScrollAnimations() {
  const s = document.createElement('style');
  s.textContent = `
    .scroll-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .scroll-reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(s);
  const targets = document.querySelectorAll(
    '.pet-card, .ap-pet-card, .value-card, .team-card, .care-card, .info-item, .stat-item, .step-item'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => { el.classList.add('scroll-reveal'); observer.observe(el); });
})();


/* ============================================================
   6. DONATE MODAL
   ============================================================ */
(function initDonateModal() {
  const donateBtns = [...document.querySelectorAll('.btn-pink')].filter(b => b.textContent.trim() === 'Donate');
  if (!donateBtns.length) return;

  const s = document.createElement('style');
  s.textContent = `
    .lp-modal-overlay {
      position: fixed; inset: 0; background: rgba(26,26,46,0.55);
      backdrop-filter: blur(4px); z-index: 500;
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn 0.25s ease; padding: 20px;
    }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    .lp-modal {
      background: #fff; border-radius: 24px; padding: 40px 36px;
      max-width: 440px; width: 100%; position: relative;
      box-shadow: 0 24px 64px rgba(232,71,106,0.2); animation: fadeInUp 0.3s ease;
    }
    .lp-modal-close {
      position: absolute; top: 16px; right: 20px;
      background: none; border: none; font-size: 1.4rem;
      cursor: pointer; color: var(--muted); transition: color 0.2s;
    }
    .lp-modal-close:hover { color: var(--pink); }
    .lp-modal h2 { font-family: 'Playfair Display', serif; font-size: 1.7rem; color: var(--dark); margin-bottom: 6px; }
    .lp-modal p { color: var(--muted); font-size: 0.9rem; margin-bottom: 24px; }
    .donate-amounts { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
    .donate-amt-btn {
      padding: 9px 20px; border: 2px solid #e0e0e0; border-radius: 50px;
      background: transparent; font-family: 'Nunito', sans-serif;
      font-weight: 700; font-size: 0.9rem; cursor: pointer; color: var(--text); transition: all 0.2s;
    }
    .donate-amt-btn:hover, .donate-amt-btn.selected { background: var(--pink); border-color: var(--pink); color: #fff; }
    .donate-custom-wrap {
      display: flex; align-items: center; border: 1.5px solid #e0e0e0;
      border-radius: 12px; overflow: hidden; margin-bottom: 20px;
    }
    .donate-currency { padding: 11px 14px; background: var(--pink-light); font-weight: 700; color: var(--pink); font-size: 0.9rem; }
    .donate-custom-input { flex: 1; padding: 11px 14px; border: none; outline: none; font-family: 'Nunito', sans-serif; font-size: 0.9rem; color: var(--text); background: #fff; }
    .donate-submit-btn {
      width: 100%; padding: 13px; background: var(--pink); color: #fff;
      border: none; border-radius: 12px; font-family: 'Nunito', sans-serif;
      font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.2s;
    }
    .donate-submit-btn:hover { background: var(--pink-hover); }
    .donate-success { display: none; text-align: center; padding: 20px 0; }
    .donate-success .big-emoji { font-size: 3rem; margin-bottom: 14px; }
    .donate-success h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--dark); margin-bottom: 8px; }
    .donate-success p { color: var(--muted); font-size: 0.9rem; }
  `;
  document.head.appendChild(s);

  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'lp-modal-overlay';
    overlay.innerHTML = `
      <div class="lp-modal">
        <button class="lp-modal-close">✕</button>
        <div id="donateFormInner">
          <h2>💛 Donate to <span class="brand-name">LovePaws</span></h2>
          <p>Your donation helps us rescue, feed, and rehome animals in need across Pakistan.</p>
          <div class="donate-amounts">
            <button class="donate-amt-btn" data-val="500">Rs. 500</button>
            <button class="donate-amt-btn selected" data-val="1000">Rs. 1,000</button>
            <button class="donate-amt-btn" data-val="2500">Rs. 2,500</button>
            <button class="donate-amt-btn" data-val="5000">Rs. 5,000</button>
          </div>
          <div class="donate-custom-wrap">
            <span class="donate-currency">PKR</span>
            <input class="donate-custom-input" type="number" placeholder="Enter custom amount" min="100" />
          </div>
          <button class="donate-submit-btn" id="donateSubmitBtn">Donate Now</button>
        </div>
        <div class="donate-success" id="donateSuccess">
          <div class="big-emoji">🎉</div>
          <h3>Thank you so much!</h3>
          <p>Your generous donation will help feed and care for our animals. Every rupee makes a difference!</p>
        </div>
      </div>
    `;
    overlay.querySelector('.lp-modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelectorAll('.donate-amt-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        overlay.querySelectorAll('.donate-amt-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        overlay.querySelector('.donate-custom-input').value = '';
      });
    });
    overlay.querySelector('#donateSubmitBtn').addEventListener('click', () => {
      overlay.querySelector('#donateFormInner').style.display = 'none';
      overlay.querySelector('#donateSuccess').style.display = 'block';
      setTimeout(() => overlay.remove(), 3000);
    });
    document.body.appendChild(overlay);
  }
  donateBtns.forEach(btn => { btn.addEventListener('click', (e) => { e.preventDefault(); createModal(); }); });
})();


/* ============================================================
   7. "RESCUE A CREATURE" MODAL
   ============================================================ */
(function initRescueModal() {
  const rescueBtns = [...document.querySelectorAll('.btn-pink')].filter(b => b.textContent.trim() === 'Rescue a Creature');
  if (!rescueBtns.length) return;

  const s = document.createElement('style');
  s.textContent = `
    .rescue-form { display: flex; flex-direction: column; gap: 14px; }
    .rescue-form label { font-size: 0.83rem; font-weight: 700; color: var(--text); display:block; margin-bottom: 3px; }
    .rescue-form input, .rescue-form select, .rescue-form textarea {
      width: 100%; padding: 10px 14px; border: 1.5px solid #e0e0e0; border-radius: 10px;
      font-family: 'Nunito', sans-serif; font-size: 0.88rem; color: var(--text);
      outline: none; transition: border-color 0.2s; background: var(--bg);
    }
    .rescue-form input:focus, .rescue-form select:focus, .rescue-form textarea:focus { border-color: var(--pink); background: #fff; }
    .rescue-form textarea { resize: vertical; min-height: 80px; }
    .rescue-submit-btn {
      padding: 12px; background: var(--pink); color: #fff; border: none; border-radius: 12px;
      font-family: 'Nunito', sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: background 0.2s;
    }
    .rescue-submit-btn:hover { background: var(--pink-hover); }
  `;
  document.head.appendChild(s);

  function createRescueModal() {
    const overlay = document.createElement('div');
    overlay.className = 'lp-modal-overlay';
    overlay.innerHTML = `
      <div class="lp-modal" style="max-width:480px;">
        <button class="lp-modal-close">✕</button>
        <div id="rescueFormInner">
          <h2> Report a <span class="brand-name">Stray</span></h2>
          <p>Spotted an animal in distress? Let us know and our rescue team will respond within hours.</p>
          <div class="rescue-form">
            <div><label>Your Name *</label><input type="text" placeholder="Full name" required /></div>
            <div><label>Phone Number *</label><input type="tel" placeholder="03XX-XXXXXXX" required /></div>
            <div><label>Animal Type *</label>
              <select required><option value="" disabled selected>Select type</option>
                <option>Dog</option><option>Cat</option><option>Bird</option><option>Other</option>
              </select>
            </div>
            <div><label>Location / Area *</label><input type="text" placeholder="e.g. Block 5, Clifton, Karachi" required /></div>
            <div><label>Condition of Animal</label><textarea placeholder="Describe the animal's condition..."></textarea></div>
            <button class="rescue-submit-btn" id="rescueSubmitBtn">Submit Rescue Report</button>
          </div>
        </div>
        <div class="donate-success" id="rescueSuccess" style="display:none;">
          <div class="big-emoji">🙏</div>
          <h3>Report Received!</h3>
          <p>Our rescue team has been notified and will reach out to you shortly.</p>
        </div>
      </div>
    `;
    overlay.querySelector('.lp-modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#rescueSubmitBtn').addEventListener('click', () => {
      overlay.querySelector('#rescueFormInner').style.display = 'none';
      overlay.querySelector('#rescueSuccess').style.display = 'block';
      setTimeout(() => overlay.remove(), 3000);
    });
    document.body.appendChild(overlay);
  }
  rescueBtns.forEach(btn => { btn.addEventListener('click', (e) => { e.preventDefault(); createRescueModal(); }); });
})();


/* ============================================================
   8. "ADOPT ME" → ADOPTION APPLICATION MODAL
   ============================================================ */
(function initAdoptModal() {
  const s = document.createElement('style');
  s.textContent = `
    .adopt-form { display: flex; flex-direction: column; gap: 13px; margin-top: 16px; }
    .adopt-form label { font-size: 0.83rem; font-weight: 700; color: var(--text); display:block; margin-bottom:3px; }
    .adopt-form input, .adopt-form select, .adopt-form textarea {
      width: 100%; padding: 10px 14px; border: 1.5px solid #e0e0e0; border-radius: 10px;
      font-family: 'Nunito', sans-serif; font-size: 0.88rem; color: var(--text);
      outline: none; transition: border-color 0.2s; background: var(--bg);
    }
    .adopt-form input:focus, .adopt-form select:focus, .adopt-form textarea:focus { border-color: var(--pink); background: #fff; }
    .adopt-form textarea { resize: vertical; min-height: 75px; }
    .adopt-submit-btn {
      padding: 12px; background: var(--pink); color: #fff; border: none; border-radius: 12px;
      font-family: 'Nunito', sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer; margin-top: 4px; transition: background 0.2s;
    }
    .adopt-submit-btn:hover { background: var(--pink-hover); }
  `;
  document.head.appendChild(s);

  document.addEventListener('click', function (e) {
    const link = e.target.closest('.ap-overlay a');
    if (!link) return;
    e.preventDefault();
    const card = link.closest('.ap-pet-card');
    const petName = card ? card.querySelector('.ap-name')?.textContent : 'this pet';
    const overlay = document.createElement('div');
    overlay.className = 'lp-modal-overlay';
    overlay.innerHTML = `
      <div class="lp-modal" style="max-width:500px;">
        <button class="lp-modal-close">✕</button>
        <div id="adoptFormInner">
          <h2>🐾 Adopt <span class="brand-name">${petName}</span></h2>
          <p style="color:var(--muted);font-size:0.88rem;margin-bottom:4px;">
            Fill in your details and we'll connect you with our adoption team within 24 hours.
          </p>
          <div class="adopt-form">
            <div><label>Full Name *</label><input type="text" placeholder="Your full name" required /></div>
            <div><label>Email Address *</label><input type="email" placeholder="yourname@email.com" required /></div>
            <div><label>Phone Number *</label><input type="tel" placeholder="03XX-XXXXXXX" required /></div>
            <div><label>Your City *</label>
              <select required><option value="" disabled selected>Select city</option>
                <option>Karachi</option><option>Lahore</option><option>Islamabad</option>
                <option>Rawalpindi</option><option>Peshawar</option><option>Other</option>
              </select>
            </div>
            <div><label>Do you have other pets at home?</label>
              <select><option value="" disabled selected>Select</option>
                <option>No other pets</option><option>Yes – dogs</option>
                <option>Yes – cats</option><option>Yes – both</option>
              </select>
            </div>
            <div><label>Why do you want to adopt ${petName}?</label>
              <textarea placeholder="Tell us why you'd be a great match..."></textarea>
            </div>
            <button class="adopt-submit-btn" id="adoptSubmitBtn">Submit Application 💛</button>
          </div>
        </div>
        <div class="donate-success" id="adoptSuccess" style="display:none;">
          <div class="big-emoji">🎉</div>
          <h3>Application Sent!</h3>
          <p>Thank you for applying to adopt <strong>${petName}</strong>! We'll contact you within 24 hours.</p>
        </div>
      </div>
    `;
    overlay.querySelector('.lp-modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#adoptSubmitBtn').addEventListener('click', () => {
      overlay.querySelector('#adoptFormInner').style.display = 'none';
      overlay.querySelector('#adoptSuccess').style.display = 'block';
      setTimeout(() => overlay.remove(), 3500);
    });
    document.body.appendChild(overlay);
  });
})();


/* ============================================================
   9. WISHLIST / FAVOURITE HEART BUTTON (Available Pets)
   ============================================================ */
(function initWishlist() {
  const cards = document.querySelectorAll('.ap-pet-card');
  if (!cards.length) return;

  const s = document.createElement('style');
  s.textContent = `
    .heart-btn {
      position: absolute; top: 12px; right: 12px;
      width: 34px; height: 34px; background: rgba(255,255,255,0.9);
      border: none; border-radius: 50%; font-size: 1.1rem; cursor: pointer; z-index: 3;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, background 0.2s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    }
    .heart-btn:hover { transform: scale(1.2); }
    .heart-btn.liked { background: var(--pink); }
    .wishlist-toast {
      position: fixed; bottom: 80px; right: 24px;
      background: var(--dark); color: #fff; padding: 12px 22px;
      border-radius: 50px; font-size: 0.88rem; font-weight: 700; z-index: 600;
      animation: slideInRight 0.3s ease, fadeOut 0.4s ease 2s forwards;
    }
    @keyframes slideInRight { from { opacity:0; transform: translateX(30px); } to { opacity:1; transform: translateX(0); } }
    @keyframes fadeOut { to { opacity: 0; } }
  `;
  document.head.appendChild(s);

  let wishlist = JSON.parse(localStorage.getItem('lp_wishlist') || '[]');

  function showToast(msg) {
    const existing = document.querySelector('.wishlist-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'wishlist-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  }

  cards.forEach((card) => {
    const name = card.querySelector('.ap-name')?.textContent || 'Pet';
    const btn = document.createElement('button');
    btn.className = 'heart-btn';
    btn.setAttribute('aria-label', 'Add to wishlist');
    btn.textContent = wishlist.includes(name) ? '❤️' : '🤍';
    if (wishlist.includes(name)) btn.classList.add('liked');
    card.appendChild(btn);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (wishlist.includes(name)) {
        wishlist = wishlist.filter(n => n !== name);
        btn.textContent = '🤍'; btn.classList.remove('liked');
        showToast(`💔 Removed ${name} from favourites`);
      } else {
        wishlist.push(name);
        btn.textContent = '❤️'; btn.classList.add('liked');
        showToast(`❤️ ${name} added to favourites!`);
      }
      localStorage.setItem('lp_wishlist', JSON.stringify(wishlist));
    });
  });
})();


/* ============================================================
   10. PHOTO PREVIEW — POST A PET PAGE
   ============================================================ */
(function initPhotoPreview() {
  const photoInput = document.getElementById('photoInput');
  if (!photoInput) return;
  const s = document.createElement('style');
  s.textContent = `
    .photo-preview-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
    .preview-thumb { width: 90px; height: 90px; border-radius: 10px; object-fit: cover; border: 2px solid var(--pink-light); animation: fadeInUp 0.3s ease; }
    .photo-count-label { font-size: 0.8rem; color: var(--muted); margin-top: 6px; font-weight: 600; }
  `;
  document.head.appendChild(s);
  const uploadArea = document.querySelector('.upload-area');
  const previewGrid = document.createElement('div');
  previewGrid.className = 'photo-preview-grid';
  const countLabel = document.createElement('div');
  countLabel.className = 'photo-count-label';
  uploadArea.parentNode.insertBefore(previewGrid, uploadArea.nextSibling);
  uploadArea.parentNode.insertBefore(countLabel, previewGrid.nextSibling);
  photoInput.addEventListener('change', function () {
    previewGrid.innerHTML = '';
    const files = Array.from(this.files).slice(0, 5);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'preview-thumb';
        previewGrid.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
    countLabel.textContent = files.length > 0 ? `${files.length} photo(s) selected` : '';
  });
})();


/* ============================================================
   11. BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const s = document.createElement('style');
  s.textContent = `
    .back-to-top {
      position: fixed; bottom: 28px; left: 28px; width: 44px; height: 44px;
      background: var(--pink); color: #fff; border: none; border-radius: 50%;
      font-size: 1.2rem; cursor: pointer;
      box-shadow: 0 4px 16px rgba(232,71,106,0.35);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.3s, transform 0.3s; z-index: 400;
    }
    .back-to-top.visible { opacity: 1; pointer-events: all; }
    .back-to-top:hover { transform: translateY(-3px); }
  `;
  document.head.appendChild(s);
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.scrollY > 300); });
  btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();


/* ============================================================
   12. AUTO-HIGHLIGHT ACTIVE NAV LINK
   ============================================================ */
(function initActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === current) link.style.color = 'var(--pink)';
  });
})();


/* ============================================================
   13. INLINE FORM VALIDATION (all pages)
   ============================================================ */
(function initFormValidation() {
  const s = document.createElement('style');
  s.textContent = `
    .field-error { color: #e53935; font-size: 0.78rem; font-weight: 700; margin-top: 4px; animation: fadeInUp 0.2s ease; }
    .form-group input.invalid, .form-group select.invalid, .form-group textarea.invalid { border-color: #e53935 !important; background: #fff5f5 !important; }
    .form-group input.valid, .form-group select.valid, .form-group textarea.valid { border-color: #4caf50 !important; }
  `;
  document.head.appendChild(s);
  function showError(input, msg) {
    input.classList.add('invalid'); input.classList.remove('valid');
    let err = input.parentElement.querySelector('.field-error');
    if (!err) { err = document.createElement('div'); err.className = 'field-error'; input.parentElement.appendChild(err); }
    err.textContent = msg;
  }
  function clearError(input) {
    input.classList.remove('invalid'); input.classList.add('valid');
    const err = input.parentElement.querySelector('.field-error');
    if (err) err.remove();
  }
  document.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
    input.addEventListener('blur', function () {
      if (!this.value.trim()) showError(this, 'This field is required.');
      else if (this.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) showError(this, 'Please enter a valid email address.');
      else if (this.type === 'tel' && this.value.replace(/\D/g, '').length < 10) showError(this, 'Please enter a valid phone number.');
      else clearError(this);
    });
    input.addEventListener('input', function () { if (this.value.trim()) clearError(this); });
  });
})();


/* ============================================================
   14. HERO BUTTON → SCROLL TO FEATURED PETS
   ============================================================ */
(function initHeroBtn() {
  const heroBtn = document.querySelector('.hero-btn');
  if (!heroBtn) return;
  heroBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const petsSection = document.querySelector('.featured-pets');
    if (petsSection) petsSection.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = 'available-pets.html';
  });
})();


/* ============================================================
   15. FEATURED PET CARDS → CLICK GOES TO AVAILABLE PETS
   ============================================================ */
(function initPetCardClick() {
  document.querySelectorAll('.pet-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => { window.location.href = 'available-pets.html'; });
  });
})();


/* ============================================================
   16. PARTNER LOGO TOOLTIPS
   ============================================================ */
(function initTooltips() {
  const s = document.createElement('style');
  s.textContent = `
    [data-tooltip] { position: relative; }
    [data-tooltip]::after {
      content: attr(data-tooltip); position: absolute;
      bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
      background: var(--dark); color: #fff; padding: 5px 12px; border-radius: 8px;
      font-size: 0.75rem; font-family: 'Nunito', sans-serif; white-space: nowrap;
      pointer-events: none; opacity: 0; transition: opacity 0.2s; z-index: 99;
    }
    [data-tooltip]:hover::after { opacity: 1; }
  `;
  document.head.appendChild(s);
  const tooltips = { hbl: 'Habib Bank Limited', easypaisa: 'Easypaisa – Mobile Payments', jazz: 'Jazz Pakistan', pawsitive: 'PAWsitive Vets' };
  document.querySelectorAll('.partner-logo, .sponsor-logo').forEach(el => {
    for (const cls in tooltips) { if (el.classList.contains(cls)) el.setAttribute('data-tooltip', tooltips[cls]); }
  });
})();


/* ============================================================
   17. FAQ — ONLY ONE OPEN AT A TIME (Pet Care page)
   ============================================================ */
(function initFaqAccordion() {
  const faqs = document.querySelectorAll('.faq-item');
  if (!faqs.length) return;
  faqs.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.onclick = null;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqs.forEach(f => f.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();


/* ============================================================
   18. WELCOME / COOKIE BANNER (once per session)
   ============================================================ */
(function initWelcomeBanner() {
  if (sessionStorage.getItem('lp_welcomed')) return;
  const s = document.createElement('style');
  s.textContent = `
    .lp-banner {
      position: fixed; bottom: 0; left: 0; right: 0; background: var(--dark); color: #fff;
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 32px; z-index: 700; gap: 16px; flex-wrap: wrap;
      animation: slideUp 0.4s ease;
    }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    .lp-banner p { font-size: 0.88rem; color: rgba(255,255,255,0.85); margin: 0; }
    .lp-banner p a { color: var(--pink); font-weight: 700; }
    .banner-actions { display: flex; gap: 10px; flex-shrink: 0; }
    .banner-btn { padding: 8px 20px; border-radius: 50px; font-family: 'Nunito', sans-serif; font-size: 0.82rem; font-weight: 700; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; }
    .banner-accept { background: var(--pink); color: #fff; border-color: var(--pink); }
    .banner-accept:hover { background: var(--pink-hover); }
    .banner-decline { background: transparent; color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.2); }
    .banner-decline:hover { border-color: rgba(255,255,255,0.5); }
  `;
  document.head.appendChild(s);
  const banner = document.createElement('div');
  banner.className = 'lp-banner';
  banner.innerHTML = `
    <p>🐾 Welcome to <strong>LovePaws</strong>! We use cookies to improve your experience. <a href="#">Privacy Policy</a></p>
    <div class="banner-actions">
      <button class="banner-btn banner-decline" id="bannerDecline">Decline</button>
      <button class="banner-btn banner-accept" id="bannerAccept">Accept & Continue</button>
    </div>
  `;
  document.body.appendChild(banner);
  function closeBanner() {
    banner.style.transition = 'transform 0.3s ease';
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => banner.remove(), 320);
    sessionStorage.setItem('lp_welcomed', '1');
  }
  document.getElementById('bannerAccept').addEventListener('click', closeBanner);
  document.getElementById('bannerDecline').addEventListener('click', closeBanner);
})();

/* ============================================================
   END OF script.js
   ============================================================ */