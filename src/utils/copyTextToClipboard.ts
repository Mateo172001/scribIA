export const copyTextToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        console.log("Texto copiado al portapapeles:", text);
    } catch (err) {
        console.error("Error al copiar al portapapeles:", err);
    }
};