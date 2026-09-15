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
                    filePath: 'content/pages/{slug}.md',
                    urlPath: '/{slug}',
                    fields: [
                        {
                            name: 'slug',
                            type: 'string',
                            required: true
                        },
                        { name: 'permalink', type: 'string', required: true },
                        {
                            name: 'title',
                            type: 'string',
                            required: true
                        },
                    ]
                }
            ]
        })
    ]

});
