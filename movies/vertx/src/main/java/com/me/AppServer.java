package com.me;

import org.apache.commons.lang3.StringUtils;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.Json;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;

public class AppServer {

    private final Logger LOGGER = LoggerFactory.getLogger( AppServer.class );

    public void run(Vertx vertx) {
        HttpServer server = vertx.createHttpServer();

        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());
        
            router.get().handler(StaticHandler.create());

        router.get("/movies").handler(ctx -> getMovie(ctx, vertx));

        router.post("/movies").handler(ctx -> postMovie(ctx, vertx));


        server.requestHandler(router).listen(80, http -> {
            if (http.succeeded()) {
                LOGGER.info("MovieApp HTTP Server started on port 80");
            } else {
                LOGGER.info("MovieApp HTTP Server failed to start");
            }
        });

    }

    private void postMovie(RoutingContext ctx, Vertx vertx) {
        final Movie movie = Json.decodeValue(
            ctx.getBodyAsString(), Movie.class);
        if (StringUtils.isEmpty(movie.getGenre()) ||
            StringUtils.isEmpty(movie.getTitle())) {
                ctx.response()
                .setStatusCode(400)
                .putHeader("content-type", "application/json")
                .end("{ 'error': 'Title and Genre must be non-empty' }");
        }
        vertx.eventBus().request("service.movie-add", Json.encode(movie),
            res -> {
                if ( res.succeeded() ) {
                    ctx.response()
                    .putHeader("content-type", "application/json")
                    .end( res.result().body().toString() );
                } else {
                    ctx.fail( res.cause() );
                }
            });

    }

    private void getMovie(RoutingContext ctx, Vertx vertx) {
        vertx.eventBus().request("service.movie-get", "", res -> {
            if ( res.succeeded() ) {
                ctx.response()
                .putHeader("content-type", "application/json")
                .end( res.result().body().toString() );
            } else {
                ctx.fail( res.cause() );
            }
        });
    }

}