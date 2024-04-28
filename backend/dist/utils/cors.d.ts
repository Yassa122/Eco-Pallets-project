import cors from "cors";
declare const _default: (req: cors.CorsRequest, res: {
    statusCode?: number;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
export default _default;
