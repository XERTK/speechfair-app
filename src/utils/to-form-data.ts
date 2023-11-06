export const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).map(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined) {
            formData.append(key, item);
          }
        });
      } else if (value !== undefined) {
        formData.append(key, value);
      }
    }
  });

  return formData;
};
