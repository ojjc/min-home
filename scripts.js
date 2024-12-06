/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"reddit":"https://reddit.com/","pinterest":"https://www.pinterest.com/"}
const engine = "google"
const engineUrls = {
  google: "https://www.google.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

document.addEventListener("keydown", (event) => {
  // Check if the key pressed is "S" (case-insensitive)
  if (event.key.toLowerCase() === "s") {
    // Get the search bar element
    const searchBar = document.querySelector("#searchbar input");

    // Check if the search bar exists and isn't already focused
    if (searchBar && document.activeElement !== searchBar) {
      // Prevent default behavior (e.g., avoid scrolling)
      event.preventDefault();

      // Focus the search bar
      searchBar.focus();
    }
  }
});


const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Pr6SHDAQt3Y3kEgM","label":"media","bookmarks":[{"id":"8HJCJf4SGLZxzL2q","label":"yt","url":"https://www.youtube.com/"},{"id":"uHUXpt35zZf70oLa","label":"twitch","url":"https://www.twitch.tv/"},{"id":"8Ii2KjzRLWKW8fns","label":"twitter","url":"https://x.com/home"}]},{"id":"QqY1DdHaFbaksvUK","label":"prod","bookmarks":[{"id":"C7JLc2oMvdjAUj2d","label":"reddit","url":"https://reddit.com"},{"id":"qXDwraIjhSo69gMj","label":"pin","url":"https://www.pinterest.com/"},{"id":"LYKG4SMemObGlUyc","label":"lastfm","url":"https://last.fm"},{"id":"posMpqfOJ0oterZg","label":"rym","url":"https://rateyourmusic.com/"}]},{"id":"NhPugLvse3jQJpwk","label":"sbub","bookmarks":[{"id":"wEDY7OAW3E7G8HFt","label":"brightspace","url":"https://mycourses.stonybrook.edu/d2l/login"},{"id":"FDiXLnYtnFg1QiZW","label":"solar","url":"https://prod.ps.stonybrook.edu/psp/csprods/?cmd=login"}]},{"id":"kNLWW0WHtRtKCTlj","label":"shoppy","bookmarks":[{"id":"wVMgkDbCk1EjHJ8G","label":"amazon","url":"https://www.amazon.com/"},{"id":"uGkrUKAgTqA3zaWz","label":"ebay","url":"https://www.ebay.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
