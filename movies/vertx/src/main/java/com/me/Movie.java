package com.me;

import java.util.UUID;

public class Movie {

    private String genre;
    private String title;
    private UUID guid;

    public Movie() {

    }

    public Movie(String genre, String title, UUID guid) {
        super();
        this.genre = genre;
        this.title = title;
        this.guid = guid;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public UUID getGuid() {
        return guid;
    }

    public void setGuid(UUID guid) {
        this.guid = guid;
    }
    
}