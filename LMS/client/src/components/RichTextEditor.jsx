// // RichTextEditor.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.snow.css';

// const RichTextEditor = ({input,setInput}) => {
//   const { quill, quillRef } = useQuill();
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     if (quill) {
//       quill.on('text-change', () => {
//         setContent(quill.root.innerHTML); // Update HTML content on text change
//       });
//     }
//   }, [quill]);

//   return (
//     <div>
      
//       <div style={{ width: '100%', height: '100px' }} ref={quillRef} />
      
//     </div>
//   );
// };

// export default RichTextEditor;


// new code 
// RichTextEditor.jsx
import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({ input, setInput }) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        setInput((prev) => ({
          ...prev,
          description: html,
        }));
      });
    }
  }, [quill, setInput]);

  return (
    <div>
      <div style={{ width: '100%', height: '200px' }} ref={quillRef} />
    </div>
  );
};

export default RichTextEditor;

