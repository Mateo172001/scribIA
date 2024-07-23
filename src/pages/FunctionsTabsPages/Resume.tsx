import {
  Field,
  Textarea,
  Button,
  Toolbar,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  ToolbarProps,
  Combobox,
  ComboboxProps,
  Option,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Dropdown,
} from "@fluentui/react-components";
import { useState, useRef } from "react";
import { useTailwindBreakpoints } from "../../hooks/useTailwindBreakpoints";
import { MdShortText } from "react-icons/md";
import { LuText } from "react-icons/lu";
import { GrTextAlignLeft } from "react-icons/gr";
import { BiCopyAlt, BiFileBlank, BiPaste } from "react-icons/bi";
import { pasteTextFromClipboard } from "../../utils/pasteTextFromClipboard";
import FileCard from "../../components/FileCard";
import { getTextSummary } from "../../services/getTextSummary";
import { copyTextToClipboard } from "../../utils/copyTextToClipboard";
import { getDocSummary } from "../../services/getDocSummary";

const fileTypes = [
  "application/msword",
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const Resume = () => {
  const [textLength, setTextLength] = useState<Record<string, string[]>>({
    lenghtOptions: ["short"],
  });
  const [textTone, setTextTone] = useState("professional");
  const [selectedToneOptions, setSelectedToneOptions] = useState<string[]>([
    "professional",
  ]);
  const [summaryLanguage, setSummaryLanguage] = useState("es");
  const [summaryLanguageOptions, setSummaryLanguageOptions] = useState<
    string[]
  >(["es"]);
  const [text, setText] = useState<string>("");
  const [textSummary, setTextSummary] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useTailwindBreakpoints();

  const onLenghtChange: ToolbarProps["onCheckedValueChange"] = (
    e,
    { name, checkedItems }
  ) => {
    setTextLength((s) => ({ ...s, [name]: checkedItems }));
  };

  const onToneInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTextTone(ev.target.value);
  };

  const onToneOptionSelect: ComboboxProps["onOptionSelect"] = (e, value) => {
    setSelectedToneOptions(value.selectedOptions);
    setTextTone(value.optionText ?? "");
  };

  const onLanguageOptionSelect: ComboboxProps["onOptionSelect"] = (
    e,
    value
  ) => {
    setSummaryLanguageOptions(value.selectedOptions);
    setSummaryLanguage(value.optionText ?? "");
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onChangeTextSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextSummary(e.target.value);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    }
  };

  const deleteFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const pasteText = async () => {
    const textFromClipboard = await pasteTextFromClipboard();
    setText(textFromClipboard);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const summarizeText = async () => {
    setIsLoading(true);
    try {
      const response = await getTextSummary(
        text,
        textTone,
        textLength.lenghtOptions[0],
        summaryLanguage
      );
      setTextSummary(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const summarizeDoc = async () => {
    setIsLoading(true);
    try {
      const response = await getDocSummary(
        file as File,
        textTone,
        textLength.lenghtOptions[0],
        summaryLanguage
      );
      setTextSummary(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (file) {
      summarizeDoc();
    } else if (text) {
      summarizeText();
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Field className="mt-4">
            <Textarea
              textarea={{ className: "h-80", style: { height: 300 } }}
              placeholder="Escribe aquí tu texto a resumir"
              resize="vertical"
              value={text}
              disabled={isLoading || !!file}
              onChange={onChangeText}
            />
          </Field>
          <Field className="mt-1 grid-col grid-cols-2 w-full gap-1">
            <>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept={fileTypes.join(", ")}
                onChange={onChangeFile}
              />
              <Button
                icon={<BiFileBlank />}
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                Seleccionar
              </Button>
            </>
            <Button
              icon={<BiPaste />}
              onClick={pasteText}
              disabled={isLoading || !!file}
            >
              Pegar
            </Button>
          </Field>
          {file && (
            <FileCard className="mt-4 mb-4" file={file} onDelete={deleteFile} />
          )}

          <Accordion collapsible>
            <AccordionItem value="options">
              <AccordionHeader size="large">Opciones</AccordionHeader>
              <AccordionPanel>
                <Field label="Extensión del resumen">
                  <Toolbar
                    className="m-auto mt-2"
                    aria-label="resume length"
                    checkedValues={textLength}
                    onCheckedValueChange={onLenghtChange}
                  >
                    <ToolbarRadioGroup>
                      <ToolbarRadioButton
                        aria-label="short resume"
                        name="lenghtOptions"
                        value="short"
                        icon={<MdShortText />}
                        disabled={isLoading}
                      >
                        Corto
                      </ToolbarRadioButton>
                      <ToolbarRadioButton
                        aria-label="medium resume"
                        name="lenghtOptions"
                        value="medium"
                        icon={<LuText />}
                        disabled={isLoading}
                      >
                        Mediano
                      </ToolbarRadioButton>
                      <ToolbarRadioButton
                        aria-label="long resume"
                        name="lenghtOptions"
                        value="long"
                        icon={<GrTextAlignLeft />}
                        disabled={isLoading}
                      >
                        Largo
                      </ToolbarRadioButton>
                    </ToolbarRadioGroup>
                  </Toolbar>
                </Field>

                <Field label="Tono del resumen" className="mt-2 mb-6">
                  <Combobox
                    className="mt-2"
                    size="medium"
                    aria-label="Tono del resumen"
                    placeholder="Selecciona un tono"
                    onInput={onToneInput}
                    onOptionSelect={onToneOptionSelect}
                    selectedOptions={selectedToneOptions}
                  >
                    <Option value="professional">Profesional</Option>
                    <Option value="informal">Informal</Option>
                    <Option value="funny">Gracioso</Option>
                    <Option value="optimistic">Optimista</Option>
                    <Option value="informative">Informativo</Option>
                    <Option value="explanatory">Explicativo</Option>
                  </Combobox>
                </Field>

                <Field label="Idioma del resumen" className="mt-2 mb-6">
                  <Dropdown
                    className="mt-2"
                    size="medium"
                    aria-label="Idioma del resumen"
                    placeholder="Selecciona un idioma"
                    onOptionSelect={onLanguageOptionSelect}
                    selectedOptions={summaryLanguageOptions}
                  >
                    <Option value="es">Español</Option>
                    <Option value="en">Inglés</Option>
                  </Dropdown>
                </Field>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {isMobile && (
            <div className="m-auto w-fit mt-2">
              <Button
                appearance="primary"
                disabled={(!text && !file) || isLoading}
                onClick={handleSummarize}
              >
                Resumir
              </Button>
            </div>
          )}
        </div>

        <div>
          {!isMobile || textSummary ? (
            <>
              <Field className="mt-4">
                <Textarea
                  textarea={{ className: "h-80", style: { height: 300 } }}
                  placeholder="Aquí se mostrará el resumen de tu texto..."
                  resize="vertical"
                  value={textSummary}
                  onChange={onChangeTextSummary}
                  disabled={isLoading || !textSummary}
                />
              </Field>
              <Field className="mt-1 ">
                <Button
                  icon={<BiCopyAlt />}
                  disabled={isLoading || !textSummary}
                  onClick={() => copyTextToClipboard(textSummary)}
                >
                  Copiar
                </Button>
              </Field>
            </>
          ) : null}
        </div>
      </div>

      {!isMobile && (
        <div className="m-auto w-fit mt-2">
          <Button
            appearance="primary"
            disabled={(!text && !file) || isLoading}
            onClick={handleSummarize}
          >
            Resumir
          </Button>
        </div>
      )}
    </div>
  );
};

export default Resume;
