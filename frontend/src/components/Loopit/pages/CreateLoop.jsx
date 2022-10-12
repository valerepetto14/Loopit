import "./CreateLoop.css";
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

import LoadingSpinner from "../../../assets/nobg.gif";

const CreateLoop = () => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  const onSubmit = ({ name, description, language, filename }) => {
    const valueEditor = editorRef.current.getValue();

    if (language === "default" || !language) {
      return { [FORM_ERROR]: "Language is required" };
    }
    if (!valueEditor || valueEditor === "") {
      return null;
    }

    const params = {
      name,
      filename,
      content: valueEditor,
    };
    if (description) params.description = description;
    if (filename) params.filename = filename;
    console.log(params);
  };

  const buildInput = ({ input, meta, label, placeholder, optionalClass }) => {
    return (
      <div>
        <label htmlFor={input.name}>{label}</label>
        <input
          {...input}
          className={optionalClass ? optionalClass : ""}
          placeholder={placeholder}
          id={input.name}
          autoComplete="off"
        />
      </div>
    );
  };

  return (
    <main className="editor">
      <div className="editor-container">
        <h1 className="heading-creator">Create your loop!</h1>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit} className="editor-form">
              <Field
                name="name"
                optionalClass="editor-req"
                validate={(input) => {
                  return input === "" ? { title: "Title is required" } : null;
                }}
                placeholder="Title"
                render={buildInput}
              />
              <Field className="editor-req" name="language" component="select">
                <option value="default">Choose a language</option>
                <option value="Javascript">❤️ JavaScript</option>
                <option value="Python">💚 Python</option>
                <option value="HTML">💙 HTML</option>
              </Field>
              <Field
                name="description"
                placeholder="Description (optional)"
                render={buildInput}
              />
              <Field
                name="filename"
                placeholder="Filename (optional)"
                render={buildInput}
              />
              {submitError && (
                <div className="error-message show-editor-error">
                  {submitError}
                </div>
              )}
              <button type="submit" className="btn btn-lily">
                Create loop
              </button>
            </form>
          )}
        />
        <Editor
          height="40vh"
          language="javascript"
          theme="vs-dark"
          loading={
            <img src={LoadingSpinner} alt="Spinner" className="spinner" />
          }
          options={{
            fontFamily: "Consolas",
            showUnused: true,
            tabSize: 2,
            suggest: {
              showClasses: true,
            },
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </main>
  );
};

export default CreateLoop;
