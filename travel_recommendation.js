document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById('searchInput')
  const resultsContainer = document.getElementById('results')
  const navLinks = document.querySelectorAll('.nav-tabs a')
  const searchBar = document.querySelector('.search-bar')
  const content = document.querySelector('.content')
  const results = document.getElementById('results')
  const aboutSection = document.getElementById('aboutSection')
  const contactSection = document.getElementById('contactSection')

  fetch("./travel_recommendation_api.json")
      .then(response => response.json())
      .then(data => {
        const allItems = [];

        data.countries.forEach(country => {
          country.cities.forEach(city => {
            allItems.push(city)
          })
        })

        data.temples.forEach(temple => allItems.push(temple))
        data.beaches.forEach(beach => allItems.push(beach))

        searchInput.addEventListener("input", function () {
          const keyword = searchInput.value.trim().toLowerCase()

          if (!keyword) {
            resultsContainer.innerHTML = ''
            resultsContainer.style.display = 'none'
            return
          }

          const filtered = allItems.filter(item =>
            item.name.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword)
          )

          resultsContainer.innerHTML = filtered.map(item => `
            <div class="result-card">
              <img src="${item.imageUrl}" alt="${item.name}" />
              <h4>${item.name}</h4>
              <p>${item.description}</p>
              <a href="#" class="visit-button">Visit</a>
            </div>
          `).join('')

          resultsContainer.style.display = filtered.length ? "block" : "none";
        })
      })
  .catch(error => {
    resultsContainer.innerHTML = "<p style='color:red;'>Failed to load data.</p>"
    console.error(error)
  })

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const text = e.target.textContent

      if (text === "Home") {
        content.style.display = 'block'
        results.style.display = 'none'
        aboutSection.style.display = 'none'
        contactSection.style.display = 'none'
        searchBar.style.display = 'flex'
      } else if (text === "About Us") {
        content.style.display = 'none'
        results.style.display = 'none'
        aboutSection.style.display = 'block'
        contactSection.style.display = 'none'
        searchBar.style.display = 'none'
      } else if (text === "Contact Us") {
        content.style.display = 'none'
        results.style.display = 'none'
        aboutSection.style.display = 'none'
        contactSection.style.display = 'block'
        searchBar.style.display = 'none'
      }
    })
  })
})

function sendFeedback() {
    const nameInput = document.getElementById('nameInput')
    const emailInput = document.getElementById('emailInput')
    const messageInput = document.getElementById('messageInput')
    nameInput.value = ''
    emailInput.value = ''
    messageInput.value = ''
    alert('Your feedback has been submitted.')
  }
function resetSearch() {
    const searchInput = document.getElementById('searchInput')
    const resultsContainer = document.getElementById('results')
    searchInput.value = ''
    resultsContainer.innerHTML = ''
    resultsContainer.style.display = 'none'
  }