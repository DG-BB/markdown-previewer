import './App.css';
import {useState} from "react";
import {marked} from 'marked';

marked.setOptions({
    breaks: true
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
};

const helperButtons = [
    {
        tag: "**Text**",
        icon: "bold"
    }, {
        tag: "_Text_",
        icon: "italic"
    }, {
        tag: "* My List Item",
        icon: "list"
    }, {
        tag: "![Alternativtext](Bild-URL \"Bildtitel\")",
        icon: "image"
    }
];

function EditorHelperButton({tag, icon, add}) {

    const handleClick = (e) => {
        e.preventDefault();
        add(tag);
    }

    return (
        <button onClick={e => handleClick(e)} className="editor-helper-item">
            <i className={"fa fa-" + icon}></i>
        </button>
    );
}

function Editor({val, update}) {
    return (
        <div className="editor-container">
            <div style={{display: "flex"}}>
                {helperButtons.map(value =>
                    <EditorHelperButton key={"item-" + value.icon} icon={value.icon} tag={value.tag}
                                        add={() => update(val + " \n" + value.tag)}/>
                )}

            </div>
            <textarea id="editor" value={val} onChange={event => update(event.target.value)}></textarea>
        </div>
    );
}

function App() {

    const [text, setText] = useState(placeholder);

    return (
        <div className="view-container">

            <Editor val={text} update={setText}/>

            <div className="editor-container">
                <div>
                    <p id="preview" style={{margin: "0"}} dangerouslySetInnerHTML={{
                        __html: marked(text, {renderer: renderer})
                    }}></p>
                </div>
            </div>
        </div>
    );
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default App;
