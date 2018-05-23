package com.element.androidwebserver.server;

import com.element.androidwebserver.Pages;

import java.io.IOException;

/**
 * Created by andrei on 7/30/15.
 */
public class MyServer extends NanoHTTPD {
    private final static int PORT = 8000;

    public MyServer() throws IOException {
        super(PORT);
        start();
        System.out.println( "\nRunning! Point your browers to http://localhost:8000/ \n" );
    }

    @Override
    public Response serve(IHTTPSession session) {
        String msg = Pages.HOMEPAGE;
                //"<html><body><h1>Hello server</h1>\n";
        //msg += "<p>We serve " + session.getUri() + " !</p>";
        return newFixedLengthResponse(msg);
    }
}
