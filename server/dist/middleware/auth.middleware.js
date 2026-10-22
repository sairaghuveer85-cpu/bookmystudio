"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.optionalAuth = optionalAuth;
exports.requireRole = requireRole;
exports.requireVerified = requireVerified;
const user_model_1 = require("../models/user.model");
async function requireAuth(req, res, next) {
    const userId = req.session?.userId;
    if (!userId) {
        res.status(401).json({
            success: false,
            error: 'Authentication required. Please sign in to continue.',
            code: 'UNAUTHENTICATED',
        });
        return;
    }
    try {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            // Session exists but user was removed from DB
            req.session.destroy(() => { });
            res.status(401).json({
                success: false,
                error: 'Session invalid or user account no longer exists.',
                code: 'USER_NOT_FOUND',
            });
            return;
        }
        if (user.accountStatus === 'SUSPENDED') {
            res.status(403).json({
                success: false,
                error: 'Your production account has been suspended. Please contact support.',
                code: 'ACCOUNT_SUSPENDED',
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
}
async function optionalAuth(req, _res, next) {
    const userId = req.session?.userId;
    if (!userId) {
        return next();
    }
    try {
        const user = await user_model_1.User.findById(userId);
        if (user && user.accountStatus !== 'SUSPENDED') {
            req.user = user;
        }
    }
    catch {
        // Silently continue for optional auth
    }
    next();
}
function requireRole(...permittedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: 'Authentication required.',
                code: 'UNAUTHENTICATED',
            });
            return;
        }
        // ADMIN has universal access
        if (req.user.roles.includes('ADMIN')) {
            return next();
        }
        const hasRole = permittedRoles.some((role) => req.user?.roles.includes(role));
        if (!hasRole) {
            res.status(403).json({
                success: false,
                error: `Forbidden: Action requires one of the following permissions: [${permittedRoles.join(', ')}].`,
                code: 'INSUFFICIENT_PERMISSIONS',
            });
            return;
        }
        next();
    };
}
function requireVerified(req, res, next) {
    if (!req.user) {
        res.status(401).json({
            success: false,
            error: 'Authentication required.',
            code: 'UNAUTHENTICATED',
        });
        return;
    }
    if (!req.user.isVerified) {
        res.status(403).json({
            success: false,
            error: 'Account email verification required to complete this action.',
            code: 'UNVERIFIED_EMAIL',
        });
        return;
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map