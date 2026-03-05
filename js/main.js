// ============================================
// ARLINGTON JUNK REMOVAL - Main JS (Premium)
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle (with hamburger-to-X) ---
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.backdropFilter = 'blur(12px)';
      } else {
        header.style.background = 'var(--primary)';
        header.style.backdropFilter = 'none';
      }
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Contact Form Handler with Validation ---
  const form = document.getElementById('contactForm');
  if (form) {
    setupFormValidation(form);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Run validation
      let valid = true;
      const validators = getValidators();
      Object.keys(validators).forEach(fieldName => {
        const input = form.querySelector(`[name="${fieldName}"]`);
        if (input && !validateField(input, validators[fieldName])) valid = false;
      });
      if (!valid) return;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // === WIRE YOUR ENDPOINT HERE ===
      // try {
      //   const response = await fetch('https://your-api-endpoint.com/leads', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data)
      //   });
      //   if (response.ok) { showFormSuccess(form); }
      // } catch (err) { console.error(err); }

      showFormSuccess(form);
      console.log('Form submission data:', data);
    });
  }

  function getValidators() {
    return {
      name: (v) => v.trim().length >= 2 ? '' : 'Please enter your name.',
      phone: (v) => {
        const digits = v.replace(/\D/g, '');
        return digits.length === 10 ? '' : 'Please enter a valid 10-digit phone number.';
      },
      email: (v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.',
    };
  }

  function setupFormValidation(formEl) {
    const validators = getValidators();

    // Phone formatting
    const phoneInput = formEl.querySelector('#phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let digits = e.target.value.replace(/\D/g, '').substring(0, 10);
        if (digits.length >= 6) {
          e.target.value = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
        } else if (digits.length >= 3) {
          e.target.value = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
        }
      });
    }

    // Real-time validation on blur
    Object.keys(validators).forEach(fieldName => {
      const input = formEl.querySelector(`[name="${fieldName}"]`);
      if (input) {
        input.addEventListener('blur', () => validateField(input, validators[fieldName]));
        input.addEventListener('input', () => {
          if (input.closest('.form-group').classList.contains('form-group--error')) {
            validateField(input, validators[fieldName]);
          }
        });
      }
    });
  }

  function validateField(input, validator) {
    const group = input.closest('.form-group');
    const error = group.querySelector('.form-error');
    const message = validator(input.value);
    group.classList.remove('form-group--error', 'form-group--success');
    if (message) {
      group.classList.add('form-group--error');
      if (error) error.textContent = message;
      return false;
    } else if (input.value.trim()) {
      group.classList.add('form-group--success');
    }
    return true;
  }

  function showFormSuccess(formEl) {
    const successHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="width: 64px; height: 64px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <h3 style="margin-bottom: 8px; font-size: 1.3rem;">Quote request sent!</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">We'll get back to you within 30 minutes during business hours. Need it faster? Call or text us at <a href="tel:8177056612" style="color: var(--accent); font-weight: 600;">(817) 705-6612</a>.</p>
      </div>
    `;
    formEl.innerHTML = successHTML;
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all others
      document.querySelectorAll('.faq-accordion__trigger').forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('active');
        other.nextElementSibling.setAttribute('hidden', '');
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        content.removeAttribute('hidden');
        content.classList.add('active');
      }
    });
  });

  // --- Before/After Sliders ---
  document.querySelectorAll('.ba-slider__range').forEach(range => {
    const slider = range.closest('.ba-slider');
    const before = slider.querySelector('.ba-slider__before');
    const handle = slider.querySelector('.ba-slider__handle');

    function updateSlider(value) {
      before.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
      handle.style.left = value + '%';
    }

    range.addEventListener('input', (e) => updateSlider(e.target.value));
    updateSlider(50);
  });

  // --- Animated Stat Counters ---
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        counter.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  // --- Card Tilt Effect ---
  document.querySelectorAll('.service-card, .pricing-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -3;
      const rotateY = (x - centerX) / centerX * 3;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Enhanced Scroll Animations (staggered reveals) ---
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll(
          '.step-card, .service-card, .pricing-card, .faq-accordion, .area-card, .testimonial-card, .stat-item, .trust-badge, .why-card'
        );
        if (children.length > 0) {
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.08}s`;
            child.classList.add('revealed');
          });
        } else {
          entry.target.classList.add('revealed');
        }
        animateObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Observe grid containers
  document.querySelectorAll(
    '.steps-grid, .services-grid, .pricing-grid, .faq-list, .areas-grid, .testimonials-grid, .stats-grid, .trust-bar__grid, .why-grid'
  ).forEach(grid => {
    grid.querySelectorAll(':scope > *').forEach(child => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(24px)';
    });
    animateObserver.observe(grid);
  });

  // --- Back to Top Button ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
