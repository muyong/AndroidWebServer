package com.element.androidwebserver.server;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.webkit.MimeTypeMap;

import com.element.androidwebserver.Pages;

import org.apache.commons.io.IOUtils;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Scanner;
import java.util.stream.Collectors;

/**
 * Created by andrei on 7/30/15.
 */
public class MyServer extends NanoHTTPD {
    private AssetManager assetManager;
    private File dir;
    private final static int PORT = 8000;

    public MyServer(AssetManager assetManager, File dir) throws IOException {
        super(PORT);
        this.assetManager = assetManager;
        this.dir = dir;
        start();
        System.out.println( "\nRunning! Point your browers to http://localhost:8000/ \n" );
    }

    @Override
    public Response serve(IHTTPSession session) {
        Map<String, String> header = session.getHeaders();
        String uri = session.getUri();
        String fileName = null;
        if(uri .equalsIgnoreCase("/"))
            fileName = "index.html";
        else
            fileName = uri.substring(1);

        InputStream is = null;
        try {
            is = assetManager.open(fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }

        String[] fileNameSplitted = fileName.split("/");
        String tmpFileName = null;
        if(fileNameSplitted.length ==1 )
            tmpFileName = fileNameSplitted[0];
        else
            tmpFileName = fileNameSplitted[1];

        File file = new File(dir, tmpFileName);
        try {
            OutputStream outputStream = new FileOutputStream(file);
            IOUtils.copy(is, outputStream);
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //Scanner s = new Scanner(is).useDelimiter("\\A");
        //String msg = s.hasNext() ? s.next() : "";

        // = Pages.HOMEPAGE;
                //"<html><body><h1>Hello server</h1>\n";
        //msg += "<p>We serve " + session.getUri() + " !</p>";
        return serveFile(uri, header, file);
    }

    public static String getMimeTypeForFile(String url) {
        String type = null;
        String extension = MimeTypeMap.getFileExtensionFromUrl(url);
        if (extension != null) {
            type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
        }
        return type;
    }

    private Response serveFile(String uri, Map<String, String> header, File file)
    {


        System.out.println("--------------------------------------------------------" );
        for (Map.Entry<String, String> entry : header.entrySet())
        {
            String key = entry.getKey().toString();
            String value = entry.getValue();
            System.out.println("key, " + key + " value " + value);
        }
        System.out.println("--------------------------------------------------------" );


        Response res;
        String mime = getMimeTypeForFile(uri);
        try {
            String etag = Integer.toHexString((file.getAbsolutePath() +
                    file.lastModified() + "" + file.length()).hashCode());
            long startFrom = 0;
            long endAt = -1;
            String range = header.get("range");
            if (range != null) {
                if (range.startsWith("bytes=")) {
                    range = range.substring("bytes=".length());
                    int minus = range.indexOf('-');
                    try {
                        if (minus > 0) {
                            startFrom = Long.parseLong(range.substring(0, minus));
                            endAt = Long.parseLong(range.substring(minus + 1));
                        }
                    } catch (NumberFormatException ignored) {
                    }
                }
            }
            long fileLen = file.length();
            if (range != null && startFrom >= 0) {
                if (startFrom >= fileLen) {
                    res = createResponse(Response.Status.RANGE_NOT_SATISFIABLE, MIME_PLAINTEXT, "");
                    res.addHeader("Content-Range", "bytes 0-0/" + fileLen);
                    res.addHeader("ETag", etag);
                } else {
                    if (endAt < 0) {
                        endAt = fileLen - 1;
                    }
                    //endAt=startFrom+1000000;
                    long newLen = endAt - startFrom + 1;
                    if (newLen < 0) {
                        newLen = 0;
                    }

                    final long dataLen = newLen;
                    FileInputStream fis = new FileInputStream(file) {
                        @Override
                        public int available() throws IOException {
                            return (int) dataLen;
                        }
                    };
                    fis.skip(startFrom);

                    res = createResponse(Response.Status.PARTIAL_CONTENT, mime, fis,dataLen);
                    res.addHeader("Content-Length", "" + dataLen);
                    res.addHeader("Content-Range", "bytes " + startFrom + "-" +
                            endAt + "/" + fileLen);
                    res.addHeader("ETag", etag);
                    Log.d("Server", "serveFile --1--: Start:"+startFrom+" End:"+endAt);
                }
            } else {
                if (etag.equals(header.get("if-none-match"))) {
                    res = createResponse(Response.Status.NOT_MODIFIED, mime, "");
                    Log.d("Server", "serveFile --2--: Start:"+startFrom+" End:"+endAt);
                }
                else
                {
                    FileInputStream fis=new FileInputStream(file);
                    res = createResponse(Response.Status.OK, mime, fis,fis.available());
                    res.addHeader("Content-Length", "" + fileLen);
                    res.addHeader("ETag", etag);
                    Log.d("Server", "serveFile --3--: Start:"+startFrom+" End:"+endAt);
                }
            }
        } catch (IOException ioe) {
            res = getResponse("Forbidden: Reading file failed");
            Log.d("Server", "Fobidden: Reading file failed");
        }

        return (res == null) ? getResponse("Error 404: File not found") : res;
    }

    private Response createResponse(Response.Status status, String mimeType, InputStream message,long totalBytes) {
        Response res = newFixedLengthResponse(status, mimeType, message,totalBytes);
        res.addHeader("Accept-Ranges", "bytes");
        return res;
    }

    private Response createResponse(Response.Status status, String mimeType, String message) {
        Response res = newFixedLengthResponse(status, mimeType, message);
        res.addHeader("Accept-Ranges", "bytes");
        return res;
    }

    private Response getResponse(String message) {
        return createResponse(Response.Status.OK, "text/plain", message);
    }

}
