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

if (form && submitButton) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    submitButton.disabled = true; // Disable the submit button to prevent multiple submissions
    submitButton.textContent = 'Sending...'; // Update button text to indicate submission

    const formData = new FormData(form);

    fetch('/send-email', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      alert('Message sent successfully!');
      form.reset(); // Optionally reset the form
    })
    .catch(err => {
      console.error(err);
      alert('Failed to send the message. Please try again later.');
    })
    .finally(() => {
      submitButton.disabled = false; // Re-enable the submit button
      submitButton.textContent = 'Send'; // Reset button text
    });
  });
}
