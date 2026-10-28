/**
 * AURA MALDIVES — CLIENT INTERACTION & MOTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements Selection
  const siteHeader = document.getElementById('siteHeader');
  const heroBg = document.getElementById('heroBg');
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

  // The hero uses one clear, consistent island view.
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(() => heroBg.classList.add('zoom'), 100);
  }

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
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
      mobileDrawer.inert = !isOpen;
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileDrawer.inert = true;
      });
    });

    if (drawerEscapeBtn) {
      drawerEscapeBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileDrawer.inert = true;
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let selectedStart = null;
  let selectedEnd = null;
  let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectingDate = 'arrival';
  const formatDate = date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const monthLabel = document.getElementById('currentMonthLabel');
  const rangeHint = document.getElementById('calRangeHint');
  const inquiryArrival = document.getElementById('inquiryArrival');

  function updateDateLabels() {
    arrivalValue.textContent = selectedStart ? formatDate(selectedStart) : 'Choose date';
    departureValue.textContent = selectedEnd ? formatDate(selectedEnd) : 'Choose date';
    if (selectedStart && selectedEnd) {
      const nights = Math.round((Date.UTC(selectedEnd.getFullYear(), selectedEnd.getMonth(), selectedEnd.getDate()) - Date.UTC(selectedStart.getFullYear(), selectedStart.getMonth(), selectedStart.getDate())) / 86400000);
      rangeHint.textContent = `${nights} night${nights === 1 ? '' : 's'} selected`;
      if (inquiryArrival) inquiryArrival.value = `${formatDate(selectedStart)} – ${formatDate(selectedEnd)} · ${nights} nights`;
    } else {
      rangeHint.textContent = selectedStart ? 'Select a departure date' : 'Select your arrival date';
      if (inquiryArrival) inquiryArrival.value = 'Select dates above';
    }
  }

  function renderCalendar() {
    const days = document.getElementById('calDaysBody');
    if (!days) return;
    days.innerHTML = '';
    monthLabel.textContent = visibleMonth.toLocaleDateString('en-US', {month:'long', year:'numeric'});
    const year = visibleMonth.getFullYear(), month = visibleMonth.getMonth();
    const offset = new Date(year, month, 1).getDay(), total = new Date(year, month + 1, 0).getDate();
    for (let i=0;i<offset;i++) { const empty=document.createElement('span');empty.className='cal-day empty';days.appendChild(empty); }
    for (let day=1;day<=total;day++) {
      const date=new Date(year,month,day), button=document.createElement('button');
      button.type='button';button.className='cal-day';button.textContent=day;
      button.setAttribute('aria-label',formatDate(date));button.disabled=date<today;
      if (selectedStart && date.getTime()===selectedStart.getTime()) button.classList.add('selected','range-start');
      if (selectedEnd && date.getTime()===selectedEnd.getTime()) button.classList.add('selected','range-end');
      if (selectedStart && selectedEnd && date>selectedStart && date<selectedEnd) button.classList.add('in-range');
      button.addEventListener('click',(event)=>{
        event.stopPropagation();
        if (selectingDate==='arrival' || !selectedStart || date<=selectedStart) {
          selectedStart=date;selectedEnd=null;selectingDate='departure';
        } else { selectedEnd=date;selectingDate='arrival'; }
        updateDateLabels();renderCalendar();
      });
      days.appendChild(button);
    }
  }
  document.getElementById('prevMonth')?.addEventListener('click',()=>{visibleMonth=new Date(visibleMonth.getFullYear(),visibleMonth.getMonth()-1,1);renderCalendar();});
  document.getElementById('nextMonth')?.addEventListener('click',()=>{visibleMonth=new Date(visibleMonth.getFullYear(),visibleMonth.getMonth()+1,1);renderCalendar();});
  updateDateLabels();renderCalendar();

  // Toggle Date Popover
  function openDatePopover(type) {
    closeAllPopovers();
    selectingDate = type;
    visibleMonth = new Date((type === 'departure' && selectedEnd ? selectedEnd : selectedStart || today).getFullYear(), (type === 'departure' && selectedEnd ? selectedEnd : selectedStart || today).getMonth(), 1);
    renderCalendar();
    datePickerPopover.classList.add('open');
    if (type === 'arrival') arrivalField.classList.add('active');
    if (type === 'departure') departureField.classList.add('active');
  }

  [arrivalField, departureField, guestsField].forEach(field => field?.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); field.click(); } }));

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
      showToast(selectedStart && selectedEnd ? `Dates selected: ${formatDate(selectedStart)} – ${formatDate(selectedEnd)}` : 'Select both arrival and departure dates.');
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
      const villaImage = document.getElementById('villaModalImg');
      if (villaImage) { villaImage.src = villaType === 'sunset-overwater' ? 'assets/aura-villa.webp' : villaType === 'grand-lagoon' ? 'assets/villa-bedroom.jpg' : 'assets/wellness.jpg'; villaImage.alt = btn.closest('.villa-card')?.querySelector('.villa-title')?.textContent || 'AURA residence'; }
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
    showToast('Concept preview: no inquiry was sent.');
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
        audioToggle.setAttribute('aria-pressed', 'true');
        showToast('Playing ambient ocean sound');
        return;
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (isPlayingAudio) {
        oceanNode.masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
        audioToggle.classList.remove('playing');
        audioToggle.setAttribute('aria-pressed', 'false');
        isPlayingAudio = false;
        showToast('Muted ambient sound');
      } else {
        oceanNode.masterGain.gain.setTargetAtTime(0.45, audioCtx.currentTime, 0.2);
        audioToggle.classList.add('playing');
        audioToggle.setAttribute('aria-pressed', 'true');
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

  if (heroSection && heroTextBlock && window.innerWidth > 992 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

