const users = document.querySelector(".users")

window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/api/v1/people")
  const data = await res.json()

  if (data.status) {
    users.innerHTML = data.data
      .map((message) => {
        return `
      <div aria-label="user" class=${message.isSeen ? "unopened" : "opened"}>
        <div aria-label="img"></div>
        <div>
          <span>${message.username}</span>
          <span
            >${message.lastMessage}</span
          >
        </div>
        <small aria-label="time">${message.time}</small>
      </div>
      `
      })
      .join(" ")
  }

  const allUsers = users.querySelectorAll("[aria-label=user]")

  allUsers.forEach((user) => {
    user.addEventListener("click", (e) => {
      e.currentTarget.classList.remove("unopened")
    })
  })
})
