/**
 * AURA MALDIVES — CLIENT INTERACTION & MOTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements Selection
  const siteHeader = document.getElementById('siteHeader');
  const heroBg = document.getElementById('heroBg');
  const bgSwitcher = document.getElementById('bgSwitcher');
  const audioToggle = document.getElementById('audioToggle');
  const indCurrent = document.getElementById('indCurrent');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  
  // Booking Bar & Popovers
  const arrivalField = document.getElementById('arrivalField');
  const departureField = document.getElementById('departureField');
  const guestsField = document.getElementById('guestsField');
  const btnFindStay = document.getElementById('btnFindStay');
  const datePickerPopover = document.getElementById('datePickerPopover');
  const guestsPickerPopover = document.getElementById('guestsPickerPopover');
  const closeDatePicker = document.getElementById('closeDatePicker');
  const closeGuestsPicker = document.getElementById('closeGuestsPicker');
  const applyDates = document.getElementById('applyDates');
  const applyGuests = document.getElementById('applyGuests');
  const arrivalValue = document.getElementById('arrivalValue');
  const departureValue = document.getElementById('departureValue');
  const guestsValue = document.getElementById('guestsValue');
  const toastNotification = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');

  // Escape Modal
  const openEscapeModal = document.getElementById('openEscapeModal');
  const drawerEscapeBtn = document.getElementById('drawerEscapeBtn');
  const btnFooterReserve = document.getElementById('btnFooterReserve');
  const escapeModalBackdrop = document.getElementById('escapeModalBackdrop');
  const closeEscapeModal = document.getElementById('closeEscapeModal');

  // Villa Modal
  const villaModalBackdrop = document.getElementById('villaModalBackdrop');
  const closeVillaModal = document.getElementById('closeVillaModal');
  const villaModalTitle = document.getElementById('villaModalTitle');
  const villaModalDesc = document.getElementById('villaModalDesc');
  const btnVillaSelectDate = document.getElementById('btnVillaSelectDate');
  const teaserCard = document.getElementById('teaserCard');

  // ==========================================================================
  // 2. HERO BACKGROUND SWITCHER (4K AI Photorealistic vs Original Reference)
  // ==========================================================================
  if (bgSwitcher) {
    const bgBtns = bgSwitcher.querySelectorAll('.bg-btn');
    bgBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        bgBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const bgType = btn.getAttribute('data-bg');
        if (bgType === 'original') {
          heroBg.style.backgroundImage = "url('assets/reference-original.png')";
          showToast('Hero view switched to Original Reference');
        } else {
          heroBg.style.backgroundImage = "url('assets/hero-island.jpg')";
          showToast('Hero view switched to 4K Island Aerial');
        }
      });
    });
  }

  // Subtle Ken Burns slow zoom
  setTimeout(() => {
    if (heroBg) heroBg.classList.add('zoom');
  }, 100);

  // ==========================================================================
  // 3. HEADER SCROLL & MOBILE MENU
  // ==========================================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });

    if (drawerEscapeBtn) {
      drawerEscapeBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        openModal(escapeModalBackdrop);
      });
    }
  }

  // ==========================================================================
  // 4. VERTICAL SCROLL SPY INDICATOR (01 / 06 ↓)
  // ==========================================================================
  const sections = [
    { id: 'hero', index: '01' },
    { id: 'the-island', index: '02' },
    { id: 'your-stay', index: '03' },
    { id: 'experiences', index: '04' },
    { id: 'gastronomy', index: '05' },
    { id: 'reserve', index: '06' }
  ];

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const found = sections.find(s => s.id === entry.target.id);
        if (found && indCurrent) {
          indCurrent.textContent = found.index;
          // Subtle flip animation
          indCurrent.style.transform = 'translateY(-4px)';
          indCurrent.style.opacity = '0.5';
          setTimeout(() => {
            indCurrent.style.transform = 'translateY(0)';
            indCurrent.style.opacity = '1';
          }, 150);
        }
      }
    });
  }, observerOptions);

  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });

  // Next section click handler on the indicator arrow
  const indArrow = document.querySelector('.ind-arrow');
  if (indArrow) {
    indArrow.addEventListener('click', (e) => {
      e.preventDefault();
      const currentVal = parseInt(indCurrent.textContent, 10);
      const nextIdx = currentVal >= 6 ? 1 : currentVal + 1;
      const targetSec = sections[nextIdx - 1];
      const targetEl = document.getElementById(targetSec.id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================================================
  // 5. DATE PICKER POPOVER & CALENDAR GENERATOR
  // ==========================================================================
  let selectedStart = 24; // April 24
  let selectedEnd = 1;    // May 1 (cross month)

  function renderCalendar() {
    const calDaysBody = document.getElementById('calDaysBody');
    if (!calDaysBody) return;
    calDaysBody.innerHTML = '';

    // April 2025 starts on Tuesday (offset 2: Su=0, Mo=1, Tu=2)
    const firstDayOffset = 2;
    const totalDaysInApril = 30;

    // Blank cells before day 1
    for (let i = 0; i < firstDayOffset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day empty';
      calDaysBody.appendChild(emptyCell);
    }

    // Days 1 through 30
    for (let d = 1; d <= totalDaysInApril; d++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'cal-day';
      dayEl.textContent = d;

      if (d === selectedStart) {
        dayEl.classList.add('selected', 'range-start');
      } else if (d > selectedStart) {
        dayEl.classList.add('in-range');
      }

      dayEl.addEventListener('click', () => {
        selectedStart = d;
        arrivalValue.textContent = `Apr ${d}, 2025`;
        renderCalendar();
      });

      calDaysBody.appendChild(dayEl);
    }
  }

  renderCalendar();

  // Toggle Date Popover
  function openDatePopover(type) {
    closeAllPopovers();
    datePickerPopover.classList.add('open');
    if (type === 'arrival') arrivalField.classList.add('active');
    if (type === 'departure') departureField.classList.add('active');
  }

  if (arrivalField) {
    arrivalField.addEventListener('click', (e) => {
      e.stopPropagation();
      openDatePopover('arrival');
    });
  }

  if (departureField) {
    departureField.addEventListener('click', (e) => {
      e.stopPropagation();
      openDatePopover('departure');
    });
  }

  if (closeDatePicker) {
    closeDatePicker.addEventListener('click', () => {
      datePickerPopover.classList.remove('open');
      arrivalField.classList.remove('active');
      departureField.classList.remove('active');
    });
  }

  if (applyDates) {
    applyDates.addEventListener('click', () => {
      datePickerPopover.classList.remove('open');
      arrivalField.classList.remove('active');
      departureField.classList.remove('active');
      showToast('Dates confirmed: Apr 24 – May 1, 2025');
    });
  }

  // ==========================================================================
  // 6. GUESTS PICKER POPOVER & COUNTERS
  // ==========================================================================
  let adultCount = 2;
  let childCount = 0;
  let suiteCount = 1;

  const adultValEl = document.getElementById('adultCount');
  const childValEl = document.getElementById('childCount');
  const suiteValEl = document.getElementById('suiteCount');

  document.getElementById('adultInc')?.addEventListener('click', () => {
    if (adultCount < 6) { adultCount++; adultValEl.textContent = adultCount; }
  });
  document.getElementById('adultDec')?.addEventListener('click', () => {
    if (adultCount > 1) { adultCount--; adultValEl.textContent = adultCount; }
  });

  document.getElementById('childInc')?.addEventListener('click', () => {
    if (childCount < 4) { childCount++; childValEl.textContent = childCount; }
  });
  document.getElementById('childDec')?.addEventListener('click', () => {
    if (childCount > 0) { childCount--; childValEl.textContent = childCount; }
  });

  document.getElementById('suiteInc')?.addEventListener('click', () => {
    if (suiteCount < 3) { suiteCount++; suiteValEl.textContent = suiteCount; }
  });
  document.getElementById('suiteDec')?.addEventListener('click', () => {
    if (suiteCount > 1) { suiteCount--; suiteValEl.textContent = suiteCount; }
  });

  if (guestsField) {
    guestsField.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllPopovers();
      guestsPickerPopover.classList.add('open');
      guestsField.classList.add('active');
    });
  }

  if (closeGuestsPicker) {
    closeGuestsPicker.addEventListener('click', () => {
      guestsPickerPopover.classList.remove('open');
      guestsField.classList.remove('active');
    });
  }

  if (applyGuests) {
    applyGuests.addEventListener('click', () => {
      guestsPickerPopover.classList.remove('open');
      guestsField.classList.remove('active');
      const text = childCount > 0 ? `${adultCount} adults, ${childCount} child` : `${adultCount} adults`;
      guestsValue.textContent = text;
      showToast(`Party size updated: ${text}`);
    });
  }

  // Close popovers when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.booking-bar-wrapper')) {
      closeAllPopovers();
    }
  });

  function closeAllPopovers() {
    if (datePickerPopover) datePickerPopover.classList.remove('open');
    if (guestsPickerPopover) guestsPickerPopover.classList.remove('open');
    if (arrivalField) arrivalField.classList.remove('active');
    if (departureField) departureField.classList.remove('active');
    if (guestsField) guestsField.classList.remove('active');
  }

  // Find your stay button action
  if (btnFindStay) {
    btnFindStay.addEventListener('click', () => {
      const staySection = document.getElementById('your-stay');
      if (staySection) {
        staySection.scrollIntoView({ behavior: 'smooth' });
        showToast('Curating available residences for Apr 24 – May 1...');
      }
    });
  }

  // ==========================================================================
  // 7. VILLA TABS FILTERING
  // ==========================================================================
  const villaTabs = document.querySelectorAll('.villa-tab');
  const villaCards = document.querySelectorAll('.villa-card');

  villaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      villaTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      villaCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 8. MODAL WINDOWS (Plan Your Escape & Villa Details)
  // ==========================================================================
  function openModal(modal) {
    if (modal) modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openEscapeModal) openEscapeModal.addEventListener('click', () => openModal(escapeModalBackdrop));
  if (btnFooterReserve) btnFooterReserve.addEventListener('click', () => openModal(escapeModalBackdrop));
  if (closeEscapeModal) closeEscapeModal.addEventListener('click', () => closeModal(escapeModalBackdrop));

  // Villa Explore buttons
  const exploreBtns = document.querySelectorAll('.btn-villa-explore');
  exploreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const villaType = btn.getAttribute('data-villa');
      if (villaType === 'sunset-overwater') {
        villaModalTitle.textContent = 'Sunset Overwater Villa with Pool';
        villaModalDesc.textContent = 'Suspended directly over calm turquoise lagoon waters, featuring panoramic floor-to-ceiling glass, an overwater catamaran hammock, direct reef ladder, and private sundeck plunge pool.';
      } else if (villaType === 'grand-lagoon') {
        villaModalTitle.textContent = 'Grand Ocean Lagoon Residence';
        villaModalDesc.textContent = 'Our crowning overwater achievement at the jetty tip, featuring dual master suites, private infinity lap pool, glass ocean observation salon, and private dining sala.';
      } else {
        villaModalTitle.textContent = 'Beachfront Coral Sanctuary';
        villaModalDesc.textContent = 'Nestled amid lush coconut groves with unhindered private access to powdery white sands, private tropical garden, and open-air lava stone bath pavilion.';
      }
      openModal(villaModalBackdrop);
    });
  });

  if (closeVillaModal) closeVillaModal.addEventListener('click', () => closeModal(villaModalBackdrop));
  if (btnVillaSelectDate) {
    btnVillaSelectDate.addEventListener('click', () => {
      closeModal(villaModalBackdrop);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => openDatePopover('arrival'), 600);
    });
  }

  // Teaser link triggers villa modal
  if (teaserCard) {
    teaserCard.addEventListener('click', (e) => {
      e.preventDefault();
      villaModalTitle.textContent = 'Sunset Overwater Villa with Pool';
      openModal(villaModalBackdrop);
    });
  }

  // Close modals on clicking backdrop
  window.addEventListener('click', (e) => {
    if (e.target === escapeModalBackdrop) closeModal(escapeModalBackdrop);
    if (e.target === villaModalBackdrop) closeModal(villaModalBackdrop);
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(escapeModalBackdrop);
      closeModal(villaModalBackdrop);
      closeAllPopovers();
    }
  });

  // Global escape form handler
  window.handleEscapeSubmit = function() {
    closeModal(escapeModalBackdrop);
    showToast('Your inquiry has been received. Our concierge will contact you shortly.');
  };

  // Toast Notification Helper
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotification || !toastMsg) return;
    toastMsg.textContent = message;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4000);
  }

  // ==========================================================================
  // 9. AMBIENT OCEAN BREEZE SYNTHESIZER (Web Audio API)
  // Generates organic ocean waves and wind wash entirely in-browser!
  // ==========================================================================
  let audioCtx = null;
  let isPlayingAudio = false;
  let oceanNode = null;

  function initOceanAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Create pink noise buffer
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Gentle Lowpass filter modulated by slow LFO (ocean wave rhythm)
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 350;

      const lfo = audioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.12; // 8-second wave cycle

      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = 280;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Master Gain
      const masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.45;

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(audioCtx.destination);

      whiteNoise.start();
      lfo.start();

      oceanNode = { whiteNoise, lfo, masterGain };
    } catch (err) {
      console.warn('Audio synthesis not supported:', err);
    }
  }

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      if (!audioCtx) {
        initOceanAudio();
        isPlayingAudio = true;
        audioToggle.classList.add('playing');
        showToast('Playing ambient ocean sound');
        return;
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (isPlayingAudio) {
        oceanNode.masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
        audioToggle.classList.remove('playing');
        isPlayingAudio = false;
        showToast('Muted ambient sound');
      } else {
        oceanNode.masterGain.gain.setTargetAtTime(0.45, audioCtx.currentTime, 0.2);
        audioToggle.classList.add('playing');
        isPlayingAudio = true;
        showToast('Playing ambient ocean sound');
      }
    });
  }

  // ==========================================================================
  // 10. SUBTLE MOUSE PARALLAX ON HERO
  // ==========================================================================
  const heroSection = document.getElementById('hero');
  const heroTextBlock = document.querySelector('.hero-text-block');

  if (heroSection && heroTextBlock && window.innerWidth > 992) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;

      heroTextBlock.style.transform = `translate3d(${xPos * 0.4}px, ${yPos * 0.4}px, 0)`;
      if (teaserCard) {
        teaserCard.style.transform = `translate3d(${-xPos * 0.3}px, ${-yPos * 0.3}px, 0)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      heroTextBlock.style.transform = 'translate3d(0, 0, 0)';
      if (teaserCard) {
        teaserCard.style.transform = 'translate3d(0, 0, 0)';
      }
    });
  }
});

