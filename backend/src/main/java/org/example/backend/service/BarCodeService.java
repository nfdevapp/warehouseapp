package org.example.backend.service;

import java.util.UUID;

public class BarCodeService {
    public  BarCodeService(){}

    public String  createBarCode(){
        return UUID.randomUUID().toString();
    }
}
