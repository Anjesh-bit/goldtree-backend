import generatePDF, { Resolution, Margin } from "react-to-pdf";
import ViewPdf from "./ViewPdf";
import AntdButton from "../../../../common/AntdButtons";

const options = {
  filename: "resume.pdf",
  method: "open",
  resolution: Resolution.NORMAL,
  page: {
    margin: Margin.SMALL,
    orientation: "vertical",
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },

  overrides: {
    pdf: {
      compress: true,
    },

    canvas: {
      useCORS: true,
    },
  },
};

const getTargetElement = () => document.getElementById("content-id");

const MyResume = () => {
  return (
    <div>
      <AntdButton onClick={() => generatePDF(getTargetElement, options)}>
        Generate PDF
      </AntdButton>
      <div id="content-id">
        <ViewPdf />
      </div>
    </div>
  );
};

export default MyResume;
