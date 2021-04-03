export const getCookie = (name = 'rec_id') => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop()!.split(';').shift();
};
