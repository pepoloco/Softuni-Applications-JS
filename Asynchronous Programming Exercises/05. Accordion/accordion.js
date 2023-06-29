function template({ _id, title }) {
  const wrapper = document.createElement("div");
  wrapper.className = "accordion";

  const headDiv = document.createElement("div");
  headDiv.className = "head";

  const titleSpan = document.createElement("span");
  titleSpan.textContent = title;

  const btn = document.createElement("button");
  btn.className = "button";
  btn.textContent = "More";
  btn.id = _id;

  const extraDiv = document.createElement("div");
  extraDiv.className = "extra";
  extraDiv.style.displlay = "none";

  const contentParagraph = document.createElement("p");

  headDiv.appendChild(titleSpan);
  headDiv.appendChild(btn);
  headDiv.appendChild(contentParagraph);
  wrapper.appendChild(headDiv);
  wrapper.appendChild(extraDiv);

  btn.addEventListener("click", async () => {
    if (extraDiv.style.display === "none") {
      const data = await fetch(
        `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`
      );
      const desData = await data.json();
      btn.textContent = "Less";
      extraDiv.style.display = "block";
      contentParagraph.textContent = desData.content;
    } else {
      btn.textContent = "More";
      extraDiv.style.display = "none";
    }
  });

  return wrapper;
}

async function solution() {
  const output = document.getElementById("main");
  const titles = await fetch(
    "http://localhost:3030/jsonstore/advanced/articles/list"
  );
  const desTitles = await titles.json();

  desTitles.forEach((x) => output.appendChild(template(x)));
}

document.addEventListener("DOMContentLoaded", solution);
