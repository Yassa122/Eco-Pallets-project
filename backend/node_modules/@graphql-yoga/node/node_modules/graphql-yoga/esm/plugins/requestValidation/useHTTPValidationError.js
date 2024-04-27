export function useHTTPValidationError() {
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
