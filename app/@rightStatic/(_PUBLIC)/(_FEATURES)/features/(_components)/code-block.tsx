//app/@rightStatic/(_PUBLIC)/(_FEATURES)/features/(_components)/code-block.tsx

import SyntaxHighlighter from "react-syntax-highlighter";
interface CodeBlockProps {
    code: string;
    language?: string;
    fileName?: string;
}

export function CodeBlock({ code, language = 'typescript', fileName }: CodeBlockProps) {
    return (
        <div className="my-6 rounded-lg overflow-hidden border border-border">
            {fileName && (
                <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border">
                    {fileName}
                </div>
            )}
            <SyntaxHighlighter
                language={language}
                customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                }}
                showLineNumbers={false}
            >
                {code.trim()}
            </SyntaxHighlighter>
        </div>
    );
}