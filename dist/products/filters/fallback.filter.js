"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FallbackExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        return res.status(500).json({
            statusCode: 500,
            createdBy: 'FallbackExceptionFilter',
            errorMsg: exception.message
                ? exception.message
                : 'Unexpected error ocurred',
        });
    }
}
exports.FallbackExceptionFilter = FallbackExceptionFilter;
//# sourceMappingURL=fallback.filter.js.map