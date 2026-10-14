
/* =========================
   MOBILE MENU
========================= */

const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

menu?.addEventListener('click', () => {
    nav.classList.toggle('open');
});

document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

/* =========================
   CONTACT EMAIL FORM
========================= */

const contactFormDialog = document.getElementById('contact-email-dialog');
const contactForm = contactFormDialog?.querySelector('.contact-form');
const closeContactForm = contactFormDialog?.querySelector('.contact-form-close');
const contactFormStatus = contactForm?.querySelector('.contact-form-status');
const contactFormSubmit = contactForm?.querySelector('[type="submit"]');

document.querySelectorAll('[data-open-contact-form]').forEach(trigger => {
    trigger.addEventListener('click', event => {
        event.preventDefault();
        contactFormDialog?.showModal();
    });
});

closeContactForm?.addEventListener('click', () => {
    contactFormDialog?.close();
});

contactFormDialog?.addEventListener('click', event => {
    if (event.target === contactFormDialog) {
        contactFormDialog.close();
    }
});

contactForm?.addEventListener('submit', async event => {
    event.preventDefault();

    if (!contactForm.reportValidity() || !contactFormStatus || !contactFormSubmit) {
        return;
    }

    contactFormSubmit.disabled = true;
    contactFormSubmit.textContent = 'Sending...';
    contactFormStatus.hidden = true;
    contactFormStatus.classList.remove('is-error');

    try {
        const formSubmitEndpoint = new URL(contactForm.action);
        formSubmitEndpoint.pathname = `/ajax${formSubmitEndpoint.pathname}`;
        const response = await fetch(formSubmitEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
        });
        const result = await response.json();

        if (!response.ok || (result.success !== true && result.success !== 'true')) {
            throw new Error(result.message || 'The email service could not send your message.');
        }

        contactFormStatus.textContent = 'Message sent successfully. Thank you for reaching out!';
        contactFormStatus.hidden = false;
        contactForm.reset();
    } catch (error) {
        contactFormStatus.textContent = error instanceof Error
            ? `Unable to send your message: ${error.message}`
            : 'Unable to send your message. Please try again.';
        contactFormStatus.classList.add('is-error');
        contactFormStatus.hidden = false;
    } finally {
        contactFormSubmit.disabled = false;
        contactFormSubmit.textContent = 'Send Email';
    }
});

/* =========================
   PROJECT DETAILS
========================= */

const projectDetails = document.getElementById('project-details-dialog');
const projectDetailsTitle = projectDetails?.querySelector('#project-details-title');
const projectDetailsGallery = projectDetails?.querySelector('.project-details-gallery');
const projectDetailsCopy = projectDetailsGallery?.querySelector('.project-details-copy');
const projectDescription = projectDetails?.querySelector('[data-project-description]');
const projectStory = projectDetails?.querySelector('[data-project-story]');
const closeProjectDetails = projectDetails?.querySelector('.project-details-close');

const projectNarratives = {
    'QR-CY (Capstone Project)': {
        description: 'A web based volunteer coordination platform designed for the Red Cross to streamline volunteer management and community activities. The system includes QR code based attendance tracking, announcements, duty assignments, duty monitoring, and volunteer dashboards, helping coordinators organize schedules, manage responsibilities, and keep volunteers informed and updated.',
        story: 'The project brings Red Cross volunteer operations into one organized platform. It features separate Admin, Head, and Volunteer dashboards, each designed to provide role specific tools for managing QR code attendance, announcements, duty assignments, and volunteer activities. By centralizing these essential functions, the system helps improve coordination, simplify task management, and keep volunteers informed and organized.'
    },
    'Team Banner': {
        description: 'A bold, high-impact team banner showcasing the five members of Bestie X Boss through striking portraits, powerful typography, and dramatic visual effects. Designed to highlight the team’s identity, unity, and competitive spirit.',
        story: 'Inspired by the intense battles of Mobile Legends: Bang Bang, this design embodies a team that wants to look intimidating and stand out on and off the battlefield. Dark textures, golden lightning, and dragon inspired elements create a fierce visual identity that reflects Bestie X Boss’s unity, confidence, and hunger for victory. Every detail is crafted to make the squad look as formidable as they aim to be ingame.'
    },
    'Tiba Landing Page': {
        description: 'A product landing page for Tiba Relax Into Sleep, presenting the drink, its flavor, and its sleep-wellness positioning.',
        story: 'The soft palette and product focused layout give the page a calm, restful mood while keeping the cans and key product details at the center.'
    },
    'Zero to One Landing Page': {
        description: 'A minimal, modern landing page concept for Zero to One Digital Marketing, featuring a clean layout, refined typography, and a sleek visual aesthetic. Designed to introduce the brand, showcase its projects, and guide visitors toward its contact links through a simple and intuitive user experience.',
        story: 'Black and white aesthetic gives Zero to One Digital Marketing a bold and confident identity. Oversized typography, clean layouts, and concise calls to action create a sleek, professional experience that highlights the brands creativity while keeping the focus on its projects and digital presence.'
    },
    'Essensa Naturale Mobile Application': {
        description: 'A mobile shopping experience for Essensa Naturale, covering account access, product discovery, product details, reviews, cart, checkout, and profile screens.',
        story: 'The screens follow a shopper from browsing natural products through purchase and account tasks, keeping the store journey connected across the app.'
    },
    'PC Things': {
        description: 'A website design concept for PCkids Academy, focused on creating a welcoming, engaging, and user-friendly online experience for children, parents, and educators.',
        story: 'A playful modern design school project direction makes learning about technology fun and accessible for children. With a clean layout and engaging visuals, the website aims to spark curiosity, encourage creativity, and help young learners explore the world of technology.'
    },
    'Noteflix': {
        description: 'A website design concept for NOTEFLIX, focused on creating a modern and user friendly platform for organizing notes and making information easier to access and manage.',
        story: 'Developed as a school project, NOTEFLIX combines Netflix’s bold visuals and dark interface with a practical note taking concept. Its minimalist design and content focused layout reimagine how students can organize and explore their notes through a familiar, entertainment inspired digital experience.'
    },
    'Donut Picnic': {
        description: 'A creative 3D donut design created as a school activity, featuring colorful toppings and imaginative designs inspired by real life flavors and popular characters.',
        story: 'Created as part of a school activity, the donut design stood out as the most impressive in the entire section. From Mickey Mouse inspired details to strawberry donuts topped with sprinkles, each design showcased creativity, attention to detail, and inspiration drawn from real life flavors and playful concepts.'
    },
    'Spooky House': {
        description: 'A Halloween themed 3D scene created as a school activity, featuring a haunted house, glowing pumpkins, a scarecrow, and a floating ghost in a spooky yet playful environment.',
        story: 'Developed as part of a school activity, the scene brings Halloween to life through creative 3D modeling and recognizable seasonal elements. The combination of eerie surroundings, glowing details, and playful characters showcases creativity and attention to detail while capturing the fun and spooky spirit of Halloween.'
    },
    'SpongeBob Xmas': {
        description: 'A festive 3D Christmas scene created as a school activity, featuring SpongeBob in a holiday setting with a Christmas tree and creative Christmas themed designs.',
        story: 'Created as part of a school activity, the project received the Most Creative award for its imaginative combination of SpongeBob and the Christmas spirit. By blending a familiar character with festive decorations and holiday elements, the scene showcases creativity, playful storytelling, and attention to detail through 3D design.'
    },
    'Nadia': {
        description: 'A minimalist logo design for Nadia, built around a custom monogram and clean, refined typography.',
        story: 'The identity keeps the visual language intentionally simple, combining intertwined letterforms with a hanger element to communicate the clothing brands purpose while creating a distinct and recognizable mark.'
    },
    'Mr. & Mrs. Villas Tarpaulin': {
        description: 'A campaign tarpaulin design for Mr. and Mrs. Villas, featuring candidate portraits, names, and campaign messaging.',
        story: 'The design communicates Mr. and Mrs. Villas’ campaign message, presenting their identity and aspirations to the community as they seek the people’s trust and support through their candidacy.'
    },
    'Vizar Auto Supply': {
        description: 'A logo design for Vizar Auto Supply, pairing a classic car illustration with a bold gold-and-black shield.',
        story: 'The emblem uses automotive imagery and a strong badge shape to give the auto-parts business a distinctive, established identity.'
    },
    'Mr. & Mrs. Villas Tent': {
        description: 'A 3D tent mockup featuring the Mr. & Mrs. Villas campaign artwork, designed to showcase how the campaign visuals appear on an event tent.',
        story: 'Brings the Mr. & Mrs. Villas campaign artwork into a real world event setting, presenting their campaign identity on a tent that helps share their message with the community and encourage public support.'
    },
    'GSM Tatak Villas Calendar': {
        description: 'A calendar design for GSM Tatak Villas, pairing date information with branded campaign visuals.',
        story: 'The design uses a practical calendar format to introduce GSM Tatak Villas and showcase its members, helping people become more familiar with the individuals behind the group while keeping its identity visible throughout the year.'
    },
    'Bestie X Boss Logo': {
        description: 'A logo design for Bestie X Boss, creating a compact brand mark for the team.',
        story: 'The identity gives the group a shared symbol that can stand on its own across team graphics and related creative materials.'
    }
};

const qrcySections = {
    Admin: {
        Announcement: [
            '1bed9f1f-5859-4a9e-b8b9-0d80c0c30b84.jpg',
            '07e7ffaa-c96a-420d-910b-34f10a70a839.jpg',
            'cb24cb11-d6e8-4bc8-a354-bf646214f6e6.jpg',
            'f96221f8-f0f3-48b3-a826-eeb3c5081013.jpg'
        ],
        Dashboard: [
            '0e57c50c-bfe8-4c5e-a6bc-74c2b940e8b3.jpg',
            '6b8f4016-07b0-4b53-a933-0b3718ccd179.jpg',
            '8e7d5f3e-3ee5-4511-9363-0ec42e987a9d.jpg',
            '56e40dc0-73e6-4cbb-8b7a-c01774513464.jpg',
            '914d3bab-4081-4787-b341-a068707056e3.jpg',
            'b87d454a-f553-4d41-a1c8-84443d0421cf.jpg',
            'bda0eb38-a0a5-4e4b-a6c6-10ca9e586ee2.jpg',
            'f1722595-44eb-451d-8572-f31d9c39a7f6 (1).jpg',
            'f1722595-44eb-451d-8572-f31d9c39a7f6.jpg'
        ],
        Duty: [
            '2d3194d4-1e28-423a-a9e6-be2e8533f75b.jpg',
            '67d4f3c8-7cea-460e-9ecc-15e52295a7d2.jpg',
            '93cfd5ac-c5c7-4c01-ba85-6487b3719cc0.jpg',
            'bc65c12f-9c51-486d-9207-775970a49708.jpg',
            'ce3882b6-73cd-440c-8c3d-b1a949af7ef8.jpg',
            'f287f011-efed-4a47-bbe3-3983b658f384.jpg'
        ],
        Inventory: [
            '1bd51c63-34fd-49eb-b020-43eab81020d2.jpg',
            '70d9de32-ada0-40b3-bc90-3582f382f5b2.jpg'
        ],
        Mapping: [
            '5bb71476-8edb-412d-b4f0-6be6710a508b.jpg',
            '26d1f778-da9e-4998-b7a1-ee33c15dc0a2.jpg',
            '26381c74-8f94-4c7b-9c5b-f733a7357eb9.jpg',
            '55904483-0e1e-433c-8f04-6d7ca2f7136b.jpg',
            'b43ebca7-497d-4ed7-bda2-40406b696298.jpg',
            'c034232d-ddd2-444c-b4b9-70a2061fee58.jpg',
            'cc76024a-6acb-446a-b582-ca9bca19976a.jpg',
            'd28fb838-bb42-44b9-9827-35b6b862bc8f.jpg'
        ],
        Scanner: ['1dfe6f82-16f4-4534-a118-bb1b47a0598f.jpg'],
        'Settings & Profile': [
            '9b734f87-1e44-4169-a026-31d87ad48662.jpg',
            '744d1f4f-7098-4801-8c76-16cc11f68359.jpg',
            'a2838527-8bc0-4593-893a-f5fb2fe2b9e3.jpg'
        ],
        User: [
            '2ca32375-c292-402b-985e-92c92b0992d3.jpg',
            '5d69cf67-74ab-426d-99b7-c2db526535e9.jpg',
            '7a35eeb3-f011-4fa0-8391-87a813eb1061.jpg',
            '7db0871e-71d7-4b1d-998f-c094b5166424.jpg',
            '7de81bea-ce45-4887-a7ca-df5687532d5f.jpg',
            '61b15430-eaed-48d6-a428-ab25d5ab256f.jpg',
            '67c60391-97ee-4653-9dc2-f1e77035f4e0.jpg',
            '79371c53-f745-4c9f-9f56-743a1b973669.jpg',
            '38193340-78ed-4bc3-98cd-10c9257db936.jpg',
            'c6db9304-7ab5-465d-a908-8d212897f8ae.jpg',
            'ca8f0403-ada6-4dc7-823c-1d8c5b503531.jpg',
            'cc4a05ae-2931-408b-956f-8a225511875a.jpg',
            'ee157686-bb40-4c23-ad0b-7eccdf5f3794.jpg',
            'ef271dd0-c7fc-490b-88a1-91cb1c08a382.jpg',
            'f35a1eaa-c21b-4c68-b897-3a0f4c7c95da.jpg',
            'f0079140-8ba2-4a71-924b-17aa84afc9fb.jpg'
        ]
    },
    Head: {
        Announcement: [
            '06e83d87-1cf4-4799-bc39-a381c1016f95.jpg',
            '521cc438-248a-4e42-b927-9ee1b3e30d72.jpg',
            '743296b3-8b1d-4549-8fdc-aff3071fd654.jpg',
            'bf84093a-d308-4605-9cb5-b5304369050b.jpg'
        ],
        Duty: [
            '4a2b6824-ac33-4977-8aa9-ff93d4271ce9.jpg',
            '41b8a2da-4976-4890-a991-4ba41031bd8a.jpg',
            '499f1755-9815-4b1c-b8be-70afd7183c86.jpg',
            '2659126a-f01f-4eef-b40f-5541f8589efa.jpg',
            'b16347ca-517a-44e1-b4ad-60e639872e1f.jpg'
        ],
        Inventory: [
            '3a0b6075-f28f-4ca3-895a-6440aa83b2b3.jpg',
            '489bd617-b3a0-47f0-b502-129f7b150ce7.jpg',
            'd2e2ecdd-b51d-4e13-a02d-574e14fed35a.jpg'
        ],
        Trainings: [
            '9fd3daa7-fb9c-466d-b31e-ca12c45d3144.jpg',
            'b6335095-126a-43f3-b425-4622b26e1d9b.jpg',
            'c02534d4-39b6-4b6a-8427-7bca97fba4bb.jpg',
            'd4a9527b-ba29-4702-8c16-3bd34fa58315.jpg',
            'f4a7959e-faef-406d-8808-63c25150cb83.jpg'
        ],
        Volunteers: [
            '1d940329-cf50-4982-80d6-86a8825d16c1.jpg',
            '3f894446-9eb7-49c8-8824-8675d61d5b9d.jpg',
            '7f4811af-2399-4f86-881e-39a1d4b1cf2a.jpg',
            'ae24473e-5366-44a0-9c1c-f44c28db3952.jpg',
            'c4817214-3844-4e86-932a-cd8e502cb508.jpg'
        ]
    },
    Volunteer: {
        'All Duty': ['e58bdaec-054b-4d4e-932e-0ec6d20c0ad9.jpg'],
        'Attendance History': [
            '4fb89a31-dd28-4ed5-928c-14b71014b96b.jpg',
            '32522e74-85a1-49a4-a0ee-459bd3a1b835.jpg'
        ],
        Calendar: [
            '0b02e886-ab45-46f2-b8c3-a4ded2f4f8e8.jpg',
            '9ffb49fc-0f7e-4351-81f9-6b3f08d8f12b.jpg',
            '10be1e3e-7eb5-41ab-afa0-44e89e2d0d4e.jpg',
            '26cbcb76-6ecb-469c-86cb-8cbf71e28e98.jpg',
            '142af224-13b5-4bfb-9b7d-78be87e20851.jpg'
        ],
        Dashboard: [
            '37d2e9cb-69d2-43af-9176-ab442c2da4d0.jpg',
            '66036009-5ad5-47cc-8c56-24060bcb793f.jpg',
            'f9c775b3-3849-4cec-9087-175650177b91.jpg'
        ],
        'Profile & Scanner': [
            '3da6ae2f-e86d-46a5-ab6e-6ce87a9a5e93.jpg',
            '417e2522-d431-4f2b-af77-f00ea461abd9.jpg',
            'eb37a3d8-83da-4306-ab38-9073e592b13e.jpg'
        ],
        Training: ['489405e7-2027-4fcd-8273-9a8cb5a201ed.jpg']
    }
};

const qrcyAssetPath = (role, category, filename) => {
    const roleFolder = role.toUpperCase();
    const categoryFolder = {
        Admin: {
            Announcement: 'ANNOUNCMENT',
            'Settings & Profile': 'SETTIGNS & PROPFILE'
        },
        Head: {},
        Volunteer: {
            Dashboard: 'DASHBOAD',
            'Profile & Scanner': 'PRO FILE & SCANNER'
        }
    };
    const folder = categoryFolder[role][category] ?? category.toUpperCase();

    return `assets/projects/Website/QRCY/USER%20MANUAL/${roleFolder}/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
};

const updateQrcyScreens = browser => {
    const role = browser.querySelector('.qrcy-role').value;
    const category = browser.querySelector('.qrcy-category').value;
    const screenContainer = browser.querySelector('.qrcy-screens');
    const filenames = qrcySections[role]?.[category] ?? [];
    const screenCount = browser.querySelector('.qrcy-screen-count');
    const detailsGallery = browser.closest('.project-details-gallery');

    screenContainer.replaceChildren();
    if (detailsGallery) {
        detailsGallery.scrollTop = 0;
    }
    screenCount.textContent = `${filenames.length} ${filenames.length === 1 ? 'screen' : 'screens'}`;

    filenames?.forEach((filename, index) => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = qrcyAssetPath(role, category, filename);
        image.alt = `QRCY ${role} ${category} screen ${index + 1}`;
        image.loading = 'lazy';
        const caption = document.createElement('figcaption');
        caption.textContent = `${category} · Screen ${index + 1}`;
        figure.append(image, caption);
        screenContainer.append(figure);
    });
};

const initializeQrcyBrowser = browser => {
    const roleSelect = browser.querySelector('.qrcy-role');
    const categorySelect = browser.querySelector('.qrcy-category');

    const updateCategories = () => {
        const categories = Object.keys(qrcySections[roleSelect.value]);
        categorySelect.replaceChildren(
            ...categories.map(category => new Option(category, category))
        );
        categorySelect.value = categories[0];
        updateQrcyScreens(browser);
    };

    const roles = Object.keys(qrcySections);
    roleSelect.replaceChildren(
        ...roles.map(role => new Option(role, role))
    );
    roleSelect.addEventListener('change', updateCategories);
    categorySelect.addEventListener('change', () => updateQrcyScreens(browser));
    updateCategories();
};

document.querySelectorAll('.projectInfo > a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const project = link.closest('.project');
        const title = project?.querySelector('h3')?.textContent.trim();

        if (!project || !title || !projectDetails || !projectDetailsTitle || !projectDetailsGallery || !projectDetailsCopy) {
            return;
        }

        const projectName = title.replace(/\s+/g, ' ');
        const narrative = projectNarratives[projectName];

        if (!narrative || !projectDescription || !projectStory) {
            throw new Error(`Project description is missing for "${projectName}".`);
        }

        projectDetailsTitle.textContent = link.dataset.dialogTitle ?? projectName;
        projectDescription.textContent = narrative.description;
        projectStory.textContent = narrative.story;
        projectDetailsGallery.replaceChildren(projectDetailsCopy);

        const galleryTemplate = link.dataset.gallery
            ? document.getElementById(link.dataset.gallery)
            : null;

        if (galleryTemplate instanceof HTMLTemplateElement) {
            projectDetailsGallery.append(galleryTemplate.content.cloneNode(true));
            const qrcyBrowser = projectDetailsGallery.querySelector('.qrcy-browser');

            if (qrcyBrowser) {
                initializeQrcyBrowser(qrcyBrowser);
            }
        } else {
            const image = project.querySelector('.art img');
            const artwork = image ?? project.querySelector('.art');

            if (artwork) {
                projectDetailsGallery.append(artwork.cloneNode(true));
            }
        }

        projectDetailsGallery.scrollTop = 0;
        projectDetails.showModal();
    });
});

closeProjectDetails?.addEventListener('click', () => {
    projectDetails?.close();
});

projectDetails?.addEventListener('click', event => {
    if (event.target === projectDetails) {
        projectDetails.close();
    }
});


/* =========================
   PORTFOLIO FILTERS
========================= */

const filters = document.querySelectorAll('.filters button');
const projects = [...document.querySelectorAll('.project')];
const loadMoreProjects = document.querySelector('.load-more-projects');
const projectsPerPage = 6;
let activeProjectFilter = 'all';
let visibleProjectCount = projectsPerPage;

const renderProjects = () => {
    const filteredProjects = projects.filter(project =>
        activeProjectFilter === 'all' || project.dataset.cat === activeProjectFilter
    );

    projects.forEach(project => {
        const projectIndex = filteredProjects.indexOf(project);
        project.classList.toggle('hidden', projectIndex === -1 || projectIndex >= visibleProjectCount);
    });

    loadMoreProjects.hidden = filteredProjects.length <= visibleProjectCount;
};

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filters.forEach(item => item.classList.toggle('active', item === filter));
        activeProjectFilter = filter.dataset.filter;
        visibleProjectCount = projectsPerPage;
        renderProjects();
    });
});

loadMoreProjects?.addEventListener('click', () => {
    visibleProjectCount += projectsPerPage;
    renderProjects();
});

renderProjects();


/* =========================
   REVEAL ANIMATION
========================= */

const obs = new IntersectionObserver(
    es => es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
        }
    }),
    {
        threshold: .12
    }
);

document.querySelectorAll('.reveal').forEach(x => {
    obs.observe(x);
});


/* =========================
   CURRENT YEAR
========================= */

const year = document.getElementById('year');

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================
   ACTIVE NAVIGATION
========================= */

const links = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(item => item.classList.toggle('active', item === link));
    });
});

const updateActiveNavigation = () => {
    const activationPoint = window.innerHeight * 0.4;
    const currentSection = sections.reduce((closest, section) => {
        const rect = section.getBoundingClientRect();
        const closestRect = closest?.getBoundingClientRect();
        const distance = activationPoint < rect.top
            ? rect.top - activationPoint
            : activationPoint > rect.bottom
                ? activationPoint - rect.bottom
                : 0;
        const closestDistance = !closestRect
            ? Infinity
            : activationPoint < closestRect.top
                ? closestRect.top - activationPoint
                : activationPoint > closestRect.bottom
                    ? activationPoint - closestRect.bottom
                    : 0;

        return distance < closestDistance ? section : closest;
    }, null);

    links.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${currentSection?.id}`
        );
    });
};

const navigationObserver = new IntersectionObserver(
    updateActiveNavigation,
    {
        rootMargin: '-40% 0px -59% 0px'
    }
);

sections.forEach(section => navigationObserver.observe(section));
updateActiveNavigation();

lucide.createIcons();