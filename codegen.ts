import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'https://api.spacex.land/graphql/',
    documents: 'src/**/*.tsx',
    generates: {
        'src/types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
        },
    },
}

export default config
