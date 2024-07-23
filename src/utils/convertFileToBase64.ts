interface FileData {
    name: string;
    type: string;
    content: string;
  }

export const convertToBase64 = (file: File): Promise<FileData> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Content = base64String.split(',')[1];
            resolve({
                name: file.name,
                type: file.type,
                content: base64Content,
            });
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};
