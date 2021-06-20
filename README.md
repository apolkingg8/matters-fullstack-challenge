# Full-stack Engineer Challenge

## Development

### Env
* `Node.js` v12+
* `Yarn` 1.x

### Stack
* Lang: TypeScript
* Front-end: Next.js, React, MobX, Material-ui
* Back-end: Express, [TypeGraphQL](https://typegraphql.com), OrbitDB

### Server
```
cs server
// start dev server :3718/graphql
yarn dev
```
* GQL endpoint: http://localhost:3718/graphql
* Use `ts-node` for dev, should be optimized in production.

### Common

Common interface here.

### Client
```
cd client
// start dev server :3716
yarn dev
```
* Add article: http://localhost:3716/article/new
* Article list: http://localhost:3716/article/p/1 (With pagination)
* Single article page: http://localhost:3716/article/{articleId} (By click article card)
* UI design & SEO can be improved.
