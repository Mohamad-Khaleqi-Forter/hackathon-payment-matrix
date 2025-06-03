# hackathon-payment-matrix

## Local setup

Install pnpm:

```
corepack enable
corepack prepare pnpm@9.14.4 --activate
```

Install dependencies:

```
pnpm install
```

## Usage

Build all apps:

```
pnpm build-apps
```

Start all apps:

```
pnpm start-apps
```

## Setting up Google gemini

Navigate to https://aistudio.google.com/prompts/new_chat and create new API key using "Get API key".
Then update it under .env as `GOOGLE_GENERATIVE_AI_API_KEY`.

## Setting up Clause

- Download Claude `https://claude.ai/download ` and login
- Use following config in the setting:

```
{
    "mcpServers": {
        "forter-payments-orchestration": {
            "command": "node",
            "args": [
                "/<path>/apps/mcp-forter/.build/forter-payments.js"
            ]
        },
        "merchants-a-catalog": {
            "command": "node",
            "args": [
                "/<path>//apps/mcp-merchants/.build/merchant-a-shop.js"
            ]
        }
    }
}
```
