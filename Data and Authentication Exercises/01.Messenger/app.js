function attachEvents() {
  document.getElementById("submit").addEventListener("click", submitFunc);
  document.getElementById("refresh").addEventListener("click", refreshFunc);
}

const url = "http://localhost:3030/jsonstore/messenger/";

async function submitFunc() {
  const authorName = document.querySelector('input[name= "author"]');
  const messageText = document.querySelector('input[name= "content"]');
  if (!authorName.value || !messageText.value) return;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        author: authorName.value.trim(),
        content: messageText.value.trim(),
      }),
    });
    if (!response.ok) {
      throw new Error("Error");
    }
    authorName.value = "";
    messageText.value = "";
  } catch (e) {
    alert(e.message);
  }
}

async function refreshFunc() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error");
    }
    const data = await response.json();
    const textArea = document.querySelector("#messages");
    const allComments = [];
    Object.values(data).forEach((c) => {
      allComments.push(`${c.author}: ${c.content}`);
    });
    textArea.value = allComments.join("\n").trim();
  } catch (e) {
    alert(e.message);
  }
}
attachEvents();
