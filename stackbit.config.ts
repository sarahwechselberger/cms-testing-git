import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',

    ssgName: 'eleventy',

    devCommand: 'npx @11ty/eleventy --serve --port {PORT}',

    experimental: {
        ssg: {
            proxyWebsockets: true,
            logPatterns: {
                up: ['Server at'],
            },
        },
    },

    customContentReload: true,

    contentSources: [
        new GitContentSource({
            rootPath: process.cwd(),

            contentDirs: ['content'],

            models: [
                {
                    name: 'page',
                    type: 'page',

                    filePath: 'content/pages/{slug}.md',

                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            required: true,
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                        },
                        {
                            name: 'permalink',
                            type: 'string',
                        },
                        {
                            name: 'markdown_content',
                            type: 'markdown',
                        },
                    ],
                },
            ],
        }),
    ],

    siteMap: ({ documents, models }) => {
        const pageModels = models
            .filter((model) => model.type === 'page')
            .map((model) => model.name);

        return documents
            .filter((document) => pageModels.includes(document.modelName))
            .map((document) => {
                const permalink = document.fields.permalink;

                if (!permalink || permalink.type !== 'string') {
                    return null;
                }

                return {
                    urlPath: permalink.value,
                    document,
                };
            })
            .filter(Boolean),
    },
});