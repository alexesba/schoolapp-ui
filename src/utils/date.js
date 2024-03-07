export const dateToLocalString = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  return date.toLocaleDateString('es', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

export default dateToLocalString;
