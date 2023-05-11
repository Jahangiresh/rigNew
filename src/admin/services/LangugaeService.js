class LanguageService {
  getCookies() {
    let allCookies = document.cookie;
    let cookieArray = allCookies.split("; ");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookiePair = cookieArray[i].split("=");
      let cookieName = cookiePair[0]?.trim();
      let cookieValue = cookiePair[1]?.trim();

      if (cookieName === "content-language") {
        return cookieValue;
      }
    }
  }
}

export default new LanguageService();
