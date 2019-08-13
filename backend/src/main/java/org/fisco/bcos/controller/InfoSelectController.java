package org.fisco.bcos.controller;

import com.alibaba.fastjson.JSONObject;
import org.fisco.bcos.Component.InfoSelect;
import org.fisco.bcos.Component.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class InfoSelectController {

    @Autowired
    private Web3Config web3;

    private Role role;

    @ResponseBody
    @PostMapping(value="/suppSelect",produces = "application/json;charset=UTF-8")
    public String getSuppInfo(@RequestBody InfoSelect info) throws Exception {

        String value = info.getValue();

        role = web3.suppSelect(value);

        System.out.println(web3);

        return role.resultJSON(role);

    }

    @ResponseBody
    @PostMapping(value="/transSelect",produces = "application/json;charset=UTF-8")
    public String getTransInfo(@RequestBody InfoSelect info) throws Exception {

        String value = info.getValue();

        System.out.println(web3);

        role = web3.transSelect(value);

        return role.resultJSON(role);

    }

    @ResponseBody
    @PostMapping(value="/retailSelect",produces = "application/json;charset=UTF-8")
    public String getRetailInfo(@RequestBody InfoSelect info) throws Exception {

        String value = info.getValue();

        System.out.println(web3);

        role = web3.transSelect(value);

        return role.resultJSON(role);
    }

    @ResponseBody
    @GetMapping(value = "/")
    public String helloWorld() throws Exception {
        JSONObject returnResult = new JSONObject();
        returnResult.put("roleId","hello World");
        return returnResult.toJSONString();
    }
}
