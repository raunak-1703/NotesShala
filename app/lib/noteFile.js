const imageExtensions = new Set(["jpg", "jpeg", "png"]);

export const getNoteFileExtension = (note) => {
  const fileName = note?.fileName || "";
  return fileName.split(".").pop()?.toLowerCase() || "";
};

export const isImageNote = (note) => {
  return note?.mimeType?.startsWith("image/") || imageExtensions.has(getNoteFileExtension(note));
};

export const getNoteIcon = (note) => {
  if (getNoteFileExtension(note) === "pdf" || note?.mimeType === "application/pdf") {
    return "/pdficon.png";
  }

  if (isImageNote(note)) {
    return "/fileicon.png";
  }

  return "/fileicon.png";
};
