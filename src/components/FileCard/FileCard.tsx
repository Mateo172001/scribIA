import {
  Card,
  CardPreview,
  CardHeader,
  Caption1,
  Button,
  Text,
} from "@fluentui/react-components";
import { BiMinusCircle } from "react-icons/bi";
import { GrDocumentPdf, GrDocumentWord, GrDocumentText } from "react-icons/gr";
import { formatFileSize } from "../../utils/formatFileSize";
import { scribIA } from "../../theme/theme";

interface FileCardProps {
  file: File | null;
  onDelete?: () => void;
  className?: string;
}

function FileCard({ onDelete, file, className }: FileCardProps) {
  const DocumentIcon = ({ ...props }) => {
    if (file?.type === "application/pdf") {
      return <GrDocumentPdf {...props} />;
    } else if (
      file?.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <GrDocumentWord {...props} />;
    } else {
      return <GrDocumentText {...props} />;
    }
  };

  return (
    <Card
      className={`h-16 ${className}`}
      orientation="horizontal"
      appearance="filled"
    >
      <CardPreview>
        <div
          className="min-w-16 min-h-16 content-center"
          style={{ background: scribIA[90] }}
        >
          <DocumentIcon className="w-7 h-7 m-auto text-white" />
        </div>
      </CardPreview>

      <CardHeader
        header={
          <Text weight="semibold" wrap={false} className="w-36 md:w-48 lg:w-80">
            {file?.name}
          </Text>
        }
        description={<Caption1>{formatFileSize(file?.size)}</Caption1>}
        action={
          <Button
            appearance="transparent"
            icon={<BiMinusCircle />}
            aria-label="delete"
            onClick={onDelete}
          />
        }
      />
    </Card>
  );
}

export default FileCard;
