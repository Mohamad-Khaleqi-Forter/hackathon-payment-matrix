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

Build and start all apps:

```
pnpm build-apps
pnpm start-apps
```

Also make sure to start https://github.com/forter/payment-orchestration locally:

- start using `tilt up -- --to-edit=orchestration`
- make sure to configure stripe connector and create hyperswitch api key
- created api key needs to be updated at [apps/orchestration/.env.local](https://github.com/forter/payment-orchestration/blob/main/apps/orchestration/.env.local#L5)
- to reflect changes, stop (ctrl-c) and tilt up again (important, don't do tilt down)

## Usage

Navigate http://localhost:7000/ \
Example prompts:

- give me a list of tshirt
- i want the ones priced less than $23
- now buy all of above

## Setting up Google gemini

Navigate to https://aistudio.google.com/prompts/new_chat and create new API key using "Get API key".\
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
