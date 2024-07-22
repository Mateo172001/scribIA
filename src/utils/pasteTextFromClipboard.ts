export const pasteTextFromClipboard = async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (typeof text !== "string") return "";
        return text;
    } catch (err) {
        console.error("No se ha podido obtener el contenido del portapapeles: ", err);
    }
    return "";
};