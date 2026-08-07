'use strict';

'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

// Background parallax and subtle 3D tilt based on pointer movement.
if (window.matchMedia('(pointer: fine)').matches) {
    const root = document.documentElement;
    const mainEl = document.querySelector('main');
    let lastX = 50;
    let lastY = 50;
    let rafId;

    document.addEventListener('pointermove', function (event) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(function () {
            const x = (event.clientX / window.innerWidth) * 100;
            const y = (event.clientY / window.innerHeight) * 100;
            lastX += (x - lastX) * 0.12;
            lastY += (y - lastY) * 0.12;

            root.style.setProperty('--bg-x', `${lastX}%`);
            root.style.setProperty('--bg-y', `${lastY}%`);
            root.style.setProperty('--tilt-x', `${((lastY - 50) / 50) * -3}deg`);
            root.style.setProperty('--tilt-y', `${((lastX - 50) / 50) * 3}deg`);
            if (mainEl) mainEl.style.setProperty('--tilt-x', `${((lastY - 50) / 50) * -3}deg`);
            if (mainEl) mainEl.style.setProperty('--tilt-y', `${((lastX - 50) / 50) * 3}deg`);
        });
    }, { passive: true });
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// FormSubmit requires an http(s) page. When this portfolio is opened directly
// from a file, use the visitor's mail app instead of showing a submission error.
if (form && window.location.protocol === 'file:') {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const subject = 'New portfolio contact message';
        const body = [
            `Name: ${formData.get('fullname') || ''}`,
            `Email: ${formData.get('email') || ''}`,
            '',
            `Message:`,
            formData.get('message') || ''
        ].join('\n');

        window.location.href = `mailto:narasimhanaidu2728@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let j = 0; j < pages.length; j++) {
            if(this.innerHTML.trim().toLowerCase() === pages[j].dataset.page.trim().toLowerCase()) {
                pages[j].classList.add('active');
                navigationLinks[j].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove('active');
                navigationLinks[j].classList.remove('active');
            }
        }
    });
}

// WEB AUDIO SYNTHESIZER FOR KEYBOARD TYPEWRITER SOUNDS
let audioCtx = null;

function playKeyClickSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Mechanical key click frequency burst
        const freq = 600 + Math.random() * 400;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
    } catch (e) {
        // AudioContext fallback
    }
}

// RESUME PREVIEW WITH TYPEWRITING EFFECT & SOUND
const previewResumeBtn = document.querySelector('#preview-resume-btn');
const resumeModal = document.querySelector('#resume-preview-modal');
const closeResumeModalBtn = document.querySelector('#close-resume-modal');
const resumeOverlay = document.querySelector('#resume-modal-overlay');
const downloadJsonBtn = document.querySelector('#download-json-resume');
const resumeTextContent = document.querySelector('#resume-text-content');

let typewriterTimer = null;
const fullResumeText = `B. R. NARASIMHA NAIDU
Cybersecurity Enthusiast | VAPT & AI-Driven Security | VIBE - CODING
Bapatla, Andhra Pradesh, India | narasimhanaidu2728@gmail.com | +91 91777 87729 | github.com/Narasimha917

EDUCATION
B.Tech in Computer Science & Engineering | Aug 2023 – April 2027
BAPATLA ENGINEERING COLLEGE — Bapatla, Andhra Pradesh
• Fourth-year student with a focus on cybersecurity and systems security
• Relevant coursework: Operating Systems, Computer Networks, Database Systems
• Active member of security-focused technical clubs
• Hands-on practicals and gaining experience in VAPT

EXPERIENCE
Cybersecurity Intern | May 2026 – Present
SynthoQuest Pvt. Ltd — Remote
• Conducted VAPT training and produced security tooling documentation
• Produced technical documentation for 8 security tools (CloudBrute, GitDorker, TruffleHog, EyeWitness, Subjack, LinkFinder, Katana)
• Practiced exploitation fundamentals on Metasploitable 2 and vsftpd 2.3.4 backdoor using Meterpreter
• Developed a 28-slide VAPT fundamentals presentation covering reconnaissance, scanning, exploitation, and reporting

PROJECTS
• Portfolio Business Card: Personal & portfolio card displaying complete profile (https://vcard-git-main-narasimha917s-projects.vercel.app)
• AI-Driven Malware Sandbox Analyzer: Portable malware sandbox to analyze files and detect malware using Python, FastAPI & ML threat scores
• AI-Powered Phishing Annihilator: AI Phishing analyzer for domains, emails, text, images with real-time threat score calculation

SKILLS
• Languages: Python, HTML, CSS, JavaScript
• Security Tools: Metasploit, Nmap, Burp Suite, CloudBrute, GitDorker, TruffleHog, EyeWitness, Subjack, LinkFinder, Katana, OWASP Juice Shop
• Platforms & Networking: Linux (Kali), Parrot OS, Windows, Cisco Packet Tracer
• AI/ML & Automation: Local-AI Agent workflow, LLM orchestration, NVIDIA NIM API, RAG pipelines, Shannon entropy analysis
• Security Concepts: VAPT fundamentals, OWASP Top 10, network security, vulnerability scanning
• Soft Skills: Communication, Time management`;

function startResumeTypewriter() {
    if (!resumeTextContent) return;

    // Reset current timer & content
    if (typewriterTimer) clearInterval(typewriterTimer);
    resumeTextContent.textContent = '';

    let index = 0;
    const speed = 6; // Milliseconds per character

    typewriterTimer = setInterval(() => {
        if (index < fullResumeText.length) {
            const char = fullResumeText.charAt(index);
            resumeTextContent.textContent += char;
            index++;

            // Play key click audio for non-whitespace characters
            if (char !== ' ' && char !== '\n' && index % 2 === 0) {
                playKeyClickSound();
            }

            // Auto scroll container as text renders
            const modalBody = resumeTextContent.parentElement;
            if (modalBody) modalBody.scrollTop = modalBody.scrollHeight;
        } else {
            clearInterval(typewriterTimer);
            typewriterTimer = null;
        }
    }, speed);
}

if (previewResumeBtn && resumeModal) {
    previewResumeBtn.addEventListener('click', () => {
        resumeModal.classList.add('is-open');
        startResumeTypewriter();
    });
}

const closeResumeModal = () => {
    if (resumeModal) resumeModal.classList.remove('is-open');
    if (typewriterTimer) {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
    }
};

if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);
if (resumeOverlay) resumeOverlay.addEventListener('click', closeResumeModal);

// Dynamic JSON Resume Downloader
if (downloadJsonBtn) {
    downloadJsonBtn.addEventListener('click', () => {
        const resumeData = {
            name: "B. R. NARASIMHA NAIDU",
            title: "Cybersecurity Enthusiast | VAPT & AI-Driven Security | VIBE - CODING",
            location: "Bapatla, Andhra Pradesh, India",
            email: "narasimhanaidu2728@gmail.com",
            phone: "+91 91777 87729",
            github: "https://github.com/Narasimha917",
            education: [
                {
                    degree: "B.Tech in Computer Science & Engineering",
                    institution: "BAPATLA ENGINEERING COLLEGE",
                    duration: "Aug 2023 – April 2027",
                    details: [
                        "Fourth-year student focused on cybersecurity & systems security",
                        "Coursework: Operating Systems, Computer Networks, Database Systems",
                        "Hands-on VAPT experience"
                    ]
                }
            ],
            experience: [
                {
                    role: "Cybersecurity Intern",
                    company: "SynthoQuest Pvt. Ltd",
                    type: "Remote",
                    duration: "May 2026 – Present",
                    highlights: [
                        "VAPT training and security tooling documentation",
                        "Documented 8 tools: CloudBrute, GitDorker, TruffleHog, EyeWitness, Subjack, LinkFinder, Katana",
                        "Exploitation fundamentals on Metasploitable 2 & vsftpd 2.3.4 backdoor using Meterpreter"
                    ]
                }
            ],
            projects: [
                {
                    name: "Portfolio Business Card",
                    domain: "https://vcard-git-main-narasimha917s-projects.vercel.app",
                    description: "Personal and portfolio business card showcasing complete profile"
                },
                {
                    name: "AI-DRIVEN MALWARE SANDBOX ANALYZER",
                    tech: "Python, FastAPI, ML Models",
                    description: "Portable AI Malware sandbox analyzer with Real-time Threat Scoring"
                },
                {
                    name: "AI-POWERED PHISHING AND SOCIAL ENGINEERING ANNIHILATOR",
                    description: "AI Phishing analyzer for domains, emails, text, and images with Threat Scoring"
                }
            ],
            skills: {
                languages: ["Python", "HTML", "CSS", "JavaScript"],
                tools: ["Metasploit", "Nmap", "Burp Suite", "CloudBrute", "GitDorker", "TruffleHog", "EyeWitness", "Subjack", "LinkFinder", "Katana", "OWASP Juice Shop"],
                platforms: ["Linux (Kali)", "Parrot OS", "Windows", "Cisco Packet Tracer"],
                ai_ml: ["Local-AI Agent workflow", "LLM agent orchestration", "NVIDIA NIM API integration", "RAG pipelines", "Shannon entropy analysis"],
                concepts: ["VAPT fundamentals", "OWASP Top 10", "Network security", "Vulnerability scanning"],
                soft_skills: ["Communication", "Time management"]
            }
        };

        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(resumeData, null, 2))}`;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", jsonString);
        downloadAnchor.setAttribute("download", "Resume.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
}

// Intro screen controls and FoldText integration
const introScreen = document.querySelector('#portfolio-intro');
const enterPortfolioButton = document.querySelector('[data-enter-portfolio]');
const introCursor = document.querySelector('.portfolio-intro__cursor');
const introCursorRing = document.querySelector('.portfolio-intro__cursor-ring');
const foldTitleElement = document.querySelector('#fold-text-title');

let foldTitleEngine = null;
let introComplete = false;

// Initialize FoldText for "Narasimha Naidu"
if (foldTitleElement && typeof FoldTextEngine !== 'undefined') {
    foldTitleEngine = new FoldTextEngine(foldTitleElement, {
        text: 'Narasimha Naidu',
        splitBy: 'char',
        hinge: 'top',
        duration: 0.65,
        stagger: 0.045,
        ease: 'power3.out',
        perspective: 700,
        creaseShading: 0.55,
        fontSize: 105,
        fontWeight: 800,
        color: '#f7f2e8',
        trigger: 'mount'
    });
}

const finishIntro = function () {
    if (introComplete) return;
    introComplete = true;

    if (foldTitleEngine) {
        foldTitleEngine.destroy();
        foldTitleEngine = null;
    }

    document.body.classList.remove('intro-active');
    document.body.classList.add('intro-leaving');
    speakPortfolioGreeting();
    window.setTimeout(function () {
        if (introScreen) introScreen.remove();
    }, 750);
};

if (introScreen && enterPortfolioButton) {
    document.body.classList.add('intro-active');

    enterPortfolioButton.addEventListener('click', function () {
        finishIntro();
    }, { once: true });
}

if (introScreen && introCursor && introCursorRing && window.matchMedia('(pointer: fine)').matches) {
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let ringX = cursorX;
    let ringY = cursorY;
    let cursorFrame;

    const animateIntroCursor = function () {
        ringX += (cursorX - ringX) * 0.16;
        ringY += (cursorY - ringY) * 0.16;
        introCursor.style.left = `${cursorX}px`;
        introCursor.style.top = `${cursorY}px`;
        introCursorRing.style.left = `${ringX}px`;
        introCursorRing.style.top = `${ringY}px`;
        cursorFrame = window.requestAnimationFrame(animateIntroCursor);
    };

    introScreen.classList.add('cursor-active');
    animateIntroCursor();

    introScreen.addEventListener('pointermove', function (event) {
        cursorX = event.clientX;
        cursorY = event.clientY;
        const pointerX = (event.clientX / window.innerWidth) * 100;
        const pointerY = (event.clientY / window.innerHeight) * 100;
        const rotateX = ((pointerY - 50) / 50) * -2.5;
        const rotateY = ((pointerX - 50) / 50) * 2.5;

        introScreen.style.setProperty('--pointer-x', `${pointerX}%`);
        introScreen.style.setProperty('--pointer-y', `${pointerY}%`);
        introScreen.style.setProperty('--stage-rotate-x', `${rotateX}deg`);
        introScreen.style.setProperty('--stage-rotate-y', `${rotateY}deg`);
    });

    introScreen.addEventListener('pointerleave', function () {
        introScreen.style.setProperty('--stage-rotate-x', '0deg');
        introScreen.style.setProperty('--stage-rotate-y', '0deg');
    });

    enterPortfolioButton.addEventListener('pointerenter', function () {
        introScreen.classList.add('cursor-on-button');
    });
    enterPortfolioButton.addEventListener('pointerleave', function () {
        introScreen.classList.remove('cursor-on-button');
    });
    enterPortfolioButton.addEventListener('click', function () {
        window.cancelAnimationFrame(cursorFrame);
    }, { once: true });
}

// Avatar-integrated assistant for portfolio questions and contact actions.
function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 18) return 'Good afternoon!';
    return 'Good evening!';
}

const portfolioChat = document.createElement('aside');
portfolioChat.className = 'portfolio-chat';
portfolioChat.setAttribute('aria-label', 'Portfolio assistant');
portfolioChat.innerHTML = `
    <section class="portfolio-chat__panel" aria-live="polite">
        <div class="portfolio-chat__header"><span>Portfolio Assistant</span></div>
        <div class="portfolio-chat__messages" data-chat-messages>
            <p class="portfolio-chat__message portfolio-chat__message--assistant">${getTimeGreeting()}</p>
            <p class="portfolio-chat__message portfolio-chat__message--assistant">Can I assist you? You can ask about skills, projects, GitHub, contact, or location.</p>
        </div>
        <form class="portfolio-chat__form" data-chat-form>
            <input class="portfolio-chat__input" data-chat-input type="text" placeholder="Ask a question..." autocomplete="off" aria-label="Ask a portfolio question">
            <button class="portfolio-chat__send" type="submit">Send</button>
        </form>
    </section>`;
document.body.appendChild(portfolioChat);

const avatarBox = document.querySelector('.avatar-box');
const chatForm = portfolioChat.querySelector('[data-chat-form]');
const chatInput = portfolioChat.querySelector('[data-chat-input]');
const chatMessages = portfolioChat.querySelector('[data-chat-messages]');
const avatarGreeting = document.createElement('p');
avatarGreeting.className = 'portfolio-assistant-greeting';
avatarGreeting.textContent = getTimeGreeting();
document.body.appendChild(avatarGreeting);
let greetingTimer;

const positionPortfolioChat = function () {
    if (!avatarBox) return;
    const avatarRect = avatarBox.getBoundingClientRect();
    const chatWidth = Math.min(350, window.innerWidth - 32);
    const left = Math.min(window.innerWidth - chatWidth - 16, avatarRect.right + 16);
    const top = Math.min(window.innerHeight - 360, Math.max(16, avatarRect.top));
    portfolioChat.style.left = `${Math.max(16, left)}px`;
    portfolioChat.style.top = `${top}px`;
};

const showAvatarGreeting = function () {
    if (!avatarBox) return;
    const avatarRect = avatarBox.getBoundingClientRect();
    const bubbleWidth = Math.min(210, window.innerWidth - 32);
    const left = Math.min(window.innerWidth - bubbleWidth - 16, avatarRect.right + 14);
    avatarGreeting.style.left = `${Math.max(16, left)}px`;
    avatarGreeting.style.top = `${Math.max(16, avatarRect.top + 16)}px`;
    avatarGreeting.classList.add('is-visible');
    window.clearTimeout(greetingTimer);
    greetingTimer = window.setTimeout(function () {
        avatarGreeting.classList.remove('is-visible');
    }, 5500);
};

if (avatarBox) {
    const avatarTrigger = document.createElement('button');
    avatarTrigger.className = 'portfolio-assistant-trigger';
    avatarTrigger.type = 'button';
    avatarTrigger.setAttribute('aria-label', 'Open portfolio assistant');
    avatarTrigger.setAttribute('aria-expanded', 'false');
    avatarTrigger.textContent = 'Ask me ✦';
    avatarBox.appendChild(avatarTrigger);

    avatarTrigger.addEventListener('click', function () {
        const isOpen = portfolioChat.classList.toggle('is-open');
        avatarTrigger.setAttribute('aria-expanded', String(isOpen));
        avatarTrigger.setAttribute('aria-label', isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant');
        if (isOpen) {
            positionPortfolioChat();
            chatInput.focus();
        }
    });
}

window.addEventListener('resize', function () {
    if (portfolioChat.classList.contains('is-open')) positionPortfolioChat();
});

function speakPortfolioGreeting() {
    showAvatarGreeting();
    window.setTimeout(function () {
        avatarGreeting.textContent = 'Can I assist you?';
        showAvatarGreeting();
    }, 1100);
}

const addChatMessage = function (text, role, action, suggestions) {
    const message = document.createElement('div');
    message.className = `portfolio-chat__message portfolio-chat__message--${role}`;
    message.textContent = text;

    if (action) {
        const link = document.createElement('a');
        link.className = 'portfolio-chat__action';
        link.href = action.href;
        link.textContent = action.label;
        if (action.external) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
        message.appendChild(link);
    }

    chatMessages.appendChild(message);

    if (suggestions && suggestions.length) {
        const chipRow = document.createElement('div');
        chipRow.className = 'portfolio-chat__chips';
        suggestions.forEach(function (label) {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'portfolio-chat__chip';
            chip.textContent = label;
            chip.addEventListener('click', function () {
                processPortfolioQuestion(label);
            });
            chipRow.appendChild(chip);
        });
        chatMessages.appendChild(chipRow);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
};

const showTypingIndicator = function () {
    const typing = document.createElement('div');
    typing.className = 'portfolio-chat__message portfolio-chat__message--assistant portfolio-chat__typing';
    typing.setAttribute('data-typing-indicator', '');
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typing;
};

// Intent library
const portfolioIntents = [
    {
        name: 'greeting',
        patterns: [[/\b(hi|hello|hey|yo|hola)\b/, 3], [/good (morning|afternoon|evening)/, 3]],
        respond: function () {
            return { text: `${getTimeGreeting()} I'm Narasimha's portfolio assistant. Ask me about his skills, projects, education, certificates, or how to contact him.` };
        }
    },
    {
        name: 'thanks',
        patterns: [[/\b(thanks|thank you|thankyou|thx|appreciate it)\b/, 4]],
        respond: function () {
            return { text: "You're welcome! Let me know if there's anything else you'd like to know about Narasimha." };
        }
    },
    {
        name: 'goodbye',
        patterns: [[/\b(bye|goodbye|see you|see ya|later)\b/, 4]],
        respond: function () {
            return { text: 'Take care! Feel free to reopen this chat anytime you have a question.' };
        }
    },
    {
        name: 'identity',
        patterns: [[/\b(your name|who are you|about you|about narasimha|about him|introduce)\b/, 3], [/\bnarasimha\b/, 1], [/\bbattula\b/, 2]],
        respond: function () {
            return { text: 'This is the portfolio of Battula Ramanjaneya Narasimha Naidu, a Computer Science and Engineering student and cybersecurity enthusiast from Bapatla, Andhra Pradesh.', suggestions: ['What are his skills?', 'Show his projects', 'How do I contact him?'] };
        }
    },
    {
        name: 'certificates',
        patterns: [[/\b(certificate|certification|certifications|credential|credentials|course completed)\b/, 4]],
        respond: function () {
            return { text: 'Narasimha holds credentials in cybersecurity, IBM SkillsBuild, mathematics workshops, Google assessments, Android bug bounty hunting, SQL injection attacks, and cybersecurity for businesses. Opening the Certificates section.', page: 'certificates' };
        }
    },
    {
        name: 'resume',
        patterns: [[/\b(resume|cv|curriculum vitae)\b/, 4]],
        respond: function () {
            return { text: 'Opening Narasimha’s resume, which covers his education, experience, and technical skills.', page: 'resume' };
        }
    },
    {
        name: 'social',
        patterns: [[/\b(social media|linkedin|twitter|instagram)\b/, 3]],
        respond: function () {
            return { text: 'The public profile link currently available on this portfolio is GitHub.', action: { label: 'Open GitHub', href: 'https://github.com/Mark-one1', external: true } };
        }
    },
    {
        name: 'github',
        patterns: [[/\b(github|git hub|repository|repositories|repo|code samples|source code)\b/, 4]],
        respond: function () {
            return { text: "Narasimha's GitHub profile is ready to open — that's where his project code lives.", action: { label: 'Open GitHub', href: 'https://github.com/Mark-one1', external: true } };
        }
    },
    {
        name: 'email',
        patterns: [[/\b(email|e-mail|mail him|mail address|gmail)\b/, 4]],
        respond: function () {
            return { text: 'You can email Narasimha directly at narasimhanaidu2728@gmail.com.', action: { label: 'Email Narasimha', href: 'mailto:narasimhanaidu2728@gmail.com' } };
        }
    },
    {
        name: 'phone',
        patterns: [[/\b(phone|call|number|mobile|whatsapp)\b/, 4]],
        respond: function () {
            return { text: 'You can reach Narasimha by phone at +91 91777 87729.', action: { label: 'Call Narasimha', href: 'tel:+919177787729' } };
        }
    },
    {
        name: 'location',
        patterns: [[/\b(location|where.*(live|based|from)|bapatla|address|map|andhra)\b/, 4]],
        respond: function () {
            return { text: 'Narasimha is based in Bapatla, Andhra Pradesh, India. Opening the map in the Contact section.', page: 'contact', action: { label: 'Open location in Maps', href: 'https://maps.app.goo.gl/dfqJXhnC7D1P87RG6', external: true } };
        }
    },
    {
        name: 'skills',
        patterns: [[/\b(skill|skills|know|proficient|good at|expertise|vapt|pentest|penetration|security tool|tools)\b/, 3]],
        respond: function () {
            return { text: 'Narasimha focuses on VAPT (vulnerability assessment & penetration testing), systems security, security tooling, and AI-driven security solutions. Opening his resume for the full breakdown.', page: 'resume', suggestions: ['What tools has he used?', 'Show his projects'] };
        }
    },
    {
        name: 'projects',
        patterns: [[/\b(project|projects|built|build|portfolio work|web dev|application|app)\b/, 3]],
        respond: function () {
            return { text: 'His portfolio highlights an AI-driven malware sandbox analyzer, an AI-powered phishing analyzer, and other security-focused web projects. Opening the Portfolio section.', page: 'portfolio', suggestions: ['Tell me about his skills', 'Any AI projects?'] };
        }
    },
    {
        name: 'ai',
        patterns: [[/\b(ai|artificial intelligence|machine learning|ml|chatbot|automation)\b/, 4]],
        respond: function () {
            return { text: 'Narasimha builds AI-assisted security tools, including an AI-driven malware sandbox analyzer and an AI-powered phishing analyzer with real-time threat scoring.', page: 'portfolio' };
        }
    },
    {
        name: 'experience',
        patterns: [[/\b(experience|intern|internship|worked|job history)\b/, 4]],
        respond: function () {
            return { text: 'He has hands-on VAPT practice, security-tool research, documentation, reconnaissance, scanning, exploitation, and reporting experience — including work with tools like Metasploitable 2 and CloudBrute.', page: 'resume' };
        }
    },
    {
        name: 'education',
        patterns: [[/\b(education|study|studies|college|university|student|degree)\b/, 3]],
        respond: function () {
            return { text: 'Narasimha is a Computer Science and Engineering student with a focus on cybersecurity. Opening his resume for education details.', page: 'resume' };
        }
    },
    {
        name: 'contact',
        patterns: [[/\b(contact|reach|get in touch|connect)\b/, 3]],
        respond: function () {
            return { text: 'Opening the Contact section, where you’ll find Narasimha’s email, phone, and location.', page: 'contact', suggestions: ['What is his email?', 'What is his phone number?'] };
        }
    },
    {
        name: 'help',
        patterns: [[/\b(help|what can you do|options|menu)\b/, 3]],
        respond: function () {
            return { text: 'I can answer questions about Narasimha’s skills, projects, education, certificates, resume, or how to contact him — just ask!', suggestions: ['Show his skills', 'Show his projects', 'How do I contact him?'] };
        }
    }
];

const classifyPortfolioQuestion = function (question) {
    const query = ` ${question.toLowerCase().trim()} `;
    let bestIntent = null;
    let bestScore = 0;

    portfolioIntents.forEach(function (intent) {
        let score = 0;
        intent.patterns.forEach(function (patternPair) {
            const pattern = patternPair[0];
            const weight = patternPair[1];
            if (pattern.test(query)) score += weight;
        });
        if (score > bestScore) {
            bestScore = score;
            bestIntent = intent;
        }
    });

    return bestScore > 0 ? bestIntent : null;
};

const getPortfolioAnswer = function (question) {
    const intent = classifyPortfolioQuestion(question);
    if (intent) return intent.respond();
    return {
        text: 'I didn’t quite catch that. I can help with Narasimha’s skills, projects, education, certificates, resume, or contact details — what would you like to know?',
        suggestions: ['Show his skills', 'Show his projects', 'How do I contact him?']
    };
};

const processPortfolioQuestion = function (question) {
    if (!question) return;
    addChatMessage(question, 'user');

    const typingIndicator = showTypingIndicator();
    const thinkDelay = 380 + Math.min(500, question.length * 12);

    window.setTimeout(function () {
        typingIndicator.remove();
        const answer = getPortfolioAnswer(question);
        addChatMessage(answer.text, 'assistant', answer.action, answer.suggestions);

        if (answer.page) {
            const destination = Array.from(document.querySelectorAll('[data-nav-link]')).find(function (link) {
                return link.textContent.trim().toLowerCase() === answer.page;
            });
            if (destination) window.setTimeout(function () { destination.click(); }, 450);
        }
    }, thinkDelay);
};

chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const question = chatInput.value.trim();
    if (!question) return;
    processPortfolioQuestion(question);
    chatInput.value = '';
    chatInput.focus();
});

// Border-glow-card effect
const glowCards = document.querySelectorAll('.border-glow-card');

glowCards.forEach(card => {
    const getCenterOfElement = (el) => {
        const { width, height } = el.getBoundingClientRect();
        return [width / 2, height / 2];
    };

    const getEdgeProximity = (el, x, y) => {
        const [cx, cy] = getCenterOfElement(el);
        const dx = x - cx;
        const dy = y - cy;
        let kx = Infinity;
        let ky = Infinity;
        if (dx !== 0) kx = cx / Math.abs(dx);
        if (dy !== 0) ky = cy / Math.abs(dy);
        return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    };

    const getCursorAngle = (el, x, y) => {
        const [cx, cy] = getCenterOfElement(el);
        const dx = x - cx;
        const dy = y - cy;
        if (dx === 0 && dy === 0) return 0;
        const radians = Math.atan2(dy, dx);
        let degrees = radians * (180 / Math.PI) + 90;
        if (degrees < 0) degrees += 360;
        return degrees;
    };

    card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);

        card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
        card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
    });
});
