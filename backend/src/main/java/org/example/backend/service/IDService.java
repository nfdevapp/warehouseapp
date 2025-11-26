package org.example.backend.service;

import java.util.UUID;

public class IDService {
    public IDService() {
    }

    public String createId(){
        return UUID.randomUUID().toString();
    }
}
