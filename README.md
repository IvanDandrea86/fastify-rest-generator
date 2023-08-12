# Fastify API Generator CLI

This command-line tool automates the creation of Fastify API resources. It generates controllers, services, interfaces, routes, and schemas for a given API resource.

## Installation

Install the package globally to use it from any location:

```bash
npm install -g fastify-rest-generator
```

## Usage

You can generate a new API resource with:

```bash
fastify-rest-generator post
```

By default, the tool generates files in a "module" structure. You can specify a "role" structure with the -s option:

```bash
fastify-rest-generator generate user -s role
```

or

```json
{

  // ... other package.json fields ...
  "scripts": {
    "generate": "fastify-rest-generator generate"
  }
}
```
and
```bash
npm run generate -- post
#or
npm run generate -- user -s role

```

cc
This will generate:

For "module" structure:
./src/modules/resourceName/resourceName.controller.ts
./src/modules/resourceName/resourceName.service.ts
./src/modules/resourceName/resourceName.interface.ts
./src/modules/resourceName/resourceName.route.ts
./src/modules/resourceName/resourceName.schema.ts
For "role" structure:
./src/controllers/resourceName.controller.ts
./src/services/resourceName.service.ts
./src/interfaces/resourceName.interface.ts
./src/routes/resourceName.route.ts
./src/schemas/resourceName.schema.ts

## Contributing

Contributions are welcome! Feel free to open a pull request or issue if you have suggestions for improvements or have identified bugs. If you plan to make large changes, please open an issue first to discuss your plans.

## Tests

To run tests, clone the repository, install the dependencies, and run npm test:

```bash
git clone your-repo-url
cd fastify-rest-generator
npm install
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md)
file for details.
