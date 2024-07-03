import {
  parse as dateParse,
  format as dateFormat,
  isValid as isValidDate
  // isAfter as isAfterDate,
} from 'date-fns'

/**
 * Utility for manipulating dates, taking into account that in JS date must be an Object of type DATE, y no un string como estos (dd/mm/yyyy - yyyy/mm/dd)
 * Formatos y patterns aceptados para los formatos --> {@link https://date-fns.org/v2.24.0/docs/format#description}
 */
export function useDate () {
  /**
   * Formats a string or a Date Object containing a valid date from 1 format to another - o de Date a 1 formato
   * @param {String|Date} arFecha A string or Date Object containing the date (dd/mm/yyyy - yyyy/mm/dd - another formats)
   * @param {String} asFormato Format with which the string with the date is being sent
   * @param {String} asFormatoRetorno Format with which you want to return the string with the formatted date
   * @returns {Object} {{valid: boolean, date: string}|{valid: boolean, date}}
   */
  function formatDate (
    arFecha,
    asFormato = 'dd/mm/yyyy',
    asFormatoRetorno = 'yyyy-mm-dd'
  ) {
    asFormato = _adjustFormat(asFormato)
    asFormatoRetorno = _adjustFormat(asFormatoRetorno)

    if (arFecha instanceof Date) {
      return { valid: true, date: dateFormat(arFecha, asFormatoRetorno) }
    }
    if (!isValid(arFecha, asFormato)) {
      return { valid: false, date: arFecha }
    }
    const newDate = dateParse(arFecha, asFormato, new Date())
    const formattedDate = dateFormat(newDate, asFormatoRetorno)
    return { valid: true, date: formattedDate }
  }

  /**
   * Checks if a string containing a date is valid
   * @param {String} asFecha A string containing the date (dd/mm/yyyy - yyyy/mm/dd - Others formats)
   * @param {String} asFormato Format with which the string with the date is being sent
   * @returns {boolean}
   */
  function isValid (asFecha, asFormato = 'dd/mm/yyyy') {
    try {
      if (asFecha === null || asFecha.length < 10) {
        return false
      }
      const date = dateParse(asFecha, _adjustFormat(asFormato), new Date())
      return date instanceof Date && isValidDate(date)
    } catch (e) {
      return false
    }
  }

  /**
   * Set the format to be equivalent to the library date-fns format
   * @param {String} asFormat
   * @returns {string}
   */
  function _adjustFormat (asFormat) {
    switch (asFormat) {
      case 'dd/mm/yyyy':
        return 'dd/MM/yyyy'
      case 'yyyy/mm/dd':
        return 'yyyy/MM/dd'
      case 'dd-mm-yyyy':
        return 'dd-MM-yyyy'
      case 'yyyy-mm-dd':
        return 'yyyy-MM-dd'
      default:
        return asFormat
    }
  }

  return {
    isValid,
    formatDate
  }
}
