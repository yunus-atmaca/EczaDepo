
export const Languages = {
  Tr: 'Tr',
  Eng: 'Eng'
}

//string = s
export const s = {
  toUpper: 'toUpperCase',
  toLower: 'toLoverCase'
}

class i18n {
  private static _i18n: any
  private constructor() { }

  public static init(language: string): void {
    if (i18n._i18n) {
      console.debug('Language is already loaded');
      return;
    }

    i18n.getLanguageJson(language)
  }

  /*public static get(word: string, operation?: string) {
    if (!i18n._i18n) {
      console.debug('Please first call init(language)');
      return
    }

    if (operation === s.toUpper) {
      return i18n._toUpperCase(i18n._i18n[word])
    } else if (operation === s.toLower) {
      return i18n._toLowerCase(i18n._i18n[word])
    }

    return i18n._i18n[word]
  }*/

  public static get() {
    if (!i18n._i18n) {
      console.debug('Please first call init(language)');
      return
    }

    return i18n._i18n
  }

  private static _toUpperCase(word: string) {
    return word.toUpperCase()
  }

  private static _toLowerCase(word: string) {
    return word.toLowerCase()
  }

  private static getLanguageJson(language: string) {
    if (language === Languages.Tr) {
      i18n._i18n = require('./languages/Tr.json')
    } else if (language === Languages.Eng) {
      i18n._i18n = require('./languages/Eng.json')
    } else {
      //Default value Tr
      i18n._i18n = require('./languages/Tr.json')
    }
  }
}

export default i18n