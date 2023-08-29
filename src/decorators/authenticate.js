// Декоратор для проверки аутентификации
function authenticate(req, res, next) { 
    if (req.user) { // проверяем ответ 
        next(); // Пользователь аутентифицирован, переходим к следующему middleware или маршруту
    } else {
        res.status(401).send('Unauthorized'); // Пользователь не аутентифицирован
    }
}

// Декоратор для проверки прав доступа
function checkPermissions(permission) {
    return function(req, res, next) {
        if (req.user.permissions.includes(permission)) {
            next(); // Пользователь имеет права доступа, переходим к следующему middleware или маршруту
        } else {
            res.status(403).send('Forbidden'); // Пользователь не имеет нужных прав доступа
        }
    };
}