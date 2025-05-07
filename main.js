// Toggle the mobile navbar
const navbarToggler = document.getElementById("navbar-toggler");
const mobileMenu = document.querySelector(".mobile-menu");
if (navbarToggler && mobileMenu) {
  navbarToggler.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Navbar active link functionality
const navbarLinks = document.querySelectorAll(".navbar-link");
navbarLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbarLinks.forEach(link => link.classList.remove("active"));
    link.classList.add("active");
  });
});

function openModal(title, images) {
  document.getElementById('projectModal').classList.remove('hidden');

  const modalImages = document.getElementById('modalImages');
  modalImages.innerHTML = ''; // Clear existing images
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image;
    imgElement.alt = title;
    imgElement.classList.add('w-1/2', 'md:w-1/4', 'p-2');
    modalImages.appendChild(imgElement);
  });

  document.body.style.overflow = 'hidden';
}

// Close modal
document.getElementById('closeModal')?.addEventListener('click', () => {
  document.getElementById('projectModal').classList.add('hidden');
  document.body.style.overflow = 'auto';
});

document.getElementById('projectModal')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('projectModal')) {
    document.getElementById('projectModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
});

// Handle form submission
const form = document.querySelector('form');
const submitButton = document.querySelector('button[type="submit"]');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.text();
    console.log(data);
    alert('Message sent successfully!');
    form.reset();
  } catch (err) {
    console.error(err);
    alert('Failed to send the message. Please try again later.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send';
  }
});
