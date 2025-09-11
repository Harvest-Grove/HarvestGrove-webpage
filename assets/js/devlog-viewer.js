function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadDevlog() {
  const file = getQueryParam("file");   
  const title = getQueryParam("title");   
  const date = getQueryParam("date");    

  document.getElementById("devlog-title").textContent = title || "Untitled Devlog";
  document.getElementById("devlog-date").textContent = date || "";

  if (!file) {
    document.getElementById("devlog-content").innerHTML = "<p>No devlog file specified.</p>";
    return;
  }

  try {
    const response = await fetch("devlogs/" + file);
    if (!response.ok) throw new Error("Cannot load " + file);

    const text = await response.text();
    const html = marked.parse(text);

    document.getElementById("devlog-content").innerHTML = html;

  } catch (err) {
    console.error(err);
    document.getElementById("devlog-content").innerHTML = "<p>Failed to load devlog. Check console for details.</p>";
  }
}

loadDevlog();
