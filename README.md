# hackathon-payment-matrix

Steps to make it work:
- Instal nodejs in your laptop
- Install dependenices `pnpm install` or use `npm install`
- Build the project `pnpm run build`  or use `npm run build`
- Download Claude `https://claude.ai/download ` and login
- Use following config in the setting:
```
{
    "mcpServers": {
        "forter-payments-orchestration": {
            "command": "node",
            "args": [
                "/Users/laptop-username/Desktop/code/hackathon/.build/forter-payments-orchestration.js"
            ]
        },
        "merchants-webiste": {
            "command": "node",
            "args": [
                "/Users/laptop-username/Desktop/code/hackathon/.build/merchants-shop.js"
            ]
        }
    }
}
```