import "./CreateLoop.css";
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import loopit from "../../api/loopit";

import LoadingSpinner from "../../assets/nobg.gif";

const CreateLoop = ({ user_id }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  const onSubmit = async ({ name, description, language, filename }) => {
    const valueEditor = editorRef.current.getValue();

    if (valueEditor.length > 2400) return null;

    if (language === "default" || !language) {
      return { [FORM_ERROR]: "Language is required" };
    }
    if (!valueEditor || valueEditor === "") {
      return null;
    }

    const params = {
      name,
      content: valueEditor,
      language,
      user_id,
    };
    if (description) params.description = description;
    if (filename) params.filename = filename;
    console.log(params);
    try {
      const response = await loopit.post("/loops/add", {
        ...params,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const buildInput = ({ input, meta, label, placeholder, optionalClass }) => {
    return (
      <input
        {...input}
        className={optionalClass ? optionalClass : ""}
        placeholder={placeholder}
        id={input.name}
        autoComplete="off"
      />
    );
  };

  return (
    <main className="editor">
      <h2 className="heading-creator">Create your loop!</h2>
      <div className="editor-container">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit} className="editor-form">
              <div className="inputs-required">
                <Field
                  name="name"
                  optionalClass="editor-req"
                  validate={(input) => {
                    return input === "" ? { title: "Title is required" } : null;
                  }}
                  placeholder="Title"
                  render={buildInput}
                />
                <Field
                  className="editor-req"
                  name="language"
                  component="select"
                  onChange={(e) => {
                    console.log(e.target.value);
                    return e.target.value;
                  }}
                >
                  <option value="default">Choose a language</option>
                  <option value="Javascript">❤️ JavaScript</option>
                  <option value="Python">💚 Python</option>
                  <option value="HTML">💙 HTML</option>
                </Field>
              </div>
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
              {submitError ? (
                <div className="error-message show-editor-error">
                  {submitError}
                </div>
              ) : (
                <br className="show-editor-error" />
              )}
              <button type="submit" className="btn btn-lily">
                Create loop
              </button>
            </form>
          )}
        />
      </div>
    </main>
  );
};

export default CreateLoop;