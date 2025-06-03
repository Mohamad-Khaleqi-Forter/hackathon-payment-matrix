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
        "merchants-utils": {
            "command": "node",
            "args": [
                "/...correct the path/mcp-merchants/.build/merchant-helpers.js"
            ]
        },
        "merchants-shoes": {
            "command": "node",
            "args": [
                "/...correct the path/mcp-merchants/.build/merchant-shoes-shop.js"
            ]
        },
         "merchant-tshirt": {
            "command": "node",
            "args": [
                "/...correct the path/mcp-merchants/.build/merchant-tshirt-shop.js"
            ]
        },
        "forter-payments-orchestration": {
            "command": "node",
            "args": [
                "/...correct the path/mcp-forter/.build/forter-payments.js"
            ]
        }
    }
}
```
