const leaderboards = [];

window.addEventListener("load", function () {
  const lb = localStorage.getItem("leaderboards");
  if (lb) {
    const dc = JSON.parse(lb);
    leaderboards.push(...dc);
    updateList();
  }
});

function updateList() {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  for (const [i, entry] of leaderboards.entries()) {
    content.innerHTML += `
<div class="flex flex-row items-center gap-3 text-lg px-5 py-3 odd:bg-[#6572F0] even:bg-[var(--primary)]" id="${i}">
<h3>${i + 1}.</h3> ${entry ?? ""}
</div>
	`;
  }

  localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
}

document.querySelector("#time").textContent = new Date().toString();

document.addEventListener("keydown", function (e) {
  if (e.key == "c") {
    const clear = confirm("clear leaderboard for today?");
    if (clear) {
      leaderboards.splice(0, leaderboards.length);
      updateList();
    }
  }

  if (e.key >= "0" && e.key <= "9") {
    const place = parseInt(e.key);
    if (place == 0) {
      place = 10;
    }
    const name = (prompt(`Enter name for ${place}th placer`) ?? "").trim();

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
