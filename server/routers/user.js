const Router = require("koa-router");

const userRouter = new Router({ "prefix": "/user" });

userRouter.post("/login", async ctx => {
    const user = ctx.request.body;
    if (user.username === "daniel" && user.password === "12345678") {
        ctx.session.user = {
            username: "daniel"
        };
        ctx.body = {
            success: true,
            data: {
                username: "daniel"
            }
        }
    } else {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: "username or password error"
        }
    }
});

module.exports = userRouter;