export const checkFileSize = (value: FileList | null) => {
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  if (!value || value.length === 0) return true;
  const file = value[0];
  if (file.size > MAX_FILE_SIZE) {
    return "ファイルサイズは2MB以下にしてください。";
  }
  return true;
};
