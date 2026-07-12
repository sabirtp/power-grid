document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { navLinks.classList.remove('open'); });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { io.observe(el); });

  /* ---------- Animated meter counters ---------- */
  var counters = document.querySelectorAll('.meter .num[data-count]');
  var counterIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var noSuffix = el.hasAttribute('data-nosuffix');
      var suffixEl = el.querySelector('span');
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.childNodes[0].nodeValue = noSuffix ? current : current;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.childNodes[0].nodeValue = target;
        }
      }
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(function (el) { counterIO.observe(el); });

  /* ---------- Proficiency breaker grid ---------- */
  var proficiencyAreas = [
    'Unitised Substations', 'Transformers', 'DG Sets', 'PCC Panels',
    'MCC Panels', 'APFC Panels', 'AMF Panels', 'AC Drive Panels',
    'Generator Control Panels', 'LT Panels', 'Synchronizing Panels', 'Capacitor Panels',
    'Changeover Panels', 'Bus Duct Systems', 'Earthing Systems', 'Lightning Protection',
    'Light Wiring', 'Power Wiring', 'Cable Laying', 'Cable Tray Works',
    'Yard Lighting', 'AMC Services'
  ];
  var breakerGrid = document.getElementById('breakerGrid');
  proficiencyAreas.forEach(function (name, i) {
    var div = document.createElement('div');
    div.className = 'breaker';
    div.innerHTML = '<span class="switch" style="--d:' + (i % 6) + '"></span><span class="name">' + name + '</span>';
    breakerGrid.appendChild(div);
  });

  /* ---------- Featured projects data ---------- */
  var CAT_IMAGES = {
    Commercial: 'https://images.unsplash.com/photo-1509390144018-eeaf65052242?fm=jpg&q=70&w=700&auto=format&fit=crop',
    Industrial: 'https://images.unsplash.com/photo-1707387066870-d270231f819f?fm=jpg&q=70&w=700&auto=format&fit=crop',
    Educational: 'https://images.unsplash.com/photo-1613421633868-24fdb1b07d15?fm=jpg&q=70&w=700&auto=format&fit=crop',
    Healthcare: 'https://images.unsplash.com/photo-1652715564391-38cc4475b7f5?fm=jpg&q=70&w=700&auto=format&fit=crop',
    Hospitality: 'https://images.unsplash.com/photo-1566417108845-5ba9c2f9ea1b?fm=jpg&q=70&w=700&auto=format&fit=crop',
    Auditorium: 'https://images.unsplash.com/photo-1566417110104-cd4f94af0fb3?fm=jpg&q=70&w=700&auto=format&fit=crop'
  };

  var PROJECTS = [
    { cat: 'Commercial', name: 'Kerala State Hajj House', place: 'Calicut Airport', desc: 'Full electrical installation' },
    { cat: 'Commercial', name: 'TBG Tharayil Centre', place: 'Nesto Hypermarket, Perinthalmanna', desc: 'Full electrical installation' },
    { cat: 'Commercial', name: 'Kasavu Kendra Wedding Centre', place: 'Calicut / Manjeri', desc: 'Electrical works' },
    { cat: 'Commercial', name: 'Classic Hyundai', place: 'Malappuram', desc: 'Commercial showroom electrical installation' },
    { cat: 'Commercial', name: 'CP Suzuki', place: 'Calicut', desc: 'Commercial showroom electrification' },
    { cat: 'Commercial', name: 'Woodbine Restaurant', place: 'Kavungal, Malappuram', desc: 'Restaurant electrical works' },
    { cat: 'Commercial', name: 'Diamond Tower', place: 'Palakkad', desc: 'Commercial tower electrification' },

    { cat: 'Industrial', name: 'Impex (KCM Appliances Pvt Ltd)', place: 'Chamarajnagar', desc: 'Industrial electrification' },
    { cat: 'Industrial', name: 'Supernova', place: 'Kerala', desc: 'Industrial facility electrical installation' },
    { cat: 'Industrial', name: 'Chola Pickles', place: 'Payyanad', desc: 'Food processing industrial electrical works' },
    { cat: 'Industrial', name: 'Eurotech Polymers', place: 'Elankur, Manjeri', desc: 'Polymer industry — full electrical installation' },
    { cat: 'Industrial', name: 'Green Worms Eco Solutions', place: 'Kerala', desc: 'Eco industrial facility electrification' },
    { cat: 'Industrial', name: 'Formen Health Care LLP', place: 'Kerala', desc: 'Healthcare manufacturing electrical works' },
    { cat: 'Industrial', name: 'Manjeri City Infra Structures Developers LLP', place: 'Koyilandippadi', desc: 'Infrastructure development electrical project' },
    { cat: 'Industrial', name: 'Kurikkal Granite', place: 'Manjeri', desc: 'Granite industry electrification' },
    { cat: 'Industrial', name: 'Mubarak Granite', place: 'Edavanna', desc: 'Granite industry electrical works' },

    { cat: 'Educational', name: 'Duxford Edupark', place: 'Kalikavu', desc: 'Educational campus electrification' },
    { cat: 'Educational', name: 'Eranad Knowledge City (EKC)', place: 'Cherukulam, Manjeri', desc: 'Knowledge city electrification' },
    { cat: 'Educational', name: 'MEA Engineering College', place: 'Pattikkad, Perinthalmanna', desc: 'Campus electrical installation' },

    { cat: 'Healthcare', name: 'Malabar Hospital', place: 'Manjeri', desc: 'Full hospital electrical installation' },
    { cat: 'Healthcare', name: 'Relief Hospital', place: 'Kondotty', desc: 'Hospital electrical systems' },
    { cat: 'Healthcare', name: 'Ascent ENT Hospital', place: 'Perinthalmanna', desc: 'Medical facility electrification' },
    { cat: 'Healthcare', name: 'Sevana Hospital', place: 'Pattambi', desc: 'Hospital electrical systems' },
    { cat: 'Healthcare', name: 'Manu Memorial Hospital', place: 'Manjeri', desc: 'Complete hospital electrification' },

    { cat: 'Hospitality', name: 'Mount Xanadu Resorts', place: 'Ambalavayal', desc: 'Resort full electrification' },
    { cat: 'Hospitality', name: 'Aven Villa', place: 'Kakkadampoyil', desc: 'Villa electrical works' },

    { cat: 'Auditorium', name: 'Moyeen Kutty Vaidyar Smarakam', place: 'Kondotty', desc: 'Auditorium electrical installation' },
    { cat: 'Auditorium', name: 'Safa Highlands', place: 'Nellikkuthu', desc: 'Convention centre electrification' },
    { cat: 'Auditorium', name: 'Century Auditorium', place: 'Cherani', desc: 'Auditorium electrical installation' },
    { cat: 'Auditorium', name: 'VK Palace', place: 'Mullampara', desc: 'Convention hall electrical systems' },
    { cat: 'Auditorium', name: 'Naz Auditorium', place: 'Karakkunnu', desc: 'Auditorium electrification' },
    { cat: 'Auditorium', name: 'Royal Auditorium', place: 'Pallipadi', desc: 'Complete auditorium electrical works' }
  ];

  var CATEGORIES = ['Commercial', 'Industrial', 'Educational', 'Healthcare', 'Hospitality', 'Auditorium'];

  var filterRow = document.getElementById('filterRow');
  var projectGrid = document.getElementById('projectGrid');

  CATEGORIES.forEach(function (cat, i) {
    var btn = document.createElement('button');
    btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
    btn.setAttribute('data-cat', cat);
    btn.innerHTML = '<span class="led"></span>' + cat;
    btn.addEventListener('click', function () { setActiveCategory(cat); });
    filterRow.appendChild(btn);
  });

  PROJECTS.forEach(function (p) {
    var card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-cat', p.cat);
    card.innerHTML =
      '<div class="project-photo"><img src="' + CAT_IMAGES[p.cat] + '" alt="' + p.name + ' — ' + p.cat + ' electrical project" loading="lazy"></div>' +
      '<div class="project-body">' +
        '<span class="project-cat">' + p.cat + '</span>' +
        '<h4>' + p.name + '</h4>' +
        '<p>' + p.place + ' — ' + p.desc + '</p>' +
      '</div>';
    projectGrid.appendChild(card);
  });

  var emptyState = document.createElement('div');
  emptyState.className = 'empty-state';
  emptyState.textContent = 'No projects filed under this category yet.';
  projectGrid.appendChild(emptyState);

  function setActiveCategory(cat) {
    filterRow.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-cat') === cat);
    });
    var visibleCount = 0;
    projectGrid.querySelectorAll('.project-card').forEach(function (card) {
      var match = card.getAttribute('data-cat') === cat;
      card.classList.toggle('hide', !match);
      if (match) visibleCount++;
    });
    emptyState.classList.toggle('show', visibleCount === 0);
  }

  setActiveCategory(CATEGORIES[0]);

  /* ---------- Clients accordion ---------- */
  var CLIENTS = [
    { cat: 'Commercial', list: ['Kerala State Haji House, Calicut Airport', 'TBG Tharayil Centre (Nesto Hypermarket), Perinthalmanna', 'Kasavu Kendra Wedding Centre, Calicut / Manjeri', 'Classic Hyundai', 'CP Suzuki', 'Woodbine Restaurant, Kavungal, Malappuram', 'Diamond Tower, Palakkad'] },
    { cat: 'Industrial', list: ['Impex (KCM Appliances Pvt Ltd.), Chamarajnagar', 'Supernova', 'Chola Pickles', 'Eurotech Polymers', 'Green Worms Eco Solutions', 'Formen Health Care LLP (FHC)', 'Manjeri City Infra Structures Developers LLP', 'Kurikkal Granite, Manjeri', 'Mubarak Granite, Edavanna'] },
    { cat: 'Educational Institutions', list: ['Duxford Edupark, Kalikavu', 'Eranad Knowledge City (EKC), Cherukulam', 'MEA Engineering College, Pattikkad'] },
    { cat: 'Hospital Installations', list: ['Malabar Hospital, Manjeri', 'Relief Hospital, Kondotty', 'Ascent ENT Hospital, Perinthalmanna', 'Sevana Hospital, Pattambi', 'Manu Memorial Hospital, Manjeri'] },
    { cat: 'Resort & Villa', list: ['Mount Xanadu Resorts, Ambalavayal', 'Aven Villa, Kakkadampoyil'] },
    { cat: 'Auditorium / Convention', list: ['Moyeen Kutty Vaidyar Smarakam, Kondotty', 'Safa Highlands, Nellikkuthu', 'Century Auditorium, Cherani', 'VK Palace, Mullampara', 'Naz Auditorium, Karakkunnu', 'Royal Auditorium, Pallipadi'] }
  ];

  var accordion = document.getElementById('accordion');
  CLIENTS.forEach(function (group) {
    var item = document.createElement('div');
    item.className = 'acc-item';
    var listHtml = group.list.map(function (c) { return '<li>' + c + '</li>'; }).join('');
    item.innerHTML =
      '<button class="acc-head"><span>' + group.cat + '<span class="count">(' + group.list.length + ')</span></span><span class="plus"></span></button>' +
      '<div class="acc-panel"><ul class="acc-panel-inner">' + listHtml + '</ul></div>';
    accordion.appendChild(item);

    var head = item.querySelector('.acc-head');
    var panel = item.querySelector('.acc-panel');
    head.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      accordion.querySelectorAll('.acc-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.acc-panel').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  accordion.querySelector('.acc-item').classList.add('open');
  var firstPanel = accordion.querySelector('.acc-panel');
  firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';

});
