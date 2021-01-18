

class i18n {
  private static _instance: i18n;

  private constructor() { }

  public static instance(): i18n {
    if (!i18n.instance) {
      i18n._instance = new i18n();
    }

    return i18n._instance;
  }

  public someBusinessLogic() {

  }
}

export default i18n