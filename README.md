# Resumen IA App

Esta es una aplicación web que genera resúmenes de texto y documentos utilizando la API de Gemini. La aplicación permite a los usuarios ingresar texto o subir documentos, seleccionar la longitud, el tono y el idioma del resumen, y obtener un resumen generado por IA.

## Características

- Generación de resúmenes de texto y documentos.
- Selección de longitud del resumen: corto, mediano, largo.
- Selección de tono del resumen: profesional, informal, gracioso, optimista, informativo, explicativo.
- Selección de idioma del resumen: español, inglés.
- Interfaz de usuario intuitiva y fácil de usar.

## Tecnologías Utilizadas

- React
- TypeScript
- Axios
- API de Gemini

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/Mateo172001/scribIA.git
    cd scribia
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto y agrega la URL de la API de Gemini:
    ```env
    VITE_SUMMARIZE_TEXT_CLOUD_FUNCTION_URL=https://api.gemini.com/summarize-text
    VITE_SUMMARIZE_DOC_CLOUD_FUNCTION_URL=https://api.gemini.com/summarize-doc
    ```

4. Inicia la aplicación:
    ```sh
    npm start
    ```

## Uso

1. Ingresa el texto que deseas resumir o sube un documento.
2. Selecciona las opciones de longitud, tono e idioma del resumen.
3. Haz clic en el botón "Resumir" para generar el resumen.
4. El resumen generado se mostrará en el área de texto correspondiente.

## Estructura del Proyecto

- `src/pages/FunctionsTabsPages/Resume.tsx`: Componente principal de la página de resumen.
- `src/services/getTextSummary.ts`: Servicio para obtener resúmenes de texto utilizando la API de Gemini.
- `src/services/getDocSummary.ts`: Servicio para obtener resúmenes de documentos utilizando la API de Gemini.
- `src/utils/convertFileToBase64.ts`: Utilidad para convertir archivos a base64.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.
