const process = require('process');
const opentelemetry = require("@opentelemetry/sdk-node");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { BatchSpanProcessor} = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { AWSXRayPropagator } = require("@opentelemetry/propagator-aws-xray");
const { AWSXRayIdGenerator } = require("@opentelemetry/id-generator-aws-xray");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { AwsInstrumentation } = require("@opentelemetry/instrumentation-aws-sdk");

const _resource = Resource.default().merge(new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "js-sample-app",
    }));
const _traceExporter = new OTLPTraceExporter();
const _spanProcessor = new BatchSpanProcessor(_traceExporter);
const _tracerConfig = {
    idGenerator: new AWSXRayIdGenerator(),
}

async function nodeSDKBuilder() {
    const sdk = new opentelemetry.NodeSDK({
        textMapPropagator: new AWSXRayPropagator(),
        instrumentations: [
            new HttpInstrumentation(),
            new AwsInstrumentation({
                suppressInternalInstrumentation: true
            }),
        ],
        resource: _resource,
        spanProcessor: _spanProcessor,
        traceExporter: _traceExporter,
    });
    sdk.configureTracerProvider(_tracerConfig, _spanProcessor);

    // this enables the API to record telemetry
    await sdk.start();
    // gracefully shut down the SDK on process exit
    process.on('SIGTERM', () => {
    sdk.shutdown()
      .then(() => console.log('Tracing and Metrics terminated'))
      .catch((error) => console.log('Error terminating tracing and metrics', error))
      .finally(() => process.exit(0));
    });
}