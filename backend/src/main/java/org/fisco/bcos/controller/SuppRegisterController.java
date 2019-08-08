package org.fisco.bcos.controller;

import org.fisco.bcos.form.SuppForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SuppRegisterController {

    @RequestMapping(value="/suppRegister",method = RequestMethod.GET)
    public String getSuppForm() {

        return "suppRegister";
    }

    @RequestMapping(value = "/suppRegister",method = RequestMethod.POST)
    public String suppRegister(@ModelAttribute(name="suppForm") SuppForm suppForm) {
        String suppName = suppForm.getSuppName();
        String suppId = suppForm.getSuppId();
        System.out.println(suppName+"aaaaa"+suppId);
        return "home";
    }
}
