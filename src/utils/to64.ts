export function toBase64(file, onSuccess) {
  let reader = new FileReader();
  reader.onload = () => onSuccess(reader.result);
  reader.readAsDataURL(file);
}
