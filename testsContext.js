const testContext = require.context('./test/', true, /\.spec\.js$/);
testContext.keys().forEach(testContext);