const USER_KEY = "pki_2026_users";
const ACTIVE_USER_KEY = "pki_2026_active";

export class UserService {
  static getUsers() {
    if (localStorage.getItem(USER_KEY) == null) {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify([
          {
            email: "mrk@gmail.com",
            password: "kitovina",
            orders: [],
          },
        ]),
      );
    }
    return JSON.parse(localStorage.getItem(USER_KEY)!);
  }

  static login(email: string, password: string) {
    const users = this.getUsers();

    for (let user of users) {
      if (user.email == email && user.password == password) {
        localStorage.setItem(ACTIVE_USER_KEY, email);
        return true;
      }
    }
    return false;
  }

  static getActiveUser() {
    for (let user of this.getUsers()) {
      if (user.email == localStorage.getItem(ACTIVE_USER_KEY)) {
        return user;
      }
    }

    throw new Error("NO_ACTIVE_USER_FOUND");
  }
}
