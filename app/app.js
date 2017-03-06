require.config({
    baseUrl: "app",
    shim: {
        'name': {
            deps: ['dep'],
            exports: 'exports'
        }
    },
    paths: {
        "name": "path"
    }
});

requirejs(['app/main']);