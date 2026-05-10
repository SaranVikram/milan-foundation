interface FormData {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
}

const validateFormData = (formData: FormData): boolean => {
  if (!formData.name || formData.name.trim() === "") return false;
  if (!formData.mobile || !/^\+?\d{10,13}$/.test(formData.mobile)) return false;
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
  if (!formData.message || formData.message.trim() === "") return false;

  return true;
};

export { validateFormData };
