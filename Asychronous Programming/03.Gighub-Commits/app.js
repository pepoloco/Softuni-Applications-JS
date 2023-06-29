async function loadCommits() {
  let usernameInput = document.getElementById("username");
  let repositoryInput = document.getElementById("repo");
  let username = usernameInput.value;
  let repository = repositoryInput.value;
  const url = `https://api.github.com/repos/${username}/${repository}/commits`;
  let ulList = document.getElementById("commits");

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    let commits = await response.json();

    commits.forEach((commit) => {
      let liList = createLi(commit.commit.author.name, commit.commit.message);
      ulList.appendChild(liList);
    });
  } catch (error) {
    let liList = createLi("Error", `${error.message} (Not Found)`);
    ulList.appendChild(liList);
  }
}

function createLi(author, message) {
  let liList = document.createElement("li");
  liList.textContent = `${author}: ${message}`;
  return liList;
}

loadCommits();
