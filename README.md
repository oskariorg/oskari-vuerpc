# Oskari Rpc-examples

> Examples demonstraiting the RPC functionality of Oskari

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```
## Integrate to oskar-docs:

npm run build  
copy contents from __/dist__ to __oskari-docs__ project folder: __/public/examples/rpc-api/__ (delete old files from said directory)  
In __/views/guides.jade__ change:         
Other guides:
__/examples/rpc-api/rpc_example.html__ -> __/examples/rpc-api/index.html__
