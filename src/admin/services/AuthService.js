import axios from "axios";
import { BASE_URL, ADMIN } from "../../constants";

class AuthService {
  async login(username, password) {
    return await axios
      .post(BASE_URL + "/authentication/login", {
        emailOrUsername: username,
        password: password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        window.location = ADMIN;
        return response.data;
      })
      .catch((err) => {
        alert(err);
      });
  }

  async logout() {
    localStorage.removeItem("user");
    window.location = ADMIN;
  }

  async checkTokenExpiration() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      const decodedToken = this.parseJwt(user.accessToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        try {
          await this.refreshToken();
        } catch (error) {
          this.logout();
        }
      }
    }
  }

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  async refreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    await axios
      .post(BASE_URL + "/authentication/refreshtokenlogin", {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      })
      .then((response) => {
        if (response.data) {
          user.accessToken = response.data.accessToken;
          user.refreshToken = response.data.refreshToken;
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .catch((err) => {
        this.logout();
      });
  }
}

export default new AuthService();
