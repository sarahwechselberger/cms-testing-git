import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'eleventy',

    contentSources: [
        new GitContentSource({
            rootPath: process.cwd(),
            contentDirs: ["content"],
            models: [
                {
                    name: 'page',
                    type: 'page',
                    filePath: 'content/pages/{slug}.md',
                    urlPath: '/{slug}/',
                    "fields": [
                        { name: "title", type: "string", required: true },
                        { name: "slug", type: "slug" },
                        { name: "markdown_content", type: "markdown" }
                    ]
                }
            ]
        })
    ]

});
