"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHTTPValidationError = void 0;
function useHTTPValidationError() {
    return {
        onValidate() {
            return ({ valid, result }) => {
                if (!valid) {
                    result.forEach((error) => {
                        error.extensions.http = {
                            spec: true,
                            status: 400,
                        };
                    });
                }
            };
        },
    };
}
exports.useHTTPValidationError = useHTTPValidationError;
