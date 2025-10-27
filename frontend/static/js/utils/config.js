/**
 * Base API URL used by frontend services to build absolute endpoints.
 * Update this value when the backend is hosted on a different origin or port.
 * @constant {string}
 */
export const BASE_API_URL = "http://127.0.0.1:5000/api/v1"

/**
 * Build a full API URL for a given endpoint path.
 *
 * Example:
 *   apiUrl('menu')         -> 'http://127.0.0.1:5000/api/v1/menu'
 *   apiUrl('menu/3')       -> 'http://127.0.0.1:5000/api/v1/menu/3'
 *
 * @param {string} endpoint - Path relative to the API root (no leading slash).
 * @returns {string} Full URL to fetch.
 */
export const apiUrl = (endpoint) => `${BASE_API_URL}/${endpoint}`