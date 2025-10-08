const leaderboards = [];

window.addEventListener("load", function () {
  const lb = localStorage.getItem("leaderboards");
  if (lb) {
    const dc = JSON.parse(lb);
    leaderboards.push(...dc);
    updateList();
  }
});

function updateList(save = true) {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  for (const [i, entry] of leaderboards.entries()) {
    content.innerHTML += `
<div class="flex flex-row items-center gap-3 text-lg px-5 py-3 odd:bg-[#6572F0] even:bg-[var(--primary)]" id="${i}">
<h3>${i + 1}.</h3> ${entry ?? ""}
</div>
	`;
  }

  if (!save) {
    return;
  }

  const lastSave = localStorage.getItem("last_save");
  const currDate = new Date().getDate();
  if (lastSave !== currDate) {
    const past = localStorage.getItem("leaderboards");
    localStorage.setItem(currDate, past);
  } else {
    localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
    localStorage.setItem("last_save", currDate);
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key == "c") {
    const clear = confirm("clear leaderboard for today?");
    if (clear) {
      leaderboards.splice(0, leaderboards.length);
      updateList();
    }
  }

  if (e.key == "f") {
    const fs = confirm("go fullscreen?");
    if (fs) {
      document.querySelector("body").requestFullscreen();
    }
  }

  if (e.key >= "0" && e.key <= "9") {
    let place = parseInt(e.key);
    if (place == 0) {
      place = 10;
    }

    const name = (prompt(`Enter name for ${place}th placer`) ?? "").trim();

    if (name === "clear") {
      leaderboards[place] = "";
      updateList(false);
      return;
    }

    const existing = leaderboards.indexOf(name);
    if (existing !== -1) {
      leaderboards.splice(existing, 1);
    }

    leaderboards.splice(place - 1, 0, name);

    // cap leaderboards at 10
    if (leaderboards.length > 10) {
      leaderboards.length = 10;
    }
    updateList();
  }
});

function updateTime() {
  document.querySelector("#time").textContent = new Date().toString();

  setInterval(updateTime, 1000);
}
updateTime();
