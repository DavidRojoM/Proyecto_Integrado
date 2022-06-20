export function buildFormData(user: any) {
  const formdata = new FormData();
  for (const key in user) {
    if (key === 'image') {
      formdata.append(key, user[key][0]);
    } else {
      formdata.append(key, user[key]);
    }
  }
  return formdata;
}
