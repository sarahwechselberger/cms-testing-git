import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'eleventy',

    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ["content"],
            models: [
                {
                    name: 'page',
                    type: 'page',
                    urlPath: '/{slug}',
                    filePath: 'content/pages/{slug}.md',
                    fields: [
                        { name: 'title', type: 'string', required: true },
                        { name: 'body', type: 'markdown' }
                    ]
                }
            ]
        })
    ],
    siteMap: ({ documents }) => {
        return documents.map((document) => ({
            stableId: document.id,
            urlPath: `/${document.fields.slug ?? document.id}`,
            document,
            isHomePage: false
        }));
    }
});
