export function formatFileSize(size: number | undefined) {
    let units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    if (!size) return '0 Bytes';
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
}