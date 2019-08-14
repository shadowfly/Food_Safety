package org.fisco.bcos.controller;

import com.alibaba.fastjson.JSONObject;
import org.fisco.bcos.Component.RetailAdd;
import org.fisco.bcos.Component.SuppAdd;
import org.fisco.bcos.Component.TransAdd;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoleAddController {

    @Autowired
    private Web3Config web3;

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/suppAdd",produces = "application/json;charset=UTF-8")
    public String suppAddInfo(@RequestBody SuppAdd foodInfo) throws Exception{

        String foodNum = foodInfo.getFoodNum();
        String suppId = foodInfo.getSuppId();
        String outDate = foodInfo.getOutDate();
        String ingredient = foodInfo.getIngredient();
        String origin = foodInfo.getOrigin();
        String foodImg = foodInfo.getFoodImg();

        TransactionReceipt result = web3.suppAdd(foodNum,suppId,outDate,ingredient,origin,foodImg);
        System.out.println(result);

        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","suppAdd");

        return returnResult.toJSONString();

    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/transAdd",produces = "application/json;charset=UTF-8")
    public String transAddInfo(@RequestBody TransAdd foodInfo) throws Exception{

        String foodNum = foodInfo.getFoodNum();
        String transId = foodInfo.getTransId();
        String temp = foodInfo.getTemp();
        TransactionReceipt result = web3.transAdd(foodNum,transId,temp);
        System.out.println(result);

        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","transAdd");

        return returnResult.toJSONString();

    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/retailAdd",produces = "application/json;charset=UTF-8")
    public String retailAddInfo(@RequestBody RetailAdd foodInfo) throws Exception{

        String foodNum = foodInfo.getFoodNum();
        String retailId = foodInfo.getRetailId();
        TransactionReceipt result = web3.retailAdd(foodNum,retailId);
        System.out.println(result);

        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","retailAdd");

        return returnResult.toJSONString();

    }


}
