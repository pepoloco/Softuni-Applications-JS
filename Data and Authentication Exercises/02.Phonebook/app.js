//TODO:
//1. load phonebook -> use fetch(GET)
//2. show phonebook -> update html content
//3. delete single entry -> use fetch(DELETE)
//4. create sing entry -> use fetch(POST)
let url = "http://localhost:3030/jsonstore/phonebook";

function attachEvents() {
  document.getElementById("btnLoad").addEventListener("click", loadPhoneBook);
}

attachEvents();

async function loadPhoneBook() {
  const response = await fetch(url);

  const data = await response.json();
  const phoneBookElem = document.getElementById('')
  Object.values(data).forEach((x) => {
    const liItem = document.createElement("li");
    liItem.textContent = `${x.person}: ${x.phone}`;


  });
}
