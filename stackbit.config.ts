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
                    urlPath: '/{slug}',

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
                    ],
                },
            ],
        }),
    ],
});