/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts"
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const node_path_1 = __webpack_require__(/*! node:path */ "node:path");
const env_validation_1 = __webpack_require__(/*! ./config/env.validation */ "./src/config/env.validation.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ "./src/modules/auth/auth.module.ts");
const cart_module_1 = __webpack_require__(/*! ./modules/cart/cart.module */ "./src/modules/cart/cart.module.ts");
const favorites_module_1 = __webpack_require__(/*! ./modules/favorites/favorites.module */ "./src/modules/favorites/favorites.module.ts");
const health_module_1 = __webpack_require__(/*! ./modules/health/health.module */ "./src/modules/health/health.module.ts");
const listings_module_1 = __webpack_require__(/*! ./modules/listings/listings.module */ "./src/modules/listings/listings.module.ts");
const orders_module_1 = __webpack_require__(/*! ./modules/orders/orders.module */ "./src/modules/orders/orders.module.ts");
const ratings_module_1 = __webpack_require__(/*! ./modules/ratings/ratings.module */ "./src/modules/ratings/ratings.module.ts");
const search_module_1 = __webpack_require__(/*! ./modules/search/search.module */ "./src/modules/search/search.module.ts");
const stores_module_1 = __webpack_require__(/*! ./modules/stores/stores.module */ "./src/modules/stores/stores.module.ts");
const users_module_1 = __webpack_require__(/*! ./modules/users/users.module */ "./src/modules/users/users.module.ts");
const verification_module_1 = __webpack_require__(/*! ./modules/verification/verification.module */ "./src/modules/verification/verification.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                ignoreEnvFile: Boolean(process.env.WEBSITE_INSTANCE_ID),
                envFilePath: process.env.WEBSITE_INSTANCE_ID
                    ? []
                    : [
                        (0, node_path_1.resolve)(process.cwd(), 'apps/api/.env'),
                        (0, node_path_1.resolve)(process.cwd(), '.env'),
                        (0, node_path_1.resolve)(__dirname, '../.env'),
                    ],
                validate: env_validation_1.validateEnv,
            }),
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            stores_module_1.StoresModule,
            listings_module_1.ListingsModule,
            search_module_1.SearchModule,
            verification_module_1.VerificationModule,
            favorites_module_1.FavoritesModule,
            cart_module_1.CartModule,
            orders_module_1.OrdersModule,
            ratings_module_1.RatingsModule,
        ],
    })
], AppModule);


/***/ },

/***/ "./src/common/filters/api-exception.filter.ts"
/*!****************************************************!*\
  !*** ./src/common/filters/api-exception.filter.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApiExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const request_context_middleware_1 = __webpack_require__(/*! ../middleware/request-context.middleware */ "./src/common/middleware/request-context.middleware.ts");
function toRequestId(req, res) {
    const localRequestId = res.locals
        .requestId;
    if (localRequestId) {
        return localRequestId;
    }
    const headerValue = req.headers[request_context_middleware_1.REQUEST_ID_HEADER];
    if (Array.isArray(headerValue)) {
        return headerValue[0] ?? 'unknown';
    }
    return headerValue ?? 'unknown';
}
function toNestErrorBody(exception, statusCode) {
    const responseBody = exception.getResponse();
    if (typeof responseBody === 'string') {
        return {
            statusCode,
            message: responseBody,
            error: exception.name,
        };
    }
    return {
        statusCode,
        ...responseBody,
    };
}
let ApiExceptionFilter = ApiExceptionFilter_1 = class ApiExceptionFilter {
    logger = new common_1.Logger(ApiExceptionFilter_1.name);
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const requestId = toRequestId(request, response);
        const statusCode = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const baseBody = exception instanceof common_1.HttpException
            ? toNestErrorBody(exception, statusCode)
            : {
                statusCode,
                message: 'Internal server error',
                error: 'Internal Server Error',
            };
        if (statusCode >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            const error = exception instanceof Error
                ? exception
                : new Error(typeof exception === 'string'
                    ? exception
                    : 'Unknown internal exception');
            this.logger.error(`${request.method} ${request.originalUrl || request.url} ${statusCode} [${requestId}] ${error.name}: ${error.message}`, error.stack);
        }
        response.status(statusCode).json({
            ...baseBody,
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.originalUrl || request.url,
            requestId,
        });
    }
};
exports.ApiExceptionFilter = ApiExceptionFilter;
exports.ApiExceptionFilter = ApiExceptionFilter = ApiExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], ApiExceptionFilter);


/***/ },

/***/ "./src/common/http/deprecation.ts"
/*!****************************************!*\
  !*** ./src/common/http/deprecation.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.markDeprecatedRoute = markDeprecatedRoute;
const request_context_middleware_1 = __webpack_require__(/*! ../middleware/request-context.middleware */ "./src/common/middleware/request-context.middleware.ts");
const DEFAULT_SUNSET_WINDOW_DAYS = 90;
function toRequestId(req, res) {
    const localRequestId = res.locals
        .requestId;
    if (localRequestId) {
        return localRequestId;
    }
    const headerValue = req.headers[request_context_middleware_1.REQUEST_ID_HEADER];
    if (Array.isArray(headerValue)) {
        return headerValue[0] ?? 'unknown';
    }
    return headerValue ?? 'unknown';
}
function toSunsetDate(daysFromNow) {
    const sunsetDate = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
    return sunsetDate.toUTCString();
}
function markDeprecatedRoute({ canonicalPath, logger, req, res, }) {
    res.setHeader('Deprecation', 'true');
    res.setHeader('Sunset', toSunsetDate(DEFAULT_SUNSET_WINDOW_DAYS));
    res.setHeader('Link', `<${canonicalPath}>; rel="successor-version"`);
    const requestId = toRequestId(req, res);
    logger.warn(`[deprecated-route] ${req.method} ${req.originalUrl || req.url} -> ${canonicalPath} [${requestId}]`);
}


/***/ },

/***/ "./src/common/legacy-prisma-enums.ts"
/*!*******************************************!*\
  !*** ./src/common/legacy-prisma-enums.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderStatus = exports.PaymentMethod = exports.VerificationRequestStatus = exports.ListingStatus = exports.ListingCondition = exports.SellerType = exports.VerificationStatus = exports.AccountType = void 0;
var client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
Object.defineProperty(exports, "AccountType", ({ enumerable: true, get: function () { return client_1.AccountType; } }));
Object.defineProperty(exports, "VerificationStatus", ({ enumerable: true, get: function () { return client_1.VerificationStatus; } }));
Object.defineProperty(exports, "SellerType", ({ enumerable: true, get: function () { return client_1.SellerType; } }));
Object.defineProperty(exports, "ListingCondition", ({ enumerable: true, get: function () { return client_1.ListingCondition; } }));
Object.defineProperty(exports, "ListingStatus", ({ enumerable: true, get: function () { return client_1.ListingStatus; } }));
Object.defineProperty(exports, "VerificationRequestStatus", ({ enumerable: true, get: function () { return client_1.VerificationRequestStatus; } }));
Object.defineProperty(exports, "PaymentMethod", ({ enumerable: true, get: function () { return client_1.PaymentMethod; } }));
Object.defineProperty(exports, "OrderStatus", ({ enumerable: true, get: function () { return client_1.OrderStatus; } }));


/***/ },

/***/ "./src/common/middleware/api-logging.middleware.ts"
/*!*********************************************************!*\
  !*** ./src/common/middleware/api-logging.middleware.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.apiLoggingMiddleware = apiLoggingMiddleware;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const request_context_middleware_1 = __webpack_require__(/*! ./request-context.middleware */ "./src/common/middleware/request-context.middleware.ts");
const logger = new common_1.Logger('ApiLogger');
function toRequestId(req, res) {
    const localRequestId = res.locals
        .requestId;
    if (localRequestId) {
        return localRequestId;
    }
    const headerValue = req.headers[request_context_middleware_1.REQUEST_ID_HEADER];
    if (Array.isArray(headerValue)) {
        return headerValue[0] ?? 'unknown';
    }
    return headerValue ?? 'unknown';
}
function shouldSkipLog(url) {
    return url.startsWith('/api/health');
}
function apiLoggingMiddleware(req, res, next) {
    const startedAt = process.hrtime.bigint();
    res.on('finish', () => {
        const url = req.originalUrl || req.url;
        if (shouldSkipLog(url)) {
            return;
        }
        const durationMs = Number((process.hrtime.bigint() - startedAt) / 1000000n);
        const requestId = toRequestId(req, res);
        logger.log(`${req.method} ${url} ${res.statusCode} ${durationMs}ms [${requestId}]`);
    });
    next();
}


/***/ },

/***/ "./src/common/middleware/request-context.middleware.ts"
/*!*************************************************************!*\
  !*** ./src/common/middleware/request-context.middleware.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REQUEST_ID_HEADER = void 0;
exports.requestContextMiddleware = requestContextMiddleware;
const node_crypto_1 = __webpack_require__(/*! node:crypto */ "node:crypto");
exports.REQUEST_ID_HEADER = 'x-request-id';
function normalizeHeaderValue(value) {
    if (Array.isArray(value)) {
        return value[0] ?? '';
    }
    return value ?? '';
}
function requestContextMiddleware(req, res, next) {
    const incomingRequestId = normalizeHeaderValue(req.headers[exports.REQUEST_ID_HEADER]);
    const requestId = incomingRequestId.trim() || (0, node_crypto_1.randomUUID)();
    req.headers[exports.REQUEST_ID_HEADER] = requestId;
    res.locals.requestId = requestId;
    res.setHeader(exports.REQUEST_ID_HEADER, requestId);
    next();
}


/***/ },

/***/ "./src/config/env.validation.ts"
/*!**************************************!*\
  !*** ./src/config/env.validation.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateEnv = validateEnv;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class EnvironmentVariables {
    DATABASE_URL;
    PROD_DATABASE_URL;
    JWT_SECRET;
    GOOGLE_CLIENT_ID;
    GOOGLE_CLIENT_SECRET;
    GOOGLE_CALLBACK_URL;
    FRONTEND_URL;
    SMTP_HOST;
    SMTP_PORT;
    SMTP_USER;
    SMTP_PASSWORD;
    SMTP_FROM;
    SMTP_SECURE;
    PORT = 4000;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DATABASE_URL", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "PROD_DATABASE_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_CLIENT_ID", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_CLIENT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_CALLBACK_URL", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FRONTEND_URL", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_HOST", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_PORT", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_USER", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_FROM", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_SECURE", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(65535),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
function validateEnv(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    const effectiveDatabaseUrl = validatedConfig.PROD_DATABASE_URL ?? validatedConfig.DATABASE_URL;
    if (effectiveDatabaseUrl) {
        validatedConfig.DATABASE_URL = effectiveDatabaseUrl;
    }
    return validatedConfig;
}


/***/ },

/***/ "./src/modules/auth/auth.controller.ts"
/*!*********************************************!*\
  !*** ./src/modules/auth/auth.controller.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sign_in_dto_1 = __webpack_require__(/*! ./dto/sign-in.dto */ "./src/modules/auth/dto/sign-in.dto.ts");
const sign_up_dto_1 = __webpack_require__(/*! ./dto/sign-up.dto */ "./src/modules/auth/dto/sign-up.dto.ts");
const google_auth_guard_1 = __webpack_require__(/*! ./guards/google-auth.guard */ "./src/modules/auth/guards/google-auth.guard.ts");
const google_callback_auth_guard_1 = __webpack_require__(/*! ./guards/google-callback-auth.guard */ "./src/modules/auth/guards/google-callback-auth.guard.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/modules/auth/auth.service.ts");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    googleAuthEntry(response, returnTo) {
        if (!this.authService.isGoogleOAuthConfigured()) {
            return response.redirect(this.authService.buildFrontendCallbackUrl({
                error: 'google_oauth_not_configured',
                returnTo,
            }));
        }
        const safeReturnTo = this.authService.sanitizeReturnTo(returnTo);
        return response.redirect(`/api/auth/google/start?returnTo=${encodeURIComponent(safeReturnTo)}`);
    }
    googleAuthStart() {
        return;
    }
    async googleAuthCallback(req, response) {
        try {
            if (!req.user) {
                return response.redirect(this.authService.buildFrontendCallbackUrl({
                    error: 'google_auth_failed',
                }));
            }
            const authResult = await this.authService.signInWithGoogle(req.user);
            return response.redirect(this.authService.buildFrontendCallbackUrl({
                token: authResult.accessToken,
                returnTo: req.user.returnTo,
            }));
        }
        catch (error) {
            const message = error instanceof common_1.UnauthorizedException ? error.message : undefined;
            const errorCode = message === 'GOOGLE_DIU_EMAIL_REQUIRED'
                ? 'google_diu_email_required'
                : message === 'GOOGLE_EMAIL_NOT_VERIFIED'
                    ? 'google_email_not_verified'
                    : message === 'GOOGLE_ACCOUNT_INACTIVE'
                        ? 'google_account_inactive'
                        : 'google_callback_failed';
            return response.redirect(this.authService.buildFrontendCallbackUrl({
                error: errorCode,
                returnTo: req.user?.returnTo,
            }));
        }
    }
    signUp(dto) {
        return this.authService.signUp(dto);
    }
    signIn(dto) {
        return this.authService.signIn(dto);
    }
    me(req) {
        return this.authService.me(req.user.sub);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('returnTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthEntry", null);
__decorate([
    (0, common_1.Get)('google/start'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthStart", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_callback_auth_guard_1.GoogleCallbackAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof sign_up_dto_1.SignUpDto !== "undefined" && sign_up_dto_1.SignUpDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof sign_in_dto_1.SignInDto !== "undefined" && sign_in_dto_1.SignInDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ },

/***/ "./src/modules/auth/auth.module.ts"
/*!*****************************************!*\
  !*** ./src/modules/auth/auth.module.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./src/modules/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/modules/auth/auth.service.ts");
const google_auth_guard_1 = __webpack_require__(/*! ./guards/google-auth.guard */ "./src/modules/auth/guards/google-auth.guard.ts");
const google_callback_auth_guard_1 = __webpack_require__(/*! ./guards/google-callback-auth.guard */ "./src/modules/auth/guards/google-callback-auth.guard.ts");
const google_strategy_1 = __webpack_require__(/*! ./strategies/google.strategy */ "./src/modules/auth/strategies/google.strategy.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ "./src/modules/auth/strategies/jwt.strategy.ts");
const verification_module_1 = __webpack_require__(/*! ../verification/verification.module */ "./src/modules/verification/verification.module.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            verification_module_1.VerificationModule,
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: { expiresIn: '7d' },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            google_strategy_1.GoogleStrategy,
            google_auth_guard_1.GoogleAuthGuard,
            google_callback_auth_guard_1.GoogleCallbackAuthGuard,
        ],
        exports: [auth_service_1.AuthService, passport_1.PassportModule, jwt_1.JwtModule],
    })
], AuthModule);


/***/ },

/***/ "./src/modules/auth/auth.service.ts"
/*!******************************************!*\
  !*** ./src/modules/auth/auth.service.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const node_crypto_1 = __webpack_require__(/*! node:crypto */ "node:crypto");
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const verification_service_1 = __webpack_require__(/*! ../verification/verification.service */ "./src/modules/verification/verification.service.ts");
const diu_email_1 = __webpack_require__(/*! ./diu-email */ "./src/modules/auth/diu-email.ts");
const password_hasher_1 = __webpack_require__(/*! ./password-hasher */ "./src/modules/auth/password-hasher.ts");
const prisma = new client_1.PrismaClient();
let AuthService = class AuthService {
    jwtService;
    configService;
    verificationService;
    constructor(jwtService, configService, verificationService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.verificationService = verificationService;
    }
    async signUp(dto) {
        return this.withAuthAvailability(async () => {
            const email = (0, diu_email_1.normalizeEmail)(dto.email);
            if (!(0, diu_email_1.isDiuEmail)(email)) {
                throw new common_1.BadRequestException('Only official DIU student email addresses can create an account.');
            }
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                if (existingUser.verificationStatus !== legacy_prisma_enums_1.VerificationStatus.VERIFIED &&
                    (await (0, password_hasher_1.comparePassword)(dto.password, existingUser.passwordHash))) {
                    await this.verificationService.issueVerificationOtp(existingUser.id, existingUser.email);
                    return this.buildVerificationRequiredResponse(existingUser.email);
                }
                throw new common_1.ConflictException('Email is already registered.');
            }
            const passwordHash = await (0, password_hasher_1.hashPassword)(dto.password);
            const createdUser = await prisma.user.create({
                data: {
                    fullName: this.nameFromEmail(email),
                    email,
                    passwordHash,
                    accountType: legacy_prisma_enums_1.AccountType.PERSONAL,
                    verificationStatus: legacy_prisma_enums_1.VerificationStatus.UNVERIFIED,
                    verifiedAt: null,
                },
                include: {
                    storeProfile: {
                        select: {
                            id: true,
                            storeName: true,
                            slug: true,
                            isFeatured: true,
                            logoUrl: true,
                            bannerUrl: true,
                        },
                    },
                },
            });
            await this.verificationService.issueVerificationOtp(createdUser.id, createdUser.email);
            return this.buildVerificationRequiredResponse(createdUser.email);
        });
    }
    async signIn(dto) {
        return this.withAuthAvailability(async () => {
            const email = (0, diu_email_1.normalizeEmail)(dto.email);
            if (!(0, diu_email_1.isDiuEmail)(email)) {
                throw new common_1.UnauthorizedException('Invalid email or password.');
            }
            const user = await prisma.user.findUnique({
                where: { email },
                include: {
                    storeProfile: {
                        select: {
                            id: true,
                            storeName: true,
                            slug: true,
                            isFeatured: true,
                            logoUrl: true,
                            bannerUrl: true,
                        },
                    },
                },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid email or password.');
            }
            const isPasswordValid = await (0, password_hasher_1.comparePassword)(dto.password, user.passwordHash);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid email or password.');
            }
            if (!user.isActive) {
                throw new common_1.UnauthorizedException('Unable to sign in with this account.');
            }
            if (user.verificationStatus !== legacy_prisma_enums_1.VerificationStatus.VERIFIED) {
                throw new common_1.UnauthorizedException('Please verify your DIU email before signing in.');
            }
            return this.buildAuthSuccessResponse(user.id, user.email, {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                accountType: user.accountType,
                verificationStatus: user.verificationStatus,
                verifiedAt: user.verifiedAt,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                storeProfile: user.storeProfile,
            });
        });
    }
    async me(userId) {
        return this.withAuthAvailability(async () => {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    storeProfile: {
                        select: {
                            id: true,
                            storeName: true,
                            slug: true,
                            isFeatured: true,
                            logoUrl: true,
                            bannerUrl: true,
                        },
                    },
                },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid access token.');
            }
            if (!user.isActive) {
                throw new common_1.UnauthorizedException('Invalid access token.');
            }
            return this.toSafeUser(user);
        });
    }
    async signInWithGoogle(googleUser) {
        return this.withAuthAvailability(async () => {
            const email = (0, diu_email_1.normalizeEmail)(googleUser.email);
            const fullName = this.normalizeName(googleUser.fullName) || 'Google User';
            if (!email || !(0, diu_email_1.isDiuEmail)(email)) {
                throw new common_1.UnauthorizedException('GOOGLE_DIU_EMAIL_REQUIRED');
            }
            if (!googleUser.emailVerified) {
                throw new common_1.UnauthorizedException('GOOGLE_EMAIL_NOT_VERIFIED');
            }
            let user = await prisma.user.findUnique({
                where: { email },
                include: {
                    storeProfile: {
                        select: {
                            id: true,
                            storeName: true,
                            slug: true,
                            isFeatured: true,
                            logoUrl: true,
                            bannerUrl: true,
                        },
                    },
                },
            });
            if (!user) {
                const oauthPlaceholderHash = await (0, password_hasher_1.hashPassword)(`google-oauth:${(0, node_crypto_1.randomUUID)()}`);
                user = await prisma.user.create({
                    data: {
                        fullName,
                        email,
                        passwordHash: oauthPlaceholderHash,
                        accountType: legacy_prisma_enums_1.AccountType.PERSONAL,
                        verificationStatus: legacy_prisma_enums_1.VerificationStatus.VERIFIED,
                        verifiedAt: new Date(),
                    },
                    include: {
                        storeProfile: {
                            select: {
                                id: true,
                                storeName: true,
                                slug: true,
                                isFeatured: true,
                                logoUrl: true,
                                bannerUrl: true,
                            },
                        },
                    },
                });
            }
            else {
                if (!user.isActive) {
                    throw new common_1.UnauthorizedException('GOOGLE_ACCOUNT_INACTIVE');
                }
                if (user.verificationStatus !== legacy_prisma_enums_1.VerificationStatus.VERIFIED) {
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            verificationStatus: legacy_prisma_enums_1.VerificationStatus.VERIFIED,
                            verifiedAt: new Date(),
                        },
                        include: {
                            storeProfile: {
                                select: {
                                    id: true,
                                    storeName: true,
                                    slug: true,
                                    isFeatured: true,
                                    logoUrl: true,
                                    bannerUrl: true,
                                },
                            },
                        },
                    });
                }
            }
            return this.buildAuthSuccessResponse(user.id, user.email, {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                accountType: user.accountType,
                verificationStatus: user.verificationStatus,
                verifiedAt: user.verifiedAt,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                storeProfile: user.storeProfile,
            });
        });
    }
    isGoogleOAuthConfigured() {
        const clientId = this.configService.get('GOOGLE_CLIENT_ID')?.trim();
        const clientSecret = this.configService
            .get('GOOGLE_CLIENT_SECRET')
            ?.trim();
        const callbackUrl = this.configService
            .get('GOOGLE_CALLBACK_URL')
            ?.trim();
        return Boolean(clientId && clientSecret && callbackUrl);
    }
    sanitizeReturnTo(returnTo) {
        if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
            return returnTo;
        }
        return '/';
    }
    buildFrontendCallbackUrl(params) {
        const frontendUrl = this.getFrontendUrl();
        let callbackUrl;
        try {
            callbackUrl = new URL('/auth/callback', frontendUrl);
        }
        catch {
            throw new common_1.InternalServerErrorException('Invalid FRONTEND_URL configuration.');
        }
        if (params.token) {
            callbackUrl.searchParams.set('token', params.token);
        }
        if (params.error) {
            callbackUrl.searchParams.set('error', params.error);
        }
        const safeReturnTo = this.sanitizeReturnTo(params.returnTo);
        callbackUrl.searchParams.set('returnTo', safeReturnTo);
        return callbackUrl.toString();
    }
    async signAccessToken(userId, email) {
        return this.jwtService.signAsync({
            sub: userId,
            email,
        });
    }
    async buildAuthSuccessResponse(userId, email, user) {
        const accessToken = await this.signAccessToken(userId, email);
        return {
            accessToken,
            user: this.toSafeUser(user),
        };
    }
    normalizeName(fullName) {
        return fullName.trim().replace(/\s+/g, ' ');
    }
    getFrontendUrl() {
        const frontendUrl = this.configService.get('FRONTEND_URL')?.trim();
        if (!frontendUrl || frontendUrl.length === 0) {
            return 'http://localhost:3000';
        }
        return frontendUrl;
    }
    async withAuthAvailability(action) {
        try {
            return await action();
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error instanceof client_1.Prisma.PrismaClientInitializationError ||
                error instanceof client_1.Prisma.PrismaClientRustPanicError ||
                error instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
                throw new common_1.ServiceUnavailableException('Authentication service is temporarily unavailable.');
            }
            throw error;
        }
    }
    nameFromEmail(email) {
        const localPart = email.split('@')[0] ?? 'DIU Student';
        const name = localPart
            .split(/[._-]+/)
            .filter(Boolean)
            .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
            .join(' ');
        return name || 'DIU Student';
    }
    buildVerificationRequiredResponse(email) {
        return {
            message: 'A verification code has been sent to your DIU email.',
            verificationRequired: true,
            verificationEmail: email,
        };
    }
    toSafeUser(user) {
        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            accountType: user.accountType,
            verificationStatus: user.verificationStatus,
            verifiedAt: user.verifiedAt,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            storeProfile: user.storeProfile
                ? {
                    id: user.storeProfile.id,
                    storeName: user.storeProfile.storeName,
                    slug: user.storeProfile.slug,
                    isFeatured: user.storeProfile.isFeatured,
                    logoUrl: user.storeProfile.logoUrl,
                    bannerUrl: user.storeProfile.bannerUrl,
                }
                : null,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof verification_service_1.VerificationService !== "undefined" && verification_service_1.VerificationService) === "function" ? _c : Object])
], AuthService);


/***/ },

/***/ "./src/modules/auth/diu-email.ts"
/*!***************************************!*\
  !*** ./src/modules/auth/diu-email.ts ***!
  \***************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DIU_EMAIL_DOMAINS = void 0;
exports.normalizeEmail = normalizeEmail;
exports.isDiuEmail = isDiuEmail;
exports.DIU_EMAIL_DOMAINS = ['@diu.edu.bd', '@s.diu.edu.bd'];
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
function isDiuEmail(email) {
    const normalizedEmail = normalizeEmail(email);
    return exports.DIU_EMAIL_DOMAINS.some((domain) => normalizedEmail.endsWith(domain));
}


/***/ },

/***/ "./src/modules/auth/dto/sign-in.dto.ts"
/*!*********************************************!*\
  !*** ./src/modules/auth/dto/sign-in.dto.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class SignInDto {
    email;
    password;
}
exports.SignInDto = SignInDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim().toLowerCase()),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/@(diu\.edu\.bd|s\.diu\.edu\.bd)$/, {
        message: 'email must use an official DIU student email address',
    }),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);


/***/ },

/***/ "./src/modules/auth/dto/sign-up.dto.ts"
/*!*********************************************!*\
  !*** ./src/modules/auth/dto/sign-up.dto.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class SignUpDto {
    email;
    password;
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim().toLowerCase()),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/@(diu\.edu\.bd|s\.diu\.edu\.bd)$/, {
        message: 'email must use an official DIU student email address',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);


/***/ },

/***/ "./src/modules/auth/guards/google-auth.guard.ts"
/*!******************************************************!*\
  !*** ./src/modules/auth/guards/google-auth.guard.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let GoogleAuthGuard = class GoogleAuthGuard extends (0, passport_1.AuthGuard)('google') {
    getAuthenticateOptions(context) {
        const request = context.switchToHttp().getRequest();
        const returnTo = request.query?.returnTo;
        return {
            scope: ['email', 'profile'],
            session: false,
            state: typeof returnTo === 'string' && returnTo.startsWith('/')
                ? returnTo
                : '/',
        };
    }
};
exports.GoogleAuthGuard = GoogleAuthGuard;
exports.GoogleAuthGuard = GoogleAuthGuard = __decorate([
    (0, common_1.Injectable)()
], GoogleAuthGuard);


/***/ },

/***/ "./src/modules/auth/guards/google-callback-auth.guard.ts"
/*!***************************************************************!*\
  !*** ./src/modules/auth/guards/google-callback-auth.guard.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleCallbackAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let GoogleCallbackAuthGuard = class GoogleCallbackAuthGuard extends (0, passport_1.AuthGuard)('google') {
    configService;
    constructor(configService) {
        super();
        this.configService = configService;
    }
    getAuthenticateOptions(_context) {
        const frontendUrl = this.configService.get('FRONTEND_URL')?.trim();
        const normalizedFrontendUrl = frontendUrl && frontendUrl.length > 0
            ? frontendUrl.replace(/\/$/, '')
            : 'http://localhost:3000';
        return {
            session: false,
            failureRedirect: `${normalizedFrontendUrl}/auth/callback?error=google_auth_failed`,
        };
    }
};
exports.GoogleCallbackAuthGuard = GoogleCallbackAuthGuard;
exports.GoogleCallbackAuthGuard = GoogleCallbackAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GoogleCallbackAuthGuard);


/***/ },

/***/ "./src/modules/auth/guards/jwt-auth.guard.ts"
/*!***************************************************!*\
  !*** ./src/modules/auth/guards/jwt-auth.guard.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ },

/***/ "./src/modules/auth/password-hasher.ts"
/*!*********************************************!*\
  !*** ./src/modules/auth/password-hasher.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
function loadHasher() {
    try {
        return __webpack_require__(/*! bcrypt */ "bcrypt");
    }
    catch {
        return __webpack_require__(/*! bcryptjs */ "bcryptjs");
    }
}
const hasher = loadHasher();
function hashPassword(password) {
    return hasher.hash(password, 12);
}
function comparePassword(plainPassword, storedHash) {
    return hasher.compare(plainPassword, storedHash);
}


/***/ },

/***/ "./src/modules/auth/strategies/google.strategy.ts"
/*!********************************************************!*\
  !*** ./src/modules/auth/strategies/google.strategy.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(configService) {
        const clientID = configService.get('GOOGLE_CLIENT_ID')?.trim();
        const clientSecret = configService
            .get('GOOGLE_CLIENT_SECRET')
            ?.trim();
        const callbackURL = configService
            .get('GOOGLE_CALLBACK_URL')
            ?.trim();
        super({
            clientID: clientID && clientID.length > 0 ? clientID : 'missing-client-id',
            clientSecret: clientSecret && clientSecret.length > 0
                ? clientSecret
                : 'missing-client-secret',
            callbackURL: callbackURL && callbackURL.length > 0
                ? callbackURL
                : 'http://localhost:4000/api/auth/google/callback',
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
    }
    validate(req, _accessToken, _refreshToken, profile) {
        const email = profile._json.email?.trim().toLowerCase() ??
            profile.emails?.[0]?.value?.trim().toLowerCase();
        const emailVerified = profile._json.email_verified === true ||
            profile.emails?.some((candidate) => candidate.value === email && candidate.verified) ===
                true;
        if (!email) {
            throw new common_1.UnauthorizedException('Google account email is unavailable.');
        }
        const fullName = profile.displayName?.trim() ||
            [profile.name?.givenName, profile.name?.familyName]
                .filter((part) => Boolean(part && part.trim().length > 0))
                .join(' ')
                .trim() ||
            'Google User';
        const state = typeof req.query?.state === 'string' && req.query.state.startsWith('/')
            ? req.query.state
            : '/';
        return {
            email,
            emailVerified,
            fullName,
            returnTo: state,
        };
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GoogleStrategy);


/***/ },

/***/ "./src/modules/auth/strategies/jwt.strategy.ts"
/*!*****************************************************!*\
  !*** ./src/modules/auth/strategies/jwt.strategy.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
        });
    }
    validate(payload) {
        return payload;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ },

/***/ "./src/modules/cart/cart.controller.ts"
/*!*********************************************!*\
  !*** ./src/modules/cart/cart.controller.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const add_cart_item_dto_1 = __webpack_require__(/*! ./dto/add-cart-item.dto */ "./src/modules/cart/dto/add-cart-item.dto.ts");
const update_cart_item_dto_1 = __webpack_require__(/*! ./dto/update-cart-item.dto */ "./src/modules/cart/dto/update-cart-item.dto.ts");
const cart_service_1 = __webpack_require__(/*! ./cart.service */ "./src/modules/cart/cart.service.ts");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(req) {
        return this.cartService.getCart(req.user.sub);
    }
    addItem(req, dto) {
        return this.cartService.addItem(req.user.sub, dto);
    }
    updateItem(req, id, dto) {
        return this.cartService.updateItem(req.user.sub, id, dto);
    }
    removeItem(req, id) {
        return this.cartService.removeItem(req.user.sub, id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof add_cart_item_dto_1.AddCartItemDto !== "undefined" && add_cart_item_dto_1.AddCartItemDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Patch)('items/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_c = typeof update_cart_item_dto_1.UpdateCartItemDto !== "undefined" && update_cart_item_dto_1.UpdateCartItemDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeItem", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof cart_service_1.CartService !== "undefined" && cart_service_1.CartService) === "function" ? _a : Object])
], CartController);


/***/ },

/***/ "./src/modules/cart/cart.module.ts"
/*!*****************************************!*\
  !*** ./src/modules/cart/cart.module.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cart_controller_1 = __webpack_require__(/*! ./cart.controller */ "./src/modules/cart/cart.controller.ts");
const cart_service_1 = __webpack_require__(/*! ./cart.service */ "./src/modules/cart/cart.service.ts");
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService],
    })
], CartModule);


/***/ },

/***/ "./src/modules/cart/cart.service.ts"
/*!******************************************!*\
  !*** ./src/modules/cart/cart.service.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const prisma = new client_1.PrismaClient();
let CartService = class CartService {
    async getCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        const items = await prisma.cartItem.findMany({
            where: { cartId: cart.id },
            orderBy: { createdAt: 'desc' },
            include: {
                listing: {
                    include: {
                        images: { orderBy: { sortOrder: 'asc' } },
                        storeProfile: {
                            select: {
                                id: true,
                                storeName: true,
                                slug: true,
                                logoUrl: true,
                                isFeatured: true,
                            },
                        },
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                accountType: true,
                                verificationStatus: true,
                            },
                        },
                    },
                },
            },
        });
        return {
            id: cart.id,
            userId: cart.userId,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
            items,
            summary: {
                itemCount: items.length,
            },
        };
    }
    async addItem(userId, dto) {
        const cart = await this.getOrCreateCart(userId);
        const listing = await prisma.listing.findUnique({
            where: { id: dto.listingId },
            select: {
                id: true,
                sellerType: true,
                storeProfileId: true,
                status: true,
                price: true,
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found.');
        }
        if (listing.sellerType !== legacy_prisma_enums_1.SellerType.STORE || !listing.storeProfileId) {
            throw new common_1.BadRequestException('Only STORE listings can be added to cart.');
        }
        if (listing.status !== legacy_prisma_enums_1.ListingStatus.PUBLISHED) {
            throw new common_1.BadRequestException('Only active listings can be added to cart.');
        }
        const existing = await prisma.cartItem.findUnique({
            where: {
                cartId_listingId: {
                    cartId: cart.id,
                    listingId: dto.listingId,
                },
            },
            select: {
                id: true,
                quantity: true,
            },
        });
        if (existing) {
            return prisma.cartItem.update({
                where: { id: existing.id },
                data: {
                    quantity: Math.min(99, existing.quantity + dto.quantity),
                },
                include: {
                    listing: {
                        include: {
                            images: { orderBy: { sortOrder: 'asc' } },
                            storeProfile: {
                                select: {
                                    id: true,
                                    storeName: true,
                                    slug: true,
                                    logoUrl: true,
                                    isFeatured: true,
                                },
                            },
                        },
                    },
                },
            });
        }
        return prisma.cartItem.create({
            data: {
                cartId: cart.id,
                listingId: dto.listingId,
                quantity: dto.quantity,
                unitPrice: listing.price,
            },
            include: {
                listing: {
                    include: {
                        images: { orderBy: { sortOrder: 'asc' } },
                        storeProfile: {
                            select: {
                                id: true,
                                storeName: true,
                                slug: true,
                                logoUrl: true,
                                isFeatured: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async updateItem(userId, cartItemId, dto) {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: {
                cart: {
                    select: {
                        id: true,
                        userId: true,
                    },
                },
            },
        });
        if (!cartItem || cartItem.cart.userId !== userId) {
            throw new common_1.NotFoundException('Cart item not found.');
        }
        return prisma.cartItem.update({
            where: { id: cartItemId },
            data: {
                quantity: dto.quantity,
            },
            include: {
                listing: {
                    include: {
                        images: { orderBy: { sortOrder: 'asc' } },
                        storeProfile: {
                            select: {
                                id: true,
                                storeName: true,
                                slug: true,
                                logoUrl: true,
                                isFeatured: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async removeItem(userId, cartItemId) {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: {
                cart: {
                    select: {
                        userId: true,
                    },
                },
            },
        });
        if (!cartItem || cartItem.cart.userId !== userId) {
            throw new common_1.NotFoundException('Cart item not found.');
        }
        await prisma.cartItem.delete({
            where: { id: cartItemId },
        });
        return {
            success: true,
            cartItemId,
        };
    }
    async getOrCreateCart(userId) {
        const existingCart = await prisma.cart.findUnique({
            where: { userId },
        });
        if (existingCart) {
            return existingCart;
        }
        return prisma.cart.create({
            data: { userId },
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)()
], CartService);


/***/ },

/***/ "./src/modules/cart/dto/add-cart-item.dto.ts"
/*!***************************************************!*\
  !*** ./src/modules/cart/dto/add-cart-item.dto.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddCartItemDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AddCartItemDto {
    listingId;
    quantity = 1;
}
exports.AddCartItemDto = AddCartItemDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCartItemDto.prototype, "listingId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(99),
    __metadata("design:type", Number)
], AddCartItemDto.prototype, "quantity", void 0);


/***/ },

/***/ "./src/modules/cart/dto/update-cart-item.dto.ts"
/*!******************************************************!*\
  !*** ./src/modules/cart/dto/update-cart-item.dto.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCartItemDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateCartItemDto {
    quantity;
}
exports.UpdateCartItemDto = UpdateCartItemDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(99),
    __metadata("design:type", Number)
], UpdateCartItemDto.prototype, "quantity", void 0);


/***/ },

/***/ "./src/modules/favorites/dto/add-favorite.dto.ts"
/*!*******************************************************!*\
  !*** ./src/modules/favorites/dto/add-favorite.dto.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddFavoriteDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AddFavoriteDto {
    listingId;
}
exports.AddFavoriteDto = AddFavoriteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddFavoriteDto.prototype, "listingId", void 0);


/***/ },

/***/ "./src/modules/favorites/favorites.controller.ts"
/*!*******************************************************!*\
  !*** ./src/modules/favorites/favorites.controller.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FavoritesController_1;
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoritesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const deprecation_1 = __webpack_require__(/*! ../../common/http/deprecation */ "./src/common/http/deprecation.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const add_favorite_dto_1 = __webpack_require__(/*! ./dto/add-favorite.dto */ "./src/modules/favorites/dto/add-favorite.dto.ts");
const favorites_service_1 = __webpack_require__(/*! ./favorites.service */ "./src/modules/favorites/favorites.service.ts");
let FavoritesController = FavoritesController_1 = class FavoritesController {
    favoritesService;
    logger = new common_1.Logger(FavoritesController_1.name);
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    list(req) {
        return this.favoritesService.list(req.user.sub);
    }
    add(req, dto) {
        return this.favoritesService.add(req.user.sub, dto.listingId);
    }
    addLegacy(req, listingId, res) {
        (0, deprecation_1.markDeprecatedRoute)({
            canonicalPath: '/api/favorites',
            logger: this.logger,
            req,
            res,
        });
        return this.favoritesService.add(req.user.sub, listingId);
    }
    remove(req, listingId) {
        return this.favoritesService.remove(req.user.sub, listingId);
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _c : Object, typeof (_d = typeof add_favorite_dto_1.AddFavoriteDto !== "undefined" && add_favorite_dto_1.AddFavoriteDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "add", null);
__decorate([
    (0, common_1.Post)(':listingId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingId')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _e : Object, String, Object]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "addLegacy", null);
__decorate([
    (0, common_1.Delete)(':listingId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _f : Object, String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "remove", null);
exports.FavoritesController = FavoritesController = FavoritesController_1 = __decorate([
    (0, common_1.Controller)('favorites'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof favorites_service_1.FavoritesService !== "undefined" && favorites_service_1.FavoritesService) === "function" ? _a : Object])
], FavoritesController);


/***/ },

/***/ "./src/modules/favorites/favorites.module.ts"
/*!***************************************************!*\
  !*** ./src/modules/favorites/favorites.module.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoritesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const favorites_controller_1 = __webpack_require__(/*! ./favorites.controller */ "./src/modules/favorites/favorites.controller.ts");
const favorites_service_1 = __webpack_require__(/*! ./favorites.service */ "./src/modules/favorites/favorites.service.ts");
let FavoritesModule = class FavoritesModule {
};
exports.FavoritesModule = FavoritesModule;
exports.FavoritesModule = FavoritesModule = __decorate([
    (0, common_1.Module)({
        controllers: [favorites_controller_1.FavoritesController],
        providers: [favorites_service_1.FavoritesService],
    })
], FavoritesModule);


/***/ },

/***/ "./src/modules/favorites/favorites.service.ts"
/*!****************************************************!*\
  !*** ./src/modules/favorites/favorites.service.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoritesService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const prisma = new client_1.PrismaClient();
let FavoritesService = class FavoritesService {
    async list(userId) {
        return prisma.favorite.findMany({
            where: {
                userId,
                listing: {
                    status: {
                        not: legacy_prisma_enums_1.ListingStatus.ARCHIVED,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
            include: {
                listing: {
                    include: {
                        images: { orderBy: { sortOrder: 'asc' } },
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                accountType: true,
                                verificationStatus: true,
                            },
                        },
                        storeProfile: {
                            select: {
                                id: true,
                                storeName: true,
                                slug: true,
                                logoUrl: true,
                                isFeatured: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async add(userId, listingId) {
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
            select: { id: true },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found.');
        }
        const existing = await prisma.favorite.findUnique({
            where: {
                userId_listingId: {
                    userId,
                    listingId,
                },
            },
            include: {
                listing: {
                    include: {
                        images: { orderBy: { sortOrder: 'asc' } },
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                accountType: true,
                                verificationStatus: true,
                            },
                        },
                        storeProfile: {
                            select: {
                                id: true,
                                storeName: true,
                                slug: true,
                                logoUrl: true,
                                isFeatured: true,
                            },
                        },
                    },
                },
            },
        });
        if (existing) {
            return existing;
        }
        return prisma.favorite.create({
            data: {
                userId,
                listingId,
            },
            include: {
                listing: {
                    include: {
                        images: { orderBy: { sortOrder: 'asc' } },
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                accountType: true,
                                verificationStatus: true,
                            },
                        },
                        storeProfile: {
                            select: {
                                id: true,
                                storeName: true,
                                slug: true,
                                logoUrl: true,
                                isFeatured: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async remove(userId, listingId) {
        await prisma.favorite.deleteMany({
            where: {
                userId,
                listingId,
            },
        });
        return {
            success: true,
            listingId,
        };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)()
], FavoritesService);


/***/ },

/***/ "./src/modules/health/health.controller.ts"
/*!*************************************************!*\
  !*** ./src/modules/health/health.controller.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const prisma = new client_1.PrismaClient();
let HealthController = class HealthController {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async getHealth() {
        const databaseUrl = this.configService.get('DATABASE_URL');
        const timestamp = new Date().toISOString();
        const healthInfo = {
            status: 'ok',
            app: 'up',
            timestamp,
        };
        if (!databaseUrl) {
            healthInfo.status = 'degraded';
            healthInfo.env = 'missing_database_url';
            healthInfo.database = 'unknown';
            healthInfo.message = 'DATABASE_URL is not configured';
            return healthInfo;
        }
        try {
            await prisma.$queryRaw `SELECT 1`;
            healthInfo.env = 'loaded';
            healthInfo.database = 'up';
            return healthInfo;
        }
        catch (error) {
            healthInfo.status = 'degraded';
            healthInfo.env = 'loaded';
            healthInfo.database = 'down';
            healthInfo.message = 'Database connectivity check failed';
            healthInfo.error = process.env.NODE_ENV === 'development' ? error.message : undefined;
            return healthInfo;
        }
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], HealthController);


/***/ },

/***/ "./src/modules/health/health.module.ts"
/*!*********************************************!*\
  !*** ./src/modules/health/health.module.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const health_controller_1 = __webpack_require__(/*! ./health.controller */ "./src/modules/health/health.controller.ts");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        controllers: [health_controller_1.HealthController],
    })
], HealthModule);


/***/ },

/***/ "./src/modules/listings/dto/create-listing.dto.ts"
/*!********************************************************!*\
  !*** ./src/modules/listings/dto/create-listing.dto.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateListingDto = void 0;
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateListingDto {
    sellerType;
    storeProfileId;
    title;
    description;
    category;
    condition;
    price;
    location;
    status;
}
exports.CreateListingDto = CreateListingDto;
__decorate([
    (0, class_validator_1.IsEnum)(legacy_prisma_enums_1.SellerType),
    __metadata("design:type", typeof (_a = typeof legacy_prisma_enums_1.SellerType !== "undefined" && legacy_prisma_enums_1.SellerType) === "function" ? _a : Object)
], CreateListingDto.prototype, "sellerType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], CreateListingDto.prototype, "storeProfileId", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], CreateListingDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateListingDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateListingDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(legacy_prisma_enums_1.ListingCondition),
    __metadata("design:type", typeof (_b = typeof legacy_prisma_enums_1.ListingCondition !== "undefined" && legacy_prisma_enums_1.ListingCondition) === "function" ? _b : Object)
], CreateListingDto.prototype, "condition", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateListingDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], CreateListingDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(legacy_prisma_enums_1.ListingStatus),
    __metadata("design:type", typeof (_c = typeof legacy_prisma_enums_1.ListingStatus !== "undefined" && legacy_prisma_enums_1.ListingStatus) === "function" ? _c : Object)
], CreateListingDto.prototype, "status", void 0);


/***/ },

/***/ "./src/modules/listings/dto/list-listings-query.dto.ts"
/*!*************************************************************!*\
  !*** ./src/modules/listings/dto/list-listings-query.dto.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListListingsQueryDto = exports.ListingSort = void 0;
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var ListingSort;
(function (ListingSort) {
    ListingSort["LATEST"] = "latest";
    ListingSort["PRICE_ASC"] = "price_asc";
    ListingSort["PRICE_DESC"] = "price_desc";
})(ListingSort || (exports.ListingSort = ListingSort = {}));
class ListListingsQueryDto {
    q;
    category;
    condition;
    seller;
    sort = ListingSort.LATEST;
    page = 1;
    limit = 20;
}
exports.ListListingsQueryDto = ListListingsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], ListListingsQueryDto.prototype, "q", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], ListListingsQueryDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(legacy_prisma_enums_1.ListingCondition),
    __metadata("design:type", typeof (_a = typeof legacy_prisma_enums_1.ListingCondition !== "undefined" && legacy_prisma_enums_1.ListingCondition) === "function" ? _a : Object)
], ListListingsQueryDto.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim().toUpperCase()),
    (0, class_validator_1.IsEnum)(legacy_prisma_enums_1.SellerType),
    __metadata("design:type", typeof (_b = typeof legacy_prisma_enums_1.SellerType !== "undefined" && legacy_prisma_enums_1.SellerType) === "function" ? _b : Object)
], ListListingsQueryDto.prototype, "seller", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ListingSort),
    __metadata("design:type", String)
], ListListingsQueryDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListListingsQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListListingsQueryDto.prototype, "limit", void 0);


/***/ },

/***/ "./src/modules/listings/dto/update-listing.dto.ts"
/*!********************************************************!*\
  !*** ./src/modules/listings/dto/update-listing.dto.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateListingDto = void 0;
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateListingDto {
    title;
    description;
    category;
    condition;
    price;
    location;
    status;
}
exports.UpdateListingDto = UpdateListingDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], UpdateListingDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UpdateListingDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateListingDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(legacy_prisma_enums_1.ListingCondition),
    __metadata("design:type", typeof (_a = typeof legacy_prisma_enums_1.ListingCondition !== "undefined" && legacy_prisma_enums_1.ListingCondition) === "function" ? _a : Object)
], UpdateListingDto.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateListingDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], UpdateListingDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(legacy_prisma_enums_1.ListingStatus),
    __metadata("design:type", typeof (_b = typeof legacy_prisma_enums_1.ListingStatus !== "undefined" && legacy_prisma_enums_1.ListingStatus) === "function" ? _b : Object)
], UpdateListingDto.prototype, "status", void 0);


/***/ },

/***/ "./src/modules/listings/listings.controller.ts"
/*!*****************************************************!*\
  !*** ./src/modules/listings/listings.controller.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListingsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const create_listing_dto_1 = __webpack_require__(/*! ./dto/create-listing.dto */ "./src/modules/listings/dto/create-listing.dto.ts");
const list_listings_query_dto_1 = __webpack_require__(/*! ./dto/list-listings-query.dto */ "./src/modules/listings/dto/list-listings-query.dto.ts");
const update_listing_dto_1 = __webpack_require__(/*! ./dto/update-listing.dto */ "./src/modules/listings/dto/update-listing.dto.ts");
const listings_service_1 = __webpack_require__(/*! ./listings.service */ "./src/modules/listings/listings.service.ts");
let ListingsController = class ListingsController {
    listingsService;
    constructor(listingsService) {
        this.listingsService = listingsService;
    }
    list(query) {
        return this.listingsService.list(query);
    }
    getBySlug(slug) {
        return this.listingsService.getBySlug(slug);
    }
    create(req, dto) {
        return this.listingsService.create(req.user.sub, dto);
    }
    update(req, id, dto) {
        return this.listingsService.update(req.user.sub, id, dto);
    }
    archive(req, id) {
        return this.listingsService.archive(req.user.sub, id);
    }
};
exports.ListingsController = ListingsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof list_listings_query_dto_1.ListListingsQueryDto !== "undefined" && list_listings_query_dto_1.ListListingsQueryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "getBySlug", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof create_listing_dto_1.CreateListingDto !== "undefined" && create_listing_dto_1.CreateListingDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_d = typeof update_listing_dto_1.UpdateListingDto !== "undefined" && update_listing_dto_1.UpdateListingDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "archive", null);
exports.ListingsController = ListingsController = __decorate([
    (0, common_1.Controller)('listings'),
    __metadata("design:paramtypes", [typeof (_a = typeof listings_service_1.ListingsService !== "undefined" && listings_service_1.ListingsService) === "function" ? _a : Object])
], ListingsController);


/***/ },

/***/ "./src/modules/listings/listings.module.ts"
/*!*************************************************!*\
  !*** ./src/modules/listings/listings.module.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListingsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const listings_controller_1 = __webpack_require__(/*! ./listings.controller */ "./src/modules/listings/listings.controller.ts");
const listings_service_1 = __webpack_require__(/*! ./listings.service */ "./src/modules/listings/listings.service.ts");
let ListingsModule = class ListingsModule {
};
exports.ListingsModule = ListingsModule;
exports.ListingsModule = ListingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [listings_controller_1.ListingsController],
        providers: [listings_service_1.ListingsService],
    })
], ListingsModule);


/***/ },

/***/ "./src/modules/listings/listings.service.ts"
/*!**************************************************!*\
  !*** ./src/modules/listings/listings.service.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListingsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const list_listings_query_dto_1 = __webpack_require__(/*! ./dto/list-listings-query.dto */ "./src/modules/listings/dto/list-listings-query.dto.ts");
const prisma = new client_1.PrismaClient();
let ListingsService = class ListingsService {
    async list(query) {
        const where = {
            status: { not: legacy_prisma_enums_1.ListingStatus.ARCHIVED },
        };
        if (query.q) {
            where.OR = [
                { title: { contains: query.q, mode: 'insensitive' } },
                { description: { contains: query.q, mode: 'insensitive' } },
            ];
        }
        if (query.category) {
            where.category = {
                equals: query.category,
                mode: 'insensitive',
            };
        }
        if (query.condition) {
            where.condition = query.condition;
        }
        if (query.seller) {
            where.sellerType = query.seller;
        }
        let orderBy = { createdAt: 'desc' };
        if (query.sort === list_listings_query_dto_1.ListingSort.PRICE_ASC) {
            orderBy = { price: 'asc' };
        }
        if (query.sort === list_listings_query_dto_1.ListingSort.PRICE_DESC) {
            orderBy = { price: 'desc' };
        }
        const { page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const [listings, total] = await Promise.all([
            prisma.listing.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    images: { orderBy: { sortOrder: 'asc' } },
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            accountType: true,
                            verificationStatus: true,
                        },
                    },
                    storeProfile: {
                        select: {
                            id: true,
                            storeName: true,
                            slug: true,
                            isFeatured: true,
                            logoUrl: true,
                            bannerUrl: true,
                        },
                    },
                },
            }),
            prisma.listing.count({ where }),
        ]);
        return { listings, total };
    }
    async getBySlug(slug) {
        const listing = await prisma.listing.findUnique({
            where: { slug },
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        accountType: true,
                        verificationStatus: true,
                    },
                },
                storeProfile: {
                    select: {
                        id: true,
                        storeName: true,
                        slug: true,
                        description: true,
                        logoUrl: true,
                        bannerUrl: true,
                        isFeatured: true,
                    },
                },
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found.');
        }
        return listing;
    }
    async create(userId, dto) {
        if (dto.sellerType === legacy_prisma_enums_1.SellerType.STORE && !dto.storeProfileId) {
            throw new common_1.BadRequestException('storeProfileId is required for STORE listings.');
        }
        if (dto.sellerType === legacy_prisma_enums_1.SellerType.PERSONAL && dto.storeProfileId) {
            throw new common_1.BadRequestException('storeProfileId must be omitted for PERSONAL listings.');
        }
        if (dto.storeProfileId) {
            const storeProfile = await prisma.storeProfile.findUnique({
                where: { id: dto.storeProfileId },
            });
            if (!storeProfile) {
                throw new common_1.NotFoundException('Store profile not found.');
            }
            if (storeProfile.userId !== userId) {
                throw new common_1.ForbiddenException('You can only create listings for your own store profile.');
            }
        }
        const listing = await prisma.listing.create({
            data: {
                userId,
                storeProfileId: dto.storeProfileId ?? null,
                sellerType: dto.sellerType,
                title: dto.title,
                slug: await this.createUniqueSlug(dto.title),
                description: dto.description,
                category: dto.category,
                condition: dto.condition,
                price: dto.price,
                location: dto.location,
                status: dto.status ?? legacy_prisma_enums_1.ListingStatus.DRAFT,
            },
            include: {
                images: true,
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        accountType: true,
                        verificationStatus: true,
                    },
                },
                storeProfile: {
                    select: {
                        id: true,
                        storeName: true,
                        slug: true,
                        isFeatured: true,
                    },
                },
            },
        });
        return listing;
    }
    async update(userId, id, dto) {
        const listing = await prisma.listing.findUnique({ where: { id } });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found.');
        }
        if (listing.userId !== userId) {
            throw new common_1.ForbiddenException('You can only edit your own listings.');
        }
        const data = {
            title: dto.title,
            description: dto.description,
            category: dto.category,
            condition: dto.condition,
            price: dto.price,
            location: dto.location,
            status: dto.status,
        };
        if (dto.title && dto.title !== listing.title) {
            data.slug = await this.createUniqueSlug(dto.title, listing.id);
        }
        return prisma.listing.update({
            where: { id },
            data,
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        accountType: true,
                        verificationStatus: true,
                    },
                },
                storeProfile: {
                    select: {
                        id: true,
                        storeName: true,
                        slug: true,
                        isFeatured: true,
                        logoUrl: true,
                        bannerUrl: true,
                    },
                },
            },
        });
    }
    async archive(userId, id) {
        const listing = await prisma.listing.findUnique({ where: { id } });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found.');
        }
        if (listing.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own listings.');
        }
        return prisma.listing.update({
            where: { id },
            data: { status: legacy_prisma_enums_1.ListingStatus.ARCHIVED },
            select: {
                id: true,
                slug: true,
                status: true,
                updatedAt: true,
            },
        });
    }
    slugify(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    async createUniqueSlug(title, excludeId) {
        const base = this.slugify(title);
        if (!base) {
            throw new common_1.BadRequestException('Unable to create listing slug from title.');
        }
        let slug = base;
        let suffix = 1;
        while (true) {
            const existing = await prisma.listing.findFirst({
                where: {
                    slug,
                    ...(excludeId ? { id: { not: excludeId } } : {}),
                },
                select: { id: true },
            });
            if (!existing) {
                return slug;
            }
            suffix += 1;
            slug = `${base}-${suffix}`;
        }
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)()
], ListingsService);


/***/ },

/***/ "./src/modules/orders/dto/create-order.dto.ts"
/*!****************************************************!*\
  !*** ./src/modules/orders/dto/create-order.dto.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrderDto = exports.CheckoutPaymentMethod = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var CheckoutPaymentMethod;
(function (CheckoutPaymentMethod) {
    CheckoutPaymentMethod["COD"] = "COD";
    CheckoutPaymentMethod["BKASH"] = "BKASH";
})(CheckoutPaymentMethod || (exports.CheckoutPaymentMethod = CheckoutPaymentMethod = {}));
class CreateOrderDto {
    paymentMethod;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsEnum)(CheckoutPaymentMethod),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paymentMethod", void 0);


/***/ },

/***/ "./src/modules/orders/orders.controller.ts"
/*!*************************************************!*\
  !*** ./src/modules/orders/orders.controller.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrdersController_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreOrdersController = exports.OrdersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const deprecation_1 = __webpack_require__(/*! ../../common/http/deprecation */ "./src/common/http/deprecation.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const create_order_dto_1 = __webpack_require__(/*! ./dto/create-order.dto */ "./src/modules/orders/dto/create-order.dto.ts");
const orders_service_1 = __webpack_require__(/*! ./orders.service */ "./src/modules/orders/orders.service.ts");
let OrdersController = OrdersController_1 = class OrdersController {
    ordersService;
    logger = new common_1.Logger(OrdersController_1.name);
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(req, dto) {
        return this.ordersService.createFromCart(req.user.sub, dto);
    }
    listMyOrders(req) {
        return this.ordersService.listMyOrders(req.user.sub);
    }
    listMyOrdersAlias(req, res) {
        (0, deprecation_1.markDeprecatedRoute)({
            canonicalPath: '/api/orders',
            logger: this.logger,
            req,
            res,
        });
        return this.ordersService.listMyOrders(req.user.sub);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _b : Object, typeof (_c = typeof create_order_dto_1.CreateOrderDto !== "undefined" && create_order_dto_1.CreateOrderDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "listMyOrders", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "listMyOrdersAlias", null);
exports.OrdersController = OrdersController = OrdersController_1 = __decorate([
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _a : Object])
], OrdersController);
let StoreOrdersController = class StoreOrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    listStoreOrders(req) {
        return this.ordersService.listStoreOrders(req.user.sub);
    }
};
exports.StoreOrdersController = StoreOrdersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], StoreOrdersController.prototype, "listStoreOrders", null);
exports.StoreOrdersController = StoreOrdersController = __decorate([
    (0, common_1.Controller)('stores/me/orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_f = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _f : Object])
], StoreOrdersController);


/***/ },

/***/ "./src/modules/orders/orders.module.ts"
/*!*********************************************!*\
  !*** ./src/modules/orders/orders.module.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const orders_controller_1 = __webpack_require__(/*! ./orders.controller */ "./src/modules/orders/orders.controller.ts");
const orders_service_1 = __webpack_require__(/*! ./orders.service */ "./src/modules/orders/orders.service.ts");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        controllers: [orders_controller_1.OrdersController, orders_controller_1.StoreOrdersController],
        providers: [orders_service_1.OrdersService],
    })
], OrdersModule);


/***/ },

/***/ "./src/modules/orders/orders.service.ts"
/*!**********************************************!*\
  !*** ./src/modules/orders/orders.service.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const create_order_dto_1 = __webpack_require__(/*! ./dto/create-order.dto */ "./src/modules/orders/dto/create-order.dto.ts");
const prisma = new client_1.PrismaClient();
let OrdersService = class OrdersService {
    async createFromCart(userId, dto) {
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        listing: {
                            select: {
                                id: true,
                                storeProfileId: true,
                                sellerType: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        });
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty.');
        }
        const storeGroups = new Map();
        for (const item of cart.items) {
            if (!item.listing.storeProfileId) {
                throw new common_1.BadRequestException('Cart contains non-store listing, cannot create order.');
            }
            const storeProfileId = item.listing.storeProfileId;
            if (!storeGroups.has(storeProfileId)) {
                storeGroups.set(storeProfileId, []);
            }
            storeGroups.get(storeProfileId)?.push({
                itemId: item.id,
                listingId: item.listingId,
                quantity: item.quantity,
                unitPrice: Number(item.unitPrice),
            });
        }
        const paymentMethod = this.mapPaymentMethod(dto.paymentMethod);
        const createdOrders = await prisma.$transaction(async (tx) => {
            const orders = [];
            for (const [storeProfileId, items] of storeGroups.entries()) {
                const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
                const total = subtotal;
                const order = await tx.order.create({
                    data: {
                        userId,
                        storeProfileId,
                        paymentMethod,
                        status: legacy_prisma_enums_1.OrderStatus.PENDING,
                        subtotal: subtotal.toFixed(2),
                        total: total.toFixed(2),
                        items: {
                            create: items.map((item) => ({
                                listingId: item.listingId,
                                quantity: item.quantity,
                                unitPrice: item.unitPrice.toFixed(2),
                            })),
                        },
                    },
                    include: {
                        storeProfile: {
                            select: {
                                id: true,
                                storeName: true,
                                slug: true,
                                logoUrl: true,
                                isFeatured: true,
                            },
                        },
                        items: {
                            include: {
                                listing: {
                                    include: {
                                        images: { orderBy: { sortOrder: 'asc' } },
                                    },
                                },
                            },
                        },
                    },
                });
                orders.push(order);
            }
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
            return orders;
        });
        return {
            message: 'Order created successfully.',
            orders: createdOrders,
            summary: {
                orderCount: createdOrders.length,
            },
        };
    }
    async listMyOrders(userId) {
        return prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                storeProfile: {
                    select: {
                        id: true,
                        storeName: true,
                        slug: true,
                        logoUrl: true,
                        isFeatured: true,
                    },
                },
                items: {
                    include: {
                        listing: {
                            include: {
                                images: { orderBy: { sortOrder: 'asc' } },
                            },
                        },
                    },
                },
            },
        });
    }
    async listStoreOrders(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                accountType: true,
                storeProfile: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        if (user.accountType !== legacy_prisma_enums_1.AccountType.STORE) {
            throw new common_1.ForbiddenException('Only STORE accounts can access this endpoint.');
        }
        if (!user.storeProfile) {
            throw new common_1.NotFoundException('Store profile not found for this account.');
        }
        return prisma.order.findMany({
            where: {
                storeProfileId: user.storeProfile.id,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        verificationStatus: true,
                    },
                },
                items: {
                    include: {
                        listing: {
                            include: {
                                images: { orderBy: { sortOrder: 'asc' } },
                            },
                        },
                    },
                },
            },
        });
    }
    mapPaymentMethod(method) {
        if (method === create_order_dto_1.CheckoutPaymentMethod.COD) {
            return legacy_prisma_enums_1.PaymentMethod.CASH_ON_DELIVERY;
        }
        return legacy_prisma_enums_1.PaymentMethod.ONLINE_PAYMENT;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);


/***/ },

/***/ "./src/modules/ratings/dto/create-rating.dto.ts"
/*!******************************************************!*\
  !*** ./src/modules/ratings/dto/create-rating.dto.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRatingDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateRatingDto {
    value;
    comment;
}
exports.CreateRatingDto = CreateRatingDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateRatingDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateRatingDto.prototype, "comment", void 0);


/***/ },

/***/ "./src/modules/ratings/ratings.controller.ts"
/*!***************************************************!*\
  !*** ./src/modules/ratings/ratings.controller.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const create_rating_dto_1 = __webpack_require__(/*! ./dto/create-rating.dto */ "./src/modules/ratings/dto/create-rating.dto.ts");
const ratings_service_1 = __webpack_require__(/*! ./ratings.service */ "./src/modules/ratings/ratings.service.ts");
let RatingsController = class RatingsController {
    ratingsService;
    constructor(ratingsService) {
        this.ratingsService = ratingsService;
    }
    getListingRatings(listingId) {
        return this.ratingsService.getListingRatings(listingId);
    }
    getUserRating(req, listingId) {
        return this.ratingsService.getUserRating(req.user.sub, listingId);
    }
    createOrUpdateRating(req, listingId, dto) {
        return this.ratingsService.createOrUpdateRating(req.user.sub, listingId, dto);
    }
};
exports.RatingsController = RatingsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getListingRatings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _b : Object, String]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getUserRating", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof AuthenticatedRequest !== "undefined" && AuthenticatedRequest) === "function" ? _c : Object, String, typeof (_d = typeof create_rating_dto_1.CreateRatingDto !== "undefined" && create_rating_dto_1.CreateRatingDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "createOrUpdateRating", null);
exports.RatingsController = RatingsController = __decorate([
    (0, common_1.Controller)('listings/:listingId/ratings'),
    __metadata("design:paramtypes", [typeof (_a = typeof ratings_service_1.RatingsService !== "undefined" && ratings_service_1.RatingsService) === "function" ? _a : Object])
], RatingsController);


/***/ },

/***/ "./src/modules/ratings/ratings.module.ts"
/*!***********************************************!*\
  !*** ./src/modules/ratings/ratings.module.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ratings_controller_1 = __webpack_require__(/*! ./ratings.controller */ "./src/modules/ratings/ratings.controller.ts");
const ratings_service_1 = __webpack_require__(/*! ./ratings.service */ "./src/modules/ratings/ratings.service.ts");
let RatingsModule = class RatingsModule {
};
exports.RatingsModule = RatingsModule;
exports.RatingsModule = RatingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [ratings_controller_1.RatingsController],
        providers: [ratings_service_1.RatingsService],
    })
], RatingsModule);


/***/ },

/***/ "./src/modules/ratings/ratings.service.ts"
/*!************************************************!*\
  !*** ./src/modules/ratings/ratings.service.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const prisma = new client_1.PrismaClient();
let RatingsService = class RatingsService {
    async getListingRatings(listingId) {
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
            select: { id: true },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found.');
        }
        const ratings = await prisma.rating.findMany({
            where: { listingId },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
            },
        });
        const count = ratings.length;
        const average = count > 0
            ? Math.round((ratings.reduce((sum, r) => sum + r.value, 0) /
                count) *
                10) / 10
            : null;
        return { ratings, average, count };
    }
    async getUserRating(userId, listingId) {
        return prisma.rating.findUnique({
            where: {
                userId_listingId: {
                    userId,
                    listingId,
                },
            },
        });
    }
    async createOrUpdateRating(userId, listingId, dto) {
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
            select: { id: true },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found.');
        }
        const rating = await prisma.rating.upsert({
            where: {
                userId_listingId: {
                    userId,
                    listingId,
                },
            },
            update: {
                value: dto.value,
                comment: dto.comment ?? null,
            },
            create: {
                userId,
                listingId,
                value: dto.value,
                comment: dto.comment ?? null,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
            },
        });
        return rating;
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)()
], RatingsService);


/***/ },

/***/ "./src/modules/search/dto/search-query.dto.ts"
/*!****************************************************!*\
  !*** ./src/modules/search/dto/search-query.dto.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchQueryDto = exports.SearchSort = void 0;
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var SearchSort;
(function (SearchSort) {
    SearchSort["LATEST"] = "latest";
    SearchSort["PRICE_ASC"] = "price_asc";
    SearchSort["PRICE_DESC"] = "price_desc";
})(SearchSort || (exports.SearchSort = SearchSort = {}));
class SearchQueryDto {
    q;
    category;
    condition;
    sort = SearchSort.LATEST;
}
exports.SearchQueryDto = SearchQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "q", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(legacy_prisma_enums_1.ListingCondition),
    __metadata("design:type", typeof (_a = typeof legacy_prisma_enums_1.ListingCondition !== "undefined" && legacy_prisma_enums_1.ListingCondition) === "function" ? _a : Object)
], SearchQueryDto.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SearchSort),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "sort", void 0);


/***/ },

/***/ "./src/modules/search/search.controller.ts"
/*!*************************************************!*\
  !*** ./src/modules/search/search.controller.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const search_query_dto_1 = __webpack_require__(/*! ./dto/search-query.dto */ "./src/modules/search/dto/search-query.dto.ts");
const search_service_1 = __webpack_require__(/*! ./search.service */ "./src/modules/search/search.service.ts");
let SearchController = class SearchController {
    searchService;
    constructor(searchService) {
        this.searchService = searchService;
    }
    search(query) {
        return this.searchService.search(query);
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof search_query_dto_1.SearchQueryDto !== "undefined" && search_query_dto_1.SearchQueryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "search", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [typeof (_a = typeof search_service_1.SearchService !== "undefined" && search_service_1.SearchService) === "function" ? _a : Object])
], SearchController);


/***/ },

/***/ "./src/modules/search/search.module.ts"
/*!*********************************************!*\
  !*** ./src/modules/search/search.module.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const search_controller_1 = __webpack_require__(/*! ./search.controller */ "./src/modules/search/search.controller.ts");
const search_service_1 = __webpack_require__(/*! ./search.service */ "./src/modules/search/search.service.ts");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        controllers: [search_controller_1.SearchController],
        providers: [search_service_1.SearchService],
    })
], SearchModule);


/***/ },

/***/ "./src/modules/search/search.service.ts"
/*!**********************************************!*\
  !*** ./src/modules/search/search.service.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const search_query_dto_1 = __webpack_require__(/*! ./dto/search-query.dto */ "./src/modules/search/dto/search-query.dto.ts");
const prisma = new client_1.PrismaClient();
let SearchService = class SearchService {
    async search(query) {
        const where = {
            status: legacy_prisma_enums_1.ListingStatus.PUBLISHED,
        };
        if (query.q) {
            where.OR = [
                { title: { contains: query.q, mode: 'insensitive' } },
                { category: { contains: query.q, mode: 'insensitive' } },
                { location: { contains: query.q, mode: 'insensitive' } },
                { user: { fullName: { contains: query.q, mode: 'insensitive' } } },
                {
                    storeProfile: {
                        is: {
                            storeName: { contains: query.q, mode: 'insensitive' },
                        },
                    },
                },
            ];
        }
        if (query.category) {
            where.category = {
                equals: query.category,
                mode: 'insensitive',
            };
        }
        if (query.condition) {
            where.condition = query.condition;
        }
        let orderBy = { createdAt: 'desc' };
        if (query.sort === search_query_dto_1.SearchSort.PRICE_ASC) {
            orderBy = { price: 'asc' };
        }
        if (query.sort === search_query_dto_1.SearchSort.PRICE_DESC) {
            orderBy = { price: 'desc' };
        }
        return prisma.listing.findMany({
            where,
            orderBy,
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        accountType: true,
                        verificationStatus: true,
                    },
                },
                storeProfile: {
                    select: {
                        id: true,
                        storeName: true,
                        slug: true,
                        isFeatured: true,
                        logoUrl: true,
                    },
                },
            },
        });
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)()
], SearchService);


/***/ },

/***/ "./src/modules/stores/dto/update-store.dto.ts"
/*!****************************************************!*\
  !*** ./src/modules/stores/dto/update-store.dto.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStoreDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateStoreDto {
    storeName;
    description;
    phone;
    whatsapp;
    logoUrl;
    bannerUrl;
}
exports.UpdateStoreDto = UpdateStoreDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "storeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "whatsapp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "logoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "bannerUrl", void 0);


/***/ },

/***/ "./src/modules/stores/stores.controller.ts"
/*!*************************************************!*\
  !*** ./src/modules/stores/stores.controller.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoresController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const update_store_dto_1 = __webpack_require__(/*! ./dto/update-store.dto */ "./src/modules/stores/dto/update-store.dto.ts");
const stores_service_1 = __webpack_require__(/*! ./stores.service */ "./src/modules/stores/stores.service.ts");
let StoresController = class StoresController {
    storesService;
    constructor(storesService) {
        this.storesService = storesService;
    }
    getDashboard(req) {
        return this.storesService.getDashboard(req.user.sub);
    }
    updateMe(req, dto) {
        return this.storesService.updateMe(req.user.sub, dto);
    }
    getPublicStore(slug) {
        return this.storesService.getPublicStore(slug);
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/dashboard'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof update_store_dto_1.UpdateStoreDto !== "undefined" && update_store_dto_1.UpdateStoreDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "getPublicStore", null);
exports.StoresController = StoresController = __decorate([
    (0, common_1.Controller)('stores'),
    __metadata("design:paramtypes", [typeof (_a = typeof stores_service_1.StoresService !== "undefined" && stores_service_1.StoresService) === "function" ? _a : Object])
], StoresController);


/***/ },

/***/ "./src/modules/stores/stores.module.ts"
/*!*********************************************!*\
  !*** ./src/modules/stores/stores.module.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoresModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const stores_controller_1 = __webpack_require__(/*! ./stores.controller */ "./src/modules/stores/stores.controller.ts");
const stores_service_1 = __webpack_require__(/*! ./stores.service */ "./src/modules/stores/stores.service.ts");
let StoresModule = class StoresModule {
};
exports.StoresModule = StoresModule;
exports.StoresModule = StoresModule = __decorate([
    (0, common_1.Module)({
        controllers: [stores_controller_1.StoresController],
        providers: [stores_service_1.StoresService],
    })
], StoresModule);


/***/ },

/***/ "./src/modules/stores/stores.service.ts"
/*!**********************************************!*\
  !*** ./src/modules/stores/stores.service.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoresService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const prisma = new client_1.PrismaClient();
let StoresService = class StoresService {
    async getPublicStore(slug) {
        const storeProfile = await prisma.storeProfile.findUnique({
            where: { slug },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        accountType: true,
                        verificationStatus: true,
                    },
                },
            },
        });
        if (!storeProfile) {
            throw new common_1.NotFoundException('Store not found.');
        }
        const listings = await prisma.listing.findMany({
            where: {
                storeProfileId: storeProfile.id,
                status: legacy_prisma_enums_1.ListingStatus.PUBLISHED,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
            },
        });
        return {
            store: {
                id: storeProfile.id,
                slug: storeProfile.slug,
                storeName: storeProfile.storeName,
                description: storeProfile.description,
                phone: storeProfile.phone,
                whatsapp: storeProfile.whatsapp,
                logoUrl: storeProfile.logoUrl,
                bannerUrl: storeProfile.bannerUrl,
                isFeatured: storeProfile.isFeatured,
                createdAt: storeProfile.createdAt,
                owner: storeProfile.user,
            },
            listings,
            summary: {
                listingCount: listings.length,
            },
        };
    }
    async getDashboard(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                accountType: true,
                storeProfile: {
                    select: {
                        id: true,
                        slug: true,
                        storeName: true,
                        description: true,
                        phone: true,
                        whatsapp: true,
                        logoUrl: true,
                        bannerUrl: true,
                        isFeatured: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        if (user.accountType !== legacy_prisma_enums_1.AccountType.STORE) {
            throw new common_1.ForbiddenException('Only STORE accounts can access this endpoint.');
        }
        if (!user.storeProfile) {
            throw new common_1.NotFoundException('Store profile not found for this account.');
        }
        const [productCount, orderCount, latestListings] = await Promise.all([
            prisma.listing.count({
                where: {
                    storeProfileId: user.storeProfile.id,
                    status: { not: legacy_prisma_enums_1.ListingStatus.ARCHIVED },
                },
            }),
            prisma.order.count({
                where: {
                    storeProfileId: user.storeProfile.id,
                },
            }),
            prisma.listing.findMany({
                where: { storeProfileId: user.storeProfile.id },
                orderBy: { createdAt: 'desc' },
                take: 8,
                include: {
                    images: { orderBy: { sortOrder: 'asc' } },
                },
            }),
        ]);
        return {
            storeProfile: user.storeProfile,
            productCount,
            orderCount,
            latestListings,
            summary: {
                latestListingCount: latestListings.length,
            },
        };
    }
    async updateMe(userId, dto) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                accountType: true,
                storeProfile: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        if (user.accountType !== legacy_prisma_enums_1.AccountType.STORE) {
            throw new common_1.ForbiddenException('Only STORE accounts can access this endpoint.');
        }
        if (!user.storeProfile) {
            throw new common_1.NotFoundException('Store profile not found for this account.');
        }
        return prisma.storeProfile.update({
            where: { id: user.storeProfile.id },
            data: {
                storeName: dto.storeName,
                description: dto.description,
                phone: dto.phone,
                whatsapp: dto.whatsapp,
                logoUrl: dto.logoUrl,
                bannerUrl: dto.bannerUrl,
            },
            select: {
                id: true,
                userId: true,
                storeName: true,
                slug: true,
                description: true,
                phone: true,
                whatsapp: true,
                logoUrl: true,
                bannerUrl: true,
                isFeatured: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)()
], StoresService);


/***/ },

/***/ "./src/modules/users/users.controller.ts"
/*!***********************************************!*\
  !*** ./src/modules/users/users.controller.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/modules/users/users.service.ts");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getMyListings(req) {
        return this.usersService.getMyListings(req.user.sub);
    }
    getMyListingById(req, id) {
        return this.usersService.getMyListingById(req.user.sub, id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/listings'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyListings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/listings/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyListingById", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ },

/***/ "./src/modules/users/users.module.ts"
/*!*******************************************!*\
  !*** ./src/modules/users/users.module.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./src/modules/users/users.controller.ts");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/modules/users/users.service.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);


/***/ },

/***/ "./src/modules/users/users.service.ts"
/*!********************************************!*\
  !*** ./src/modules/users/users.service.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const prisma = new client_1.PrismaClient();
let UsersService = class UsersService {
    async getMyListings(userId) {
        return prisma.listing.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        accountType: true,
                        verificationStatus: true,
                    },
                },
                storeProfile: {
                    select: {
                        id: true,
                        storeName: true,
                        slug: true,
                        isFeatured: true,
                        logoUrl: true,
                        bannerUrl: true,
                    },
                },
            },
        });
    }
    async getMyListingById(userId, listingId) {
        const listing = await prisma.listing.findFirst({
            where: {
                id: listingId,
                userId,
            },
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        accountType: true,
                        verificationStatus: true,
                    },
                },
                storeProfile: {
                    select: {
                        id: true,
                        storeName: true,
                        slug: true,
                        isFeatured: true,
                        logoUrl: true,
                        bannerUrl: true,
                    },
                },
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found.');
        }
        return listing;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);


/***/ },

/***/ "./src/modules/verification/dto/confirm-verification.dto.ts"
/*!******************************************************************!*\
  !*** ./src/modules/verification/dto/confirm-verification.dto.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmVerificationDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ConfirmVerificationDto {
    verificationEmail;
    otp;
}
exports.ConfirmVerificationDto = ConfirmVerificationDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim().toLowerCase()),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ConfirmVerificationDto.prototype, "verificationEmail", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'otp must be a 6-digit numeric code' }),
    __metadata("design:type", String)
], ConfirmVerificationDto.prototype, "otp", void 0);


/***/ },

/***/ "./src/modules/verification/dto/request-verification.dto.ts"
/*!******************************************************************!*\
  !*** ./src/modules/verification/dto/request-verification.dto.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestVerificationDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RequestVerificationDto {
    verificationEmail;
}
exports.RequestVerificationDto = RequestVerificationDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim().toLowerCase()),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RequestVerificationDto.prototype, "verificationEmail", void 0);


/***/ },

/***/ "./src/modules/verification/verification-email.service.ts"
/*!****************************************************************!*\
  !*** ./src/modules/verification/verification-email.service.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerificationEmailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const nodemailer_1 = __importDefault(__webpack_require__(/*! nodemailer */ "nodemailer"));
let VerificationEmailService = class VerificationEmailService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async sendOtp(email, otp, expiresAt) {
        const host = this.configService.get('SMTP_HOST')?.trim();
        const user = this.configService.get('SMTP_USER')?.trim();
        const password = this.configService.get('SMTP_PASSWORD');
        const from = this.configService.get('SMTP_FROM')?.trim();
        if (!host || !user || !password || !from) {
            throw new common_1.ServiceUnavailableException('Email verification is temporarily unavailable. Please try again later.');
        }
        const port = Number(this.configService.get('SMTP_PORT') ?? '587');
        const secure = this.configService.get('SMTP_SECURE') === 'true';
        if (!Number.isInteger(port) || port < 1 || port > 65535) {
            throw new common_1.ServiceUnavailableException('Email verification is temporarily unavailable. Please try again later.');
        }
        const transporter = nodemailer_1.default.createTransport({
            host,
            port,
            secure,
            auth: { user, pass: password },
        });
        try {
            await transporter.sendMail({
                from,
                to: email,
                subject: 'Your DIUPoint verification code',
                text: `Your DIUPoint verification code is ${otp}. It expires at ${expiresAt.toISOString()}. Do not share this code.`,
            });
        }
        catch {
            throw new common_1.ServiceUnavailableException('Email verification is temporarily unavailable. Please try again later.');
        }
    }
};
exports.VerificationEmailService = VerificationEmailService;
exports.VerificationEmailService = VerificationEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], VerificationEmailService);


/***/ },

/***/ "./src/modules/verification/verification.controller.ts"
/*!*************************************************************!*\
  !*** ./src/modules/verification/verification.controller.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerificationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const confirm_verification_dto_1 = __webpack_require__(/*! ./dto/confirm-verification.dto */ "./src/modules/verification/dto/confirm-verification.dto.ts");
const request_verification_dto_1 = __webpack_require__(/*! ./dto/request-verification.dto */ "./src/modules/verification/dto/request-verification.dto.ts");
const verification_service_1 = __webpack_require__(/*! ./verification.service */ "./src/modules/verification/verification.service.ts");
let VerificationController = class VerificationController {
    verificationService;
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    requestVerification(req, dto) {
        return this.verificationService.requestVerification(req.user.sub, dto);
    }
    confirmVerification(dto) {
        return this.verificationService.confirmVerification(dto);
    }
};
exports.VerificationController = VerificationController;
__decorate([
    (0, common_1.Post)('request'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof request_verification_dto_1.RequestVerificationDto !== "undefined" && request_verification_dto_1.RequestVerificationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], VerificationController.prototype, "requestVerification", null);
__decorate([
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof confirm_verification_dto_1.ConfirmVerificationDto !== "undefined" && confirm_verification_dto_1.ConfirmVerificationDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], VerificationController.prototype, "confirmVerification", null);
exports.VerificationController = VerificationController = __decorate([
    (0, common_1.Controller)('verification'),
    __metadata("design:paramtypes", [typeof (_a = typeof verification_service_1.VerificationService !== "undefined" && verification_service_1.VerificationService) === "function" ? _a : Object])
], VerificationController);


/***/ },

/***/ "./src/modules/verification/verification.module.ts"
/*!*********************************************************!*\
  !*** ./src/modules/verification/verification.module.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerificationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const verification_controller_1 = __webpack_require__(/*! ./verification.controller */ "./src/modules/verification/verification.controller.ts");
const verification_email_service_1 = __webpack_require__(/*! ./verification-email.service */ "./src/modules/verification/verification-email.service.ts");
const verification_service_1 = __webpack_require__(/*! ./verification.service */ "./src/modules/verification/verification.service.ts");
let VerificationModule = class VerificationModule {
};
exports.VerificationModule = VerificationModule;
exports.VerificationModule = VerificationModule = __decorate([
    (0, common_1.Module)({
        controllers: [verification_controller_1.VerificationController],
        providers: [verification_service_1.VerificationService, verification_email_service_1.VerificationEmailService],
        exports: [verification_service_1.VerificationService],
    })
], VerificationModule);


/***/ },

/***/ "./src/modules/verification/verification.service.ts"
/*!**********************************************************!*\
  !*** ./src/modules/verification/verification.service.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerificationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const node_crypto_1 = __webpack_require__(/*! node:crypto */ "node:crypto");
const legacy_prisma_enums_1 = __webpack_require__(/*! ../../common/legacy-prisma-enums */ "./src/common/legacy-prisma-enums.ts");
const diu_email_1 = __webpack_require__(/*! ../auth/diu-email */ "./src/modules/auth/diu-email.ts");
const password_hasher_1 = __webpack_require__(/*! ../auth/password-hasher */ "./src/modules/auth/password-hasher.ts");
const verification_email_service_1 = __webpack_require__(/*! ./verification-email.service */ "./src/modules/verification/verification-email.service.ts");
const prisma = new client_1.PrismaClient();
const OTP_EXPIRY_MINUTES = 10;
let VerificationService = class VerificationService {
    verificationEmailService;
    constructor(verificationEmailService) {
        this.verificationEmailService = verificationEmailService;
    }
    async requestVerification(userId, dto) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const verificationEmail = (0, diu_email_1.normalizeEmail)(dto.verificationEmail);
        if (verificationEmail !== user.email) {
            throw new common_1.BadRequestException('Verification must use the email address registered to this account.');
        }
        return this.issueVerificationOtp(user.id, user.email);
    }
    async issueVerificationOtp(userId, verificationEmail) {
        const normalizedEmail = (0, diu_email_1.normalizeEmail)(verificationEmail);
        this.assertDiuEmail(normalizedEmail);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                verificationStatus: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        if (user.email !== normalizedEmail) {
            throw new common_1.BadRequestException('Verification must use the email address registered to this account.');
        }
        if (user.verificationStatus === legacy_prisma_enums_1.VerificationStatus.VERIFIED) {
            throw new common_1.BadRequestException('Account is already verified.');
        }
        const otp = this.generateOtp();
        const otpCodeHash = await (0, password_hasher_1.hashPassword)(otp);
        const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
        await prisma.$transaction([
            prisma.verificationRequest.updateMany({
                where: {
                    userId,
                    status: legacy_prisma_enums_1.VerificationRequestStatus.PENDING,
                },
                data: {
                    status: legacy_prisma_enums_1.VerificationRequestStatus.CANCELLED,
                },
            }),
            prisma.verificationRequest.create({
                data: {
                    userId,
                    verificationEmail: normalizedEmail,
                    otpCodeHash,
                    expiresAt,
                    status: legacy_prisma_enums_1.VerificationRequestStatus.PENDING,
                },
            }),
        ]);
        await this.verificationEmailService.sendOtp(normalizedEmail, otp, expiresAt);
        return {
            message: 'Verification OTP sent successfully.',
            verificationEmail: normalizedEmail,
            expiresAt,
        };
    }
    async confirmVerification(dto) {
        const verificationEmail = (0, diu_email_1.normalizeEmail)(dto.verificationEmail);
        this.assertDiuEmail(verificationEmail);
        const now = new Date();
        const verificationRequest = await prisma.verificationRequest.findFirst({
            where: {
                verificationEmail,
                status: legacy_prisma_enums_1.VerificationRequestStatus.PENDING,
                expiresAt: { gt: now },
            },
            orderBy: { createdAt: 'desc' },
        });
        if (!verificationRequest) {
            throw new common_1.BadRequestException('No valid verification request found.');
        }
        const isOtpValid = await (0, password_hasher_1.comparePassword)(dto.otp, verificationRequest.otpCodeHash);
        if (!isOtpValid) {
            throw new common_1.BadRequestException('Invalid OTP code.');
        }
        const [updatedUser] = await prisma.$transaction([
            prisma.user.update({
                where: { id: verificationRequest.userId },
                data: {
                    verificationStatus: legacy_prisma_enums_1.VerificationStatus.VERIFIED,
                    verifiedAt: now,
                },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    accountType: true,
                    verificationStatus: true,
                    verifiedAt: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            prisma.verificationRequest.update({
                where: { id: verificationRequest.id },
                data: { status: legacy_prisma_enums_1.VerificationRequestStatus.VERIFIED },
            }),
            prisma.verificationRequest.updateMany({
                where: {
                    userId: verificationRequest.userId,
                    verificationEmail,
                    status: legacy_prisma_enums_1.VerificationRequestStatus.PENDING,
                    id: { not: verificationRequest.id },
                },
                data: {
                    status: legacy_prisma_enums_1.VerificationRequestStatus.CANCELLED,
                },
            }),
        ]);
        return {
            message: 'Account verification completed successfully.',
            user: updatedUser,
        };
    }
    assertDiuEmail(email) {
        if (!(0, diu_email_1.isDiuEmail)(email)) {
            throw new common_1.BadRequestException('Only official DIU student email addresses are allowed for verification.');
        }
    }
    generateOtp() {
        return (0, node_crypto_1.randomInt)(100000, 1000000).toString();
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof verification_email_service_1.VerificationEmailService !== "undefined" && verification_email_service_1.VerificationEmailService) === "function" ? _a : Object])
], VerificationService);


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

/***/ },

/***/ "@prisma/client"
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
(module) {

module.exports = require("@prisma/client");

/***/ },

/***/ "bcrypt"
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
(module) {

module.exports = require("bcrypt");

/***/ },

/***/ "bcryptjs"
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
(module) {

module.exports = require("bcryptjs");

/***/ },

/***/ "class-transformer"
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
(module) {

module.exports = require("class-transformer");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "node:crypto"
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
(module) {

module.exports = require("node:crypto");

/***/ },

/***/ "node:path"
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
(module) {

module.exports = require("node:path");

/***/ },

/***/ "nodemailer"
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
(module) {

module.exports = require("nodemailer");

/***/ },

/***/ "passport-google-oauth20"
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
(module) {

module.exports = require("passport-google-oauth20");

/***/ },

/***/ "passport-jwt"
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
(module) {

module.exports = require("passport-jwt");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const api_exception_filter_1 = __webpack_require__(/*! ./common/filters/api-exception.filter */ "./src/common/filters/api-exception.filter.ts");
const api_logging_middleware_1 = __webpack_require__(/*! ./common/middleware/api-logging.middleware */ "./src/common/middleware/api-logging.middleware.ts");
const request_context_middleware_1 = __webpack_require__(/*! ./common/middleware/request-context.middleware */ "./src/common/middleware/request-context.middleware.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(request_context_middleware_1.requestContextMiddleware);
    app.use(api_logging_middleware_1.apiLoggingMiddleware);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new api_exception_filter_1.ApiExceptionFilter());
    app.setGlobalPrefix('api');
    const configService = app.get(config_1.ConfigService);
    const port = Number(process.env.PORT ?? configService.get('PORT') ?? '4000');
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
    console.error('💥 Application failed to start:', err);
    process.exit(1);
});

})();

/******/ })()
;