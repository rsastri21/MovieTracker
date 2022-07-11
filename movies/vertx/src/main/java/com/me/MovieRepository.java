package com.me;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.Json;

public class MovieRepository extends AbstractVerticle {

    private static final List<Movie> MOVIES = new ArrayList<>();

    @Override
    public void start() throws Exception {
        System.out.println("MovieRepository starting...");

        vertx.eventBus().consumer("service.movie-add", msg -> {
            Movie movie = Json.decodeValue((String)msg.body(), Movie.class);
            movie.setGuid(UUID.randomUUID());
            MOVIES.add(movie);
            msg.reply(Json.encode(movie));
        });

        vertx.eventBus().consumer("service.movie-get", msg -> {
            msg.reply(Json.encode(MOVIES));
        });

    }
    
}