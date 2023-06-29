function solve() {
  let stopIntElement = document.querySelector("div#info span.info");
  let departBtn = document.getElementById("depart");
  let arriveBtn = document.getElementById("arrive");
  let nextStopId = "depot";
  let stopName = "";

  async function depart() {
    try {
      let response = await fetch(
        `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`
      );
      const data = await response.json();
      stopName = data.name;
      nextStopId = data.next;

      stopIntElement.textContent = `Next stop ${stopName}`;
      departBtn.disabled = true;
      arriveBtn.disabled = false;
    } catch (error) {
      stopIntElement.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  async function arrive() {
    stopIntElement.textContent = `Arriving at ${stopName}`;
    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
