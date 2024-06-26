import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CkEditors = ({
  data,
  onChange,
  onReady,
  onBlur,
  onFocus,
  Label,
  required,
}) => {
  const onChangeCk = (event, editor) => {
    onChange instanceof Function && onChange(event, editor);
  };

  const onBlurCk = (event, editor) => {
    onBlur instanceof Function && onBlur(event, editor);
  };

  const onFocusCk = (event, editor) => {
    onFocus instanceof Function && onFocus(event, editor);
  };

  const onReadyCk = (editor) => {
    onReady instanceof Function && onReady(editor);
  };

  return (
    <div>
      {Label && (
        <div
          className={`whitespace-nowrap text-sm font-medium
          } ${
            required
              ? "after:text-[#dc4446] after:content-['*'] after:font-[400] after:ml-1 after:text-[16px]"
              : ""
          }`}
        >
          {Label}
        </div>
      )}
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={onReadyCk}
        onChange={onChangeCk}
        onBlur={onBlurCk}
        onFocus={onFocusCk}
      />
    </div>
  );
};

export default CkEditors;
