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
                    <EditorHelperButton key={"item-" + value.icon}  icon={value.icon} tag={value.tag}
                                        add={() => update(val + " \n" + value.tag)}/>
                )}

            </div>
            <textarea id="editor" value={val} onChange={event => update(event.target.value)}></textarea>
        </div>
    );
}

function App() {

    const [text, setText] = useState('## WELCOME');

    return (
        <div className="view-container">

            <Editor val={text} update={setText}/>

            <div className="editor-container">
                <div id="preview">
                    <p style={{margin: "0"}} dangerouslySetInnerHTML={{
                        __html: marked(text, {renderer: renderer})
                    }}></p>
                </div>
            </div>
        </div>
    );
}

export default App;
