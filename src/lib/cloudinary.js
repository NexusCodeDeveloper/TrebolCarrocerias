const CLOUD_NAME = "da1hje3a1";

/**
 * Devuelve la URL optimizada de una imagen.
 * - URL completa de Cloudinary: le inyecta `f_auto,q_auto` si falta.
 * - Public ID (ej. `"trebol/volcable-amarillo"`): arma la URL optimizada.
 * - Ruta local (ej. `"/img/volcable-amarillo.jpg"`): la devuelve igual.
 * @param {string} path
 * @returns {string}
 */
export const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    if (path.includes("/upload/") && !path.includes("f_auto")) {
      return path.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return path;
  }

  if (path.startsWith("/")) return path;

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${path}`;
};

/**
 * Como `getImageUrl` pero además recorta los bordes transparentes
 * (`e_trim`). Pensado para logos, que suelen traer mucho margen.
 * @param {string} path
 * @returns {string}
 */
export const getLogoUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("/")) return path;

  const url = path.startsWith("http")
    ? path
    : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${path}`;

  if (url.includes("e_trim")) return url;
  if (url.includes("f_auto")) return url.replace("/upload/", "/upload/e_trim/");
  return url.replace("/upload/", "/upload/e_trim,f_auto,q_auto/");
};

export default getImageUrl;
