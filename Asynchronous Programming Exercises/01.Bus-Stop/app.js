async function getInfo() {
  const stopsId = document.getElementById("stopId");
  let stops = stopsId.value;
  let url = `http://localhost:3030/jsonstore/bus/businfo/${stops}`;
  let ulList = document.getElementById("buses");
  //if we request new
    ulList.innerHTML = "";
  //error handling
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const error = new Error(response.statusText);

      throw error;
    }
    const data = await response.json();
    document.getElementById("stopName").textContent = data.name;

    Object.entries(data.buses).forEach(([spirka, vreme]) => {
      const liElement = document.createElement("li");
      liElement.textContent = `Bus ${spirka} arrives in ${vreme} minutes`;
      ulList.appendChild(liElement);
    });
  } catch (err) {
    document.getElementById("stopName").textContent = "Error";
  }
}

//get busId from elements
//fet data from http://localhost:3030/jsonstore/bus/businfo/
//parse response from the data
//error handling
//add the data to the html
