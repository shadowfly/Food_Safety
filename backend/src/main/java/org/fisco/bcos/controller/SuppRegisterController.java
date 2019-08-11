package org.fisco.bcos.controller;

import com.alibaba.fastjson.JSON;
import org.fisco.bcos.form.SuppForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
public class SuppRegisterController {

//    @GetMapping("/suppRegister")
//    public String getSuppForm() {
//
//        return "suppRegister";
//    }
//
//    @PostMapping("/suppRegister")
//    public String suppRegister(@ModelAttribute(name="suppForm") SuppForm suppForm) {
//        String suppName = suppForm.getSuppName();
//        String suppId = suppForm.getSuppId();
//        System.out.println(suppName+"aaaaa"+suppId);
//        return "home";
//    }

    @GetMapping("/api/hello")
    public String hello () {
        return "hello world";
    }


    @PutMapping ("/roleInsert")
    public String getFile(Object file) {
        System.out.println(file.toString());
        System.out.println("success");
        return "success";
    }

}
