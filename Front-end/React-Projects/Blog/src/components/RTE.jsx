import { Controller } from "react-hook-form";// Used when we use a external component though another external library[it helps to easily connect external component to react-hook-form]
import { Editor } from "@tinymce/tinymce-react";
import config from "../config/config";

function RTE({
    control,
    initialValue,
    name,
}){
    return(
        <div>
        <Controller
        name={name || "content"}
        control={control}
        rules={{ required: true }}
        render={({ field:{onChange} }) =>(
        <Editor
        apiKey={config.tinyMceApiKey}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'fullscreen',
            'insertdatetime', 'media', 'help',
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help '+'image | media | insertdatetime ' + 'fullscreen',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onChange}
       />)}
      />
        </div>
    )
}

export default RTE;