const container = document.getElementById("devlogs-container");

async function loadDevlogsGallery() {
  try {
    const response = await fetch("devlogs/devlogs.json");
    if (!response.ok) throw new Error("Cannot fetch devlogs.json");

    const devlogs = await response.json();

    // Sort by date descending
    devlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    devlogs.forEach(log => {
      const card = document.createElement("div");
      card.classList.add("devlog-card");

      card.innerHTML = `
        <h3>${log.title}</h3>
        <p>${log.date}</p>
        <a class="button" href="devlog.html?file=${encodeURIComponent(log.filename)}&title=${encodeURIComponent(log.title)}&date=${encodeURIComponent(log.date)}">
        Read</a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading devlogs gallery:", err);
    container.innerHTML = "<p>Failed to load devlogs. Check console.</p>";
  }
}

loadDevlogsGallery();
